/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbCategory = mapper.getDataCategory();
var dbCategoryOption = mapper.getDataOption();
/*************************************************/

function getAllocationCategoryByName(name){
	return dbCategory.getAllocationCategoryByName(name);
}

function insertAllocationCategory(data, userId) {

	//validate if exists another category with same name
	var objAllocationCat = dbCategory.getAllocationCategoryByName(data.NAME);
	if(objAllocationCat)
		throw ErrorLib.getErrors().CustomError("","AllocationCategoryService", "Cannot create the category beacause exists another with same name");

	var result = dbCategory.insertAllocationCategory(data.DESCRIPTION,
		data.NAME,
		data.MEASURE_ID,
		userId);
	return result;
}

function getAllocationCategory(){
	return dbCategory.getAllocationCategory();
}

//return Categories with filtering by enable = 1 or deleted = 0
function getAllAllocationCategory(){
	return dbCategory.getAllAllocationCategory();
}

function getAllocationCategoryById(id){
	return dbCategory.getAllocationCategoryById(id);

}

function getCategoryInUseByCategoryId(categoryId){
	return dbCategory.getCategoryInUseByCategoryId(categoryId);

}

function getCategoryByHierarchyLevelId(hierarchy_level_id){
	return dbCategory.getCategoryByHierarchyLevelId(hierarchy_level_id);

}

function updateAllocationCategory(data, userId) {
	return dbCategory.updateAllocationCategory(data.CATEGORY_ID,
		data.DESCRIPTION, data.NAME, data.MEASURE_ID,
		userId);

}


function deleteAllocationCategory(categoryId, userId){
	return dbCategory.deleteAllocationCategory(categoryId, userId);

}

function getOptionByLevelByCategory(hierarchy_level_id, allocation_category_id){
	return dbCategoryOption.getOptionByLevelByCategory(hierarchy_level_id, allocation_category_id);
}