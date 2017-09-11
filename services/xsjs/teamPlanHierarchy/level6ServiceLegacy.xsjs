/****** libs ************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var hl5 = mapper.getLevel5Legacy();
var hl6 = mapper.getLevel6Legacy();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/
var section = "FOR_SEARCH";
var method = "method";
var id = "id";
var setStatusInCRM = "SETINCRM";
var changeStatus = "CHANGESTATUS";
var sendInCrmNotificationMail = "SENDMAIL";
var categories = "HL5_CATEGORIES";
var expectedOutcomes = "HL5_EXPECTED_OUTCOMES";
/******************************************/

function processRequest() {
    return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, config.getResourceIdByName(config.level5()));
}

function handleGet(params, userId) {
    var in_hl5_id = httpUtil.getUrlParameters().get("HL5_ID");
    var in_hl6_id = httpUtil.getUrlParameters().get("HL6_ID");
    var param_section = httpUtil.getUrlParameters().get("section");
    var hl5_categories = httpUtil.getUrlParameters().get("HL5_CATEGORIES");
	var hl5_expectedOutcomes = httpUtil.getUrlParameters().get("HL5_EXPECTED_OUTCOMES");
    var method = httpUtil.getUrlParameters().get("METHOD");
    var parentId = httpUtil.getUrlParameters().get("PARENT_ID");
    var result = {};

    if (in_hl5_id && in_hl6_id === "0") {

        var acronym = hl6.getNewHl6Id(in_hl5_id);

        result = acronym ? acronym : 0;

	}else
	if(in_hl5_id && !hl5_categories && !hl5_expectedOutcomes){
        hl5.checkPermission(userId, null, in_hl5_id);
        result = hl6.getHl6ByHl5Id(in_hl5_id);
	}else
	if(in_hl6_id){
        hl6.checkPermission(userId, null, in_hl6_id);
        result = hl6.getHl6ById(in_hl6_id);
	}else
	if (param_section && param_section == section){
        result = hl6.getLevel6ForSearch(userId);
	}else if(hl5_categories && in_hl5_id && hl5_categories == categories){
        result = hl6.getHl6Categories(in_hl5_id);
	}else if(hl5_expectedOutcomes && in_hl5_id && hl5_expectedOutcomes == expectedOutcomes) {
        result = hl6.getHl6ExpectedOutcomesOptions(in_hl5_id);
    } else if (parentId && method && method == "GET_PARENT_REMAINING_BUDGET"){
        result = hl6.getParentRemainingBudgetByParentId(parentId);
    } else {
        throw ErrorLib.getErrors().BadRequest("", "level6Services/handleGet", "invalid parameter name (can be: HL5_ID, HL6_ID or section)");
    }
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

//Implementation of PUT call -- Update HL6
function handlePut(reqBody, userId) {
    var parameters = httpUtil.getUrlParameters();
    hl6.checkPermission(userId, null, parameters.get('HL6_ID') || reqBody.hl6.in_hl6_id);
    if (parameters.length > 0) {
        var aCmd = parameters.get('method');
        var hl6Id = parameters.get('HL6_ID');
        switch (aCmd) {
            case sendInCrmNotificationMail:
                hl6.sendProcessingReportEmail(hl6Id, userId);
            //fallthrough
            case setStatusInCRM: //set status In CRM
		    	var rdo = hl6.setHl6StatusInCRM(hl6Id, userId);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
                break;
            case changeStatus:
				var rdo = hl6.changeHl6StatusOnDemand(hl6Id, userId);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "level6Services/handlePut", "insufficient parameters");
        }
    } else {
        var result = hl6.updateHl6(reqBody, userId);
        return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
    }
}

//Implementation of DELETE call -- Delete HL6
function handleDelete(reqBody, userId) {
    hl6.checkPermission(userId, null, reqBody.in_hl6_id);
    var result = hl6.deleteHl6(reqBody, userId);
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

//Implementation of POST call -- Insert HL6
function handlePost(reqBody, userId) {
    hl5.checkPermission(userId, null, reqBody.hl6.in_hl5_id);
    var result = hl6.insertHl6(reqBody, userId); //return new L6 Id
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

processRequest();