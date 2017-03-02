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

function getPartnerByHl4Id(hl4Id, currencyValueAux){
	return parser(dataPartner.getPartnerByHl4Id(hl4Id), currencyValueAux);
}

function getPartnerByHl5Id(hl5Id, currencyValueAux){
	return parser(dataPartner.getPartnerByHl5Id(hl5Id), currencyValueAux);
}

function getPartnerByHl6Id(hl6Id, currencyValueAux) {
	return parser(dataPartner.getPartnerByHl6Id(hl6Id), currencyValueAux);
}

function parser(partners, currencyValueAux){
	var total = 0;
	var rdo = [];
	partners.forEach(function(partner){
		var obj = {};
		Object.keys(partner).forEach(function(key){
			obj[key] = key == "VALUE" ? (Number(partner.VALUE) * currencyValueAux ).toFixed(2): partner[key];
		});
		rdo.push(obj);
		total = total + parseFloat(obj.VALUE);
	});
	return {"partners": rdo, "total": total};
}