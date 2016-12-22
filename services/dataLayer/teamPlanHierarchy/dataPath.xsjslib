/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/*************************************************/

var GET_PATH_BY_LEVEL_PARENT = "GET_PATH_BY_LEVEL_PARENT";

var GET_PATH_ORGANIZATION_ACRONYM = "GET_PATH_ORGANIZATION_ACRONYM";

// Get info path with specific level and parent id. Parent id is an HL(x) id.  
function getPathByLevelParent(levelId, parentId){
	var result = db.executeProcedureManual(GET_PATH_BY_LEVEL_PARENT, {'in_lh':levelId, 'in_parent_id': parentId});
	return db.extractArray(result.out_result);
}

// Get the organization acronym providing the parent id
function getPathOrganizationAcronym(levelId, parentId){
	var result = db.executeProcedureManual(GET_PATH_ORGANIZATION_ACRONYM, {'in_lh':levelId, 'in_parent_id': parentId});
	return db.extractArray(result.out_result);
}