/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataBudgetSourcedReport = mapper.getDataBudgetSourceReport();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

function calculateBudgetInEuros(data) {
	var kEurAmount = (data.REQUESTED_BUDGET * data.CURRENCY_VALUE);
	return kEurAmount;
}

function completeCRMPath(array, key) {
	var kEurAmount;

	var path = 'CRM-';
	array.forEach(function(data) {
		if (data[key]) {
			data[key] = path + data[key];
		}
		kEurAmount = calculateBudgetInEuros(data);

		if (data.CURRENCY_ABBREVIATION === "EUR") {
			data.REQUESTED_BUDGET = "" + kEurAmount + " K EUR";
		} else {
			data.REQUESTED_BUDGET = "" + data.REQUESTED_BUDGET + " "
					+ data.CURRENCY_ABBREVIATION + " (" + kEurAmount
					+ " K EUR)";
		}
	});
}

function getBudgetSourceReport(budgetYearId, userId) {
	var budgetSourceReport = dataBudgetSourcedReport.getBudgetSourceReport(
			budgetYearId, userId);
	budgetSourceReport = JSON.parse(JSON.stringify(budgetSourceReport));
	completeCRMPath(budgetSourceReport, "PATH");

	return budgetSourceReport;
}