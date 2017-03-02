/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blDetailedReport = mapper.getDetailedReport();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.dereport()));
}

function handleGet(parameters, userSessionID){
	var type = httpUtil.getUrlParameters().get("TYPE");
	var rdo;
	if(!type){
		rdo = blDetailedReport.getDetailedReport();
	} else {
		switch(type) {
			case 'WITH_DETAILS':
				rdo = blDetailedReport.getDetailedReportWithDetails();
				break;
			case 'WITH_COMMENTS':
				rdo = blDetailedReport.getDetailedReportWithCommentCampaignForecastingKpis();
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("","reportServices/handleGet","invalid parameter value (should be either WITH_DETAILS or WITH_COMMENTS)");
		}
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