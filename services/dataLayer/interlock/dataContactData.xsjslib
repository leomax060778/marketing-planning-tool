/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetContactData = "GET_CONTACT_DATA";

var spInsertContactData = "INS_CONTACT_DATA";

var spDeleteContactData = "DEL_CONTACT_DATA";
var spHardDeleteContactData = "DEL_CONTACT_DATA_HARD";
var spDeleteContactDataByContactTypeId = "DEL_CONTACT_DATA_BY_CONTACT_TYPE_ID";

var spUpdataContactData = "UPD_CONTACT_DATA";
/******************************************************/

function getContactData(contactTypeId, contactType){	
	var rdo = db.executeProcedure(spGetContactData, {'in_contact_type': contactType, 'in_contact_type_id': contactTypeId});
	return db.extractArray(rdo.out_result);
}

function insertContactData(bmoLeads,employeeNumber,email,contactType,contactTypeId,userId){
	var parameters = {
				'in_bmo_leads': bmoLeads,
				'in_employee_number': employeeNumber,
				'in_email': email,
				'in_contact_type': contactType,
				'in_contact_type_id': contactTypeId,
				'in_user_id': userId
			};
	var rdo = db.executeScalarManual(spInsertContactData, parameters, 'out_interlock_central_region_contact_data_id');
	return rdo;	
}

function deleteContactData(id, userId){
	var rdo = db.executeScalar(spDeleteContactData, {'in_interlock_central_region_contact_data_id': id,'in_user_id': userId}, 'out_result');
    return rdo;
}

function deleteContactDataByContactTypeId(type, contactType, contactTypeId){
	var sp = type == 'hard' ? spHardDeleteContactData : spDeleteContactDataByContactTypeId;
	var rdo = db.executeScalar(sp, {'in_contact_type': contactType, 'in_contact_type_id': contactTypeId}, 'out_result');
    return rdo;
}

function updateContactData(id,bmoLeads,employeeNumber,email,contactType,contactTypeId,userId){
	var parameters = {
			'in_interlock_central_region_contact_data_id': id,
			'in_bmo_leads': bmoLeads,
			'in_employee_number': employeeNumber,
			'in_email': email,
			'in_contact_type': contactType,
			'in_contact_type_id': contactTypeId,
			'in_user_id': userId
		};
	var rdo = db.executeScalar(spUpdataContactData, parameters, 'out_result');
    return rdo;
}