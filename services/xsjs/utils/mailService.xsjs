

/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessMail = mapper.getMail();
var config = mapper.getDataConfig();
/******************************************/


function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
}

function handleGet(){
	return httpUtil.notImplementedMethod();
};
function handlePut(){
	return httpUtil.notImplementedMethod();
};
function handleDelete(){
	return httpUtil.notImplementedMethod();
};


//Implementation of POST call
function handlePost(reqBody, userId) {
    var sendProcessingReportRequesterMail = httpUtil.getUrlParameters().get("REQUESTER_EMAIL");

	var rdo = sendProcessingReportRequesterMail ? businessMail.sendProcessingReportRequesterMail(reqBody,userId)
		: businessMail.sendMail(reqBody,true);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}


processRequest();