/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blRouteToMarket = mapper.getRouteToMarketLib();

/** *************************************** */

function processRequest() {
    return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet() {
    var rdo = blRouteToMarket.getAllRouteToMarket();
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userSessionID) {
    var result = blRouteToMarket.insertRouteToMarket(reqBody.NAME, reqBody.CRM_KEY, userSessionID);
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userSessionID) {
    var result = blRouteToMarket.updateRouteToMarket(reqBody.ROUTE_TO_MARKET_ID, reqBody.NAME, reqBody.CRM_KEY, userSessionID);
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userSessionID) {
    var result = blRouteToMarket.deleteRouteToMarket(reqBody.ROUTE_TO_MARKET_ID, userSessionID);
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}


processRequest();