/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessPlan = mapper.getLevel4DEReport();
var errors = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false, config.getResourceIdByName(config.level3()));
//return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
}

function handleGet(param){
	var in_hl4_id = httpUtil.getUrlParameters().get("HL4_ID");
	if(!in_hl4_id){
		var rdo = businessPlan.getAllL4DEReport();	
		httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	} else {
		var rdo = businessPlan.getL4ChangedFieldsByHl4Id(in_hl4_id);	
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