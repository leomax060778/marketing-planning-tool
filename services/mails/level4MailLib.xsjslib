function parseInCRM(level4Obj, basicData,  userName){
	var mailObj = {};
	mailObj.body = '<p>Dear '+userName+', Your WBS ID: '+level4Obj.PATH+' has been created/updated in CRM and is ready for use.</p>';
	mailObj.subject = basicData.ENVIRONMENT+' MPT - WBS ID created/updated in CRM';
	return mailObj;
}

function parseNotifyChangeByEmail(level4Obj, basicData,  userName){
	var mailObj = {};
	
	mailObj.body = ' <p> Dear '+userName+'</p>  <p>The User : ' + level4Obj.USER_NAME + ' has set the Initiative/Campaign ' + level4Obj.PATH + ' for you.</p>  <p>Click on the ' + basicData.APP_URL + ' to review</p>';
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Level 4 '+ level4Obj.EVENT;
}

function parseProcessingReportEmail(level4Obj, basicData,  userName){
	var mailObj = {};
	 var body = '<p> Dear '+userName+' </p>';
	    body += '<p>An initiative has been created in CRM.</p><br>';
	    body += '<p>' + basicData.APP_URL + '/TeamPlanHierarchy/Level3/edit/' + level4Obj.HL3_ID + '/' + level4Obj.HL4_ID + '</p>';

	mailObj.body = body;
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Level 4 Process';
}