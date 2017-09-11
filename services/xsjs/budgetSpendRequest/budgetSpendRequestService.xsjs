/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessPlan = mapper.getLevel4DEReport();
var errors = mapper.getErrors();
var config = mapper.getDataConfig();
var budgetSpendRequest = mapper.getBudgetSpendRequest();
/******************************************/

function processRequest(){
return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false, false, config.getResourceIdByName(config.budgetSpendRequest()));
}

function handleGet(param){
    var method = httpUtil.getUrlParameters().get("method");
    var hlId = httpUtil.getUrlParameters().get("HL_ID");
    var level = httpUtil.getUrlParameters().get("LEVEL");
    var result = {};
    switch (method) {
		case 'NO_CO_FUNDED':
            result = budgetSpendRequest.checkCountBudgetSpendRequestByHlIdLevel(hlId, level);
			break;
		default:
            throw ErrorLib.getErrors().BadRequest("","BudgetSpendRequestService/handleGet","Invalid parameter name");
	}
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePost(){
	return httpUtil.notImplementedMethod();
};
function handlePut(){
	return httpUtil.notImplementedMethod();
};
function handleDelete(){
	return httpUtil.notImplementedMethod();
};

processRequest();