/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbCategory = mapper.getDataCategory();
var dbHl4 = mapper.getDataLevel4();
var dbHl5 = mapper.getDataLevel5();
var dbHl6 = mapper.getDataLevel6();
/*************************************************/


function getCountByHlId(hl){
	return dbCategory.getCountByHlId(hl);
}

function getCategoryByHierarchyLevelId(hierarchy_level_id){
	return dbCategory.getCategoryByHierarchyLevelId(hierarchy_level_id);
}

function delCategory(categoryId, userId){
	return dbCategory.delCategory(categoryId, userId);
}

function UpdateCategory(categoryId,description, nametag, hierarchyLevelId, measureId, InProcessingReport, userId){
	dbCategory.UpdateCategory(categoryId,description, nametag, hierarchyLevelId, measureId, InProcessingReport, userId);
	return dbCategory.UpdateCategoryHierarchyLevel(hierarchyLevelId,categoryId,InProcessingReport,userId);
}

function InsertCategory(description, nametag, hierarchyLevelId, measureId, InProcessingReport, userId){
	var categoryId = dbCategory.InsertCategory(description, nametag, hierarchyLevelId, measureId, InProcessingReport, userId);

	if(hierarchyLevelId = 1){
		//HL4
		var hl4s= dbHl4.getAllHl4();

		hl4s.forEach(function(hl4){
			var params = {
				'in_hl4_id':hl4.HL4_ID,
				'in_category_id':categoryId,
				'in_created_user_id':userId,
				'in_in_processing_report':InProcessingReport
			};
			var a = dbHl4.insertHl4Category(params);
		});

	}else if(hierarchyLevelId = 2){
		//HL5
		var hl5s= dbHl5.getAllHl5();

		hl5s.forEach(function(hl5){
			var a = dbHl5.insertHl5Category(hl5.HL5_ID,categoryId,userId,InProcessingReport);
		});

	}else {
		//HL6
		var hl6s= dbHl6.getAllHl5();

		hl6s.forEach(function(hl6){
			var a = dbHl6.insertHl6Category(hl6Id,categoryId,userId,InProcessingReport);
		});

	}
	return categoryId;
}