/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var blSpendCategory = mapper.getSpendCategory();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,true,"",true);
	//return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.settings()));
	//return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
}

function handleGet(parameters, userId){
	var parameters = httpUtil.getUrlParameters(); 
	if(parameters.length > 0){
		var aLevelId = parameters.get('HL_ID');
	
		var rdo = blSpendCategory.getSpendCategory(aLevelId, userId);
		return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	}
	//if not match with any request supported, then return a bad request error
	throw ErrorLib.getErrors().BadRequest("","spendCategoryServices/handleGet", parameters);	
};

function handlePost(reqBody, userId){
	var rdo = blSpendCategory.insertSpendCategory(reqBody, userId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePut(reqBody, userId){
	var rdo = blSpendCategory.updateSpendCategory(reqBody, userId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleDelete(reqBody, userId){
	var rdo = blSpendCategory.deleteSpendCategory(reqBody, userId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();