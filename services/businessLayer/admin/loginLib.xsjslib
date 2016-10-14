/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dbLoging = mapper.getDataLogin();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var userLib = mapper.getUser();
/** ********************************************** */

function validateUser(userToken) {
	// get Token and user session from DB
	var result = dbLoging.getToken(userToken);

	if (result != null && result.length > 0) {
		// get current token date
		var tokentz = result[0].TOKEN_VALID_UNTIL_DATE_TZ;

		// get current user
		var userSession = result[0].USER_ID;

		// compare current token with current date

		if (new Date(tokentz) >= new Date())
			return userSession;
	}
	// if token is expired return null;
	return null;
}

function getNewToken(){
	return dbLoging.getNewToken();
}

function recoveryPassword(user,password, userId){
	if(userLib.validatePassword(password)){
		var token = getNewToken();
		dbLoging.saveRecovery(user, password, token, userId);
		return token;
	}
}