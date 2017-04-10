/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var GET_ALL_COST_CENTER = "GET_ALL_COST_CENTER";
var GET_COST_CENTER_BY_ID = "GET_COST_CENTER_BY_ID";
var GET_COST_CENTER_BY_CODE = "GET_COST_CENTER_BY_CODE";
var GET_COST_CENTER_BY_HL6_ID = "GET_COST_CENTER_BY_HL6_ID";
var GET_COST_CENTER_TEAMS_BY_CENTER_ID = "GET_COST_CENTER_TEAMS_BY_CENTER_ID";
var GET_COST_CENTER_COUNT_BY_CODE = "GET_COST_CENTER_COUNT_BY_CODE";
var GET_COST_CENTER_COUNT_BY_NAME = "GET_COST_CENTER_COUNT_BY_NAME";
var GET_COST_CENTER_AVAILABLE_TEAMS = "GET_COST_CENTER_AVAILABLE_TEAMS";
var INS_COST_CENTER = "INS_COST_CENTER";
var INS_COST_CENTER_TEAMS = "INS_COST_CENTER_TEAMS";
var UPD_COST_CENTER = "UPD_COST_CENTER";
var DEL_COST_CENTER_BY_ID = "DEL_COST_CENTER_BY_ID";
var DEL_COST_CENTER_TEAMS_BY_COST_CENTER_ID = "DEL_COST_CENTER_TEAMS_BY_COST_CENTER_ID";
var DEL_HARD_COST_CENTER_TEAMS_BY_COST_CENTER_ID = "DEL_HARD_COST_CENTER_TEAMS_BY_COST_CENTER_ID";
var DEL_COST_CENTER_TEAMS_BY_TEAM_ID = "DEL_COST_CENTER_TEAMS_BY_TEAM_ID";
/******************************************************/

function getAllCostCenter(){
	var parameters = {};
	var list = db.executeProcedureManual(GET_ALL_COST_CENTER, parameters);
	return db.extractArray(list.out_result);
}

function getCostCenterById(id){
	var parameters = {in_cost_center_id: id};
	var list = db.executeProcedureManual(GET_COST_CENTER_BY_ID, parameters);
	return db.extractArray(list.out_result)[0];
}

function getCostCenterByCode(code){
	var parameters = {in_code: code};
	var list = db.executeProcedureManual(GET_COST_CENTER_BY_CODE, parameters);
	return db.extractArray(list.out_result)[0];
}

function getCostCenterByL6Id(id){
	var parameters = {in_hl6_id: id};
	var list = db.executeProcedureManual(GET_COST_CENTER_BY_HL6_ID, parameters);
	return db.extractArray(list.out_result);
}

function getCostCenterCountByCode(code,costCenterId){
	var parameters = {
		in_cost_center_id: costCenterId,
        in_cost_center_code: code
	};
	return db.executeScalarManual(GET_COST_CENTER_COUNT_BY_CODE, parameters, 'out_result');
}

function getCostCenterCountByName(name,costCenterId){
	var parameters = {
		in_cost_center_id: costCenterId,
		in_name: name
	};
	return db.executeScalarManual(GET_COST_CENTER_COUNT_BY_NAME, parameters, 'out_result');
}

function getCostCenterTeamsByCostCenterId(id){
	var parameters = {in_cost_center_id: id};
	var list = db.executeProcedureManual(GET_COST_CENTER_TEAMS_BY_CENTER_ID, parameters);
	return db.extractArray(list.out_result);
}

function getCostCenterAvailableTeams(editMode, costCenterId){
	var parameters = {
			in_edit_mode: editMode,
			in_cost_center_id: costCenterId
			};
	var list = db.executeProcedureManual(GET_COST_CENTER_AVAILABLE_TEAMS, parameters);
	return db.extractArray(list.out_result);
}

function insCostCenter(name, description, userId, code, employeeResponsibleId){
	var parameters = {
		in_name: name,
		in_user_id: userId,
		in_code: code,
		in_description: description,
		in_employee_responsible_id: employeeResponsibleId
	};
	return db.executeScalarManual(INS_COST_CENTER, parameters, 'out_cost_center_id');
}

function insCostCenterTeams(costCenterId, userId, hl3Id){
	var parameters = {
		in_user_id: userId,
		in_hl3_id: hl3Id,
		in_cost_center_id: costCenterId
	};
	return db.executeScalarManual(INS_COST_CENTER_TEAMS, parameters, 'out_cost_center_teams_id');
}

function updCostCenter(costCenterId, name, description, userId, code, employeeResponsibleId){
	var parameters = {
		in_cost_center_id: costCenterId,
		in_name: name,
		in_description: description,
		in_user_id: userId,
		in_code: code,
		in_employee_responsible_id: employeeResponsibleId
	};
	return db.executeScalarManual(UPD_COST_CENTER, parameters, 'out_result');
}

function delCostCenterById(id, userId){
	var parameters = {
		in_cost_center_id: id,
		in_user_id: userId
	};
	return db.executeScalarManual(DEL_COST_CENTER_BY_ID, parameters, 'out_result');
}

function delCostCenterTeamsByCostCenterId(id, userId){
	var parameters = {
		in_cost_center_id: id,
		in_user_id: userId
	};
	return db.executeScalarManual(DEL_COST_CENTER_TEAMS_BY_COST_CENTER_ID, parameters, 'out_result');
}

function delHardCostCenterTeamsByCostCenterId(id){
	var parameters = {in_cost_center_id: id};
	return db.executeScalarManual(DEL_HARD_COST_CENTER_TEAMS_BY_COST_CENTER_ID, parameters, 'out_result');
}

function delCostCenterTeamsByTeamId(id, userId){
	var parameters = {
		in_hl3_id: id,
		in_user_id: userId
	};
	return db.executeScalarManual(DEL_COST_CENTER_TEAMS_BY_TEAM_ID, parameters, 'out_result');
}

