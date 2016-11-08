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
	//return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
}

function handleGet(parameters, userSessionID){
	var rdo = interlockLib.getInterlockReport();
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