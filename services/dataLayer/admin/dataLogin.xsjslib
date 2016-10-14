/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var spGetToken = "GET_USER_SESSION_TOKEN_BY_TOKEN";

/** *************************************************** */

function getToken(token) {
	if (token != "") {
		var rdo = db.executeProcedure(spGetToken, {
			'in_token' : token
		});
		return db.extractArray(rdo.out_result);
	}
	return null;
}