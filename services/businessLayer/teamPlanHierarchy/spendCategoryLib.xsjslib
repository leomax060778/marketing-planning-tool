/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var data = mapper.getDataSpendCategory();
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/

function getSpendCategory(levelId, userId){
	return data.getSpendCategory(levelId, userId);
}

function insertSpendCategory(spendCategory, createUser) {
	if (validateSpendCategory(spendCategory)) {
		return data.insertSpendCategory(spendCategory, createUser);
	}
}

function updateSpendCategory(spendCategory, updateUser) {
	if (!util.validateIsNumber(spendCategory.SPEND_CATEGORY_ID))
		throw ErrorLib.getErrors().CustomError("",
				"spendCategoryServices/handlePost/updateSpendCategory", "The SPEND_CATEGORY_ID is invalid");

	if (validateSpendCategory(spendCategory)) {
		return data.updateSpendCategory(spendCategory, updateUser);
	}
}

function deleteSpendCategory(spendCategory, deleteUser) {
	if (!spendCategory.SPEND_CATEGORY_ID)
		throw ErrorLib.getErrors().CustomError("",
				"spendCategoryServices/handleDelete/deleteSpendCategory",
				"The SPEND_CATEGORY_ID is not found");

	if (!util.validateIsNumber(spendCategory.SPEND_CATEGORY_ID))
		throw ErrorLib.getErrors().CustomError("",
				"spendCategoryServices/handleDelete/deleteSpendCategory", "The SPEND_CATEGORY_ID is invalid");

	return data.deleteSpendCategory(spendCategory, deleteUser);
}

function validateSpendCategory(spendCategory) {
	if (!spendCategory)
		throw ErrorLib.getErrors().CustomError("",
				"spendCategoryServices", "Spend Category is not found");
	
	if (!spendCategory.NAME)
		throw ErrorLib.getErrors().CustomError("",
				"spendCategoryServices",
				"The NAME is not found");
	return true;
}