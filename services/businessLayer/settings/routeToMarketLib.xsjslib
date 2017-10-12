$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataRouteToMarket = mapper.getDataRouteToMarket();

/** ***********END INCLUDE LIBRARIES*************** */

function getAllRouteToMarket() {
    return dataRouteToMarket.getAllRouteToMarket();
}

function insertRouteToMarket(description, crmKey, userId) {
    return dataRouteToMarket.insertRouteToMarket(description, crmKey, userId);
}


function updateRouteToMarket(route_to_market_id, name, crmKey, userId) {
    return dataRouteToMarket.updateRouteToMarket(route_to_market_id, name, crmKey, userId);
}

function deleteRouteToMarket(route_to_market_id, userId) {
    return dataRouteToMarket.deleteRouteToMarket(route_to_market_id, userId);
}
