/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var GET_ALL_RESPONSIBLE_PERSON = "GET_ALL_RESPONSIBLE_PERSON";
var INS_RESPONSIBLE_PERSON = "INS_RESPONSIBLE_PERSON";
var UPD_RESPONSIBLE_PERSON = "UPD_RESPONSIBLE_PERSON";
var GET_RESPONSIBLE_PERSON_BY_EMPLOYEE_NUMER = "GET_RESPONSIBLE_PERSON_BY_EMPLOYEE_NUMER";
var GET_RESPONSIBLE_PERSON_BY_ID = "GET_RESPONSIBLE_PERSON_BY_ID";
/******************************************************/

function updResponsiblePerson(responsiblePersonId, FULL_NAME,EMPLOYEE_NUMBER, userId,autoCommit){
	var params = {
		'in_responsiblePersonId' : responsiblePersonId,
		'in_FULL_NAME': FULL_NAME,
		'in_EMPLOYEE_NUMBER': EMPLOYEE_NUMBER,
		'in_modified_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(UPD_RESPONSIBLE_PERSON,params,'out_result');
	}else{
		rdo = db.executeScalarManual(UPD_RESPONSIBLE_PERSON,params,'out_result');
	}
	return rdo;
}


function insResponsiblePerson( FULL_NAME,EMPLOYEE_NUMBER, userId,autoCommit){
	var params = {
		'in_FULL_NAME': FULL_NAME,
		'in_EMPLOYEE_NUMBER': EMPLOYEE_NUMBER,
		'in_created_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(INS_RESPONSIBLE_PERSON,params,'out_result');
	}else{
		rdo = db.executeScalarManual(INS_RESPONSIBLE_PERSON,params,'out_result');
	}
	return rdo;
}

function getResponsiblePersonByEmployeeNumber(employee_number){
	var rdo = db.executeProcedureManual(GET_RESPONSIBLE_PERSON_BY_EMPLOYEE_NUMER,{'in_employee_number':employee_number});
	return db.extractArray(rdo.out_result)[0];
}

function getAllResponsiblePersons(){
	return  db.extractArray(db.executeProcedureManual(GET_ALL_RESPONSIBLE_PERSON,{}).out_result);
}

function getResponsiblePersonById(id){
	var rdo = db.executeProcedureManual(GET_RESPONSIBLE_PERSON_BY_ID,{'in_responsible_person_id':id});
	return db.extractArray(rdo.out_result)[0];
}
