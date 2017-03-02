/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blLevel1 = mapper.getLevel1();
var config = mapper.getDataConfig();
/** *************************************** */
var GET_ALL_BY_USER = "GET_ALL_BY_USER";

function processRequest() {
	return httpUtil.processRequest(handleGet, handlePost, handlePut,
			handleDelete,false, config.getResourceIdByName(config.level1()));
}

function handleGet(parameters, userSessionID) {
	var rdo = null;
	if(parameters.length > 0){
		switch(parameters[0].name){
			case "GET_ALL_BY_USER":
				rdo = blLevel1.getPlanByUser(userSessionID);
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("","planService/handleGet","invalid parameter name (can be: GET_ALL_BY_USER)");
				break;
		}
	}else{
		throw ErrorLib.getErrors().BadRequest("","planService/handleGet","invalid number of parameters.");
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId) {
	return httpUtil.notImplementedMethod();
};
function handlePut(reqBody, userId) {
	return httpUtil.notImplementedMethod();
};
function handleDelete(reqBody, userId) {
	return httpUtil.notImplementedMethod();
};

processRequest();