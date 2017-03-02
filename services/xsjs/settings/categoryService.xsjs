/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var categoryLib = mapper.getCategory();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var permissions = mapper.getPermission();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(){
	var hierarchy_level_id = httpUtil.getUrlParameters().get("HIERARCHY_LEVEL_ID");
	var rdo = categoryLib.getCategoryByHierarchyLevelId(hierarchy_level_id);
	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}
function handlePost(reqBody,userId){
	var hierarchy_level_id = reqBody.HIERARCHY_LEVEL_ID;
	var measure_id = reqBody.MEASURE_ID;
	var name = reqBody.NAME;
	var description = reqBody.DESCRIPTION;
	var inProcessingReport = reqBody.IN_PROCESSING_REPORT;

	var result = categoryLib.InsertCategory(description, name, hierarchy_level_id, measure_id, inProcessingReport, userId);
	return	httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
function handleDelete(reqBody, userId){
	var category_id = reqBody.CATEGORY_ID;
	var rdo = categoryLib.delCategory(category_id,userId);
	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

function handlePut(reqBody, userId){
	var hierarchy_level_id = reqBody.HIERARCHY_LEVEL_ID;
	var category_id = reqBody.CATEGORY_ID;
	var measure_id = reqBody.MEASURE_ID;
	var name = reqBody.NAME;
	var description = reqBody.DESCRIPTION;
	var inProcessingReport = reqBody.IN_PROCESSING_REPORT;

	var rdo = categoryLib.UpdateCategory(category_id,description, name, hierarchy_level_id, measure_id, inProcessingReport, userId);
	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}
processRequest();
