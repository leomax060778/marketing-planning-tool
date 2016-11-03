/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var outcomesLib = mapper.getOutcomes();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level3()));
	//return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
}

function handleGet(parameters, userId){
	var urlParametrs = {"in_hl_id": httpUtil.getUrlParameters().get("HL_ID")};
	/*var rdo = {};
	rdo.outcomes = outcomesLib.getAllOutcomes(urlParametrs);
	rdo.outcomesType = outcomesLib.getAllOutcomesType(urlParametrs);*/
	var rdo = outcomesLib.getAllOutcomes(urlParametrs);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userSessionID){
	httpUtil.notImplementedMethod()
};
function handlePut(reqBody, userSessionID){
	httpUtil.notImplementedMethod()
};
function handleDelete(reqBody, userSessionID){
	httpUtil.notImplementedMethod()
};

processRequest();