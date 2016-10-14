/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var spGetSpendCategoryByHierarchyLevel = "GET_SPEND_CATEGORY_BY_HL_ID";
var spInsertSpendCategory = "INS_SPEND_CATEGORY";
var spUpdateSpendCategory = "UPD_SPEND_CATEGORY";
var spDeleteSpendCategory = "DEL_SPEND_CATEGORY";

/** *************************************************** */

function getSpendCategory(levelId, userId) {
	var param = {};
	param.in_hl_id = levelId;
	
	var rdo = db.executeProcedure(spGetSpendCategoryByHierarchyLevel, param);
	return db.extractArray(rdo.out_result);
}

function insertSpendCategory(spendCategory, createUser) {
	var param = {};
	param.in_name = spendCategory.NAME;
	param.in_hierarchy_level_id = spendCategory.HL_ID;
	param.in_user_id = createUser; // User that insert

	return db.executeScalar(spInsertSpendCategory, param,
			"out_spend_category_id");
}

function updateSpendCategory(spendCategory, modUser) {
	var param = {};
	param.in_spend_category_id = spendCategory.SPEND_CATEGORY_ID;
	param.in_name = spendCategory.NAME;
	param.in_hierarchy_level_id = spendCategory.HL_ID;
	param.in_user_id = modUser; // User that updates

	return db.executeScalar(spUpdateSpendCategory, param, "out_result");
}

function deleteSpendCategory(spendCategory, modUser) {
	var param = {};
	param.in_spend_category_id = spendCategory.SPEND_CATEGORY_ID;
	param.in_user_id = modUser; // User that deletes

	return db.executeScalar(spDeleteSpendCategory, param, "out_result");
}
