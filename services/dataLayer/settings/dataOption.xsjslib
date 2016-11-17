/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetOptionCountByCategoryId = "GET_OPTION_COUNT_BY_CATEGORY_ID";
var spGetOptionByCategoryId =  "GET_OPTION_BY_CATEGORY_ID";
var spInsOption = "INS_OPTION";
/******************************************************/

function getOptionCountByCategoryId(categoryId){	
	if(categoryId){
		return db.executeScalarManual(spGetOptionCountByCategoryId, {'in_category_id':categoryId}, "out_option");
	}	
	return null;
}

function getOptionByCategoryId(category_id){
	params = {"in_category_id":category_id};
	var rdo = db.executeProcedure(spGetOptionByCategoryId,params);
	return db.extractArray(rdo);
}

function insertOption(option,userId){
	params = {
			"in_category_id":option.CATEGORY_ID,
			"in_name" : option.NAME,
			"in_order_option":option.ORDER_OPTION,
			"in_user_id":userId
			};
	var rdo = db.executeScalar(spInsOption,params,"out_option_id");
	return db.extractArray(rdo);
}