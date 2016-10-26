/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetInterlockByHl4Id = "GET_INTERLOCK_BY_HL4_ID";
var spGetInterlockById = "GET_INTERLOCK_BY_ID";
var spGetInterlockEntity = "GET_ALL_INTERLOCK_ENTITY";
var spGetInterlockOrganizationType = "GET_ALL_INTERLOCK_ORGANIZATION_TYPE";
var spGetInterlockOrganizationTypeById = "GET_ORGANIZATION_TYPE_BY_ID";
var spGetInterlockStatus = "GET_INTERLOCK_STATUS";
var spGetInterlockOrganizationByIlId = "GET_INTERLOCK_ORGANIZATION_BY_IL_ID";

var spInsertInterlock = "INS_INTERLOCK";
var spInsertInterlockLogStatus = "INS_INTERLOCK_LOG_STATUS";
var spInsertInterlockRoute = "INS_INTERLOCK_ROUTE"; 
var spInsertInterlockRegion = "INS_INTERLOCK_REGION";
var spInsertInterlockSubregion = "INS_INTERLOCK_SUBREGION";

var spDeleteInterlock = "DEL_INTERLOCK_BY_HL4_ID";
var spDeleteInterlockLogStatus = "DEL_INTERLOCK_LOG_STATUS";
var spDeleteInterlockRoute = "DEL_INTERLOCK_GLOBAL_TEAM_BY_HL4_ID";
var spDeleteInterlockRegion = "DEL_INTERLOCK_REGION_BY_HL4_ID";
var spDeleteInterlockSubregion = "DEL_INTERLOCK_SUBREGION_BY_HL4_ID";

var spDeleteInterlockByIlId = "DEL_INTERLOCK_BY_IL_ID";
var spDeleteInterlockLogStatusByIlId = "DEL_INTERLOCK_LOG_STATUS_BY_IL_ID";
var spDeleteInterlockRouteByIlId = "DEL_INTERLOCK_GLOBAL_TEAM_BY_IL_ID";
var spDeleteInterlockRegionByIlId = "DEL_INTERLOCK_REGION_BY_IL_ID";
var spDeleteInterlockSubregionByIlId = "DEL_INTERLOCK_SUBREGION_BY_IL_ID";
/******************************************************/

/********** GET **********/
function getInterlockByHl4Id(id){	
	if(id){
		var rdo = db.executeProcedureManual(spGetInterlockByHl4Id, {'in_hl4_id':id});
		return db.extractArray(rdo.out_interlock);
	}	
	return null;
}

function getInterlockById(id){
	if(id){
		var rdo = db.executeProcedure(spGetInterlockById,{'in_interlock_id':id});
		return db.extractArray(rdo.out_interlock);
	}	
	return null;
}

function getInterlockEntity(){
		var rdo = db.executeProcedure(spGetInterlockEntity,{});
		return db.extractArray(rdo.out_interlock_entity);
}

function getInterlockOrganizationType(){
	var rdo = db.executeProcedure(spGetInterlockOrganizationType,{});
	return db.extractArray(rdo.out_interlock_organization_type);
}

function getInterlockOrganizationByIlId(il_id){
	if(il_id){
		var rdo = db.executeProcedure(spGetInterlockOrganizationByIlId,{'in_interlock_id':il_id});
		return db.extractArray(rdo.out_organization)[0];
	}
	return null
}

function getInterlockStatus(){
	var rdo = db.executeProcedure(spGetInterlockStatus,{});
	return db.extractArray(rdo.out_interlock);
}

/********** INSERT **********/

function insertInterlock(parameters){
		var rdo = db.executeScalarManual(spInsertInterlock, parameters, 'out_interlock_id');
		return rdo;
}

function insertInterlockRoute(parameters){
	var rdo = db.executeScalarManual(spInsertInterlockRoute, parameters, 'out_interlock_route_id');
	return rdo;
}

function insertInterlockRegion(parameters){
	var rdo = db.executeScalarManual(spInsertInterlockRegion, parameters, 'out_interlock_region_id');
	return rdo;
}

function insertInterlockSubregion(parameters){
	var rdo = db.executeScalarManual(spInsertInterlockSubregion, parameters, 'out_interlock_subregion_id');
	return rdo;
}

function insertInterlockLogStatus(parameters){
    var rdo = db.executeScalarManual(spInsertInterlockLogStatus, parameters, 'out_interlock_log_status_id');
    return rdo;
}
/********** DELETE **********/
function deleteInterlock(parameters){
    var rdo = !parameters.in_hl4_id ? 0 : db.executeScalarManual(spDeleteInterlock, parameters, 'out_result');
    return rdo;
}

function deleteInterlockLogStatus(parameters){
    var rdo = !parameters.in_hl4_id ? 0 : db.executeScalarManual(spDeleteInterlockLogStatus, parameters, 'out_result');
    return rdo;
}

function deleteInterlockRoute(parameters){
    var rdo = !parameters.in_hl4_id ? 0 : db.executeScalarManual(spDeleteInterlockRoute, parameters, 'out_result');
    return rdo;
}

function deleteInterlockRegion(parameters){
    var rdo = !parameters.in_hl4_id ? 0 : db.executeScalarManual(spDeleteInterlockRegion, parameters, 'out_result');
    return rdo;
}

function deleteInterlockSubregion(parameters){
    var rdo = !parameters.in_hl4_id ? 0 : db.executeScalarManual(spDeleteInterlockSubregion, parameters, 'out_result');
    return rdo;
}

function deleteInterlockByIlId(id, userId){
    var rdo = !id && !userId ? null : db.executeScalarManual(spDeleteInterlockByIlId, {'in_il_id': id, 'in_user_id': userId}, 'out_result');
    return rdo;
}

function deleteInterlockLogStatusByIlId(id, userId){
    var rdo = !id && !userId ? null : db.executeScalarManual(spDeleteInterlockLogStatusByIlId, {'in_il_id': id, 'in_user_id': userId}, 'out_result');
    return rdo;
}

function deleteInterlockRouteByIlId(id, userId){
    var rdo = !id && !userId ? null : db.executeScalarManual(spDeleteInterlockRouteByIlId, {'in_il_id': id, 'in_user_id': userId}, 'out_result');
    return rdo;
}

function deleteInterlockRegionByIlId(id, userId){
    var rdo = !id && !userId ? null : db.executeScalarManual(spDeleteInterlockRegionByIlId, {'in_il_id': id, 'in_user_id': userId}, 'out_result');
    return rdo;
}

function deleteInterlockSubregionByIlId(id, userId){
    var rdo = !id && !userId ? null : db.executeScalarManual(spDeleteInterlockSubregionByIlId, {'in_il_id': id, 'in_user_id': userId}, 'out_result');
    return rdo;
}