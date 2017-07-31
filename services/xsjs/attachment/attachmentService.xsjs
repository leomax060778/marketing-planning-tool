/****** libs ************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var attachments = mapper.getAttachment();

var GET_ATTACHMENT_BY_ID = "GET_ATTACHMENT_BY_ID";
var GET_ATTACHMENTS_BY_ID = "GET_ATTACHMENTS_BY_ID";

function processRequest() {
	httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, user_id) { 
	var res = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_ATTACHMENTS_BY_ID) {
			res = attachments.getAttachmentsById(parameters[0].value);
		} else if (parameters[0].name === GET_ATTACHMENT_BY_ID) {
			res = attachments.getAttachmentById(parameters[0].value);
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"attachmentService/handleGet",
				"invalid parameter name (can be: GET_ATTACHMENT_BY_ID)");
	}

	return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(objAttachment, userId) {
	var res = attachments.insertAttachments(objAttachment, userId);
	return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(objAttachment, user_id) {
	var res = attachments.updateAttachment(objAttachment, user_id);
	return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(objAttachment, user_id) {
	var res = attachments.deleteAttachment(objAttachment, user_id);
	return httpUtil.handleResponse(objAttachment, httpUtil.OK, httpUtil.AppJson);
}

processRequest();