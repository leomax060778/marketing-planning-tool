$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_ROUTE_TO_MARKET = "GET_ALL_ROUTE_TO_MARKET";
var GET_ROUTE_TO_MARKET_BY_ID = "GET_ROUTE_TO_MARKET_BY_ID";
var INS_ROUTE_TO_MARKET = "INS_ROUTE_TO_MARKET";
var UPD_ROUTE_TO_MARKET = "UPD_ROUTE_TO_MARKET";
var DEL_ROUTE_TO_MARKET = "DEL_ROUTE_TO_MARKET";


function getAllRouteToMarket() {
    var parameters = {};
    var data = db.executeProcedureManual(GET_ALL_ROUTE_TO_MARKET, parameters);
    return db.extractArray(data.out_result);
}

function getRouteToMarketById(idRouteToMarket) {
    var parameters = {'in_route_to_market_id': idRouteToMarket};
    var data = db.executeProcedureManual(GET_ROUTE_TO_MARKET_BY_ID, parameters);
    var result = db.extractArray(data.out_result);
    if (result.length)
        return result[0];
    else
        return null;
}

function insertRouteToMarket(description, crmKey, userId) {
    var rdo = db.executeScalar(INS_ROUTE_TO_MARKET, {
        "in_name": description,
        "in_crm_key": crmKey,
        "in_user_id": userId
    }, "out_result");
    return db.extractArray(rdo);
}

function updateRouteToMarket(route_to_market_id, name, crmKey, userId) {
    var rdo = db.executeScalar(UPD_ROUTE_TO_MARKET, {
        "in_route_to_market_id": route_to_market_id,
        "in_name": name,
        "in_crm_key": crmKey,
        "in_modified_user_id": userId
    }, "out_result");
    return db.extractArray(rdo);
}

function deleteRouteToMarket(route_to_market_id, userId) {
    var rdo = db.executeScalar(DEL_ROUTE_TO_MARKET, {
        "in_route_to_market_id": route_to_market_id,
        "in_user_id": userId
    }, "out_result");
    return db.extractArray(rdo);
}