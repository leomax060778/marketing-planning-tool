/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
//STORE PROCEDURE LIST NAME
var spGET_ALL_MARKETING_PROGRAM = "GET_ALL_MARKETING_PROGRAM";
var GET_MARKETING_PROGRAM_BY_NAME = "GET_MARKETING_PROGRAM_BY_NAME";
var spGET_MARKETING_PROGRAM_BY_ID = "GET_MARKETING_PROGRAM_BY_ID";
var INS_MARKETING_PROGRAM = "INS_MARKETING_PROGRAM";
var UPD_MARKETING_PROGRAM = "UPD_MARKETING_PROGRAM";
var DEL_MARKETING_PROGRAM = "DEL_MARKETING_PROGRAM";



function getAllMarketingProgram() {
    var params = {};
    var rdo = db.executeProcedureManual(spGET_ALL_MARKETING_PROGRAM, params);
    return db.extractArray(rdo.output_result);
}

function getMarketingProgramById(id) {
    var params = {
        'in_marketing_program_id': id
    };
    var rdo = db.executeProcedureManual(spGET_MARKETING_PROGRAM_BY_ID, params);
    return db.extractArray(rdo.out_result)[0];
}
function getMarketingProgramByName(name) {
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_MARKETING_PROGRAM_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if (result.length)
        return result[0];
    return null;
}

function insertMarketingProgram(name, description,userId) {
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_DESCRIPTION = description;
    parameters.IN_CREATED_USER_ID = userId;
    return db.executeScalarManual(INS_MARKETING_PROGRAM, parameters, "out_result");
}

function updateMarketingProgram(marketingProgramId, name, description,userId) {
    var parameters = {};
    parameters.IN_MARKETING_PROGRAM_ID = marketingProgramId;
    parameters.IN_NAME = name;
    parameters.IN_DESCRIPTION = description;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(UPD_MARKETING_PROGRAM, parameters, "out_result");
}
function deleteMarketingProgram(marketingProgramId, userId) {
    var parameters = {};
    parameters.IN_MARKETING_PROGRAM_ID = marketingProgramId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_MARKETING_PROGRAM, parameters, "out_result");
}