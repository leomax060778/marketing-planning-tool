$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataRouteToMarket = mapper.getDataRouteToMarket();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllRouteToMarket() {
	return dataRouteToMarket.getAllRouteToMarket();
}
