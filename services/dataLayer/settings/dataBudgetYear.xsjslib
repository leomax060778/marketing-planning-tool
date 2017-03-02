/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetAllBudgetYear = "GET_ALL_BUDGET_YEAR";
var spUdpBudgetYear = "UPD_BUDGET_YEAR";
var GET_BUDGET_YEAR = "GET_BUDGET_YEAR";
var spGET_BUDGET_YEAR_BY_HL4_ID = "GET_BUDGET_YEAR_BY_HL4_ID";
var DEL_BUDGET_YEAR = "DEL_BUDGET_YEAR";

var spGET_HL2_QUANTITY_BY_BUDGET_YEAR_ID = "GET_HL2_QUANTITY_BY_BUDGET_YEAR_ID";

var spInsBudgetYear = "INS_BUDGET_YEAR";
var RESET_ALL_BUDGET_YEAR_DEFAULT_YEAR = "RESET_ALL_BUDGET_YEAR_DEFAULT_YEAR";
var spGET_BUDGET_YEAR_BY_LEVEL_PARENT = "GET_BUDGET_YEAR_BY_LEVEL_PARENT";
/******************************************************/

function getHl2QuantityByBudgetYear(budget_year_id){
	return db.executeScalarManual(spGET_HL2_QUANTITY_BY_BUDGET_YEAR_ID,{'in_budget_year_id':budget_year_id}, 'out_result');
}

function getAllBudgetYear(){
	var result = db.executeProcedure(spGetAllBudgetYear,{});
	return db.extractArray(result['out_result']);
}

function insertBudgetYear(budgetYear,startDate,endDate,defaultYear,description,userId,autoCommit){
	var params = {
		'in_budget_year' : budgetYear,
		'in_start_date'  : startDate,
		'in_end_date' : endDate,
		'in_default_year' : defaultYear,
		'in_description': description,
		'in_created_user_id' : userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spInsBudgetYear,params,'out_budget_year_id');
	}else{
		rdo = db.executeScalarManual(spInsBudgetYear,params,'out_budget_year_id');
	}
	return rdo;
}

function updateBudgetYear(budgetYearId, budgetYear, startDate, endDate, defaultYear, description, userId){
	var params = {
			"in_budget_year_id": budgetYearId,
			"in_start_date" : startDate,
			"in_end_date": endDate,
			"in_default_year": defaultYear,
			"in_description": description,
			"in_modified_user_id": userId,
			"in_budget_year": budgetYear
	};
	
	return db.executeScalarManual(spUdpBudgetYear,params, 'out_result');
}


function getBudgetYear(budgetYear){
	var params = {
			"in_budget_year" : budgetYear
	};
	var result = db.executeProcedureManual(GET_BUDGET_YEAR,params);
	return db.extractArray(result['out_result'])[0];
}

function getBudgetYearByHl4Id(hl4_id){
	var params = {
		"IN_HL4_ID" : hl4_id
	};
	return db.executeScalarManual(spGET_BUDGET_YEAR_BY_HL4_ID,params,'OUT_BUDGET_YEAR_ID');
}

function deleteBudgetYear(budgetYearId, userId){
	var params = {
		'in_budget_year_id' : budgetYearId,
		'in_user_id' : userId
	};
	return db.executeScalarManual(DEL_BUDGET_YEAR,params,'out_result');
}

function resetAllBudgetYearDefaultYear(budgetYearId, userId){
	var params = {
		'in_budget_year_id' : budgetYearId,
		'in_user_id' : userId
	};
	return db.executeScalarManual(RESET_ALL_BUDGET_YEAR_DEFAULT_YEAR,params,'out_result');
}

function getBudgetYearByLevelParent(level, hlId){
	var params = {
		"in_lh" : level
		, "in_parent_id": hlId
	};
	var result = db.executeProcedure(spGET_BUDGET_YEAR_BY_LEVEL_PARENT, params);
	return db.extractArray(result['out_result'])[0].BUDGET_YEAR_ID;
}