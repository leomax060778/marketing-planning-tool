/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetInterlockByHl4Id = "GET_INTERLOCK_BY_HL4_ID";
var spGetInterlockById = "GET_INTERLOCK_BY_ID";
var spGetInterlockEntity = "GET_ALL_INTERLOCK_ENTITY";
var spGetInterlockOrganizationType = "GET_ALL_INTERLOCK_ORGANIZATION_TYPE";
var spGetInterlockOrganizationTypeById = "GET_ORGANIZATION_TYPE_BY_ID";
var spGetInterlockStatus = "GET_INTERLOCK_STATUS";
var spGetInterlockOrganizationByIlId = "GET_INTERLOCK_ORGANIZATION_BY_IL_ID";
var spGetInterlockContactDataByInterlockId = "GET_INTERLOCK_CONTACT_DATA_BY_INTERLOCK_ID";
var spGetInterlockReport = "GET_INTERLOCK_REPORT";
var spGetInterlockMessageByInterlockId = "GET_INTERLOCK_MESSAGE_BY_INTERLOCK_ID";

var spInsertInterlock = "INS_INTERLOCK";
var spInsertInterlockLogStatus = "INS_INTERLOCK_LOG_STATUS";
var spInsertInterlockRoute = "INS_INTERLOCK_ROUTE"; 
var spInsertInterlockRegion = "INS_INTERLOCK_REGION";
var spInsertInterlockSubregion = "INS_INTERLOCK_SUBREGION";
var spInsertInterlockContactData = "INS_INTERLOCK_CONTACT_DATA";
var spInsertInterlockRequestMessage = "INS_INTERLOCK_REQUEST_MESSAGE";

var spDeleteInterlock = "DEL_INTERLOCK_BY_HL4_ID";
var spDeleteInterlockLogStatus = "DEL_INTERLOCK_LOG_STATUS";
var spDeleteInterlockRoute = "DEL_INTERLOCK_GLOBAL_TEAM_BY_HL4_ID";
var spDeleteInterlockRegion = "DEL_INTERLOCK_REGION_BY_HL4_ID";
var spDeleteInterlockSubregion = "DEL_INTERLOCK_SUBREGION_BY_HL4_ID";

var spDeleteInterlockByIlId = "DEL_INTERLOCK_BY_IL_ID";
var spDeleteInterlockLogStatusByIlId = "DEL_INTERLOCK_LOG_STATUS_BY_IL_ID";
var spDeleteInterlockRouteByIlId = "DEL_INTERLOCK_GLOBAL_TEAM_BY_IL_ID";
var spDeleteInterlockRegionByIlId = "DEL_INTERLOCK_REGION_BY_IL_ID";
var spDeleteInterlockSubregionByIlId = "DEL_INTERLOCK_SUBREGION_BY_IL_ID";
var spGetInterlockContactRegionCentralTeam = "GET_INTERLOCK_CENTRAL_REGION_CONTACT_DATA";
var spDeleteInterlockContactDataById = "DEL_INTERLOCK_CONTACT_DATA";
var spsetSendEmailContactData = "UPD_INTERLOCK_CONTACT_DATA";
var spGetInterlockByHash = "GET_INTERLOCK_BY_HASH";
var spUpdInterlockStatus = "UPD_INTERLOCK_STATUS";
var spGetInterlockContactDataByHash = "GET_INTERLOCK_CONTACT_DATA_BY_HASH";
var spGetInterlockCentralRegionContactByEmail = "GET_INTERLOCK_CENTRAL_REGION_CONTACT_DATA_BY_EMAIL";
var spDeleteInterlockContactDataByHl4Id = "DEL_INTERLOCK_CONTACT_DATA_BY_HL4_ID";
var spDelInterlockRequestMessageByHl4Id = "DEL_INTERLOCK_MESSAGE_BY_HL4_ID";
var spDeleteInterlockRequestMessageById = "DEL_INTERLOCK_REQUEST_MESSAGE_BY_ID";

var spUpdContactData = "UPD_HASH_CONTACT_DATA";
/******************************************************/

/********** GET **********/
function getInterlockReport() {
	var result = db.extractArray(db.executeProcedure(spGetInterlockReport, {}).out_result);
	return result;
}

function getInterlockByHl4Id(id){	
	if(id){
		var rdo = db.executeProcedureManual(spGetInterlockByHl4Id, {'in_hl4_id':id});
		return db.extractArray(rdo.out_interlock);
	}	
	return null;
}

function getInterlockById(id){
	if(id){
		var rdo = db.executeProcedure(spGetInterlockById,{'in_interlock_request_id':id});
		return db.extractArray(rdo.out_result);
	}	
	return null;
}

function getInterlockEntity(){
		var rdo = db.executeProcedure(spGetInterlockEntity,{});
		return db.extractArray(rdo.out_interlock_entity);
}

function getInterlockOrganizationType(){
	var rdo = db.executeProcedure(spGetInterlockOrganizationType,{});
	return db.extractArray(rdo.out_interlock_organization_type);
}

function getInterlockOrganizationByIlId(il_id){
	if(il_id){
		var rdo = db.executeProcedure(spGetInterlockOrganizationByIlId,{'in_interlock_id':il_id});
		return db.extractArray(rdo.out_organization)[0];
	}
	return null
}

function getInterlockStatus(){
	var rdo = db.executeProcedure(spGetInterlockStatus,{});
	return db.extractArray(rdo.out_interlock);
}

/********** INSERT **********/

function insertInterlock(parameters){

		var rdo = db.executeScalarManual(spInsertInterlock, parameters, 'out_interlock_id');
		return rdo;
}

function insertInterlockRoute(parameters){
	var rdo = db.executeScalarManual(spInsertInterlockRoute, parameters, 'out_interlock_route_id');
	return rdo;
}

function insertInterlockRegion(parameters){
	var rdo = db.executeScalarManual(spInsertInterlockRegion, parameters, 'out_interlock_region_id');
	return rdo;
}

function insertInterlockSubregion(parameters){
	var rdo = db.executeScalarManual(spInsertInterlockSubregion, parameters, 'out_interlock_subregion_id');
	return rdo;
}

function insertInterlockLogStatus(interlock_id, status_id, created_user_id, requesterEmail){
	var params = {};
	params.in_interlock_request_id = interlock_id;
	params.in_interlock_status_id = status_id;
	params.in_created_user_id = created_user_id;
	params.in_requester_email = requesterEmail;
		
    return db.executeScalarManual(spInsertInterlockLogStatus, params, 'out_interlock_log_status_id');
}


function insertInterlockContactData(interlockId, listContactData, user_id){
	try{
		for(var i = 0; i < listContactData.length; i++){
			var email = listContactData[i].email;
			var hash = listContactData[i].hash;
			db.executeScalarManual(spInsertInterlockContactData, 
					{'in_interlock_request_id': interlockId, 'in_email': email, 'in_hash': hash, 'in_user_id' : user_id},
					'out_interlock_contact_data_id');
		}
		db.commit();
	}catch(e){
		db.rollback();
	}
}


function insertInterlockMessage(interlockId, message, userId, senderId, origin){


	return db.executeProcedureManual(spInsertInterlockRequestMessage,{
		"IN_INTERLOCK_REQUEST_ID" : interlockId,
		"IN_MESSAGE" : message,
		"IN_CREATED_USER_ID": userId,
		"IN_SENDER_ID" : senderId,
		"IN_INTERLOCK_REQUEST_ORIGIN_ID" : origin
	});
}

function getContactDataByInterlockId(interlockId){
var rdo = db.executeProcedure(spGetInterlockContactDataByInterlockId,
		{
	"in_interlock_id" : interlockId
		})	;

return db.extractArray(rdo.out_result);
}


/********** DELETE **********/
function deleteInterlock(parameters){
    var rdo = !parameters.in_hl4_id ? 0 : db.executeScalarManual(spDeleteInterlock, parameters, 'out_result');
    return rdo;
}

function deleteInterlockLogStatus(parameters){
    var rdo = !parameters.in_hl4_id ? 0 : db.executeScalarManual(spDeleteInterlockLogStatus, parameters, 'out_result');
    return rdo;
}

function deleteInterlockRoute(parameters){
    var rdo = !parameters.in_hl4_id ? 0 : db.executeScalarManual(spDeleteInterlockRoute, parameters, 'out_result');
    return rdo;
}

function deleteInterlockRegion(parameters){
    var rdo = !parameters.in_hl4_id ? 0 : db.executeScalarManual(spDeleteInterlockRegion, parameters, 'out_result');
    return rdo;
}

function deleteInterlockSubregion(parameters){
    var rdo = !parameters.in_hl4_id ? 0 : db.executeScalarManual(spDeleteInterlockSubregion, parameters, 'out_result');
    return rdo;
}

function deleteInterlockByIlId(id, userId){
    var rdo = !id && !userId ? null : db.executeScalarManual(spDeleteInterlockByIlId, {'in_il_id': id, 'in_user_id': userId}, 'out_result');
    return rdo;
}

function deleteInterlockLogStatusByIlId(id, userId){
    var rdo = !id && !userId ? null : db.executeScalarManual(spDeleteInterlockLogStatusByIlId, {'in_il_id': id, 'in_user_id': userId}, 'out_result');
    return rdo;
}

function deleteInterlockRouteByIlId(id, userId){
    var rdo = !id && !userId ? null : db.executeScalarManual(spDeleteInterlockRouteByIlId, {'in_il_id': id, 'in_user_id': userId}, 'out_result');
    return rdo;
}

function deleteInterlockRegionByIlId(id, userId){
    var rdo = !id && !userId ? null : db.executeScalarManual(spDeleteInterlockRegionByIlId, {'in_il_id': id, 'in_user_id': userId}, 'out_result');
    return rdo;
}

function deleteInterlockSubregionByIlId(id, userId){
    var rdo = !id && !userId ? null : db.executeScalarManual(spDeleteInterlockSubregionByIlId, {'in_il_id': id, 'in_user_id': userId}, 'out_result');
    return rdo;
}

/*Interlock contact data region / central teams*/
function getInterlockCentralRegionContacts(in_contact_type, in_contact_type_id){
    var params = {};
    params.in_contact_type = in_contact_type;
    params.in_contact_type_id = in_contact_type_id;
    var rdo = db.executeProcedure(spGetInterlockContactRegionCentralTeam, params);
    return db.extractArray(rdo.out_result);
}

/*Logical delete in Interlock Contact Data*/
function deleteInterlockContacDataByHl4Id(hl4){
	var params = {};
    params.in_hl4_id = hl4.in_hl4_id;
    params.in_user_id = hl4.in_user_id;
	var rdo = !hl4 ? null : db.executeScalarManual(spDeleteInterlockContactDataByHl4Id, params, 'out_result');
    return rdo;
}

function setSentMailByHash(hash, userId){
    var rdo = !hash && !userId ? null : db.executeScalarManual(spsetSendEmailContactData, {'in_hash': hash, 'in_user_id': userId}, 'out_result');
    return rdo;
}

function getInterlockByHash(hash){
	var params = {};
    params.in_hash = hash;
	var result = db.executeProcedure(spGetInterlockByHash, params);
	return db.extractArray(result.out_result)[0];
}

function setInterlockStatus(interlock_id, status_id, requesterEmail){

	var rdo = !interlock_id && !status_id && !email ? null : db.executeScalarManual(spUpdInterlockStatus, {'in_interlock_id': interlock_id, 'in_status_id': status_id, 'in_email': requesterEmail}, 'out_result');
    return rdo;
}

function getInterlockContactDataByHash(hash){
    var params = {};
    params.in_hash = hash;
    var result = db.executeProcedureManual(spGetInterlockContactDataByHash, params);
    var list = db.extractArray(result.out_result); 
    if(list.length)
		return list[0];
	else
		return {};   
}

function getRequestedUser(email){
	var params = {};
    params.in_email = email;
    var result = db.executeProcedureManual(spGetInterlockCentralRegionContactByEmail, params);
    var list = db.extractArray(result.out_result); 
    if(list.length)
		return list[0];
	else
		return {};
}

function deactivateInterlockHash(ilRequestId, userId){
   var rdo = !ilRequestId && !userId ? null : db.executeScalarManual(spDeleteInterlockContactDataById, {'in_interlock_request_id': ilRequestId, 'in_user_id': userId}, 'out_result');
   return rdo;
}

function deleteInterlockContactDataByIlId(ilRequestId, userId){
	return deactivateInterlockHash(ilRequestId, userId);
}

function deleteInterlockRequestMessageByIlId(ilRequestId, userId){
	var rdo = !ilRequestId && !userId ? null :
		db.executeScalarManual(spDeleteInterlockRequestMessageById,
			{'in_interlock_request_id': ilRequestId, 'in_user_id': userId},
			'out_result');
	return rdo;
}

function getInterlockUserId(interlock_id){
	var params = {};
    params.in_interlock_id = interlock_id;
	var result = db.executeProcedureManual(spUpdInterlockStatus, params, 'out_result');
	var list = db.extractArray(result.out_result); 
    if(list.length)
		return list[0].CREATED_USER_ID;
	else
		return null;
}

function deleteInterlockRequestMessageByHl4Id(hl4){
	var params = {};
    params.in_hl4_id = hl4.in_hl4_id;
    params.in_user_id = hl4.in_user_id;
	var rdo = !hl4 ? null : db.executeScalarManual(spDelInterlockRequestMessageByHl4Id, params, 'out_result');
    return rdo;
}


function getMessagesByInterlockRequest(interlockRequestId,autoCommit){

	var params = {
		'in_interlock_request_id' : interlockRequestId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeProcedure(spGetInterlockMessageByInterlockId,params);
	}else{
		rdo = db.executeProcedureManual(spGetInterlockMessageByInterlockId,params);
	}

	return db.extractArray(rdo.out_result);

}

function updateContactData(interlockContactDataId, hash, modifiedUserId,autoCommit){
	var params = {
		'in_interlock_contact_data_id' : interlockContactDataId,
		'in_hash'  : hash,
		'in_modified_user_id': modifiedUserId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spUpdContactData,params,'out_result');
	}else{
		rdo = db.executeScalarManual(spUpdContactData,params,'out_result');
	}
	return rdo;

}