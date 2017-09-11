$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var errors = mapper.getErrors();
var tracer = mapper.getTracer();

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


///deprecated 05.04.2017
function executeProcedure(spName, parameters, ignoreTrace){
	return executeProcedureManual(spName, parameters, ignoreTrace);	
}

function executeProcedureManual(spName, parameters, ignoreTrace){
	setConnection();

	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{

        if (!ignoreTrace) {
           tracer.trace('dbHelper', 'executeProcedureManual', {SP: spName}, 0, 'DB_ENTER');
        }
        var fn = HDB_CONNECTION.loadProcedure(DB_NAME, spPath);
        result = fn(parameters);

    }
    catch (e) {
        validateErrorCode(e, spName);
		throw errors.getErrors().DBError("Internal Server Error - SQL ",spName + e.toString() + '\n' +  e.stack,"Unexpected Error.");
	}
	finally{
		if (!ignoreTrace) {

			tracer.trace('dbHelper', 'executeProcedureManual', {SP: spName}, 0, 'DB_LEAVE');
        }
	}

	return result;
}


/*
 * Execute the procedure and return a scalar by name of output parameter
 * out_result: is the name of the output parameter
 *
 * deprecated 05-17-2017
 * */
function executeScalar(spName, parameters, out_result){
	return executeScalarManual(spName, parameters, out_result);
}

function executeDecimalManual(spName, parameters, out_result){
	setConnection();

	var value = undefined;
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{
		tracer.trace('dbHelper','executeDecimalManual',{SP:spName},0,'DB_ENTER');
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);
		 value = Number(result[out_result]);
	}
	catch(e){
		validateErrorCode(e, spName);
		throw errors.getErrors().DBError("Internal Server Error - SQL ",spName + e.toString()+ e.stack,"Unexpected Error.");
    }
	finally{
		tracer.trace('dbHelper','executeDecimalManual',{SP:spName},0,'DB_LEAVE');
	}

	return value;
}

function executeScalarManual(spName, parameters, out_result){
	setConnection();

	var value = undefined;
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{
		tracer.trace('dbHelper','executeScalarManual',{SP:spName},0,'DB_ENTER');
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);
		 value = Number(ctypes.Int64(result[out_result]));
	}
	catch(e){
		validateErrorCode(e, spName);
		throw errors.getErrors().DBError("Internal Server Error - SQL ",spName + e.toString()+ e.stack,"Unexpected Error.");
    }
	finally{

		tracer.trace('dbHelper','executeScalarManual',{SP:spName},0,'DB_LEAVE');
	}

	return value;
}

function executeQuery(query){
	setConnection();
	var value = undefined;

	try{
		tracer.trace('dbHelper','executeQuery',{Query:query},0,'DB_ENTER');
		var rs = HDB_CONNECTION.executeQuery(query);

		if(rs.length > 0){

			return rs;

		}
	}
	catch(e){
		//validateErrorCode(e, spName);
		throw errors.getErrors().DBError("Internal Server Error - SQL ",query +"++++"+ e.toString()+ e.stack,"Unexpected Error.");
	}
	finally{

		tracer.trace('dbHelper','executeQuery',{query :query},0,'DB_LEAVE');
	}

	return value;
}

function getDBName(){
	return DB_NAME;
}

function getHDBConnection(){
	return setConnection();
}

function setConnection() {
	if (!HDB_CONNECTION || HDB_CONNECTION.isClosed()) {
		HDB_CONNECTION = $.hdb.getConnection();
        HDB_CONNECTION.MPTSerial = $.request.path;
	}

	return HDB_CONNECTION;
}

function commit(){
	if (HDB_CONNECTION && !HDB_CONNECTION.isClosed()) {
        HDB_CONNECTION.commit();
    }

}

function rollback(){
	if (HDB_CONNECTION && !HDB_CONNECTION.isClosed())
		HDB_CONNECTION.rollback();
}

function closeConnection(){
	if (HDB_CONNECTION && !HDB_CONNECTION.isClosed()){
		HDB_CONNECTION.close();}
}

function validateErrorCode(error, spName){
	var str = error.toString();
	var regexCode = /server error code: (274|359)/;
    var regexCode301 = /server error code: 301/;
    var regexCode301Const = /Index\(UK_HL[1-6]_CRM_ID\)/;
	var regexCol = /Failed in "([^"]*)/;
	var column = str.match(regexCol);
	if(regexCode.test(str)) /*server error code: 274. inserted value too large for column */
	{
		if(column){
			if(column.length > 1){
				column = column[1].replace("_"," ");
				throw errors.getErrors().CustomError("",spName +" "+error.toString(),"The "+column+" value is too long.");
			}
		}else{
			var regex359 = /defined\(\d+\): *'(.*)'/;
			var errorText = str.match(regex359);
			if(errorText) throw errors.getErrors().CustomError("",spName +" "+error.toString(),"The value "+errorText[1]+" is too long.");
		}
	} else if(regexCode301.test(str) && regexCode301Const.test(str)){
        throw errors.getErrors().CRMConstraintError("",spName +" "+error.toString(),"");
    }


}

