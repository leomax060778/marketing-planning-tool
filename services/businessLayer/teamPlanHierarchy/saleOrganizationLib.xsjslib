$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataSaleOrganization = mapper.getDataSalesOrganization();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllSaleOrganization() {
	return dataSaleOrganization.getAllSaleOrganization();
}
