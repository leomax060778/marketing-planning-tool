/** **** libs *********** */
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var interlockLib = mapper.getInterlock();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */

var METHOD = "GET_GLOBALS_TEAM";

function processRequest(){
	//return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,true, config.getResourceIdByName(config.level3()));
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,true,"",true);
}

function handleGet(parameters, userId){
	var rdo = {};
	
	//rdo.organizationType = interlockLib.getAllOrganizationType();
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
		} else{
			throw ErrorLib.getErrors().BadRequest("","interLockService/handleGet","invalid parameter name (can be: GET_GLOBALS_TEAM)");
		}
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId){
	var rdo = interlockLib.resendRequestEmail(reqBody.interlockId, userId);	
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