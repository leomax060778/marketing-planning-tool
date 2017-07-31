/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var outcomesLib = mapper.getOutcomes();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/
var methodGetAll = "getAll";

function processRequest(){
	
		return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
	
};

function handlePost(reqBody, userId) {
	var method = $.request.parameters.get("method");
	if(method == 'GET_KPI_VOLUME_VALUE'){
        result = outcomesLib.getKpiVolumeValue(reqBody.CAMPAIGN_TYPE_ID,reqBody.CAMPAIGN_SUBTYPE_ID, reqBody.KPI_OPTION_ID, reqBody.ANSWERS);
    } else {
        var result = outcomesLib.insertOutcomes(reqBody, userId);
	}

	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handleGet(params, userId) {
	var in_outcome_type_id = $.request.parameters.get("OT_ID");
	var hl = $.request.parameters.get("HL");
	var method = $.request.parameters.get("method");
	var result = [];
	if(hl){
		result = outcomesLib.getAllOutcomes(hl);
	} else if(in_outcome_type_id){
		result = outcomesLib.getOutcomesByOtId(in_outcome_type_id);
	} else if(method == 'GET_WIZARD_QUESTIONS'){
        result = outcomesLib.getWizardQuestions();
	};
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePut(reqBody, userId){
	var result = outcomesLib.updateOutcomes(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handleDelete(reqBody, userId){
	var result = outcomesLib.deleteOutcomes(reqBody.in_outcomes_id, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

processRequest();