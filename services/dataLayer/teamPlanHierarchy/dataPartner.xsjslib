/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetPartnerByHl4Id = "GET_HL4_PARTNER_BY_HL4_ID";
var spGetPartnerById = "GET_HL4_BY_ID";
var spGetAllPartnerType = "GET_ALL_PARTNER_TYPE";
var spInsertHl4Partner = "INS_HL4_PARTNER";

var spDeletetHl4Partner = "DEL_HL4_PARTNER_BY_HL4_ID";
/******************************************************/

function getPartnerByHl4Id(id){	
	if(id){
		var rdo = db.executeProcedure(spGetPartnerByHl4Id, {'in_hl4_id':id});
		return db.extractArray(rdo.out_hl4_partner);
	}	
	return null;
}

function getPartnerById(id){
	if(id != ""){
		var rdo = db.executeProcedure(spGetPartnerById,{'in_partner_id':id});
		return db.extractArray(rdo.out_hl4);
	}	
	return null;
}

function getAllPartnerType(){
	var rdo = db.executeProcedure(spGetAllPartnerType,{});
	return db.extractArray(rdo.out_partner_type);
}

function insertHl4Partner(parameters){
		var rdo = db.executeScalarManual(spInsertHl4Partner, parameters, 'out_hl4_partner_id');
		return rdo;
}

function deleteHl4Partner(parameters){
    var rdo = db.executeScalarManual(spDeletetHl4Partner, parameters, 'out_result');
    return rdo;
}