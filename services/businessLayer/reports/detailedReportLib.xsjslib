/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataDetailedReport = mapper.getDataDetailedReport();
var ErrorLib = mapper.getErrors();
/*************************************************/

function getDetailedReport(){
	var detailedReport = dataDetailedReport.getDetailedReport();
	return detailedReport;	
}

function getDetailedReportWithDetails(){
	var detailedReport = dataDetailedReport.getDetailedReportWithDetails();
	return detailedReport;	
}

function getDetailedReportWithCommentCampaignForecastingKpis(){
	var detailedReport = dataDetailedReport.getDetailedReportWithCommentCampaignForecastingKpis();
	return detailedReport;	
}