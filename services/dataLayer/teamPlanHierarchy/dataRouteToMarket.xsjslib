$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_ROUTE_TO_MARKET = "GET_ALL_ROUTE_TO_MARKET";

function getAllRouteToMarket(){
    var parameters = {};
    var data = db.executeProcedureManual(GET_ALL_ROUTE_TO_MARKET, parameters);
    return db.extractArray(data.out_result);
}
