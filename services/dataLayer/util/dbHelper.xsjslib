$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var errors = mapper.getErrors();

/************************ CONSTANTS ***********************************/
var DB_NAME = "PLANNING_TOOL";
var DB_SP_PATH = "xsplanningtool.db.procedures::";
var DB_CONNECTION =  null;
var HDB_CONNECTION = null;


/************************ METHODS ***********************************/

function extractArray(list){
	var spResult = [];
	if(list){		
		 Object.keys(list).forEach(function(key) {
		  spResult.push(list[key]);
		 });		 
	}
	
	return spResult;
}

/*
 * spName = "mySP"
 * parameters = [{param1: valueparam1, ... , paramN: valueparamN}, ... , {param1: valueparam1, ... , paramN: valueparamN}]
 * 
 * return --> $.hdb.ResultSet
 * */
function executeProcedure(spName, parameters){
	setConnection();
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{				
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);
		HDB_CONNECTION.commit();
	}
	catch(e){
		HDB_CONNECTION.rollback();
		validateErrorCode(e, spName);
		throw errors.getErrors().DBError("Internal Server Error - SQL ",spName + e.toString(),"Unexpected Error.");
	}
	finally{
		if (!HDB_CONNECTION.isClosed())
			HDB_CONNECTION.close();
	}
	
	return result;
}

function executeProcedureManual(spName, parameters){
	setConnection();
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{				
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);
	}
	catch(e){	
		validateErrorCode(e, spName);
		throw errors.getErrors().DBError("Internal Server Error - SQL ",spName + e.toString(),"Unexpected Error.");
	}
	return result;
}


/*
 * Execute the procedure and return a scalar by name of output parameter
 * out_result: is the name of the output parameter
 * */
function executeScalar(spName, parameters, out_result){
	setConnection();
	var value = undefined;
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{				
		
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);	
		 value = Number(ctypes.Int64(result[out_result]));
		HDB_CONNECTION.commit();
	}
	catch(e){
		HDB_CONNECTION.rollback();
		validateErrorCode(e, spName);
		throw errors.getErrors().DBError("Internal Server Error - SQL ",spName + e.toString(),"Unexpected Error.");
}
	finally{
		
		if (!HDB_CONNECTION.isClosed())
			HDB_CONNECTION.close();
	}
	
	return value;
}

function executeDecimalManual(spName, parameters, out_result){
	setConnection();
	var value = undefined;
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{				
		
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);	
		 value = Number(result[out_result]);		
	}
	catch(e){
		validateErrorCode(e, spName);
		throw errors.getErrors().DBError("Internal Server Error - SQL ",spName + e.toString(),"Unexpected Error.");
    }
		
	return value;
}

function executeScalarManual(spName, parameters, out_result){
	setConnection();
	var value = undefined;
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{				
		
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);	
		 value = Number(ctypes.Int64(result[out_result]));		
	}
	catch(e){
		validateErrorCode(e, spName);
		throw errors.getErrors().DBError("Internal Server Error - SQL ",spName + e.toString(),"Unexpected Error.");
    }
		
	return value;
}

function executeQuery(query){
	setConnection();
	var value = undefined;

	try{

		var rs = HDB_CONNECTION.executeQuery(query);

		if(rs.length > 0){

			return rs;

		}
	}
	catch(e){
		//validateErrorCode(e, spName);
		throw errors.getErrors().DBError("Internal Server Error - SQL ",query +"++++"+ e.toString(),"Unexpected Error.");
	}

	return value;
}

function getDBName(){
	return DB_NAME;
}

function setConnection() {
	if (HDB_CONNECTION == null || HDB_CONNECTION.isClosed()) {
		HDB_CONNECTION = $.hdb.getConnection();
	} else if (DB_CONNECTION == null || DB_CONNECTION.isClosed()) {
		DB_CONNECTION =  $.db.getConnection();
	}	
}

function commit(){
	if (HDB_CONNECTION != null && !HDB_CONNECTION.isClosed())
		HDB_CONNECTION.commit();

}

function rollback(){
	if (HDB_CONNECTION != null && !HDB_CONNECTION.isClosed())
		HDB_CONNECTION.rollback();
}

function closeConnection(){
	if (HDB_CONNECTION != null && !HDB_CONNECTION.isClosed())
		HDB_CONNECTION.close();
}

function validateErrorCode(error, spName){
	var str = error.toString();
	var regexCode = /server error code: 274/;
	var regexCol = /Failed in "([^"]*)/;
	var column = str.match(regexCol);
	if(column){
		if(column.length > 1){
			column = column[1].replace("_"," ");
		}

		if(regexCode.test(str)) /*server error code: 274. inserted value too large for column */
		{
			throw errors.getErrors().CustomError("",spName +" "+error.toString(),"The "+column+" value is too long.");
		}
	}

}

