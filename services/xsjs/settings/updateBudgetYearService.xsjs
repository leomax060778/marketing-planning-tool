function handlePost() {
	var output = "";
	try{
		var reqBody = JSON.parse($.request.body.asString());
		
		if (validateParameters(reqBody)){
			return true;
		}
		
		var conn = $.db.getConnection();
		var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::upd_budget_year"(?,?,?,?,?,?,?)';
		
		var start_date = reqBody.START_DATE;
		var end_date = reqBody.END_DATE;
		var default_year = reqBody.DEFAULT_YEAR;
		var description = reqBody.DESCRIPTION;
		var modified_user_id = reqBody.MODIFIED_USER_ID;
		var budget_year = reqBody.BUDGET_YEAR;
		var cst = conn.prepareCall(query);
		cst.setString(1,start_date);
		cst.setString(2,end_date);
		cst.setInt(3,default_year);
		cst.setString(4,description);
		cst.setInt(5,modified_user_id);
		cst.setInt(6,budget_year);
		
		cst.execute();
		conn.close();
		handleResponse({"code": $.net.http.OK, "data": {"results": []}}, $.net.http.OK);
	} catch (e) {
		conn.close();
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
};

function handleResponse(body, code) {
	$.response.contentType = "application/json";
	$.response.status = code;
	$.response.setBody(body);
};

function validateParameters(reqBody) {
	var isValid = true;
	var errors = {};
	if(reqBody.legnth === 0 || $.request.body === undefined ){
		errors = {
				"START_DATE": null,
				"END_DATE": null,
				"DEFAULT_YEAR": null,
				"DESCRIPTION": null,
				"MODIFIED_USER_ID": null,
				"BUDGET_YEAR": null
				};
		handleResponse({"code": $.net.http.BAD_REQUEST, "errors": errors}, $.net.http.BAD_REQUEST);
		isValid = false;
	} else {
		var keys = Object.keys(reqBody);	
		keys.forEach(function(keys){
			if(reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				isValid = false;
			} else {
				isValid = validateType(key, reqBody[key]);
				if(!isValidq){
					errors[key] = 'INVALID';
				}
			}
		});
		
		if(isValid){
			handleResponse({"code": $.net.http.BAD_REQUEST, "errors": errors}, $.net.http.BAD_REQUEST);
		}
	}
	return isValid;
};

function validateType(key, value) {
	var isValidDataType = true;
	switch (key) {
		case 'START_DATE':
		case 'END_DATE':
			isValidDataType = !isNaN((new Date(value)).getDate());
			break;
		case 'DEFAULT_YEAR':
			isValidDataType = value === 1 || value === 0;
			break;
		case 'DESCRIPTION':
			isValidDataType = value.length >= 1 && value.length <= 255;
			break;
		case 'MODIFIED_USER_ID':
			isValidDataType = value === $.session.getUsername();
			break;
	};
	return isValidDataType;
}

switch ($.request.method) {
	case $.net.http.POST:
			handlePost();
	       break;
	default:
		handleResponse({"message": "HTTP method is not supported."}, $.net.http.BAD_REQUEST);
	    break;
};