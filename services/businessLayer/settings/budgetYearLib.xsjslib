/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbBudget = mapper.getDataBudgetYear();
/*************************************************/



function getAllBudgetYear(){
	return dbBudget.getAllBudgetYear();
}

function updateBudgetYear(budgetYear){
	return dbBudget.updateBudgetYear(budgetYear);
}