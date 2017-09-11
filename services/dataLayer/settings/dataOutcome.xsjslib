/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetOutcomesByOtId = "GET_OUTCOMES_BY_OUTCOMES_TYPE_ID";
var spGetOutcomesByOutcomesTypeId = "GET_COUNT_OUTCOMES_BY_OUTCOMES_TYPE_ID";
var GET_KPI_WIZARD_QUESTIONS = "GET_KPI_WIZARD_QUESTIONS";
var GET_KPI_WIZARD_ANSWER_AVERAGE = "GET_KPI_WIZARD_ANSWER_AVERAGE";
var GET_KPI_VOLUME_VALUE = "GET_KPI_VOLUME_VALUE";
var spInsertOutcomes = "INS_OUTCOMES";
var spUpdateOutcomes = "UPD_OUTCOMES";
var spDeleteOutcomes = "DEL_OUTCOMES";
/******************************************************/

function getOutcomesByOtId(outcomeTypeId, hlId){
        if(outcomeTypeId){
                var rdo = db.executeProcedure(spGetOutcomesByOtId, {'in_outcomes_type_id':outcomeTypeId, 'in_hierarchy_level_id': hlId});
                return db.extractArray(rdo.out_outcomes);
        }
        return null;
};

function getOutcomesCountByOutcomesTypeId(id){
	if(id){
		return db.executeScalar(spGetOutcomesByOutcomesTypeId, {'in_outcomes_type_id': id}, 'out_result');
	}	
	return null;
}

function getWizardQuestions(){
    var rdo = db.executeProcedureManual(GET_KPI_WIZARD_QUESTIONS, {});
    return db.extractArray(rdo.out_result);
}

function getAnswerAverage(answers, numberOfAnswers){
    var parameters = {
        in_answers: answers,
        in_length: numberOfAnswers
    };
    return db.executeDecimalManual(GET_KPI_WIZARD_ANSWER_AVERAGE, parameters, 'out_result');
}

function getKpiVolumeValue(campaignTypeId,campaignSubtypeId, kpiOptionId){
    var parameters = {
        in_campaign_id: campaignTypeId,
        in_campaign_subtype_id: campaignSubtypeId,
        in_kpi_option_id: kpiOptionId
    };
    var rdo = db.executeProcedureManual(GET_KPI_VOLUME_VALUE, parameters);
    return db.extractArray(rdo.out_result);
}

function insertOutcomes(parameters){
        return db.executeScalar(spInsertOutcomes, parameters, 'out_outcomes_id');
};

function updateOutcomes(parameters){
        return db.executeScalar(spUpdateOutcomes, parameters, 'out_result');
};

function deleteOutcomes(id, userId){
        if(id){
                return db.executeScalar(spDeleteOutcomes, {'in_outcomes_id': id, 'in_user_id': userId}, 'out_result');
        }
        return null;
};