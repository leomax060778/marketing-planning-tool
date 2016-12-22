/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataExpectedOutcomes = mapper.getDataExpectedOutcome();
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/
function getExpectedOutcomesByHl4Id(hl4_id){
	var expectedOutcomes = dataExpectedOutcomes.getExpectedOutcomeByHl4Id(hl4_id);
	var result = [];
	expectedOutcomes.forEach(function(eo){
		var aux = util.extractObject(eo);
		aux["detail"] = dataExpectedOutcomes.getExpectedOutcomeDetailById(aux.HL4_EXPECTED_OUTCOMES_ID);
		result.push(aux);
	});
	return result[0];
}

function getExpectedOutcomesByHl5Id(hl5_id){
	var expectedOutcomes = dataExpectedOutcomes.getExpectedOutcomeByHl5Id(hl5_id);
	var result = [];
	expectedOutcomes.forEach(function(eo){
		var aux = util.extractObject(eo);
		aux["detail"] = dataExpectedOutcomes.getHl5ExpectedOutcomeDetailById(aux.HL5_EXPECTED_OUTCOMES_ID);
		result.push(aux);
	});
	return result[0];
}

function getExpectedOutcomesByHl6Id(hl6_id){
	var expectedOutcomes = dataExpectedOutcomes.getExpectedOutcomeByHl6Id(hl6_id);
	var result = [];
	expectedOutcomes.forEach(function(eo){
		var aux = util.extractObject(eo);
		aux["detail"] = dataExpectedOutcomes.getHl6ExpectedOutcomeDetailById(aux.HL6_EXPECTED_OUTCOMES_ID);
		result.push(aux);
	});
	return result[0];
}