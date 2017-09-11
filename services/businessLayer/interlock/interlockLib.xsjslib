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
var interlockMail = mapper.getInterlockMail();
var config = mapper.getDataConfig();

var userbl = mapper.getUser();
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

function getInterlockReport(userId){

	var isSA = false;
	if (config.getApplySuperAdminToAllInitiatives()) {
		isSA = userbl.isSuperAdmin(userId) ? 1 : 0;
	}

	var interlockReport = dataInterlock.getInterlockReport(userId, isSA);
	return interlockReport;	
}

function getInterlockByHash(hash,userId){
	if(!hash) 
		throw ErrorLib.getErrors().BadRequest("The hash is not found","interlockServices/handleGet/getInterlockByHash", "The hash is not found");
	
	var rdo = dataInterlock.getInterlockByHash(hash);

	if(rdo == null)
		throw ErrorLib.getErrors().Forbidden();
	return rdo;
};

function setInterlockStatus(interlockData,userId){
	var result = 0;
	try{

		if(interlockData.status_id == INTERLOCK_STATUS.NO_RESPONSE) {

			var interlockComplete = dataInterlock.getInterlockById(interlockData.interlock_id);


			if (interlockComplete.length > 0) {
				var contactData = dataInterlock.getContactDataByInterlockId(interlockData.interlock_id);


				contactData.forEach(function (contactData) {
					var hash= config.getHash();

					var updNumber = dataInterlock.updateContactData(contactData.INTERLOCK_CONTACT_DATA_ID, hash, userId);

					if(updNumber <= 0 )
					throw ErrorLib.getErrors().CustomError("","","The Interlock Contact Data was not found");

					dataInterlock.setInterlockStatus(interlockData.interlock_id, interlockData.status_id,interlockComplete[0].REQUESTER_EMAIL);
					
					notifyInterlockResponse(contactData.EMAIL,hash);
				});
				dataInterlock.insertInterlockMessage(interlockData.interlock_id, interlockData.message, userId, userId,config.getOriginMessageInterlock().requester);
			}


		}else{
			var interlock = getInterlockByHash(interlockData.hash);

			var objContactData = dataInterlock.getInterlockContactDataByHash(interlockData.hash);
			if(interlock.INTERLOCK_STATUS_ID == INTERLOCK_STATUS.APPROVED || interlock.INTERLOCK_STATUS_ID == INTERLOCK_STATUS.REJECTED)
				throw ErrorLib.getErrors().CustomError("","interlockServices/handlePut/setInterlockStatus", "This Interlock is already " + interlock.STATUS + ".");

			if(interlockData.status_id == INTERLOCK_STATUS.MORE_INFO && !interlockData.message)
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/updateHl4", "Message cannot be empty.");

			var requesterEmail = getRequestedUserEmail(interlockData.hash);


			dataInterlock.setInterlockStatus(interlockData.interlock_id, interlockData.status_id, requesterEmail);
			if(interlockData.status_id == INTERLOCK_STATUS.REJECTED){
				dataInterlock.insertInterlockMessage(interlockData.interlock_id, interlockData.message, interlock.CREATED_USER_ID, objContactData.INTERLOCK_CONTACT_DATA_ID,config.getOriginMessageInterlock().moneyLender);
			}

			var objIl = dataInterlock.getInterlockByHash(interlockData.hash);
			if(!objIl)
				throw ErrorLib.getErrors().CustomError("","interlockService/handlePut/setInterlockStatus", "Interlock Data cannot be null or empty.");

			//save requester email
			dataInterlock.insertInterlockLogStatus(interlockData.interlock_id, interlockData.status_id, objIl.CREATED_USER_ID, requesterEmail);




			if(interlockData.status_id == INTERLOCK_STATUS.MORE_INFO) {
				//var contactData = dataInterlock.getInterlockContactDataByHash(interlockData.hash);
				var objContactData = dataInterlock.getInterlockContactDataByHash(interlockData.hash);

				result = dataInterlock.insertInterlockMessage(interlockData.interlock_id, interlockData.message, objIl.CREATED_USER_ID,objContactData.INTERLOCK_CONTACT_DATA_ID, config.getOriginMessageInterlock().moneyLender);
				//Send email to requester to notifiy about messages to review
				notifyRequester(requesterEmail,interlockData.interlock_id, objIl.REQUESTED_RESOURCE, objIl.HL3_ID, objIl.HL4_ID );
			} else {
				result = dataInterlock.deactivateInterlockHash(interlockData.interlock_id, objIl.CREATED_USER_ID);
			};
		}


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
	var result = [];
	interlock.forEach(function(il){
		var aux = util.extractObject(il);
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
	var result = {};
	var hl3 = businessLavel3.getLevel3ById(hl3Id, userId);
	var map = getContactDataMap();
	if(hl3){
		var objLevel2 = {};
		objLevel2.IN_HL2_ID = hl3.HL2_ID;
		var hl2 = businessLavel2.getLevel2ById(objLevel2);
		if(hl2){
			var globalTeams = businessLavel2.getAllCentralTeam(hl3.HL2_ID);
			var regions = blRegion.getAllRegions();
			var subregions = blSubRegion.getAllSubRegions();
			result["Central teams"] = getContactData(globalTeams,CONTACT_TYPE.CENTRAL, map);
			result['Regions'] = getContactData(regions,CONTACT_TYPE.REGIONAL, map);
			result['Market Unit'] = getContactData(subregions,CONTACT_TYPE.REGIONAL, map);
		}
	}
	return result;
}

function getContactData(data,contactType, map){
    data = JSON.parse(JSON.stringify(data));
    data.forEach(function(object){
        var id = object.REGION_ID || object.HL2_ID;
        object.contactData = map[contactType] && map[contactType][id] ? map[contactType][id] : [];
    });
    return data;
}

function getContactDataMap(){
    var spResult = dataInterlock.getInterlockCentralRegionContacts();
    var map = {};
    for(var i = 0; i<spResult.length; i++){
    	var contactData = spResult[i];
    	if(!map[contactData.CONTACT_TYPE])
            map[contactData.CONTACT_TYPE] = {};

    	if(!map[contactData.CONTACT_TYPE][contactData.CONTACT_TYPE_ID])
    		map[contactData.CONTACT_TYPE][contactData.CONTACT_TYPE_ID] = [];

        map[contactData.CONTACT_TYPE][contactData.CONTACT_TYPE_ID].push(contactData.EMAIL);
	}
	return map;
}


function notifyRequester(requesterEmail,interlockId, description, idLevel3, idLevel4){
	var basicData = {};
	 basicData.APPURL = config.getAppUrl();
	 basicData.ENVIRONMENT = config.getMailEnvironment();
	 
	 var reqBody = {};
	 reqBody.HL3_ID = idLevel3;
	 reqBody.HL4_ID = idLevel4;
	 reqBody.INTERLOCK_ID = interlockId;
	 reqBody.DESCRIPTION = description
	
	var interlockMailObject = interlockMail.parseNotifyRequester(reqBody, basicData, "Colleague");
	var mailObject = mail.getJson([{"address" : requesterEmail}], interlockMailObject.subject, interlockMailObject.body);
	//var mailObject = mail.getJson([{"address" : "iberon@folderit.net"}], interlockMailObject.subject, interlockMailObject.body); //For testing only
	
	var rdo = mail.sendMail(mailObject,true);
}

function resendRequestEmail(interlockId, userId) {

		var requestData = dataInterlock.getContactDataByInterlockId(interlockId);
		var mailsSent = 0;
		requestData.forEach(function(contactData){
			notifyInterlockEmail(contactData.EMAIL,contactData.HASH);
			dataInterlock.setSentMailByHash(contactData.hash);
			mailsSent++;
		});
		return (requestData.length - mailsSent);
}

function notifyInterlockEmail(TO,token){
	 var basicData = {};
	 basicData.APPURL = config.getAppUrl();
	 basicData.ENVIRONMENT = config.getMailEnvironment();
	 
	 var reqBody = {};
	 reqBody.TOKEN = token;
	 
	  var interlockMailObj = interlockMail.parseNotifyInterlock(reqBody, basicData, "Colleague");
	 
	  var mailObject = mail.getJson([{"address" : TO}], interlockMailObj.subject, interlockMailObj.body);
	 //var mailObject = mail.getJson([{"address" : "iberon@folderit.net"}], interlockMailObj.subject, interlockMailObj.body); //For testing only
	 
	 mail.sendMail(mailObject, true); 
}

function notifyInterlockResponse(TO,token){
	var basicData = {};
	basicData.APPURL = config.getAppUrl();
	basicData.ENVIRONMENT = config.getMailEnvironment();
	
	var reqBody = {};
	reqBody.TOKEN = token;
	 
	var interlockMailObj = interlockMail.parseNotifyInterlockResponse(reqBody, basicData, "Colleague");
	
	var mailObject = mail.getJson([{"address" : TO} ], interlockMailObj.subject, interlockMailObj.body);
	//var mailObject = mail.getJson([{"address" : "iberon@folderit.net"}], interlockMailObj.subject, interlockMailObj.body); //For testing only
	
	mail.sendMail(mailObject,true);
}

function getMessagesByInterlockRequest(interlockRequestId){
	return dataInterlock.getMessagesByInterlockRequest(interlockRequestId);
}

function saveInterlockRequestMessage(interlockId, message, userId){
	return dataInterlock.insertInterlockMessage(interlockId, message, userId);
}