function processRequest(){
	try {
		var reqBody = $.request.body ? JSON.parse($.request.body.asString()) : undefined;
		if (!reqBody || validateInput(reqBody, $.request.method)){
		    switch ($.request.method ) {
		        case $.net.http.GET:
		        	handleGet();
		            break;
		        case $.net.http.PUT:
		        	handlePut(reqBody);
		            break;
	            /*case $.net.http.POST:
		        	handlePost(reqBody);
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

function validateInput(reqBody,method) {
	var isValid = true;
	var errors = {};
	var keys;
	
	switch (method) {
	    case $.net.http.PUT:
	    	keys = ['START_DATE',
	    	        'END_DATE',
	    	        'DEFAULT_YEAR',
	    	        'DESCRIPTION',
	    	        'MODIFIED_USER_ID',
	    	        'BUDGET_YEAR'];
	        break;
	}
	/*if(keys === undefined || keys.legnth === 0 ){
		erros = {"body": null};
		handleResponse({"code": $.net.http.BAD_REQUEST, "errors": errors}, $.net.http.BAD_REQUEST);
		isValid = false;
	} else {*/
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
	//}
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
		case 'CREATED_USER_ID':
		case 'MODIFIED_USER_ID':
			isValidDataType = true;//value === $.session.getUsername();
			break;
	};
	return isValidDataType;
}

function handleGet() {
	var conn = $.hdb.getConnection();
	try{
		var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_ALL_BUDGET_YEAR');
		  var result = fnSell();
		  var spResult = result['out_result'];		
			var result = [];
			Object.keys(spResult).forEach(function(key) {
				result.push(spResult[key]);
			});
		  
		  
		  conn.close();
		  handleResponse({"code": $.net.http.OK, "data": {"results": result}}, $.net.http.OK);
		//var reqBody = JSON.parse($.request.body.asString());
		/*var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::GET_ALL_BUDGET_YEAR"(?)';
		
		var cst = conn.prepareCall(query);
		
		cst.execute();
		var spResultSet = cst.getResultSet();
		
		var spResult = [];
		
		while(spResultSet.next()) {
		    spResult.push({
		        "BUDGET_YEAR_ID": spResultSet.getInteger(1),
		        "BUDGET_YEAR": spResultSet.getInteger(2),
		        "DEFAULT_YEAR": spResultSet.getInteger(3),
		        "START_DATE": spResultSet.getTimestamp(4),
		        "END_DATE": spResultSet.getTimestamp(5),
		        "DESCRIPTION": spResultSet.getString(6)
		    });
		}
		
		conn.close();
		handleResponse({"code": $.net.http.OK, "data": {"results": spResult}}, $.net.http.OK);*/
	} catch (e) {
		conn.close();
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
}

function handlePut(reqBody) {
	var conn = $.db.getConnection();
	try{
		//var reqBody = JSON.parse($.request.body.asString());
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
		cst.setBigInt(5,modified_user_id);
		cst.setInt(6,budget_year);
		
		cst.execute();
		conn.commit();
		conn.close();
		handleResponse({"code": $.net.http.OK, "data": {"results": []}}, $.net.http.OK);
	} catch (e) {
		conn.rollback();
		conn.close();
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
};

processRequest();