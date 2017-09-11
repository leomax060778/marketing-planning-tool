$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/
var spGetL4DetailedReport = "GET_L4_DETAILED_REPORT";
var spGetL5DetailedReport = "GET_L5_DETAILED_REPORT";

function getL4DetailedReport() {
	var result = db.extractArray(db.executeProcedure(spGetL4DetailedReport, {}).out_result);
	return result;
}

function getL5DetailedReport() {
	var result = db.extractArray(db.executeProcedure(spGetL5DetailedReport, {}).out_result);
	return result;
}