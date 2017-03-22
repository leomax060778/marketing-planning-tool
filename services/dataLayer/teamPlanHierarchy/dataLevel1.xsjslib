$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_HL1 = "INS_HL1";
var UPD_HL1 = "UPD_HL1";
var DEL_HL1 = "DEL_HL1";
var GET_ALL_HL1 = "GET_ALL_HL1";
var GET_HL1_BY_ID = "GET_HL1_BY_ID";
var GET_HL1_BY_USER_ID = "GET_HL1_BY_USER_ID";
var GET_HL1_BY_ACRONYM = "GET_HL1_BY_ACRONYM";
var GET_COUNT_HL2_BY_HL1_ID = "GET_COUNT_HL2_BY_HL1_ID";
var GET_HL1_ALLOCATED_BUDGET = "GET_HL1_ALLOCATED_BUDGET";
var GET_HL1_FOR_SEARCH = "GET_HL1_FOR_SEARCH";
//var GET_ALL_CENTRAL_TEAM = "GET_ALL_CENTRAL_TEAM"; //TODO: review in integration
var GET_HL1_BY_FILTER = "GET_HL1_BY_FILTER";

function insertLevel1(acronym, description, budgetYearId, regionId, subregionId, userId, budget, teamTypeId, implementExecutionLevel, crtRelated){
    var parameters = {};
    var result = {};
    parameters.in_acronym = acronym;
    parameters.in_description = description;
    parameters.in_budget_year_id = budgetYearId;
    parameters.in_region_id = regionId;
    parameters.in_subregion_id = subregionId;
    parameters.in_user_id = userId;
    parameters.in_budget = budget;
    parameters.in_team_type_id = teamTypeId;
    parameters.in_implement_execution_level = implementExecutionLevel;
    parameters.in_crt_related = crtRelated;
    return db.executeScalarManual(INS_HL1, parameters, "out_hl1_id");
}

function updateLevel1(hl1Id, acronym, description, budgetYearId, regionId, subregionId, userId, budget, teamTypeId, implementExecutionLevel, crtRelated){
    var parameters = {};
    parameters.in_hl1_id = hl1Id;
    parameters.in_acronym = acronym;
    parameters.in_region_id = regionId;
    parameters.in_budget_year_id = budgetYearId;
    parameters.in_subregion_id = subregionId;
    parameters.in_description = description;
    parameters.in_modified_user_id = userId;
    parameters.in_budget = budget;
    parameters.in_team_type_id = teamTypeId;
    parameters.in_implement_execution_level = implementExecutionLevel;
    parameters.in_crt_related = crtRelated;
    return db.executeScalarManual(UPD_HL1, parameters, "out_result");
}

function deleteHl1(hl1Id, userId){
    var param = {};
    param.in_hl1_id = hl1Id;
    param.in_modified_user_id = userId;
    return db.executeScalarManual(DEL_HL1, param, "out_result");
}

function getAllLevel1(){
    var parameters = {};
    var result = db.executeProcedureManual(GET_ALL_HL1, parameters);
    return db.extractArray(result.out_result);
}

function getLevel1ById(hl1Id){
    if(hl1Id > 0)
    {
        var parameters = {'in_hl1_id': hl1Id};
        var result = db.executeProcedureManual(GET_HL1_BY_ID, parameters);
        var list = db.extractArray(result.out_result);
        if(list.length)
            return list[0];
        else
            return {};
    }
    return {};
}

function getLevel1ByUser(userId){
    var result = {};
    var parameters = {'in_user_id': userId};
    var list = db.executeProcedureManual(GET_HL1_BY_USER_ID, parameters);
    result.out_result = db.extractArray(list.out_result);
    result.out_total_budget = list.out_total_budget;
    return result;
}

function getLevel1ByAcronymByBudgetYearId(acronym, budgetYearId){
    if(acronym !== "")
    {
        var parameters = {'in_acronym': acronym, 'in_budget_year_id': budgetYearId};
        var result = db.executeProcedureManual(GET_HL1_BY_ACRONYM, parameters);
        var list = db.extractArray(result.out_result);
        if(list.length)
            return list[0];
        else
            return null;
    }
    return null;
}

function countRelatedObjects(hl1Id){
    var parameters = {};
    parameters.in_hl1_id = hl1Id;
    return db.executeScalarManual(GET_COUNT_HL2_BY_HL1_ID, parameters, "out_result");
}

function getHl1AllocatedBudget(hl1Id, hl2Id) {
    if(hl1Id){
        var rdo = db.executeDecimalManual(GET_HL1_ALLOCATED_BUDGET, {'in_hl1_id': hl1Id, 'in_hl2_id': hl2Id}, 'out_hl1_allocated_budget');
        return rdo;
    }
    return null;
}

function getLevel1ForSearch(userSessionID, isSA){
	var parameters = {in_user_id: userSessionID, in_isSA: isSA};
    var result = db.executeProcedureManual(GET_HL1_FOR_SEARCH, parameters);
    return db.extractArray(result.out_result);
}

function getAllCentralTeam(centralTeamId){
    var parameters = {'in_hl1_id': centralTeamId};
    var result = db.executeProcedureManual(GET_ALL_CENTRAL_TEAM,parameters);
    return db.extractArray(result.out_result);

}

function getLevel1ByFilters(budgetYearId, regionId, subRegionId, userId, isSuperAdmin) {
    var parameters = {};
    var result = {};
    parameters.in_budget_year_id = budgetYearId;
    parameters.in_region_id = regionId;
    parameters.in_subregion_id = subRegionId;
    parameters.in_user_id = userId;
    parameters.in_is_super_Admin = isSuperAdmin ? 1 : 0;

    var list = db.executeProcedureManual(GET_HL1_BY_FILTER, parameters);
    result.out_result = db.extractArray(list.out_result);
    result.out_total_budget = list.out_total_budget;
    return result;
}