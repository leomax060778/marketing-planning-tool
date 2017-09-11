/** **** libs *********** */
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var budgetSourceRepLib = mapper.getBudgetSourceReportLib();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.dereport()));
}

function handleGet(parameters, userSessionID){
	if(parameters[0].name === "BUDGET_YEAR"){
		var rdo = budgetSourceRepLib.getBudgetSourceReport(parameters[0].value, userSessionID);
	} else{
		throw ErrorLib.getErrors().BadRequest(
	            "",
	            "reports/handleGet",
	            "invalid parameter (can be: BUDGET_YEAR)"
	        );
	}
	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody,userSessionID) {	
	httpUtil.notImplementedMethod();
}

function handlePut(reqBody,userSessionID){
	httpUtil.notImplementedMethod();
};

function handleDelete(reqBody,userSessionID){
	httpUtil.notImplementedMethod();
};

//Call request processing  
processRequest();