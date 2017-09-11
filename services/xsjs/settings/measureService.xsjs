/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var permissions = mapper.getPermission();
var measureLib = mapper.getMeasure();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

// Not Implemented Method
function handlePost() {
	return httpUtil.notImplementedMethod();
};

// Not Implemented Method
function handlePut() {
	return httpUtil.notImplementedMethod();
};

// Not Implemented Method
function handleDelete() {
	return httpUtil.notImplementedMethod();
};

function handleGet() {
	var rdo = measureLib.getAllMeasure();
	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

processRequest();