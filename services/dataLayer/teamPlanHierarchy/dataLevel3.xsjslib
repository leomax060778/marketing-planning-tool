$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// STORE PROCEDURE LIST NAME
var INS_HL3 = "INS_HL3";
var GET_ALL_HL3 = "GET_ALL_HL3";
var spGetHl3AllocatedBudget = "GET_HL3_ALLOCATED_BUDGET";
var spGetHl3ForSerach = "GET_HL3_FOR_SEARCH";
var UPD_HL3 = "UPD_HL3";
var GET_HL3 = "GET_HL3";
var GET_GLOBAL_TEAM = "GET_GLOBAL_TEAM";
var GET_HL3_BY_ACRONYM = "GET_HL3_BY_ACRONYM";
var DEL_HL3 = "DEL_HL3";
var spUpdateHl3BudgetStatus = "UPD_HL3_STATUS_BUDGET";

// Insert a new hl3
function insertHl3(objHl3, userId) {
	var parameters = {};
	parameters.in_acronym = objHl3.IN_ACRONYM;
	parameters.in_hl2_id = objHl3.IN_HL2_ID;
	parameters.in_hl3_description = objHl3.IN_HL3_DESCRIPTION;
	parameters.in_crm_id = null;
	parameters.in_business_owner_id = objHl3.IN_BUSINESS_OWNER_ID;
	parameters.in_hl3_fnc_budget_total = objHl3.IN_HL3_FNC_BUDGET_TOTAL;
	parameters.in_in_budget = objHl3.IN_IN_BUDGET;
	parameters.in_user_id = userId;
	parameters.out_hl3_id = '?';
	return db.executeScalarManual(INS_HL3, parameters, 'out_hl3_id');
}

/* Execute query to update an HL3 */
function updateLevel3(objHl3, userId) {
	var parameters = {};
	var result = {};
	parameters.in_hl3_id = objHl3.IN_HL3_ID;
	parameters.in_acronym = objHl3.IN_ACRONYM;
	parameters.in_hl3_description = objHl3.IN_HL3_DESCRIPTION;
	parameters.in_business_owner_id = objHl3.IN_BUSINESS_OWNER_ID;
	parameters.in_hl3_fnc_budget_total = objHl3.IN_HL3_FNC_BUDGET_TOTAL;
	parameters.in_in_budget = objHl3.IN_IN_BUDGET;
	parameters.in_user_id = userId;	
	var list = db.executeProcedureManual(UPD_HL3, parameters);
	result.out_result_hl3 = list.out_result_hl3;
	result.out_result_hl3_fnc = list.out_result_hl3_fnc;
	result.out_crm_id = list.out_crm_id;
	result.out_budget_flag = list.out_budget_flag;
	return result;
}

//Execute an Sp to retrieve HL3 data from HL2
function getAllLevel3(objHl2, userId, isSA) {
	var parameters = {};
	var result = {};
	parameters.in_hl2_id = Number(objHl2) || objHl2.IN_HL2_ID;
	parameters.in_user_id = userId;
	parameters.in_is_super_Admin = isSA ? 1 : 0;

	var list = db.executeProcedure(GET_ALL_HL3, parameters);
	result.out_result = db.extractArray(list.out_result);
	result.out_total_budget = list.out_total_budget;
	result.out_remaining_budget = list.out_remaining_budget;
	return result;
}

//Execute an SP to retrieve an HL3 by id
function getLevel3ById(objHl3, userId) {
	var parameters = {};
	parameters.in_hl3_id = objHl3.IN_HL3_ID;
	var result = db.executeProcedure(GET_HL3, parameters);
	var list = db.extractArray(result.out_result);
	if(list.length)
		return list[0];
	
	else
		return {};
}

function getLevel3ByAcronym(objHl3, userId) {
	var parameters = {};
	parameters.in_acronym = objHl3.IN_ACRONYM.toUpperCase();
	parameters.in_hl2_id = objHl3.IN_HL2_ID
	var result = db.executeProcedureManual(GET_HL3_BY_ACRONYM, parameters);
	var list = db.extractArray(result.out_result);
	if(list.length)
		return list[0];
	
	else
		return {};
}

function getGlobalTeams(userId) {
	var parameters = {};
	parameters.in_user_id = userId;
	var result = db.executeProcedure(GET_GLOBAL_TEAM, parameters);
	return db.extractArray(result.out_result);
}

function getHl3AllocatedBudget(hl3Id, hl4Id) {
	if(hl3Id && hl4Id){
		var rdo = db.executeDecimalManual(spGetHl3AllocatedBudget, {'in_hl3_id': hl3Id, 'in_hl4_id': hl4Id}, 'out_hl3_allocated_budget');
		return rdo;
	}
	return null;
}

function getLevel3ForSearch(){
	var parameters = {};
	var result = db.executeProcedure(spGetHl3ForSerach,parameters);	
	return db.extractArray(result.out_result);
}

/* Execute query to update an HL3 */
function deleteLevel3(objHl3, userId) {
	var parameters = {};
	var result = {};
	parameters.in_hl3_id = objHl3.IN_HL3_ID;
	parameters.in_user_id = userId;	
	return db.executeScalarManual(DEL_HL3, parameters, 'out_result');
}

function updateHl3BudgetStatus(hl3_id, userId, nextStatus){
	var parameters = {"in_hl3_id": hl3_id, "in_status_budget": nextStatus, "in_user_id": userId};
	var rdo = db.executeScalarManual(spUpdateHl3BudgetStatus, parameters, 'out_result');
	return rdo;
}
