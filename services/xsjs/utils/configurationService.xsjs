/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var config = mapper.getConfig();
/******************************************/


function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
}

function handleGet(parameters){
	var key = parameters.get("KEY");
	var result = config.getConfigurationByName(key);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePut(){
	return httpUtil.notImplementedMethod();
};
function handleDelete(){
	return httpUtil.notImplementedMethod();
};


//Implementation of POST call
function handlePost(reqBody) {
	return httpUtil.notImplementedMethod()
}


processRequest();