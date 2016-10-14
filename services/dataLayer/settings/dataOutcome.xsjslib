/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetOutcomesByOtId = "GET_OUTCOMES_BY_OUTCOMES_TYPE_ID";
var spGetOutcomesByOutcomesTypeId = "GET_COUNT_OUTCOMES_BY_OUTCOMES_TYPE_ID";
var spInsertOutcomes = "INS_OUTCOMES";
var spUpdateOutcomes = "UPD_OUTCOMES";
var spDeleteOutcomes = "DEL_OUTCOMES";
/******************************************************/

function getOutcomesByOtId(outcomeTypeId){
        if(outcomeTypeId){
                var rdo = db.executeProcedure(spGetOutcomesByOtId, {'in_outcomes_type_id':outcomeTypeId});
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