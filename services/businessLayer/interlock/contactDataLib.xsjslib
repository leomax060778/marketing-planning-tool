/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var dataContactData = mapper.getDataContactData();

var util = mapper.getUtil();
/*************************************************/
var CONTACT_TYPE = {
		REGIONAL : 1,
		CENTRAL : 2
};
/*************************************************/
function getContactData(contactTypeId, contactType){
	if(!contactTypeId || !Number(contactTypeId)) 
		throw ErrorLib.getErrors().BadRequest("The Parameter contact type is invalid","contactDataService/handleGet/getContactData", "The Parameter contact type id is invalid");
	
	if(!contactType) 
		throw ErrorLib.getErrors().BadRequest("The Parameter contact type is invalid","contactDataService/handleGet/getContactData", "The Parameter contact type is invalid");
	
	try{
		var contactData = dataContactData.getContactData(contactTypeId, CONTACT_TYPE[contactType]);
		return contactData;
	} catch(e) {
		throw e;
	}
};

function insertContactData(data,userId, hl2Id){
	var saveData = false;
	if(validate(data)){
		data.forEach(function(contactData){
			var contactTypeId = hl2Id || contactData.CONTACTTYPEID;
			if(!dataContactData.getContactDataCountByL2Email(contactTypeId, contactData.EMAIL)){
                dataContactData.insertContactData(
                    contactData.BMOLEADS || ""
                    ,contactData.EMPLOYEENUMBER || ""
                    ,contactData.EMAIL
                    ,CONTACT_TYPE[contactData.CONTACTTYPE]
                    ,contactTypeId
                    ,userId
                );
			}
		});
		saveData = true;
	}
 
	return saveData;
};

function deleteContactData(id, userId){
	if(!id || !Number(id)) 
		throw ErrorLib.getErrors().BadRequest("The Parameter id is invalid","contactDataService/handleDelete/deleteContactData", "The Parameter id is invalid");


		return dataContactData.deleteContactData(id, userId);

};

function updateContactData(data,userId){
	if(!data[0].ID || !Number(data[0].ID)) 
		throw ErrorLib.getErrors().BadRequest("The Parameter id is invalid","contactDataService/handleDelete/deleteContactData", "The Parameter id is invalid");
	

		var saveData = true;
		if(validate(data))
			return dataContactData.updateContactData(data[0].ID,data[0].BMOLEADS,data[0].EMPLOYEENUMBER,data[0].EMAIL,CONTACT_TYPE[data[0].CONTACTTYPE],data[0].CONTACTTYPEID,userId);
		
		return null;
}

function deleteContactDataByContactTypeId(type, contactType, contactTypeId, userId) {

		return dataContactData.deleteContactDataByContactTypeId(type, CONTACT_TYPE[contactType], contactTypeId, userId);

}

function validate(data){
	data.forEach(function(contactData){
		if(!contactData.EMAIL || !util.validateIsEmail(contactData.EMAIL))
			throw ErrorLib.getErrors().CustomError("","", "EMAIL field is invalid.");
		
		if(!util.validateIsSapEmail(contactData.EMAIL))
			throw ErrorLib.getErrors().CustomError("","", "EMAIL must be a SAP domain.");
		
		if(contactData.CONTACTTYPE != 'CENTRAL' && contactData.CONTACTTYPE != 'REGIONAL')
			throw ErrorLib.getErrors().CustomError("","", "CONTACT TYPE value should be either REGIONAL or CENTRAL.");
	});
	return true;
}