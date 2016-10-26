/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetOutcomesTypeByHlId = "GET_OUTCOMES_TYPE_BY_HL_ID";
var spInsertOutcomesType = "INS_OUTCOMES_TYPE";
var spUpdateOutcomesType = "UPD_OUTCOMES_TYPE";
var spDeleteOutcomesType = "DEL_OUTCOMES_TYPE";
/******************************************************/
var hierarchyLevel = {
		"hl3": 1, //Ex HL4
		"hl4": 2, //Ex HL5
		"hl5": 3 //Ex HL6
}

function getOutcomesTypeByHlId(hl){
	if(hl){
		var rdo = db.executeProcedure(spGetOutcomesTypeByHlId, {'in_hl_id':hierarchyLevel[hl]});
		return db.extractArray(rdo.out_outcomes_type);
	}	
	return null;
};

function insertOutcomesType(parameters){
	return db.executeScalar(spInsertOutcomesType, parameters, 'out_outcomes_type_id');
}

function updateOutcomesType(parameters){
	return db.executeScalar(spUpdateOutcomesType, parameters, 'out_result');
}

function deleteOutcomesType(id, userId){
	if(id){
		return db.executeScalar(spDeleteOutcomesType, {'in_outcomes_type_id': id, 'in_user_id': userId}, 'out_result');
	}	
	return null;
}


/*function getExpectedOutcomeDetailById(id){	
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
};*/