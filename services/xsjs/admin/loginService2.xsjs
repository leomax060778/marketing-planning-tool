/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var loginLib = mapper.getLogin();
var userLib = mapper.getUser();
/******************************************/

//use the last parameter set in true because we don't need to validate the token
function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,true);
}

function handleGet(parameters, userId){
	throw ErrorLib.getErrors().NotImplemented("","","");
}

function handlePost(reqbody, userId){
	
	var username = reqBody.username;
	var password = reqBody.password;
	
	return	httpUtil.handleResponse(loginLib.login(username,password),httpUtil.OK,httpUtil.AppJson); 
}

function handlePut(parameters, userId){
	throw ErrorLib.getErrors().NotImplemented("","","");
}

function handleDelete(parameters, userId){
	var isUserTokenDeleted = false;
	var userId = reqBody.userId;

	if (userId !== null) {
		isUserTokenDeleted = loginLib.deleteUserToken(userId);
	}
	return	httpUtil.handleResponse("",httpUtil.OK,httpUtil.AppJson);
}

//Call request processing  
processRequest();