$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_REGION = "GET_ALL_REGION";
var GET_REGION_BY_ID = "GET_REGION_BY_ID";
var GET_REGION_BY_NAME = "GET_REGION_BY_NAME";
var INS_REGION = "INS_REGION";
var UPD_REGION = "UPD_REGION";
var REGION_CAN_DELETE = "REGION_CAN_DELETE";
var DEL_REGION = "DEL_REGION";

function getAllRegions(){
	var parameters = {};	
	var result = db.executeProcedureManual(GET_ALL_REGION, {});	
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;	
}

function getRegionById(regionId){
	var parameters = {'IN_REGION_ID': regionId};
	var result = db.executeProcedureManual(GET_REGION_BY_ID, parameters);	
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;	
}

/*EXECUTE QUERY TO INSERT NEW REGION*/
function insertRegion(objRegion, userId){
	var parameters = {};
	parameters.IN_REGION_NAME = objRegion.IN_REGION_NAME;
	parameters.IN_REGION_ISO = objRegion.IN_REGION_ISO;
	parameters.IN_CREATED_USER_ID = userId;
	parameters.OUT_REGION_ID = '?';
	
	return db.executeScalar(INS_REGION,parameters,"OUT_REGION_ID");
}

/*EXECUTE QUERY TO UPDATE REGION*/
function updateRegion(objRegion, userId){

	var parameters = {};
	parameters.IN_REGION_ID = objRegion.IN_REGION_ID;
	parameters.IN_REGION_NAME = objRegion.IN_REGION_NAME;
	parameters.IN_REGION_ISO = objRegion.IN_REGION_ISO;
	parameters.IN_MODIFIED_USER_ID = userId;
	parameters.out_result = '?';
	
	return db.executeScalar(UPD_REGION,parameters,"out_result");
}

/*EXECUTE QUERY TO UPDATE REGION*/
function getRegionByName(objRegion){
	var parameters = {};
	parameters.IN_REGION_NAME = objRegion.IN_REGION_NAME;	
	var result = db.executeProcedureManual(GET_REGION_BY_NAME,parameters,"out_result");
	return db.extractArray(result.out_result);
}

/*EXECUTE QUERY TO DELETE REGION*/
function delRegion(objRegion, userId){
	var parameters = {};
	parameters.in_region_id = objRegion.IN_REGION_ID;
	parameters.in_modified_user_id = userId;
	return db.executeScalar(DEL_REGION, parameters,"out_result");
}

//DETERMINE IF EXIST A ENTITY OF REGION
function existRegion(objRegion){
	var region = getRegionByName(objRegion);
	if(region && region.length > 0)
		return true;
	else
		return false;
}

function canDeleteRegion(objRegion){
	var parameters = {};
	parameters.in_region_id = objRegion.IN_REGION_ID;
	var result = db.executeScalar(REGION_CAN_DELETE,parameters,"out_result");
	return !(result > 0);
}
