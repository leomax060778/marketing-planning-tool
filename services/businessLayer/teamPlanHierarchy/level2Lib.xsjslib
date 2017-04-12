$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataHl1 = mapper.getDataLevel1();
var dataHl2 = mapper.getDataLevel2();
var dataHl2User = mapper.getDataLevel2User();
var hl3 = mapper.getLevel3();
var dataHl3 = mapper.getDataLevel3();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var db = mapper.getdbHelper();
var blPath = mapper.getPath();
var userbl = mapper.getUser();
var userRoleLib = mapper.getUserRole();
var config = mapper.getDataConfig();
var contactDataLib = mapper.getContactData();
var businessError = mapper.getLogError();
var dataHl3User = mapper.getDataLevel3User();
/** ***********END INCLUDE LIBRARIES*************** */
var blLevel1 = mapper.getLevel1();

var LEVEL3 = 3;
var TEAM_TYPE_CENTRAL = "2";

var L1_MSG_CENTRAL_TEAM_EXISTS = "Another Central Team with the same acronym already exists.";
var L1_MSG_PLAN_EXISTS = "Another Plan with the same acronym already exists";
var L1_MSG_LEVEL_1_EXISTS = "Another Team with the same organization acronym already exists";
var L1_MSG_PLAN_NO_CREATED = "The Plan could not be created.";
var L1_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L1_MSG_PLAN_NOT_FOUND = "The Plan can not be found.";
var L1_MSG_PLAN_CANT_DELETE = "The selected Plan can not be deleted because has childs.";
var L1_MSG_USER_NOT_FOUND = "The User can not be found."

function getHl2ByHl1Id(hl1Id, userId) {
    var isSA = false;
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }
    return dataHl2.getHl2ByHl1Id(hl1Id, userId, isSA);
}

/*INSERT A NEW HL2 WITH CREO O MORE USERS ASICIATIONS*/
function insertHl2(objLevel2, userId) {
    if (validateInsertHl2(objLevel2)) {
        var hl1 = dataHl1.getLevel1ById(objLevel2.IN_PLAN_ID);
        if (dataHl2.getLevelByAcronymAndOrganizationAcronym(hl1.ACRONYM, hl1.BUDGET_YEAR_ID, objLevel2.IN_ORGANIZATION_ACRONYM)) {
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_LEVEL_1_EXISTS);
        }
        objLevel2.IN_IN_BUDGET = checkBudgetStatus(objLevel2.IN_PLAN_ID, userId, null, objLevel2.IN_HL2_BUDGET_TOTAL);
        var objhl2 = dataHl2.insertLevel2(objLevel2, userId);

        if (objhl2) {
            if (objhl2 > 0) {
                if (hl1.TEAM_TYPE_ID == TEAM_TYPE_CENTRAL && objLevel2.contactData && objLevel2.contactData.length)
                    contactDataLib.insertContactData(objLevel2.contactData, userId, objhl2);

                //INSERT USERS RELATED TO HL2
                objLevel2.IN_HL2_ID = objhl2;
                var listObjHl2User = objLevel2.USERS;
                /******************/
                listObjHl2User = completeUsers(listObjHl2User); //add SA users
                /******************/
                if (listObjHl2User) {
                    if (validateHl2User(listObjHl2User)) {
                        for (var i = 0; i < listObjHl2User.length; i++) {
                            if (!validateHl2UserPair(listObjHl2User[i], objLevel2)) {
                                dataHl2User.insertLevel2User(listObjHl2User[i], objLevel2, userId);
                            }
                        }
                    }
                }
                return objLevel2.IN_HL2_ID;
            }
            else
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);
        }
        else
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);
    }
}

function completeUsers(users) {
    var id = config.getRoleEnum().SuperAdmin;
    var listUsers = [];
    for (var j = 0; j < users.length; j++) {
        listUsers.push(users[j]['IN_USER_ID']);
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

function updateHl2(objLevel2, userId) {
        if (validateUpdateHl2(objLevel2)) {
            var updated = 0;
            var objHl2 = {};
            objHl2.IN_HL2_ID = objLevel2.IN_HL2_ID;
            if (canUpdate(objLevel2)) {
                var budgetChanged = dataHl2.getLevel2ById(objHl2).HL2_BUDGET_TOTAL != objLevel2.IN_HL2_BUDGET_TOTAL;
                var hl1 = dataHl1.getLevel1ById(objLevel2.IN_PLAN_ID);
                objLevel2.IN_IN_BUDGET = checkBudgetStatus(objLevel2.IN_PLAN_ID, userId, objLevel2.IN_HL2_ID, objLevel2.IN_HL2_BUDGET_TOTAL);
                dataHl2.updateLevel2(objLevel2, userId);
                if (hl1.TEAM_TYPE_ID == TEAM_TYPE_CENTRAL && objLevel2.contactData && objLevel2.contactData.length) {
                    contactDataLib.deleteContactDataByContactTypeId("hard", "CENTRAL", objLevel2.IN_HL2_ID);
                    contactDataLib.insertContactData(objLevel2.contactData, userId);
                }
            }
            else
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/updateHl2", L1_MSG_PLAN_EXISTS);

                if (budgetChanged) {
                    var resBudgetStatus = hl3.checkBudgetStatus(objLevel2.IN_HL2_ID, userId);
                    if (resBudgetStatus.hasChanged) {
                        //send all emails
                        try {
                            //sendEmail(resBudgetStatus, userId);
                        }
                        catch (e) {
                            //when error email exist, log error
                            businessError.log(ErrorLib.getErrors().CustomError("", "level2Lib/sendEmail", JSON.stringify(e)), userId, userId);
                        }
                    }
                }
                var listObjHl2User = objLevel2.USERS;
                var hl3List = dataHl3.getAllLevel3(objLevel2.IN_HL2_ID, userId).out_result;
                var hl2Users = dataHl2User.getAllHl2User(objLevel2.IN_HL2_ID);
                if (listObjHl2User) {
                    if (validateHl2User(listObjHl2User)) {
                        dataHl2User.delAllLevel2User(objLevel2);
                        for (var i = 0; i < listObjHl2User.length; i++) {
                            if (!validateHl2UserPair(listObjHl2User[i], objLevel2)) {
                                dataHl2User.insertLevel2User(listObjHl2User[i], objLevel2, userId);
                                if (notExistHl2UserInList(hl2Users, listObjHl2User[i].IN_USER_ID)) {
                                    hl3List.forEach(function (hl3) {
                                        dataHl3User.insertLevel3User(listObjHl2User[i].IN_USER_ID, hl3.HL3_ID, userId);
                                    });
                                }
                            }
                        }
                        for (var j = 0; j < hl2Users.length; j++) {
                            if (notExistHl2UserInList(listObjHl2User, hl2Users[j].USER_ID)) {
                                hl3List.forEach(function (hl3) {
                                    dataHl3User.deleteLevel3User({
                                        IN_HL3_USER_ID: hl2Users[j].USER_ID,
                                        IN_HL3_ID: hl3.HL3_ID
                                    }, userId);
                                });
                            }
                        }

                    }
                }
                else {
                    dataHl2User.delAllLevel2User(objLevel2);
                    hl3List.forEach(function (hl3) {
                        dataHl3User.delAllLevel3User(hl3.HL3_ID, userId);
                    });
                }
                return updated;
        }
}

function notExistHl2UserInList(hl2Users, hl2UserId) {
    var exist = 0;
    hl2Users.forEach(function (hl2User) {
        if (hl2User.USER_ID == hl2UserId) {
            ++exist;
        }
    });

    return !exist;
}

function deleteHl2(objLevel2, userId) {
    //verify if userId is SUPERADMIN, then can delete
    var rol = userRoleLib.getUserRoleByUserId(userId);
    var userRoleId = 0;
    if (rol) {
        userRoleId = Number(rol[0]['ROLE_ID']);
    }
    if (userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_NO_PRIVILEGE);

    if (!objLevel2.IN_HL2_ID)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);
    if (!util.validateIsNumber(objLevel2.IN_HL2_ID))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);
    if (hasChild(objLevel2))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_CANT_DELETE);

    contactDataLib.deleteContactDataByContactTypeId("soft", "CENTRAL", objLevel2.IN_HL2_ID, userId);

    return dataHl2.deleteHl2(objLevel2, userId);
}

function getLevel2ByUser(userId) {
    if (!userId)
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "level2Services/handleGet/getLevel2ByUser", L1_MSG_USER_NOT_FOUND);

    return dataHl2.getLevel2ByUser(userId);
}

function getLevel2ById(objLevel2) {
    if (!objLevel2)
        throw ErrorLib.getErrors().BadRequest("The Parameter hl2Id is not found", "level2Services/handleGet/getLevel2ById", L1_MSG_PLAN_NOT_FOUND);
    return dataHl2.getLevel2ById(objLevel2);
}

function getAllLevel2(hl1Id, userId) {
    return dataHl2.getAllLevel2(hl1Id);
}

function getLevel2ForSearch(userSessionID) {
    var result = dataHl2.getLevel2ForSearch(userSessionID, util.isSuperAdmin(userSessionID) ? 1:0);
    var resultRefactor = [];
    result.forEach(function (object) {
        var aux = {};

        aux.ID = object.ID;
        aux.PARENT_ID = object.PARENT_ID;
        aux.ORGANIZATION_ACRONYM = object.ORGANIZATION_ACRONYM;
        aux.PATH = "CRM-" + object.PATH;

        resultRefactor.push(aux);
    });
    return resultRefactor;
}

function existHl2(objLevel2) {
    return getLevel2ById(objLevel2).length > 0;
}

function getAllCentralTeam(centralTeamId) {
    return dataHl2.getAllCentralTeam(centralTeamId);
}

/*check if can update object because is not same another in db*/
function canUpdate(objLevel2) {
    var currentL2 = getLevel2ById(objLevel2);
    var hl1 = dataHl1.getLevel1ById(objLevel2.IN_PLAN_ID);
    var objHl2Other = dataHl2.getLevelByAcronymAndOrganizationAcronym(hl1.ACRONYM, hl1.BUDGET_YEAR_ID, objLevel2.IN_ORGANIZATION_ACRONYM);
    if (!objHl2Other) return true;
    //check the same object
    if (currentL2.HL2_ID != objHl2Other.HL2_ID)
        return false;
    else
        return true;
}

function hasChild(objLevel2) {
    return dataHl2.countRelatedObjects(objLevel2) > 0;
}

function validateInsertHl2(objLevel2) {
    var isValid = false;
    var isvalidOrganization = false;
    var errors = {};
    var BreakException = {};
    var keys = ['IN_HL2_BUDGET_TOTAL', 'IN_ORGANIZATION_ACRONYM', 'IN_ORGANIZATION_NAME'];

    if (!objLevel2)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NOT_FOUND);

    try {
        keys.forEach(function (key) {
            if (objLevel2[key] === null || objLevel2[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objLevel2[key]);
                if (!isValid) {
                    errors[key] = objLevel2[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e.code == 450)
            throw e.details;
        if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2"
                , JSON.stringify(errors));
    }
    return isValid;
}

function validateUpdateHl2(objLevel2) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['IN_HL2_ID', 'IN_HL2_BUDGET_TOTAL', 'IN_ORGANIZATION_ACRONYM', 'IN_ORGANIZATION_NAME'];

    if (!objLevel2)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePut/updateHl2", L1_MSG_PLAN_NOT_FOUND);

    try {
        keys.forEach(function (key) {
            if (objLevel2[key] === null || objLevel2[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objLevel2[key])

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
                , JSON.stringify(errors));
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'IN_ORGANIZATION_NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'IN_USER_ID':
        case 'IN_HL2_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'IN_HL2_BUDGET_TOTAL':
            valid = Number(value);
            break;
        case 'IN_ORGANIZATION_ACRONYM':
            valid = value.replace(/\s/g, "").length == 3;
            break;
    }
    return valid;
}

/*VALIDATE TYPES VALUES OF RELATED OBJECT TO HL2_USER*/
function validateHl2User(listObjHl2User) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['IN_USER_ID'];

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
                , JSON.stringify(errors));
    }
    return isValid;
}

/*VALIDATE IF EXITS DE PAIR HL2_USER IN DATABASE*/
function validateHl2UserPair(objHl2User, objLevel2) {
    return dataHl2User.existsHl2UserPair(objHl2User, objLevel2);
}

function sendEmail(resBudgetStatus, userId) {

    if(config.getActivateNotificationLevel2()){
        var stringInHl4 = "List In Budget: ";
        var stringOutHl4 = "List Out Budget: ";

        if (resBudgetStatus) {
            try {
                if (resBudgetStatus.emailListInBudget.length > 0) {
                    for (var i = 0; i < resBudgetStatus.emailListInBudget.length; i++) {
                        var objHl3 = resBudgetStatus.emailListInBudget[i];
                        if (objHl3)
                            stringInHl3 = stringInHl3 + "<p>" + i + " - " + "ACRONYM: " + objHl3.ACRONYM + ", DESCRIPTION: " + objHl3.HL3_DESCRIPTION + "</p>";
                    }
                }

                if (resBudgetStatus.emailListOutBudget.length > 0) {
                    for (var i = 0; i < resBudgetStatus.emailListOutBudget.length; i++) {
                        var objHl3 = resBudgetStatus.emailListOutBudget[i];
                        if (objHl3)
                            stringOutHl3 = stringOutHl3 + "<p>" + i + " - " + "ACRONYM: " + objHl3.ACRONYM + ", DESCRIPTION: " + objHl3.HL3_DESCRIPTION + "</p>";
                    }
                }


                var to = config.getNotifyLevel2Account();
                var body = '<p> Dear Colleague </p><p>We send the list of INITIATIVE/CAMPAIGN shipped in or out of budget</p>';
                body = body + stringInHl3;
                body = body + stringOutHl3;
                var mailObject = mail.getJson([{
                    "address": to
                }], "Marketing Planning Tool - Lits of TEAM/PRIORITY shipped in or out of budget", body);

                mail.sendMail(mailObject, true);
            }
            catch (e) {
                throw e;
            }
        }
    }
}

function checkBudgetStatus(hl1Id, userId, hl2Id, newHl2Budget) {
    if (hl1Id && newHl2Budget) {
        var hl1 = blLevel1.getLevel1ById(hl1Id);
        var hl1AllocatedBudget = dataHl1.getHl1AllocatedBudget(hl1Id, hl2Id);
        return (Number(hl1.BUDGET) - Number(hl1AllocatedBudget) - Number(newHl2Budget)) >= 0 ? 1 : 0;
    } else {
        var result = {};
        result.hasChanged = 0;
        result.emailListInBudget = [];
        result.emailListOutBudget = [];
        var resultHl2 = dataHl2.getHl2ByHl1Id(hl1Id, userId);
        if (resultHl2.out_result.length) {
            var hl1 = blLevel1.getLevel1ById(hl1Id);
            var hl1Budget = Number(hl1.BUDGET);
            var total = 0;
            for (var i = 0; i < resultHl2.out_result.length; i++) {
                if (hl1Budget < total + parseFloat(resultHl2.out_result[i].HL2_BUDGET_TOTAL)) {
                    dataHl2.updateHl2BudgetStatus(resultHl2.out_result[i].HL2_ID, userId, 0);
                    result.emailListOutBudget.push(resultHl2.out_result[i]);
                } else {
                    dataHl2.updateHl2BudgetStatus(resultHl2.out_result[i].HL2_ID, userId, 1);
                    total = total + parseFloat(resultHl2.out_result[i].HL2_BUDGET_TOTAL);
                    result.emailListInBudget.push(resultHl2.out_result[i]);
                }
            }
            result.hasChanged = result.emailListInBudget.length || result.emailListOutBudget.length;
        }
        return result;
    }
}

function checkPermission(userSessionID, method, hl2Id){
    if(((method && method == "HL2_ID") || !method) && !util.isSuperAdmin(userSessionID)){
        var usersL2 = userbl.getUserByHl2Id(hl2Id).users_in;
        var users = usersL2.find(function(user){return user.USER_ID == userSessionID});
        if(!users){
            throw ErrorLib.getErrors().CustomError("","level2/handlePermission","User hasn´t permission for this resource.");
        }
    }
}