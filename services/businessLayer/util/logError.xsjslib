/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dbError = mapper.getDataLogError();
//var businessMail = mapper.getMail();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

function validate(error) {
	if (!error)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertLogError", "ERROR object is not found");

	if (!error.name)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertLogError", "NAME is not found");

	if (!error.message)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertLogError", "MESSAGE is not found");

	if (!error.code)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertLogError", "CODE is not found");

	if (!error.stack)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertLogError", "STACK is not found");

	if (!error.details)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertLogError",
				"DETAILS is not found");

	return true;
}

function log(error, user, modUser) {
	try {
		if (validate(error)) {
			dbError.log(error, user, modUser);
			notifyMail(error);
			return true;
		}
	} catch (e) {
		throw ErrorLib.getErrors().InternalServerError("", e.toString(), "");
	}
}

function getMail(body) {
//	var mail = businessMail.getJson([ {
//		"address" : "lhildt@folderit.net"
//	} ], "OPT - Error Log", body);
//	return mail;
}

function notifyMail(error) {

	var datetime = new Date();

	var body = "An Error Ocurred - date: " + datetime + " - Name: "
			+ error.name + " - Message: " + error.message + " - Code: "
			+ error.code + " - Stack: " + error.stack + " - Details: "
			+ error.details;

	/*var mail = getMail(body);

	businessMail.sendMail(mail);*/
}
