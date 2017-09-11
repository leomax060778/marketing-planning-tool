/** **** libs *********** */
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var interlockLib = mapper.getInterlock();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */

var METHOD = "GET_GLOBALS_TEAM";
var GET_MESSAGE = "GET_MESSAGE";
var saveInterlockMessage = "ADDMESSAGE";

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userId){
	var rdo = {};
	
	var method = httpUtil.getUrlParameters().get("METHOD");
	if(parameters.length > 0){
		if (parameters[0].name == METHOD){
			 if(parameters[0].value){
				rdo.entity = interlockLib.getAllEntity();
				rdo.organizations = interlockLib.getGlobalTeam(parameters[0].value, userId);
				httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
			}
			else
				throw ErrorLib.getErrors().BadRequest("","interLockService/handleGet","invalid parameter value. Can not be null or empty");
		} else if (parameters[0].name == 'HASH') {
			rdo = interlockLib.getInterlockByHash(parameters[0].value, userId);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}else if(parameters[0].name === 'GET_MESSAGE'){
			rdo.messages = interlockLib.getMessagesByInterlockRequest(parameters[0].value, userId);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else{
			throw ErrorLib.getErrors().BadRequest("","interLockService/handleGet","invalid parameter name (can be: GET_GLOBALS_TEAM)");
		}
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId){
	var parameters = httpUtil.getUrlParameters();
	if(parameters.length > 0){
		var aCmd = parameters.get('method');
		switch (aCmd) {
		    case saveInterlockMessage: //save interlock message
		    	var rdo = interlockLib.saveInterlockRequestMessage(reqBody.interlockId, reqBody.message, userId);	
		        break;
		    default:
		    	throw ErrorLib.getErrors().BadRequest("","interLockService/handlePost","insufficient parameters");
		}	
	}else{
		var rdo = interlockLib.resendRequestEmail(reqBody.interlockId, userId);	
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePut(reqBody, userId){
	var rdo = interlockLib.setInterlockStatus(reqBody, userId);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleDelete(reqBody, userSessionID){
	httpUtil.notImplementedMethod()
};

processRequest();