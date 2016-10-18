/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataOutcomes = mapper.getDataExpectedOutcome();
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/
function getAllOutcomes(parametrs, userId){
	var out_outcomes = {}
	var outcomes = dataOutcomes.getAllOutcomes(parametrs);
	var outcomesTypes = dataOutcomes.getAllOutcomesType(parametrs);
	
	outcomesTypes.forEach(function(outcomesType){
		out_outcomes[outcomesType.OUTCOMES_TYPE_NAME] = [];
		outcomes.forEach(function(outcome){
			if(outcomesType.OUTCOMES_TYPE_HIERARCHY_LEVEL_ID === outcome.OUTCOMES_TYPE_HIERARCHY_LEVEL_ID){
				out_outcomes[outcomesType.OUTCOMES_TYPE_NAME].push(outcome);
			}
		});
	});
	
	return out_outcomes;//dataOutcomes.getAllOutcomes(parametrs);
}

function getAllOutcomesType(parametrs, userId){
	return dataOutcomes.getAllOutcomesType(parametrs);
}