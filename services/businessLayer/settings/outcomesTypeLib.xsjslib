/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataOutcomeType = mapper.getDataOutcomeType();
var dataOutcome = mapper.getDataOutcome();
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/
function getOutcomesTypeByHl(hl){
	if(!hl) 
		throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found","outcomesServices/handleGet/getByHlId",outcomesTypeId);
	try{
		return dataOutcomeType.getOutcomesTypeByHlId(hl);
	} catch(e) {
		throw e;
	}
};

function insertOutcomesType(outcomeType, userId){
	try{
		outcomeType.in_user_id = userId;
		if(validate(outcomeType))
			return dataOutcomeType.insertOutcomesType(outcomeType);
	} catch(e) {
		throw e;
	}
}

function updateOutcomesType(outcomeType, userId){
	if(!outcomeType.in_outcomes_type_id || !Number(outcomeType.in_outcomes_type_id))
		throw ErrorLib.getErrors().CustomError("","outcomesTypeServices/handleUpdate/updateOutcomesType","The Outcomes Type ID is invalid");
	
	try{
		outcomeType.in_user_id = userId;
		if(validate(outcomeType))
			return dataOutcomeType.updateOutcomesType(outcomeType);
	} catch(e) {
		throw e;
	}
}

function deleteOutcomesType(outcomeTypeId, userId){
	if(!outcomeTypeId || !Number(outcomeTypeId))
		throw ErrorLib.getErrors().CustomError("","outcomesTypeServices/handlePost/deleteOutcomesType","The Outcomes Type ID is invalid");
	
	if(dataOutcome.getOutcomesCountByOutcomesTypeId(outcomeTypeId))
		throw ErrorLib.getErrors().CustomError("","outcomesTypeServices/handleDelete/deleteOutcomesType","Cannot delete this Item, it has associated Outcomes");
	
	try{
		return dataOutcomeType.deleteOutcomesType(outcomeTypeId, userId);
	} catch(e) {
		throw e;
	}
}

function validate(outcomeType){
	if(!outcomeType.in_outcomes_type_name)
		throw ErrorLib.getErrors().CustomError("","outcomesTypeServices/handlePost/insertOutcomesType","The Outcomes Type Name is not found");
	
	if(!outcomeType.in_hierarchy_level_id || !Number(outcomeType.in_hierarchy_level_id))
		throw ErrorLib.getErrors().CustomError("","outcomesTypeServices/handlePost/insertOutcomesType","The Hierarchy Level is invalid");
	
	return true;
}