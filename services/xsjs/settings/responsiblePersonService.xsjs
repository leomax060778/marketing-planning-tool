/****** libs ************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blRP = mapper.getResponsiblePerson();
var config = mapper.getDataConfig();
/******************************************/

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

//Implementation of GET call -- Get Objective CampaignType
function handleGet(parameters, userSessionID) {
    if(parameters.length > 0){
        if(parameters[0].name == 'EmployeeNumber'){
            return httpUtil.handleResponse(blRP.getResponsiblePersonByEmployeeNumber(parameters[0].value), httpUtil.OK, httpUtil.AppJson);
        }
    }
    return httpUtil.handleResponse(blRP.getAllResponsiblePerson(), httpUtil.OK, httpUtil.AppJson);
}
//Implementation of POST call -- Insert Objective CampaignType
function handlePost(reqBody, userSessionID) {
    return httpUtil.handleResponse(blRP.insResponsiblePerson(reqBody,userSessionID), httpUtil.OK, httpUtil.AppJson);
}

//Implementation of UPDATE call -- Update Objective CampaignType
function handlePut(reqBody, userSessionID) {
    return httpUtil.handleResponse(blRP.updResponsiblePerson(reqBody,userSessionID), httpUtil.OK, httpUtil.AppJson);
}
//Implementation of DELETE call -- Delete Objective CampaignType
function handleDelete(reqBody, userSessionID) {
    return httpUtil.notImplementedMethod();
}
//Call request processing
processRequest();