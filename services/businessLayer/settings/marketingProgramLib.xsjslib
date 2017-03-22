$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataMarketingProgram = mapper.getDataMarketingProgram();
/** ***********END INCLUDE LIBRARIES*************** */


var MARKETING_PROGRAM_EXISTS = "A marketing program with that name already exists";

function getAllMarketingProgram(idCampaignType) {
    return dataMarketingProgram.getAllMarketingProgram();
}

function insertMarketingProgram(payload, userId) {

    if (existMarketingProgramByName(payload)) {
        throw ErrorLib.getErrors().BadRequest("", "marketingProgramService/handlePost/insertMarketingProgram", MARKETING_PROGRAM_EXISTS);
    }

    return dataMarketingProgram.insertMarketingProgram(payload.IN_NAME, payload.IN_DESCRIPTION || payload.IN_NAME, userId);
}
function existMarketingProgramByName(payload) {
    var marketingProgram = dataMarketingProgram.getMarketingProgramByName(payload.IN_NAME);
    return !!(marketingProgram && marketingProgram.MARKETING_PROGRAM_ID != payload.IN_MARKETING_PROGRAM_ID);

}

function updateMarketingProgram(campaignSubTypeData, userId) {
    if (existMarketingProgramByName(campaignSubTypeData)) {
        throw ErrorLib.getErrors().BadRequest("", "marketingProgramService/handlePost/insertMarketingProgram", MARKETING_PROGRAM_EXISTS);
    }

    return dataMarketingProgram.updateMarketingProgram(campaignSubTypeData.IN_MARKETING_PROGRAM_ID, campaignSubTypeData.IN_NAME, campaignSubTypeData.IN_DESCRIPTION || campaignSubTypeData.IN_NAME, userId);
}

function deleteMarketingProgram(campaignSubTypeData, userId) {

    if (!campaignSubTypeData.IN_MARKETING_PROGRAM_ID)
        throw ErrorLib.getErrors().CustomError("",
            "marketingProgramServices/handleDelete/deleteMarketingProgram",
            "The MARKETING_PROGRAM_ID is not found");

    return dataMarketingProgram.deleteMarketingProgram(campaignSubTypeData.IN_MARKETING_PROGRAM_ID, userId);
}