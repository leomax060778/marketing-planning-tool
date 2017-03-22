/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/*************************************************/
var GET_ALL_EXPECTED_OUTCOME = "GET_ALL_EXPECTED_OUTCOME";
var INS_EXPECTED_OUTCOME = "INS_EXPECTED_OUTCOME";
var UPD_EXPECTED_OUTCOME = "UPD_EXPECTED_OUTCOME";
var DEL_EXPECTED_OUTCOME = "DEL_EXPECTED_OUTCOME";
var GET_EXPECTED_OUTCOME_BY_NAME = "GET_EXPECTED_OUTCOME_BY_NAME";
var GET_EXPECTED_OUTCOME_BY_ID = "GET_EXPECTED_OUTCOME_BY_ID";
var GET_EXPECTED_OUTCOME_IN_USE_BY_EXPECTED_OUTCOME_ID = "GET_EXPECTED_OUTCOME_IN_USE_BY_EXPECTED_OUTCOME_ID";
var GET_EXPECTED_OUTCOME_LEVEL_BY_LEVEL_OPTION = "GET_EXPECTED_OUTCOME_LEVEL_BY_LEVEL_OPTION"

/*************************************************/
var spGetExpOutByHl4Id = "GET_EXPECTED_OUTCOMES_BY_HL4_ID";
var spGetExpOutDetail = "GET_EXPECTED_OUTCOMES_DETAILS_EO_ID";
var spGetExpOutcomeById = "GET_EXPECTED_OUTCOME_BY_ID";
var spGetAllOutcomeType = "GET_ALL_OUTCOMES_TYPE";
var spGetAllOutcome = "GET_ALL_OUTCOMES";
var spInsertExpOutcome = "INS_HL4_EXPECTED_OUTCOMES";
var spInsertExpOutcomeDetail = "INS_HL4_EXPECTED_OUTCOMES_DETAIL";

var spDeleteExpOutcome = "DEL_HL4_EXPECTED_OUTCOMES_BY_HL4_ID";
var spDeleteExpOutcomeDetail = "DEL_HL4_EXPECTED_OUTCOMES_DETAIL_BY_HL4_ID";
/******************************************************/

/**L5***********************************************/
var spGetExpOutByHl5Id = "GET_EXPECTED_OUTCOMES_BY_HL5_ID";
var spGetHl5ExpOutDetail = "GET_EXPECTED_OUTCOMES_DETAILS_EO_HL5_ID";
var spInsertHl5ExpOutcome = "INS_HL5_EXPECTED_OUTCOMES";
var spInsertHl5ExpOutcomeDetail = "INS_HL5_EXPECTED_OUTCOMES_DETAIL";
var spDeleteHl5ExpOutcome = "DEL_HL5_EXPECTED_OUTCOMES_BY_HL5_ID";
var spDeleteHl5ExpOutcomeDetail = "DEL_HL5_EXPECTED_OUTCOMES_DETAIL_BY_HL5_ID";
var spDeleteHl5ExpOutcomeDetailHard = "DEL_HL5_EXPECTED_OUTCOMES_DETAIL_BY_HL5_ID_HARD";
var spDeleteHl6ExpOutcomeDetailHard = "DEL_HL6_EXPECTED_OUTCOMES_DETAIL_BY_HL6_ID_HARD";
var spDeleteHl5ExpOutcomeHard = "DEL_HL5_EXPECTED_OUTCOMES_BY_HL5_ID_HARD";
var spDeleteHl6ExpOutcomeHard = "DEL_HL6_EXPECTED_OUTCOMES_BY_HL6_ID_HARD";
/****end L5**************************************************/

/**L6***********************************************/
var spGetExpOutByHl6Id = "GET_EXPECTED_OUTCOMES_BY_HL6_ID";
var spGetHl6ExpOutDetail = "GET_EXPECTED_OUTCOMES_DETAILS_EO_HL6_ID";
var spInsertHl6ExpOutcome = "INS_HL6_EXPECTED_OUTCOMES";
var spInsertHl6ExpOutcomeDetail = "INS_HL6_EXPECTED_OUTCOMES_DETAIL";
var spDeleteHl6ExpOutcome = "DEL_HL6_EXPECTED_OUTCOMES_BY_HL6_ID";
var spDeleteHl6ExpOutcomeDetail = "DEL_HL6_EXPECTED_OUTCOMES_DETAIL_BY_HL6_ID";
/****end L6**************************************************/


function insertExpectedOutcome(name,userId,autoCommit){
    var params = {
        'in_name': name,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(INS_EXPECTED_OUTCOME,params,'out_outcome_id');
    }else{
        rdo = db.executeScalarManual(INS_EXPECTED_OUTCOME,params,'out_outcome_id');
    }
    return rdo;
}

function updateExpectedOutcome(expected_outcome_id,name,userId,autoCommit){
    var params = {
        'in_expected_outcome_id': expected_outcome_id,
        'in_name': name,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(UPD_EXPECTED_OUTCOME,params,'out_result');
    }else{
        rdo = db.executeScalarManual(UPD_EXPECTED_OUTCOME,params,'out_result');
    }
    return rdo;
}

function deleteExpectedOutcome(expected_outcome_id,userId, autoCommit){
    var params = {
        'in_expected_outcome_id' : expected_outcome_id,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(DEL_EXPECTED_OUTCOME,params,'out_result');
    }else{
        rdo = db.executeScalarManual(DEL_EXPECTED_OUTCOME,params,'out_result');
    }
    return rdo;
}

function getAllExpectedOutcomes(){
    var params = {};
    var list = db.executeProcedureManual(GET_ALL_EXPECTED_OUTCOME, params);
    return db.extractArray(list.out_result);
}

function getExpectedOutcomeById(expected_outcome_id){
    var params = {
        'in_expected_outcome_id': expected_outcome_id
    };
    var list = db.executeProcedureManual(GET_EXPECTED_OUTCOME_BY_ID, params);
    return db.extractArray(list.out_result)[0];
}

function getExpectedOutcomeLevelByLevelAndOptionId(levelName, optionId){
    var params = {
        'in_hierarchy_level_name': levelName
        ,'in_outcomes_id': optionId
    };
    var list = db.executeProcedureManual(GET_EXPECTED_OUTCOME_LEVEL_BY_LEVEL_OPTION, params);
    return db.extractArray(list.out_result)[0];
}



function getExpectedOutcomeInUseByExpectedOutcomeId(expected_outcome_id){
    var params = {
        'in_expected_outcome_id': expected_outcome_id
    };
    var list = db.executeProcedureManual(GET_EXPECTED_OUTCOME_IN_USE_BY_EXPECTED_OUTCOME_ID, params);
    return db.extractArray(list.out_result);
}

function getExpectedOutcomeByName(name){
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_EXPECTED_OUTCOME_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function getExpectedOutcomeByHl4Id(id){
    if(id){
        var rdo = db.executeProcedure(spGetExpOutByHl4Id, {'in_hl4_id':id});
        return db.extractArray(rdo.out_expected_outcomes);
    }
    return null;
}

function getExpectedOutcomeDetailById(id){
    if(id){
        var rdo = db.executeProcedure(spGetExpOutDetail, {'in_hl4_expected_outcomes_id':id});
        return db.extractArray(rdo.out_expected_outcomes_details);
    }
    return null;
}

function getExpOutById(id){
    if(id != ""){
        var rdo = db.executeProcedure(spGetExpOutcomeById,{'in_expected_outcome_id':id});
        return db.extractArray(rdo.out_expOut);
    }
    return null;
}

function getAllOutcomes(parametrs){
    if(parametrs.HL_ID != ""){
        var rdo = db.executeProcedure(spGetAllOutcome,parametrs);
        return db.extractArray(rdo.out_outcomes);
    }
    return null;
}

function getAllOutcomesType(parametrs){
    if(parametrs.HL_ID != ""){
        var rdo = db.executeProcedure(spGetAllOutcomeType,parametrs);
        return db.extractArray(rdo.out_outcomes_type);
    }
    return null;
}

function insertHl4ExpectedOutcomes(parameters){
    var rdo = db.executeScalarManual(spInsertExpOutcome, parameters, 'out_hl4_expected_outcomes_id');
    return rdo;
}

function insertHl4ExpectedOutcomesDetail(parameters){
    var rdo = db.executeScalarManual(spInsertExpOutcomeDetail, parameters, 'out_hl4_expected_outcomes_details_id');
    return rdo;
}

function deleteHl4ExpectedOutcomes(parameters){
    var rdo = db.executeScalarManual(spDeleteExpOutcome, parameters, 'out_result');
    return rdo;
}

function deleteHl4ExpectedOutcomesDetail(parameters){
    var rdo = db.executeScalarManual(spDeleteExpOutcomeDetail, parameters, 'out_result');
    return rdo;
}


/**HL5****************************/
function getExpectedOutcomeByHl5Id(id){
    if(id){
        var rdo = db.executeProcedure(spGetExpOutByHl5Id, {'in_hl5_id':id});
        return db.extractArray(rdo.out_expected_outcomes);
    }
    return null;
}

function getHl5ExpectedOutcomeDetailById(id){
    if(id){
        var rdo = db.executeProcedure(spGetHl5ExpOutDetail, {'in_hl5_expected_outcomes_id':id});
        return db.extractArray(rdo.out_expected_outcomes_details);
    }
    return null;
}

function insertHl5ExpectedOutcomes(in_hl5_id, in_comments, in_created_user_id){
    var parameters = {};
    parameters.in_hl5_id = in_hl5_id;
    parameters.in_comments = in_comments;
    parameters.in_created_user_id = in_created_user_id;
    var rdo = db.executeScalarManual(spInsertHl5ExpOutcome, parameters, 'out_hl5_expected_outcomes_id');
    return rdo;
}

function insertHl5ExpectedOutcomesDetail(in_hl5_expected_outcomes_id, in_outcomes_id, in_euro_value, in_volume_value, in_created_user_id){
    var parameters = {};
    parameters.in_hl5_expected_outcomes_id = in_hl5_expected_outcomes_id;
    parameters.in_outcomes_id = in_outcomes_id;
    parameters.in_euro_value = in_euro_value;
    parameters.in_volume_value = in_volume_value;
    parameters.in_created_user_id = in_created_user_id;

    var rdo = db.executeScalarManual(spInsertHl5ExpOutcomeDetail, parameters, 'out_hl5_expected_outcomes_details_id');
    return rdo;
}

function deleteHl5ExpectedOutcomes(in_hl5_id, in_user_id){
    var parameters = {};
    parameters.in_hl5_id = in_hl5_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl5ExpOutcome, parameters, 'out_result');
    return rdo;
}

function deleteHl5ExpectedOutcomesHard(in_hl5_id){
    var parameters = {};
    parameters.in_hl5_id = in_hl5_id;
    var rdo = db.executeScalarManual(spDeleteHl5ExpOutcomeHard, parameters, 'out_result');
    return rdo;
}

function deleteHl5ExpectedOutcomesDetail(in_hl5_id, in_user_id){
    var parameters = {};
    parameters.in_hl5_id = in_hl5_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl5ExpOutcomeDetail, parameters, 'out_result');
    return rdo;
}

function deleteHl5ExpectedOutcomesDetailHard(in_hl5_id){
    var parameters = {};
    parameters.in_hl5_id = in_hl5_id;
    var rdo = db.executeScalarManual(spDeleteHl5ExpOutcomeDetailHard, parameters, 'out_result');
    return rdo;
}
/**FIN HL5****************************/

/**HL6****************************/
function deleteHl6ExpectedOutcomesHard(in_hl6_id){
    var parameters = {};
    parameters.in_hl6_id = in_hl6_id;
    var rdo = db.executeScalarManual(spDeleteHl6ExpOutcomeHard, parameters, 'out_result');
    return rdo;
}

function deleteHl6ExpectedOutcomesDetailHard(in_hl6_id){
    var parameters = {};
    parameters.in_hl6_id = in_hl6_id;
    var rdo = db.executeScalarManual(spDeleteHl6ExpOutcomeDetailHard, parameters, 'out_result');
    return rdo;
}

function getExpectedOutcomeByHl6Id(id){
    if(id){
        var rdo = db.executeProcedure(spGetExpOutByHl6Id, {'in_hl6_id':id});
        return db.extractArray(rdo.out_expected_outcomes);
    }
    return null;
}

function getHl6ExpectedOutcomeDetailById(id){
    if(id){
        var rdo = db.executeProcedure(spGetHl6ExpOutDetail, {'in_hl6_expected_outcomes_id':id});
        return db.extractArray(rdo.out_expected_outcomes_details);
    }
    return null;
}

function insertHl6ExpectedOutcomes(in_hl6_id, in_comments, in_created_user_id){
    var parameters = {};
    parameters.in_hl6_id = in_hl6_id;
    parameters.in_comments = in_comments;
    parameters.in_created_user_id = in_created_user_id;
    var rdo = db.executeScalarManual(spInsertHl6ExpOutcome, parameters, 'out_hl6_expected_outcomes_id');
    return rdo;
}

function insertHl6ExpectedOutcomesDetail(in_hl6_expected_outcomes_id, in_outcomes_id, in_euro_value, in_volume_value, in_created_user_id){
    var parameters = {};
    parameters.in_hl6_expected_outcomes_id = in_hl6_expected_outcomes_id;
    parameters.in_outcomes_id = in_outcomes_id;
    parameters.in_euro_value = in_euro_value;
    parameters.in_volume_value = in_volume_value;
    parameters.in_created_user_id = in_created_user_id;

    var rdo = db.executeScalarManual(spInsertHl6ExpOutcomeDetail, parameters, 'out_hl6_expected_outcomes_details_id');
    return rdo;
}

function deleteHl6ExpectedOutcomes(in_hl6_id, in_user_id){
    var parameters = {};
    parameters.in_hl6_id = in_hl6_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl6ExpOutcome, parameters, 'out_result');
    return rdo;
}

function deleteHl6ExpectedOutcomesDetail(in_hl6_id, in_user_id){
    var parameters = {};
    parameters.in_hl6_id = in_hl6_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl6ExpOutcomeDetail, parameters, 'out_result');
    return rdo;
}
/**FIN HL6****************************/
