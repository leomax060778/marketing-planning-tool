/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/*************************************************/
var INS_EXPECTED_OUTCOME_LEVEL = "INS_EXPECTED_OUTCOME_LEVEL";
var UPD_EXPECTED_OUTCOME_LEVEL = "UPD_EXPECTED_OUTCOME_LEVEL";
var DEL_EXPECTED_OUTCOME_LEVEL = "DEL_EXPECTED_OUTCOME_LEVEL";
var GET_EXPECTED_OUTCOME_LEVEL_COUNT_BY_OUTCOME_ID_LEVEL_AND_OPTION = "GET_EXPECTED_OUTCOME_LEVEL_COUNT_BY_OUTCOME_ID_LEVEL_AND_OPTION";
var GET_OUTCOMES_LEVEL_BY_OPTION_NAME_OUTCOME_ID_AND_LEVEL_ID = "GET_OUTCOMES_LEVEL_BY_OPTION_NAME_OUTCOME_ID_AND_LEVEL_ID";
var GET_EXPECTED_OUTCOME_LEVEL_ID_BY_OPTION_NAME_AND_LEVEL_ID = "GET_EXPECTED_OUTCOME_LEVEL_ID_BY_OPTION_NAME_AND_LEVEL_ID";

function insExpectedOutcomeLevel(expected_outcome_id,expected_outcome_option_id,hierarchylevel,userId,autoCommit){
    var params = {
        'in_expected_outcome_id': expected_outcome_id,
        'in_expected_outcome_option_id': expected_outcome_option_id,
        'in_hierarchy_level_id': hierarchylevel,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(INS_EXPECTED_OUTCOME_LEVEL,params,'out_expected_outcome_level_id');
    }else{
        rdo = db.executeScalarManual(INS_EXPECTED_OUTCOME_LEVEL,params,'out_expected_outcome_level_id');
    }
    return rdo;
}

function updExpectedOutcomeLevel(expected_outcome_level_id,expected_outcome_id,expected_outcome_option_id,hierarchylevel,userId,autoCommit){
    var params = {
        'in_expected_outcome_level_id': expected_outcome_level_id,
        'in_expected_outcome_id': expected_outcome_id,
        'in_expected_outcome_option_id': expected_outcome_option_id,
        'in_hierarchy_level_id': hierarchylevel,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(UPD_EXPECTED_OUTCOME_LEVEL,params,'out_result');
    }else{
        rdo = db.executeScalarManual(UPD_EXPECTED_OUTCOME_LEVEL,params,'out_result');
    }
    return rdo;
}

function delExpectedOutcomeLevel(expected_outcome_id, hlId, userId, autoCommit){
    var params = {
        'in_expected_outcome_id' : expected_outcome_id,
        'in_hl_id': hlId,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(DEL_EXPECTED_OUTCOME_LEVEL,params,'out_result');
    }else{
        rdo = db.executeScalarManual(DEL_EXPECTED_OUTCOME_LEVEL,params,'out_result');
    }
    return rdo;
}

function getOutcomesLevelCountByOutcomesOptionAndLevelId(expectedOutcomeId, hlId, optionId){
    if(expectedOutcomeId && hlId && optionId){
        return db.executeScalar(GET_EXPECTED_OUTCOME_LEVEL_COUNT_BY_OUTCOME_ID_LEVEL_AND_OPTION, {'in_expected_outcome_id': expectedOutcomeId, 'in_hierarchy_level_id': hlId, 'in_option_id': optionId}, 'out_result');
    }
    return null;
}

function getOutcomesLevelByOptionNameOutcomeIdAndLevelId(optionName, expectedOutcomeId, hlName){
    var parameters = {'in_option_name': optionName, 'in_outcome_id': expectedOutcomeId, 'in_hierarchy_level_name': hlName};
    var list = db.executeProcedureManual(GET_OUTCOMES_LEVEL_BY_OPTION_NAME_OUTCOME_ID_AND_LEVEL_ID, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function getExpectedOutcomeLevelIdByOptionNameAndLevelId(optionName, levelId){
    var parameters = {};
    parameters.in_option_name = optionName;
    parameters.in_hierarchy_level_id = levelId;
    var rdo = db.executeProcedureManual(GET_EXPECTED_OUTCOME_LEVEL_ID_BY_OPTION_NAME_AND_LEVEL_ID, parameters);
    var result = db.extractArray(rdo.out_result);
    if(result.length)
        return result[0];
    else
        return null;
}