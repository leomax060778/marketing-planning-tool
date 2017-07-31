/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var AllocationCategory = mapper.getAllocationCategoryLib();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var permissions = mapper.getPermission();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(){
	var result = [];
	var hierarchy_level_id = httpUtil.getUrlParameters().get("HIERARCHY_LEVEL_ID");
	if(hierarchy_level_id)
		result = AllocationCategory.getCategoryByHierarchyLevelId(hierarchy_level_id);
	else
		result = AllocationCategory.getAllocationCategory();
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody,userId){
	var result = AllocationCategory.insertAllocationCategory(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handleDelete(reqBody, userId){
	var CATEGORY_ID = reqBody.CATEGORY_ID;
	var confirm = httpUtil.getUrlParameters().get("CONFIRM_OK");
	var result = AllocationCategory.deleteAllocationCategory(CATEGORY_ID, userId, confirm);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);

}

function handlePut(reqBody, userId){
	var result = AllocationCategory.updateAllocationCategory(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
processRequest();
