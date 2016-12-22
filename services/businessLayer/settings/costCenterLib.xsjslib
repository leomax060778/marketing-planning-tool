$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataCostCenter = mapper.getDataCostCenter();
var dataHl2 = mapper.getDataLevel2();
var dataHl3 = mapper.getDataLevel3();
var dbMO = mapper.getDataMarketingOrganization();
var dataEmployeeResponsible = mapper.getDataEmployeeResponsible();
var dbBudget = mapper.getDataBudgetYear();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */
var map = {
	"in_cost_center_id": 'COST_CENTER_ID',
	"in_code": 'CODE',
	"in_name": 'NAME',
	"in_long_name": "DESCRIPTION",
	"in_employee_responsible_id": 'EMPLOYEE_RESPONSIBLE_ID',
	"in_full_name": "FULL_NAME",
	"in_employee_number": "EMPLOYEE_NUMBER",
	"in_marketing_organization_id": "SALE_ORGANIZATION_ID"
};

var COST_CENTER_NOT_FOUND = "The Cost Center can not be found.";
var COST_CENTER_SHORT_NAME_NOT_FOUND = "The Cost Center NAME can not be found.";
var COST_CENTER_CODE_NOT_FOUND = "The Cost Center CODE can not be found.";
var COST_CENTER_EMPLOYEE_RESPONSIBLE_NOT_FOUND = "The Cost Center EMPLOYEE RESPONSIBLE can not be found.";
var COST_CENTER_EMPLOYEE_RESPONSIBLE_ID_NOT_FOUND = "The Cost Center EMPLOYEE RESPONSIBLE ID can not be found.";
var COST_CENTER_EMPLOYEE_RESPONSIBLE_FULL_NAME_NOT_FOUND = "The Cost Center EMPLOYEE RESPONSIBLE FULL NAME can not be found.";
var COST_CENTER_EMPLOYEE_RESPONSIBLE_EMPLOYEE_NUMBER_NOT_FOUND = "The Cost Center EMPLOYEE RESPONSIBLE NUMBER can not be found.";
var COST_CENTER_TEAMS_NOT_FOUND = "The Cost Center TEAMS can not be found.";
var COST_CENTER_TEAMS_NOT_VALID = "The Cost Center TEAMS are not valid";

function getAllCostCenter(){
	return dataCostCenter.getAllCostCenter();
}

function getCostCenterById(costCenterId){
	if(!costCenterId)
		throw ErrorLib.getErrors().CustomError("",
			"costCenterServices/handleget/getCostCenterById",
			"The COSTCENTER_ID is not found");

	var costCenter = dataCostCenter.getCostCenterById(costCenterId);

	var rdo = {};

	rdo.CODE = costCenter.CODE;
	rdo.COST_CENTER_ID = costCenter.COST_CENTER_ID;
	rdo.DESCRIPTION = costCenter.DESCRIPTION;
	rdo.EMPLOYEE_RESPONSIBLE_ID = costCenter.EMPLOYEE_RESPONSIBLE_ID;
	rdo.NAME = costCenter.NAME;
	rdo.SALE_ORGANIZATION_ID = costCenter.SALE_ORGANIZATION_ID;

	rdo.COST_CENTER_TEAMS = getAssignedTeams(costCenterId);
	rdo.COST_CENTER_AVAILABLE_TEAMS = getCostCenterAvailableTeams(1,costCenterId);
	return rdo;
}

function getCostCenterByL6Id(hl6Id){
	if(!hl6Id)
		throw ErrorLib.getErrors().CustomError("",
			"costCenterServices/handleget/getCostCenterById",
			"Tactic/Campign & Activity ID is not found");

	return dataCostCenter.getCostCenterByL6Id(hl6Id);
}

function getCostCenterAvailableTeams(editMode,costCenterId){
	var availableTeams = [];
	var teams = dataCostCenter.getCostCenterAvailableTeams(editMode || 0, costCenterId || 0);
	teams.forEach(function(team){
		availableTeams.push({HL3_ID: team.HL3_ID, PATH: 'CRM-' + team.PATH});
	});
	return availableTeams;
}

function getCostCenterByL5IdSaleOrganizationId(hl5Id, saleOrganizationId, userId){
	return dataCostCenter.getCostCenterByL5IdSaleOrganizationId(hl5Id, saleOrganizationId);
}

function getAssignedTeams(costCenterId){
	var assignedTeams = [];
	var teams = dataCostCenter.getCostCenterTeamsByCostCenterId(costCenterId);
	teams.forEach(function(team){
		assignedTeams.push({HL3_ID: team.HL3_ID, PATH: 'CRM-' + team.PATH});
	});
	return assignedTeams;
}

function insCostCenter(data, userId){
	data = uiToServerParser(data);
	//validate(data, 'insert');

	var employeeResponsibleId = data.employee_responsible.EMPLOYEE_RESPONSIBLE_ID;
	if(employeeResponsibleId){
		dataEmployeeResponsible.updEmployeeResponsible(employeeResponsibleId, data.employee_responsible.FULL_NAME, data.employee_responsible.EMPLOYEE_NUMBER, userId);
	} else if(data.employee_responsible.FULL_NAME && data.employee_responsible.EMPLOYEE_NUMBER){
		employeeResponsibleId = dataEmployeeResponsible.insEmployeeResponsible(data.employee_responsible.FULL_NAME, data.employee_responsible.EMPLOYEE_NUMBER, userId);
	} else {
		employeeResponsibleId = null;
	}

	var costCenterId = dataCostCenter.insCostCenter(data.NAME, data.DESCRIPTION, userId, data.CODE, employeeResponsibleId, data.SALE_ORGANIZATION_ID);
	//insCostCenterTeams(costCenterId, data.cost_center_teams, userId);
	return costCenterId;
}

function insCostCenterTeams(costCenterId, costCenterTeams, userId, isUpload){
	if(!isUpload){
		costCenterTeams.forEach(function(teamId){
			dataCostCenter.insCostCenterTeams(costCenterId, userId, teamId);
		});
	} else {
		dataCostCenter.insCostCenterTeams(costCenterId, userId, costCenterTeams);
	}

}


function delCostCenterTeamsByCostCenterId(costCenterId, userId, type){
	if(type == 'hard')
		return dataCostCenter.delHardCostCenterTeamsByCostCenterId(costCenterId);

	return dataCostCenter.delCostCenterTeamsByCostCenterId(costCenterId, userId);
}

function updCostCenter(data, userId, isUpload){
	data = uiToServerParser(data);
	//validate(data, 'update',isUpload);
	var employeeResponsibleId = data.employee_responsible.EMPLOYEE_RESPONSIBLE_ID;
	if(employeeResponsibleId){
		dataEmployeeResponsible.updEmployeeResponsible(employeeResponsibleId, data.employee_responsible.FULL_NAME, data.employee_responsible.EMPLOYEE_NUMBER, userId);
	} else {
		employeeResponsibleId = dataEmployeeResponsible.insEmployeeResponsible(data.employee_responsible.FULL_NAME, data.employee_responsible.EMPLOYEE_NUMBER, userId);
	}
	dataCostCenter.updCostCenter(data.COST_CENTER_ID, data.NAME, data.DESCRIPTION, userId, data.CODE, employeeResponsibleId, data.SALE_ORGANIZATION_ID);

	if(!isUpload)
		updCostCenterTeams(data.COST_CENTER_ID, data.cost_center_teams ,userId);

	return data;
}

function updCostCenterTeams(costCenterId, costCenterTeams, userId, isUpload){
	delCostCenterTeamsByCostCenterId(costCenterId, userId, 'hard');
	insCostCenterTeams(costCenterId, costCenterTeams, userId, isUpload);
}

function delCostCenter(data, userId){
	var costCenterId = data.in_cost_center_id;
	if(!costCenterId)
		throw ErrorLib.getErrors().CustomError("",
			"costCenterServices/handledelet/delCostCenter",
			"Cost Center ID is not found");

	delCostCenterTeamsByCostCenterId(costCenterId, userId, 'soft');
	return dataCostCenter.delCostCenterById(costCenterId, userId);
}

function validate(data, action, isUpload){
	var url = data.COST_CENTER_ID ? "costCenterServices/handlePut/updateCostCenter" : "costCenterServices/handlePost/insertCostCenter";
	if (!data)
		throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_NOT_FOUND);

	if(!data.NAME)
		throw ErrorLib.getErrors().CustomError("",url, COST_CENTER_SHORT_NAME_NOT_FOUND);

	if(!data.CODE)
		throw ErrorLib.getErrors().CustomError("",url, COST_CENTER_CODE_NOT_FOUND);

	if(!data.employee_responsible)
		throw ErrorLib.getErrors().CustomError("",url, COST_CENTER_EMPLOYEE_RESPONSIBLE_NOT_FOUND);

	if(data.employee_responsible.EMPLOYEE_RESPONSIBLE_ID && !Number(data.employee_responsible.EMPLOYEE_RESPONSIBLE_ID))
		throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_EMPLOYEE_RESPONSIBLE_ID_NOT_FOUND);

	if (!data.employee_responsible.FULL_NAME)
		throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_EMPLOYEE_RESPONSIBLE_FULL_NAME_NOT_FOUND);

	if (!data.employee_responsible.EMPLOYEE_NUMBER)
		throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_EMPLOYEE_RESPONSIBLE_EMPLOYEE_NUMBER_NOT_FOUND);

	var exist = existCostCenter(data);
	if (exist)
		throw ErrorLib.getErrors().CustomError("", url, "Another Cost Center with the same " + exist + " already exists.");

	if(action == 'update' && !isUpload) {
		if (!data.cost_center_teams || data.cost_center_teams.constructor !== Array || data.cost_center_teams.length === 0)
			throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_TEAMS_NOT_FOUND);

		if (!checkValidTeams(data.cost_center_teams))
			throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_TEAMS_NOT_VALID);
	}

	return 1;
}

function existCostCenter(data){
	return dataCostCenter.getCostCenterCountByCode(data.CODE, data.COST_CENTER_ID || 0) ? 'Code'
		//:dataCostCenter.getCostCenterCountByName(data.NAME, data.COST_CENTER_ID || 0) ? 'Name'
		:null;
}

function checkValidTeams(teams){
	var validTeams = true;

	for(var i = 0; i < teams.length; i++){
		if(!dataHl3.getLevel3ById({IN_HL3_ID: teams[i]}).HL3_ID){
			validTeams = false;
			break
		}
	}
	return validTeams;
}

function uiToServerParser(object) {
	var data = JSON.stringify(object, function (key, value) {
		if (Array.isArray(value)) {
			return value;
		} else if (value && typeof value === 'object') {
			var replacement = {};
			Object.keys(value).forEach(function (k) {
				replacement[map[k] || k] = value[k];
			});
			return replacement;
		}
		return value;
	});

	data = JSON.parse(data);

	return data;
}

function uploadCostCenter(data, userId){
	var costCenterList = data.batch;
	var costCenterUpdated = 0;
	var costCenterCreated = 0;
	var costCenterId;
	var isUpload = true;
	var duplicatedCostCenter = [];
	costCenterList.forEach(function(costCenter){
		var cc = dataCostCenter.getCostCenterByCode(costCenter.in_code);

		if(!costCenter.employee_responsible || !costCenter.employee_responsible.in_employee_number){
			costCenter.employee_responsible.in_employee_responsible_id = 0;
		} else {
			var employeeResponsible = dataEmployeeResponsible.getEmployeeResponsibleByEmployeeNumber(costCenter.employee_responsible.in_employee_number);
			costCenter.employee_responsible.in_employee_responsible_id = employeeResponsible ? employeeResponsible.EMPLOYEE_RESPONSIBLE_ID : 0;
		}
		costCenter.in_name = costCenter.in_name || costCenter.in_code;

		var saleOrganization = dbMO.getMarketingOrganizationByName(costCenter.in_marketing_organization);
		costCenter.in_marketing_organization_id = saleOrganization ? saleOrganization.SALES_ORGANIZATION_ID : null;

		if(!cc || !cc.COST_CENTER_ID){
			costCenterId = insCostCenter(costCenter, userId);
			costCenterCreated++;
		} else {
			costCenter.in_cost_center_id = cc.COST_CENTER_ID;
			costCenterId = cc.COST_CENTER_ID;
			updCostCenter(costCenter, userId, isUpload);
			costCenterUpdated++;
		}

		if(costCenter.in_plan && costCenter.in_team) {
			var pathParts = costCenter.in_plan.split('-');
			var planAcronym = pathParts[0].substr(0, 2);
			//throw JSON.stringify(planAcronym);
			var budgetYearAcronym = '20' + pathParts[0].substr(2, 2);
			var organizationAcronym = pathParts[1];
			var budgetYear = dbBudget.getBudgetYear(budgetYearAcronym);
			var hl2 = dataHl2.getLevelByAcronymAndOrganizationAcronym(planAcronym,budgetYear.BUDGET_YEAR_ID,organizationAcronym);
			var teamId = dataHl3.getLevel3ByAcronym({IN_ACRONYM: costCenter.in_team, IN_HL2_ID: hl2.HL2_ID}).HL3_ID;
			if (teamId) {
				if (duplicatedCostCenter.indexOf(costCenter.in_code) !== -1) {
					insCostCenterTeams(costCenterId, teamId, userId, isUpload);
				} else {

					duplicatedCostCenter.push(costCenter.in_code);
					updCostCenterTeams(costCenterId, teamId, userId, isUpload);
				}
			}
		}
	});

	return {costCenterCreated: costCenterCreated, costCenterUpdated: costCenterUpdated};
}

function checkCostCenter(data){
	var costCenterList = data.check;
	var costCenterToUpdate = 0;
	var costCenterToInsert = 0;
	costCenterList.forEach(function(costCenter){
		if(dataCostCenter.getCostCenterByCode(costCenter.in_code)){
			costCenterToUpdate++;
		} else {
			costCenterToInsert++;
		}
	});

	return {costCenterToCreate: costCenterToInsert, costCenterToUpdate: costCenterToUpdate};
}