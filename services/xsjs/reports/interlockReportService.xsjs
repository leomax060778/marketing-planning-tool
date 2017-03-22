/** **** libs *********** */
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var interlockLib = mapper.getInterlock();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.dereport()));
}

function handleGet(parameters, userSessionID){
	var rdo = interlockLib.getInterlockReport(userSessionID);
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