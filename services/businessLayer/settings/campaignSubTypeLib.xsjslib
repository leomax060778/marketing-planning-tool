$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataCampaignSubType = mapper.getDataCampaignSubType();
var dataCampaignObjective = mapper.getDataCampaignObjective();
/** ***********END INCLUDE LIBRARIES*************** */


var CAMPAIGN_SUB_TYPE_EXISTS = "The campaign type already exists.";

function getAllCampaignSubType(idCampaignType) {
    return dataCampaignSubType.getAllCampaignSubType();
}

/**
 *
 * @param idCampaignType
 * @param idObjective
 * @param returnMode {string} - "All" or just the assigned C.S.T.
 * @returns {*}
 */
function getAllCampaignSubTypeByTypeId(idCampaignType, idObjective, returnMode) {

    if (returnMode === "All") {
        return {
            assigned: dataCampaignSubType.getAllCampaignSuTypeByCampaignTypeId(idCampaignType, idObjective),
            available: dataCampaignSubType.getAllAvailableCampaignSubTypeByCampaignTypeId(idCampaignType, idObjective)
        };
    } else {
        if(idObjective)
            return dataCampaignSubType.getAllCampaignSuTypeByCampaignTypeId(idCampaignType, idObjective);

        return dataCampaignSubType.getCampaignSuTypeByCampaignTypeId(idCampaignType);
    }
}

function getAllCampaignSubTypeById(idCampaignSubType) {
    return dataCampaignSubType.getCampaignSubTypeById(idCampaignSubType);
}
function insertCampaignSubType(payload, userId) {

    if (existCampaignSubTypeByName(payload)) {
        throw ErrorLib.getErrors().BadRequest("", "campaignTypeService/handlePost/insertCampaignSubType", CAMPAIGN_TYPE_EXISTS);
    }

    return dataCampaignSubType.insertCampaignSubType(payload.IN_NAME, userId);
}
function existCampaignSubTypeByName(payload) {
    return !!dataCampaignSubType.getCampaignSubTypeByName(payload.IN_NAME);

}

function updateCampaignSubType(campaignSubTypeData, userId) {
    return dataCampaignSubType.updateCampaignSubType(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID, campaignSubTypeData.IN_NAME, userId);
}

function updateDateRules(data, userId){
    return dataCampaignSubType.updateDateRules(
        data.CAMPAIGN_TYPE_ID,
        data.CAMPAIGN_SUBTYPE_ID,
        data.VALIDATE_DATE_RULE,
        data.ACTUAL_START_DATE_ROLLOVER_TEXT,
        data.ACTUAL_END_DATE_ROLLOVER_TEXT,
        userId
    );
}

function deleteCampaignSubType(campaignSubTypeData, userId, confirm) {

    if (!campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID)
        throw ErrorLib.getErrors().CustomError("",
            "campaignTypeServices/handleDelete/deleteCampaignSubType",
            "The CAMPAIGN_TYPE_ID is not found");

    if (confirm) {
        dataCampaignObjective.deleteObjectiveCampaignTypeByCampaignSubTypeId(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID);
        return dataCampaignSubType.deleteCampaignSubType(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID, userId);
    } else {
        var countRegisters = dataCampaignSubType.checkInUseCampaignSubTypeById(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID);
        if (countRegisters > 0) {
            throw ErrorLib.getErrors().ConfirmDelete("",
                "objectiveServices/handleDelete/checkInUseCampaignSubTypeById",
                countRegisters);
        } else {
            dataCampaignObjective.deleteObjectiveCampaignTypeByCampaignSubTypeId(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID);
            return dataCampaignSubType.deleteCampaignSubType(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID, userId);
        }
    }
}