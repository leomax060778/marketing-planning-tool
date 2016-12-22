$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_ROUTE_TO_MARKET = "GET_ALL_ROUTE_TO_MARKET";
var GET_ROUTE_TO_MARKET_BY_ID = "GET_ROUTE_TO_MARKET_BY_ID";

function getAllRouteToMarket(){
    var parameters = {};
    var data = db.executeProcedureManual(GET_ALL_ROUTE_TO_MARKET, parameters);
    return db.extractArray(data.out_result);
}

function getRouteToMarketById(idRouteToMarket){
    var parameters = {'in_route_to_market_id': idRouteToMarket};
    var data = db.executeProcedureManual(GET_ROUTE_TO_MARKET_BY_ID, parameters);
    var result = db.extractArray(data.out_result);
    if (result.length)
        return result[0];
    else
        return null;
}