/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blCampaignType = mapper.getCampaignTypeLib();
/** *************************************** */
var GET_BY_ID = "GET_BY_ID";

function processRequest() {
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSessionID) {
	var rdo = null;
	if(parameters.length > 0){
		switch(parameters[0].name){
			case GET_BY_ID:
				rdo = blCampaignType.getCampaignTypeById(parameters[0].value);
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("","campaignType/handleGet","invalid parameter name (can be: GET_BY_ID)");
				break;
		}
	}else{
		rdo = blCampaignType.getAllCampaignType();
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