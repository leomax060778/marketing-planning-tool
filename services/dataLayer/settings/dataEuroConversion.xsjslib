/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetEuroConversionById = "GET_EURO_CONVERSION_VALUE_BY_ID";
/******************************************************/

function getEuroConversionValueById(id){	
	if(id){
		return db.executeDecimalManual(spGetEuroConversionById, {'in_euro_conversion_id':id}, "out_currency_value");
	}	
	return null;
}