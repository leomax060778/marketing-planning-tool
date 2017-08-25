function parseBudgetSpendReport(budgetReportObj, basicData,  userName){
	var mailObj = {};
	
	var body = '<p> Dear'+userName+'</p>';
	body += '<p style="margin-bottom: 1rem;">'+budgetReportObj.NOTE+'</p>';
	body += '<p>Budget Spend Information:</p>';
	body += '<table><tr><th>Field</th><th>Current Value</th></tr>';
	body += '<tr><td>CRM</td><td>CRM-'+budgetReportObj.HL5_PATH+'</td></tr>';
	body += '<tr><td>Request Type</td><td>'+budgetReportObj.BUDGET_SPEND_REQUEST_TYPE_DISPLAY_NAME+'</td></tr>';
	body += '<tr><td>Requester</td><td>'+budgetReportObj.BUDGET_SPEND_REQUEST_REQUESTER+'</td></tr>';
	body += '<tr><td>Requested on</td><td>'+budgetReportObj.BUDGET_SPEND_REQUEST_DATE+'</td></tr>';
	body += '<tr><td>Requested Resource</td><td>'+budgetReportObj.REQUESTED_RESOURCE+'</td></tr>';
	body += '<tr><td>Amount</td><td>'+budgetReportObj.BUDGET_SPEND_REQUEST_AMOUNT+'</td></tr>';
	body += '</table>';
	body += '<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; }';
	body += 'table tr th{ text-align:center; }';
	body += 'td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; }';
	body += "tr:nth-child(even) { background-color: #dddddd;} </style>";
	
	mailObj.body = body;
	mailObj.subject = basicData.ENVIRONMENT+' MPT - Budget Spend Report';
	return mailObj;
}
