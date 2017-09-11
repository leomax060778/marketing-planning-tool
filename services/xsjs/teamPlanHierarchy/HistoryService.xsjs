/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var blLevel1 = mapper.getLevel1();
var blLevel2 = mapper.getLevel2();
var blLevel3 = mapper.getLevel3();
/******************************************/
var hls = {
	HL1 : 1,
	HL2 : 2,
	HL3 : 3
};

var method = {
	GET_ALL_HL1 : 1,
	GET_ALL_HL2 : 2,
	GET_ALL_HL3 : 3,
	GET_HISTORY_HL1 : 4,
	GET_HISTORY_HL2 : 5,
	GET_HISTORY_HL3 : 6,
	GET_DETAIL_HL1 : 7,
	GET_DETAIL_HL2 : 8,
	GET_DETAIL_HL3 : 9
};

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSessionID){
	var rdo = {};
	var paramId = httpUtil.getUrlParameterByName('HL_ID');
	var paramVersion = httpUtil.getUrlParameterByName('VERSION');
	var paramMethod =  httpUtil.getUrlParameterByName('METHOD') ? httpUtil.getUrlParameterByName('METHOD') : httpUtil.getUrlParameterByName('method');
	var budgetYearId = httpUtil.getUrlParameterByName("BUDGET_YEAR_ID") || null;
	var regionId = httpUtil.getUrlParameterByName("REGION_ID") || null;
	var subRegionId = httpUtil.getUrlParameterByName("SUBREGION_ID") || null;

	switch (method[paramMethod.toUpperCase()]){
		case 1:{
			rdo = blLevel1.getHistoryAllFirstVersion(budgetYearId, regionId, subRegionId, userSessionID);
			break;}
		case 2:{
			rdo =blLevel2.getHistoryAllFirstVersion(paramId,userSessionID);
			break;}
		case 3:{
			rdo = blLevel3.getHistoryAllFirstVersion(paramId,userSessionID);
			break;}
		case 4:{
			rdo =blLevel1.getHistory(paramId);
			break;}
		case 5:{
			rdo =blLevel2.getHistory(paramId);
			break;}
		case 6:{
			rdo =blLevel3.getHistory(paramId);
			break;}
		case 7:{
			rdo =blLevel1.getHistoryDetail(paramId, paramVersion);
			break;}
		case 8:{
			rdo =blLevel2.getHistoryDetail(paramId, paramVersion);
			break;}
		case 9:{
			rdo =blLevel3.getHistoryDetail(paramId, paramVersion);
			break;}
	}

	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userSessionID){
	return httpUtil.notImplementedMethod();
};
function handlePut(reqBody, userSessionID){
	return httpUtil.notImplementedMethod();
};
function handleDelete(reqBody, userSessionID){
	return httpUtil.notImplementedMethod();
};

processRequest();