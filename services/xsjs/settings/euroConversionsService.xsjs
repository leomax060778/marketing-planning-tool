/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var l4Lib = mapper.getLevel4();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var permissions = mapper.getPermission();
/******************************************/

function handlePost() {
	var reqBody = JSON.parse($.request.body.asString());
	var output = "";
	var conn = "";
	try {	
		// validate input parameters
		conn = $.db.getConnection();
		if (validateInput()) {
			var queryInsert = 'CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_EURO_CONVERSION"(?,?,?,?,?,?)';
			var queryUpdate = 'CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::UPD_EURO_CONVERSION"(?,?,?,?,?,?)';
			
			conn.setAutoCommit(0);
			var regNumbers = reqBody.currencyList.length;
			var cst;
			var j = 0;
			for (var i = 0; i < regNumbers; i++) {
				var returnVal = 0;
				var exists = existsEuroConversion(0,
						reqBody.currencyList[i].CURRENCY_ABBREVIATION);
				if (!exists) {
					cst = conn.prepareCall(queryInsert);
				} else {
					cst = conn.prepareCall(queryUpdate);
				}
				cst.setString(1, reqBody.currencyList[i].COUNTRY);
				cst.setString(2, reqBody.currencyList[i].CURRENCY_ABBREVIATION);
				cst.setString(3, reqBody.currencyList[i].CURRENCY_ABBREVIATION); //CURRENCY_NAME idem to CURRENCY_ABBREVIATION
				cst.setDecimal(4, reqBody.currencyList[i].CURRENCY_VALUE);
				cst.setBigInt(5, reqBody.currencyList[i].CREATED_USER_ID);
				cst.setBigInt(6, returnVal);
				cst.execute();
			}
			
			// all it´s ok
			conn.commit();
			handleResponse({
				"code" : $.net.http.OK,
				"data" : {
					"results" : []
				}
			}, $.net.http.OK);
		}
	} catch (e) {
		// rollback all statements
		conn.rollback();
		handleResponse({
			"code" : $.net.http.INTERNAL_SERVER_ERROR,
			"errors" : {
				"INTERNAL_SERVER_ERROR" : e.toString()
			}
		}, $.net.http.INTERNAL_SERVER_ERROR);
	} finally {
		if (!conn.isClosed())
			conn.close();
	}
}

//main function
function processRequest(Notvalidate) {
	try {
		var userSessionID = null;		
		if(!Notvalidate){
			userSessionID = httpUtil.validateUser(httpUtil.getHeaderByName("x-csrf-token"));	
			if(!userSessionID)
				throw ErrorLib.getErrors().Unauthorized(httpUtil.getHeaderByName("x-csrf-token"));		
			
		}
		
		switch ($.request.method) {
		case $.net.http.GET:
			permissions.isAuthorized(userSessionID,
        			config.getPermissionIdByName(config.ReadPermission()),
        			config.getResourceIdByName(config.settings()));
			handleGet();			
			break;
		case $.net.http.POST:
			permissions.isAuthorized(userSessionID,
        			config.getPermissionIdByName(config.CreatePermission()),
        			config.getResourceIdByName(config.settings()));
			handlePost();
			break;
		case $.net.http.PUT:
			permissions.isAuthorized(userSessionID,
        			config.getPermissionIdByName(config.EditPermission()),
        			config.getResourceIdByName(config.settings()));
			handlePut();
			break;
		case $.net.http.DELETE:
			permissions.isAuthorized(userSessionID,
        			config.getPermissionIdByName(config.DeletePermission()),
        			config.getResourceIdByName(config.settings()));
			handleDelte();
			break;
		default:
			handleResponse({
				"message" : "HTTP method is not supported."
			}, $.net.http.BAD_REQUEST);
			break;
		}
	} catch (e) {
		httpUtil.handleErrorResponse(e);	
	}
}

// validate if exists a object EuroConversions
function existsEuroConversion(id, abbr) {
	var retorno;
	var conn="";
	try {
		conn = $.db.getConnection();
		var query = 'CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::GET_EURO_CONVERSION"( ?, ?, ?)';
		var cst = conn.prepareCall(query);
		cst.setBigInt(1, id);
		cst.setString(2, abbr);
		cst.execute();
		var result = cst.getResultSet();
		if (result.next() > 0)
			retorno = true;
		else
			retorno = false;
	} catch (e) {
		throw e;
	} finally {
		if (!conn.isClosed())
			conn.close();
	}
	return retorno;
}

// validate request parameters
function validateInput() {	
	var errors = {};
	var isValid = false;
	
	/*
	// Check content-type is application/json
	var contentType = $.request.contentType;
	if ( contentType === null || contentType.startsWith("application/json") === false){
		 errors = {"body": "Wrong content type request use application/json"};
		 handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors": errors}
		 	, $.net.http.INTERNAL_SERVER_ERROR);
		return isValid;
	}
	*/
	
	// Check body has an currencyList
	var reqBody = $.request.body ? JSON.parse($.request.body.asString()) : undefined;
	if (reqBody === undefined || reqBody.currencyList.legnth === 0){
		errors = {
			"CURRENCY_ABBREVIATION" : null,
			"COUNTRY" : null,
			"CURRENCY_VALUE" : null,
			"CREATED_USER_ID" : null
		};
		handleResponse({"code" : $.net.http.BAD_REQUEST, "errors" : errors }, $.net.http.BAD_REQUEST)
		return isValid;
	}else{
		//to force break loop
		var BreakException = {};
		//Check each object of array
		for (var i = 0; i < reqBody.currencyList.length; i++) {
			// obtain current object
			var node = reqBody.currencyList[i];
			try
			{
				Object.keys(node).forEach(function(key) {
					if (node[key] === null || node[key] === undefined) {
						errors[key] = null;
						throw BreakException;
					} else {
						// validate attribute type
						isValid = validateType(key, node[key])
						if (!isValid) {
							isValid = false;
							errors[key] = node[key];//'INVALID';
							throw BreakException;
						}
					}
				});
			}
			catch(e){
				if (e!==BreakException) 
					handleResponse({"code" : $.net.http.INTERNAL_SERVER_ERROR, "errors" : {"Exception": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR)
				else
					handleResponse({"code" : $.net.http.BAD_REQUEST, "errors" : errors }, $.net.http.BAD_REQUEST)
				
				return isValid;
			}
		}
		isValid = true;
	}
	return isValid;
};

//Check data types
function validateType(key, value) {
	var regex = /^(0|([1-9]\d{0,8}))(\.\d{1,10})?$/;
	var valid = true;
	switch (key) {
	case 'CURRENCY_ABBREVIATION':
		valid = value.length > 0 && value.length <= 3;
		break;
	case 'CREATED_USER_ID':
		valid = true;
		break;
	case 'CURRENCY_VALUE':
		valid = regex.test(value) && value > 0;
		break;
	}
	return valid;
}

//handle response to request
function handleResponse(body, code) {
	$.response.contentType = "application/json";
	$.response.status = code;
	$.response.setBody(JSON.stringify(body));
}

//delete function, no implemented
function handleDelete() {
	handleResponse({
		"message" : "HTTP method is not supported."
	}, $.net.http.BAD_REQUEST);
}

//get function
function handleGet() {
	var output = "";
	try{	
		var conn = $.hdb.getConnection();
		var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_ALL_EURO_CONVERSION');
		var result = fnSell();
		//get de output parameter as represet a dataset
		var list = result['out_result'];		
		var spResult = [];
		Object.keys(list).forEach(function(key) {
			spResult.push(list[key]);
		});
		handleResponse({"code": $.net.http.OK, "data": {"results": spResult}}, $.net.http.OK);
		
	} catch (e) {
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
	finally{
		conn.close();
	}
}

//get function, no implemented
function handlePut() {
	handleResponse({
		"message" : "HTTP method is not supported."
	}, $.net.http.BAD_REQUEST);
}
//main function
processRequest();