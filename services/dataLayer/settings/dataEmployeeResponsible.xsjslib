/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var GET_ALL_EMPLOYEE_RESPONSIBLE = "GET_ALL_EMPLOYEE_RESPONSIBLE";
var INS_EMPLOYEE_RESPONSIBLE = "INS_EMPLOYEE_RESPONSIBLE";
var UPD_EMPLOYEE_RESPONSIBLE = "UPD_EMPLOYEE_RESPONSIBLE";
var GET_EMPLOYEE_RESPONSIBLE_BY_EMPLOYEE_NUMER = "GET_EMPLOYEE_RESPONSIBLE_BY_EMPLOYEE_NUMER";

/******************************************************/

function updEmployeeResponsible(employeeResponsibleId, FULL_NAME,EMPLOYEE_NUMBER, userId,autoCommit){
	var params = {
		'in_employeeResponsibleId' : employeeResponsibleId,
		'in_FULL_NAME': FULL_NAME,
		'in_EMPLOYEE_NUMBER': EMPLOYEE_NUMBER,
		'in_modified_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(UPD_EMPLOYEE_RESPONSIBLE,params,'out_result');
	}else{
		rdo = db.executeScalarManual(UPD_EMPLOYEE_RESPONSIBLE,params,'out_result');
	}
	return rdo;
}


function insEmployeeResponsible( FULL_NAME,EMPLOYEE_NUMBER, userId,autoCommit){
	var params = {
		'in_FULL_NAME': FULL_NAME,
		'in_EMPLOYEE_NUMBER': EMPLOYEE_NUMBER,
		'in_created_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(INS_EMPLOYEE_RESPONSIBLE,params,'out_result');
	}else{
		rdo = db.executeScalarManual(INS_EMPLOYEE_RESPONSIBLE,params,'out_result');
	}
	return rdo;
}

function getEmployeeResponsibleByEmployeeNumber(employee_number){
	return db.extractArray(db.executeProcedure(GET_EMPLOYEE_RESPONSIBLE_BY_EMPLOYEE_NUMER,{'in_employee_number':employee_number}))[0];
}

function getAllEmployeeResponsibles(){
	return  db.extractArray(db.executeProcedure(GET_ALL_EMPLOYEE_RESPONSIBLE,{}).out_result);
}