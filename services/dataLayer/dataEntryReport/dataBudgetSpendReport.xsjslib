$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/

/** PROCEDURE VARIABLES **/
//GET
var GET_BUDGET_SPEND_REQUEST_HL5 = "GET_BUDGET_SPEND_REQUEST_HL5";
var GET_BUDGET_SPEND_REQUEST_HL6 = "GET_BUDGET_SPEND_REQUEST_HL6";

var GET_BUDGET_SPEND_REQUEST_HL5_BY_ID = "GET_BUDGET_SPEND_REQUEST_HL5_BY_ID";
var GET_BUDGET_SPEND_REQUEST_HL6_BY_ID = "GET_BUDGET_SPEND_REQUEST_HL6_BY_ID";

var GET_HL2_BY_SPEND_REQUEST = "GET_HL2_BY_BUDGET_SPEND_REQUEST_ID";
var GET_BUDGET_SPEND_REQUEST_STATUS = "GET_BUDGET_SPEND_REQUEST_STATUS_BY_ID";
//INS
var INS_STATUS_LOG = "INS_BUDGET_SPEND_REQUEST_STATUS_LOG";
var INS_BUDGET_SPEND_REQUEST_MESSAGE = "INS_BUDGET_SPEND_REQUEST_MESSAGE";
//UPD
var UPD_STATUS = "UPD_BUDGET_SPEND_REQUEST_STATUS";


/** GET **/

function getL5SpendBudgetReport(excludedStatusId, userId){
	var params = {};
	params.in_user_id = userId;
	params.in_excluded_status_id = excludedStatusId;
	var rdo = db.executeProcedure(GET_BUDGET_SPEND_REQUEST_HL5, params);
	return db.extractArray(rdo.out_result);
}

function getL5SpendBudgetReportById(l5Id, budgetSpendRequestId, excludedStatus, userId){
	var params = {};
	params.in_user_id = userId;
	params.in_hl5_id = l5Id;
	params.in_budget_spend_request_id = budgetSpendRequestId;
	params.in_budget_spend_request_status_id = excludedStatus;
	
	var rdo = db.executeProcedure(GET_BUDGET_SPEND_REQUEST_HL5_BY_ID, params);
	
	var list = db.extractArray(rdo.out_result);
	list = JSON.parse(JSON.stringify(list));
	var messages = db.extractArray(rdo.out_messages);
	messages = JSON.parse(JSON.stringify(messages));
	
	if(list.length){
    	list[0].MESSAGES = messages;
 	   	return list[0];
    }else{
 	   	return {};
    }
}

function getL6SpendBudgetReport(excludedStatusId, userId){
	var params = {};
	params.in_user_id = userId;
	params.in_excluded_status_id = excludedStatusId;
	var rdo = db.executeProcedure(GET_BUDGET_SPEND_REQUEST_HL6, params);
	
	return db.extractArray(rdo.out_result);
}

function getL6SpendBudgetReportById(l6Id, budgetSpendRequestId, excludedStatus, userId){
	var params = {};
	params.in_user_id = userId;
	params.in_hl6_id = l6Id;
	params.in_budget_spend_request_id = budgetSpendRequestId;
	params.in_budget_spend_request_status_id = excludedStatus;
	
	var rdo = db.executeProcedure(GET_BUDGET_SPEND_REQUEST_HL6_BY_ID, params);
	var list = db.extractArray(rdo.out_result);
	list = JSON.parse(JSON.stringify(list));
	var messages = db.extractArray(rdo.out_messages);
	messages = JSON.parse(JSON.stringify(messages));
	
    if(list.length){
    	list[0].MESSAGES = messages;
 	   	return list[0];
    }else{
 	   	return {};
    }
}

function getBudgetSpendRequestStatusById(budgetSpendRequestId){
	if(budgetSpendRequestId){
		var params = {};
		params.in_budget_spend_request_id = budgetSpendRequestId;
		var rdo = db.executeProcedure(GET_BUDGET_SPEND_REQUEST_STATUS, params);
		var list = db.extractArray(rdo.out_result);
		
	    if(list.length){
	 	   	return list[0];
	    }else{
	 	   	return {};
	    }
    }
	return null;
}

function getHL2ByBudgetSpendRequestId(BudgetSpendRequestId){
    if(BudgetSpendRequestId){
        var result;
        var params = {};
        params.in_budget_spend_request_id = BudgetSpendRequestId;
        
    	var rdo = db.executeProcedure(GET_HL2_BY_SPEND_REQUEST, params);
        var list = db.extractArray(rdo.out_result);
        if(list.length){
        	if(!list[0].HL2_ID){
        		return {};
        	}
        	
     	   	return list[0];
        }else{
     	   	return {};
        }
    }
    return null;
}

/** POST **/

function insertBudgetSpendRequestStatusLog(params){
	return db.executeScalarManual(INS_STATUS_LOG, params, "out_result");
}

function insertBudgetSpendRequestMessage(reqBody){
	return db.executeScalarManual(INS_BUDGET_SPEND_REQUEST_MESSAGE, reqBody, "budget_spend_request_message_id");
}

/** PUT **/

function approveBudgetSpendRequest(reqBody){
	return db.executeScalar(UPD_STATUS, reqBody, "out_result");
}

function rejectBudgetSpendRequest(reqBody){
	return db.executeScalar(UPD_STATUS, reqBody, "out_result");
}

function deleteBudgetSpendRequest(reqBody){
	return db.executeScalar(UPD_STATUS, reqBody, "out_result");
}