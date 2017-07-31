/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var GET_ALLOCATION_OPTION_LEVEL = "GET_ALLOCATION_OPTION_LEVEL";
var GET_ALLOCATION_CATEGORY_BY_CAT_ID_LEVEL_ID = "GET_ALLOCATION_CATEGORY_BY_CAT_ID_LEVEL_ID";
var GET_ALLOCATION_CATEGORY_OPTION_LEVEL_BY_LEVEL = "GET_ALLOCATION_CATEGORY_OPTION_LEVEL_BY_LEVEL";
var GET_ALLOCATION_CATEGORY_OPTION_LEVEL_COUNT_BY_CATEGORY = "GET_ALLOCATION_CATEGORY_OPTION_LEVEL_COUNT_BY_CATEGORY";
var INS_ALLOCATION_CATEGORY_OPTION_LEVEL = "INS_ALLOCATION_CATEGORY_OPTION_LEVEL";
var UPD_ALLOCATION_CAT_OPT_LEV_PROCESSING_REPORT = "UPD_ALLOCATION_CAT_OPT_LEV_PROCESSING_REPORT";
var UPD_ALLOCATION_CATEGORY_OPTION_LEVEL = "UPD_ALLOCATION_CATEGORY_OPTION_LEVEL";
var DEL_ALLOCATION_RELATIONSHIP = "DEL_ALLOCATION_RELATIONSHIP";
var DEL_ALLOCATION_RELATIONSHIP_BY_CATEGORY_ID = "DEL_ALLOCATION_RELATIONSHIP_BY_CATEGORY_ID";
/*********************************************************************************************************/
var hierarchyLevel = {
	"hl3": 4,
	"hl4": 1,
	"hl5": 2,
	"hl6": 3
};

function getAllocationCategoryOptionLevelByLevelId(level){
    if(level){
        var rdo = db.executeProcedureManual(GET_ALLOCATION_CATEGORY_OPTION_LEVEL_BY_LEVEL,{'in_hierarchy_level_id': hierarchyLevel[level]});
        return db.extractArray(rdo.out_result);
    }
    return null;
}

function checkInUseAllocationCategoryById(categoryId){
    if(categoryId){
        var rdo = db.executeScalarManual(GET_ALLOCATION_CATEGORY_OPTION_LEVEL_COUNT_BY_CATEGORY,{'in_category_id': categoryId}, 'out_result');
        return rdo;
    }
    return null;
}

function getAllocationCategoryByCategoryIdLevelId(categoryId, levelId){
	var params = {
		"in_allocation_category_id":categoryId,
		"in_hierarchy_level_id" : levelId
	};

	var rdo = db.executeProcedure(GET_ALLOCATION_CATEGORY_BY_CAT_ID_LEVEL_ID,params);
	return db.extractArray(rdo.out_result);
}


function insertAllocationCATEGORYOptionLevel(categoryId, optionId, levelId, inProcessingReport, userId, autoCommit) {
	var params = {
		'in_category_id': categoryId,
		'in_option_id': optionId,
		'in_level_id': levelId,
		'in_in_processing_report': inProcessingReport,
		'in_user_id': userId
	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(INS_ALLOCATION_CATEGORY_OPTION_LEVEL, params, 'out_result');
	} else {
		rdo = db.executeScalarManual(INS_ALLOCATION_CATEGORY_OPTION_LEVEL, params, 'out_result');
	}
	return rdo;
}

function updateAllocationCategoryOptionLevelProcessingReport(categoryId, levelId,processingReport, userId,autoCommit){
	var params = {
		'in_category_id': categoryId,
		'in_level_id': levelId,
		'in_in_processing_report':processingReport,
		'in_user_id' : userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(UPD_ALLOCATION_CAT_OPT_LEV_PROCESSING_REPORT,params,'out_result');
	}else{
		rdo = db.executeScalarManual(UPD_ALLOCATION_CAT_OPT_LEV_PROCESSING_REPORT,params,'out_result');
	}
	return rdo;
}

function updateAllocationCategoryOptionLevel(categoryId, levelId, optionId, processingReport, userId,autoCommit){
    var params = {
        'in_category_id': categoryId,
        'in_level_id': levelId,
        'in_option_id':optionId,
        'in_user_id' : userId,
        'in_in_processing_report':processingReport
    };

    return db.executeScalarManual(UPD_ALLOCATION_CATEGORY_OPTION_LEVEL,params,'out_result');
}

function deleteAllocationCATEGORYOptionLevel(categoryId, levelId,userId, autoCommit){
	var params = {
		'in_category_id': categoryId,
		'in_level_id': levelId,
		'in_user_id' : userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(DEL_ALLOCATION_RELATIONSHIP,params,'out_result');
	}else{
		rdo = db.executeScalarManual(DEL_ALLOCATION_RELATIONSHIP,params,'out_result');
	}
	return rdo;
}

function deleteAllocationCategoryOptionLevelByCategory(categoryId, userId){
    var params = {
        'in_category_id': categoryId,
        'in_user_id' : userId
    };
    return db.executeScalarManual(DEL_ALLOCATION_RELATIONSHIP_BY_CATEGORY_ID,params,'out_result');
}

function getAllocationCategory(id, level){
	if (id && level){
		var storedProcedure = "GET_"+ level.toUpperCase() +"_ALLOCATION_CATEGORY_BY_"+ level.toUpperCase() +"_ID";
		var rdo = db.executeProcedureManual(storedProcedure,{'in_id':id});
		return db.extractArray(rdo.out_category);
	}
	return null;
}

function getAllocationOptionByCategoryOptionLevelId(categoryOptionLevelId, level, hlId){
	if(categoryOptionLevelId && level){
		var storedProcedure = "GET_"+ level.toUpperCase() +"_ALLOCATION_OPTION";
		var rdo = db.executeProcedureManual(storedProcedure,{'in_category_option_level_id':categoryOptionLevelId, 'in_hl_id': hlId});
		return db.extractArray(rdo.out_option);
	}
	return null;
}

function getAllocationOptionByCategoryAndLevelId(level, hlId){
	if(hlId && level){
		var storedProcedure = "GET_"+ level.toUpperCase() +"_ALLOCATION_OPTION";
		var rdo = db.executeProcedureManual(storedProcedure,{'in_hl_id': hlId });
		return db.extractArray(rdo.out_option);
	}
	return null;
}

function getAllocationOptionByCategoryAndLevel(allocation_category_id, level){
	if(allocation_category_id && level){
		var storedProcedure = "GET_"+ level.toUpperCase() +"_ALLOCATION_OPTION_BY_CATEGORY_LEVEL";
		var rdo = db.executeProcedureManual(storedProcedure,{'in_allocation_category_id':allocation_category_id, 'in_hierarchy_level_id': hierarchyLevel[level]});
		return db.extractArray(rdo.out_option);
	}
	return null;
}

function getAllocationOptionLevelByCategoryAndLevelId(allocation_category_id, level, optionId){
	if(allocation_category_id && level){
		var rdo = db.executeProcedureManual(GET_ALLOCATION_OPTION_LEVEL,{'in_allocation_category_id':allocation_category_id, 'in_hierarchy_level_id': hierarchyLevel[level.toLowerCase()], 'in_option_id':optionId});
		return db.extractArray(rdo.out_result)[0];
	}
	return null;
}

function insertCategoryOption(data, level){
	var storedProcedure = "INS_"+ level.toUpperCase() +"_ALLOCATION_CATEGORY_OPTION";
	var rdo = db.executeScalarManual(storedProcedure, data, 'out_result_id');
	return rdo;
}

function updateCategoryOption(data, level){
	if(level){
		var storedProcedure = "UPD_"+ level.toUpperCase() +"_ALLOCATION_CATEGORY_OPTION";
		var rdo = db.executeScalarManual(storedProcedure, data, 'out_result');
		return rdo;
	}return null;
}

function deleteCategoryOption(id, userId, level){
	var parameters = {
		'in_id': id,
		'in_user_id': userId
	};
	var storedProcedure = "DEL_"+ level.toUpperCase() +"_ALLOCATION_CATEGORY_OPTION";
	var rdo = db.executeScalarManual(storedProcedure, parameters, 'out_result');
	return rdo;
}

function resetHl4CategoryOptionUpdated(id, level, userId){
	var parameters = {
		'in_id': id,
		'in_user_id': userId
	};
	var storedProcedure = "RESET_"+ level.toUpperCase() +"_CATEGORY_OPTION_UPDATED";
	var rdo = db.executeScalarManual(storedProcedure, parameters, 'out_result');
	return rdo;
}