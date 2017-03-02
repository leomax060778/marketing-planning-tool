/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbCategory = mapper.getDataCategory();
/*************************************************/


function insertAllocationCategory(data, userId) {

		var result = dbCategory.insertAllocationCategory(data.DESCRIPTION,
			data.NAME,
			data.MEASURE_ID,
			userId);
	return result;
}
function getAllocationCategory(){
	return dbCategory.getAllocationCategory();
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