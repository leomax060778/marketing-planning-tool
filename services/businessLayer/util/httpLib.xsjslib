/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
/******************************************/

//constants
var OK = $.net.http.OK;
var AppJson =  "application/json";

//return a plain/text response with status 200;
function handleResponsePlain(strbody){
	$.response.contentType = "plain/text";
	$.response.status = 200;
	$.response.setBody(strbody)
}

//return a Response
function handleResponse(body, code, type) {
	$.response.contentType = type;
	$.response.status = code;
	$.response.setBody(JSON.stringify(body));
}




//return object whit all Get's parameters. example  myService.HttpLib.getUrlParameters().myParam
function getUrlParameters(){
	return $.request.parameters;
}


 
   
 //This function set the Response with a error. value = error --> ErrorLib.Errors.SomeError("message","datails")
function handleErrorResponse(value){
	if(value && value.code){
		var error = ErrorLib.getErrors().getError(value.code);
		error.stack =value.stack;
		error.details = value.details;
		$.response.contentType = "application/json";
		$.response.status = error.code;
		$.response.setBody(JSON.stringify(error));
	}	
	handleResponse(value,500,"application/json");	
}

//throw a Not Implemented Error
function notImplementedMethod(){
	throw ErrorLib.getErrors().NotImplemented("HTTP method is not supported.","httpLib/processRequest","");
}

//This function choose method, between Get, Put, Post or Delete. Catch all error throwed across the entired app and validate the user per XS call.
function processRequest(getMethod, postMethod, putMethod, deleteMethod) {
	try {
		
		//here  - Validate User() -----
		var reqBody = $.request.body ? JSON.parse($.request.body.asString()) : undefined;
		
		
		    switch ($.request.method) {
		        case $.net.http.GET:
		        	return getMethod(getUrlParameters());
		            break;
		        case $.net.http.PUT:
		        	return putMethod(reqBody);
		            break;
	            case $.net.http.POST:
	            	return postMethod(reqBody);
		            break;
		        case $.net.http.DELETE:
		        	return deleteMethod(reqBody);
		            break;
		        default:
		        	return notImplementedMethod();
			    	break;
		    }	    
		
	} catch (e) {
		handleErrorResponse(e);	
	}
}