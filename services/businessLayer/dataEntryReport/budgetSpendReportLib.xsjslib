$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var dataBudgetReport = mapper.getDataBudgetSpendReport();
var businessUser = mapper.getUser();
var mail = mapper.getMail(); 
var config = mapper.getDataConfig();
/** ***********END INCLUDE LIBRARIES*************** */

//Budget Spend Request Status map
var statusMap = {
		"Pending": 1,
		"Approved": 2,
		"Rejected": 4,
		"NoLongerRequested": 3
};

function calculateBudgetInEuros(data) {
	var amount = data.BUDGET_SPEND_REQUEST_AMOUNT;
	var kEurAmount = (amount * data.CURRENCY_VALUE);
	return kEurAmount;
}

function completeCRMPath(array, key){
	var path = 'CRM-';
	array.forEach(function(data){
		if(data[key]){
			data[key] = path + data[key];
		}
		if(data.BUDGET_SPEND_REQUEST_AMOUNT){
			data.BUDGET_SPEND_REQUEST_AMOUNT_KEUR = (data.CURRENCY_ABBREVIATION !== "EUR")? "( " + calculateBudgetInEuros(data) + " K EUR )" : "";
			data.BUDGET_SPEND_REQUEST_AMOUNT = "" + data.BUDGET_SPEND_REQUEST_AMOUNT + " K " + data.CURRENCY_ABBREVIATION;
		}else if(data.BUDGET){
			data.BUDGET = ""+parseFloat(data.BUDGET);
		}
	});
}

//Budget Spend Request Origin map
var BUDGET_SPEND_REQUEST_ORIGIN = {
	    BUDGET_REQUESTOR: 1,
	    BUDGET_APPROVER: 2
};

/** GET **/

function getL5SpendBudgetReport(userId){
	if(!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
	            "budgetSpendReportService/handleGet/getL5SpendBudgetReport", userId);
	}
	
	var result = dataBudgetReport.getL5SpendBudgetReport(statusMap.NoLongerRequested, userId);
	result = JSON.parse(JSON.stringify(result));
	completeCRMPath(result, "HL5_PATH");
	return result;
}
function getL5SpendBudgetReportById(l5Id, budgetSpendRequestId, userId){
	if(!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
	            "budgetSpendReportService/handleGet/getL5SpendBudgetReportById", userId);
	}
	if(!l5Id){
		throw ErrorLib.getErrors().BadRequest("The Parameter l5Id is not found",
	            "budgetSpendReportService/handleGet/getL5SpendBudgetReportById", l5Id);
	}
	if(!budgetSpendRequestId){
		throw ErrorLib.getErrors().BadRequest("The Parameter budgetSpendRequestId is not found",
	            "budgetSpendReportService/handleGet/getL5SpendBudgetReportById", budgetSpendRequestId);
	}
	
	var excludedStatus = statusMap.NoLongerRequested;
	
	var result = dataBudgetReport.getL5SpendBudgetReportById(l5Id, budgetSpendRequestId, excludedStatus, userId);

	if(Object.keys(result).length > 0){
		completeCRMPath([result], "HL5_PATH");
	}
	return result;
}

function getL6SpendBudgetReport(userId){
	if(!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
	            "budgetSpendReportService/handleGet/getL6SpendBudgetReport", userId);
	}
	
	var result = dataBudgetReport.getL6SpendBudgetReport(statusMap.NoLongerRequested, userId);
	result = JSON.parse(JSON.stringify(result));
	completeCRMPath(result, "HL6_PATH");
	
	return result;
}

function getL6SpendBudgetReportById(l6Id, budgetSpendRequestId, userId){
	if(!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
	            "budgetSpendReportService/handleGet/getL6SpendBudgetReportById", userId);
	}
	if(!l6Id){
		throw ErrorLib.getErrors().BadRequest("The Parameter l6Id is not found",
	            "budgetSpendReportService/handleGet/getL6SpendBudgetReportById", l6Id);
	}
	if(!budgetSpendRequestId){
		throw ErrorLib.getErrors().BadRequest("The Parameter budgetSpendRequestId is not found",
	            "budgetSpendReportService/handleGet/getL5SpendBudgetReportById", budgetSpendRequestId);
	}
	
	var excludedStatus = statusMap.NoLongerRequested;
	
	var result = dataBudgetReport.getL6SpendBudgetReportById(l6Id, budgetSpendRequestId, excludedStatus, userId);
	result = JSON.parse(JSON.stringify(result));
	completeCRMPath([result], "HL6_PATH");
	
	return result;
}

/** POST **/

//Insert Old Spend Budget Request Status in the Log table
function insertBudgetSpendRequestStatusLog(reqBody){
	return dataBudgetReport.insertBudgetSpendRequestStatusLog(reqBody);
}

//Send Email with Budget Spend Request Information
function sendBudgetSpendRequestInformationByEmail(reqBody, userId){
	var budgetSpendRequestData;
	if(!reqBody.BUDGET_SPEND_REQUEST_ID){
		throw ErrorLib.getErrors().BadRequest("The parameter reqBody.BUDGET_SPEND_REQUEST_ID is not found",
			     "budgetSpendReportService/handlePost/sendBudgetSpendRequestInformationByEmail", reqBody.BUDGET_SPEND_REQUEST_ID);
	}
	
	if(reqBody.HL5_ID){
		budgetSpendRequestData = getL5SpendBudgetReportById(reqBody.HL5_ID, reqBody.BUDGET_SPEND_REQUEST_ID, userId);
	}else if(reqBody.HL6_ID){
		budgetSpendRequestData = getL6SpendBudgetReportById(reqBody.HL6_ID, reqBody.BUDGET_SPEND_REQUEST_ID, userId);
	}else{
		throw ErrorLib.getErrors().BadRequest("Can be HL5_ID or HL6_ID ",
			     "budgetSpendReportService/handlePost/sendBudgetSpendRequestInformationByEmail", "The parameter HL_ID is not found");
	}
	
	if(!reqBody.NOTE){
		throw ErrorLib.getErrors().BadRequest("The parameter reqBody.NOTE is not found",
			     "budgetSpendReportService/handlePost/sendBudgetSpendRequestInformationByEmail", reqBody.NOTE);
	}
	
	var appUrl = config.getAppUrl();
	var body = '<p> Dear Colleague </p>';
	body += '<p style="margin-bottom: 1rem;">'+reqBody.NOTE+'</p>';
	body += '<p>Budget Spend Information:</p>';
	body += '<table><tr><th>Field</th><th>Current Value</th></tr>';
	body += '<tr><td>CRM</td><td>CRM-'+budgetSpendRequestData.HL5_PATH+'</td></tr>';
	body += '<tr><td>Request Type</td><td>'+budgetSpendRequestData.BUDGET_SPEND_REQUEST_TYPE_DISPLAY_NAME+'</td></tr>';
	body += '<tr><td>Requester</td><td>'+budgetSpendRequestData.BUDGET_SPEND_REQUEST_REQUESTER+'</td></tr>';
	body += '<tr><td>Requested on</td><td>'+budgetSpendRequestData.BUDGET_SPEND_REQUEST_DATE+'</td></tr>';
	body += '<tr><td>Requested Resource</td><td>'+budgetSpendRequestData.REQUESTED_RESOURCE+'</td></tr>';
	body += '<tr><td>Amount</td><td>'+budgetSpendRequestData.BUDGET_SPEND_REQUEST_AMOUNT+'</td></tr>';
	body += '</table>';
	body += '<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; }';
	body += 'table tr th{ text-align:center; }';
	body += 'td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; }';
	body += "tr:nth-child(even) { background-color: #dddddd;} </style>";


	var mailObject = mail.getJson(reqBody.RECIPIENTS, "MPT - Budget Spend Report", body);
	//var mailObject = mail.getJson([{"address": "iberon@folderit.net"}], "MPT - Budget Spend Report", body);
	mail.sendMail(mailObject,true);
	return 1;
}

/** PUT **/

// Approve Budget Spend Request
function approveBudgetSpendRequest(reqBody, userId){
	var result;
	var arrayData = [];
	var arrayLogs = [];
	var arrayReqBody = [];
	var params = {};
	var logParams = {};
	
	if(!reqBody.length){
		arrayData.push(reqBody);
	}else{
		arrayData = reqBody;
	}
		
	try{
		
		arrayData.forEach(function(eachReqBody){
			//General validations
			validateUpdateBasicData(eachReqBody, userId);
			var oldStatus = dataBudgetReport.getBudgetSpendRequestStatusById(eachReqBody.BUDGET_SPEND_REQUEST_ID);

			//Status validation
			if(!validateStatus(oldStatus.BUDGET_SPEND_REQUEST_STATUS_ID)){
				throw ErrorLib.getErrors().BadRequest("The Status can not be changed",
					     "budgetSpendReportService/handlePut/approveBudgetSpendRequest", eachReqBody.BUDGET_SPEND_REQUEST_ID);
			}
			
			//Insert Log
			logParams.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
			logParams.in_status_id = Number(oldStatus.BUDGET_SPEND_REQUEST_STATUS_ID);
			logParams.in_created_user_id = userId;
			
			arrayLogs.push(logParams);
								
			//Update Status
			params.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
			params.in_status_id = statusMap.Approved;
			params.in_user_id = userId;
			
			arrayReqBody.push(params);						
		});
		
		//Insert Log
		insertBudgetSpendRequestStatusLog(arrayLogs);
		//Update Status
		result = dataBudgetReport.approveBudgetSpendRequest(arrayReqBody);
		
	}catch(e){
		throw ErrorLib.getErrors().CustomError("",
	            "budgetSpendReportService/handlePut/approveBudgetSpendRequest", e.toString());
	}
	return result;
	
}

// Reject Budget Spend Request
function rejectBudgetSpendRequest(reqBody, userId){
	var result;
	
	var arrayData = [];
	var arrayLogs = [];
	var arrayMessages = [];
	var arrayReqBody = [];
	
	var params = {};
	var logParams = {};
	var messageParams = {};
	
	if(!reqBody.length){
		arrayData.push(reqBody);
	}else{
		arrayData = reqBody;
	}
		
	try{
		
		arrayData.forEach(function(eachReqBody){
			validateUpdateBasicData(eachReqBody, userId);
			if(!validateMessage(eachReqBody)){
				throw ErrorLib.getErrors().BadRequest("The Parameter MESSAGE is not found",
				     "budgetSpendReportService/handlePut/rejectBudgetSpendRequest", eachReqBody.MESSAGE);
			}
			
			var oldStatus = dataBudgetReport.getBudgetSpendRequestStatusById(eachReqBody.BUDGET_SPEND_REQUEST_ID);
			
			//Insert Log
			logParams.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
			logParams.in_status_id = Number(oldStatus.BUDGET_SPEND_REQUEST_STATUS_ID);
			logParams.in_created_user_id = userId;
			
			arrayLogs.push(logParams);
			
			//Insert Message
			messageParams.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
			messageParams.in_message = eachReqBody.MESSAGE;
			messageParams.in_budget_spend_request_origin_id = BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_APPROVER;
			messageParams.in_user_id = userId;
			
			arrayMessages.push(messageParams);
			
			//Update Status
			params.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
			params.in_status_id = statusMap.Rejected;
			params.in_user_id = userId;
			
			arrayReqBody.push(params);						
		});
		
		//Insert Log
		insertBudgetSpendRequestStatusLog(arrayLogs);
		
		//Insert Message
		dataBudgetReport.insertBudgetSpendRequestMessage(arrayMessages);
		
		//Update Status
		result = dataBudgetReport.rejectBudgetSpendRequest(arrayReqBody); 
		
	}catch(e){
		throw ErrorLib.getErrors().CustomError("",
	            "budgetSpendReportService/handlePut/approveBudgetSpendRequest", e.toString());
	}
	return result;
}

// Delete Budget Spend Request
function deleteBudgetSpendRequest(reqBody, userId){
var result;
	
	var arrayData = [];
	var arrayLogs = [];
	var arrayMessages = [];
	var arrayReqBody = [];
	
	var params = {};
	var logParams = {};
	var messageParams = {};
	if(reqBody) {
		if (!reqBody.length) {
			arrayData.push(reqBody);
		} else {
			arrayData = reqBody;
		}

		try {

			arrayData.forEach(function (eachReqBody) {
				validateUpdateBasicData(eachReqBody, userId);
				if (!validateMessage(eachReqBody)) {
					throw ErrorLib.getErrors().BadRequest("The Parameter MESSAGE is not found",
						"budgetSpendReportService/handlePut/deleteBudgetSpendRequest", eachReqBody.MESSAGE);
				}

				var oldStatus = dataBudgetReport.getBudgetSpendRequestStatusById(eachReqBody.BUDGET_SPEND_REQUEST_ID);

				//Insert Log
				logParams.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
				logParams.in_status_id = Number(oldStatus.BUDGET_SPEND_REQUEST_STATUS_ID);
				logParams.in_created_user_id = userId;

				arrayLogs.push(logParams);

				//Insert Message
				messageParams.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
				messageParams.in_message = eachReqBody.MESSAGE;
				messageParams.in_budget_spend_request_origin_id = BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_APPROVER;
				messageParams.in_user_id = userId;

				arrayMessages.push(messageParams);

				//Update Status
				params.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
				params.in_status_id = statusMap.NoLongerRequested;
				params.in_user_id = userId;

				arrayReqBody.push(params);
			});

			//Insert Log
			insertBudgetSpendRequestStatusLog(arrayLogs);

			//Insert Message
			dataBudgetReport.insertBudgetSpendRequestMessage(arrayMessages);

			//Update Status
			result = dataBudgetReport.deleteBudgetSpendRequest(arrayReqBody);

		} catch (e) {
			throw ErrorLib.getErrors().CustomError("",
				"budgetSpendReportService/handlePut/deleteBudgetSpendRequest", e.toString());
		}
	}
	return result;
}

/** VALIDATION * */

// Validation of Budget Spend Request ID, user ID and user access
function validateUpdateBasicData(reqBody, userId){
	if(!reqBody.BUDGET_SPEND_REQUEST_ID){
		throw ErrorLib.getErrors().BadRequest("The Parameter BUDGET_SPEND_REQUEST_ID is not found",
	            "budgetSpendReportService/handlePut/approveBudgetSpendRequest", reqBody.BUDGET_SPEND_REQUEST_ID);
	}
	if(!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
	            "budgetSpendReportService/handlePut/approveBudgetSpendRequest", userId);
	}
	// Obtain HL2 based on the Budget Spend Request ID
	var relatedHL2 = dataBudgetReport.getHL2ByBudgetSpendRequestId(reqBody.BUDGET_SPEND_REQUEST_ID);

	if(relatedHL2 && Object.keys(relatedHL2).length === 0){
		throw ErrorLib.getErrors().BadRequest(reqBody.BUDGET_SPEND_REQUEST_ID,
	            "/getHL2ByBudgetSpendRequestId", "The Team related with the 'Budget Spend Request' could not be found");
	}
	
	// Verify if the user is in the Budget Approver list of the associated L2
	if(!businessUser.validateHL2BudgetApproverByUserId(relatedHL2.HL2_ID, userId)){
		throw ErrorLib.getErrors().BadRequest(userId,
	            "budgetSpendReportService/handlePut/approveBudgetSpendRequest", "The User is not an associated Budget Approver");
	}
}

function validateMessage(reqBody){
	return (reqBody.MESSAGE && reqBody.MESSAGE.length > 0);
}

function validateStatus(status){
	return (Number(status) !== statusMap.NoLongerRequested);
}