/****** libs ************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var config = mapper.getDataConfig();
/******************************************/

var spSAVE_TRACE = "SAVE_TRACE";

var traceType = {
    'DB_ENTER': 1,
    'DB_LEAVE': 2,
    'LIB_ENTER': 3,
    'LIB_LEAVE': 4,
    'SERVICE_ENTER': 5,
    'SERVICE_LEAVE': 6,
    'MISC_ENTER': 7,
    'MISC_LEAVE': 8
}

function trace(caller, method, data, user, type) {

try {
    if (config.getDebugMode() == 1) {

        type = traceType[type] || traceType['MISC_ENTER'];
        caller = caller || 'ANY';
        method = method || 'ANY';
        data = data || 'ANY';
        user = user || 0;
        var timestamp = new Date().getTime();
        var transaction = $.request.TRANSACTION;

        var trace = {
            TYPE: type,
            CALLER: caller,
            METHOD: method,
            DATA: JSON.stringify(data),
            USER: user,
            TIMESTAMP: timestamp,
            TRANSACTION: transaction || "Unknown",
            PATH: $.request.path
        };
        db.executeProcedureManual(spSAVE_TRACE, trace, true);
    }
}catch (e){
    //do nothing
}
}
