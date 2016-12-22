/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var spInsertObjectiveCampaignType = "INS_OBJECTIVE_CAMPAIGN_TYPE";
var spDeleteObjectiveCampaignType = "DEL_OBJECTIVE_CAMPAIGN_TYPE";


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

