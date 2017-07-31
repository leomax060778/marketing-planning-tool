/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbBudget = mapper.getDataBudgetYear();
var util = mapper.getUtil();
/*************************************************/
var BUDGET_YEAR_NOT_FOUND = "The Budget Year can not be found.";
var MSG_ID_NOT_FOUND = "The Parameter ID is not found";
var MSG_LEVEL_NOT_FOUND = "The Parameter level is not found";
var BUDGET_YEAR_IS_USED = "Cannot delete the current Budget Year because it is used.";
var MSG_MISSING_DATA = "Data is missing.";
var MSG_BUDGET_YEAR_NOT_FOUND = "Budget Year not found.";
var MSG_INVALID_BUDGET_YEAR = "Another Budget Year with the same year already exist.";
var MSG_ACTUAL_START_DATE_NOT_FOUND = "Invalid Budget Year ACTUAL START DATE.";
var MSG_ACTUAL_END_DATE_NOT_FOUND = "Invalid Budget Year ACTUAL END DATE.";
var MSG_VERSIONED_START_DATE_NOT_FOUND = "Invalid Budget Year VERSIONED START DATE.";
var MSG_VERSIONED_END_DATE_NOT_FOUND = "Invalid Budget Year VERSIONED END DATE.";
var MSG_INVALID_DATE_RANGE = "Invalid Budget Year DATE RANGE.";
var MSG_DATE_RANGE_OVERLAPPING = "Date range is overlapped with another Budget Year date range.";

var map = {
	"in_budget_year_id": "BUDGET_YEAR_ID",
	"in_budget_year":  "BUDGET_YEAR",
	"in_start_date":  "START_DATE",
	"in_end_date":  "END_DATE",
	"in_default_year":  "DEFAULT_YEAR",
	"in_description":  "DESCRIPTION"
};

var LEVEL = {
	HL1: 1
	, HL2: 2
	, HL3: 3
};

function getAllBudgetYear(){
	return dbBudget.getAllBudgetYear();
}

function getDefaultBudgetYear(){
	var arrBy = getAllBudgetYear();

	var defaultBudgetYear = arrBy.find( function (by){
		return by.DEFAULT_YEAR == 1;
	});
	return defaultBudgetYear;
}

function checkDefautBudgetYear(budgetYear) {
	return budgetYear.DEFAULT_YEAR === 1;
}

function getLockFlagByHlIdLevel(hlId, level){
	if(!hlId)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "budgetYearServices/handleGet/getLockFlagByHlIdLevel", MSG_ID_NOT_FOUND);

    if(!level)
        throw ErrorLib.getErrors().BadRequest("The Parameter level is not found", "budgetYearServices/handleGet/getLockFlagByHlIdLevel", MSG_LEVEL_NOT_FOUND);

    return dbBudget.getLockFlagByHlIdLevel(hlId, LEVEL[level]);
}

function insertBudgetYear(budgetYear, userId){
	budgetYear = uiToServerParser(budgetYear);
	validate(budgetYear);

	if(Number(budgetYear.DEFAULT_YEAR))
		dbBudget.resetAllBudgetYearDefaultYear(0, userId);

	return dbBudget.insertBudgetYear(budgetYear.BUDGET_YEAR, budgetYear.START_DATE, budgetYear.END_DATE, Number(budgetYear.DEFAULT_YEAR), budgetYear.DESCRIPTION, budgetYear.VERSIONED_START_DATE, budgetYear.VERSIONED_END_DATE, userId);
}

function updateBudgetYear(budgetYear, userId){
	budgetYear = uiToServerParser(budgetYear);

	//if (!budgetYear.BUDGET_YEAR_ID)
	//	throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePut/updateBudgetYear", BUDGET_YEAR_NOT_FOUND);

	validate(budgetYear);

	if(Number(budgetYear.DEFAULT_YEAR))
		dbBudget.resetAllBudgetYearDefaultYear(budgetYear.BUDGET_YEAR_ID, userId);

	return dbBudget.updateBudgetYear(budgetYear.BUDGET_YEAR_ID, budgetYear.BUDGET_YEAR, budgetYear.START_DATE, budgetYear.END_DATE, Number(budgetYear.DEFAULT_YEAR), budgetYear.DESCRIPTION, budgetYear.VERSIONED_START_DATE, budgetYear.VERSIONED_END_DATE, userId);
}

function deleteBudgetYear(budgetYear, userId){
	var budgetYearId = budgetYear.in_budget_year_id;
	if (!budgetYearId)
		throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "budgetYearServices/handleDelete/deleteBudgetYear", BUDGET_YEAR_NOT_FOUND);

	if(dbBudget.getHl1QuantityByBudgetYear(budgetYearId))
		throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "budgetYearServices/handleDelete/deleteBudgetYear", BUDGET_YEAR_IS_USED);

	return dbBudget.deleteBudgetYear(budgetYearId, userId);
}

function validate(data){
	if (!data)
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_MISSING_DATA);

	if(!data.BUDGET_YEAR)
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_BUDGET_YEAR_NOT_FOUND);

	if(existOtherBudgetYear(data))
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_INVALID_BUDGET_YEAR);

	if(!data.START_DATE)
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_ACTUAL_START_DATE_NOT_FOUND);

	if(!data.END_DATE)
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_ACTUAL_END_DATE_NOT_FOUND);

    if(!data.VERSIONED_START_DATE)
        throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_VERSIONED_START_DATE_NOT_FOUND);

    if(!data.VERSIONED_END_DATE)
        throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_VERSIONED_END_DATE_NOT_FOUND);

	if(util.validateDateEndMayorStart((new Date(data.START_DATE)),(new Date(data.END_DATE))))
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData",  MSG_INVALID_DATE_RANGE);

    if(util.validateDateEndMayorStart((new Date(data.VERSIONED_START_DATE)),(new Date(data.VERSIONED_END_DATE))))
        throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData",  MSG_INVALID_DATE_RANGE);

	if(overlappingDates(data))
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData",  MSG_DATE_RANGE_OVERLAPPING);

	data.DESCRIPTION = data.DESCRIPTION || null;
	data.DEFAULT_YEAR = data.DEFAULT_YEAR || 0;

	return data;
}

function existOtherBudgetYear(data){
	var budgetYear = dbBudget.getBudgetYear(data.BUDGET_YEAR);
	return budgetYear && budgetYear.BUDGET_YEAR_ID != data.BUDGET_YEAR_ID;
}

function overlappingDates(data){
	var allBudgetYear = getAllBudgetYear();
	var isOrverLappeing = 0;
	allBudgetYear.forEach(function(budgetYear){
		if(!(new Date(data.START_DATE).valueOf() < new Date(budgetYear.START_DATE).valueOf()
			&& new Date(data.END_DATE).valueOf() < new Date(budgetYear.START_DATE).valueOf())
			&& !(new Date(data.START_DATE).valueOf() > new Date(budgetYear.END_DATE).valueOf()
			&& new Date(data.END_DATE).valueOf() > new Date(budgetYear.END_DATE).valueOf())
			&& budgetYear.BUDGET_YEAR_ID != data.BUDGET_YEAR_ID){

			++isOrverLappeing;
		}
	});

	return !!isOrverLappeing;
}

function uiToServerParser(object) {
	var data = JSON.stringify(object, function (key, value) {
		if (Array.isArray(value)) {
			return value;
		} else if (value && typeof value === 'object') {
			var replacement = {};
			Object.keys(value).forEach(function (k) {
				replacement[map[k] || k] = value[k];
			});
			return replacement;
		}
		return value;
	});

	data = JSON.parse(data);

	return data;
}

function getBudgetYearByLevelParent(level, hlId, toFilter){
	if(toFilter)
		return dbBudget.getBudgetYearByLevelParent(level, hlId);

	return dbBudget.getBudgetYearByLevelParent(level, hlId).BUDGET_YEAR_ID;
}