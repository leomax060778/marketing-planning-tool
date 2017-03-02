/****** libs ************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var categoryOptionLevel = mapper.getAllocationCategoryOptionLevelLib();
/******************************************/

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, userSessionID) {
    return httpUtil.notImplementedMethod();
}
function handlePost(reqBody, userSessionID) {
    return httpUtil.notImplementedMethod();
}

function handlePut(reqBody, userSessionID) {
    var rdo = categoryOptionLevel.updateCategoryOptionLevel(reqBody, userSessionID);
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userSessionID) {
    return httpUtil.notImplementedMethod();
}
processRequest();