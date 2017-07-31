$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var data = mapper.getDataLevel3();
var ErrorLib = mapper.getErrors();
var blLevel2 = mapper.getLevel2();
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
var config = mapper.getDataConfig();
var userbl = mapper.getUser();
var util = mapper.getUtil();
var budgetYear = mapper.getBudgetYear();
/** ***********END INCLUDE LIBRARIES*************** */
var LEVEL3 = 3;
var L2_MSG_TEAM_NOT_FOUND = "The Priority/Sub-Team can not be found.";
var L2_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L2_MSG_TEAM_CANT_DELETE = "The selected Priority/Sub-Team can not be deleted because has childs.";
var L2_MSG_PLAN_NOT_FOUND = "The Plan to new Priority/Sub-Team can not be found.";
var L2_MSG_TEAM_EXISTS = "Another Priority/Sub-Team with the same acronym already exists.";

// Get all Level 3 data by level 2 id
function getAllLevel3(hl2Id, userId) {
	var objHl2 = {};
	objHl2.IN_HL2_ID = hl2Id;

	var isSA = false;
	if (config.getApplySuperAdminToAllInitiatives()) {
		isSA = userbl.isSuperAdmin(userId);
	}
	var result = {};
	result = data.getAllLevel3(objHl2, userId, isSA);
	result.budget_year = budgetYear.getBudgetYearByLevelParent(3, hl2Id, true);
	return result;
}

function getAllHl3GroupByHl1(budgetYearId, regionId, subRegionId){
    return getHl3ByUserGroupByHl1(null, budgetYearId, regionId, subRegionId);
}

function getHl3ByUserGroupByHl1(userId, budgetYearId, regionId, subRegionId) {
    var isSA = userId ? util.isSuperAdmin(userId) : 1;
    var hl3 = data.getHl3PathByUserId(userId || 0, isSA, budgetYearId || 0, regionId || 0, subRegionId || 0);
    var collection = {};
    var L0 = 'CRM-';
    hl3.forEach(function (item) {
        if(!collection[item.HL1_ID]) {
            collection[item.HL1_ID] = {
                HL1_ID: item.HL1_ID
                , PATH: L0 + item.HL1_PATH
                , HL1_DESCRIPTION: item.HL1_DESCRIPTION
                , CHILDREN: {}
            };
        }
    	/*var hl3 = {
    		HL3_ID: item.HL3_ID,
			PATH: L0 + item.HL3_PATH,
			HL3_DESCRIPTION: item.HL3_DESCRIPTION
    	};
		if(!collection[item.HL1_ID]) {
			collection[item.HL1_ID] = {
				HL1_ID: item.HL1_ID
				, PATH: L0 + item.HL1_PATH
				, HL1_DESCRIPTION: item.HL1_DESCRIPTION
				, CHILDREN: [hl3]
			};
		} else {
			collection[item.HL1_ID].CHILDREN.push(hl3);
		}*/
    });
    hl3.forEach(function (item) {
        if(!collection[item.HL1_ID].CHILDREN[item.HL2_ID]) {
            collection[item.HL1_ID].CHILDREN[item.HL2_ID] = {
                HL2_ID: item.HL2_ID
                , PATH: L0 + item.HL2_PATH
                , HL2_DESCRIPTION: item.HL2_DESCRIPTION
                , CHILDREN: []
            };
        }
    });
    hl3.forEach(function (item) {
        collection[item.HL1_ID].CHILDREN[item.HL2_ID].CHILDREN.push({
            HL3_ID: item.HL3_ID,
            PATH: L0 + item.HL3_PATH,
            HL3_DESCRIPTION: item.HL3_DESCRIPTION
        });
    });
    return collection;
}

// Get an Level 3 data by id
function getLevel3ById(hl3Id, userId) {
	var objHl3 = {};
	objHl3.IN_HL3_ID = hl3Id;
	return data.getLevel3ById(objHl3, userId);
}

function getLevel3ForSearch(userSessionID,budget_year_id,region_id,subregion_id,offset,limit){
	var defaultBudgetYear = budgetYear.getDefaultBudgetYear();
	var query = data.getLevel3ForSearch(
		userSessionID,
		util.isSuperAdmin(userSessionID) ? 1 : 0,
		budget_year_id || defaultBudgetYear.BUDGET_YEAR_ID,
		region_id,
		subregion_id,
		offset,
		limit);
	var result = query.result;
	var resultRefactor = [];
	for (var i = 0; i < result.length; i++) {
		var aux = {};
		var object = result[i];
		aux.ID = object.ID;
		aux.PARENT_ID = object.PARENT_ID;
		aux.ORGANIZATION_ACRONYM = object.ORGANIZATION_ACRONYM;
		aux.REGION_NAME = object.REGION_NAME;
		aux.SUBREGION_NAME = object.SUBREGION_NAME;
		aux.PATH = "CRM-" + object.PATH;
		resultRefactor.push(aux);
	}
	return {result: resultRefactor, total_rows: query.total_rows};
}

function getLevel3ByAcronym(objHl3, userId) {
	return data.getLevel3ByAcronym(objHl3, userId);
}

function existsHl3(objHl3, userId){
	var hl2 = dataHl2.getLevel2ById(objHl3);
	objHl3.IN_HL1_ID = hl2.HL1_ID;

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
        var hl2 = dataHl2.getLevel2ById(objHl3);
		if (!hl2 || !hl2.HL2_ID)
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
		try {
			// SET CRM ID
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

//Insert new HL3 version based on the current HL1.
function insertLevel3Version(currentHL3, userId){
	//Insert the new version	
	if(validateLevel3Version(currentHL3)){
		return data.insertLevel3Version(	
				currentHL3.HL3_ID, 
				currentHL3.VERSION,
				currentHL3.ACRONYM,
				currentHL3.HL3_DESCRIPTION,
				currentHL3.HL3_FNC_BUDGET_TOTAL,
				userId,
				currentHL3.BUSINESS_OWNER_ID,
				currentHL3.ORIGIN_PLAN_ID,
				currentHL3.HL2_ID,
				currentHL3.CRM_ID,
				currentHL3.HL3_HIERARCHY_ID,
				currentHL3.HL3_STATUS_DETAIL_ID,
				currentHL3.IN_BUDGET										
		);
	}
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
					"",
					L2_MSG_TEAM_EXISTS);
		
		try {
			//Obtain current HL3
			var currentHL3 = data.getLevel3ById(objHl3, userId);
			currentHL3 = JSON.parse(JSON.stringify(currentHL3));
			objHl3.VERSION = currentHL3.VERSION;
			
			//Insert new HL3 version, if the date is into the valid range
            if(budgetYear.getLockFlagByHlIdLevel(currentHL3.HL3_ID, 'HL3') && validateChanges(currentHL3, objHl3)){
            	insertLevel3Version(currentHL3, userId);
            	//Update HL3 version
            	objHl3.VERSION = currentHL3.VERSION + 1;
            }
            
			objHl3.IN_IN_BUDGET = checkBudgetStatus(objHl3.IN_HL2_ID, userId, objHl3.IN_HL3_ID, objHl3.IN_HL3_FNC_BUDGET_TOTAL);
			result = data.updateLevel3(objHl3, userId);

			if (result) {
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
                var hl3User = [];
				//delete all in HL3_USER
				dataHl3User.delAllLevel3User(objHl3);
				for (var i = 0; i < listObjHl3User.length; i++) {
					if(!validateHl3UserPair(listObjHl3User[i], objHl3))
						//insert pair (hl3_id, user_id)	
                        hl3User.push({
                            in_hl3_id: objHl3.IN_HL3_ID
                            , in_user_id: listObjHl3User[i].IN_USER_ID
                            , in_created_user_id: userId
                        });
				}
				if(hl3User.length)
                    dataHl3User.insertLevel3User(hl3User);//listObjHl3User[i], objHl3, userId);
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
				"",
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
					"", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"", JSON.stringify(errors));
	}
	return isValid;
}

// Local method to check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'IN_ACRONYM':
        valid = value.replace(/\s/g, "").length === 3;
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
		valid = Number(value) > 0;
		break;
	}
	return valid;
}

//TODO: send email to owner user of hl4id´s. That is HL4 created user
//resBudgetStatus contains two list. The emailListInBudget with initiatives or campaign changed to in budget, and emailListOutBudget with initiatives or campaign changed to out budget
function sendEmail(resBudgetStatus, userId){

	if(config.getActivateNotificationLevel3()){
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

				var to = config.getNotifyLevel3Account();
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
					result.emailListOutBudget.push(resultHl3.out_result[i]);
				} else {
					data.updateHl3BudgetStatus(resultHl3.out_result[i].HL3_ID, userId, 1);
					total = total + parseFloat(resultHl3.out_result[i].HL3_BUDGET_TOTAL);
					result.emailListInBudget.push(resultHl3.out_result[i]);
				}
			}
			result.hasChanged = result.emailListInBudget.length || result.emailListOutBudget.length;
		}
		return result;
	}
}

function checkPermission(userSessionID, method, hl3Id){
    if(((method && method == "GET_BY_HL3_ID") || !method) && !util.isSuperAdmin(userSessionID)){
        var usersL3 = userbl.getUserByHl3Id(hl3Id).users_in;
        var users = usersL3.find(function(user){return user.USER_ID == userSessionID});
        if(!users){
            throw ErrorLib.getErrors().CustomError("","level3/handlePermission","User hasn´t permission for this resource.");
        }
    }
}

function getHistory(HL3_ID){
	return dataHl3.getAllHl3VersionByHl3Id(HL3_ID);
}

//Check data types for version insert
function validateVersionType(key, value) {
    var valid = true;
    switch (key) {
        case 'HL3_ID':
        case 'HL2_ID':
        case 'HL3_STATUS_DETAIL_ID':
        case 'BUSINESS_OWNER_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VERSION':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ACRONYM':
            valid = value.length > 0 && value.length <= 25;
            break;
        case 'HL3_DESCRIPTION':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'IN_BUDGET':
            valid = !isNaN(value) && (value === 0 || value === 1);
            break;
        case 'ORIGIN_PLAN_ID':
        case 'CRM_ID':
        case 'HL3_HIERARCHY_ID':
            valid = !value || (!isNaN(value) && value > 0);
            break;
        case 'HL3_FNC_BUDGET_TOTAL':
            valid = !value || !isNaN(value);
            break;            
    }
    return valid;
}

function validateLevel3Version(data){
	var isValid = false;
    var errors = {};
    var BreakException = {};
    
    var keys = [
                'HL3_ID', 
                'VERSION',
                'ACRONYM',
                'HL3_DESCRIPTION',
                'HL3_STATUS_DETAIL_ID',
                'BUSINESS_OWNER_ID',
                'HL2_ID',
                'IN_BUDGET'
                ];
    
    var optionalKeys = [
                        'ORIGIN_PLAN_ID',
                        'CRM_ID',
                        'HL3_HIERARCHY_ID',
                        'HL3_FNC_BUDGET_TOTAL'
                        ];

    try {

            keys.forEach(function (key) {
                if (data[key] === null || data[key] === undefined) {
                    errors[key] = null;
                    throw BreakException;
                } else {
                    // validate attribute type
                    isValid = validateVersionType(key, data[key]);
                    if (!isValid) {
                        errors[key] = data[key];
                        throw BreakException;
                    }
                }
            });
            
            optionalKeys.forEach(function(key) {
    			// validate attribute type
    			isValid = validateVersionType(key, data[key]);
    				if (!isValid) {
    					errors[key] = data[key];
    					throw BreakException;
    				}

    		});
            
        isValid = true;
        
    } catch (e) {
        if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePut/validateLevel3Version", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePut/validateLevel3Version"
                , JSON.stringify(errors));
    }
    return isValid;
}

function validateChanges(originalHL3, newHL3){
	var validation = false;

	Object.keys(newHL3).forEach(function(key){
		switch(key){
			case 'IN_ACRONYM':
				if(originalHL3.ACRONYM !== newHL3.IN_ACRONYM){
					validation = true;
				}
				break;
			case 'IN_HL3_DESCRIPTION':
				if(originalHL3.HL3_DESCRIPTION !== newHL3.IN_HL3_DESCRIPTION){
					validation = true;
				}
				break;
			case 'IN_BUSINESS_OWNER_ID':
				if(Number(originalHL3.BUSINESS_OWNER_ID) !==  Number(newHL3.IN_BUSINESS_OWNER_ID)){
					validation = true;
				}
				break;
			case 'IN_HL3_FNC_BUDGET_TOTAL':
				if(Number(originalHL3.HL3_FNC_BUDGET_TOTAL) !== Number(newHL3.IN_HL3_FNC_BUDGET_TOTAL)){
					validation = true;
				}
				break;
		}
	});

	return validation;
}


function getHistory(HL3_ID){
	return data.getAllHl3VersionByHl3Id(HL3_ID);
}

function getHistoryDetail(HL_ID, VERSION){
	return data.getLevel3VersionById(HL_ID, VERSION);
}

function getHistoryAllFirstVersion(hl_id, userSessionID){
	return data.getLevel3VersionForFilter(hl_id,userSessionID, userbl.isSuperAdmin(userSessionID) );
}