$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dbRP = mapper.getDataBudgetApprover();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllBudgetApprover(){
	return dbRP.getAllBudgetApprover();
}

function getBudgetApproverByEmployeeNumber(data, userId){
	return dbRP.getBudgetApproverByEmployeeNumber(data.EMPLOYEE_NUMBER);
}

function insBudgetApprover( data, userId){
	return dbRP.insBudgetApprover( data.FULL_NAME,data.EMPLOYEE_NUMBER, userId,true);
}

function updBudgetApprover(data, userId,autoCommit){
	return dbRP.updBudgetApprover(data.busgetApproverId,data.FULL_NAME, data.EMPLOYEE_NUMBER, userId,true);
}

function getBudgetApproverById(data, userId){
	return dbRP.getBudgetApproverById(data.busgetApproverId);
}