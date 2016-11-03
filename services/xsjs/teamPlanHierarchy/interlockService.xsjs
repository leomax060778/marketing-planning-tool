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
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level3()));
	//return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
}

function handleGet(parameters, userId){
	var rdo = {};
	rdo.entity = interlockLib.getAllEntity();
	//rdo.organizationType = interlockLib.getAllOrganizationType();
	
	if(parameters.length > 0){
		if (parameters[0].name == METHOD){
			if(parameters[0].value){
				rdo.organizations = interlockLib.getGlobalTeam(parameters[0].value, userId);
				httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
			}
			else
				throw ErrorLib.getErrors().BadRequest("","interLockService/handleGet","invalid parameter value. Can not be null or empty");
		}
		else{
			throw ErrorLib.getErrors().BadRequest("","interLockService/handleGet","invalid parameter name (can be: GET_GLOBALS_TEAM)");
		}
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userSessionID){
	httpUtil.notImplementedMethod()
};
function handlePut(reqBody, userSessionID){
	httpUtil.notImplementedMethod()
};
function handleDelete(reqBody, userSessionID){
	httpUtil.notImplementedMethod()
};

processRequest();