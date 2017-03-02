/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blExpectedOutcomes = mapper.getExpectedOutcomeLib();
var ErrorLib = mapper.getErrors();
/** *************************************** */

var BY_ID = "BY_ID";

function processRequest() {
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSessionID) {
    var rdo = [];
    if(parameters.length > 0){
        switch(parameters[0].name){
            case BY_ID:
                rdo = blExpectedOutcomes.getExpectedOutcomeById(parameters[0].value);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("","expectedOutcomeService/handleGet","invalid parameter name (can be: BY_ID)");
                break;
        }
    }else{
        rdo = blExpectedOutcomes.getAllExpectedOutcomes();
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userSessionID) {
    var rdo = blExpectedOutcomes.insertExpectedOutcome(reqBody, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handlePut(reqBody, userSessionID) {
    var rdo = blExpectedOutcomes.updateExpectedOutcome(reqBody, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handleDelete(reqBody, userSessionID) {
    var rdo = blExpectedOutcomes.deleteExpectedOutcome(reqBody, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();