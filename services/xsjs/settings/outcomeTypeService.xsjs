/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var outcomesTypeLib = mapper.getOutcomesType();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
	
		return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
	
};

function handlePost(reqBody, userId) {	
	var result = outcomesTypeLib.insertOutcomesType(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handleGet(params, userId) {
	var hl = $.request.parameters.get("HL");
	var result = [];
	if(hl){
		result = outcomesTypeLib.getOutcomesTypeByHl(hl);
	} 
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePut(reqBody, userId){
	var result = outcomesTypeLib.updateOutcomesType(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handleDelete(reqBody, userId){
	var result = outcomesTypeLib.deleteOutcomesType(reqBody.in_outcomes_type_id, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

processRequest();