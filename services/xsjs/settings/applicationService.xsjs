/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var application = mapper.getApplication();
/******************************************/
function processRequest(){
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet() {
    var rdo = application.getApplicationInfo();
    return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

 function handlePost(reqBody, userId){
 httpUtil.notImplementedMethod();
 }

 function handlePut(reqBody, userId){
 httpUtil.notImplementedMethod();
 }

 function handleDelete(reqBody, userId){
 httpUtil.notImplementedMethod();
 }

processRequest();
