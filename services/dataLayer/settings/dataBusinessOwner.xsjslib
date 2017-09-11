/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
//STORE PROCEDURE LIST NAME
var spGET_ALL_BUSINESS_OWNER = "GET_ALL_BUSINESS_OWNER";
var spGET_BUSINESS_OWNER_BY_ID = "GET_BUSINESS_OWNER_BY_ID";

function getAllBusinessOwner(){
    var params = {
    };
    var rdo = db.executeProcedureManual(spGET_ALL_BUSINESS_OWNER,params);
    return db.extractArray(rdo.output_result);
}

function getBusinessOwnerById(id){
    var params = {
        'in_business_owner_id' : id
    };
    var rdo = db.executeProcedureManual(spGET_BUSINESS_OWNER_BY_ID,params);
    return db.extractArray(rdo.out_result)[0];
}