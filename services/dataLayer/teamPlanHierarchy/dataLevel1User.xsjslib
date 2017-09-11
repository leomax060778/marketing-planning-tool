$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

var INS_HL1_USER = "INS_HL1_USER";
var GET_HL1_USER = "GET_HL1_USER";
var GET_ALL_HL1_USER = "GET_ALL_HL1_USER";
var DEL_ALL_HL1_BY_ID = "DEL_ALL_HL1_BY_ID";
var DEL_HL1_USER_BY_ID = "DEL_HL1_USER_BY_ID";

function getAllHl1User(hl1Id){
    var parameters = {'in_hl1_id': hl1Id};
    var result = db.executeProcedureManual(GET_ALL_HL1_USER, parameters);
    var list = db.extractArray(result.out_result);
    return list;
}

function insertLevel1User(data){
    /*var parameters = {};
    parameters.in_hl1_id = hl1Id;
    parameters.in_user_id = level1UserId;
    parameters.in_created_user_id = userId;
    parameters.out_hl1_user_id = '?';
    */
    return db.executeScalarManual(INS_HL1_USER,data, "out_hl1_user_id");
}

function delAllLevel1User(hl1Id){
    var parameters = {};
    parameters.in_hl1_id = hl1Id;
    return db.executeScalarManual(DEL_ALL_HL1_BY_ID, parameters, "out_result");
}

function deleteLevel1User(l1UserId, hl1Id, userId){
    var parameters = {};
    parameters.in_hl1_id = hl1Id;
    parameters.in_l1_user_id = l1UserId;
    return db.executeScalarManual(DEL_HL1_USER_BY_ID,parameters,"out_result");
}

function existsHl1UserPair(level1UserId, hl1Id){
    var exists = false;
    var parameters = {'in_user_id': level1UserId, 'in_hl1_id': hl1Id};
    var result = db.executeProcedureManual(GET_HL1_USER, parameters);
    var list = db.extractArray(result.out_result);
    exists = list.length > 0;
    return exists;
}

