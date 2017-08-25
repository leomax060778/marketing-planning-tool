function parseNotifyInterlock(interlockObj, basicData,  userName){
	var mailObj = {};
	var body = '<p> Dear '+userName+'</p>';
	 body += '<p>An interlock request has been created and needs your approval. Please follow the link: </p>';
	 body += '<p>' + basicData.APPURL + '/#InterlockManagement/' + interlockObj.TOKEN + '</p> <p> Thank you </p>';
	
	mailObj.body = body;
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Interlock Process';
	return mailObj;
}

function parseNotifyInterlockResponse(interlockObj, basicData,  userName){
	var mailObj = {};
	var body = '<p> Dear '+userName+'</p>';
	body += '<p>An interlock request has been sent and needs your approval. Please follow the link: </p>';
	body += '<p>' + basicData.APPURL + '/#InterlockManagement/' + interlockObj.TOKEN + '</p>';
	
	mailObj.body = body;
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Interlock Process';
	return mailObj;
}

function parseNotifyRequester(interlockObj, basicData,  userName){
	var mailObj = {};
	var text1 = '<p>A request for more information has been submitted to your interlock request. </p>';
	var text2 = '<p>Please follow the link: ';
	
	var linkToAppUrlL4 = basicData.APPURL + '/#TeamPlanHierarchy/Level3/edit/'+interlockObj.HL3_ID+'/'+interlockObj.HL4_ID;
	var idInterlockDescription = interlockObj.INTERLOCK_ID +' - '+interlockObj.DESCRIPTION;
	
	var text3 = linkToAppUrlL4+' and review messages history for	Interlock Request '+idInterlockDescription+'</p>';
	
	mailObj.body = text1 + text2 + text3;
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool -  The Interlock Request has been responded';
	return mailObj;
}