/****** libs ************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ServiceRequestcategoryOptionLevel = mapper.getServiceRequestCategoryOptionLevelLib();
var hl5 = mapper.getLevel5();
/******************************************/
var hl5RequestOption = "GET_HL5_REQUEST_CATEGORY_OPTION";
function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, userSessionID) {
    var result = {};
    var method = httpUtil.getUrlParameters().get("METHOD");
    switch (method) {
        case hl5RequestOption:
            result = hl5.getServiceRequestCategoryOptionByHl5Id(null);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","level5Service/handleGet","invalid parameter name (can be: HL5_REQUEST_OPTION)");
    }
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
function handlePost(reqBody, userSessionID) {
    return httpUtil.notImplementedMethod();
}

function handlePut(reqBody, userSessionID) {
    var rdo = ServiceRequestcategoryOptionLevel.updateCategoryOptionLevel(reqBody, userSessionID);
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userSessionID) {
    return httpUtil.notImplementedMethod();
}
processRequest();