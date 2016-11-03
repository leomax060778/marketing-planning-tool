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
		if (!reqBody || validateInput(reqBody,$.request.method)){
		    switch ($.request.method) {
		        case $.net.http.GET:
		        	permissions.isAuthorized(userSessionID,
		        			config.getPermissionIdByName(config.ReadPermission()),
		        			config.getResourceIdByName(config.settings()));
		        	handleGet(reqBody);
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
		        	handleResponse({"message": $.request.method + " HTTP method is not supported."}, $.net.http.BAD_REQUEST);
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

function validateInput(reqBody, method) {
	var isValid = true;
	var errors = {};
	
	var keys;
	
	switch (method) {
	    case $.net.http.POST:
	    	keys = ['HIERARCHY_LEVEL_ID',
	    	            'MEASURE_ID',
	    	            'DESCRIPTION',
	    	            'NAME',
	    	            'CREATED_USER_ID'];
	        break;
	    case $.net.http.PUT:
	    	keys = ['CATEGORY_ID',
	       	            'HIERARCHY_LEVEL_ID',
	    	            'MEASURE_ID',
	    	            'DESCRIPTION',
	    	            'NAME',
	    	            'MODIFIED_USER_ID'];
	        break;
	    case $.net.http.DEL:
	    	keys = ['CATEGORY_ID',
    	            'MODIFIED_USER_ID'];
	        break;
	}
	
	
	/*if(keys.legnth === 0 || keys === undefined ){
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
		case 'CATEGORY_ID':
		case 'HIERARCHY_LEVEL_ID':
		case 'MEASURE_ID':
			isValidDataType = !isNaN(value);
			break;
		case 'DESCRIPTION':
			isValidDataType = value.length >= 1 && value.length <= 255;
			break;
		case 'NAME':
			isValidDataType = value.length >= 1 && value.length <= 60;
			break;
		case 'CREATED_USER_ID':
		case 'MODIFIED_USER_ID':
			isValidDataType = true;//value === $.session.getUsername();
			break;
	};
	return isValidDataType;
}

function handleGet(reqBody) {
	var conn = $.hdb.getConnection();
	try{
		var hierarchy_level_id = $.request.parameters.get("HIERARCHY_LEVEL_ID");
				
		  var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_CATEGORY_BY_HIERARCHY_LEVEL_ID');
		  var result = fnSell(hierarchy_level_id);		  
		  
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
		//var reqBody = JSON.parse($.request.body.asString());
		
		var hierarchy_level_id = reqBody.HIERARCHY_LEVEL_ID;
		var measure_id = reqBody.MEASURE_ID;
		var name = reqBody.NAME;
		var description = reqBody.DESCRIPTION;
		var inProcessingReport = reqBody.IN_PROCESSING_REPORT;
		var created_user_id = reqBody.CREATED_USER_ID;
		
		var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY"(?,?,?,?,?,?,?)';

		var cst = conn.prepareCall(query);

		cst.setString(1,description);
		cst.setString(2,name);
		cst.setBigInt(3,hierarchy_level_id);
		cst.setBigInt(4,measure_id);
		cst.setInteger(5,inProcessingReport);
		cst.setBigInt(6,created_user_id);

		cst.execute();
		var categoryId = cst.getBigInt(7);
		var spResult  = Number(ctypes.Int64(categoryId));
		
		if(spResult){
			var connHdb = $.hdb.getConnection();
			var fnSell = connHdb.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_ALL_HL4');
		  	var result = fnSell();		  
		  	var spResult = result['out_hl4'];		
			var result = [];
			Object.keys(spResult).forEach(function(key) {
				result.push(spResult[key]);
			});
			connHdb.close();
			
			query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_HL4_CATEGORY"(?,?,?,?)';
			result.forEach(function(hl4){
				cst = conn.prepareCall(query);
				cst.setBigInt(1, hl4.HL4_ID);
				cst.setBigInt(2,categoryId);
				cst.setInteger(3,inProcessingReport);
				cst.setBigInt(4,created_user_id);
				cst.execute();
			});
			//l4Lib.insertHl4Category(spResult,created_user_id);
		}
		
		conn.commit();
		conn.close();
		handleResponse({"code": $.net.http.OK, "data": {"results": [{"CATEGORY_ID": spResult}]}}, $.net.http.OK);
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
		var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::DEL_CATEGORY"(?,?,?)';

		var category_id = reqBody.CATEGORY_ID;
		var modified_user_id = reqBody.MODIFIED_USER_ID;

		var cst = conn.prepareCall(query);

		cst.setBigInt(1,category_id);
		cst.setBigInt(2,modified_user_id);

		cst.execute();
		//var spResult  = Number(ctypes.Int64(cst.getBigInt(3)));
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
		var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::UPD_CATEGORY"(?,?,?,?,?,?,?,?)';

		var hierarchy_level_id = reqBody.HIERARCHY_LEVEL_ID;
		var category_id = reqBody.CATEGORY_ID;
		var measure_id = reqBody.MEASURE_ID;
		var name = reqBody.NAME;
		var description = reqBody.DESCRIPTION;
		var modified_user_id = reqBody.MODIFIED_USER_ID;
		var inProcessingReport = reqBody.IN_PROCESSING_REPORT;

		var cst = conn.prepareCall(query);

		cst.setBigInt(1,category_id);
		cst.setString(2,description);
		cst.setString(3,name);
		cst.setBigInt(4,hierarchy_level_id);
		cst.setBigInt(5,measure_id);
		cst.setInteger(6,inProcessingReport);
		cst.setBigInt(7,modified_user_id);

		cst.execute();
		
		var spResult  = Number(ctypes.Int64(cst.getBigInt(8)));
		//if(spResult){			
			query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::UPD_HL4_CATEGORY"(?,?,?,?)';
			cst = conn.prepareCall(query);
			cst.setBigInt(1,category_id);
			cst.setInteger(2,inProcessingReport);
			cst.setBigInt(3,modified_user_id);
			cst.execute();
		//}
		conn.commit();
		conn.close();
		handleResponse({"code": $.net.http.OK, "data": {"results": [{"CATEGORY_ID": spResult}]}}, $.net.http.OK);
	} catch (e) {
		conn.rollback();
		conn.close();
	    handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
};

processRequest();
