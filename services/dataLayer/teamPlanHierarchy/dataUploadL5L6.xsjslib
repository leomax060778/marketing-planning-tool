$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();

/***************END INCLUDE LIBRARIES*******************/

var spGET_DICTIONARY_BY_PATH = "GET_DICTIONARY_BY_PATH";
var spGET_DICTIONARY_PATH_BY_USER_ID = "GET_DICTIONARY_PATH_BY_USER_ID";
var spDEL_DICTIONARY_L5_L6 = "DEL_DICTIONARY_L5_L6";
var spINS_DICTIONARY_L5_L6 = "INS_DICTIONARY_L5_L6";
var spGET_MAP_HL_EXCEL = "GET_MAP_HL_EXCEL";
var spGET_ALL_PATH_FROM_DICTIONARY_L5_L6 = "GET_ALL_PATH_FROM_DICTIONARY_L5_L6";
var spGET_HL5_PATH_FROM_DICTIONARY_L5_L6 = "GET_HL5_PATH_FROM_DICTIONARY_L5_L6";
var spGET_HL6_PATH_FROM_DICTIONARY_L5_L6 = "GET_HL6_PATH_FROM_DICTIONARY_L5_L6";
var spGET_DATA_FROM_DICTIONARY_BY_PATH = "GET_DATA_FROM_DICTIONARY_BY_PATH";
var INS_UPLOAD_L5_L6_LOG = "INS_UPLOAD_L5_L6_LOG";
var INS_IMPORT_L5_L6 = "INS_IMPORT_L5_L6";
var GET_UPLOAD_L5_L6_LOG = "GET_UPLOAD_L5_L6_LOG";
var GET_IMPORT = "GET_IMPORT";
var UPD_IMPORT_L5_L6 = "UPD_IMPORT_L5_L6";

var hierarchyLevel = {
    "hl5": 2,
    "hl6": 3
}

function getMapHLExcel(){
    var rdo = db.executeProcedure(spGET_MAP_HL_EXCEL, {});
    return db.extractArray(rdo.OUT_RESULT);
}

function getLogByImport(importId){
    var rdo = db.executeProcedure(GET_UPLOAD_L5_L6_LOG, {'IN_IMPORT_ID':importId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getImports(){
    var rdo = db.executeProcedure(GET_IMPORT, {});
    return db.extractArray(rdo.OUT_RESULT);
}

function insertImport(description, userId){
    var params = {
        'IN_DESCRIPTION' : description,
        'in_user_id': userId
    };
    var rdo = db.executeScalarManual(INS_IMPORT_L5_L6, params, "OUT_IMPORT_ID");
    return rdo;
}

function insertLog(csvColumnName, columnName, state, comments, importId, userId){
    var params = {
        'IN_CSV_COLUM_NAME' : csvColumnName,
        'IN_COLUMN_VALUE': columnName,
        'IN_STATE': state,
        'IN_COMMENTS' : comments ,
        'IN_IMPORT_ID' : importId ? importId : null,
        'IN_USER_ID' : userId
    };
    var rdo = db.executeScalarManual(INS_UPLOAD_L5_L6_LOG, params, "OUT_RESULT");
    return rdo;
}

function insertDictionaryL5L6(path, key, value, hl, userId){
    var params = {
        'IN_PATH' : path,
        'IN_KEY_L5_L6': key,
        'IN_VALUE_L5_L6': value,
        'HIERARCHY_LEVEL_ID' :  hl ? hierarchyLevel[hl] : 0,
        'IN_USER_ID' : userId
    };
    var rdo = db.executeScalarManual(spINS_DICTIONARY_L5_L6, params, "OUT_RESULT");
    return rdo;
}

function getDictionaryL5L6PathByUser(userId){
    var rdo = db.executeProcedure(spGET_DICTIONARY_PATH_BY_USER_ID, {'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getDictionaryL5L6ByPath(path, userId){
    var rdo = db.executeProcedure(spGET_DICTIONARY_BY_PATH, {'IN_PATH':path,'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function deleteDictionaryL5L6(userId){
    var rdo = db.executeScalarManual(spDEL_DICTIONARY_L5_L6, {'in_user_id':userId}, "OUT_RESULT");
    return rdo;
}

function getForeignId(tableName, columnReference, columnFilter, findValue, otherFilter){

    var query = "";
    if (otherFilter)
        query = "SELECT " + columnReference + " FROM " + tableName + " WHERE upper(" + columnFilter + ") = upper('" + findValue + "') " + otherFilter + ";";
    else
        query = "SELECT " + columnReference + " FROM " + tableName + " WHERE upper(" + columnFilter + ") = upper('" + findValue + "');";

    var rdo = db.executeQuery(query);
    var arr = db.extractArray(rdo);
    if(arr.length)
        return arr[0];
    else {
        var obj = {};
        obj[columnReference] = null;
        return obj;
    }
}

function getAllPathFromDictionary(userId){
    var rdo = db.executeProcedure(spGET_ALL_PATH_FROM_DICTIONARY_L5_L6, {'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getHL5PathFromDictionary(userId){
    var rdo = db.executeProcedure(spGET_HL5_PATH_FROM_DICTIONARY_L5_L6, {'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getHL6PathFromDictionary(userId){
    var rdo = db.executeProcedure(spGET_HL6_PATH_FROM_DICTIONARY_L5_L6, {'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getDataFromDictionaryByPath(path, userId){
    var rdo = db.executeProcedure(spGET_DATA_FROM_DICTIONARY_BY_PATH, {'IN_PATH': path, 'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function updateImport(importId, userId){
    var params = {
        'in_import_id' : importId,
        'in_user_id': userId
    };
    var rdo = db.executeScalarManual(UPD_IMPORT_L5_L6, params, "out_result");
    return rdo;
}
