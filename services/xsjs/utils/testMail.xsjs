
/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessError = mapper.getLogError();
var ErrorLib = mapper.getErrors();
var businessMail = mapper.getMail();
/******************************************/

/* JSON para testear
 * {
"FROM":"info@sap.corp",
"TO":[{"address":"lpeccin@folderit.net"}],
"SUBJECT":"This is the subject",
"BODY":"<html><head></head><body><p>Hell World</p><a href='http://www.google.com/'>link</a></body></html>"
}
 * */

function processRequest(){
	httpUtil.processRequest(handlePost,handlePost,handlePost,handlePost, true);
}

//Not Implemented Method
function handleGet(){
	return httpUtil.notImplementedMethod();
};
//Not Implemented Method
function handlePut(){
	return httpUtil.notImplementedMethod();
};
//Not Implemented Method
function handleDelete(){
	return httpUtil.notImplementedMethod();
};

//Implementation of POST call
function handlePost(reqBody) {
	var rdo = businessMail.sendMail(reqBody,true);		
	httpUtil.handleResponsePlain(rdo);	
}


processRequest();