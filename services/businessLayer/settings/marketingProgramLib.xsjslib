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

    return dataMarketingProgram.insertMarketingProgram(payload.IN_NAME, userId);
}
function existMarketingProgramByName(payload) {
    return !!dataMarketingProgram.getMarketingProgramByName(payload.IN_NAME);

}

function updateMarketingProgram(campaignSubTypeData, userId) {
    return dataMarketingProgram.updateMarketingProgram(campaignSubTypeData.IN_MARKETING_PROGRAM_ID, campaignSubTypeData.IN_NAME, userId);
}

function deleteMarketingProgram(campaignSubTypeData, userId) {

    if (!campaignSubTypeData.IN_MARKETING_PROGRAM_ID)
        throw ErrorLib.getErrors().CustomError("",
            "marketingProgramServices/handleDelete/deleteMarketingProgram",
            "The MARKETING_PROGRAM_ID is not found");

    return dataMarketingProgram.deleteMarketingProgram(campaignSubTypeData.IN_MARKETING_PROGRAM_ID, userId);
}