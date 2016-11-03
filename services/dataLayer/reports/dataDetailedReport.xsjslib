$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/
var spGetDetailedReport = "GET_DETAILED_REPORT";
var spGetDetailedReportWithDetails = "GET_DETAILED_REPORT_WITH_DETAILS";
var spGetDetailedReportWithCommentCampaignForecastingKpis = "GET_DETAILED_REPORT_WITH_COMMENT_CAMPAIGNFORECASTING";

function getDetailedReport() {
	var result = db.extractArray(db.executeProcedure(spGetDetailedReport, {}).out_result);
	return result;
}

function getDetailedReportWithDetails() {
	var result = db.extractArray(db.executeProcedure(spGetDetailedReportWithDetails, {}).out_result);
	return result;
}

function getDetailedReportWithCommentCampaignForecastingKpis() {
	var result = db.extractArray(db.executeProcedure(spGetDetailedReportWithCommentCampaignForecastingKpis, {}).out_result);
	return result;
}