/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataOutcomeType = mapper.getDataOutcomeType();
var dataOutcome = mapper.getDataOutcome();
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/

function getAllOutcomes(hl){
	try{
        var outcomesType = dataOutcomeType.getOutcomesTypeByHlId(hl);
        var result = {};
        outcomesType.forEach(function(outcome){     	
        	result[outcome.OUTCOMES_TYPE_NAME] = getOutcomesByOtId(outcome.OUTCOMES_TYPE_ID, outcome.HIERARCHY_LEVEL_ID);
        });
        return result;
	} catch(e) {
        throw e;
	}
};

function getWizardQuestions(){
    var spResult = dataOutcome.getWizardQuestions();
    var questions = {};

    for (var i = 0; i < spResult.length; i++) {
        var obj = spResult[i];
        if(!questions[obj.QUESTION_ID])
            questions[obj.QUESTION_ID] = {QUESTION: obj.QUESTION, ANSWERS: []};

        questions[obj.QUESTION_ID].ANSWERS.push({ANSWER_ID: obj.ANSWER_ID, ANSWER: obj.ANSWER});
    }
    questions = util.objectToArray(questions);

    return questions;
}

function getKpiVolumeValue(campaignTypeId,campaignSubtypeId, kpiOptionId, answers){
    var answersCollection = [];
    var result = {VOLUME: null, VALUE: null};
    answers.forEach(function (answerId) {
        answersCollection.push({KPI_ANSWER_ID: answerId});
    });

    var answerAverage = dataOutcome.getAnswerAverage(answersCollection, answers.length);

    var scale = (answerAverage >= 0 && answerAverage < 1.5) ? 'SMALL'
        : (answerAverage >= 1.5 && answerAverage < 2.5) ? 'MEDIUM'
        : (answerAverage >= 2.5 && answerAverage < 3.5) ? 'LARGE'
        : (answerAverage >= 3.5) ? 'X_LARGE' : null;

    if(scale){
    	var spResult = dataOutcome.getKpiVolumeValue(campaignTypeId,campaignSubtypeId, kpiOptionId);
        var values = {};
        spResult.forEach(function (benchmark) {
            if(Number(benchmark.TYPE)) {
                values.VOLUME = benchmark[scale + '_SCALE_CAMPAIGN'];
            } else {
                values.VALUE = benchmark[scale + '_SCALE_CAMPAIGN'];
            }
        });
        result.VOLUME = values.VOLUME || null;
        result.VALUE = values.VALUE || null;
    }
    
    return result;
};

function getOutcomesByOtId(outcomeTypeId, hlId){
        if(!outcomeTypeId)
                throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found","outcomesServices/handleGet/getByHlId",outcomeTypeId);
        try{
                return dataOutcome.getOutcomesByOtId(outcomeTypeId, hlId);
        } catch(e) {
                throw e;
        }
};

function insertOutcomes(outcome, userId){
        try{
                outcome.in_user_id = userId;
                if(validate(outcome))
                        return dataOutcome.insertOutcomes(outcome);
        } catch(e) {
                throw e;
        }
}

function updateOutcomes(outcome, userId){
        if(!outcome.in_outcomes_id || !Number(outcome.in_outcomes_id))
                throw ErrorLib.getErrors().CustomError("","outcomesServices/handleUpdate/updateOutcomes","The Outcomes  ID is invalid");

        try{
                outcome.in_user_id = userId;
                if(validate(outcome))
                        return dataOutcome.updateOutcomes(outcome);
        } catch(e) {
                throw e;
        }
}

function deleteOutcomes(outcomeId, userId){
        if(!outcomeId || !Number(outcomeId))
                throw ErrorLib.getErrors().CustomError("","outcomesServices/handlePost/deleteOutcomes","The Outcomes  ID is invalid");

        try{
                return dataOutcome.deleteOutcomes(outcomeId, userId);
        } catch(e) {
                throw e;
        }
}

function validate(outcome){
        if(!outcome.in_outcomes_name)
                throw ErrorLib.getErrors().CustomError("","outcomesServices/handlePost/insertOutcomes","The Outcomes  Name is not found");

        if(!outcome.in_outcomes_type_id || !Number(outcome.in_outcomes_type_id))
                throw ErrorLib.getErrors().CustomError("","outcomesServices/handlePost/insertOutcomes","The Hierarchy Level is invalid");

        return true;
}