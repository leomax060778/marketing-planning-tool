/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blRegion = mapper.getRegion();
var ErrorLib = mapper.getErrors();
/******************************************/

var regionId = "REGION_ID";

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete);
}

function handleGet(parameters){
	if(parameters.length > 0){
		if(parameters[0].name == regionId){		
			var rdo = blRegion.getRegionById(parameters[0].value);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);				
		}
		else{
			throw ErrorLib.getErrors().BadRequest("","regionServices/handleGet","invalid parameter name (can be: REGION_ID)");
		}
	}else{
		var rdo = blRegion.getAllRegions();
		httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	}
	
};

function handlePost(reqBody, userSessionID){
	var rdo = blRegion.insertRegion(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handlePut(reqBody, userSessionID){
	var rdo = blRegion.updateRegion(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handleDelete(reqBody, userSessionID){
	var rdo = blRegion.deleteRegion(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();