$.import("xsplanningtool.services.commonLib", "mapper");
$.import("xsplanningtool.services.commonLib", "httpLib");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpLib = $.xsplanningtool.services.commonLib.httpLib;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_ATTACHMENT = "INS_ATTACHMENT";
var GET_ATTACHMENT = "GET_ATTACHMENT_BY_ID";
var UPD_ATTACHMENT = "UPD_ATTACHMENT";
var DEL_ATTACHMENT = "DEL_ATTACHMENT";

// PARTNER_ATTACHMENT
var GET_ATTACHMENT_BY_PARTNER_ID = "GET_ATTACHMENT_BY_PARTNER_ID";
var GET_ATTACHMENT_BY_BUDGET_SPEND_REQUEST_ID = "GET_ATTACHMENT_BY_BUDGET_SPEND_REQUEST_ID";
var INS_PARTNER_ATTACHMENT = "INS_PARTNER_ATTACHMENT";
var DEL_PARTNER_ATTACHMENT = "DEL_PARTNER_ATTACHMENT";

//Insert Attachments
function insertAttachment(objAttachment, userId) {
    var parameters = {};
    parameters.in_original_name = objAttachment.ORIGINAL_NAME;
    parameters.in_saved_name = objAttachment.SAVED_NAME;
    parameters.in_attachment_size = objAttachment.ATTACHMENT_SIZE;
    parameters.in_attachment_type = objAttachment.ATTACHMENT_TYPE;
    parameters.in_created_user_id = userId;//objAttachment.CREATED_USER_ID;
    parameters.out_result = '?';

    return db.executeScalarManual(INS_ATTACHMENT, parameters, 'out_result');
}

//Insert Attachments
function insertAttachmentPartner(objAttachment, userId) {
    var parameters = {};
    parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
    parameters.in_budget_spend_request_id = objAttachment.BUDGET_SPEND_REQUEST_ID;
    parameters.in_hierarchy_level_id = objAttachment.HIERARCHY_LEVEL_ID;
    parameters.in_created_user_id = userId;//objAttachment.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_PARTNER_ATTACHMENT, parameters, 'out_result');
}

//Get attachment by ID
function getAttachment(attachmentId) {
    var parameters = {};
    parameters.in_attachment_id = attachmentId;
    var result = db.executeProcedure(GET_ATTACHMENT, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getManualAttachment(attachmentId) {
    var parameters = {};
    parameters.in_attachment_id = attachmentId;
    var result = db.executeProcedureManual(GET_ATTACHMENT, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getAttachmentByPartnerId(partnerId, hierarchyLevelId, userId){
	var parameters = {};
    parameters.in_partner_id = partnerId;
    parameters.in_hierarchy_level_id = hierarchyLevelId;
    var result = db.executeProcedureManual(GET_ATTACHMENT_BY_PARTNER_ID, parameters);
    
    return db.extractArray(result.out_result);
}

function getAttachmentByBudgetSpendRequestId(budgetSpendRequestId, hierarchyLevelId, userId){
	var parameters = {};
    parameters.in_budget_spend_request_id = budgetSpendRequestId;
    parameters.in_hierarchy_level_id = hierarchyLevelId;
    var result = db.executeProcedureManual(GET_ATTACHMENT_BY_BUDGET_SPEND_REQUEST_ID, parameters);
    
    return db.extractArray(result.out_result);
}

//Update Attachment
function updateAttachment(objAttachment, userId) {
    var parameters = {};
    parameters.in_modified_user_id = userId;//objAttachment.USER_ID;
    parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
    parameters.in_original_name = objAttachment.ORIGINAL_NAME;
    parameters.in_saved_name = objAttachment.SAVED_NAME;
    parameters.in_attachment_size = objAttachment.ATTACHMENT_SIZE;
    parameters.out_result = '?';
    return db.executeScalarManual(UPD_ATTACHMENT, parameters, 'out_result');
}

//Delete Attachment
function deleteAttachment(objAttachment, userId) {
    var parameters = {};
    parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
    parameters.in_modified_user_id = userId;//objAttachment.MODIFIED_USER_ID;
    parameters.out_result = '?';

    return db.executeScalarManual(DEL_ATTACHMENT, parameters, 'out_result');
}

//Delete Partner Attachment
function deletePartnerAttachment(reqBody, userId) {
    var parameters = {};
    parameters.in_attachment_id = reqBody.ATTACHMENT_ID;
    parameters.in_budget_spend_request_id = reqBody.BUDGET_SPEND_REQUEST_ID;
    parameters.in_modified_user_id = userId;//objAttachment.MODIFIED_USER_ID;
    parameters.out_result = '?';

    return db.executeScalarManual(DEL_PARTNER_ATTACHMENT, parameters, 'out_result');
}