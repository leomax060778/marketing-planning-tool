function parseNotifyPasswordRecovery(userObj, basicData, userName){
	var mailObj = {};
	
	mailObj.body = ' <p> Dear '+userName+' </p>  <p>Here is your username and token for your Marketing Planning Tool password recovery</p>  <p>Username: <span>'+userObj.USERNAME+'</span></p>  <p>Token: <span>'+userObj.TOKEN+'</span></p>  <p>To accept your new Password for Marketing Planning Tool, visit the homepage ('+basicData.APP_URL+') and enter your token in the login area.</p>';
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Password recovery';
	
	return mailObj;	
}

function parseNotifyCreateUser(userObj, basicData, userName){
	var mailObj = {};
	
	mailObj.body = ' <p> Dear '+userName+' </p>  <p>You have been granted user rights to the Marketing Planning Tool. Your login information is as follows:</p>  <p>User ID: <span>' + userObj.USERNAME + '</span></p>  <p>Password: <span>' + userObj.PASSWORD + '</span></p> <p>You may change your password after you logon to the Marketing Plan Tool. To logon to the Marketing Planning Tool use the following link ' + basicData.APP_URL + '.</p> <p>If you have any questions please contact the Site Administrator ' + basicData.SITE_ADMIN_ACCOUNT + '.</p> <p> Thank you</p>';
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Account Created';
	
	return mailObj;	
}