/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var dDistributionChannelLib = mapper.getDistributionChannel();
/******************************************/

function processRequest(){
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handlePost(reqBody, userId) {
    var result = dDistributionChannelLib.insertDistributionChannel(reqBody, userId);
    return	httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePut(reqBody, userId) {
    var result = dDistributionChannelLib.updateDistributionChannel(reqBody, userId);
    return	httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handleDelete(reqBody, userId) {
    var result = dDistributionChannelLib.deleteDistributionChannel(reqBody.IN_DISTRIBUTION_CHANNEL_ID, userId);
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handleGet(parameters) {
    var rdo = {};
    var method = parameters.get("METHOD");
    switch (method) {
        case 'GET_BY_ID':
            var distributionChannelId = parameters.get("DISTRIBUTION_CHANNEL_ID");
            rdo = dDistributionChannelLib.getDistributionChannelById(distributionChannelId);
            break;
        default:
            rdo = dDistributionChannelLib.getAllDistributionChannel();
    }
    return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

processRequest();