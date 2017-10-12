/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
//STORE PROCEDURE LIST NAME
var GET_ALL_DISTRIBUTION_CHANNEL = "GET_ALL_DISTRIBUTION_CHANNEL";
var GET_DISTRIBUTION_CHANNEL_BY_ID = "GET_DISTRIBUTION_CHANNEL_BY_ID";
var GET_DISTRIBUTION_CHANNEL_BY_NAME = "GET_DISTRIBUTION_CHANNEL_BY_NAME";
var GET_DISTRIBUTION_CHANNEL_BY_CRM_KEY = "GET_DISTRIBUTION_CHANNEL_BY_CRM_KEY";
var INS_DISTRIBUTION_CHANNEL = "INS_DISTRIBUTION_CHANNEL";
var UPD_DISTRIBUTION_CHANNEL = "UPD_DISTRIBUTION_CHANNEL";
var DEL_DISTRIBUTION_CHANNEL = "DEL_DISTRIBUTION_CHANNEL";

function getAllDistributionChannel(){
    var rdo = db.executeProcedureManual(GET_ALL_DISTRIBUTION_CHANNEL, {});
    return db.extractArray(rdo.out_result);
}

function getDistributionChannelById(distributionChannelId){
    if(distributionChannelId){
        var params = {
            'in_distribution_channel_id': distributionChannelId
        };
        var rdo = db.executeProcedureManual(GET_DISTRIBUTION_CHANNEL_BY_ID,params);
        return db.extractArray(rdo.out_result)[0];
    }
    return null;
}

function getDistributionChannelByName(name) {
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_DISTRIBUTION_CHANNEL_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if (result.length)
        return result[0];
    return null;
}

function getDistributionChannelByCrmKey(crmKey) {
    var parameters = {'IN_CRM_KEY': crmKey};
    var list = db.executeProcedureManual(GET_DISTRIBUTION_CHANNEL_BY_CRM_KEY, parameters);
    var result = db.extractArray(list.out_result);
    if (result.length)
        return result[0];
    return null;
}

function insertDistributionChannel(name, crmKey, userId){
    var params = {
        IN_NAME: name,
        IN_CRM_KEY : crmKey,
        IN_USER_ID:userId
    };
    return db.executeScalar(INS_DISTRIBUTION_CHANNEL,params,"out_result");
}

function updateDistributionChannel(distributionChannelId, name, crmKey, userId){
    var params = {
        IN_DISTRIBUTION_CHANNEL_ID: distributionChannelId,
        IN_NAME: name,
        IN_CRM_KEY : crmKey,
        IN_USER_ID: userId
    };
    return db.executeScalar(UPD_DISTRIBUTION_CHANNEL,params,"out_result");
}

function deleteDistributionChannel(distributionChannelId, userId){
    var params = {
        IN_DISTRIBUTION_CHANNEL_ID: distributionChannelId,
        IN_USER_ID: userId
    };
    return db.executeScalar(DEL_DISTRIBUTION_CHANNEL,params,"out_result");
}