$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var data = mapper.getDataLevel3();
var ErrorLib = mapper.getErrors();
var blLevel2 = mapper.getLevel2();
var dlCrm = mapper.getDataCrm();
var db = mapper.getdbHelper();
var dataHl4 = mapper.getDataLevel4();
var blPath = mapper.getPath();
var hl4 = mapper.getLevel4();
var dbUser = mapper.getDataUser();
var dataHl3User = mapper.getDataLevel3User();
var mail = mapper.getMail();
var businessError = mapper.getLogError();
/** ***********END INCLUDE LIBRARIES*************** */
var LEVEL3 = 3;

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

function getLevel3ByAcronym(objHl3, userId) {
	return data.getLevel3ByAcronym(objHl3, userId);
}

function existsHl3(objHl3, userId){
	var hl3 = getLevel3ByAcronym(objHl3, userId);
	if (hl3.HL3_ID) 
		return true;
	else 
		return false;
}

// determine if hl3 has childs
function hl3HasChilds(objHl3){
	var param = { "in_hl3_id": objHl3.IN_HL3_ID };
	var result = hl4.getHl4(param);
	if(result.length)
		return true;
	else
		return false;
}

function getGlobalTeams(userId) {
	return data.getGlobalTeams(userId);
}

//delete an hl3 is user is admin and not has childs
function deleteHl3(objHl3, userId){
	
	//verify if userId is ADMIN, then can delete
	//TODO:
	var userRole = {};//dbUser.getUserRoleByUserId(userId);
	userRole.ROLE_ID = 1;
	
	if(userRole.ROLE_ID !== 1 && userRole.ROLE_ID !== 2)
		throw ErrorLib.getErrors().CustomError("","hl3Services/handlePost/deleteHl3","Not enough privilege");
	
	var result = 0;
	if(!hl3HasChilds(objHl3)){
		//delete in HL3_STATUS_HISTORY	
		//delete on HL3_FNC
		//delete on HL3
		result = data.deleteLevel3(objHl3, userId);
	}
	else
		throw ErrorLib.getErrors().CustomError("",
				"hl3Services/handlePost/deleteHl3",
				"The object HL3_ID ca not be deleted because has childs");
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
					"The object HL2_ID is not found");

		if(existsHl3(objHl3, userId))
			throw ErrorLib.getErrors().CustomError("",
					"hl3Services/handlePost/insertHl3",
					"The object HL3_ID already exists");
		
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
			// CREATE NEW HL3
			result = data.insertHl3(objHl3, userId);
			
			//INSERT USERS RELATED TO HL3
			objHl3.IN_HL3_ID = result;
			setUsersHl3(objHl3, userId);
			db.commit();
		} catch (e) {
			db.rollback();
			throw ErrorLib.getErrors().CustomError("",
					"hl3Services/handlePost/insertHl3",e);
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
		
		try {
			//if(canUpdateL3(objHl3))
				// update HL3 -> result = { 'out_result_hl3': X, 'out_result_hl3_fnc': Y, 'out_crm_id': W, 'out_budget_flag': Z}
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
						sendEmail(resBudgetStatus, userId);
					}
					catch(e){
						//when error email exist, log error
						businessError.log(ErrorLib.getErrors().CustomError("","level3Lib/sendEmail",e),userId);
						//throw ErrorLib.getErrors().CustomError("","PRUEBA...",e);
					}
				}
			}			
		} catch (e) {
			db.rollback();
			throw ErrorLib.getErrors().BadRequest("","hl3Services/handlePut",e.toString());
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
		throw ErrorLib.getErrors().CustomError("","hl3Services/setUsersHl3",e.toString());
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
		valid = value.length > 0 && value.length <= 3;
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
		valid = regex.test(value) && value > 0;
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
