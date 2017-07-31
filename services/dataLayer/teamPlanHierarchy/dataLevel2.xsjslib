$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_HL2_BY_USER_ID = "GET_HL2_BY_USER_ID";
var GET_ALL_HL2 = "GET_ALL_HL2";
var GET_HL2_BY_ID = "GET_HL2_BY_ID";
var GET_HL2_BY_HL1_ID = "GET_HL2_BY_HL1_ID";
var spGetHl2ForSerach = "GET_HL2_FOR_SEARCH";
var GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL4_ID = "GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL4_ID";
var GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL5_ID = "GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL5_ID";
var INS_HL2 = "INS_HL2";
var UPD_HL2 = "UPD_HL2";
var COUNT_HL3_BY_HL2_ID = "COUNT_HL3_BY_HL2_ID";
var DEL_HL2 = "DEL_HL2";
var GET_HL2_BY_ORGANIZATION_ACRONYM = "GET_HL2_BY_ORGANIZATION_ACRONYM";
var GET_HL2_BY_ACRONYM_AND_ORGANIZATION_ACRONYM = "GET_HL2_BY_ACRONYM_AND_ORGANIZATION_ACRONYM";
var GET_ALL_CENTRAL_TEAM = "GET_ALL_CENTRAL_TEAM";
var spGetHl2AllocatedBudget = "GET_HL2_ALLOCATED_BUDGET";
var spUpdateHl2BudgetStatus = "UPD_HL2_STATUS_BUDGET";
var GET_ALL_HL2_VERSION_BY_HL2_ID = "GET_ALL_HL2_VERSION_BY_HL2_ID";
var INS_HL2_VERSION = "INS_HL2_VERSION";
var GET_HL2_VERSION_BY_FILTER = "GET_HL2_VERSION_BY_FILTER";
var GET_HL2_VERSION_BY_ID = "GET_HL2_VERSION_BY_ID";

function getLevel2ByUser(userId){
	
	
	var result = {};
	var parameters = {'IN_USER_ID': userId};	
	var list = db.executeProcedure(GET_HL2_BY_USER_ID, parameters);	
	result.out_result = db.extractArray(list.out_result);
	result.out_total_budget = list.out_total_budget;
	return result;
}

function getLevel2ById(objLevel2){
	if(objLevel2.IN_HL2_ID > 0)
	{
		var parameters = {'in_hl2_id': objLevel2.IN_HL2_ID};
		var result = db.executeProcedureManual(GET_HL2_BY_ID, parameters);
		var list = db.extractArray(result.out_result);
		if(list.length)
			return list[0];
		else
			return {};
	}
	return {};
}

function getAllCentralTeam(centralTeamId, budgetYearId){
	var parameters = {'in_hl2_id': centralTeamId, 'in_budget_year_id': budgetYearId || 0};
	var result = db.executeProcedureManual(GET_ALL_CENTRAL_TEAM,parameters);
	return db.extractArray(result.out_result);

}

function getLevelByAcronymAndOrganizationAcronym(acronym, budgeth_year_id, org_acronym){
	var parameters = {'in_acronym': acronym, 'IN_BUDGET_YEAR_ID':budgeth_year_id , 'in_org_acronym' : org_acronym};	
	var result = db.executeProcedureManual(GET_HL2_BY_ACRONYM_AND_ORGANIZATION_ACRONYM, parameters);	
	var list = db.extractArray(result.out_result);
	if(list.length)
		return list[0];
	else
		return null;
}

function getLevelByOrganizationAcronym(acronym){
	if(acronym !== "")
	{
		var parameters = {'in_acronym': acronym};	
		var result = db.executeProcedureManual(GET_HL2_BY_ORGANIZATION_ACRONYM, parameters);	
		var list = db.extractArray(result.out_result);
		if(list.length)
			return list[0];
		else
			return null;
	}
	return null;
}

function getAllLevel2(hl1Id){

	if(hl1Id){
		var parameters = {in_hl1_id: hl1Id};
		var result = db.executeProcedureManual(GET_ALL_HL2, parameters);
		return db.extractArray(result.out_result);
	}
	return null;

}

function getHl2AllocatedBudget(hl2Id, hl3Id) {
	if(hl2Id){
		var rdo = db.executeDecimalManual(spGetHl2AllocatedBudget, {'in_hl2_id': hl2Id, 'in_hl3_id': hl3Id}, 'out_hl2_allocated_budget');
		return rdo;
	}
	return null;
}

function getLevel2ForSearch(userSessionID, isSA, budget_year_id, region_id, subregion_id, limit, offset){
	var parameters = {
		in_user_id: userSessionID
		, in_isSA: isSA
		, in_budget_year_id: budget_year_id
		, in_region_id: region_id
		, in_subregion_id: subregion_id
		, in_limit: limit
		, in_offset: offset
	};
	var list = db.executeProcedure(spGetHl2ForSerach,parameters);

	var result = {};
	result.result = db.extractArray(list.out_result);
	result.total_rows = list.totalRows;
	return result;
}

function getHl2AllowAutomaticBudgetApprovalByHl4Id(l4Id){
    var parameters = {in_hl4_id: l4Id};
    return db.executeScalarManual(GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL4_ID,parameters,"out_result");
}

function getHl2AllowAutomaticBudgetApprovalByHl5Id(l5Id){
	var parameters = {in_hl5_id: l5Id};
	return db.executeScalarManual(GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL5_ID,parameters,"out_result");
}

function insertLevel2(objLevel2, userId){
	var parameters = {};
	var result = {};
	parameters.in_user_id = userId;
	parameters.in_hl2_budget_total = objLevel2.IN_HL2_BUDGET_TOTAL;
	parameters.in_organization_acronym = objLevel2.IN_ORGANIZATION_ACRONYM;
	parameters.in_organization_name = objLevel2.IN_ORGANIZATION_NAME;
	parameters.in_implement_execution_level = objLevel2.IN_IMPLEMENT_EXECUTION_LEVEL;
	parameters.in_crt_related = objLevel2.IN_CRT_RELATED ? objLevel2.IN_CRT_RELATED : 0;
	parameters.in_hl1_id = objLevel2.IN_PLAN_ID;
	parameters.in_in_budget = objLevel2.IN_IN_BUDGET;
	parameters.in_allow_automatic_budget_approval = objLevel2.ALLOW_AUTOMATIC_BUDGET_APPROVAL || 0 ;
	return db.executeScalarManual(INS_HL2,parameters,"out_hl2_id");
}

function updateLevel2(objLevel2, userId){
	var parameters = {};
	parameters.in_hl2_id = objLevel2.IN_HL2_ID;
	parameters.in_modified_user_id = userId;
	parameters.in_hl2_budget_total = objLevel2.IN_HL2_BUDGET_TOTAL;
	parameters.in_organization_acronym = objLevel2.IN_ORGANIZATION_ACRONYM;
	parameters.in_organization_name = objLevel2.IN_ORGANIZATION_NAME;
	parameters.in_implement_execution_level = objLevel2.IN_IMPLEMENT_EXECUTION_LEVEL;
	parameters.in_crt_related = objLevel2.IN_CRT_RELATED ? objLevel2.IN_CRT_RELATED : 0;
	parameters.in_in_budget = objLevel2.IN_IN_BUDGET;
	parameters.in_allow_automatic_budget_approval = objLevel2.ALLOW_AUTOMATIC_BUDGET_APPROVAL || 0 ;
	parameters.in_version = objLevel2.VERSION;
	return db.executeScalarManual(UPD_HL2,parameters,"out_result");
}

function deleteHl2(objLevel2,modUser){
	var param = {};
	param.in_hl2_id = objLevel2.IN_HL2_ID;
	param.in_modified_user_id = modUser;
	return db.executeScalar(DEL_HL2,param,"out_result");
}

//COUNT NUMBER OF HL3 RELATED TO HL2
function countRelatedObjects(objLevel2){
	var parameters = {};
	parameters.in_hl2_id = objLevel2.IN_HL2_ID;
	return db.executeScalarManual(COUNT_HL3_BY_HL2_ID,parameters,"out_result");
}

function getHl2ByHl1Id(hl1Id, userId, isSuperAdmin) {
	var parameters = {};
	var result = {};
	parameters.in_hl1_id = hl1Id;
	parameters.in_user_id = userId;
	parameters.in_is_super_Admin = isSuperAdmin ? 1 : 0;
	var list = db.executeProcedureManual(GET_HL2_BY_HL1_ID, parameters);
	result.out_result = db.extractArray(list.out_result);
	result.out_total_budget = list.out_total_budget;
	result.out_remaining_budget = list.out_remaining_budget;
	return result;
}

function updateHl2BudgetStatus(hl2_id, userId, nextStatus){
	var parameters = {"in_hl2_id": hl2_id, "in_status_budget": nextStatus, "in_user_id": userId};
	var rdo = db.executeScalarManual(spUpdateHl2BudgetStatus, parameters, 'out_result');
	return rdo;
}

function getAllHl2VersionByHl2Id(hl2_id){
	var parameters = {'in_hl2_id': hl2_id};
	var result = db.executeProcedureManual(GET_ALL_HL2_VERSION_BY_HL2_ID,parameters);
	return db.extractArray(result.out_result);
}

function insertLevel2Version(hl2Id, version, acronym, description, budget, budgetYearId, crt_related, implement_execution_level, team_type_id, regionId, subregionId ,userId, organization_acronym, organization_name, in_budget,allow_automatic_budget_approval, hl1_id){
	var parameters = {};
	parameters.in_hl2_id = hl2Id;
	parameters.in_version = version;
	parameters.in_acronym = acronym;
	parameters.in_description = description;
	parameters.in_budget = budget;
	parameters.in_budget_year_id = budgetYearId;
	parameters.in_region_id = regionId;
	parameters.in_subregion_id = subregionId;
	parameters.in_crt_related = crt_related;
	parameters.in_implement_execution_level = implement_execution_level;
	parameters.in_team_type_id = team_type_id;
	parameters.in_created_user_id = userId;
	parameters.in_organization_acronym = organization_acronym;
	parameters.in_organization_name = organization_name;
	parameters.in_in_budget = in_budget;
	parameters.in_allow_automatic_budget_approval = allow_automatic_budget_approval;
	parameters.in_hl1_id = hl1_id;
	return db.executeScalarManual(INS_HL2_VERSION,parameters,"out_result");
}

function getLevel2VersionForFilter(hl1Id, userSessionID, isSA){
	var parameters = {
		in_hl1_id: hl1Id
		,in_user_id: userSessionID
		, in_is_super_admin: isSA ? 1: 0
	};
	var list = db.executeProcedure(GET_HL2_VERSION_BY_FILTER,parameters);
	return {out_result : db.extractArray(list.out_result)};
}

function getLevel2VersionById(hl2Id, version){
	if(hl2Id && version)
	{
		var parameters = {
			'in_hl2_id': hl2Id
			, 'in_version': version
		};
		var result = db.executeProcedureManual(GET_HL2_VERSION_BY_ID, parameters);
		var list = db.extractArray(result.out_result);
		if(list.length)
			return list[0];
		else
			return {};
	}
	return {};
}