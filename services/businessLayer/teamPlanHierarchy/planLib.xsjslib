$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var data = mapper.getDataPlan();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllPlan(){	
	return data.getAllPlan();	
}

function insertPlan(plan, createUser) {
	if (validatePlan(userRole)) {
		return data.insertPlan(plan.PLAN_NAME, createUser);
	}
}

function updatePlan(plan, updateUser) {
	if (!util.validateIsNumber(plan.PLAN_ID))
		throw ErrorLib.getErrors().CustomError("",
				"planServices/handlePost/updatePlan", "The PLAN_ID is invalid");

	if (validatePlan(plan)) {
		return data.updatePlan(plan.PLAN_ID, plan.PLAN_NAME, updateUser);
	}
}

function deletePlan(plan, deleteUser) {
	if (!plan.PLAN_ID)
		throw ErrorLib.getErrors().CustomError("",
				"planServices/handleDelete/deletePlan",
				"The PLAN_ID is not found");

	if (!util.validateIsNumber(plan.PLAN_ID))
		throw ErrorLib.getErrors().CustomError("",
				"planServices/handleDelete/deletePlan", "The PLAN_ID is invalid");

	return data.deletePlan(plan.PLAN_ID, deleteUser);
}

function validatePlan(plan) {
	if (!plan)
		throw ErrorLib.getErrors().CustomError("",
				"planServices", "Plan is not found");
	
	if (!plan.PLAN_NAME)
		throw ErrorLib.getErrors().CustomError("",
				"planServices",
				"The PLAN_NAME is not found");
	return true;
}