/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var outcomesLib = mapper.getOutcomes();
var ErrorLib = mapper.getErrors();
/******************************************/
var methodGetAll = "getAll";

function processRequest(){
	try{
		httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete);
	} catch (e) {
		return ErrorLib.getErrors().CustomError("Error","outcomeServices/","Error when attempted to process the request");
	}
};

function handlePost(reqBody, userId) {	
	var result = outcomesLib.insertOutcomes(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handleGet(params, userId) {
	var in_outcome_type_id = $.request.parameters.get("OT_ID");
	var hl = $.request.parameters.get("HL");
	var method = $.request.parameters.get("method");
	var result = [];
	if(hl){
		result = outcomesLib.getAllOutcomes(hl);
	} else if(in_outcome_type_id){
		result = outcomesLib.getOutcomesByOtId(in_outcome_type_id);
	}; 			
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePut(reqBody, userId){
	var result = outcomesLib.updateOutcomes(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handleDelete(reqBody, userId){
	var result = outcomesLib.deleteOutcomes(reqBody.in_outcomes_id, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

processRequest();