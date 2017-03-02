$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataCampaignType = mapper.getDataCampaignType();
/** ***********END INCLUDE LIBRARIES*************** */

var CAMPAIGN_TYPE_EXISTS = "The campaign type already exists.";

function getAllCampaignType() {
    return dataCampaignType.getAllCampaignType();
}

function getCampaignTypeById(idCampaignType) {
    return dataCampaignType.getCampaignTypeById(idCampaignType);
}

function getCampaignTypeByObjectiveId(objectiveId) {
    return dataCampaignType.getCampaignTypeByObjectiveId(objectiveId);
}

function insertCampaignType(payload, userId) {

    if (existCampaignTypeByName(payload)) {
        throw ErrorLib.getErrors().BadRequest("", "campaignTypeService/handlePost/insertCampaignType", CAMPAIGN_TYPE_EXISTS);
    }

    return dataCampaignType.insertCampaignType(payload.IN_NAME, payload.IN_SHOW_ADDITIONAL_FIELDS, userId);
}
function existCampaignTypeByName(payload) {
    return !!dataCampaignType.getCampaignTypeByName(payload.IN_NAME);

}

function updateCampaignType(campaignTypeData, userId){
    return dataCampaignType.updateCampaignType(campaignTypeData.IN_CAMPAIGN_TYPE_ID, campaignTypeData.IN_NAME, campaignTypeData.IN_SHOW_ADDITIONAL_FIELDS, userId);
}

function deleteCampaignType(campaignTypeData, userId){

    if (!campaignTypeData.IN_CAMPAIGN_TYPE_ID)
        throw ErrorLib.getErrors().CustomError("",
            "campaignTypeServices/handleDelete/deleteCampaignType",
            "The CAMPAIGN_TYPE_ID is not found");

    return dataCampaignType.deleteCampaignType(campaignTypeData.IN_CAMPAIGN_TYPE_ID, userId);
}