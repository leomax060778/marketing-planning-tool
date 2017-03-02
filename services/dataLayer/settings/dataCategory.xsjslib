/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetCountByHlId = "GET_CATEGORY_COUNT_BY_HL_ID";
var spGET_CATEGORY_BY_HIERARCHY_LEVEL_ID = "GET_CATEGORY_BY_HIERARCHY_LEVEL_ID";

var spINS_CATEGORY = "INS_CATEGORY";

var spUPD_CATEGORY = "UPD_CATEGORY";
var spUPD_HL4_CATEGORY = "UPD_HL4_CATEGORY";
var spUPD_HL5_CATEGORY = "UPD_HL5_CATEGORY";
var spUPD_HL6_CATEGORY = "UPD_HL6_CATEGORY";

var spDEL_CATEGORY = "DEL_CATEGORY";
var spGET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID";



var INS_ALLOCATION_CATEGORY = "INS_ALLOCATION_CATEGORY";
var GET_ALLOCATION_CATEGORY = "GET_ALLOCATION_CATEGORY";
var GET_ALLOCATION_CATEGORY_BY_ID = "GET_ALLOCATION_CATEGORY_BY_ID";
var GET_ALLOCATION_CATEGORY_BY_NAME = "GET_ALLOCATION_CATEGORY_BY_NAME";
var GET_ALLOCATION_CATEGORY_IN_USE_BY_CATGEORY_ID = "GET_ALLOCATION_CATEGORY_IN_USE_BY_CATGEORY_ID";
var GET_ALLOCATION_CATEGORY_COUNT_BY_HL_ID = "GET_ALLOCATION_CATEGORY_COUNT_BY_HL_ID";
var UPD_ALLOCATION_CATEGORY = "UPD_ALLOCATION_CATEGORY";
var DEL_ALLOCATION_CATEGORY = "DEL_ALLOCATION_CATEGORY";
/******************************************************/

var hierarchyLevel = {
		"hl3": 4,
		"hl4": 1,
		"hl5": 2,
		"hl6": 3
}

function getCategoryById(id, hl){
	var params = {
		'in_category_id' : id
		, 'in_hierarchy_level_id' : hierarchyLevel[hl]
	};
	var result =db.executeProcedure(spGET_CATEGORY_BY_ID, params);
	return db.extractArray(result.out_result)[0];
}

function getCountByHlId(hl){	
	if(hl){
		return db.executeScalarManual(spGetCountByHlId, {'in_hl_id':hierarchyLevel[hl]}, "out_hl_category");
	}	
	return null;
}

function getCategoryByHierarchyLevelId(hierarchy_level_id){
	var params = {
		'in_hierarchy_level_id' : hierarchy_level_id
	};
	var result = db.executeProcedure(spGET_CATEGORY_BY_HIERARCHY_LEVEL_ID, params);

	var result = db.extractArray(result.out_result);
	var rdo = {};
	rdo.results = result;

	return rdo;

	//return rdo ? rdo:{};
}

function InsertCategory(description, nametag, hierarchyLevelId, measureId, InProcessingReport, userId, autoCommit) {
	var params = {
		'in_description': description,
		'in_nametag': nametag,
		'in_hierarchy_level_id': hierarchyLevelId,
		'in_measure_id': measureId,
		'in_in_processing_report': InProcessingReport,
		'in_user_id': userId

	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(spINS_CATEGORY, params, 'out_category_id');
	} else {
		rdo = db.executeScalarManual(spINS_CATEGORY, params, 'out_category_id');
	}
	return rdo;
}

function UpdateCategoryHierarchyLevel(HL,categoryId,InProcessingReport,userId,autoCommit){
	var params = {
		'in_category_id': categoryId,
		'in_in_processing_report': InProcessingReport,
		'in_user_id': userId
	};
	if(HL == 3){
		if (autoCommit) {
			rdo = db.executeScalar(spUPD_HL4_CATEGORY, params, 'out_result');
		} else {
			rdo = db.executeScalarManual(spUPD_HL4_CATEGORY, params, 'out_result');
		}
	}else if(HL == 4){
		if (autoCommit) {
			rdo = db.executeScalar(spUPD_HL5_CATEGORY, params, 'out_result');
		} else {
			rdo = db.executeScalarManual(spUPD_HL5_CATEGORY, params, 'out_result');
		}
	}else{
		if (autoCommit) {
			rdo = db.executeScalar(spUPD_HL6_CATEGORY, params, 'out_result');
		} else {
			rdo = db.executeScalarManual(spUPD_HL6_CATEGORY, params, 'out_result');
		}
	}
	var rdo;

	return rdo;
}

function UpdateCategory(categoryId,description, nametag, hierarchyLevelId, measureId, InProcessingReport, userId, autoCommit) {
	var params = {
		'in_category_id': categoryId,
		'in_description': description,
		'in_nametag': nametag,
		'in_hierarchy_level_id': hierarchyLevelId,
		'in_measure_id': measureId,
		'in_in_processing_report': InProcessingReport,
		'in_user_id': userId

	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(spUPD_CATEGORY, params, 'out_result');
	} else {
		rdo = db.executeScalarManual(spUPD_CATEGORY, params, 'out_result');
	}
	return rdo;
}

function delCategory(categoryId, userId, autoCommit){
	var params = {
		'in_category_id' : categoryId,
		'in_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spDEL_CATEGORY,params,'out_result');
	}else{
		rdo = db.executeScalarManual(spDEL_CATEGORY,params,'out_result');
	}
	return rdo;
}

/*********************************************************************************************************/
function insertAllocationCategory(description, name, measureId, userId, autoCommit) {
	var params = {
		'in_description': description,
		'in_name': name,
		'in_measure_id': measureId,
		'in_user_id': userId
	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(INS_ALLOCATION_CATEGORY, params, 'out_category_id');
	} else {
		rdo = db.executeScalarManual(INS_ALLOCATION_CATEGORY, params, 'out_category_id');
	}
	return rdo;
}
function getAllocationCategory(){
	var result = db.executeProcedureManual(GET_ALLOCATION_CATEGORY, {});
	return db.extractArray(result.out_result);
}

function getAllocationCategoryById(id){
	var params = {
		'in_category_id' : id
	};
	var result = db.executeProcedureManual(GET_ALLOCATION_CATEGORY_BY_ID, params);
	return db.extractArray(result.out_result)[0];
}

function getAllocationCategoryByName(name){
	var params = {
		'in_name' : name
	};
	var result = db.executeProcedureManual(GET_ALLOCATION_CATEGORY_BY_NAME, params);
	return db.extractArray(result.out_result)[0];
}

function getCategoryInUseByCategoryId(categoryId){
	var params = {
		'in_category_id': categoryId
	};
	var result = db.executeProcedureManual(GET_ALLOCATION_CATEGORY_IN_USE_BY_CATGEORY_ID, params);
	return db.extractArray(result.out_result);
}

function getAllocationCategoryCountByHlId(hl){
	if(hl){
		return db.executeScalarManual(GET_ALLOCATION_CATEGORY_COUNT_BY_HL_ID, {'in_hl_id':hierarchyLevel[hl]}, "out_result");
	}
	return null;
}

function updateAllocationCategory(categoryId,description, name, measureId, userId, autoCommit) {
	var params = {
		'in_category_id': categoryId,
		'in_description': description,
		'in_name': name,
		'in_measure_id': measureId,
		'in_user_id': userId
	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(UPD_ALLOCATION_CATEGORY, params, 'out_result');
	} else {
		rdo = db.executeScalarManual(UPD_ALLOCATION_CATEGORY, params, 'out_result');
	}
	return rdo;
}

function deleteAllocationCategory(categoryId, userId, autoCommit){
	var params = {
		'in_category_id' : categoryId,
		'in_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(DEL_ALLOCATION_CATEGORY,params,'out_result');
	}else{
		rdo = db.executeScalarManual(DEL_ALLOCATION_CATEGORY,params,'out_result');
	}
	return rdo;
}