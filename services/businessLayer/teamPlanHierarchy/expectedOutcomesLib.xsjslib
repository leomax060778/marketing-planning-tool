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
	//throw ErrorLib.getErrors().CustomError("getHl4ById","Get Hl4 By Id",interlock);
	var result = [];
	expectedOutcomes.forEach(function(eo){
		var aux = util.extractObject(eo);
		//throw ErrorLib.getErrors().CustomError("getHl4ById","Get Hl4 By Id",JSON.stringify(aux));
		aux["detail"] = dataExpectedOutcomes.getExpectedOutcomeDetailById(aux.HL4_EXPECTED_OUTCOMES_ID);
		result.push(aux);
	});
	return result[0];
}