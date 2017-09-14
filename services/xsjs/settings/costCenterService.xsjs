/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var costCenterLib = mapper.getCostCenter();
var ErrorLib = mapper.getErrors();
/** *************************************** */

var BY_ID = "BY_ID";
var HL6_ID = "HL6_ID";
var TEAMS = 'ALL';
var HL5_ID = 'HL5_ID';


function processRequest() {
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSessionID) {
    var rdo = [];
    if(parameters.length > 0){
        switch(parameters[0].name){
            case BY_ID:
                rdo = costCenterLib.getCostCenterById(parameters[0].value);
                break;
            case HL6_ID:
                rdo = costCenterLib.getCostCenterByL6Id(parameters[0].value);
                break;
            case TEAMS:
                rdo = costCenterLib.getCostCenterAvailableTeams();
                break;
            case HL5_ID:
                rdo = costCenterLib.getCostCenterByL5IdSaleOrganizationId(parameters[0].value, parameters[1].value);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("","objectiveService/handleGet","invalid parameter name (can be: BY_ID, HL6_ID or TEAMS)");
                break;
        }
    }else{
        rdo = costCenterLib.getAllCostCenter();
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userSessionID) {
    var rdo = reqBody.check ? costCenterLib.checkCostCenter(reqBody, userSessionID)
        :reqBody.batch ? costCenterLib.uploadCostCenter(reqBody, userSessionID)
        :costCenterLib.insCostCenter(reqBody, userSessionID);

    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handlePut(reqBody, userSessionID) {
    var rdo = costCenterLib.updCostCenter(reqBody, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handleDelete(reqBody, userSessionID) {
    var rdo = costCenterLib.delCostCenter(reqBody, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();