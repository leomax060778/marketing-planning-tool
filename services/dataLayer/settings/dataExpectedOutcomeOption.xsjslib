/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/*************************************************/
var GET_ALL_EXPECTED_OUTCOME_OPTION = "GET_ALL_EXPECTED_OUTCOME_OPTION";
var GET_OPTIONS_BY_EXPECTED_OUTCOME_LEVEL = "GET_OPTIONS_BY_EXPECTED_OUTCOME_LEVEL";
var INS_EXPECTED_OUTCOME_OPTION = "INS_EXPECTED_OUTCOME_OPTION";
var UPD_EXPECTED_OUTCOME_OPTION = "UPD_EXPECTED_OUTCOME_OPTION";
var DEL_EXPECTED_OUTCOME_OPTION = "DEL_EXPECTED_OUTCOME_OPTION";
var GET_EXPECTED_OUTCOME_OPTION_BY_NAME = "GET_EXPECTED_OUTCOME_OPTION_BY_NAME";
var GET_AVAILABLES_OPTION_BY_EXPECTED_OUTCOME_AND_LEVEL_ID = "GET_AVAILABLES_OPTION_BY_EXPECTED_OUTCOME_AND_LEVEL_ID";
var GET_ASSIGNED_OPTION_BY_EXPECTED_OUTCOME_AND_LEVEL_ID = "GET_ASSIGNED_OPTION_BY_EXPECTED_OUTCOME_AND_LEVEL_ID";
var GET_EXPECTED_OUTCOME_OPTION_IN_USE_BY_EXPECTED_OUTCOME_ID = "GET_EXPECTED_OUTCOME_OPTION_IN_USE_BY_EXPECTED_OUTCOME_ID";

function insExpectedOutcomeOption(name,userId,autoCommit){
    var params = {
        'in_name': name,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(INS_EXPECTED_OUTCOME_OPTION,params,'out_result');
    }else{
        rdo = db.executeScalarManual(INS_EXPECTED_OUTCOME_OPTION,params,'out_result');
    }
    return rdo;
}

function updExpectedOutcomeOption(expected_outcome_option_id,name,userId,autoCommit){
    var params = {
        'in_expected_outcome_option_id': expected_outcome_option_id,
        'in_name': name,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(UPD_EXPECTED_OUTCOME_OPTION,params,'out_result');
    }else{
        rdo = db.executeScalarManual(UPD_EXPECTED_OUTCOME_OPTION,params,'out_result');
    }
    return rdo;
}

function delExpectedOutcomeOption(expected_outcome_option_id,userId, autoCommit){
    var params = {
        'in_expected_outcome_option_id' : expected_outcome_option_id,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(DEL_EXPECTED_OUTCOME_OPTION,params,'out_result');
    }else{
        rdo = db.executeScalarManual(DEL_EXPECTED_OUTCOME_OPTION,params,'out_result');
    }
    return rdo;
}

function getAllExpectedOutcomeOption(){
    var params = {};
    var list = db.executeProcedureManual(GET_ALL_EXPECTED_OUTCOME_OPTION, params);
    return db.extractArray(list.out_result);
}

function getOptionsByExpectedOutcomeLevel(expected_outcome_id, hierarchylevel){
    var params = {
        'in_expected_outcome_id': expected_outcome_id,
        'in_hierarchy_level_id': hierarchylevel
    };
    var list = db.executeProcedureManual(GET_OPTIONS_BY_EXPECTED_OUTCOME_LEVEL, params);
    return db.extractArray(list.out_result);
}

function getExpectedOutcomeOptionByName(expected_outcome_option_name){
    var params = {
        'in_name': expected_outcome_option_name
    };
    var list = db.executeProcedureManual(GET_EXPECTED_OUTCOME_OPTION_BY_NAME, params);
    return db.extractArray(list.out_result);
}

function getAvailablesOptionByExpectedOutcomeAndLevelId(expected_outcome_id, hierarchy_level_id){
    var params = {
        'in_expected_outcome_id': expected_outcome_id,
        'in_hierarchy_level_id': hierarchy_level_id
    };
    var list = db.executeProcedureManual(GET_AVAILABLES_OPTION_BY_EXPECTED_OUTCOME_AND_LEVEL_ID, params);
    return db.extractArray(list.out_result);
}

function getAssignedOptionByExpectedOutcomeAndLevelId(expected_outcome_id, hierarchy_level_id){
    var params = {
        'in_expected_outcome_id': expected_outcome_id,
        'in_hierarchy_level_id': hierarchy_level_id
    };
    var list = db.executeProcedureManual(GET_ASSIGNED_OPTION_BY_EXPECTED_OUTCOME_AND_LEVEL_ID, params);
    return db.extractArray(list.out_result);
}

function getExpectedOutcomeOptionInUseByExpectedOutcomeOptionId(expected_outcome_option_id){
    var params = {
        'in_expected_outcome_option_id': expected_outcome_option_id
    };
    var list = db.executeProcedureManual(GET_EXPECTED_OUTCOME_OPTION_IN_USE_BY_EXPECTED_OUTCOME_ID, params);
    return db.extractArray(list.out_result);
}