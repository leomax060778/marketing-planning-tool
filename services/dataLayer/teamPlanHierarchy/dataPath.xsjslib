/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/*************************************************/

var GET_PATH_BY_LEVEL_PARENT = "GET_PATH_BY_LEVEL_PARENT";
var GET_PATH_ORGANIZATION_ACRONYM = "GET_PATH_ORGANIZATION_ACRONYM";
var GET_CRM_PARENT_PATH_BY_ID_LEVEL_ID = "GET_CRM_PARENT_PATH_BY_ID_LEVEL_ID";
var INS_CRM_PARENT_PATH = "INS_CRM_PARENT_PATH";
var UPD_CRM_PARENT_PATH = "UPD_CRM_PARENT_PATH";
var DEL_CRM_PARENT_PATH = "DEL_CRM_PARENT_PATH";

var HIERARCHY_LEVEL = {
    'hl3': 4,
    'hl4': 1,
    'hl5': 2,
    'hl6': 3
};

// Get info path with specific level and parent id. Parent id is an HL(x) id.  
function getPathByLevelParent(hierarchyLevel, parentId){
	var result = db.executeProcedureManual(GET_PATH_BY_LEVEL_PARENT, {'in_lh':hierarchyLevel, 'in_parent_id': parentId});
	return db.extractArray(result.out_result);
}

// Get the organization acronym providing the parent id
function getPathOrganizationAcronym(levelId, parentId){
	var result = db.executeProcedureManual(GET_PATH_ORGANIZATION_ACRONYM, {'in_lh':levelId, 'in_parent_id': parentId});
	return db.extractArray(result.out_result);
}

function getCrmParentPathByIdLevelId(level, id){
    var parameters = {
        in_level_id: HIERARCHY_LEVEL[level],
        in_id: id
    };
    var result = db.executeProcedureManual(GET_CRM_PARENT_PATH_BY_ID_LEVEL_ID, parameters);
    return db.extractArray(result.out_result);
}

function insParentPath(level, id, path, userId){
	var parameters = {
		in_level_id: HIERARCHY_LEVEL[level],
		in_id: id,
		in_path: path,
		in_user_id: userId
	};
	return db.executeScalarManual(INS_CRM_PARENT_PATH,parameters,'out_result');
}
function updParentPath(level, id, path, userId){
    var parameters = {
        in_level_id: HIERARCHY_LEVEL[level],
        in_id: id,
        in_path: path,
        in_user_id: userId
    };
    return db.executeScalarManual(UPD_CRM_PARENT_PATH,parameters,'out_result');
}
function delParentPath(level, id){
    var parameters = {
        in_level_id: HIERARCHY_LEVEL[level],
        in_id: id
    };
    return db.executeScalarManual(DEL_CRM_PARENT_PATH,parameters,'out_result');
}
