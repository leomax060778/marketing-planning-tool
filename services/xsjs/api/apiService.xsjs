/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var apiLib = mapper.getApi();
/** *************************************** */

var method = "method";
var id = "id";
var GET_WBS_BY_ID = "WBS_ID";
var GET_WBS_BY_PATH = "WBS_PATH";

function processRequest() {
	httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,
			true, "", true);
}

function handleGet(parameters, userSessionID) {
	var rdo = null;
	if (parameters.length > 0) {
		switch (parameters[0].name) {
			case GET_WBS_BY_ID:
				rdo = apiLib.getL6ById(parameters[0].value);
				break;
			case GET_WBS_BY_PATH: 
				rdo = apiLib.getL6ByWBSPath(parameters[0].value);
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("", "apiServices/handleGet",
						"invalid parameter name");
				break;
		}
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId) {
	httpUtil.notImplementedMethod();
};

function handlePut(reqBody, userId) {
	httpUtil.notImplementedMethod();
};

function handleDelete(reqBody, userId) {
	httpUtil.notImplementedMethod();
};

processRequest();