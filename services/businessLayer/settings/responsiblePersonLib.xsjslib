$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dbRP = mapper.getDataResponsiblePerson();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllResponsiblePerson(){
	return dbRP.getAllResponsiblePerson();
}

function getResponsiblePersonByEmployeeNumber(data, userId){
	return dbRP.getResponsiblePersonByEmployeeNumber(data.EMPLOYEE_NUMBER);
}

function insResponsiblePerson( data, userId){
	return dbRP.insResponsiblePerson( data.FULL_NAME,data.EMPLOYEE_NUMBER, userId,true);
}

function updResponsiblePerson(data, userId,autoCommit){
	return dbRP.updResponsiblePerson(data.responsiblePersonId,data.FULL_NAME, data.EMPLOYEE_NUMBER, userId,true);
}

function getResponsiblePersonById(data, userId){
	return dbRP.getResponsiblePersonById(data.responsiblePersonId);
}