/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

var INSERT = "INS_LOG_ERROR";

function log(error, user, modUser){		
		var parameters = {};
		parameters.IN_NAME_ERROR = error.name;
		parameters.IN_MESSAGE=error.message;
		parameters.in_stack=error.stack;
		parameters.in_details=error.details;
		parameters.in_user_id =user;
		parameters.in_modified_user_id=modUser;
		//parameters.out_error_id='?';		                	 
	
		var rdo = db.executeScalar(INSERT,parameters,"out_error_id");			
		
		return rdo;
}