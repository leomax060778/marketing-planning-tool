/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessPlan = mapper.getLevel6DEReport();
var errors = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false, config.getResourceIdByName(config.level3()));
}

function handleGet(param){
	var in_hl6_id = httpUtil.getUrlParameters().get("HL6_ID");
	if(!in_hl6_id){
		var rdo = businessPlan.getAllL6DEReport();
		httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	} else {
		var rdo = businessPlan.getL6ChangedFieldsByHl6Id(in_hl6_id);
		httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	}
};

function handlePost(){
	return httpUtil.notImplementedMethod();
};
function handlePut(){
	return httpUtil.notImplementedMethod();
};
function handleDelete(){
	return httpUtil.notImplementedMethod();
};

processRequest();