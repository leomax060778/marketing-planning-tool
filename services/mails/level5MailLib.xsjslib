function parseInCRM(level5Obj, basicData,  userName){
	var mailObj = {};
	mailObj.body = '<p>Dear '+userName+', Your WBS ID: '+level5Obj.PATH+' has been created/updated in CRM and is ready for use.</p>';
	mailObj.subject = basicData.ENVIRONMENT+' MPT - WBS ID created/updated in CRM';
	return mailObj;
}