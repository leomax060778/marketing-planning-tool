/************************ libs ***************************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blUpload = mapper.getUploadLib();
var ErrorLib = mapper.getErrors();
/** ******************************************************/

var UPLOADL5_L6 = "UPLOADL5_L6";
var UPLOADL5_L6_BUDGET = "UPLOADL5_L6_BUDGET";
var UPLOAD_L1 = "UPLOADL1";
var GET_LOG = "GET_LOG";
var GET_IMPORTS = "GET_IMPORTS";
var GET_PATHS = "GET_PATHS";
var GET_L1_PATHS = "GET_L1_PATHS";
var HL1 = "HL1";

function processRequest() {
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handlePost(reqBody, userSessionID) {
    var strUPLOADL5_L6 = httpUtil.getUrlParameters().get("UPLOADL5_L6");
    var method = httpUtil.getUrlParameters().get("method");
    var rdo = null;
    if (strUPLOADL5_L6 == UPLOADL5_L6) {
        rdo = blUpload.insertDictionary(reqBody, userSessionID);
    }
    else if (strUPLOADL5_L6 == UPLOADL5_L6_BUDGET){
        rdo = blUpload.insertDictionary(reqBody, userSessionID);
    }else if (method == UPLOAD_L1){
        rdo = blUpload.insertDictionaryHl1(reqBody, userSessionID);
    }else{
        throw ErrorLib.getErrors().BadRequest("","uploadL5L6Service/handlePost","invalid parameter name (can be: UPLOADL5_L6 or UPLOADL5_L6_BUDGET)");
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleGet(parameters,userSessionID) {
    var method = httpUtil.getUrlParameters().get("METHOD");
    if(method && method == GET_LOG){
        var import_id = httpUtil.getUrlParameters().get("IMPORT_ID");
        return httpUtil.handleResponse(blUpload.getLogByImport(import_id), httpUtil.OK, httpUtil.AppJson);
    }else if(method &&  method == GET_IMPORTS){
        return httpUtil.handleResponse(blUpload.getImports(), httpUtil.OK, httpUtil.AppJson);
    }else if(method &&  method == GET_PATHS){
        return httpUtil.handleResponse(
            blUpload.getAllPathFromDictionary(userSessionID),
            httpUtil.OK, httpUtil.AppJson);
    }else if(method &&  method == GET_L1_PATHS){
        return httpUtil.handleResponse(
            blUpload.getL1PathFromDictionary(userSessionID),
            httpUtil.OK, httpUtil.AppJson);
    }else if(method &&  method == GET_L1_COMPLETE_MAP){
        return httpUtil.handleResponse(
            blUpload.getMapHL1ExcelComplete(),
            httpUtil.OK, httpUtil.AppJson);
    }
    else{
        return httpUtil.handleResponse(blUpload.getMapHLExcelComplete(), httpUtil.OK, httpUtil.AppJson);
    }
};

function handlePut(reqBody, userSessionID){
    var method = httpUtil.getUrlParameters().get("PATHS");
    var level =  httpUtil.getUrlParameters().get("LEVEL");
    var arrayPaths = reqBody.PATHS;
    var importId = reqBody.IMPORT_ID;
    return httpUtil.handleResponse(blUpload.processor(userSessionID,arrayPaths, importId), httpUtil.OK, httpUtil.AppJson);

};

function handleDelete(reqBody, userSessionID){
    var method = httpUtil.getUrlParameters().get("method");
    if(method == "DICTIONARY"){
        var rdo = blUpload.deleteDictionary(userSessionID);
        httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
    }else{
        var rdo = blUpload.deleteDataUploadL5L6ByImportId(reqBody, userSessionID);
        httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
    }
}


processRequest();