/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var budgetReportLib = mapper.getBudgetSpendReportLib();
/******************************************/

function processRequest(){
return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false, config.getResourceIdByName(config.budgetSpendRequest()));
}

function handleGet(parameters, userId){
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === "GET_L5_SPEND_BUDGET_REPORT") {
            rdo = budgetReportLib.getL5SpendBudgetReport(userId);
        } else if (parameters[0].name === "GET_L6_SPEND_BUDGET_REPORT") {
        	rdo = budgetReportLib.getL6SpendBudgetReport(userId);
        } else if (parameters[0].name === "GET_L5_SPEND_BUDGET_REPORT_BY_ID" && parameters[1].name === "BUDGET_SPEND_REQUEST_ID") {
        		rdo = budgetReportLib.getL5SpendBudgetReportById(parameters[0].value, parameters[1].value, userId);
        } else if (parameters[0].name === "GET_L6_SPEND_BUDGET_REPORT_BY_ID" && parameters[1].name === "BUDGET_SPEND_REQUEST_ID") {
    			rdo = budgetReportLib.getL6SpendBudgetReportById(parameters[0].value, parameters[1].value, userId);
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "dataEntryReport/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_L5_SPEND_BUDGET_REPORT, GET_L5_SPEND_BUDGET_REPORT_BY_ID, GET_L6_SPEND_BUDGET_REPORT, GET_L6_SPEND_BUDGET_REPORT_BY_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "dataEntryReport/handleGet",
            "invalid parameter (can be: GET_L5_SPEND_BUDGET_REPORT, GET_L6_SPEND_BUDGET_REPORT)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId){
	var parameters = httpUtil.getUrlParameters();
	var rdo;
	if(parameters.length > 0){
		var method = parameters.get('METHOD');
		if(method === "SEND_EMAIL"){
			rdo = budgetReportLib.sendBudgetSpendRequestInformationByEmail(reqBody, userId);
		} else{
			throw ErrorLib.getErrors().BadRequest(
		            "",
		            "dataEntryReport/handlePost",
		            "invalid parameter (can be: SEND_EMAIL)"
		        );
		}
	}else{
		throw ErrorLib.getErrors().BadRequest(
	            "",
	            "dataEntryReport/handlePost",
	            "missing parameter (can be: METHOD)"
	        );
	}
	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePut(reqBody, userId){
	var parameters = httpUtil.getUrlParameters();
	var rdo;
	if(parameters.length > 0){
		var method = parameters.get('METHOD');
		if(method === "APPROVE"){
			rdo = budgetReportLib.approveBudgetSpendRequest(reqBody, userId);
		} else if(method === "REJECT"){
			rdo = budgetReportLib.rejectBudgetSpendRequest(reqBody, userId);
		} else if(method === "DELETE"){
			rdo = budgetReportLib.deleteBudgetSpendRequest(reqBody, userId);
		} else{
			throw ErrorLib.getErrors().BadRequest(
		            "",
		            "dataEntryReport/handlePut",
		            "invalid parameter (can be: APPROVE, DELETE or REJECT)"
		        );
		}
	}else{
		throw ErrorLib.getErrors().BadRequest(
	            "",
	            "dataEntryReport/handlePut",
	            "missing parameter (can be: METHOD)"
	        );
	}
	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handleDelete(){
	var rdo = 1;
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();