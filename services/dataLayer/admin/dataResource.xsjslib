$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// STORE PROCEDURE LIST NAME
var GET_ALL_RESOURCE = "GET_ALL_RESOURCE";

function getAllResource() {
	var parameters = {};
	var result = db.executeProcedureManual(GET_ALL_RESOURCE, {});
	return db.extractArray(result.out_result);
}
