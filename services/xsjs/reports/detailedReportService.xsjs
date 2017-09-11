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
	/*if(!type){
		rdo = blDetailedReport.getL4DetailedReport();
	} else {*/
		switch(type) {
			case 'L4':
				rdo = blDetailedReport.getL4DetailedReport();
				break;
			case 'L5':
				rdo = blDetailedReport.getL5DetailedReport();
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("","reportServices/handleGet","invalid parameter value (should be either L4 or L5)");
		}
	//}
	
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