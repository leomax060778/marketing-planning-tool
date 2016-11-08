/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var budgetYear = mapper.getBudgetYear();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,true,"",true);
	//return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,config.getResourceIdByName(config.settings()));
}

function handleGet() {
	
	var rdo = budgetYear.getAllBudgetYear();
	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

function handlePut(reqBody) {
	
	var rdo = budgetYear.updateBudgetYear(reqBody);
	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

function handleDelete(){
	throw ErrorLib.getErrors().NotImplemented("","","");
}

function handlePost(){
	throw ErrorLib.getErrors().NotImplemented("","","");
}

processRequest();