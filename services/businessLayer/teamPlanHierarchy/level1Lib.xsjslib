$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataHl1 = mapper.getDataLevel1();
var dataHl2 = mapper.getDataLevel2();
var dataHl1User = mapper.getDataLevel1User();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var db = mapper.getdbHelper();
var blPath = mapper.getPath();
var userbl = mapper.getUser();
var userRoleLib = mapper.getUserRole();
var config = mapper.getDataConfig();
var businessError = mapper.getLogError();
var businessBudget = mapper.getBudgetYear();
var dataHl2User = mapper.getDataLevel2User();
var level2 = mapper.getLevel2();
/** ***********END INCLUDE LIBRARIES*************** */

var TEAM_TYPE = {
    REGIONAL: 1,
    CENTRAL: 2
};

var map = {
    IN_HL1_ID: "HL1_ID",
    IN_ACRONYM: "ACRONYM",
    IN_HL1_BUDGET_TOTAL: "BUDGET",
    IN_BUDGET_YEAR_ID: "BUDGET_YEAR_ID",
    IN_DESCRIPTION: "DESCRIPTION",
    IN_CRT_RELATED: "CRT_RELATED",
    IN_IMPLEMENT_EXECUTION_LEVEL: "IMPLEMENT_EXECUTION_LEVEL",
    IN_TEAM_TYPE_ID: "TEAM_TYPE_ID",
    IN_REGION_ID: "REGION_ID",
    IN_SUBREGION_ID: "SUBREGION_ID",
    IN_USER_ID: "USER_ID"
};

var L1_MSG_LEVEL_1_EXISTS = "Another Plan with the same acronym and budget year already exists";
var L1_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L1_MSG_PLAN_NOT_FOUND = "The Plan can not be found.";
var L1_MSG_PLAN_CANT_DELETE = "The selected Plan can not be deleted because has childs.";
var L1_MSG_USER_NOT_FOUND = "The User can not be found.";
var L1_MSG_TYPE_VALUE_ERROR = "Some values are not valid.";
var L1_MSG_MARKET_UNIT_ERROR = "Market Unit is not valid for the selected Region.";

function getAllLevel1() {
    return dataHl1.getAllLevel1();
}

function getLevel1ById(hl1Id) {
    if (!hl1Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter hl1Id is not found", "level1Services/handleGet/getLevel1ById", L1_MSG_PLAN_NOT_FOUND);

    return dataHl1.getLevel1ById(hl1Id);
}

/*INSERT A NEW HL2 WITH CREO O MORE USERS ASICIATIONS*/
function insertHl1(data, userId) {
    data = uiToServerParser(data);
    validateHl1(data);


    var hl1_id = dataHl1.insertLevel1(data.ACRONYM, data.DESCRIPTION, data.BUDGET_YEAR_ID, data.REGION_ID, data.SUBREGION_ID, userId, data.BUDGET, data.TEAM_TYPE_ID, data.IMPLEMENT_EXECUTION_LEVEL, data.CRT_RELATED);

    //INSERT USERS RELATED TO HL2
    data.HL1_ID = hl1_id;
    var listObjHl1User = data.USERS;
    /******************/
    listObjHl1User = completeUsers(listObjHl1User); //add SA users
    /******************/
    if (listObjHl1User) {
        if (validateHl1User(listObjHl1User)) {
            var arrHl1User = [];
            for (var i = 0; i < listObjHl1User.length; i++) {
                arrHl1User.push({
                    in_hl1_id: hl1_id
                    , in_user_id: listObjHl1User[i].USER_ID
                    , in_created_user_id: userId
                });
            }

            if (arrHl1User.length > 0) {
                dataHl1User.delAllLevel1User(data.HL1_ID);
                dataHl1User.insertLevel1User(arrHl1User);
            }
        }
    }
    return hl1_id;
}

function insertHl1FromUpload(data, userId) {
    //data = uiToServerParser(data);

    validateHl1ForUpload(data);

    var hl1_id = dataHl1.insertLevel1(data.ACRONYM, data.DESCRIPTION, data.BUDGET_YEAR_ID, data.REGION_ID, data.SUBREGION_ID
        , userId, data.BUDGET, data.TEAM_TYPE_ID, data.IMPLEMENT_EXECUTION_LEVEL, data.CRT_RELATED);

    //INSERT USERS RELATED TO HL2
    data.HL1_ID = hl1_id;
    var listObjHl1User = data.USERS;
    /******************/
    listObjHl1User = completeUsers(listObjHl1User); //add SA users
    /******************/
    if (listObjHl1User) {
        if (validateHl1User(listObjHl1User)) {
            var arrHl1User = [];
            for (var i = 0; i < listObjHl1User.length; i++) {
                arrHl1User.push({
                    in_hl1_id: hl1_id
                    , in_user_id: listObjHl1User[i].USER_ID
                    , in_created_user_id: userId
                });
            }

            if (arrHl1User.length > 0) {
                dataHl1User.delAllLevel1User(data.HL1_ID);
                dataHl1User.insertLevel1User(arrHl1User);
            }
        }
    }
    return hl1_id;
}

//Insert new HL1 version based on the current HL1.
function insertLevel1Version(currentHL1, userId){
	//Insert the new version
	return dataHl1.insertLevel1Version(	currentHL1.HL1_ID, 
								currentHL1.VERSION,
								currentHL1.ACRONYM,
								currentHL1.DESCRIPTION,
								currentHL1.BUDGET_YEAR_ID,
								currentHL1.REGION_ID,
								currentHL1.SUBREGION_ID,
								userId, 
								currentHL1.BUDGET,
								currentHL1.TEAM_TYPE_ID,
								currentHL1.IMPLEMENT_EXECUTION_LEVEL,
								currentHL1.CRT_RELATED
								);
}

function updateHl1(data, userId) {
    data = uiToServerParser(data);
    validateHl1(data);

    var hl1Id = data.HL1_ID;
    var currentHL1 = dataHl1.getLevel1ById(data.HL1_ID);
    currentHL1 = JSON.parse(JSON.stringify(currentHL1));
    
    var budgetChanged = Number(currentHL1.BUDGET) != Number(data.BUDGET);
    
    //Insert new HL1 version, if the date is into the valid range
    if(businessBudget.getLockFlagByHlIdLevel(hl1Id, 'HL1') && validateChanges(currentHL1, data)){
    	insertLevel1Version(currentHL1, userId);
    	currentHL1.VERSION += 1;
    }
    var updated = dataHl1.updateLevel1(data.HL1_ID, data.ACRONYM, data.DESCRIPTION, data.BUDGET_YEAR_ID, data.REGION_ID, data.SUBREGION_ID, userId, data.BUDGET, data.TEAM_TYPE_ID, data.IMPLEMENT_EXECUTION_LEVEL, data.CRT_RELATED, currentHL1.VERSION);

    if (budgetChanged) {
        level2.checkBudgetStatus(data.HL1_ID, userId);
    }

    var listObjHl1User = data.USERS;
    var hl2List = dataHl2.getAllLevel2(data.HL1_ID, userId);
    var hl1Users = dataHl1User.getAllHl1User(data.HL1_ID);
    var arrHl1User = [];
    var arrHl2User = [];
    var arrDelHl2User = [];
    if (listObjHl1User) {
        if (validateHl1User(listObjHl1User)) {
            //delete all in HL2_USER
            dataHl1User.delAllLevel1User(data.HL1_ID);

            for (var i = 0; i < listObjHl1User.length; i++) {
                arrHl1User.push({
                    in_hl1_id: data.HL1_ID
                    , in_user_id: listObjHl1User[i].USER_ID
                    , in_created_user_id: userId
                });

                if (notExistHl1UserInList(hl1Users, listObjHl1User[i].USER_ID)) {
                    hl2List.forEach(function (hl2) {
                        arrHl2User.push({
                            in_hl2_id: hl2.HL2_ID
                            , in_user_id: listObjHl1User[i].USER_ID
                            , in_created_user_id: userId
                        });
                    });
                }

            }
            if (arrHl1User.length > 0) {
                dataHl1User.insertLevel1User(arrHl1User);
            }
            if (arrHl2User.length > 0) {
                dataHl2User.insertLevel2User(arrHl2User);
            }

            for (var j = 0; j < hl1Users.length; j++) {
                if (notExistHl1UserInList(listObjHl1User, hl1Users[j].USER_ID)) {
                    hl2List.forEach(function (hl2) {
                        arrDelHl2User.push({
                            in_hl2_id: hl2.HL2_ID
                            , in_user_id: hl1Users[j].USER_ID
                        });
                    });
                }
            }
            if (arrDelHl2User.length > 0)
                dataHl2User.deleteLevel2User(arrDelHl2User);
        }
    }
    else {
        dataHl1User.delAllLevel2User(data.HL1_ID);
        hl2List.forEach(function (hl2) {
            dataHl2User.delAllLevel2User(hl2.HL2_ID, userId);
        });
    }
    return updated;
}

function deleteHl1(hl1, userId) {
    //verify if userId is SUPERADMIN, then can delete
    var hl1Id = hl1.IN_HL1_ID;
    var rol = userRoleLib.getUserRoleByUserId(userId);
    var userRoleId = 0;
    if (rol) {
        userRoleId = Number(rol[0]['ROLE_ID']);
    }
    if (userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_NO_PRIVILEGE);

    if (!hl1Id)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);
    if (!util.validateIsNumber(hl1Id))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);

    if (dataHl1.countRelatedObjects(hl1Id))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_CANT_DELETE);

    return dataHl1.deleteHl1(hl1Id, userId);
}

function completeUsers(users) {
    var id = config.getRoleEnum().SuperAdmin;
    var listUsers = [];
    for (var j = 0; j < users.length; j++) {
        listUsers.push(users[j]['USER_ID']);
    }
    var saUsers = userbl.getUserByRoleId(id);

    for (var i = 0; i < saUsers.length; i++) {
        if (!contains(listUsers, saUsers[i]['USER_ID'])) {
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

function notExistHl1UserInList(hl2Users, hl2UserId) {
    var exist = 0;
    hl2Users.forEach(function (hl2User) {
        if (hl2User.USER_ID == hl2UserId) {
            ++exist;
        }
    });

    return !exist;
}

function getLevel1ByUser(userId) {
    if (!userId)
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "level1Services/handleGet/getLevel1ByUser", L1_MSG_USER_NOT_FOUND);

    var isSA = util.isSuperAdmin(userId);
    return dataHl1.getLevel1ByUser(isSA, userId);
}

function getLevel1ByFilters(budgetYearId, regionId, subRegionId, userId) {
    var isSA = false;

    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }
    return dataHl1.getLevel1ByFilters(budgetYearId, regionId, subRegionId, userId, isSA);
}

function getLevel1ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userSessionID) {
    var result = dataHl1.getLevel1ForSearch(budgetYearId || 1, regionId || 0, subRegionId || 0, limit, offset || 0, userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0);
    var total_rows = result.total_rows;
    result = JSON.parse(JSON.stringify(result.result));

    result.forEach(function (object) {
        object.PATH = "CRM-" + object.ACRONYM + (object.BUDGET_YEAR % 100);
    });
    return {result: result, total_rows: total_rows};
}

function validateHl1(data) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'ACRONYM',
        'DESCRIPTION',
        'BUDGET_YEAR_ID',
        'BUDGET',
        'TEAM_TYPE_ID',
        'IMPLEMENT_EXECUTION_LEVEL',
        'CRT_RELATED'
    ];

    var keysTeamType = [
        'REGION_ID',
        'SUBREGION_ID'
    ];

    if (!data)
        throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/insertHl1", L1_MSG_PLAN_NOT_FOUND);

    try {
        keys.forEach(function (key) {
            if (data[key] === null || data[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, data[key]);
                //the organization type is Central team
                if (key === 'TEAM_TYPE_ID' && data[key] == TEAM_TYPE.REGIONAL) {
                    keysTeamType.forEach(function (k) {
                        if (k != 'SUBREGION_ID' && (data[k] === null || data[k] === undefined)) {
                            errors[k] = null;
                            throw BreakException;
                        } else {
                            // validate attribute type
                            isValid = k == 'SUBREGION_ID' && data.SUBREGION_ID ? validateType(k, data[k]) : true;

                            if (k != 'SUBREGION_ID')
                                isValid = validateType(k, data[k]);

                            if (!isValid) {
                                errors[k] = data[k];
                                throw BreakException;
                            }
                        }
                    });
                }
                if (!isValid) {
                    errors[key] = data[key];
                    throw BreakException;
                }
            }
        });

        var oldHl1 = dataHl1.getLevel1ByAcronymByBudgetYearId(data.ACRONYM, data.BUDGET_YEAR_ID);
        if (oldHl1 && oldHl1.HL1_ID != data.HL1_ID)
            throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/insertHl1", L1_MSG_LEVEL_1_EXISTS);

        isValid = true;
    } catch (e) {
        if (e.code == 450)
            throw e.details;
        else if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/insertHl1", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/insertHl1"
                , JSON.stringify(errors));
    }
    return isValid;
}

function validateHl1ForUpload(data) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'ACRONYM',
        'DESCRIPTION',
        'BUDGET_YEAR_ID',
        'BUDGET',
        'TEAM_TYPE_ID',
        'IMPLEMENT_EXECUTION_LEVEL',
        'CRT_RELATED'
    ];

    var keysTeamType = [
        'REGION_ID',
        'SUBREGION_ID'
    ];

    if (!data) {
        var error = ErrorLib.getErrors().ImportError("", "hl1Services/handlePost/validateHl1ForUpload", L1_MSG_PLAN_NOT_FOUND);
        error.row = valuesToArray(data);
        throw error;
    }

    //validate data types
    try {
        keys.forEach(function (key) {
            if (data[key] === null || data[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, data[key]);
                //the organization type is Central team
                if (key === 'TEAM_TYPE_ID' && data[key] == TEAM_TYPE.REGIONAL) {
                    keysTeamType.forEach(function (k) {
                        if (k != 'SUBREGION_ID' && (data[k] === null || data[k] === undefined)) {
                            errors[k] = null;
                            throw BreakException;
                        } else {
                            // validate attribute type
                            isValid = k == 'SUBREGION_ID' && data.SUBREGION_ID ? validateType(k, data[k]) : true;

                            if (k != 'SUBREGION_ID')
                                isValid = validateType(k, data[k]);

                            if (!isValid) {
                                errors[k] = data[k];
                                throw BreakException;
                            }
                        }
                    });
                }
                if (!isValid) {
                    errors[key] = data[key];
                    throw BreakException;
                }
            }
        });
    } catch (e) {
        if (e == BreakException) {
            //throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/validateHl1ForUpload", JSON.stringify(errors));
            var error = ErrorLib.getErrors().ImportError("", "hl1Services/handlePost/validateHl1ForUpload", L1_MSG_TYPE_VALUE_ERROR);
            error.row = valuesToArray(errors);
            throw error;
        }
    }

    //validate if the plan exists
    var oldHl1 = dataHl1.getLevel1ByAcronymByBudgetYearId(data.ACRONYM, data.BUDGET_YEAR_ID);
    if (oldHl1 && oldHl1.HL1_ID) {
        var error = ErrorLib.getErrors().ImportError("", "hl1Services/handlePost/validateHl1ForUpload", L1_MSG_LEVEL_1_EXISTS);
        error.row = valuesToArray(data);
        throw error;
    }

    //validate regional plan
    if(data.REGIONAL_TEAM == TEAM_TYPE.REGIONAL){
        //case not region = ALL, Market Unit = NONE
        if(data.REGION_ID){
            if(data.SUBREGION_ID){
                valid = dataRegion.validateRegionAndMarketUnit(data.REGION_ID, data.SUBREGION_ID);
                if (!valid){
                    var error = ErrorLib.getErrors().ImportError("", "hl1Services/handlePost/validateHl1ForUpload", L1_MSG_MARKET_UNIT_ERROR);
                    error.row = valuesToArray(data);
                    throw error;
                }
            }
        }
    }
    return true;
}

function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'ACRONYM':
            valid = value.length > 0 && value.length <= 2;
            break;
        case 'DESCRIPTION':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'BUDGET_YEAR_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'USER_ID':
        case 'HL2_ID':
        case 'TEAM_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'BUDGET':
            valid = Number(value) > 0;
            break;
    }
    return valid;
}

/*VALIDATE TYPES VALUES OF RELATED OBJECT TO HL2_USER*/
function validateHl1User(listObjHl2User) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['USER_ID'];

    if (!listObjHl2User)
        return true;

    try {

        for (var i = 0; i < listObjHl2User.length; i++) {
            keys.forEach(function (key) {
                if (listObjHl2User[i][key] === null || listObjHl2User[i][key] === undefined) {
                    errors[key] = null;
                    throw BreakException;
                } else {
                    // validate attribute type
                    isValid = validateType(key, listObjHl2User[i][key]);
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
                , JSON.stringify(errors));
    }
    return isValid;
}

/*VALIDATE IF EXITS DE PAIR HL2_USER IN DATABASE*/
function validateHl1UserPair(userId, hl1Id) {
    return dataHl1User.existsHl1UserPair(userId, hl1Id);
}

function uiToServerParser(object) {
    var data = JSON.stringify(object, function (key, value) {
        if (Array.isArray(value)) {
            return value;
        } else if (value && typeof value === 'object') {
            var replacement = {};
            Object.keys(value).forEach(function (k) {
                replacement[map[k] || k] = value[k];
            });
            return replacement;
        }
        return value;
    });

    data = JSON.parse(data);

    return data;
}

function checkPermission(userSessionID, method, hl1Id) {
    if (((method && method == "HL1_ID") || !method) && !util.isSuperAdmin(userSessionID)) {
        var usersL1 = userbl.getUserByHl1Id(hl1Id).users_in;
        var users = usersL1.find(function (user) {
            return user.USER_ID == userSessionID
        });
        if (!users) {
            throw ErrorLib.getErrors().CustomError("", "level1/handlePermission", "User hasn´t permission for this resource.");
        }
    }
}

function validateChanges(originalHL1, newHL1){
	var validation = false;
	
	Object.keys(newHL1).forEach(function(key){
		switch(key){
			case 'BUDGET_YEAR_ID':
				if(Number(originalHL1.BUDGET_YEAR_ID) !== Number(newHL1.BUDGET_YEAR_ID)){
					validation = true;
				}
				break;
			case 'ACRONYM':
				if(originalHL1.ACRONYM !== newHL1.ACRONYM){
					validation = true;
				}
				break;
			case 'DESCRIPTION':
				if(originalHL1.DESCRIPTION !== newHL1.DESCRIPTION){
					validation = true;
				}
				break;
			case 'BUDGET':
				if(Number(originalHL1.BUDGET) !==  Number(newHL1.BUDGET)){
					validation = true;
				}
				break;
			case 'IMPLEMENT_EXECUTION_LEVEL':
				if(originalHL1.IMPLEMENT_EXECUTION_LEVEL !== newHL1.IMPLEMENT_EXECUTION_LEVEL){
					validation = true;
				}
				break;
			case 'CRT_RELATED':
				if(originalHL1.CRT_RELATED !== newHL1.CRT_RELATED){
					validation = true;
				}
				break;
			case 'REGION_ID':
				if(originalHL1.REGION_ID !== newHL1.REGION_ID){
					validation = true;
				}
				break;
			case 'SUBREGION_ID':
				if(originalHL1.SUBREGION_ID !== newHL1.SUBREGION_ID){
					validation = true;
				}
				break;
			case 'TEAM_TYPE_ID':
				if(Number(originalHL1.TEAM_TYPE_ID) !== Number(newHL1.TEAM_TYPE_ID)){
					validation = true;
				}
				break;
		}
	});
	
	return validation;
}

function getHistory(HL1_ID){
    return dataHl1.getAllHl1VersionByHl1Id(HL1_ID);
}

function getHistoryDetail(HL_ID, VERSION){
    return dataHl1.getLevel1VersionById(HL_ID, VERSION);
}

function getHistoryAllFirstVersion(budgetYearId, regionId, subRegionId, userSessionID){
    return dataHl1.getLevel1VersionForFilter(budgetYearId, regionId, subRegionId,
        userSessionID, userbl.isSuperAdmin(userSessionID));
}