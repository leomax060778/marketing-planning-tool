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

function deleteMarketingProgram(marketingProgram, userId, confirm) {

    if (!marketingProgram.IN_MARKETING_PROGRAM_ID)
        throw ErrorLib.getErrors().CustomError("",
            "marketingProgramServices/handleDelete/deleteMarketingProgram",
            "The MARKETING_PROGRAM_ID is not found");
    if (confirm) {
        return dataMarketingProgram.deleteMarketingProgram(marketingProgram.IN_MARKETING_PROGRAM_ID, userId);
    } else {
        var countRegisters = dataMarketingProgram.checkInUseMarketingProgramById(marketingProgram.IN_MARKETING_PROGRAM_ID);
        var retValue = 0;
        if (countRegisters > 0)
            throw ErrorLib.getErrors().ConfirmDelete("",
                "marketingProgramServices/handleDelete/checkInUseMarketingProgramById",
                countRegisters);
        else
            retValue = dataMarketingProgram.deleteMarketingProgram(marketingProgram.IN_MARKETING_PROGRAM_ID, userId);

        return retValue;
    }
}