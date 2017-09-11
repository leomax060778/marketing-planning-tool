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
/*var COST_CENTER_EMPLOYEE_RESPONSIBLE_NOT_FOUND = "The Cost Center EMPLOYEE RESPONSIBLE can not be found.";
var COST_CENTER_EMPLOYEE_RESPONSIBLE_ID_NOT_FOUND = "The Cost Center EMPLOYEE RESPONSIBLE ID can not be found.";
var COST_CENTER_EMPLOYEE_RESPONSIBLE_FULL_NAME_NOT_FOUND = "The Cost Center EMPLOYEE RESPONSIBLE FULL NAME can not be found.";
var COST_CENTER_EMPLOYEE_RESPONSIBLE_EMPLOYEE_NUMBER_NOT_FOUND = "The Cost Center EMPLOYEE RESPONSIBLE NUMBER can not be found.";*/
var COST_CENTER_TEAMS_NOT_FOUND = "The Cost Center TEAMS can not be found.";
var COST_CENTER_TEAMS_NOT_VALID = "The Cost Center TEAMS are not valid";
var COST_CENTER_EMPLOYEE_RESPONSIBLE_NOT_VALID = "The Cost Center EMPLOYEES RESPONSIBLE are not valid";

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
	rdo.NAME = costCenter.NAME;
	rdo.SALE_ORGANIZATION_ID = costCenter.SALE_ORGANIZATION_ID;

	rdo.COST_CENTER_TEAMS = getAssignedTeams(costCenterId);
	rdo.COST_CENTER_AVAILABLE_TEAMS = getCostCenterAvailableTeams(1,costCenterId);
	rdo.COST_CENTER_EMPLOYEE_RESPONSIBLE = getAssignedEmployeeResponsible(costCenterId);
	rdo.COST_CENTER_AVAILABLE_EMPLOYEE_RESPONSIBLE = getCostCenterAvailableEmployeeResponsible(1,costCenterId);
	return rdo;
}

function getCostCenterByL6Id(hl6Id){
	if(!hl6Id)
		throw ErrorLib.getErrors().CustomError("",
			"costCenterServices/handleget/getCostCenterById",
			"Tactic/Campign & Activity ID is not found");

	var costCenters = JSON.parse(JSON.stringify(dataCostCenter.getCostCenterByL6Id(hl6Id)));
	costCenters.forEach(function(costCenter){
		costCenter.employeeResponsible = getAssignedEmployeeResponsible(costCenter.COSTCENTER_ID);
	});
	return costCenters;

	//return dataCostCenter.getCostCenterByL6Id(hl6Id);
}

function getCostCenterAvailableTeams(editMode,costCenterId){
	var availableTeams = [];
	var teams = dataCostCenter.getCostCenterAvailableTeams(editMode || 0, costCenterId || 0);
	teams.forEach(function(team){
		availableTeams.push({HL3_ID: team.HL3_ID, PATH: 'CRM-' + team.PATH});
	});
	return availableTeams;
}

function getCostCenterAvailableEmployeeResponsible(editMode,costCenterId){
	return dataCostCenter.getCostCenterAvailableEmployeeResponsible(editMode || 0, costCenterId || 0);
}

function getCostCenterByL5IdSaleOrganizationId(hl5Id, saleOrganizationId, userId){
	var costCenter = JSON.parse(JSON.stringify(dataCostCenter.getCostCenterByL5IdSaleOrganizationId(hl5Id, saleOrganizationId)));
	if(costCenter)
		costCenter.employeeResponsible = getAssignedEmployeeResponsible(costCenter.COST_CENTER_ID);
	else
		costCenter = {};
	return costCenter;
}

function getAssignedTeams(costCenterId){
	var assignedTeams = [];
	var teams = dataCostCenter.getCostCenterTeamsByCostCenterId(costCenterId);
	teams.forEach(function(team){
		assignedTeams.push({HL3_ID: team.HL3_ID, PATH: 'CRM-' + team.PATH});
	});
	return assignedTeams;
}

function getAssignedEmployeeResponsible(costCenterId){
	return dataCostCenter.getCostCenterEmployeeResponsibleByCostCenterId(costCenterId);
}

function insCostCenter(data, userId){
	data = uiToServerParser(data);
	return dataCostCenter.insCostCenter(data.NAME, data.DESCRIPTION || null, userId, data.CODE, data.SALE_ORGANIZATION_ID);
}

function insEmployeeResponsible(data, costCenterId , userId, isUpload){
	data = uiToServerParser(data);

	var employeeResponsibleId = data.employee_responsible.EMPLOYEE_RESPONSIBLE_ID;
	if(employeeResponsibleId){
		dataEmployeeResponsible.updEmployeeResponsible(employeeResponsibleId, data.employee_responsible.FULL_NAME, data.employee_responsible.EMPLOYEE_NUMBER, userId);
	} else if(data.employee_responsible.FULL_NAME && data.employee_responsible.EMPLOYEE_NUMBER){
		employeeResponsibleId = dataEmployeeResponsible.insEmployeeResponsible(data.employee_responsible.FULL_NAME, data.employee_responsible.EMPLOYEE_NUMBER, userId);
	} else {
		employeeResponsibleId = null;
	}

	if(employeeResponsibleId && !dataCostCenter.getCostCenterEmployee(employeeResponsibleId, costCenterId)) {
        insCostCenterEmployeeResponsible(costCenterId, employeeResponsibleId, userId);
    }

    return employeeResponsibleId;
}

function insCostCenterTeams(costCenterId, costCenterTeams, userId, marketingOrganizationId, isUpload){
    var teamIdsCollection = [];
	if(!isUpload){
        teamIdsCollection = costCenterTeams.map(function(elem){
            return {in_team_id : elem}
        });
	} else {
        teamIdsCollection.push({in_team_id: costCenterTeams});
	}

	var teamIdsToInsert = existCostCentermarketingOrganizationTeams(marketingOrganizationId, teamIdsCollection, costCenterId);
    var insCostCenterTeams = teamIdsToInsert.map(function(elem){
        return {in_cost_center_id: costCenterId, in_hl3_id : elem, in_user_id: userId}
    });

	dataCostCenter.insCostCenterTeams(insCostCenterTeams);
}

function existCostCentermarketingOrganizationTeams(marketingOrganizationId, teamIdsCollection, costCenterId){
	var rdo = dataCostCenter.getCostCenterTeamByMarketingOrganizationIdTeamId(marketingOrganizationId, teamIdsCollection);
	if(rdo && rdo.COST_CENTER_ID && rdo.COST_CENTER_ID != costCenterId){
		throw ErrorLib.getErrors().CustomError("",
			"costCenterServices/handlePost/insCostCenterTeams/existCostCenterTeams",
			"The team " + rdo.PATH + " is already assigned to " + rdo.MARKETING_ORGANIZATION_NAME + " marketing organization on cost center " + rdo.COST_CENTER_DESCRIPTION);
	}

	rdo = dataCostCenter.getCostCenterTeamByCostCenterIdTeamId(costCenterId, teamIdsCollection);
	var teamIdsToInsert = [];

	var aux = {};
    rdo.forEach(function (elem) {
    	aux[elem.HL3_ID] = true;
    });

    teamIdsCollection.forEach(function (elem) {
        if(!aux[elem.in_team_id])teamIdsToInsert.push(elem.in_team_id);
	});

	return teamIdsToInsert;
}

function insCostCenterEmployeeResponsible(costCenterId, employeeResponsibleId, userId){
	return dataCostCenter.insCostCenterEmployeeResponsible(costCenterId, employeeResponsibleId, userId);
}

function delCostCenterTeamsByCostCenterId(costCenterId, userId, type){
	if(type == 'hard')
		return dataCostCenter.delHardCostCenterTeamsByCostCenterId();

	return dataCostCenter.delCostCenterTeamsByCostCenterId(costCenterId, userId);
}

function delCostCenterEmployeeResponsibleByCostCenterId(costCenterId, userId, type){
	if(type == 'hard')
		return dataCostCenter.delHardCostCenterEmployeeResponsibleByCostCenterId(costCenterId);

	return dataCostCenter.delCostCenterEmployeeResponsibleByCostCenterId(costCenterId, userId);
}

function updCostCenter(data, userId, isUpload){

	data = uiToServerParser(data);
	var costCenterId = data.COST_CENTER_ID;

	var costCenter = getCostCenterById(data.COST_CENTER_ID);
	var validation = costCenterInUse(costCenterId).length && costCenter.SALE_ORGANIZATION_ID != data.SALE_ORGANIZATION_ID;
	if(validation){
        if(!isUpload){
            throw ErrorLib.getErrors().CustomError("",
                "costCenterServices/handleUpdate/updCostCenter",
                "Cannot change Cost Center Marketing Organization. Cost Center is in use.");
		}
	} else {
        dataCostCenter.updCostCenter(data.COST_CENTER_ID, data.NAME, data.DESCRIPTION, userId, data.CODE, data.SALE_ORGANIZATION_ID);
	}

	if(!isUpload) {
		var firstTime = true;
		data.employee_responsible.forEach(function(employeeResponsible){
			if(!employeeResponsible.EMPLOYEE_RESPONSIBLE_ID){
				employeeResponsible.EMPLOYEE_RESPONSIBLE_ID = dataEmployeeResponsible.insEmployeeResponsible(employeeResponsible.FULL_NAME, employeeResponsible.EMPLOYEE_NUMBER, userId);
			}
						updCostCenterEmployeeResponsible(costCenterId, employeeResponsible.EMPLOYEE_RESPONSIBLE_ID, userId, firstTime);
			firstTime = false;
		});
		updCostCenterTeams(data.COST_CENTER_ID, data.cost_center_teams, userId, data.SALE_ORGANIZATION_ID);
	} else {
		updCostCenterEmployeeResponsible(costCenterId, data.employee_responsible.EMPLOYEE_RESPONSIBLE_ID, userId);
	}

	return data;
}

function updCostCenterTeams(costCenterId, costCenterTeams, userId, saleOrganizationId, isUpload) {
    var costCenterById = getCostCenterById(costCenterId);
    costCenterById.COST_CENTER_TEAMS.forEach(function (team) {
        if (!isUpload && costCenterTeams.indexOf(team.HL3_ID) === -1) {
            var costCenterByTeam = costCenterInUseByTeamSaleOrganization(costCenterId, team.HL3_ID, costCenterById.SALE_ORGANIZATION_ID);
            if (costCenterByTeam.length) {
                var msg = "Cannot remove: \n\r";
                var paths = [];

                costCenterByTeam.forEach(function (cc) {
                    msg += "CRM-" + cc.PATH + "\n\r";
                    paths.push(cc.PATH);
                });

                msg += "from Cost Center because it is in use.";
                throw ErrorLib.getErrors().CustomError(paths,
                    "costCenterServices/handleUpdate/updCostCenterTeam",
                    msg);
            } else {
                dataCostCenter.delCostCenterTeamsByCostCenterIdTeamId(costCenterId, team.HL3_ID, userId);
            }
        }
    });

    insCostCenterTeams(costCenterId, costCenterTeams, userId, saleOrganizationId, isUpload);
}

function updCostCenterEmployeeResponsible(costCenterId, costCenterEmployeeResponsible, userId, firsTime){
	if(firsTime)
		delCostCenterEmployeeResponsibleByCostCenterId(costCenterId, userId, 'hard');
	if(!dataCostCenter.getCostCenterEmployee(costCenterEmployeeResponsible, costCenterId)) {
		insCostCenterEmployeeResponsible(costCenterId, costCenterEmployeeResponsible, userId);
	}
}

function delCostCenter(data, userId){
	var costCenterId = data.in_cost_center_id;
	if(!costCenterId)
		throw ErrorLib.getErrors().CustomError("",
			"costCenterServices/handledelet/delCostCenter",
			"Cost Center ID is not found");

	if(costCenterInUse(costCenterId).length)
		throw ErrorLib.getErrors().CustomError("",
			"costCenterServices/handledelet/delCostCenter",
			"Cannot delete this Cost Center. It is in use.");

	delCostCenterTeamsByCostCenterId(costCenterId, userId, 'soft');
	delCostCenterEmployeeResponsibleByCostCenterId(costCenterId, userId, 'soft');

	return dataCostCenter.delCostCenterById(costCenterId, userId);
}

function costCenterInUse (costCenterId){
	return dataCostCenter.costCenterInUse(costCenterId);
}

function costCenterInUseByTeamSaleOrganization (costCenterId, teamId, saleOrganizationId){
	return dataCostCenter.costCenterInUseByTeamSaleOrganization(costCenterId, teamId, saleOrganizationId);
}

function validate(data, action, isUpload){
	var url = data.COST_CENTER_ID ? "costCenterServices/handlePut/updateCostCenter" : "costCenterServices/handlePost/insertCostCenter";
	if (!data)
		throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_NOT_FOUND);

	if(!data.NAME)
		throw ErrorLib.getErrors().CustomError("",url, COST_CENTER_SHORT_NAME_NOT_FOUND);

	if(!data.CODE)
		throw ErrorLib.getErrors().CustomError("",url, COST_CENTER_CODE_NOT_FOUND);

	/*if(!data.employee_responsible)
		throw ErrorLib.getErrors().CustomError("",url, COST_CENTER_EMPLOYEE_RESPONSIBLE_NOT_FOUND);

	if(data.employee_responsible.EMPLOYEE_RESPONSIBLE_ID && !Number(data.employee_responsible.EMPLOYEE_RESPONSIBLE_ID))
		throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_EMPLOYEE_RESPONSIBLE_ID_NOT_FOUND);

	if (!data.employee_responsible.FULL_NAME)
		throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_EMPLOYEE_RESPONSIBLE_FULL_NAME_NOT_FOUND);

	if (!data.employee_responsible.EMPLOYEE_NUMBER)
		throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_EMPLOYEE_RESPONSIBLE_EMPLOYEE_NUMBER_NOT_FOUND);*/

	var exist = existCostCenter(data);
	if (exist)
		throw ErrorLib.getErrors().CustomError("", url, "Another Cost Center with the same " + exist + " already exists.");

	if(action == 'update' && !isUpload) {
		if (!data.cost_center_teams || data.cost_center_teams.constructor !== Array || data.cost_center_teams.length === 0)
			throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_TEAMS_NOT_FOUND);

		if (!checkValidTeams(data.cost_center_teams))
			throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_TEAMS_NOT_VALID);

		if (!checkValidEmployeeResponsible(data.employee_responsible))
			throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_EMPLOYEE_RESPONSIBLE_NOT_VALID);
	}

	return 1;
}

function existCostCenter(data){
	return dataCostCenter.getCostCenterCountByCode(data.CODE, data.COST_CENTER_ID || 0) ? 'Code'
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

function checkValidEmployeeResponsible(employeeResponsible){
	var validTeams = true;

	for(var i = 0; i < employeeResponsible.length; i++){
		if(!employeeResponsible[i])
			throw ErrorLib.getErrors().CustomError("",url, COST_CENTER_EMPLOYEE_RESPONSIBLE_NOT_FOUND);

		if(employeeResponsible[i].EMPLOYEE_RESPONSIBLE_ID && !Number(employeeResponsible[i].EMPLOYEE_RESPONSIBLE_ID))
			throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_EMPLOYEE_RESPONSIBLE_ID_NOT_FOUND);

		if(!employeeResponsible[i].FULL_NAME)
			throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_EMPLOYEE_RESPONSIBLE_FULL_NAME_NOT_FOUND);

		if(!employeeResponsible[i].EMPLOYEE_NUMBER)
			throw ErrorLib.getErrors().CustomError("", url, COST_CENTER_EMPLOYEE_RESPONSIBLE_EMPLOYEE_NUMBER_NOT_FOUND);
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
	//TODO refactor this, we are keeping track of repeated costCenters *twice*
	var duplicatedCostCenter = [];
	var duplicatedCostCenterForEmployee = [];
	delCostCenterTeamsByCostCenterId(costCenterId, userId, 'hard');
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
			var budgetYearAcronym = '20' + pathParts[0].substr(2, 2);
			var organizationAcronym = pathParts[1];
			var budgetYear = dbBudget.getBudgetYear(budgetYearAcronym);
			var hl2 = dataHl2.getLevelByAcronymAndOrganizationAcronym(planAcronym,budgetYear.BUDGET_YEAR_ID,organizationAcronym);

			var teamId = dataHl3.getLevel3ByAcronym({IN_ACRONYM: costCenter.in_team, IN_HL2_ID: hl2.HL2_ID, IN_HL1_ID: hl2.HL1_ID}).HL3_ID;
			if (teamId) {
				if (duplicatedCostCenter.indexOf(costCenter.in_code) !== -1) {
					insCostCenterTeams(costCenterId, teamId, userId, costCenter.in_marketing_organization_id, isUpload);
				} else {
                    duplicatedCostCenter.push(costCenter.in_code);
                    updCostCenterTeams(costCenterId, teamId, userId, costCenter.in_marketing_organization_id,isUpload);
                }
            }
        }

        if (costCenter.employee_responsible) {
            if (duplicatedCostCenterForEmployee.indexOf(costCenter.in_code) === -1) {
                duplicatedCostCenterForEmployee.push(costCenter.in_code);
                delCostCenterEmployeeResponsibleByCostCenterId(costCenterId, userId, "hard");
            }
            insEmployeeResponsible(costCenter, costCenterId, userId, isUpload);
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