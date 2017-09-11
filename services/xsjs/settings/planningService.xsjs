/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var planningLib = mapper.getPlanning();
var ErrorLib = mapper.getErrors();
/******************************************/

function processRequest(){
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
}

function handleGet(params, userId) {
	var budgetYearId = params[0] ? params[0].value : null;
	var result = planningLib.getPlanningByBudgetYear(budgetYearId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of PUT call -- Update HL6
function handlePut(reqBody, userId){
    throw ErrorLib.getErrors().NotImplemented();
}

//Implementation of DELETE call -- Delete HL6
function handleDelete(reqBody, userId){
    throw ErrorLib.getErrors().NotImplemented();
}

//Implementation of POST call -- Insert HL6
function handlePost(reqBody, userId) {
    throw ErrorLib.getErrors().NotImplemented();
}

processRequest();