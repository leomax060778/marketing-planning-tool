/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var hl5 = mapper.getLevel5();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/
var section = "FOR_SEARCH";
var method = "method";
var id = "id";
var setStatusInCRM = "SETINCRM";
var changeStatus = "CHANGESTATUS";
var sendInCrmNotificationMail = "SENDMAIL";

/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level4()));	
}

function handleGet(params, userId) {
	var in_hl4_id = httpUtil.getUrlParameters().get("HL4_ID");
	var in_hl5_id = httpUtil.getUrlParameters().get("HL5_ID");
	var param_section = httpUtil.getUrlParameters().get("section");
	var dataType = httpUtil.getUrlParameters().get("DATA");
	var in_sale_organization = httpUtil.getUrlParameters().get("SALE_ORGANIZATION_ID");
	var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR");
	var currentHl5Id = httpUtil.getUrlParameters().get("CURRENT_HL5");
	var result = {};
	if(in_hl4_id && !dataType){
		result = hl5.getHl5ByHl4Id(in_hl4_id);
	} else if (in_hl5_id) {
		result = hl5.getHl5ById(in_hl5_id);
	} else if (param_section && param_section == section){
		result = hl5.getLevel5ForSearch();
	} else if (dataType && dataType == "DISTRIBUTION_CHANNEL"){
		result = hl5.getAllDistributionChannel();
	} else if (dataType && dataType == "MARKETING_PROGRAM"){
		result = hl5.getAllMarketingProgram();
	} else if (dataType && dataType == "MARKETING_ACTIVITY"){
		result = hl5.getMarketingActivityHl5(in_hl4_id,currentHl5Id);
	} else if (dataType && dataType == "BUSINESS_OWNER"){
		result = hl5.getAllBusinessOwner();
	} else if (dataType && dataType == "COST_CENTER"){
		result = hl5.getCostCenterByHl4IdMarketingOrganizationId(in_hl4_id,in_sale_organization);
	}else{
		throw ErrorLib.getErrors().BadRequest("","level5Service/handleGet","invalid parameter name (can be: HL4_ID, HL5_ID or section)");
	}
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of PUT call -- Update HL5
function handlePut(reqBody, userId){
	var parameters = httpUtil.getUrlParameters();
	if(parameters.length > 0){
		var aCmd = parameters.get('method');
		var hl5Id = parameters.get('HL5_ID');
		switch (aCmd) {
			case sendInCrmNotificationMail:
					hl5.sendProcessingReportEmail(hl5Id, userId);
					//fallthrough
		    case setStatusInCRM: //set status In CRM
		    	var rdo = hl5.setHl5StatusInCRM(hl5Id, userId);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
		        break;
			case changeStatus:
				var rdo = hl5.changeHl5StatusOnDemand(hl5Id, userId);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
				break;
		    default:
		    	throw ErrorLib.getErrors().BadRequest("","level5Services/handlePut","insufficient parameters");
		}	
	}else{
		var result =  hl5.updateHl5(reqBody, userId);
		return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
	}
}

//Implementation of DELETE call -- Delete HL5
function handleDelete(reqBody, userId){
	var result = hl5.deleteHl5(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of POST call -- Insert HL5
function handlePost(reqBody, userId) {	
	var result = hl5.insertHl5(reqBody, userId); //return new L5 Id
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

processRequest();