/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var apiLib = mapper.getApi();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */

var method = "method";
var id = "id";
var getWbsById = "WBS_ID";
var getWbsByPath = "WBS_PATH";

function processRequest() {
	httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,
			false, "", true);
}

function handleGet(parameters, userId) {
	var parameters = httpUtil.getUrlParameters();
	if(parameters.length > 0){
		var aCmd = parameters.get('method');
		switch (aCmd) {
		    case getWbsById: // get WBS by ID
		    	var rdo = apiLib.getL6ById(parameters[1].value);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson); 
		        break;
		    case getWbsByPath:
		    	var rdo = apiLib.getL6ByWBSPath(parameters[1].value);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
		        break;
		    default:
		    	throw ErrorLib.getErrors().BadRequest("","apiServices/handleGet","insufficient parameters");
		}	
	}
	//if not match with any request supported, then return a bad request error
	throw ErrorLib.getErrors().BadRequest("","apiServices/handleGet",parameters);
};

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