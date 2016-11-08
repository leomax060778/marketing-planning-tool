/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var permissions = mapper.getPermission();
var hlLib = mapper.getHl();
/******************************************/
function processRequest(){
	//return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.settings()));
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,true,"",true);
}

function handleGet(parameters, userId){
	var rdo = hlLib.getAllHl(userId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId){
	httpUtil.notImplementedMethod();
};

function handlePut(reqBody, userId){
	httpUtil.notImplementedMethod();
};

function handleDelete(reqBody, userId){
	httpUtil.notImplementedMethod();
};

processRequest();