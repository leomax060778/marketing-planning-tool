$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dbCurrency = mapper.getDataCurrency();
/** ***********END INCLUDE LIBRARIES*************** */

function getCurrencyValueId(id){
	return dbCurrency.getCurrencyValueId(id);
}

function  getAllCurrency(budgetYearId){
	return dbCurrency.getAllCurrency(budgetYearId);
}

function existsCurrency(id, abbr, budgetYearId){
	return dbCurrency.existsCurrency(id, abbr, budgetYearId);
}

function InsertOrUpdateCurrency(currencies, budgetYearId){
	for (var i = 0; i < currencies.length; i++) {
		var current = currencies[i];
		var exists = existsCurrency(0, current.CURRENCY_ABBREVIATION,budgetYearId);
		if (!exists) {
			dbCurrency.InsertCurrency(current.COUNTRY, current.CURRENCY_ABBREVIATION, current.CURRENCY_ABBREVIATION,
				current.CURRENCY_VALUE, current.CREATED_USER_ID, budgetYearId);
		} else {
			dbCurrency.UpdateCurrency(current.COUNTRY, current.CURRENCY_ABBREVIATION, current.CURRENCY_ABBREVIATION,
				current.CURRENCY_VALUE, current.CREATED_USER_ID, budgetYearId);
		}
	}
	return 0;
}
