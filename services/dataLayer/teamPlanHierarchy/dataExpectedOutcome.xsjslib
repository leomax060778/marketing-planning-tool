/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetExpOutByHl4Id = "GET_EXPECTED_OUTCOMES_BY_HL4_ID";
var spGetExpOutDetail = "GET_EXPECTED_OUTCOMES_DETAILS_EO_ID";
var spGetExpOutcomeById = "GET_EXPECTED_OUTCOME_BY_ID";
var spGetAllOutcomeType = "GET_ALL_OUTCOMES_TYPE";
var spGetOutcomesTypeByHlId = "GET_OUTCOMES_TYPE_BY_HL_ID";
var spGetAllOutcome = "GET_ALL_OUTCOMES";
var spInsertExpOutcome = "INS_HL4_EXPECTED_OUTCOMES";
var spInsertExpOutcomeDetail = "INS_HL4_EXPECTED_OUTCOMES_DETAIL";

var spDeleteExpOutcome = "DEL_HL4_EXPECTED_OUTCOMES_BY_HL4_ID";
var spDeleteExpOutcomeDetail = "DEL_HL4_EXPECTED_OUTCOMES_DETAIL_BY_HL4_ID";
/******************************************************/

function getExpectedOutcomeByHl4Id(id){
	if(id){
		var rdo = db.executeProcedure(spGetExpOutByHl4Id, {'in_hl4_id':id});
		return db.extractArray(rdo.out_expected_outcomes);
	}	
	return null;
};

function getExpectedOutcomeDetailById(id){	
	if(id){
		var rdo = db.executeProcedure(spGetExpOutDetail, {'in_hl4_expected_outcomes_id':id});
		return db.extractArray(rdo.out_expected_outcomes_details);
	}	
	return null;
};

function getExpOutById(id){
	if(id != ""){
		var rdo = db.executeProcedure(spGetExpOutcomeById,{'in_expected_outcome_id':id});
		return db.extractArray(rdo.out_expOut);
	}	
	return null;
};

function getAllOutcomes(parametrs){
	if(parametrs.HL_ID != ""){
		var rdo = db.executeProcedure(spGetAllOutcome,parametrs);
		return db.extractArray(rdo.out_outcomes);
	}	
	return null;
};

function getOutcomesTypeByHlId(id){
	if(id){
		var rdo = db.executeProcedure(spGetOutcomesTypeByHlId,{'in_hl_id': id});
		return db.extractArray(rdo.out_outcomes_type);
	}	
	return null;
};

function insertHl4ExpectedOutcomes(parameters){
		var rdo = db.executeScalarManual(spInsertExpOutcome, parameters, 'out_hl4_expected_outcomes_id');
		return rdo;
};

function insertHl4ExpectedOutcomesDetail(parameters){
		var rdo = db.executeScalarManual(spInsertExpOutcomeDetail, parameters, 'out_hl4_expected_outcomes_details_id');
		return rdo;
};

function deleteHl4ExpectedOutcomes(parameters){
	var rdo = db.executeScalarManual(spDeleteExpOutcome, parameters, 'out_result');
	return rdo;
};

function deleteHl4ExpectedOutcomesDetail(parameters){
	var rdo = db.executeScalarManual(spDeleteExpOutcomeDetail, parameters, 'out_result');
	return rdo;
};