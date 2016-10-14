/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetOptionCountByCategoryId = "GET_OPTION_COUNT_BY_CATEGORY_ID";
/******************************************************/

function getOptionCountByCategoryId(categoryId){	
	if(categoryId){
		return db.executeScalarManual(spGetOptionCountByCategoryId, {'in_category_id':categoryId}, "out_option");
	}	
	return null;
}