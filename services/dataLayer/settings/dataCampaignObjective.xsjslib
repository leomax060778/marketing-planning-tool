/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var spInsertObjectiveCampaignType = "INS_OBJECTIVE_CAMPAIGN_TYPE";
var spDeleteObjectiveCampaignType = "DEL_OBJECTIVE_CAMPAIGN_TYPE";
var DEL_OBJECTIVE_CAMPAIGN_TYPE_BY_CAMPAIGN_TYPE_ID = "DEL_OBJECTIVE_CAMPAIGN_TYPE_BY_CAMPAIGN_TYPE_ID";
var DEL_OBJECTIVE_CAMPAIGN_TYPE_BY_OBJECTIVE_ID = "DEL_OBJECTIVE_CAMPAIGN_TYPE_BY_OBJECTIVE_ID";
var DEL_OBJECTIVE_CAMPAIGN_TYPE_BY_CAMPAIGN_SUB_TYPE_ID = "DEL_OBJECTIVE_CAMPAIGN_TYPE_BY_CAMPAIGN_SUB_TYPE_ID";

function insertObjectiveCampaignType(objectiveId, campaignSubTypeId, campaignTypeId, createUser) {
    var parameters = {
        in_objective_id: objectiveId,
        in_campaign_sub_type_id: campaignSubTypeId,
        in_campaign_type_id: campaignTypeId,
        in_created_user_id: createUser
    };

    return db.executeScalarManual(spInsertObjectiveCampaignType, parameters,
        "out_objective_campaign_type_id");
}
function deleteObjectiveCampaignType(objectiveId, campaignTypeId, createUser) {
    var parameters = {
        in_objective_id: objectiveId,
        in_campaign_type_id: campaignTypeId
    };

    return db.executeScalarManual(spDeleteObjectiveCampaignType, parameters,
        "out_result");
}

function deleteObjectiveCampaignTypeByCampaignTypeId(campaignTypeId){
    var parameters = {
        in_campaign_type_id: campaignTypeId
    };

    return db.executeScalarManual(DEL_OBJECTIVE_CAMPAIGN_TYPE_BY_CAMPAIGN_TYPE_ID, parameters,
        "out_result");
}

function deleteObjectiveCampaignTypeByObjectiveId(objectiveId){
    var parameters = {
        in_objective_id: objectiveId
    };

    return db.executeScalarManual(DEL_OBJECTIVE_CAMPAIGN_TYPE_BY_OBJECTIVE_ID, parameters,"out_result");
}

function deleteObjectiveCampaignTypeByCampaignSubTypeId(campaignSubTypeId){
    var parameters = {
        in_campaign_sub_type_id: campaignSubTypeId
    };

    return db.executeScalarManual(DEL_OBJECTIVE_CAMPAIGN_TYPE_BY_CAMPAIGN_SUB_TYPE_ID, parameters,"out_result");
}