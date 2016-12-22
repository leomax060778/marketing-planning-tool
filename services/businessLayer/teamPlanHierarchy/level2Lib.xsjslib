$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataHl2 = mapper.getDataLevel2();
var dataHl2User = mapper.getDataLevel2User();
var hl3 = mapper.getLevel3();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var db = mapper.getdbHelper();
var blPath = mapper.getPath();
var dlCrm = mapper.getDataCrm();
var userbl = mapper.getUser();
var userRoleLib = mapper.getUserRole();
var config = mapper.getDataConfig();
var contactDataLib = mapper.getContactData();
var businessError = mapper.getLogError();
/** ***********END INCLUDE LIBRARIES*************** */

var LEVEL3 = 3;
var TEAM_TYPE_CENTRAL = "2";

var L1_MSG_CENTRAL_TEAM_EXISTS = "Another Central Team with the same acronym already exists.";  
var L1_MSG_PLAN_EXISTS = "Another Plan with the same acronym already exists";
var L1_MSG_LEVEL_1_EXISTS ="Another Level1 with the same acronym, budget year and organization acronym already exists";
var L1_MSG_PLAN_NO_CREATED = "The Plan could not be created."; 
var L1_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L1_MSG_PLAN_NOT_FOUND = "The Plan can not be found."; 
var L1_MSG_PLAN_CANT_DELETE = "The selected Plan can not be deleted because has childs.";
var L1_MSG_USER_NOT_FOUND = "The User can not be found."

/*INSERT A NEW HL2 WITH CREO O MORE USERS ASICIATIONS*/
function insertHl2(objLevel2, userId){
	if(validateInsertHl2(objLevel2)){
//		if(isCentralTeam(objLevel2) || !dataHl2.getLevelByAcronymAndOrganizationAcronym(objLevel2.IN_ACRONYM,objLevel2.IN_ORGANIZATION_ACRONYM) /*existHl2ByAcronym(objLevel2.IN_ACRONYM)*/){		
//			if(objLevel2.IN_ORGANIZATION_ACRONYM && existOrganizationAcronym(objLevel2.IN_ORGANIZATION_ACRONYM))
//				throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/insertHl2", L1_MSG_CENTRAL_TEAM_EXISTS);	
		if(dataHl2.getLevelByAcronymAndOrganizationAcronym(objLevel2.IN_ACRONYM,objLevel2.IN_BUDGET_YEAR_ID, objLevel2.IN_ORGANIZATION_ACRONYM)){
			throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/insertHl2", L1_MSG_LEVEL_1_EXISTS); 
		}
		
			try{
				var objhl2 = dataHl2.insertLevel2(objLevel2, userId);
				
					
				if(objhl2)
				{
					if(objhl2 > 0){
						if(isCentralTeam(objLevel2) && objLevel2.contactData && objLevel2.contactData.length)
							contactDataLib.insertContactData(objLevel2.contactData,userId,objhl2);
						//get path from level and hlid
						var path = blPath.getPathByLevelParentToCRM(LEVEL3, objhl2);
						//insert into CRM, with path
						var objHl = {};
						//crm acronym = CRM-[hl2acronym][yy]
						objHl.IN_PATH = path.PATH_TPH;
						objHl.IN_DESCRIPTION = objLevel2.IN_DESCRIPTION;
						var crmId = dlCrm.insertCrm(objHl, userId);
						
						//INSERT USERS RELATED TO HL2
						objLevel2.IN_HL2_ID = objhl2;
						var listObjHl2User = objLevel2.USERS;
						/******************/
						listObjHl2User = completeUsers(listObjHl2User); //add SA users
						/******************/
						if(listObjHl2User){
							if(validateHl2User(listObjHl2User)){
								for (var i = 0; i < listObjHl2User.length; i++) {								
									if(!validateHl2UserPair(listObjHl2User[i], objLevel2)){
										//insert pair (hl2_id, user_id)
										dataHl2User.insertLevel2User(listObjHl2User[i], objLevel2, userId);
									}
								}											
							}	
						}
						db.commit();
						return objLevel2.IN_HL2_ID;
					}
					else
						throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);
				}
				else
					throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);
			}
			catch(e){
				db.rollback();
				throw e;
			}
//		}
//		else
//			throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/insertHl2", L1_MSG_PLAN_EXISTS);	
	}	
}

function completeUsers(users){
	var id = config.getRoleEnum().SuperAdmin;
	var listUsers = [];
	for ( var j = 0; j < users.length; j++){
		listUsers.push(users[j]['IN_USER_ID']);
	}
	var saUsers =  userbl.getUserByRoleId(id);
	
	for (var i = 0; i < saUsers.length; i++){
		if(!contains(listUsers, saUsers[i]['USER_ID'])){
			users.push(saUsers[i]);
		}
	}
	
	return users;
}

function contains(a, obj) {
	    var i = a.length;
	    while (i--) {
	       if (a[i] === obj) {
	           return true;
	       }
	    }
	    return false;
}

function updateHl2(objLevel2, userId){
	try{
		if(validateUpdateHl2(objLevel2)){
			
			var updated = 0;
			var objHl2 = {};
			objHl2.IN_HL2_ID = objLevel2.IN_HL2_ID;
			var budgetChanged = dataHl2.getLevel2ById(objHl2).HL2_BUDGET_TOTAL != objLevel2.IN_HL2_BUDGET_TOTAL;
			
			if(canUpdate(objLevel2)){
				if(canUpdateOrganization(objLevel2)){
					var updated = dataHl2.updateLevel2(objLevel2, userId);
				
					if(isCentralTeam(objLevel2) &&  objLevel2.contactData) {
						contactDataLib.deleteContactDataByContactTypeId("hard", "CENTRAL", objLevel2.IN_HL2_ID);
						contactDataLib.insertContactData(objLevel2.contactData,userId);
					}
					
				} else {
					throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/updateHl2", L1_MSG_CENTRAL_TEAM_EXISTS);
				}
			}
			else
				throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/updateHl2", L1_MSG_PLAN_EXISTS);
			
			if(updated > 0){
				if(budgetChanged){
					var resBudgetStatus = hl3.checkBudgetStatus(objLevel2.IN_HL2_ID,userId);
					//throw ErrorLib.getErrors().CustomError("","hl3Services/handlePost/updateHl3","paka 1");
					if(resBudgetStatus.hasChanged){
						//send all emails
						try 
						{
							//sendEmail(resBudgetStatus, userId);
						}
						catch(e){
							//when error email exist, log error
							businessError.log(ErrorLib.getErrors().CustomError("","level2Lib/sendEmail", JSON.stringify(e)), userId, userId);
						}
					}
				}
				var listObjHl2User = objLevel2.USERS;
				if(listObjHl2User){					
					if(validateHl2User(listObjHl2User)){
						//delete all in HL2_USER
						dataHl2User.delAllLevel2User(objLevel2);
						for (var i = 0; i < listObjHl2User.length; i++) {
							if(!validateHl2UserPair(listObjHl2User[i], objLevel2))
								//insert pair (hl2_id, user_id)	
								dataHl2User.insertLevel2User(listObjHl2User[i], objLevel2, userId);
						}																
					}	
				}
				else{
					dataHl2User.delAllLevel2User(objLevel2);
				}
				db.commit();
				return updated;
			}
		}
	}
	catch(e){
		db.rollback();
		throw e;
	}
}

function deleteHl2(objLevel2, userId){
	//verify if userId is SUPERADMIN, then can delete
	var rol = userRoleLib.getUserRoleByUserId(userId);
	var userRoleId = 0;
	if(rol){
		userRoleId = Number(rol[0]['ROLE_ID']);
	}
	if(userRoleId !== 1 && userRoleId !== 2)
		throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/deleteHl2", L1_MSG_NO_PRIVILEGE);
	
	if(!objLevel2.IN_HL2_ID)
		throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);
	if(!util.validateIsNumber(objLevel2.IN_HL2_ID))
		throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);
	if(hasChild(objLevel2))
		throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_CANT_DELETE);

	contactDataLib.deleteContactDataByContactTypeId("soft", "CENTRAL", objLevel2.IN_HL2_ID, userId);
	
	return dataHl2.deleteHl2(objLevel2,userId);
}

function getLevel2ByUser(userId){
	if(!userId) 
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found","level2Services/handleGet/getLevel2ByUser", L1_MSG_USER_NOT_FOUND);
	
	return dataHl2.getLevel2ByUser(userId);	
}

function getLevel2ById(objLevel2){
	if(!objLevel2) 
		throw ErrorLib.getErrors().BadRequest("The Parameter hl2Id is not found","level2Services/handleGet/getLevel2ById", L1_MSG_PLAN_NOT_FOUND);	
	return dataHl2.getLevel2ById(objLevel2);
}

//Get an Level 2 data by filter (in_budget_year_id, in_plan_id, in_region_id, in_subregion_id can be null)
function getLevel2ByFilters(objFilter, userId) {	
	return dataHl2.getLevel2ByFilters(objFilter, userId);
}

function getLevel2ByAcronym(acronym){
	if(!acronym) 
		throw ErrorLib.getErrors().BadRequest("The Parameter acronym is not found","level2Services/handleGet/getLevel2ByAcronym",acronym);	
	return dataHl2.getLevel2ByAcronym(acronym);
}

function getLevelByOrganizationAcronym(acronym){
	if(!acronym) 
		throw ErrorLib.getErrors().BadRequest("The Parameter acronym is not found","level2Services/handleGet/getLevelByOrganizationAcronym", L1_MSG_PLAN_NOT_FOUND);	
	return dataHl2.getLevelByOrganizationAcronym(acronym);
}

function getAllLevel2(){
	return dataHl2.getAllLevel2();
}

function getLevel2ForSearch(){
	var result = dataHl2.getLevel2ForSearch();
	var resultRefactor = [];
	result.forEach(function(object){
		var aux = {};
		
		aux.ID = object.ID;
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

function existHl2(objLevel2){
	return getLevel2ById(objLevel2).length >0;
}

function existHl2ByAcronym(hl2Acronym){
	var res = getLevel2ByAcronym(hl2Acronym);
	if (res) return true;
	else return false;
}

function existOrganizationAcronym(organizationAcronym){
	var ret = getLevelByOrganizationAcronym(organizationAcronym);
	if(ret)
		return true;
	else return false;
}

function getAllCentralTeam(centralTeamId){
	return dataHl2.getAllCentralTeam(centralTeamId);
}

/*check if can update object because is not same another in db*/
function canUpdate(objLevel2){
	var currentL2 = getLevel2ById(objLevel2);
	var objHl2Other = dataHl2.getLevelByAcronymAndOrganizationAcronym(objLevel2.IN_ACRONYM,objLevel2.IN_BUDGET_YEAR_ID, objLevel2.IN_ORGANIZATION_ACRONYM);//getLevel2ByAcronym(objLevel2.IN_ACRONYM);
	if(/*isCentralTeam(objLevel2) ||*/ !objHl2Other) return true;
	//check the same object
	if(currentL2.HL2_ID!==objHl2Other.HL2_ID 
			/*&& objLevel2.IN_ACRONYM.toUpperCase()===objHl2Other.ACRONYM.toUpperCase()*/)
		return false;
	else
		return true;
}

/*check if can update object because is not same another in db*/
function canUpdateOrganization(objLevel2){
	return canUpdate(objLevel2);
	/*
	//candidate to update
	var currentL2 = getLevel2ById(objLevel2);
	//other in database
	var objHl2Other = isCentralTeam(objLevel2) && dataHl2.getLevelByAcronymAndOrganizationAcronym(objLevel2.IN_ACRONYM,objLevel2.IN_BUDGET_YEAR_ID, objLevel2.IN_ORGANIZATION_ACRONYM);//getLevelByOrganizationAcronym(objLevel2.IN_ORGANIZATION_ACRONYM);
	if(!objHl2Other) return true;
	//check the same object
	if(currentL2.HL2_ID !== objHl2Other.HL2_ID
	   && objLevel2.IN_TEAM_TYPE_ID == objHl2Other.TEAM_TYPE_ID 
	   && objHl2Other.TEAM_TYPE_ID === TEAM_TYPE_CENTRAL
	   && objLevel2.IN_ORGANIZATION_ACRONYM.toUpperCase() === objHl2Other.ORGANIZATION_ACRONYM.toUpperCase())
		return false;
	else
		return true;
	*/
}

function hasChild(objLevel2){
	return dataHl2.countRelatedObjects(objLevel2) > 0;
}

function validateInsertHl2(objLevel2) {
	var isValid = false;
	var isvalidOrganization=false;
	var errors = {};
	var BreakException = {};
	var keys = ['IN_ACRONYM',
	        'IN_DESCRIPTION',
	        'IN_BUDGET_YEAR_ID',
	        'IN_HL2_BUDGET_TOTAL',
	        'IN_TEAM_TYPE_ID'
	        ];
	
	var keysTeamType = ['IN_ORGANIZATION_ACRONYM',
		        'IN_ORGANIZATION_NAME'
		        ];
	
	if(!objLevel2)
		throw ErrorLib.getErrors().CustomError("","hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NOT_FOUND);
	
	try {
		keys.forEach(function(key) {
			if (objLevel2[key] === null || objLevel2[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objLevel2[key])
				//the organization type is Central team
				if(key === 'IN_TEAM_TYPE_ID' && objLevel2[key] > 1){
					keysTeamType.forEach(function(k) {
						if (objLevel2[k] === null || objLevel2[k] === undefined) {
							errors[k] = null;
							throw BreakException;
						} else {
							// validate attribute type
							isValid = validateType(k, objLevel2[k])					
							if (!isValid) {
								errors[k] = objLevel2[k];
								throw BreakException;
							}
						}
					});
				}
				
				if (!isValid) {
					errors[key] = objLevel2[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2"
					,JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateHl2(objLevel2) {
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['IN_HL2_ID',
	        'IN_ACRONYM',
	        'IN_DESCRIPTION',
	        'IN_HL2_BUDGET_TOTAL',
	        'IN_TEAM_TYPE_ID'];
	
	var keysTeamType = ['IN_ORGANIZATION_ACRONYM',
	    		        'IN_ORGANIZATION_NAME'
	    		        ];
	if(!objLevel2)
		throw ErrorLib.getErrors().CustomError("","hl2Services/handlePut/updateHl2", L1_MSG_PLAN_NOT_FOUND);
	
	try {
		keys.forEach(function(key) {
			if (objLevel2[key] === null || objLevel2[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objLevel2[key])
				
				//the organization type is Central team
				if(key === 'IN_TEAM_TYPE_ID' && objLevel2[key] > 1){
					keysTeamType.forEach(function(k) {
						if (objLevel2[k] === null || objLevel2[k] === undefined) {
							errors[k] = null;
							throw BreakException;
						} else {
							// validate attribute type
							isValid = validateType(k, objLevel2[k])					
							if (!isValid) {
								errors[k] = objLevel2[k];
								throw BreakException;
							}
						}
					});
				}
				
				if (!isValid) {
					errors[key] = objLevel2[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw e;
		else
			throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePut/updateHl2"
					,JSON.stringify(errors));
	}
	return isValid;
}

//Check data types
function validateType(key, value) {
	var regex = /^(0|([1-9]\d{0,8}))(\.\d{1,2})?$/;
	var valid = true;
	switch (key) {
	case 'IN_ACRONYM':
		valid = value.length > 0 && value.length <= 2;
		break;
	case 'IN_DESCRIPTION':
	case 'IN_ORGANIZATION_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'IN_BUDGET_YEAR_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'IN_USER_ID':
	case 'IN_HL2_ID':
	case 'TEAM_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'IN_HL2_BUDGET_TOTAL':
		valid = regex.test(value) && value >= 0;
		break;
	case 'IN_ORGANIZATION_ACRONYM':
		valid = value.replace(/\s/g, "").length == 3;
		break;
	}
	return valid;
}

/*VALIDATE TYPES VALUES OF RELATED OBJECT TO HL2_USER*/
function validateHl2User(listObjHl2User){
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['IN_USER_ID'];
	
	if(!listObjHl2User)
		return true;
	
	try {
		
		for (var i = 0; i < listObjHl2User.length; i++) {
			keys.forEach(function(key) {
				if (listObjHl2User[i][key] === null || listObjHl2User[i][key] === undefined) {
					errors[key] = null;
					throw BreakException;
				} else {
					// validate attribute type
					isValid = validateType(key, listObjHl2User[i][key])
					if (!isValid) {
						errors[key] = listObjHl2User[i][key];
						throw BreakException;
					}
				}
			});
		}
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateHl2User", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateHl2User"
					,JSON.stringify(errors));
	}
	return isValid;
}

/*VALIDATE IF EXITS DE PAIR HL2_USER IN DATABASE*/
function validateHl2UserPair(objHl2User, objLevel2){
	return dataHl2User.existsHl2UserPair(objHl2User, objLevel2);
}

function isCentralTeam(objLevel2){
	return objLevel2['IN_TEAM_TYPE_ID'] > 1;
}

function sendEmail(resBudgetStatus, userId){
	var stringInHl4 = "List In Budget: ";
	var stringOutHl4 = "List Out Budget: ";
	
	if(resBudgetStatus){
		try{
			if(resBudgetStatus.emailListInBudget.length > 0){
				for (var i = 0; i < resBudgetStatus.emailListInBudget.length; i++) {
					var objHl3 = resBudgetStatus.emailListInBudget[i];
					if(objHl3)
						stringInHl3 = stringInHl3 + "<p>" + i + " - " + "ACRONYM: " +  objHl3.ACRONYM + ", DESCRIPTION: " + objHl3.HL3_DESCRIPTION + "</p>";
				}
			}		
			
			if(resBudgetStatus.emailListOutBudget.length > 0){
				for (var i = 0; i < resBudgetStatus.emailListOutBudget.length; i++) {
					var objHl3 = resBudgetStatus.emailListOutBudget[i];
					if(objHl3)
						stringOutHl3 = stringOutHl3 + "<p>" + i + " - " + "ACRONYM: " +  objHl3.ACRONYM + ", DESCRIPTION: " + objHl3.HL3_DESCRIPTION + "</p>";
				}
			}	
			
			//get owner email
			//TODO: find owner created hl4
			//var ownerTo = 
			var to = 'framirez@folderit.net';
			var body = '<p> Dear Colleague </p><p>We send the list of INITIATIVE/CAMPAIGN shipped in or out of budget</p>';
			body = body + stringInHl3;
			body = body + stringOutHl3;
			var mailObject = mail.getJson([ {
				"address" : to
			} ], "Marketing Planning Tool - Lits of TEAM/PRIORITY shipped in or out of budget", body);
			
			mail.sendMail(mailObject,true);
		}
		catch(e){
			throw e;
		}
	}
}