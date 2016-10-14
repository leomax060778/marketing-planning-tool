/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataPartner = mapper.getDataPartner();
var db = mapper.getdbHelper();
var dbInterlock = mapper.getDataInterLock();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/
function getAllPartnerType(userId){
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