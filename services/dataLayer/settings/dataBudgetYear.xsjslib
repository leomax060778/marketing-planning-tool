/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetAllBudgetYear = "GET_ALL_BUDGET_YEAR";
var spUdpBudgetYear = "UPD_BUDGET_YEAR";
/******************************************************/


function getAllBudgetYear(){
	var result = db.executeProcedure(spGetAllBudgetYear,{});
	return db.extractArray(result['out_result']);
}

function updateBudgetYear(budgetYear){
	var params = {
			"start_date" : budgetYear.START_DATE,
			"end_date": budgetYear.END_DATE,
			"default_year": budgetYear.DEFAULT_YEAR,
			"description": budgetYear.DESCRIPTION,
			"modified_user_id": budgetYear.MODIFIED_USER_ID,
			"budget_year": budgetYear.BUDGET_YEAR
	};
	
	return db.executeProcedure(spUdpBudgetYear,params);
}