/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetCurrencyById = "GET_CURRENCY_VALUE_BY_ID";
var spGET_ALL_CURRENCY = "GET_ALL_CURRENCY";
var spGET_CURRENCY = "GET_CURRENCY";
var spINS_CURRENCY = "INS_CURRENCY";
var spUPD_CURRENCY = "UPD_CURRENCY";
/******************************************************/
function InsertCurrency(country, abbr, currencyName, value, userId, budgetYearId,autoCommit){
	var params = {
		'in_country' : country,
		'in_currency_abbreviation': abbr,
		'in_currency_name': currencyName,
		'in_currency_value_admin': value,
		'in_user_id': userId,
		'in_budget_year_id': budgetYearId
	}

	if(autoCommit){
		var result =db.executeScalar(spINS_CURRENCY, params, 'out_euro_conversion_id');
	}else{
		var result =db.executeScalarManual(spINS_CURRENCY, params, 'out_euro_conversion_id');
	}

	return result;
}

function UpdateCurrency(country, abbr, currencyName, value, userId, budgetYearId,autoCommit){
	var params = {
		'in_country' : country,
		'in_currency_abbreviation': abbr,
		'in_currency_name': currencyName,
		'in_currency_value_admin': value,
		'in_user_id': userId,
		'in_budget_year_id': budgetYearId
	}

	if(autoCommit){
		var result =db.executeScalar(spUPD_CURRENCY, params, 'out_response_id');
	}else{
		var result =db.executeScalarManual(spUPD_CURRENCY, params, 'out_response_id');
	}

	return result;
}

/*getCurrencyValueId*/
function getCurrencyValueId(id){
	if(id){
		return db.executeDecimalManual(spGetCurrencyById, {'in_euro_conversion_id':id}, "out_currency_value");
	}	
	return null;
}
//getAllCurrency
function getAllCurrency(budgetYearId){
	var result =db.executeProcedure(spGET_ALL_CURRENCY, {'in_budget_year_id':budgetYearId });
	return db.extractArray(result.out_result);
}

function existsCurrency(id, abbr, budgetYearId){
	var params = {
		'in_euro_conversion_id' : id,
		'in_currency_abbreviation': abbr,
		'in_budget_year_id': budgetYearId
	}

	var result =db.executeProcedure(spGET_CURRENCY, params);
	var resultExtract = db.extractArray(result.out_result);
	return resultExtract.length > 0;
}