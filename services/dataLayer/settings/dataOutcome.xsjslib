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