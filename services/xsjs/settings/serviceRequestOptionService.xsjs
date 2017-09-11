/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ServiceRequestOptionLib = mapper.getServiceRequestOptionLib();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var permissions = mapper.getPermission();
/******************************************/

var hierarchyLevel = {
	'HL4' : 1,
	'HL5' : 2,
	'HL6' : 3
};

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}


function handleGet(params,userId){
	var result = {};

	if(params.length > 1){
		var categoryId = params.get("CATEGORY_ID");
		var levelId = hierarchyLevel[params.get("LEVEL_ID")];
			if(!params.get("GET_ASSIGNED")){
				result.availables = ServiceRequestOptionLib.getAvailableOptionByCategoryIdByLevelId(categoryId,levelId);
				result.assigned = ServiceRequestOptionLib.getAssignedOptionByCategoryIdByLevelId(categoryId,levelId);
			} else {
				result.results = ServiceRequestOptionLib.getAssignedOptionByCategoryIdByLevelId(categoryId,levelId, true);
			}
	}else{
		result = ServiceRequestOptionLib.getServiceRequestOptions();
	}

	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody,userId){

	var result = ServiceRequestOptionLib.insertServiceRequestOption(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handleDelete(reqBody, userId){
	var OPTION_ID = reqBody.SERVICE_REQUEST_OPTION_ID;
	var result = ServiceRequestOptionLib.deleteServiceRequestOption(OPTION_ID, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);

}

function handlePut(reqBody, userId){
	var result = ServiceRequestOptionLib.updateServiceRequestOption(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
processRequest();
