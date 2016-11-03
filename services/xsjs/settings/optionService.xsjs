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
		        	permissions.isAuthorized(userSessionID,
		        			config.getPermissionIdByName(config.ReadPermission()),
		        			config.getResourceIdByName(config.settings()));
		        	handleGet();
		            break;
		        case $.net.http.POST:
		        	permissions.isAuthorized(userSessionID,
		        			config.getPermissionIdByName(config.CreatePermission()),
		        			config.getResourceIdByName(config.settings()));
		        	handlePost(reqBody);
		            break;
		        case $.net.http.PUT:
		        	permissions.isAuthorized(userSessionID,
		        			config.getPermissionIdByName(config.EditPermission()),
		        			config.getResourceIdByName(config.settings()));
		        	handlePut(reqBody);
		            break;
		        case $.net.http.DEL:
		        	permissions.isAuthorized(userSessionID,
		        			config.getPermissionIdByName(config.DeletePermission()),
		        			config.getResourceIdByName(config.settings()));
		        	handleDelete(reqBody);
		            break;
		        default:
		        	handleResponse({"message": "HTTP method is not supported."}, $.net.http.BAD_REQUEST);
			    	break;
		    }	    
		}
	} catch (e) {
		httpUtil.handleErrorResponse(e);	
	}
}

function handleResponse(body, code) {
	$.response.contentType = "application/json";
	$.response.status = code;
	$.response.setBody(JSON.stringify(body));
};

function validateInput(reqBody) {
	var isValid = true;
	var errors = {};
	var keys = Object.keys(reqBody);
	if(keys.legnth === 0 || keys === undefined ){
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
	}
	return isValid;
};

function validateType(key, value) {
	var isValidDataType = true;
	switch (key) {
		case 'CATEGORY_ID':
		case 'OPTION_ID':
		case 'ORDER_OPTION':
			isValidDataType = !isNaN(value);
			break;
		case 'NAME':
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
		var category_id = $.request.parameters.get("CATEGORY_ID");
		
		var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_OPTION_BY_CATEGORY_ID');
		  var result = fnSell(category_id);
  
		  
		  var spResult = result['out_result'];		
			var result = [];
			Object.keys(spResult).forEach(function(key) {
				result.push(spResult[key]);
			});
		  
		  
		  conn.close();
		  handleResponse({"code": $.net.http.OK, "data": {"results": result}}, $.net.http.OK);

		  
	} catch (e) {
		conn.close();
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
}

function handlePost(reqBody) {
	var conn = $.db.getConnection();
	try{
		var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_OPTION"(?,?,?,?,?)';
		var name = reqBody.NAME;
		var category_id = reqBody.CATEGORY_ID;
		var order_option = reqBody.ORDER_OPTION;
		var created_user_id = reqBody.CREATED_USER_ID;
		
		var cst = conn.prepareCall(query);
		cst.setBigInt(1,category_id);
		cst.setString(2,name);
		cst.setInt(3,order_option);
		cst.setBigInt(4,created_user_id);
		
		cst.execute();
		var optionId = cst.getBigInt(5);
		var spResult  = Number(ctypes.Int64(optionId));
		
		if(spResult){
			var in_category_id = category_id;
			var connHdb = $.hdb.getConnection();
			var fnSell = connHdb.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_HL4_CATEGORY_BY_CATEGORY_ID');
		  	var result = fnSell(in_category_id);		  
		  	var spResult = result['out_hl4_category'];		
			var result = [];
			Object.keys(spResult).forEach(function(key) {
				result.push(spResult[key]);
			});
			connHdb.close();
			
			query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_HL4_CATEGORY_OPTION"(?,?,?,?,?)';
			var changeStatusQuery = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::HL4_CHANGE_STATUS"(?,?,?,?)';
			var logChangeStatusQuery = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_HL4_LOG_STATUS"(?,?,?,?)';
			result.forEach(function(hl4Category){
				cst = conn.prepareCall(query);
				cst.setBigInt(1, hl4Category.HL4_CATEGORY_ID);
				cst.setBigInt(2,optionId);
				cst.setString(3,"0");
				cst.setBigInt(4,created_user_id);
				cst.execute();
				
				cst = conn.prepareCall(changeStatusQuery);
				cst.setBigInt(1, hl4Category.HL4_ID);
				cst.setBigInt(2, 1);
				cst.setBigInt(3, created_user_id);
				cst.execute();
				
				cst = conn.prepareCall(logChangeStatusQuery);
				cst.setBigInt(1, hl4Category.HL4_ID);
				cst.setBigInt(2, 1);
				cst.setBigInt(3, created_user_id);
				cst.execute();
			});
		}
		//l4Lib.insertHl4CategoryOption(spResult, created_user_id);
		
		conn.commit();
		conn.close();
		handleResponse({"code": $.net.http.OK, "data": {"results": [{"OPTION_ID": spResult}]}}, $.net.http.OK);
	} catch (e) {
		conn.rollback();
		conn.close();
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
};

function handleDelete(reqBody) {
	var conn = $.db.getConnection();
	try{
		//var reqBody = JSON.parse($.request.body.asString());
		
		
		var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::DEL_OPTION"(?,?,?)';
		
		var option_id = reqBody.OPTION_ID;
		var modified_user_id = reqBody.MODIFIED_USER_ID;
		
		var cst = conn.prepareCall(query);
		
		cst.setBigInt(1,option_id);
		cst.setBigInt(2,modified_user_id);
		
		cst.execute();
		//var spResult = cst.getInteger();
		conn.commit();
		conn.close();
		handleResponse({"code": $.net.http.OK, "data": {"results": []}}, $.net.http.OK);
	} catch (e) {
		conn.rollback();
		conn.close();
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
};

function handlePut(reqBody) {
	var conn = $.db.getConnection();
	try{
		//var reqBody = JSON.parse($.request.body.asString());
		
		var option_id = reqBody.OPTION_ID;
		var name = reqBody.NAME;
		var category_id = reqBody.CATEGORY_ID;
		var order_option = reqBody.ORDER_OPTION;
		var modified_user_id = reqBody.MODIFIED_USER_ID;
		var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::UPD_OPTION"(?,?,?,?,?,?)';
				
		var cst = conn.prepareCall(query);

		cst.setBigInt(1,option_id);
		cst.setBigInt(2,category_id);
		cst.setString(3,name);
		cst.setInt(4,order_option);
		cst.setBigInt(5,modified_user_id);
		cst.execute();
	
		var spResult  = Number(ctypes.Int64(cst.getBigInt(6)));
		conn.commit();
		conn.close();
		handleResponse({"code": $.net.http.OK, "data": {"results": [{"OPTION_ID": spResult}]}}, $.net.http.OK);
	} catch (e) {
		conn.rollback();
		conn.close();
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
};

processRequest();