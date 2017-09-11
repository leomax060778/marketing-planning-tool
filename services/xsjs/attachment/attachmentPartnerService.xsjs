/****** libs ************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var partner = mapper.getPartner();
var config = mapper.getDataConfig();

function processRequest() {
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level3()));
}

function handleGet(parameters, userId) {
	return httpUtil.notImplementedMethod();
}

function handlePut(reqBody, userId) {
	var req;
	var hierarchy = httpUtil.getUrlParameters().get("HL");
	
	switch (hierarchy) {
	case 'HL5':
		req = partner.updateAttachmentPartner(reqBody, hierarchy, userId);
		break;
	case 'HL6':
		req = partner.updateAttachmentPartner(reqBody, hierarchy, userId);
		break;
	default:
        throw ErrorLib.getErrors().BadRequest("","attachmentPartnerService/handlePut","Invalid parameter name");
}
	    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);

}

function handleDelete(reqBody, userId) {
	return httpUtil.notImplementedMethod();
}

function handlePost(reqBody, userId) {
	return httpUtil.notImplementedMethod();
}

processRequest();