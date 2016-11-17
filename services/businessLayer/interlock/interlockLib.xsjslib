/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var dataInterlock = mapper.getDataInterLock();

var util = mapper.getUtil();
var businessLavel3 = mapper.getLevel3();
var businessLavel2 = mapper.getLevel2();
var blRegion = mapper.getRegion();
var blSubRegion =  mapper.getSubRegion();
var mail = mapper.getMail();
var config = mapper.getDataConfig();
/*************************************************/

var INTERLOCK_STATUS = {
		NO_RESPONSE: 1,
		APPROVED: 2,
		REJECTED: 3,
		MORE_INFO: 4
};

var CONTACT_TYPE = {
		REGIONAL : 1,
		CENTRAL : 2
};
/*************************************************/

function getInterlockReport(){
	var interlockReport = dataInterlock.getInterlockReport();
	return interlockReport;	
}

function getInterlockByHash(hash,userId){
	if(!hash) 
		throw ErrorLib.getErrors().BadRequest("The hash is not found","interlockServices/handleGet/getInterlockByHash", "The hash is not found");
	
	var rdo = dataInterlock.getInterlockByHash(hash);
	return rdo;
};

function setInterlockStatus(interlockData){
	var result = 0;
	try{
		var interlock = getInterlockByHash(interlockData.hash);
		if(interlock.INTERLOCK_STATUS_ID == INTERLOCK_STATUS.APPROVED || interlock.INTERLOCK_STATUS_ID == INTERLOCK_STATUS.REJECTED)
			throw ErrorLib.getErrors().CustomError("","interlockServices/handlePut/setInterlockStatus", "This Interlock is already " + interlock.STATUS + ".");
		
		if(interlockData.status_id == INTERLOCK_STATUS.MORE_INFO && !interlockData.message)
			throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/updateHl4", "Message cannot be empty.");
		
		var requesterEmail = getRequestedUserEmail(interlockData.hash);

		dataInterlock.setInterlockStatus(interlockData.interlock_id, interlockData.status_id, requesterEmail);
		
		var objIl = dataInterlock.getInterlockByHash(interlockData.hash);
		if(!objIl)
			throw ErrorLib.getErrors().CustomError("","interlockService/handlePut/setInterlockStatus", "Interlock Data cannot be null or empty.");
		
		//save requester email
		dataInterlock.insertInterlockLogStatus(interlockData.interlock_id, interlockData.status_id, objIl.CREATED_USER_ID, requesterEmail);
		
		if(interlockData.status_id == INTERLOCK_STATUS.MORE_INFO) {
			result = dataInterlock.insertInterlockMessage(interlockData.interlock_id, interlockData.message, objIl.CREATED_USER_ID);
		} else {
			result = dataInterlock.desactivateInterlockHash(interlockData.interlock_id, objIl.CREATED_USER_ID);
		};
		db.commit();
		return result;
	} catch(e) {
		db.rollback();
		throw e;
	} finally {
		db.closeConnection();
	}
}

function getRequestedUserEmail(hash){
	var email = "";
	var objContact = dataInterlock.getInterlockContactDataByHash(hash);
	if(objContact){
		email = objContact.EMAIL;
	}
	return email;
}

function getInterlockByHl4Id(hl4_id){
	var interlock = dataInterlock.getInterlockByHl4Id(hl4_id);
	//throw ErrorLib.getErrors().CustomError("getHl4ById","Get Hl4 By Id",interlock);
	var result = [];
	interlock.forEach(function(il){
		var aux = util.extractObject(il);
		//throw ErrorLib.getErrors().CustomError("getHl4ById","Get Hl4 By Id",JSON.stringify(aux));
		aux["organization"] = dataInterlock.getInterlockOrganizationByIlId(il.INTERLOCK_REQUEST_ID);
		result.push(aux);
	});
	return result;
}

function getAllEntity(userId){
	return dataInterlock.getInterlockEntity();
}

function getAllOrganizationType(){
	return dataInterlock.getInterlockOrganizationType();
}

function getGlobalTeam(hl3Id, userId){
	//return dataInterlock.getGlobalTeam(hl3Id, userId);
	var result = {};
	var hl3 = businessLavel3.getLevel3ById(hl3Id, userId);
	
	if(hl3){
		var objLevel2 = {};
		objLevel2.IN_HL2_ID = hl3.HL2_ID;
		var hl2 = businessLavel2.getLevel2ById(objLevel2);
		if(hl2){
			var globals = businessLavel2.getAllCentralTeam(hl3.HL2_ID);
			result["Central teams"] = getContactData(globals,CONTACT_TYPE.CENTRAL);
			result['Regions'] = getContactData(blRegion.getAllRegions(),CONTACT_TYPE.REGIONAL);	
			result['Market Unit'] = getContactData(blSubRegion.getAllSubRegions(),CONTACT_TYPE.REGIONAL);
		}
	}
	return result;
}

function resendRequestEmail(interlockId, userId) {
	try{
		var requestData = dataInterlock.getContactDataByInterlockId(interlockId);
		var mailsSent = 0;
		requestData.forEach(function(contactData){
			notifyInterlockEmail(contactData.EMAIL,contactData.HASH);
			dataInterlock.setSentMailByHash(contactData.hash);
			mailsSent++;
		});
		return (requestData.length - mailsSent);
	} catch(e) {
		db.rollback();
		throw e;
	} finally {
		db.closeConnection();
	}
}

function notifyInterlockEmail(TO,token){
	 var appUrl = config.getAppUrl();
	 var body = '<p> Dear Colleague </p>';
	 body += '<p>An interlock request has been created and needs your approval. Please follow the link: </p>';
	 body += '<p>' + appUrl + '/#InterlockManagement/' + token + '</p> <p> Thank you </p>';
	 var mailObject = mail.getJson([ {
	  "address" : TO
	 } ], "Marketing Planning Tool - Interlock Process", body);
	 
	 mail.sendMail(mailObject,true);
}

function getContactData(data,contactType){
	var result = [];
	data.forEach(function(object){
		var resultObject = {};
		Object.keys(object).forEach(function(key){
			resultObject[key] = object[key];
		});
		var id = object.REGION_ID || object.HL2_ID;
		var contactData = [];
		dataInterlock.getInterlockCentralRegionContacts(contactType, id).forEach(function(contact){
			contactData.push(contact.EMAIL);
		});
		var contactDataString = contactData;
		resultObject.contactData = contactDataString;
		result.push(resultObject);
	});
	return result;
}