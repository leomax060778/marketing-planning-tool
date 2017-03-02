/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var AllocationOptionLib = mapper.getAllocationOptionLib();
var AllocationCategoryLib = mapper.getAllocationCategoryLib();
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
		//if(categoryId && levelId){
			if(!params.get("GET_ASSIGNED")){
				result.availables = AllocationOptionLib.getAvailableOptionByCategoryIdByLevelId(categoryId,levelId);
				result.assigned = AllocationOptionLib.getAssignedOptionByCategoryIdByLevelId(categoryId,levelId);
				result.in_processing_report = AllocationOptionLib.getAllocationCategoryByCategoryIdLevelId(categoryId, levelId);
				if(result.in_processing_report.length > 0)
				{result.in_processing_report = result.in_processing_report[0].IN_PROCESSING_REPORT;}
				else{result.in_processing_report = 0;}
			} else {
				result.results = AllocationOptionLib.getAssignedOptionByCategoryIdByLevelId(categoryId,levelId, true);
			}

		//}
	}else{
		result = AllocationOptionLib.getAllocationOption();
	}

	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody,userId){

	var result = AllocationOptionLib.insertAllocationOption(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handleDelete(reqBody, userId){
	var OPTION_ID = reqBody.ALLOCATION_OPTION_ID;
	var result = AllocationOptionLib.deleteAllocationOption(OPTION_ID, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);

}

function handlePut(reqBody, userId){
	var result = AllocationOptionLib.updateAllocationOption(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
processRequest();
