/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataPartner = mapper.getDataPartner();
var db = mapper.getdbHelper();
var dbInterlock = mapper.getDataInterLock();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/
function getAllPartnerType(){
	return dataPartner.getAllPartnerType();
}

function getPartnerByHl4Id(hl4Id){
	var partners = dataPartner.getPartnerByHl4Id(hl4Id);
	var total = 0;
	partners.forEach(function(partner){
		total = total + Number(partner.VALUE);
	});
	return {"partners": partners, "total": total};
}

function getPartnerByHl5Id(hl5Id){
	var partners = dataPartner.getPartnerByHl5Id(hl5Id);
	var total = 0;
	partners.forEach(function(partner){
		total = total + Number(partner.VALUE);
	});
	return {"partners": partners, "total": total};
}

function getPartnerByHl6Id(hl6Id){
	var partners = dataPartner.getPartnerByHl6Id(hl6Id);
	var total = 0;
	partners.forEach(function(partner){
		total = total + Number(partner.VALUE);
	});
	return {"partners": partners, "total": total};
}