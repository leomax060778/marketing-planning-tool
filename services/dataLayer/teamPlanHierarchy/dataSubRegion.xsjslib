$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/***************END INCLUDE LIBRARIES*******************/

//STORE PROCEDURE LIST NAME
var spGetSubregionByRegionId = "GET_SUBREGION_BY_REGION_ID";
var spInsertSubregion = "INS_SUBREGION";
var spUpdateSubregion = "UPD_SUBREGION";
var spDeleteSubregion = "DEL_SUBREGION";


/*****************END STORED PROCEDURES*******************/

function getSubRegionsByRegionId(regionId){
	var spResult = [];
	if(regionId > 0)
	{
		var parameters = {'IN_REGION_ID': regionId};	
		var result = db.executeProcedureManual(spGetSubregionByRegionId, parameters);	
		var list = result['out_result'];
		
		Object.keys(list).forEach(function(key) {
			spResult.push(list[key]);
		});
	}
	return spResult;
}

function insertSubregion(subregion, createUser) {
	var param = {};
	param.in_subregion_name = subregion.NAME;
	param.in_subregion_iso = subregion.ISO;
	param.in_region_id = subregion.REGION_ID;
	param.in_created_user_id = createUser; // User that insert

	return db.executeScalar(spInsertSubregion, param,
			"out_subregion_id");
}

function updateSubregion(subregion, modUser) {
	var param = {};
	param.in_subregion_id = subregion.SUBREGION_ID;	
	param.in_subregion_name = subregion.NAME;
	param.in_subregion_iso = subregion.ISO;
	param.in_modified_user_id = modUser; // User that insert

	return db.executeScalar(spUpdateSubregion, param, "out_result");
}

function deleteSubregion(subregion, modUser) {
	var param = {};
	param.in_subregion_id = subregion.SUBREGION_ID;
	param.in_modified_user_id = modUser; // User that deletes

	return db.executeScalar(spDeleteSubregion, param, "out_result");
}
