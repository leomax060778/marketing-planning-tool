
/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessError = mapper.getLogError();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/


function processRequest(){
	httpUtil.processRequest(handlePost,handlePost,handlePost,handlePost, false,"",true);
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
	if(httpUtil.getHeaderByName("x-csrf-token")){
		return httpUtil.handleResponsePlain("X-CSRF-Token= " + httpUtil.getHeaderByName("x-csrf-token"));
	}
	
	/*
	var isFound = false;
	var tokenValue = null;
	var pepe = httpUtil.getHeaders();
	for (var j = 0; j < pepe.length; ++j) {
	    var headerName = pepe[j].name;
	    var headerValue = pepe[j].value;
	    
	    if(headerName =="x-csrf-token") {
	    	isFound = true; 
	    	tokenValue = pepe[j].value;
	    }
    
	 }
	
	return httpUtil.handleResponsePlain("X-CSRF-Token= Found " + isFound + " Token value: " + tokenValue + " " + JSON.stringify(httpUtil.getHeaders()));
	*/
	
	throw ErrorLib.getErrors().Unauthorized();
}


processRequest();