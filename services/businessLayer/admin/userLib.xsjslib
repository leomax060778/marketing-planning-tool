/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var mail = mapper.getMail();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var config = mapper.getDataConfig();
var businessLavel3 = mapper.getLevel3();
var dataHl1User = mapper.getDataLevel1User();
var dataHl2User = mapper.getDataLevel2User();
var dataHl3User = mapper.getDataLevel3User();
var dataHl1 = mapper.getDataLevel1();
var dataHl2 = mapper.getDataLevel2();
var dataHl3 = mapper.getDataLevel3();
/** ********************************************** */

var DATA_NOT_FOUND = "Data is missing.";
var USER_NOT_FOUND = "User was not found.";
var PERMISSIONS_NOT_FOUND = "Permissions cannot be empty.";
var HIERARCHY_LEVEL_NOT_FOUND = "Hierarchy level was not found.";
var INVALID_HIERARCHY_LEVEL_NUMBER = "Invalid Hierarchy level.";
var NOT_PERMISSION_PARENT_LEVEL = "User should have permission for parent level.";


var defaultPassword = config.getDefaultPassword();

function getAll() {
    return dbUser.getAllUser();
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserById", id);
    return dbUser.getUserById(id);
}

function getUserByUserName(userName) {
    if (!userName)
        throw ErrorLib.getErrors().BadRequest("The Parameter userName is not found",
            "userServices/handleGet/getUserByUserName", userName);
    return dbUser.getUserByUserName(userName);
}

function getUserByHl1Id(hl1Id) {
    if (!hl1Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserByHl1Id", hl1Id);
    return dbUser.getUserByHl1Id(hl1Id);

}

function getUserByHl2Id(hl2Id) {
    if (!hl2Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserByHl2Id", hl2Id);
    return dbUser.getUserByHl2Id(hl2Id);

}

function getUserByHl3Id(hl3Id) {
    if (!hl3Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserByHl3Id", hl3Id);

    var hl3 = businessLavel3.getLevel3ById(hl3Id, null);
    return dbUser.getUserByHl3Id(hl3Id, hl3.HL2_ID);

}

function getUserByHl2IdToNewL3(hl2Id) {
    if (!hl2Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserByHl2IdToNelL3", hl2Id);
    return dbUser.getUserByHl2IdToNewL3(hl2Id);
}

function userLevelPermission(data, userId) {
    validate(data);

    data.forEach(function (PERMISSIONS) {
        var levelUserId = PERMISSIONS.USER_ID;
        var levelId = PERMISSIONS.LEVEL_ID;
        var level = PERMISSIONS.LEVEL;
        if (PERMISSIONS.PERMISSION) {
            var rdo = dbUser.existsHlUserPair(levelUserId, levelId, level) ? true :
                dbUser.insertLevelUser(levelId, levelUserId, level, userId);
        } else {
            dbUser.deleteLevelUser(levelUserId, levelId, level);
        }
    });

    return data;
}

function validate(data) {

    if (!data)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", DATA_NOT_FOUND);

    data.forEach(function (user) {
        if (!user.USER_ID || !Number(user.USER_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", USER_NOT_FOUND);


        if (!user.LEVEL || !Number(user.LEVEL))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", INVALID_HIERARCHY_LEVEL_NUMBER);

        if (!user.LEVEL_ID || !Number(user.LEVEL_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", HIERARCHY_LEVEL_NOT_FOUND);


        if (!user.LEVEL_ID || !Number(user.LEVEL_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", HIERARCHY_LEVEL_NOT_FOUND);

        if (!user.LEVEL || !Number(user.LEVEL) || user.LEVEL < 1 || user.LEVEL > 3)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", INVALID_HIERARCHY_LEVEL_NUMBER);

        if (user.PERMISSION) {
            var objLevel = {};
            var level2Id = null;
            switch (user.LEVEL) {
                case 3:
                    objLevel.IN_HL3_ID = user.LEVEL_ID;
                    var hl3 = dataHl3.getLevel3ById(objLevel);
                    var level2 = data.filter(function (permission) {
                        return permission.LEVEL_ID == hl3.HL2_ID;
                    });
                    if (!level2.length) {
                        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", NOT_PERMISSION_PARENT_LEVEL);
                    }
                    level2Id = hl3.HL2_ID;
                case 2:
                    objLevel.IN_HL2_ID = level2Id || user.LEVEL_ID;
                    var hl2 = dataHl2.getLevel2ById(objLevel);

                    var level1 = data.filter(function (permission) {
                        return permission.LEVEL_ID == hl2.HL1_ID;
                    });
                    if (!level1.length) {
                        throw JSON.stringify(level1);
                        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", NOT_PERMISSION_PARENT_LEVEL);
                    }

                    break;
            }
        }
    });

    return data;
}

function insertUser(user, createUser) {

    if (!user.PASSWORD && !user.USE_DEFAULT_PASSWORD)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The PASSWORD is not found");

    if (!user.CONFIRM_PASSWORD && !user.USE_DEFAULT_PASSWORD)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The CONFIRM_PASSWORD is not found");

    if (!user.ROLE_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The ROLE_ID is not found");

    try {
        var outUserId = null;
        var transactionDone = false;
        var userPassHashed = null;
        var userPassword = null;

        // validate user
        if (validateUser(user)) {
            if (getUserByUserName(user.USER_NAME)) {
                throw ErrorLib.getErrors().CustomError("",
                    "userServices/handlePost/insertUser", "The User Name already exists");
            }
            // Hash password
            userPassword = !user.USE_DEFAULT_PASSWORD
            && validatePassword(user.PASSWORD) ? user.PASSWORD
                : defaultPassword;
            userPassHashed = dbUser.getPasswordHash(userPassword);

            if (userPassHashed.length > 0) {
                // insert user
                var outUserId = dbUser.insertUser(user, createUser);

                if (outUserId) {
                    // set user password
                    var resultUpdPass = dbUser.updatePass(outUserId,
                        userPassHashed[0].HASH, "", createUser);

                    // Insert user role
                    var resultInsUserRole = dbUserRole.insertUserRole(
                        outUserId, user.ROLE_ID, createUser);

                    // check if transaction was completed
                    transactionDone = !!outUserId && !!resultUpdPass
                        && !!resultInsUserRole;
                }

                if (transactionDone) {
                    db.commit();
                    try {
                        notifyInsertByEmail(user.EMAIL, user.USER_NAME, userPassword);
                    } catch (e) {
                        throw ErrorLib.getErrors().MailError("", e, "The user was created, but the notification email failed to be sent.");
                    }

                } else {
                    db.rollback();
                }
                return outUserId;
            }
        }
    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }
}

function updateUser(user, updateUser) {

    if (!user.USER_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/updateUser",
            "The USER_ID is not found");

    if (!util.validateIsNumber(user.USER_ID))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/updateUser", "The USER_ID is invalid");

    try {
        var updUserId = null;
        var transactionDone = false;

        // insert user
        updUserId = dbUser.updateUser(user, updateUser);

        if (updUserId) {
            // Update user role
            var resultUserRole = dbUserRole.updateUserRoleByUserId(
                user.USER_ID, user.ROLE_ID, updateUser);

            // check if transaction was completed
            transactionDone = !!updUserId && !!resultUserRole;
        }

        // check transaction status
        if (transactionDone) {
            db.commit();
        } else {
            db.rollback();
        }
        return updUserId;
    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }
}

function deleteUser(user, deleteUser) {
    if (!user.USER_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The USER_ID is not found");

    if (!util.validateIsNumber(user.USER_ID))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The USER_ID is invalid");

    return dbUser.deleteUser(user, deleteUser);

}

function updateUserPassword(value, modUser) {
    if (!value)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The USER is not found");
    if (!value.USER_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The USER_ID is not found");
    if (!value.PASSWORD)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The PASSWORD is not found");

    if (validatePassword(value.PASSWORD)) {
        var userPassHashed = dbUser.getPasswordHash(value.PASSWORD);
        return dbUser.updatePass(value.USER_ID, userPassHashed.HASH,
            value.PASSWORD_SALT, modUser);
    }
}

function updateUserPasswordHashed(value, modUser) {
    if (!value)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The USER is not found");
    if (!value.USER_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The USER_ID is not found");
    if (!value.PASSWORD)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The PASSWORD is not found");
    var resultUpdPass = dbUser.updatePass(value.USER_ID, value.PASSWORD,
        value.PASSWORD_SALT, modUser);

    // check if transaction was completed
    if (!!resultUpdPass) {
        db.commit();

        // TODO: notify user via email with a link to set the password
        // again
    } else {
        db.rollback();
    }
    return resultUpdPass;

}

function resetPassword(user, modUser) {

    if (!user)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The USER is not found");
    if (!user.USER_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The USER_ID is not found");

    // Password is reset to default password
    try {
        var userPassHashed = null;
        var resultUpdPass = null;

        // Hash password
        userPassHashed = dbUser.getPasswordHash(defaultPassword);

        if (userPassHashed.length > 0) {
            // set user password
            resultUpdPass = dbUser.updatePass(user.USER_ID,
                userPassHashed[0].HASH, "", modUser);

            // check if transaction was completed
            if (!!resultUpdPass) {
                db.commit();

                // TODO: notify user via email with a link to set the password
                // again
            } else {
                db.rollback();
            }
            return resultUpdPass;
        }

    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }
}

function getUserByRoleId(id) {
    return dbUser.getUserByRoleId(id);
}

function validatePassword(pass) {
    // TODO: set regex to validate pass
    // Business rules: SAP wants to set the default password and it might be 6
    // letters
    // New passwords must be 6 letters (and/or numbers and/or most special
    // characters) in length
    if (!util.validateLength(pass, 15, 6) || !util.validateIsPassword(pass))
        throw ErrorLib.getErrors()
            .CustomError("", "userServices/handlePost/insertUser",
                "The PASSWORD is invalid");

    return true;
}

function validateUser(user) {
    if (!user)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "User is not found");

    if (!user.USER_NAME)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "USER_NAME is not found");

    if (!user.FIRST_NAME)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The FIRST_NAME is not found");

    if (!user.LAST_NAME)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The LAST_NAME is not found");

    if (!user.EMAIL)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The EMAIL is not found");

    if (!util.validateLength(user.USER_NAME, 255, 1, "User Name")
        || !util.validateIsString(user.USER_NAME))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The USER_NAME is invalid");

    if (!util.validateLength(user.FIRST_NAME, 255, 1, "First Name")
        || !util.validateIsString(user.FIRST_NAME))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The FIRST_NAME is invalid");

    if (!util.validateLength(user.LAST_NAME, 255, 1, "Last Name")
        || !util.validateIsString(user.LAST_NAME))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The LAST_NAME is invalid");

    if (!util.validateIsEmail(user.EMAIL))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The EMAIL is invalid");

    if (!util.validateLength(user.PHONE, 255, 0, "Phone"))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The PHONE is invalid");

    return true;
}

function notifyInsertByEmail(TO, username, password) {
    var appUrl = config.getLoginUrl();
    var siteAdminAccount = config.getSiteAdminAccount();

    var body = ' <p> Dear Colleague </p>  <p>You have been granted user rights to the Marketing Planning Tool. Your login information is as follows:</p>  <p>User ID: <span>' + username + '</span></p>  <p>Password: <span>' + password + '</span></p> <p>You may change your password after you logon to the Marketing Plan Tool. To logon to the Marketing Planning Tool use the following link ' + appUrl + '.</p> <p>If you have any questions please contact the Site Administrator ' + siteAdminAccount + '.</p> <p> Thank you</p>';
    var mailObject = mail.getJson([{
        "address": TO
    }], "Marketing Planning Tool - Account Created", body);

    mail.sendMail(mailObject, true);
}

function isSuperAdmin(userId) {
    var rol = dbUserRole.getUserRoleByUserId(userId);

    return (rol && rol.length > 0 && rol[0].ROLE_ID == 1);
}

function getPermissionForLevelByUser(level, levelId, userId) {
    return dbUser.getPermissionForLevelByUser(level, levelId, userId);
}