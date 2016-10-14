/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessLavel3 = mapper.getLevel3();
var ErrorLib = mapper.getErrors();
/** *************************************** */

var GET_ALL_HL3 = "GET_ALL_HL3";
var GET_BY_HL3_ID = "GET_BY_HL3_ID";

// Main function
function processRequest() {
	httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

// function to manage an post request
function handlePost(reqBody, userSessionID) {
	var rdo = businessLavel3.createHl3(reqBody, userSessionID);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// function to manage an get request
function handleGet(parameters, userSessionID) {
	var rdo = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_ALL_HL3) {
			// get by hl2 and userid
			rdo = businessLavel3.getAllLevel3(parameters[0].value,
					userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		} else if (parameters[0].name === GET_BY_HL3_ID) {
			// get by hl3 and userid
			rdo = businessLavel3.getLevel3ById(parameters[0].value,
					userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		} else {
			throw ErrorLib.getErrors().BadRequest(
					"",
					"hl3Services/handleGet",
					"invalid parameter name (can be: GET_ALL_HL3 or GET_BY_HL3_ID)"
							+ parameters[0].name);
		}
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// function to manage an put request
function handlePut(reqBody,userSessionID) {
	var rdo = businessLavel3.updateHl3(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// function to manage an del request
function handleDelete(reqBody,userSessionID) {
	var rdo = businessLavel3.deleteHl3(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// Call the main function
processRequest();