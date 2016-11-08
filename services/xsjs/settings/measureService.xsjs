/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var l4Lib = mapper.getLevel4();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var permissions = mapper.getPermission();
/******************************************/

function processRequest(Notvalidate){
	try {
		var userSessionID = null;		
		if(!Notvalidate){
			userSessionID = httpUtil.validateUser(httpUtil.getHeaderByName("x-csrf-token"));	
			if(!userSessionID)
				throw ErrorLib.getErrors().Unauthorized(httpUtil.getHeaderByName("x-csrf-token"));		
			
		}
		var reqBody = $.request.body ? JSON.parse($.request.body.asString()) : undefined;
		if (!reqBody || validateInput(reqBody)){
		    switch ($.request.method ) {
		        case $.net.http.GET:
//		        	permissions.isAuthorized(userSessionID,
//		        			config.getPermissionIdByName(config.ReadPermission()),
//		        			config.getResourceIdByName(config.settings()));
		        	handleGet();
		            break;
		        
		        /*case $.net.http.POST:
		        	handlePost(reqBody);
		            break;
		        case $.net.http.PUT:
		        	handlePut(reqBody);
		            break;
		        case $.net.http.DELETE:
		        	handleDelte(reqBody);
		            break;*/
		            
		        default:
		        	handleResponse({"message": "HTTP method is not supported."}, $.net.http.BAD_REQUEST);
			    	break;
		    }	    
		}
	} catch (e) {
		handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
}

function handleResponse(body, code) {
	$.response.contentType = "application/json";
	//$.response.contentType = "plain/text";
	$.response.status = code;
	$.response.setBody(JSON.stringify(body));
};

function validateInput(reqBody) {
	var isValid = true;
	/*var errors = {};
	var keys = Object.keys(reqBody);
	if(keys === undefined || keys.legnth === 0 ){
		erros = {"body": null};
		handleResponse({"code": $.net.http.BAD_REQUEST, "errors": errors}, $.net.http.BAD_REQUEST);
		isValid = false;
	} else {
		keys.forEach(function(key){
			if(reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				isValid = false;
			} else {
				isValid = isValid && validateType(key, reqBody[key]);
				if(!validateType(key, reqBody[key])){
					errors[key] = 'INVALID';
				}
			}
		});
		if(!isValid){
			handleResponse({"code": $.net.http.BAD_REQUEST, "errors": errors}, $.net.http.BAD_REQUEST);
		}
	}*/
	return isValid;
};

/*function validateType(key, value) {
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
}*/

function handleGet() {
	var conn = $.hdb.getConnection();
	try{
		
		var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_ALL_MEASURE');
		  var result = fnSell();
		  var result = result['out_result'];
		  conn.close();
		  handleResponse({"code": $.net.http.OK, "data": {"results": result}}, $.net.http.OK);
		//var reqBody = JSON.parse($.request.body.asString());
		
		/*var conn = $.db.getConnection();
		var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::GET_ALL_MEASURE"(?)';
		
		var cst = conn.prepareCall(query);
		
		cst.execute();
		var spResultSet = cst.getResultSet();*/
		
		//var spResult = spResultSet["spOutPut"];
		
		var spResult = [
						{"MEASURE_ID": 1, "SYMBOL": 'EUR'},
						{"MEASURE_ID": 2, "SYMBOL": '#'},
						{"MEASURE_ID": 3, "SYMBOL": '%'}
		              ];
		
		/*
		 * TODO: parse SP outPut result.
		 */
		
		//conn.close();
		handleResponse({"code": $.net.http.OK, "data": {"results": spResult}}, $.net.http.OK);
	} catch (e) {
		conn.close();
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
}

/*function handlePut(reqBody) {
	var output = "";
	try{
		//var reqBody = JSON.parse($.request.body.asString());
		
		var conn = $.db.getConnection();
		var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::UPD_BUDGET_YEAR"(?,?,?,?,?,?,?)';
		
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
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
};*/

processRequest();