$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/
var spGetDetailedReport = "GET_DETAILED_REPORT";

function getDetailedReport() {
	//var list = db.executeProcedure(GET_HL4_ALL_BUDGET, parameters);
	var result = db.extractArray(db.executeProcedure(spGetDetailedReport, {}).out_result);
	return result;
}