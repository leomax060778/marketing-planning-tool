/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/*************************************************/
var spGET_APPLICATION_INFO = "GET_APPLICATION_INFO";
/******************************************************/

function getApplicationInfo(){
    var result = db.executeProcedure(spGET_APPLICATION_INFO,{});
    return db.extractArray(result['out_result'])[0];
}
