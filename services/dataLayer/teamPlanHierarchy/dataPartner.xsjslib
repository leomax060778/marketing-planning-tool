/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetPartnerByHl4Id = "GET_HL4_PARTNER_BY_HL4_ID";
var spGetAllPartnerType = "GET_ALL_PARTNER_TYPE";
var spInsertHl4Partner = "INS_HL4_PARTNER";
var spDeletetHl4Partner = "DEL_HL4_PARTNER_BY_HL4_ID";

var spGetPartnerByHl5Id = "GET_HL5_PARTNER_BY_HL5_ID";
var spInsertHl5Partner = "INS_HL5_PARTNER";
var spDeletetHl5Partner = "DEL_HL5_PARTNER_BY_HL5_ID";

var spGetPartnerByHl6Id = "GET_HL6_PARTNER_BY_HL6_ID";
var spInsertHl6Partner = "INS_HL6_PARTNER";
var spDeletetHl6Partner = "DEL_HL6_PARTNER_BY_HL6_ID";
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

/*L5*/
function getPartnerHl5ById(id){
	if(id != ""){
		var rdo = db.executeProcedure(spGetHl5PartnerById,{'in_partner_id':id});
		return db.extractArray(rdo.out_hl5);
	}
	return null;
}

function insertHl5Partner(hl5Id, name, partnerTypeId, regionId, value, userId){
	var parameters = {};
	parameters.in_hl5_id = hl5Id;
	parameters.in_partner_name = name;
	parameters.in_partner_type_id = partnerTypeId;
	parameters.in_region_id = regionId;
	parameters.in_value = value;
	parameters.in_created_user_id = userId;
	var rdo = db.executeScalarManual(spInsertHl5Partner, parameters, 'out_hl5_partner_id');
	return rdo;
}

function deleteHl5Partner(hl5Id, userId){
	var parameters = {};
	parameters.in_hl5_id = hl5Id;
	parameters.in_user_id = userId;
	var rdo = db.executeScalarManual(spDeletetHl5Partner, parameters, 'out_result');
	return rdo;
}

function getPartnerByHl5Id(id){
	if(id){
		var rdo = db.executeProcedure(spGetPartnerByHl5Id, {'in_hl5_id':id});
		return db.extractArray(rdo.out_hl5_partner);
	}
	return null;
}

/*L6*/
function getPartnerHl6ById(id){
	if(id != ""){
		var rdo = db.executeProcedure(spGetHl6PartnerById,{'in_partner_id':id});
		return db.extractArray(rdo.out_hl6);
	}
	return null;
}
function insertHl6Partner(hl6Id, name, partnerTypeId, regionId, value, userId){
	var parameters = {};
	parameters.in_hl6_id = hl6Id;
	parameters.in_partner_name = name;
	parameters.in_partner_type_id = partnerTypeId;
	parameters.in_region_id = regionId;
	parameters.in_value = value;
	parameters.in_created_user_id = userId;
	var rdo = db.executeScalarManual(spInsertHl6Partner, parameters, 'out_hl6_partner_id');
	return rdo;
}

function deleteHl6Partner(hl6Id, userId){
	var parameters = {};
	parameters.in_hl6_id = hl6Id;
	parameters.in_modified_user_id = userId;
	var rdo = db.executeScalarManual(spDeletetHl6Partner, parameters, 'out_result');
	return rdo;
}

function getPartnerByHl6Id(id){
	if(id){
		var rdo = db.executeProcedure(spGetPartnerByHl6Id, {'in_hl6_id':id});
		return db.extractArray(rdo.out_result);
	}
	return null;
}