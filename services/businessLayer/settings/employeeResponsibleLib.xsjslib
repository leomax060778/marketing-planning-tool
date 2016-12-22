$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dbER = mapper.getDataEmployeeResponsible();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllEmployeeResponsible(){
	return dbER.getAllEmployeeResponsibles();
}

function getEmployeeResponsibleByEmployeeNumber(data, userId){
	return dbER.getEmployeeResponsibleByEmployeeNumber(data.EMPLOYEE_NUMBER);
}

function insEmployeeResponsible( data, userId){
	return insEmployeeResponsible( data.FULL_NAME,data.EMPLOYEE_NUMBER, userId,true);
}

function updEmployeeResponsible(data, userId,autoCommit){
	return updEmployeeResponsible(data.employeeResponsibleId,data.FULL_NAME, data.EMPLOYEE_NUMBER, userId,true);
}