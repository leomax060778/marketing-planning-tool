$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_CAMPAIGN_TYPE = "GET_ALL_CAMPAIGN_TYPE";
var GET_CAMPAIGN_TYPE_BY_ID = "GET_CAMPAIGN_TYPE_BY_ID";
var GET_CAMPAIGN_TYPE_BY_OBJECTIVE_ID = "GET_CAMPAIGN_TYPE_BY_OBJECTIVE_ID";
var GET_CAMPAIGN_TYPE_BY_NAME = "GET_CAMPAIGN_TYPE_BY_NAME";
var INS_CAMPAIGN_TYPE = "INS_CAMPAIGN_TYPE";
var UPD_CAMPAIGN_TYPE = "UPD_CAMPAIGN_TYPE";
var DEL_CAMPAIGN_TYPE = "DEL_CAMPAIGN_TYPE";

function getAllCampaignType() {
    var parameters = {};
    var data = db.executeProcedureManual(GET_ALL_CAMPAIGN_TYPE, parameters);
    return db.extractArray(data.out_result);
}

function getCampaignTypeById(idCampaignType) {
    var parameters = {'in_campaign_type_id': idCampaignType};
    var data = db.executeProcedureManual(GET_CAMPAIGN_TYPE_BY_ID, parameters);
    var result = db.extractArray(data.out_result);
    if (result.length)
        return result[0];
    else
        return null;
}

function getCampaignTypeByObjectiveId(objectiveId) {
    var parameters = {'in_objective_id': objectiveId};
    var data = db.executeProcedureManual(GET_CAMPAIGN_TYPE_BY_OBJECTIVE_ID, parameters);
    var result = db.extractArray(data.out_result);
    if (result.length)
        return result;
    else
        return null;
}

function insertCampaignType(name, additionalFields, userId) {
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_CREATED_USER_ID = userId;
    parameters.IN_SHOW_ADDITIONAL_FIELDS = additionalFields;
    return db.executeScalarManual(INS_CAMPAIGN_TYPE, parameters, "out_result");
}

function getCampaignTypeByName(name) {
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_CAMPAIGN_TYPE_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if (result.length)
        return result[0];
    return null;
}
function updateCampaignType(campaignTypeId, name, additionalFields, userId) {
    var parameters = {};
    parameters.IN_CAMPAIGN_TYPE_ID = campaignTypeId;
    parameters.IN_NAME = name;
    parameters.IN_MODIFIED_USER_ID = userId;
    parameters.IN_SHOW_ADDITIONAL_FIELDS = additionalFields;
    return db.executeScalarManual(UPD_CAMPAIGN_TYPE, parameters, "out_result");
}

function deleteCampaignType(campaignTypeId, userId) {
    var parameters = {};
    parameters.IN_CAMPAIGN_TYPE_ID = campaignTypeId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_CAMPAIGN_TYPE, parameters, "out_result");
}