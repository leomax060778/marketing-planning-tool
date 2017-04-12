/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blObjectives = mapper.getObjectiveLib();
var ErrorLib = mapper.getErrors();
/** *************************************** */

var BY_ID = "BY_ID";
var CONFIRM_OK = "CONFIRM_OK";

function processRequest() {
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSessionID) {
    var rdo = [];
    if(parameters.length > 0){
        switch(parameters[0].name){
            case BY_ID:
                rdo = blObjectives.getObjectiveById(parameters[0].value);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("","objectiveService/handleGet","invalid parameter name (can be: BY_ID)");
                break;
        }
    }else{
        rdo = blObjectives.getAllObjectives();
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userSessionID) {
    var rdo = blObjectives.insertObjective(reqBody, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handlePut(reqBody, userSessionID) {
    var rdo = blObjectives.updateObjective(reqBody, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleDelete(reqBody, userSessionID) {
    var confirm = httpUtil.getUrlParameters().get("CONFIRM_OK");
    var rdo = blObjectives.deleteObjective(reqBody, userSessionID, confirm);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();