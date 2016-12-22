$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_HL2_BY_USER_ID = "GET_HL2_BY_USER_ID";
var GET_ALL_HL2 = "GET_ALL_HL2";
var GET_HL2_BY_ID = "GET_HL2_BY_ID";
var GET_HL2_BY_ACRONYM = "GET_HL2_BY_ACRONYM";
var spGetHl2ForSerach = "GET_HL2_FOR_SEARCH";
var INS_HL2 = "INS_HL2";
var UPD_HL2 = "UPD_HL2";
var COUNT_HL3_BY_HL2_ID = "COUNT_HL3_BY_HL2_ID";
var DEL_HL2 = "DEL_HL2";
var GET_HL2_BY_ORGANIZATION_ACRONYM = "GET_HL2_BY_ORGANIZATION_ACRONYM";
var GET_HL2_BY_ACRONYM_AND_ORGANIZATION_ACRONYM = "GET_HL2_BY_ACRONYM_AND_ORGANIZATION_ACRONYM";
var GET_HL1_BY_FILTER = "GET_HL1_BY_FILTER";
var GET_ALL_CENTRAL_TEAM = "GET_ALL_CENTRAL_TEAM";
var spGetHl2AllocatedBudget = "GET_HL2_ALLOCATED_BUDGET";

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

function getLevel2ByAcronym(acronym){
	if(acronym !== "")
	{
		var parameters = {'in_acronym': acronym};	
		var result = db.executeProcedureManual(GET_HL2_BY_ACRONYM, parameters);	
		var list = db.extractArray(result.out_result);
		if(list.length)
			return list[0];
		else
			return null;
	}
	return null;
}

function getAllCentralTeam(centralTeamId){
	
	var parameters = {'in_hl2_id': centralTeamId};
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

function getAllLevel2(){
	var spResult = [];
	
	var parameters = {};	
	var result = db.executeProcedure(GET_ALL_HL2, parameters);	
	return db.extractArray(result.out_result);
}

function getHl2AllocatedBudget(hl2Id, hl3Id) {
	if(hl2Id){
		var rdo = db.executeDecimalManual(spGetHl2AllocatedBudget, {'in_hl2_id': hl2Id, 'in_hl3_id': hl3Id}, 'out_hl2_allocated_budget');
		return rdo;
	}
	return null;
}

function getLevel2ForSearch(){
	var parameters = {};
	var result = db.executeProcedure(spGetHl2ForSerach,parameters);	
	return db.extractArray(result.out_result);
}

/*EXECUTE QUERY TO INSERT NEW HL2*/
function insertLevel2(objLevel2, userId){
	var parameters = {};
	var result = {};
	parameters.in_acronym = objLevel2.IN_ACRONYM;
	parameters.in_description = objLevel2.IN_DESCRIPTION;
	parameters.in_budget_year_id = objLevel2.IN_BUDGET_YEAR_ID;
	parameters.in_region_id = objLevel2.IN_REGION_ID;
	parameters.in_subregion_id = objLevel2.IN_SUBREGION_ID;
	parameters.in_user_id = userId;
	parameters.in_hl2_budget_total = objLevel2.IN_HL2_BUDGET_TOTAL;
	parameters.in_organization_acronym = objLevel2.IN_ORGANIZATION_ACRONYM;
	parameters.in_organization_name = objLevel2.IN_ORGANIZATION_NAME;
	parameters.in_team_type_id = objLevel2.IN_TEAM_TYPE_ID;
	parameters.in_implement_execution_level = objLevel2.IN_IMPLEMENT_EXECUTION_LEVEL;
	return db.executeScalarManual(INS_HL2,parameters,"out_hl2_id");
}

/*EXECUTE QUERY TO UPDATE NEW HL2*/
function updateLevel2(objLevel2, userId){
	var parameters = {};
	parameters.in_hl2_id = objLevel2.IN_HL2_ID;
	parameters.in_acronym = objLevel2.IN_ACRONYM;
	parameters.in_region_id = objLevel2.IN_REGION_ID;
	parameters.in_subregion_id = objLevel2.IN_SUBREGION_ID;
	parameters.in_description = objLevel2.IN_DESCRIPTION;
	parameters.in_modified_user_id = userId;
	parameters.in_hl2_budget_total = objLevel2.IN_HL2_BUDGET_TOTAL;
	parameters.in_organization_acronym = objLevel2.IN_ORGANIZATION_ACRONYM;
	parameters.in_organization_name = objLevel2.IN_ORGANIZATION_NAME;
	parameters.in_team_type_id = objLevel2.IN_TEAM_TYPE_ID;
	parameters.in_implement_execution_level = objLevel2.IN_IMPLEMENT_EXECUTION_LEVEL;
	return db.executeScalarManual(UPD_HL2,parameters,"out_result");
}

function deleteHl2(objLevel2,modUser){
	var param = {};
	param.in_hl2_id = objLevel2.IN_HL2_ID;
	param.in_modified_user_id = modUser;
	return db.executeScalar(DEL_HL2,param,"out_result");
}

function deleteAllLevel2User(objLevel2){
	var param = {};
	parameters.in_hl2_id = objLevel2.IN_HL2_ID;
	return db.executeScalar(DEL_ALLHL2,param,"out_result");
}

//COUNT NUMBER OF HL3 RELATED TO HL2
function countRelatedObjects(objLevel2){
	var parameters = {};
	parameters.in_hl2_id = objLevel2.IN_HL2_ID;
	return db.executeScalar(COUNT_HL3_BY_HL2_ID,parameters,"out_result");
}

function getLevel2ByFilters(objFilter, userId, isSuperAdmin) {
	
	var parameters = {};
	var result = {};
	if(objFilter){
		if(objFilter.IN_BUDGET_YEAR_ID) parameters.in_budget_year_id = objFilter.IN_BUDGET_YEAR_ID;
		if(objFilter.IN_PLAN_ID) parameters.in_plan_id = objFilter.IN_PLAN_ID;
		if(objFilter.IN_REGION_ID) parameters.in_region_id = objFilter.IN_REGION_ID;
		if(objFilter.IN_SUBREGION_ID) parameters.in_subregion_id = objFilter.IN_SUBREGION_ID;
	}
	parameters.in_user_id = userId;
	

	var list = db.executeProcedure(GET_HL1_BY_FILTER, parameters);
	result.out_result = db.extractArray(list.out_result);
	result.out_total_budget = list.out_total_budget;
	return result;
}
