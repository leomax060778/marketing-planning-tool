/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var budgetYear = mapper.getBudgetYear();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet() {
	var rdo = budgetYear.getAllBudgetYear();
	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
	var rdo = budgetYear.updateBudgetYear(reqBody, userId);
	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

function handleDelete(reqBody, userId){
	var result = budgetYear.deleteBudgetYear(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody, userId){
	var result = budgetYear.insertBudgetYear(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

processRequest();