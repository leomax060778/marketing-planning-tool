/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessPlan = mapper.getPlan();
var ErrorLib = mapper.getErrors();
var blLevel2 = mapper.getLevel2();
/** *************************************** */
var GET_ALL_BY_USER = "GET_ALL_BY_USER";

function processRequest() {
	return httpUtil.processRequest(handleGet, handlePost, handlePut,
			handleDelete);
}

function handleGet(parameters, userSessionID) {
	var rdo = null;
	if(parameters.length > 0){
		switch(parameters[0].name){
			case "GET_ALL_BY_USER":
				rdo = blLevel2.getLevel2ByUser(userSessionID);
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("","planService/handleGet","invalid parameter name (can be: GET_ALL_BY_USER)");
				break;
		}
	}else{
		rdo = businessPlan.getAllPlan();
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId) {
	//var rdo = businessPlan.insertPlan(reqBody, userId);
	//return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	return httpUtil.notImplementedMethod();
};
function handlePut(reqBody, userId) {
	//var rdo = businessPlan.updatePlan(reqBody, userId);
	//return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	return httpUtil.notImplementedMethod();
};
function handleDelete(reqBody, userId) {
	//var rdo = businessPlan.deletePlan(reqBody, userId);
	//return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	return httpUtil.notImplementedMethod();
};

processRequest();