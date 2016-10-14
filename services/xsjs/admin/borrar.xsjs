//**** Example for basic REQUEST RESPONSE handling
var paramName; var paramValue; var headerName; var headerValue; var contentType;
//Implementation of GET call
function handleGet() {
	// Retrieve data here and return results in JSON/other format 
	$.response.status = $.net.http.OK;
	 return {"myResult":" GET success"};
}
//Implementation of POST call
function handlePost() {
	var bodyStr = $.request.body ? $.request.body.asString() : undefined;
	if ( bodyStr === undefined ){
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 return {"myResult":"Missing BODY"};
	}
	// Extract body insert data to DB and return results in JSON/other format
	$.response.status = $.net.http.CREATED;
    return {"myResult":"POST success"};
}
// Check Content type headers and parameters
function validateInput() {
	var i; var j;
	// Check content-type is application/json
	contentType = $.request.contentType;
	if ( contentType === null || contentType.startsWith("application/json") === false){
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 $.response.setBody("Wrong content type request use application/json");
		return false;
	}
	// Extract parameters and process them 
	for (i = 0; i < $.request.parameters.length; ++i) {
	    paramName = $.request.parameters[i].name;
	    paramValue = $.request.parameters[i].value;
//      Add logic	    
	}
	// Extract headers and process them 
	for (j = 0; j < $.request.headers.length; ++j) {
	    headerName = $.request.headers[j].name;
	    headerValue = $.request.headers[j].value;
//      Add logic	    
	 }
	return true;
}
// Request process 
function processRequest(){
	if (validateInput()){
		try {
		    switch ( $.request.method ) {
		        //Handle your GET calls here
		        case $.net.http.GET:
		            //$.response.setBody(JSON.stringify(handleGet()));
		        	//ObtenerDatos();
		        	//getOriginParent2();
		        	//insertarEuroConversion();
		        	//insertarEuroConversion();
		        	//insertarCRM();
		        	//insertarHL3();
		        	getAllPlan();
		            break;
		            //Handle your POST calls here
		        case $.net.http.POST:
		            $.response.setBody(JSON.stringify(handlePost()));
		            break; 
		        case $.net.http.PUT:
		            
		            handlePut();
		            break; 
		        //Handle your other methods: PUT, DELETE
		        default:
		            $.response.status = $.net.http.METHOD_NOT_ALLOWED;
		            $.response.setBody("Wrong request method");		        
		            break;
		    }
		    $.response.contentType = "application/json";	    
		} catch (e) {
		    $.response.setBody("Failed to execute action: " + e.toString());
		}
	}
}


function handlePut()
{
	var retorno;
	var returnVal;
	var conn="";
	try {
		conn = $.db.getConnection();
		var query = 'CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_EURO_CONVERSION"( ?, ?, ?, ?, ?, ?)';
		var cst = conn.prepareCall(query);
		cst.setString(1, 'PANAMÁ');
		cst.setString(2, 'PEP');
		cst.setString(3, 'PEP');
		cst.setDecimal(4, 99.99);
		cst.setBigInt(5, 1);
		cst.setBigInt(6, 0);
		
		var resultExecute = cst.execute();
		
		//resultExecute.next() ;
		var result = resultExecute.getInteger(1);
		conn.commit();
		handleResponse({"code": $.net.http.OK, "data": {"results":  resultExecute}}, $.net.http.OK);

		
		
		handleResponse({"code": $.net.http.OK, "data": {"results": retorno}}, $.net.http.OK);
	} catch (e) {
		//retorno = -1;
		handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	} finally {
		if (!conn.isClosed())
			conn.close();
	}
	return retorno;	
}

function ObtenerDatos(){
	try{
		var conn = $.hdb.getConnection();
		var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_ORIGIN_PARENT');
		var result = fnSell(1);
		var list= result['out_result'];
		var spResult = 0;
		for(var i = 0; i < list.length; i++){  
			spResult= spResult +  list[i];
		}  
		handleResponse({"code": $.net.http.OK, "data": {"results":  result[0]}}, $.net.http.OK);
	}
	catch(e){
		handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
}

function getOriginParent2(){
	var conn = "";
	try{
		conn = $.db.getConnection();
		//GET_ORIGIN_GLOBE
		var queryGetOriginParent = 'CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::GET_ORIGIN_PARENT"(?,?)';
		var comandOriginParent = conn.prepareCall(queryGetOriginParent);
		//comandOriginParent.setBigInt(1, originPlanId);
		comandOriginParent.setBigInt(1, 99);
		comandOriginParent.execute();
		var originParent  = Number(ctypes.Int64(comandOriginParent.getBigInt(1)));
		conn.commit();
		//return originParent;
		handleResponse({"code": $.net.http.OK, "data": {"results":  originParent }}, $.net.http.OK);
	}
	catch(e){
		//throw e;
		handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
	finally{
		conn.close();
	}	
}

function insertarEuroConversion(){
	var conn = "";
	
	try{
		conn = $.hdb.getConnection();
		//var insert = 'CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CRM"(?,?,?,?,?,?,?,?)';
		var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::INS_EURO_CONVERSION');
		//in_country, in_currency_abbreviation, in_currency_name, in_currency_value_admin, in_user_id, out out_euro_conversion_id
		var result = fnSell('PAKA', 'PKA', 'PKA', 3.45, 1);
		//var originParent  = Number(ctypes.Int64(comandOriginParent.getBigInt(1)));
		var value = Number(ctypes.Int64(result['out_euro_conversion_id']));
		conn.commit();
		//return originParent;
		handleResponse({"code": $.net.http.OK, "data": {"results":  value }}, $.net.http.OK);
	}
	catch(e){
		//throw e;
		conn.rollback();
		handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
	finally{
		conn.close();
	}
}

function insertarEuroConversion(){
	var conn = "";
	
	try{
		conn = $.hdb.getConnection();
		//var insert = 'CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CRM"(?,?,?,?,?,?,?,?)';
		var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::INS_LOG_ERROR');
		//in_country, in_currency_abbreviation, in_currency_name, in_currency_value_admin, in_user_id, out out_euro_conversion_id
		var parameters = {};
		parameters.IN_NAME_ERROR = "hola";
		parameters.IN_MESSAGE="hola";
		parameters.in_stack="hola";
		parameters.in_details="hola";
		parameters.in_user_id =1;
		parameters.in_modified_user_id=1;
		parameters.out_error_id='?';
		//var arr =[];// ['hola','hola','hola','hola',1,1,0];
		//arr.push(parameters);
		var result = fnSell(parameters);
		
		//var result = fnSell('hola','hola','hola','hola',1,1,0);
		//var originParent  = Number(ctypes.Int64(comandOriginParent.getBigInt(1)));
		var value = Number(ctypes.Int64(result['out_error_id']));
		conn.commit();
		//return originParent;
		handleResponse({"code": $.net.http.OK, "data": {"results":  value }}, $.net.http.OK);
	}
	catch(e){
		//throw e;
		conn.rollback();
		handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
	finally{
		conn.close();
	}
}

function insertarCRM(){
	var conn = "";
	
	try{
		conn = $.hdb.getConnection();
		//var insert = 'CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CRM"(?,?,?,?,?,?,?,?)';
		var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::INS_CRM');
		var result = fnSell(1,'FMR', 'FRM DESC', 0, 1);
		var value = Number(ctypes.Int64(result['out_crm_id']));
		conn.commit();
		//return originParent;
		handleResponse({"code": $.net.http.OK, "data": {"results":  value }}, $.net.http.OK);
	}
	catch(e){
		//throw e;
		conn.rollback();
		handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
	finally{
		conn.close();
	}
}

function insertarHL3(){
	var conn = "";
	
	try{
		conn = $.hdb.getConnection();
		//var insert = 'CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CRM"(?,?,?,?,?,?,?,?)';
		var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::INS_HL3');
		var result = fnSell('FMR', 1,'HL3', 3,1, 14.5, 1);
		var value = Number(ctypes.Int64(result['out_hl3_id']));
		conn.commit();
		//return originParent;
		handleResponse({"code": $.net.http.OK, "data": {"results":  value }}, $.net.http.OK);
	}
	catch(e){
		//throw e;
		conn.rollback();
		handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
	finally{
		conn.close();
	}
}

function getAllPlan(){
	var conn = "";
	
	try{
		conn = $.hdb.getConnection();
		//var insert = 'CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CRM"(?,?,?,?,?,?,?,?)';
		var fnSell = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_ALL_PLAN');
		var result = fnSell({});
		var list = result['out_result'];
		var spResult = [];
		Object.keys(list).forEach(function(key) {
			spResult.push(list[key]);
		});
		handleResponse({"code": $.net.http.OK, "data": {"results":  spResult }}, $.net.http.OK);
	}
	catch(e){
		//throw e;
		//conn.rollback();
		handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
	}
	finally{
		conn.close();
	}
}


//handle response to request
function handleResponse(body, code) {
	$.response.contentType = "application/json";
	$.response.status = code;
	$.response.setBody(JSON.stringify(body));
}


// Call request processing  
processRequest();