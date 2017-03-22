/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var GET_ALL_BUDGET_APPROVER = "GET_ALL_BUDGET_APPROVER";
var INS_BUDGET_APPROVER = "INS_BUDGET_APPROVER";
var UPD_BUDGET_APPROVER = "UPD_BUDGET_APPROVER";
var GET_BUDGET_APPROVER_BY_EMPLOYEE_NUMER = "GET_BUDGET_APPROVER_BY_EMPLOYEE_NUMER";
var GET_BUDGET_APPROVER_BY_ID = "GET_BUDGET_APPROVER_BY_ID";
/******************************************************/

function updBudgetApprover(budgetApproverId, FULL_NAME,EMPLOYEE_NUMBER, userId,autoCommit){
	var params = {
		'in_budgetApproverId' : budgetApproverId,
		'in_FULL_NAME': FULL_NAME,
		'in_EMPLOYEE_NUMBER': EMPLOYEE_NUMBER,
		'in_modified_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(UPD_BUDGET_APPROVER,params,'out_result');
	}else{
		rdo = db.executeScalarManual(UPD_BUDGET_APPROVER,params,'out_result');
	}
	return rdo;
}


function insBudgetApprover( FULL_NAME,EMPLOYEE_NUMBER, userId,autoCommit){
	var params = {
		'in_FULL_NAME': FULL_NAME,
		'in_EMPLOYEE_NUMBER': EMPLOYEE_NUMBER,
		'in_created_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(INS_BUDGET_APPROVER,params,'out_result');
	}else{
		rdo = db.executeScalarManual(INS_BUDGET_APPROVER,params,'out_result');
	}
	return rdo;
}

function getBudgetApproverByEmployeeNumber(employee_number){
	var rdo = db.executeProcedureManual(GET_BUDGET_APPROVER_BY_EMPLOYEE_NUMER,{'in_employee_number':employee_number});
	return db.extractArray(rdo.out_result)[0];
}

function getAllBudgetApprovers(){
	return  db.extractArray(db.executeProcedureManual(GET_ALL_BUDGET_APPROVER,{}).out_result);
}

function getBudgetApproverById(id){
	var rdo = db.executeProcedureManual(GET_BUDGET_APPROVER_BY_ID,{'in_budget_approver_id':id});
	return db.extractArray(rdo.out_result)[0];
}
