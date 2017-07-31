/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataObjectiveCampaignType = mapper.getDataCampaignObjective();
var ErrorLib = mapper.getErrors();
var db = mapper.getdbHelper();
/** ********************************************** */

function updateObjectiveCampaignType(parameters, modifiedUserId) {
    var objectiveId = parameters.IN_OBJECTIVE_ID;
    var campaignTypeId = parameters.IN_CAMPAIGN_TYPE_ID;
    var campaignSubTypeList = parameters.IN_CAMPAIGN_SUB_TYPE_LIST;

    if (!objectiveId)
        throw ErrorLib.getErrors().CustomError("",
            "objectiveCampaignTypeServices/handlePost/updateObjectiveCampaignType",
            "The OBJECTIVE is not found");

    if (!campaignTypeId)
        throw ErrorLib.getErrors().CustomError("",
            "objectiveCampaignTypeServices/handlePost/updateObjectiveCampaignType",
            "The CAMPAIGN TYPE is not found");

    var resultTransaction = 0;
    dataObjectiveCampaignType.deleteObjectiveCampaignType(objectiveId, campaignTypeId, modifiedUserId);
    for (var i = 0; i < campaignSubTypeList.length; i++) {
        var campaignSubTypeId = campaignSubTypeList[i];
        resultTransaction = dataObjectiveCampaignType.insertObjectiveCampaignType(objectiveId, campaignSubTypeId, campaignTypeId, modifiedUserId);
    }
    return resultTransaction;
}