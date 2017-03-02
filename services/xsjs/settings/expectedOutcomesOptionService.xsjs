/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blOption = mapper.getExpectedOutcomesOptionLib();
/** *************************************** */
var GET_BY_ID = "GET_BY_ID";
var EXPECTED_OUTCOME_ID = "EXPECTED_OUTCOME_ID";

function processRequest() {
    return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, userSessionID) {
    var rdo = null;
    if (parameters.length > 0) {
        switch (parameters[0].name) {
            case GET_BY_ID:
                rdo = blOption.getOptionById(parameters[0].value);
                break;
            case EXPECTED_OUTCOME_ID:
                rdo = blOption.getOptionByExpectedOutcomeAndLevelId(parameters[0].value, parameters[1].value);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "expectedOutcome/handleGet", "invalid parameter name (can be: GET_BY_ID or EXPECTED_OUTCOME_ID)");
                break;
        }
    } else {
        rdo = blOption.getAllOption();
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId) {
    var rdo = blOption.insertOption(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
function handlePut(reqBody, userId) {
    var rdo = blOption.updateOption(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
function handleDelete(reqBody, userId) {
    var rdo = blOption.deleteOption(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
processRequest();