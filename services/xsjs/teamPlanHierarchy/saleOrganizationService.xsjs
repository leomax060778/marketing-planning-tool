/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blSaleOrganization = mapper.getSaleOrganizationLib();
/** *************************************** */

function processRequest() {
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSessionID) {
    var rdo = blSaleOrganization.getAllSaleOrganization();
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId) {
    return httpUtil.notImplementedMethod();
};
function handlePut(reqBody, userId) {
    return httpUtil.notImplementedMethod();
};
function handleDelete(reqBody, userId) {
    return httpUtil.notImplementedMethod();
};

processRequest();