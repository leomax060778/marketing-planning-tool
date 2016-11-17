$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var data = mapper.getDataLevel3();
var ErrorLib = mapper.getErrors();
var blLevel2 = mapper.getLevel2();
var dlCrm = mapper.getDataCrm();
var db = mapper.getdbHelper();
var dataHl4 = mapper.getDataLevel4();
var dataHl2 = mapper.getDataLevel2();
var blPath = mapper.getPath();
var hl4 = mapper.getLevel4();
var dbUser = mapper.getDataUser();
var dataHl3User = mapper.getDataLevel3User();
var mail = mapper.getMail();
var businessError = mapper.getLogError();
var userRoleLib = mapper.getUserRole();
/** ***********END INCLUDE LIBRARIES*************** */
var LEVEL3 = 3;
var L2_MSG_TEAM_NOT_FOUND = "The Team/Priority can not be found.";
var L2_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L2_MSG_TEAM_CANT_DELETE = "The selected Team/Priority can not be deleted because has childs.";
var L2_MSG_PLAN_NOT_FOUND = "The Plan to new Team/Priority can not be found.";
var L2_MSG_TEAM_EXISTS = "Another Team/Priority with the same acronym already exists.";

// Get all Level 3 data by level 2 id
function getAllLevel3(hl2Id, userId) {
	var objHl2 = {};
	objHl2.IN_HL2_ID = hl2Id;
	return data.getAllLevel3(objHl2, userId);
}

// Get an Level 3 data by id
function getLevel3ById(hl3Id, userId) {
	var objHl3 = {};
	objHl3.IN_HL3_ID = hl3Id;
	return data.getLevel3ById(objHl3, userId);
}

function getLevel3ForSearch(){
	var result = data.getLevel3ForSearch();
	var resultRefactor = [];
	result.forEach(function(object){
		var aux = {};
		
		aux.ID = object.ID;
		aux.PARENT_ID = object.PARENT_ID;
		aux.BUDGET_YEAR = Number(ctypes.Int64(object.BUDGET_YEAR));
		aux.ACRONYM = object.ACRONYM;
		aux.ORGANIZATION_ACRONYM = object.ORGANIZATION_ACRONYM;
		aux.REGION_NAME = object.REGION_NAME;
		aux.SUBREGION_NAME = object.SUBREGION_NAME;
		aux.PATH = "CRM-" + object.PATH;
		
		resultRefactor.push(aux);
	});
	return resultRefactor;
}

function getLevel3ByAcronym(objHl3, userId) {
	return data.getLevel3ByAcronym(objHl3, userId);
}

function existsHl3(objHl3, userId){
	var hl3 = getLevel3ByAcronym(objHl3, userId);
	if (hl3.HL3_ID && Number(hl3.HL3_ID) !== Number(objHl3.IN_HL3_ID)) 
		return true;
	else 
		return false;
}

// determine if hl3 has childs
function hl3HasChilds(objHl3){
	var result = hl4.getHl4(objHl3.IN_HL3_ID);
	if(result.results.length)
		return true;
	else
		return false;
}

function getGlobalTeams(userId) {
	return data.getGlobalTeams(userId);
}

//delete an hl3 is user is admin and not has childs
function deleteHl3(objHl3, userId){
	
	if(!objHl3.IN_HL3_ID)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/deleteHl3", L2_MSG_TEAM_NOT_FOUND);
	
	//verify if exist entity
	var hl3 = data.getLevel3ById(objHl3, userId);
		
	if(!hl3)
		throw ErrorLib.getErrors().CustomError("",
				"hl3Services/handlePost/deleteHl3",
				L2_MSG_TEAM_NOT_FOUND);
	
	//TODO:
	//verify if userId is USPERADMIN, then can delete
	var rol = userRoleLib.getUserRoleByUserId(userId);
	var userRoleId = 0;
	if(rol){
		userRoleId = Number(rol[0]['ROLE_ID']);
	}
	
	if(userRoleId !== 1 && userRoleId !== 2)
		throw ErrorLib.getErrors().CustomError("","hl3Services/handlePost/deleteHl3", L2_MSG_NO_PRIVILEGE);
	
	var result = 0;
	if(!hl3HasChilds(objHl3)){
		try{
			//delete in HL3_STATUS_HISTORY	
			//delete on HL3_FNC
			//delete on HL3
			//todo: delete reference to data.deleteLevel3Fnc(objHl3, userId);
			result = result + data.deleteLevel3Fnc(objHl3, userId);
			result = result + data.deleteLevel3(objHl3, userId);
			db.commit();
		} catch (e) {
			db.rollback();
			throw e;
		} finally {
			db.closeConnection();
		}
	}
	else
		throw ErrorLib.getErrors().CustomError("",
				"hl3Services/handlePost/deleteHl3",
				L2_MSG_TEAM_CANT_DELETE);
	return result;
}

// Create a new object of HL3
function createHl3(objHl3, userId) {
	var result = 0;
	if (validateFormHl3(objHl3)) {
		// validate HL2 exist by id
		if (!blLevel2.existHl2(objHl3))
			throw ErrorLib.getErrors().CustomError("",
					"hl3Services/handlePost/insertHl3",
					L2_MSG_PLAN_NOT_FOUND);

		objHl3.IN_HL3_ID = 0;
		if(existsHl3(objHl3, userId))
			throw ErrorLib.getErrors().CustomError("",
					"hl3Services/handlePost/insertHl3",
					L2_MSG_TEAM_EXISTS);
		
		// validate exist CRM
		var objPath = blPath.getPathByLevelParentToCRM(LEVEL3, objHl3.IN_HL2_ID);
		var path = objPath.PATH_TPH + "-" + objHl3.IN_ACRONYM;
		var crmId = dlCrm.getCrm(path);
		try {
			if (crmId <= 0) {
				var objCrm = {};
				objCrm.IN_PATH = path;
				objCrm.IN_DESCRIPTION = objHl3.IN_HL3_DESCRIPTION;
				crmId = dlCrm.insertCrm(objCrm, userId);
			}

			// SET CRM ID
			objHl3.IN_CRM_ID = crmId;
			// hardcoded 0 is needed to pass HL3_ID that never exist to checkBudgetStatus function
			objHl3.IN_IN_BUDGET = checkBudgetStatus(objHl3.IN_HL2_ID, userId, 0, objHl3.IN_HL3_FNC_BUDGET_TOTAL);
			// CREATE NEW HL3
			result = data.insertHl3(objHl3, userId);
			
			//INSERT USERS RELATED TO HL3
			objHl3.IN_HL3_ID = result;
			setUsersHl3(objHl3, userId);
			db.commit();
		} catch (e) {
			db.rollback();
			throw e;
		}
	}
	return result;
}

// Update an object of HL3
//return an object {"out_result_hl3": {},"out_result_hl3_fnc": null,"out_crm_id": "0","out_budget_flag": 0}
//"out_crm_id": "0". More than zero if some acronym or description or business owner changed
//"out_budget_flag": 0. More than zero if budget change
function updateHl3(objHl3, userId) {
	var result = {};
	var resBudgetStatus = {};
	if (validateUpdateHl3(objHl3)) {
		
		if(existsHl3(objHl3, userId))
			throw ErrorLib.getErrors().CustomError("",
					"hl3Services/handlePost/updateHl3",
					L2_MSG_TEAM_EXISTS);
		
		try {
			//if(canUpdateL3(objHl3))
				// update HL3 -> result = { 'out_result_hl3': X, 'out_result_hl3_fnc': Y, 'out_crm_id': W, 'out_budget_flag': Z}
			
			
				objHl3.IN_IN_BUDGET = checkBudgetStatus(objHl3.IN_HL2_ID, userId, objHl3.IN_HL3_ID, objHl3.IN_HL3_FNC_BUDGET_TOTAL);
				result = data.updateLevel3(objHl3, userId);
			//else
				//throw ErrorLib.getErrors().CustomError("","hl3Services/handlePost/updateHl3","Already exists other object with the same ACRONYM");
						
			if (result) {
				if (result.out_crm_id > 0) {
					// update de CRM
					//get l3 data from bd
					var l3 = data.getLevel3ById(objHl3, userId);
					//get the path and update to new in crm
					var objPath = blPath.getPathByLevelParentToCRM(LEVEL3, l3.HL2_ID);
					var path = objPath.PATH_TPH + "-" + objHl3.IN_ACRONYM;
					
					var objCrm = {};
					objCrm.IN_CRM_ID = result.out_crm_id;
					objCrm.IN_ACRONYM = path;
					objCrm.IN_HL3_DESCRIPTION = objHl3.IN_HL3_DESCRIPTION;
					//update data crm
					var updCrmResult = dlCrm.updateCrm(objCrm, userId);
				}
				
				//if budget change
				if (result.out_budget_flag === 1) {
					//update budget status in hl4
					resBudgetStatus = hl4.checkBudgetStatus(objHl3);	
				}
				
				//update related users
				setUsersHl3(objHl3, userId);
				
				db.commit();
				//if all is ok, send email
				
				if(resBudgetStatus.out_result){
					//send all emails
					try 
					{
						//sendEmail(resBudgetStatus, userId);
					}
					catch(e){
						//when error email exist, log error
						businessError.log(ErrorLib.getErrors().CustomError("","level3Lib/sendEmail",e),userId);
					}
				}
			}			
		} catch (e) {
			db.rollback();
			throw e;
		}
	}
	return result;
}

function setUsersHl3(objHl3, userId){
	try{
		//update users
		var listObjHl3User = objHl3.USERS;
		if(listObjHl3User){					
			if(validateHl3User(listObjHl3User)){
				//delete all in HL3_USER
				dataHl3User.delAllLevel3User(objHl3);
				for (var i = 0; i < listObjHl3User.length; i++) {
					if(!validateHl3UserPair(listObjHl3User[i], objHl3))
						//insert pair (hl3_id, user_id)	
						dataHl3User.insertLevel3User(listObjHl3User[i], objHl3, userId);
				}																
			}	
		}
		else{
			dataHl3User.delAllLevel3User(objLevel3);
		}
	}
	catch(e){
		throw e;
	}
}

// Local method to validate input request
function validateFormHl3(objHl3) {
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'IN_ACRONYM', 'IN_HL2_ID', 'IN_HL3_DESCRIPTION',
			'IN_BUSINESS_OWNER_ID', 'IN_HL3_FNC_BUDGET_TOTAL' ];

	if (!objHl3)
		throw ErrorLib.getErrors().CustomError("",
				"hl3Services/handlePost/insertHl3",
				"The object HL3 is not found");

	try {
		keys.forEach(function(key) {
			if (objHl3[key] === null || objHl3[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objHl3[key])
				if (!isValid) {
					errors[key] = objHl3[key];// 'INVALID';
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"hl3Services/handlePost/insertHl3", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"hl3Services/handlePost/insertHl3", JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateHl3(objHl3) {
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'IN_ACRONYM', 'IN_HL3_DESCRIPTION', 'IN_BUSINESS_OWNER_ID',
			'IN_HL3_FNC_BUDGET_TOTAL' ];

	if (!objHl3)
		throw ErrorLib.getErrors().CustomError("",
				"hl3Services/handlePost/updateHl3",
				"The object HL3 is not found");

	try {
		keys.forEach(function(key) {
			if (objHl3[key] === null || objHl3[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objHl3[key])
				if (!isValid) {
					errors[key] = objHl3[key];// 'INVALID';
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"hl3Services/handlePost/updateHl3", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"hl3Services/handlePost/updateHl3", JSON.stringify(errors));
	}
	return isValid;
}

// Local method to check data types
function validateType(key, value) {
	var regex = /^(0|([1-9]\d{0,8}))(\.\d{1,10})?$/;
	var valid = true;

	switch (key) {
	case 'IN_ACRONYM':
		valid = value.replace(/\s/g, "").length > 0 && value.replace(/\s/g, "").length <= 3; //up to 3 characters
		break;
	case 'IN_HL2_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'IN_HL3_DESCRIPTION':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'IN_BUSINESS_OWNER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'IN_HL3_FNC_BUDGET_TOTAL':
		valid = regex.test(value) && value >= 0;
		break;
	}
	return valid;
}


function createEmail(){
	
}

//TODO: send email to owner user of hl4id´s. That is HL4 created user
//resBudgetStatus contains two list. The emailListInBudget with initiatives or campaign changed to in budget, and emailListOutBudget with initiatives or campaign changed to out budget
function sendEmail(resBudgetStatus, userId){
	var stringInHl4 = "List In Budget: ";
	var stringOutHl4 = "List Out Budget: ";
	
	if(resBudgetStatus){
		try{
			if(resBudgetStatus.emailListInBudget.length > 0){
				for (var i = 0; i < resBudgetStatus.emailListInBudget.length; i++) {
					var objHl4 = resBudgetStatus.emailListInBudget[i];
					if(objHl4)
						stringInHl4 = stringInHl4 + "<p>" + i + " - " + "ACRONYM: " +  objHl4.HL4_ACRONYM + ", DESCRIPTION: " + objHl4.HL4_CRM_DESCRIPTION + "</p>";
				}
			}		
			
			if(resBudgetStatus.emailListOutBudget.length > 0){
				for (var i = 0; i < resBudgetStatus.emailListOutBudget.length; i++) {
					var objHl4 = resBudgetStatus.emailListOutBudget[i];
					if(objHl4)
						stringOutHl4 = stringOutHl4 + "<p>" + i + " - " + "ACRONYM: " +  objHl4.HL4_ACRONYM + ", DESCRIPTION: " + objHl4.HL4_CRM_DESCRIPTION + "</p>";
				}
			}	
			
			//get owner email
			//TODO: find owner created hl4
			//var ownerTo = 
			var to = 'framirez@folderit.net';
			var body = '<p> Dear Colleague </p><p>We send the list of INITIATIVE/CAMPAIGN shipped in or out of budget</p>';
			body = body + stringInHl4;
			body = body + stringOutHl4;
			var mailObject = mail.getJson([ {
				"address" : to
			} ], "Marketing Planning Tool - Lits of INITIATIVE/CAMPAIGN shipped in or out of budget", body);
			
			mail.sendMail(mailObject,true);
		}
		catch(e){
			throw e;
		}
	}
}

/*VALIDATE IF EXITS DE PAIR HL3_USER IN DATABASE*/
function validateHl3UserPair(objHl3User, objLevel3){
	return dataHl3User.existsHl3UserPair(objHl3User, objLevel3);
}

/*VALIDATE TYPES VALUES OF RELATED OBJECT TO HL3_USER*/
function validateHl3User(listObjHl3User){
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['IN_USER_ID'];
	
	if(!listObjHl3User)
		return true;
	
	try {
		
		for (var i = 0; i < listObjHl3User.length; i++) {
			keys.forEach(function(key) {
				if (listObjHl3User[i][key] === null || listObjHl3User[i][key] === undefined) {
					errors[key] = null;
					throw BreakException;
				} else {
					// validate attribute type
					isValid = validateType(key, listObjHl3User[i][key])
					if (!isValid) {
						errors[key] = listObjHl3User[i][key];
						throw BreakException;
					}
				}
			});
		}
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateHl3User", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateHl3User"
					,JSON.stringify(errors));
	}
	return isValid;
}

/*check if can update object because is not same another in db*/
function canUpdateL3(objLevel3){
	var objHl3ToUpdate = getLevel3ById(objLevel3);
	var objHlOther = getLevel3ByAcronym(objLevel3);
	if(!objHl3Other) return true;
	//check the same object
	if(objHl3ToUpdate.HL3_ID!==objHl3Other.HL3_ID && objHl3ToUpdate.ACRONYM===objHl3Other.ACRONYM)
		return false;
	else
		return true;
}

function checkBudgetStatus(hl2Id, userId, hl3Id, newHl3Budget) {
	if(hl2Id && newHl3Budget){
		var objHl = {};
		objHl.IN_HL2_ID = hl2Id;
		var hl2 = blLevel2.getLevel2ById(objHl);
		var hl2AllocatedBudget = dataHl2.getHl2AllocatedBudget(hl2Id, hl3Id);
		return (Number(hl2.HL2_BUDGET_TOTAL) - Number(hl2AllocatedBudget) - Number(newHl3Budget)) >= 0 ? 1 : 0;
	} else {
		
		var result = {};
		result.hasChanged = 0;
		result.emailListInBudget = [];
		result.emailListOutBudget = [];
		var resultHl3 = data.getAllLevel3(hl2Id,userId);
		if (resultHl3.out_result.length) {
			var objHl = {};
			objHl.IN_HL2_ID = hl2Id;
			var hl2 = blLevel2.getLevel2ById(objHl);
			var hl2Budget = Number(hl2.HL2_BUDGET_TOTAL);
			var total = 0;
		
			for (var i = 0; i < resultHl3.out_result.length; i++) {
				if (hl2Budget < total	+ parseFloat(resultHl3.out_result[i].HL3_BUDGET_TOTAL)) {
					data.updateHl3BudgetStatus(resultHl3.out_result[i].HL3_ID, userId, 0);
					//throw ErrorLib.getErrors().CustomError("","hl3Services/handlePost/updateHl3","paka 66");
					result.emailListOutBudget.push(resultHl3.out_result[i]);
				} else {
					data.updateHl3BudgetStatus(resultHl3.out_result[i].HL3_ID, userId, 1);
					total = total + parseFloat(resultHl3.out_result[i].HL3_BUDGET_TOTAL);
					/*if(resultHl3.out_result[i].STATUS_ID === 3){
						dataHl4.changeStatusHl4(resultHl4.out_result[i].HL4_ID, 4, userId);
					}*/
					result.emailListInBudget.push(resultHl3.out_result[i]);
				}
			}
			result.hasChanged = result.emailListInBudget.length || result.emailListOutBudget.length;
		}
		return result;
	}
}
