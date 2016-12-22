$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_SALES_ORGANIZATIONS = "GET_ALL_SALES_ORGANIZATIONS";

//getAllMarketingOrganization
function getAllSaleOrganization(){
    var parameters = {};
    var data = db.executeProcedureManual(GET_ALL_SALES_ORGANIZATIONS, parameters);
    return db.extractArray(data.out_result);
}
