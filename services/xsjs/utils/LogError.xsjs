/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessError = mapper.getLogError();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */

function processRequest() {
	httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false,"",true);
}

// Not Implemented Method
function handleGet() {
	return httpUtil.notImplementedMethod();
};
// Not Implemented Method
function handlePut() {
	return httpUtil.notImplementedMethod();
};
// Not Implemented Method
function handleDelete() {
	return httpUtil.notImplementedMethod();
};

// Implementation of POST call
function handlePost(reqBody, userId) {
	if (businessError.log(reqBody, userId, userId)) {
		return httpUtil.handleResponse("Error Logued", httpUtil.OK,
				httpUtil.AppJson);
	}
	// return default message when the error couldn't be logged
	return httpUtil.handleResponse("Error not Logued", httpUtil.OK,
			httpUtil.AppJson);
}

processRequest();