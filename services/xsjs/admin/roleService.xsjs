/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var businessRole = mapper.getRole();
var config = mapper.getDataConfig();
/** *************************************** */

var getAll = "ALL";
var getRoleById = "ROLEBYID";
var method = "method";
var id = "id";

function processRequest() {
	return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,false,config.getResourceIdByName(config.administration()));
}

// Not Implemented Method
function handleGet(param) {
	var rdo = businessRole.getAllRole();
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

// Implementation of PUT call -- Update Role
function handlePut(reqBody, roleId) {
	var rdo = role.updateRole(reqBody, roleId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);

	// if not match with any business call, then return a bad request error
	throw ErrorLib.getErrors().BadRequest("", "roleServices/handlePut",
			parameters);
};

// Implementation of DELETE call -- Delete Role
function handleDelete(reqBody, roleId) {
	var rdo = role.deleteRole(reqBody, roleId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

// Implementation of POST call -- Insert Role
function handlePost(reqBody, roleId) {
	var rdo = role.insertRole(reqBody, roleId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// Call request processing
processRequest();