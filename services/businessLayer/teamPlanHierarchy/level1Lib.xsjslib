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
var dataHl2User = mapper.getDataLevel2User();
var level2 = mapper.getLevel2();
/** ***********END INCLUDE LIBRARIES*************** */

var LEVEL3 = 3;
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

var L1_MSG_CENTRAL_TEAM_EXISTS = "Another Central Team with the same acronym already exists.";
var L1_MSG_PLAN_EXISTS = "Another Plan with the same acronym already exists";
var L1_MSG_LEVEL_1_EXISTS = "Another Level1 with the same acronym and budget year already exists";
var L1_MSG_PLAN_NO_CREATED = "The Plan could not be created.";
var L1_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L1_MSG_PLAN_NOT_FOUND = "The Plan can not be found.";
var L1_MSG_PLAN_CANT_DELETE = "The selected Plan can not be deleted because has childs.";
var L1_MSG_USER_NOT_FOUND = "The User can not be found.";

function getAllLevel1() {
    return dataHl1.getAllLevel1();
}

function getLevel1ById(hl1Id) {
    if (!hl1Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter hl1Id is not found", "level1Services/handleGet/getLevel1ById", L1_MSG_PLAN_NOT_FOUND);

    return dataHl1.getLevel1ById(hl1Id);
}

/*function getPlanByUser(userId) {
    if (!userId)
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "level1Lib/getPlanByUser", L1_MSG_USER_NOT_FOUND);

    return dataHl1.getLevel1ByUser(userId);
}*/

/*INSERT A NEW HL2 WITH CREO O MORE USERS ASICIATIONS*/
function insertHl1(data, userId) {
    data = uiToServerParser(data);
    validateHl1(data);

    //if (dataHl1.getLevelByAcronymBudgetYearId(data.ACRONYM, data.BUDGET_YEAR_ID))
    //    throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/insertHl1", L1_MSG_LEVEL_1_EXISTS);

    var hl1_id = dataHl1.insertLevel1(data.ACRONYM, data.DESCRIPTION, data.BUDGET_YEAR_ID, data.REGION_ID, data.SUBREGION_ID, userId, data.BUDGET, data.TEAM_TYPE_ID, data.IMPLEMENT_EXECUTION_LEVEL, data.CRT_RELATED);

    //INSERT USERS RELATED TO HL2
    data.HL1_ID = hl1_id;
    var listObjHl1User = data.USERS;
    /******************/
    listObjHl1User = completeUsers(listObjHl1User); //add SA users
    /******************/
    if (listObjHl1User) {
        if (validateHl1User(listObjHl1User)) {
            for (var i = 0; i < listObjHl1User.length; i++) {
                if (!validateHl1UserPair(listObjHl1User[i].USER_ID, hl1_id)) {
                    dataHl1User.insertLevel1User(hl1_id, listObjHl1User[i].USER_ID, userId);
                }
            }
        }
    }
    return hl1_id;
}

function updateHl1(data, userId) {
    data = uiToServerParser(data);
    validateHl1(data);

    var hl1Id = data.HL1_ID;
    var budgetChanged = Number(dataHl1.getLevel1ById(data.HL1_ID).BUDGET) != Number(data.BUDGET);
    var updated = dataHl1.updateLevel1(data.HL1_ID, data.ACRONYM, data.DESCRIPTION, data.BUDGET_YEAR_ID, data.REGION_ID, data.SUBREGION_ID, userId, data.BUDGET, data.TEAM_TYPE_ID, data.IMPLEMENT_EXECUTION_LEVEL, data.CRT_RELATED);

    if (budgetChanged) {
        level2.checkBudgetStatus(data.HL1_ID, userId);
    }


    var listObjHl1User = data.USERS;
    var hl2List = dataHl2.getAllLevel2(data.HL1_ID, userId);
    var hl1Users = dataHl1User.getAllHl1User(data.HL1_ID);
    if (listObjHl1User) {
        if (validateHl1User(listObjHl1User)) {
            //delete all in HL2_USER
            dataHl1User.delAllLevel1User(data.HL1_ID);
            for (var i = 0; i < listObjHl1User.length; i++) {
                if (!validateHl1UserPair(listObjHl1User[i].USER_ID, data.HL1_ID)) {
                    //insert pair (hl2_id, user_id)
                    dataHl1User.insertLevel1User(data.HL1_ID, listObjHl1User[i].USER_ID, userId);
                    if (notExistHl1UserInList(hl1Users, listObjHl1User[i].USER_ID)) {
                        hl2List.forEach(function (hl2) {
                            dataHl2User.insertLevel2User(listObjHl1User[i].USER_ID, hl2.HL2_ID, userId);
                        });
                    }
                }
            }
            for (var j = 0; j < hl1Users.length; j++) {
                if (notExistHl1UserInList(listObjHl1User, hl1Users[j].USER_ID)) {
                    hl2List.forEach(function (hl2) {
                        dataHl2User.deleteLevel2User(hl1Users[j].USER_ID, hl2.HL2_ID, userId);
                    });
                }
            }

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

//Get an Level 1 data by filter (in_budget_year_id, in_plan_id, in_region_id, in_subregion_id can be null)
function getLevel1ByFilters(budgetYearId, regionId, subRegionId, userId) {
    var isSA = false;

    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }
    return dataHl1.getLevel1ByFilters(budgetYearId, regionId, subRegionId, userId, isSA);
}

//function getLevel2ByAcronym(acronym) {
//    if (!acronym)
//        throw ErrorLib.getErrors().BadRequest("The Parameter acronym is not found", "level2Services/handleGet/getLevel2ByAcronym", acronym);
//    return dataHl2.getLevel2ByAcronym(acronym);
//}

//function getLevelByOrganizationAcronym(acronym) {
//    if (!acronym)
//        throw ErrorLib.getErrors().BadRequest("The Parameter acronym is not found", "level2Services/handleGet/getLevelByOrganizationAcronym", L1_MSG_PLAN_NOT_FOUND);
//    return dataHl2.getLevelByOrganizationAcronym(acronym);
//}

function getLevel1ForSearch(userSessionID) {
    var result = dataHl1.getLevel1ForSearch(userSessionID, util.isSuperAdmin(userSessionID) ? 1:0);
    var resultRefactor = [];
    result.forEach(function (object) {
        var aux = {};

        aux.ID = object.ID;
        aux.BUDGET_YEAR = Number(ctypes.Int64(object.BUDGET_YEAR));
        aux.ACRONYM = object.ACRONYM;
        aux.REGION_NAME = object.REGION_NAME;
        aux.SUBREGION_NAME = object.SUBREGION_NAME;
        aux.PATH = "CRM-" + object.PATH;

        resultRefactor.push(aux);
    });
    return resultRefactor;
}

//function existHl1(hl1Id) {
//    return getLevel1ById(hl1Id).length > 0;
//}

//function existHl2ByAcronym(hl2Acronym) {
//    var res = getLevel2ByAcronym(hl2Acronym);
//    if (res) return true;
//    else return false;
//}

//function existOrganizationAcronym(organizationAcronym) {
//    var ret = getLevelByOrganizationAcronym(organizationAcronym);
//    if (ret)
//        return true;
//    else return false;
//}

//function getAllCentralTeam(centralTeamId) {
//    return dataHl2.getAllCentralTeam(centralTeamId);
//}

/*check if can update object because is not same another in db*/
/*function canUpdate(objLevel2) {
 var currentL2 = getLevel2ById(objLevel2);
 var objHl2Other = dataHl2.getLevelByAcronymAndOrganizationAcronym(objLevel2.IN_ACRONYM, objLevel2.IN_BUDGET_YEAR_ID, objLevel2.IN_ORGANIZATION_ACRONYM);//getLevel2ByAcronym(objLevel2.IN_ACRONYM);
 if (!objHl2Other) return true;
 //check the same object
 if (currentL2.HL2_ID != objHl2Other.HL2_ID)
 return false;
 else
 return true;
 }*/

/*check if can update object because is not same another in db*/
/*function canUpdateOrganization(objLevel2) {
 return canUpdate(objLevel2);
 }*/

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
        else if(e !== BreakException )
            throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/insertHl1", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/insertHl1"
                , JSON.stringify(errors));
    }
    return isValid;
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
            valid = Number(value);
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

function checkPermission(userSessionID, method, hl1Id){
    if(((method && method == "HL1_ID") || !method) && !util.isSuperAdmin(userSessionID)){
        var usersL1 = userbl.getUserByHl1Id(hl1Id).users_in;
        var users = usersL1.find(function(user){return user.USER_ID == userSessionID});
        if(!users){
            throw ErrorLib.getErrors().CustomError("","level1/handlePermission","User hasn´t permission for this resource.");
        }
    }
}