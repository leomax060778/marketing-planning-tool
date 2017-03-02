/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var hl4 = mapper.getLevel4();
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
	
		return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level3()));

};

/**
 * 
 * @param {bigInt} $.request.parameters.HL3_ID - Team ID
 * @param {bigInt} $.request.parameters.USER_ID - Loggin user_id
 * @param {tinyInt} $.request.parameters.IS_DATA_ENTRYE - Flag used to fliter by HL4 status_detail_id 
 *
 * @returns {collection} result
 * @returns {decimal} total_budget - HL4 Total Budget
 * 
 */
function handleGet(params, userId) {
	var in_hl3_id = httpUtil.getUrlParameters().get("HL3_ID");
	var in_hl4_id = httpUtil.getUrlParameters().get("HL4_ID");
	var param_section = httpUtil.getUrlParameters().get("section");
	var result = {};
	if(in_hl3_id){
		result = hl4.getHl4(in_hl3_id);
	} else if (in_hl4_id) {
		result = hl4.getHl4ById(in_hl4_id);
	} else if (param_section && param_section == section){
		result = hl4.getLevel4ForSearch();
	} else{
		throw ErrorLib.getErrors().BadRequest("","level4Services/handleGet","invalid parameter name (can be: HL3_ID, HL4_ID or section)");
	}
	
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

//Implementation of PUT call -- Update HL4
function handlePut(reqBody, userId){
	var parameters = httpUtil.getUrlParameters();
	if(parameters.length > 0){
		var aCmd = parameters.get('method');
		var hl4Id = parameters.get('HL4_ID');
		switch (aCmd) {
			case sendInCrmNotificationMail:
					hl4.sendProcessingReportEmail(hl4Id, userId);
					//fallthrough
		    case setStatusInCRM: //set status In CRM
				var rdo = hl4.setHl4StatusInCRM(hl4Id, userId);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
		        break;
			case changeStatus:
				var rdo = hl4.changeHl4StatusOnDemand(hl4Id, userId);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
				break;
		    default:
		    	throw ErrorLib.getErrors().BadRequest("","level4Services/handlePut","insufficient parameters");
		}	
	}else{
		var result =  hl4.updateHl4(reqBody, userId);
		return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
	}
};

//Implementation of DELETE call -- Delete HL4
function handleDelete(reqBody, userId){
	var result =  hl4.deleteHl4(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

//Implementation of POST call -- Insert HL4
function handlePost(reqBody, userId) {	
	var result = hl4.insertHl4(reqBody, userId); //return new L4 Id
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

processRequest();