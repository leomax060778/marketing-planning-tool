$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var spGetAll = "GET_ALL_PLAN";
var spInsertPlan = "INS_PLAN";
var spUpdatePlan = "UPD_PLAN";
var spDeletePlan = "DEL_PLAN";

/** ***********END STORED PROCEDURES*************** */

function getAllPlan(){
	var parameters = {};	
	var result = db.executeProcedureManual(spGetAll, {});	
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;	
}

function insertPlan(planName, createUser) {
	var param = {};
	param.in_name = planName;
	param.in_user_id = createUser; // User that insert.
	
	return db.executeScalar(spInsertPlan, param, "out_plan_id");
}

function updatePlan(planId, planName, modUser) {
	var param = {};
	param.in_plan_id = planId;
	param.in_name = planName;
	param.in_user_id = modUser; // User that updates

	return db.executeScalar(spUpdatePlan, param, "out_result");
}

function deletePlan(planId, modUser) {
	var param = {};
	param.in_plan_id = planId;
	param.in_modified_user_id = modUser; // User that insert.

	return db.executeScalar(spDeletePlan, param, "out_result");
}
