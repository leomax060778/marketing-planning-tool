/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataDistributionChannel = mapper.getDataDistributionChannel();
/*************************************************/

var DISTRIBUTION_CHANNEL_EXISTS = "Distribution channel already exists.";
var DISTRIBUTION_CHANNEL_DATA = "No data found.";
var DISTRIBUTION_CHANNEL_CRM_KEY_EXISTS = "Another distribution channel has the same CRM key.";
var DISTRIBUTION_CHANNEL_NAME = "Distribution channel Name is missing.";
var DISTRIBUTION_CHANNEL_CRM_KEY= "Distribution channel CRM key is missing.";
var DISTRIBUTION_CHANNEL_ID= "Distribution channel ID is missing.";

function getAllDistributionChannel(){
    return dataDistributionChannel.getAllDistributionChannel();
}

function getDistributionChannelById(distributionChannelId){
    if(!distributionChannelId)
        throw ErrorLib.getErrors().CustomError("", "distributionChannelService/handleGet/getDistributionChannelById", DISTRIBUTION_CHANNEL_ID);

    return dataDistributionChannel.getDistributionChannelById(distributionChannelId);
}

function insertDistributionChannel(distributionChannel, userId){
    validate(distributionChannel);
    return dataDistributionChannel.insertDistributionChannel(distributionChannel.IN_NAME, distributionChannel.IN_CRM_KEY, userId);
}

function updateDistributionChannel(distributionChannel,userId){
    if(!distributionChannel.IN_DISTRIBUTION_CHANNEL_ID)
        throw ErrorLib.getErrors().CustomError("", "distributionChannelService/handleGet/getDistributionChannelById", DISTRIBUTION_CHANNEL_ID);

    validate(distributionChannel);
    return dataDistributionChannel.updateDistributionChannel(distributionChannel.IN_DISTRIBUTION_CHANNEL_ID, distributionChannel.IN_NAME, distributionChannel.IN_CRM_KEY, userId);
}

function deleteDistributionChannel(distributionChannelId, userId){
    if(!distributionChannelId)
        throw ErrorLib.getErrors().CustomError("", "distributionChannelService/handleGet/getDistributionChannelById", DISTRIBUTION_CHANNEL_ID);

    return dataDistributionChannel.deleteDistributionChannel(distributionChannelId, userId);
}

function validate(distributionChannel) {
    if(!distributionChannel)
        throw ErrorLib.getErrors().CustomError("", "distributionChannelService/handlePost/validateDistributionChannel", DISTRIBUTION_CHANNEL_DATA);

    if(!distributionChannel.IN_NAME)
        throw ErrorLib.getErrors().CustomError("", "distributionChannelService/handlePost/validateDistributionChannel", DISTRIBUTION_CHANNEL_NAME);

    if(!distributionChannel.IN_CRM_KEY)
        throw ErrorLib.getErrors().CustomError("", "distributionChannelService/handlePost/validateDistributionChannel", DISTRIBUTION_CHANNEL_CRM_KEY);

    var dc = dataDistributionChannel.getDistributionChannelByName(distributionChannel.IN_NAME);
    if(dc && Number(distributionChannel.IN_DISTRIBUTION_CHANNEL_ID) !== Number(dc.DISTRIBUTION_CHANNEL_ID))
        throw ErrorLib.getErrors().CustomError("", "distributionChannelService/handlePost/validateDistributionChannel", DISTRIBUTION_CHANNEL_EXISTS);
    return true;
}