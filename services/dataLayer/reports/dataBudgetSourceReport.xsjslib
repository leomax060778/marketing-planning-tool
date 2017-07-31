$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/
var GET_BUDGET_SOURCE_REPORT = "GET_BUDGET_SOURCE_REPORT";

function getBudgetSourceReport(budgetYearId, userId) {
	var parameters = {};
	
	parameters.in_budget_year_id = budgetYearId;
	parameters.in_user_id = userId;
	var rdo = db.executeProcedure(GET_BUDGET_SOURCE_REPORT, parameters);
	return db.extractArray(rdo.out_result);
}
