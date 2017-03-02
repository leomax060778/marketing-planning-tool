/****** libs ************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blExpectedOutcomesLevel = mapper.getExpectedOutcomesLevelLib();
var config = mapper.getDataConfig();
/******************************************/

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

//Implementation of GET call -- Get Objective CampaignType
function handleGet(parameters, userSessionID) {
    return httpUtil.notImplementedMethod();
}
//Implementation of POST call -- Insert Objective CampaignType
function handlePost(reqBody, userSessionID) {
    return httpUtil.notImplementedMethod();
}

//Implementation of UPDATE call -- Update Objective CampaignType
function handlePut(reqBody, userSessionID) {
    var rdo = blExpectedOutcomesLevel.updateExpectedOutcomesLevel(reqBody, userSessionID);
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
//Implementation of DELETE call -- Delete Objective CampaignType
function handleDelete(reqBody, userSessionID) {
    return httpUtil.notImplementedMethod();
}
//Call request processing
processRequest();