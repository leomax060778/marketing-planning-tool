/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var interlockLib = mapper.getInterlock();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
/******************************************/

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete);
}

function handleGet(parameters, userId){
	var rdo = interlockLib.getAll();
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userSessionID){
	httpUtil.notImplementedMethod()
};
function handlePut(reqBody, userSessionID){
	httpUtil.notImplementedMethod()
};
function handleDelete(reqBody, userSessionID){
	httpUtil.notImplementedMethod()
};

processRequest();