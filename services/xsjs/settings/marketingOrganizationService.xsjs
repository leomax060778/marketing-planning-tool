/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var MObl = mapper.getMarketingOrganization();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */
var GET_SALES_ORGANIZATION_ID = "GET_SALES_ORGANIZATION_ID";

function processRequest() {
		httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false,"",true);
}

// Not Implemented Method
function handleGet(parameters, userId) {
	var method = parameters.get("METHOD");
	if(parameters.length > 0){
		if (parameters[0].name == GET_SALES_ORGANIZATION_ID) {
			return httpUtil.handleResponse(MObl.getMarketingOrganizationById(parameters[0].value), httpUtil.OK, httpUtil.AppJson);
		}
		else if(method == "GET_BY_TEAM"){
			return httpUtil.handleResponse(MObl.getAllMarketingOrganizationByLevelHlId(parameters.get("LEVEL"), parameters.get("HL_ID")), httpUtil.OK, httpUtil.AppJson);
		}
		else{
			throw ErrorLib.getErrors().NotImplemented("","","");
		}
	}
	else{
		return httpUtil.handleResponse(MObl.getAllMarketingOrganization(), httpUtil.OK, httpUtil.AppJson);
	}
}

// Not Implemented Method
function handlePut(reqBody, userId) {
	return httpUtil.handleResponse(MObl.UpdateMarketingOrganization(reqBody, userId), httpUtil.OK, httpUtil.AppJson);
}
// Not Implemented Method
function handleDelete(reqBody, userId) {
	return httpUtil.handleResponse(MObl.DeleteMarketingOrganization(reqBody, userId), httpUtil.OK, httpUtil.AppJson);
}

// Implementation of POST call
function handlePost(reqBody, userId) {
	return httpUtil.handleResponse(MObl.InsertMarketingOrganization(reqBody, userId), httpUtil.OK, httpUtil.AppJson);
}

processRequest();