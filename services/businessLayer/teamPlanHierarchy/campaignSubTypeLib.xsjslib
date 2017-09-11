$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataCampaignSubType = mapper.getDataCampaignSubType();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllCampaignSubType(idCampaignType) {
    return dataCampaignSubType.getAllCampaignSubType();
}

function getAllCampaignSubTypeByTypeId(idCampaignType) {
    return dataCampaignSubType.getAllCampaignSuTypeByCampaignTypeId(idCampaignType);
}

function getAllCampaignSubTypeById(idCampaignSubType) {
    return dataCampaignSubType.getCampaignSubTypeById(idCampaignSubType);
}
