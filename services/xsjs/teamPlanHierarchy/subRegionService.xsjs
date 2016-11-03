/************************ libs ***************************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blSubRegion = mapper.getSubRegion();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** ******************************************************/

var regionId = "REGION_ID";

function processRequest() {
	return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,false, config.getResourceIdByName(config.settings()));
	//return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
}

function handleGet(parameters) {
	if (parameters.length > 0) {
		if (parameters[0].name == regionId) {
			var rdo = blSubRegion.getSubRegionsByRegionId(parameters[0].value);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else {
			throw ErrorLib.getErrors().BadRequest("",
					"subRegionServices/handleGet", "invalid parameter REGION_ID");
		} 
	}
	else{
		var rdo = blSubRegion.getAllSubRegions();
		httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	}
		
};

function handlePost(reqBody, userSessionID){
	var rdo = blSubRegion.insertSubregion(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePut(reqBody, userSessionID){
	var rdo = blSubRegion.updateSubregion(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleDelete(reqBody, userSessionID){
	var rdo = blSubRegion.deleteSubregion(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();