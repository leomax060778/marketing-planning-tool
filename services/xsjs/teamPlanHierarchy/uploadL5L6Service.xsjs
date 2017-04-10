/************************ libs ***************************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blUploadL5L6 = mapper.getUploadL5L6Lib();
var ErrorLib = mapper.getErrors();
/** ******************************************************/

var UPLOADL5_L6 = "UPLOADL5_L6";
var UPLOADL5_L6_BUDGET = "UPLOADL5_L6_BUDGET";
var GET_LOG = "GET_LOG";
var GET_IMPORTS = "GET_IMPORTS";
var GET_PATHS = "GET_PATHS";

function processRequest() {
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handlePost(reqBody, userSessionID) {
    var strUPLOADL5_L6 = httpUtil.getUrlParameters().get("UPLOADL5_L6");
    var rdo = null;
    if (strUPLOADL5_L6 == UPLOADL5_L6) {
        rdo = blUploadL5L6.insertDictionaryL5L6(reqBody, userSessionID);
    }
    else if (strUPLOADL5_L6 == UPLOADL5_L6_BUDGET){
        rdo = blUploadL5L6.insertDictionaryL5L6(reqBody, userSessionID);
    }else{
        throw ErrorLib.getErrors().BadRequest("","uploadL5L6Service/handlePost","invalid parameter name (can be: UPLOADL5_L6 or UPLOADL5_L6_BUDGET)");
        //throw ErrorLib.getErrors().BadRequest("","uploadL5L6Service/handlePost","invalid number of parameters.");
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleGet(parameters,userSessionID) {
    var method = httpUtil.getUrlParameters().get("METHOD");
    if(method && method == GET_LOG){
        var import_id = httpUtil.getUrlParameters().get("IMPORT_ID");
        return httpUtil.handleResponse(blUploadL5L6.getLogByImport(import_id), httpUtil.OK, httpUtil.AppJson);
    }else if(method &&  method == GET_IMPORTS){
        return httpUtil.handleResponse(blUploadL5L6.getImports(), httpUtil.OK, httpUtil.AppJson);
    }else if(method &&  method == GET_PATHS){
        return httpUtil.handleResponse(
            blUploadL5L6.getAllPathFromDictionary(userSessionID),
            httpUtil.OK, httpUtil.AppJson);
    }
    else{
        return httpUtil.handleResponse(blUploadL5L6.getMapHLExcelComplete(), httpUtil.OK, httpUtil.AppJson);
    }
};

function handlePut(reqBody, userSessionID){
    var method = httpUtil.getUrlParameters().get("PATHS");
    var arrayPaths = reqBody.PATHS;
    var importId = reqBody.IMPORT_ID;
    return httpUtil.handleResponse(blUploadL5L6.processor(userSessionID,arrayPaths, importId), httpUtil.OK, httpUtil.AppJson);
};

function handleDelete(reqBody, userSessionID){
    var method = httpUtil.getUrlParameters().get("method");
    if(method == "DICTIONARY"){
        var rdo = blUploadL5L6.deleteDictionary(userSessionID);
        httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
    }else{
        var rdo = blUploadL5L6.deleteDataUploadL5L6ByImportId(reqBody, userSessionID);
        httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
    }
}


processRequest();