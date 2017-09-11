/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetOptionCountByCategoryId = "GET_OPTION_COUNT_BY_CATEGORY_ID";
var spGetRequestCategoryOptionByHl5Id = "GET_REQUEST_CATEGORY_OPTION_BY_HL5_ID";

var INS_SERVICE_REQUEST_CATEGORY = "INS_SERVICE_REQUEST_CATEGORY";
var UPD_SERVICE_REQUEST_CATEGORY = "UPD_SERVICE_REQUEST_CATEGORY";
var DEL_SERVICE_REQUEST_CATEGORY = "DEL_SERVICE_REQUEST_CATEGORY";
var GET_SERVICE_REQUEST_CATEGORY_BY_NAME = "GET_SERVICE_REQUEST_CATEGORY_BY_NAME";
var GET_SERVICE_REQUEST_CATEGORY = "GET_SERVICE_REQUEST_CATEGORY";

var INS_SERVICE_REQUEST_OPTION = "INS_SERVICE_REQUEST_OPTION";
var UPD_SERVICE_REQUEST_OPTION = "UPD_SERVICE_REQUEST_OPTION";
var DEL_SERVICE_REQUEST_OPTION = "DEL_SERVICE_REQUEST_OPTION";
var GET_SERVICE_REQUEST_OPTION = "GET_SERVICE_REQUEST_OPTION";
var GET_SERVICE_REQUEST_OPTION_BY_ID = "GET_SERVICE_REQUEST_OPTION_BY_ID";
var GET_SERVICE_REQUEST_OPTION_BY_NAME = "GET_SERVICE_REQUEST_OPTION_BY_NAME";

var INS_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL = "INS_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL";
var UPD_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL = "UPD_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL";
var DEL_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL = "DEL_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL";
var GET_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL = "GET_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL";

var GET_AVAILABLE_SERVICE_REQUEST_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID = "GET_AVAILABLE_SERVICE_REQUEST_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID";
var GET_ASSIGNED_SERVICE_REQUEST_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID = "GET_ASSIGNED_SERVICE_REQUEST_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID";
var GET_SERVICE_REQUEST_CATEGORY_BY_CAT_ID_LEVEL_ID = "GET_SERVICE_REQUEST_CATEGORY_BY_CAT_ID_LEVEL_ID";
var GET_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_COUNT_BY_CATEGORY = "GET_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_COUNT_BY_CATEGORY";

var DEL_SERVICE_REQUEST_RELATIONSHIP_BY_CATEGORY_ID = "DEL_SERVICE_REQUEST_RELATIONSHIP_BY_CATEGORY_ID";
/******************************************************/

var hierarchyLevel = {
	"hl3": 4,
	"hl4": 1,
	"hl5": 2,
	"hl6": 3
};

/***Service Request Category****/
function getServiceRequestCategory(){
	var parameters = {};
	var data = db.executeProcedureManual(GET_SERVICE_REQUEST_CATEGORY, parameters);
	return db.extractArray(data.out_result);
}

function getServiceRequestCategoryByName(name){
	var parameters = { in_name: name};
	var data = db.executeProcedureManual(GET_SERVICE_REQUEST_CATEGORY_BY_NAME, parameters);
	return db.extractArray(data.out_result);
}

function insertServiceRequestCategory(description, name, userid, autoCommit){
	var params = {
		'in_description': description,
		'in_name': name,
		'in_user_id': userid
	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(INS_SERVICE_REQUEST_CATEGORY, params, 'out_category_id');
	} else {
		rdo = db.executeScalarManual(INS_SERVICE_REQUEST_CATEGORY, params, 'out_category_id');
	}
	return rdo;
}

function updateServiceRequestCategory(category_id, description, name, userid, autoCommit){
	var params = {
		'in_category_id': category_id,
		'in_name': name,
		'in_description': description,
		'in_user_id': userid
	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(UPD_SERVICE_REQUEST_CATEGORY, params, 'out_result');
	} else {
		rdo = db.executeScalarManual(UPD_SERVICE_REQUEST_CATEGORY, params, 'out_result');
	}
	return rdo;
}

function deleteServiceRequestCategory(categoryId, userId, autoCommit){
	var params = {
		'in_category_id' : categoryId,
		'in_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(DEL_SERVICE_REQUEST_CATEGORY,params,'out_result');
	}else{
		rdo = db.executeScalarManual(DEL_SERVICE_REQUEST_CATEGORY,params,'out_result');
	}
	return rdo;
}


/***Service Request Option****/
function insertServiceRequestOption(name, userid, autoCommit){
	var params = {
		'in_name': name,
		'in_user_id': userid
	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(INS_SERVICE_REQUEST_OPTION, params, 'out_option_id');
	} else {
		rdo = db.executeScalarManual(INS_SERVICE_REQUEST_OPTION, params, 'out_option_id');
	}
	return rdo;
}

function updateServiceRequestOption(option_id, name, userid, autoCommit){
	var params = {
		'in_option_id': option_id,
		'in_name': name,
		'in_user_id': userid
	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(UPD_SERVICE_REQUEST_OPTION, params, 'out_result');
	} else {
		rdo = db.executeScalarManual(UPD_SERVICE_REQUEST_OPTION, params, 'out_result');
	}
	return rdo;
}

function deleteServiceRequestOption(option_id, userid, autoCommit){
	var params = {
		'in_option_id' : option_id,
		'in_user_id': userid
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(DEL_SERVICE_REQUEST_OPTION,params,'out_result');
	}else{
		rdo = db.executeScalarManual(DEL_SERVICE_REQUEST_OPTION,params,'out_result');
	}
	return rdo;
}

function getServiceRequestOptionByName(name){
	var parameters = { in_name: name};
	var data = db.executeProcedureManual(GET_SERVICE_REQUEST_OPTION_BY_NAME, parameters);
	return db.extractArray(data.out_result);
}

function getServiceRequestOption(){
	var parameters = {};
	var data = db.executeProcedureManual(GET_SERVICE_REQUEST_OPTION, parameters);
	return db.extractArray(data.out_result);
}

function getServiceRequestOptionById(optionId){
	var parameters = { in_option_id: optionId};
	var data = db.executeProcedureManual(GET_SERVICE_REQUEST_OPTION_BY_ID, parameters);
	return db.extractArray(data.out_result);
}


/***Service dervice Rquest Category Option Level***/
function insertServiceRequestCategoryOptionLevel(categoryId, optionId, levelId, userid, autoCommit){
	var params = {
		'in_category_id': categoryId,
		'in_option_id': optionId,
		'in_level_id': levelId,
		'in_user_id':userid
	};

	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(INS_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL, params, 'out_result');
	} else {
		rdo = db.executeScalarManual(INS_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL, params, 'out_result');
	}
	return rdo;
}

function updateServiceRequestCategoryOptionLevel(categoryId, option_id, levelId, userid, autoCommit){
	var params = {
		'in_category_id': categoryId,
		'in_level_id': levelId,
		'in_option_id': option_id,
		'in_user_id': userid
	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(UPD_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL, params, 'out_result');
	} else {
		rdo = db.executeScalarManual(UPD_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL, params, 'out_result');
	}
	return rdo;
}

function deleteServiceRequestCategoryOptionLevel(categoryId, levelId, userid, autoCommit){
	var params = {
		'in_category_id': categoryId,
		'in_level_id': levelId,
		'in_user_id': userid
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(DEL_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL,params,'out_result');
	}else{
		rdo = db.executeScalarManual(DEL_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL,params,'out_result');
	}
	return rdo;
}

function getServiceRequestCategoryOptionLevel(categoryId, level, optionId){
	var parameters = {
		in_category_id: categoryId,
		in_hierarchy_level_id: hierarchyLevel[level.toLowerCase()],
		in_option_id: optionId
	};
	if(categoryId && level){
		var rdo = db.executeProcedureManual(GET_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL, parameters);
		return db.extractArray(rdo.out_result)[0];
	}
	return null;

}

function getAvailableOptionByCategoryIdByLevelId(categoryId, levelId) {
	var params = {
		'in_category_id': categoryId,
		'in_level_id': levelId
	};
	var result = db.executeProcedureManual(GET_AVAILABLE_SERVICE_REQUEST_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID, params);
	return db.extractArray(result.out_result);
}

function getServiceRequestCategoryByCategoryIdLevelId(categoryId, levelId) {
	var params = {
		"in_category_id":categoryId,
		"in_level_id" : levelId
	};

	var rdo = db.executeProcedure(GET_SERVICE_REQUEST_CATEGORY_BY_CAT_ID_LEVEL_ID,params);
	return db.extractArray(rdo.out_result);
}

function getAssignedOptionByCategoryIdByLevelId(categoryId, levelId) {
	var params = {
		'in_category_id': categoryId,
		'in_level_id': levelId
	};
	var result = db.executeProcedureManual(GET_ASSIGNED_SERVICE_REQUEST_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID, params);
	return db.extractArray(result.out_result);
}

function checkInUseServiceRequestCategoryById(categoryId){
	var params = {
		'in_category_id': categoryId
	};
	return db.executeScalarManual(GET_SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_COUNT_BY_CATEGORY, params, 'out_result');
}

function deleteServiceRequestCategoryOptionLevelByCategory(categoryId, userId){
	var params = {
		'in_category_id': categoryId,
		'in_user_id' : userId
	};
	return db.executeScalarManual(DEL_SERVICE_REQUEST_RELATIONSHIP_BY_CATEGORY_ID,params,'out_result');
}
function getCategoryByHierarchyLevelId(){
	throw ErrorLib.getErrors().NotImplemented();
}
function getServiceRequestCategoryOptionByHlId(hlId, level){
    var params = {
        in_hl_id: hlId
        , in_hierarchy_level_id: hierarchyLevel[level.toLowerCase()]
    };
    var spName = level.toLowerCase().indexOf('5') != -1 ? spGetRequestCategoryOptionByHl5Id : '';
    var result = db.executeProcedureManual(spName,params);

    return db.extractArray(result.out_result);
}



