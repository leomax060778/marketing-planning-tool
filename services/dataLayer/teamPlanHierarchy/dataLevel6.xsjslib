/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetHl6Byhl5Id = "GET_HL6_BY_HL5_ID";
var spGetHl6ById = "GET_HL6_BY_ID";
var spGetHl6ByAcronym = "GET_HL6_BY_ACRONYM";
var spGetHl6StatusByHl6Id = "GET_HL6_STATUS_BY_HL6_ID";
var spGetHl6ForSearch = "GET_HL6_FOR_SEARCH";
var spGetAllHl6 = "GET_ALL_HL6";
var spGetHl6TotalBudgetByHl5Id = "GET_ALL_HL6_TOTAL_BUDGET";
var spGetHl6RemainingBudgetByHl5Id = "GET_ALL_HL6_REMAINING_BUDGET";

/********INSERT**********************/
var spInsHl6CrmBinding = "INS_HL6_CRM_BINDING";
var spInsHl6LogStatus = "INS_HL6_LOG_STATUS";
var spInsHl6 = "INS_HL6";

var spInsHl6Sales = "INS_HL6_SALES";
var spInsHl6Budget = "INS_HL6_BUDGET";

/************OTHER*********************/
var spHl6ChangeInOutBudget = "HL6_CHANGE_IN_OUT_BUDGET";
var spHl6ExistsInCrm = "HL6_EXISTS_IN_CRM";
var spHl6ChangeStatus = "HL6_CHANGE_STATUS";

/***********UPDATE***********************/
var spUpdHl6ChangedFields = "UPD_HL6_CHANGED_FIELDS";
var spUpdHl6 = "UPD_HL6";

/**********DELETE************************/
var spDelHl6ById = "DEL_HL6_BY_ID";
var spDelHl6Budget = "DEL_HL6_BUDGET";
var spDelHl6BudgetHard = "DEL_HL6_BUDGET_HARD";
var spDelHl6Sales = "DEL_HL6_SALES";
var spDelHl6SalesHard = "DEL_HL6_SALES_HARD";
/******************************************************/
var spInsertHl6CRMBinding = "INS_HL6_CRM_BINDING";
var spUpdateHl6CRMBinding = "UPD_HL6_CHANGED_FIELDS";
var spGetHl6MyBudgetByHl6Id = "GET_HL6_BUDGET_BY_HL6_ID";
var spGetHl6SalesByHl6Id = "GET_HL6_SALES_BY_HL6_ID";

/*inserts*/
function insertHl6(hl6CrmDescription,budget,hl5Id, routeToMarket
    ,campaignObjectiveId,campaignTypeId,campaignSubTypeId,marketingProgramId,marketingActivityId
    ,actualStartDate,actualEndDate,showOnDgCalendar,businessOwnerId,employeeResponsibleId,costCenterId, inBudget
    ,budgetSpendQ1,budgetSpendQ2,budgetSpendQ3,budgetSpendQ4,euroConversionId,hl6StatusDetailId,salesOrganizationId,createdUserId,autoCommit){
    var params = {
        'in_hl6_crm_description' : hl6CrmDescription,
        'in_budget' : budget,
        'in_hl5_id' : hl5Id,
        'in_route_to_market_id' : routeToMarket,
        'in_campaign_objective_id' : campaignObjectiveId,
        'in_campaign_type_id' : campaignTypeId,
        'in_campaign_subtype_id' : campaignSubTypeId,
        'in_marketing_program_id' : marketingProgramId,
        'in_marketing_activity_id' : marketingActivityId,

        'in_actual_start_date' : actualStartDate,
        'in_actual_end_date' : actualEndDate,
        'in_show_on_dg_calendar' : showOnDgCalendar,
        'in_business_owner_id' : businessOwnerId,
        'in_employee_responsible_id' : employeeResponsibleId,
        'in_cost_center_id' : costCenterId,

        'in_in_budget' : inBudget,
        'in_budget_spend_q1' : budgetSpendQ1,
        'in_budget_spend_q2' : budgetSpendQ2,
        'in_budget_spend_q3' : budgetSpendQ3,
        'in_budget_spend_q4' : budgetSpendQ4,
        'in_euro_conversion_id' : euroConversionId,
        'in_hl6_status_detail_id' : hl6StatusDetailId,
        'in_sales_organization_id' : salesOrganizationId,
        'in_created_user_id' : createdUserId
    };
    
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spInsHl6,params,'out_hl6_id');
    }else{
        rdo = db.executeScalarManual(spInsHl6,params,'out_hl6_id');
    }
    return rdo;
}

/*en inserts*/


function getHl6ByHl5Id(hl5Id, autoCommit) {
    var params = {
        'in_hl5_id': hl5Id
    };
    var rdo;
    if (autoCommit) {
        rdo = db.executeProcedure(spGetHl6Byhl5Id, params);
    } else {
        rdo = db.executeProcedureManual(spGetHl6Byhl5Id, params);
    }
    return db.extractArray(rdo.out_result);
}

function getHl6TotalBudgetByHl5Id(hl5Id) {
	var params = { 'in_hl5_id': hl5Id };
	return db.executeDecimalManual(spGetHl6TotalBudgetByHl5Id, params, 'out_result');
	return rdo;
}

function getHl6RemainingBudgetByHl5Id(hl5Id, total_budget) {
	var params = { 'in_hl5_id': hl5Id, 'in_total_budget': total_budget };
	return db.executeDecimalManual(spGetHl6RemainingBudgetByHl5Id, params, 'out_result');
}

function getHl6ById(hl6Id, autoCommit) {
    var params = {
        'in_hl6_id' : hl6Id
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeProcedure(spGetHl6ById,params);
    }else{
        rdo = db.executeProcedureManual(spGetHl6ById,params);
    }
    return db.extractArray(rdo.out_result)[0];
}

function getHl6ByAcronym(hl6Acronym,hl5Id, autoCommit) {
    var params = {
        'in_acronym' : hl6Acronym,
        'in_hl5_id' : hl5Id
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeProcedure(spGetHl6ByAcronym,params);
    }else{
        rdo = db.executeProcedureManual(spGetHl6ByAcronym,params);
    }
    return db.extractArray(rdo.out_result)[0];
}

function getHl6StatusByHl6Id(hl6Id, autoCommit) {
    var params = {
        'in_hl6_id' : hl6Id
    };
    
    var rdo;
    if(autoCommit){
        rdo = db.executeProcedure(spGetHl6StatusByHl6Id,params);
    }else{
        rdo = db.executeProcedureManual(spGetHl6StatusByHl6Id,params);
    }
    return db.extractArray(rdo.out_result)[0];
}

function getHl6ForSearch(autoCommit) {
    var params = {};
    var rdo;
    if(autoCommit){
        rdo = db.executeProcedure(spGetHl6ForSearch,params);
    }else{
        rdo = db.executeProcedureManual(spGetHl6ForSearch,params);
    }
    return db.extractArray(rdo.out_result)[0];
}

function getAllHl6(autoCommit) {
    var params = {};
    var rdo;
    if(autoCommit){
        rdo = db.executeProcedure(spGetAllHl6,params);
    }else{
        rdo = db.executeProcedureManual(spGetAllHl6,params);
    }
    return db.extractArray(rdo.out_hl6)[0];
}

function insertHl6Budget(hl6Id,organizationId,percentage,organizationType,createdUserId,autoCommit){
    var params = {
        'in_hl6_id' : hl6Id,
        'in_organization_id'  : organizationId,
        'in_percentage' : percentage,
        'in_organization_type' : organizationType,
        'in_created_user_id': createdUserId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spInsHl6Budget,params,'out_hl6_budget_id');
    }else{
        rdo = db.executeScalarManual(spInsHl6Budget,params,'out_hl6_budget_id');
    }
    return rdo;
}

function insertHl6Sale(hl6Id,organizationId,amount,organizationType,description,createdUserId,autoCommit){
    var params = {
        'in_hl6_id' : hl6Id,
        'in_organization_id'  : organizationId,
        'in_amount' : amount,
        'in_organization_type' : organizationType,
        'in_description': description,
        'in_created_user_id' : createdUserId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spInsHl6Sales,params,'out_hl6_sales_id');
    }else{
        rdo = db.executeScalarManual(spInsHl6Sales,params,'out_hl6_sales_id');
    }
    return rdo;
}

function hl6ChangeInOUTBudget(hl6Id,budgetStatus, autoCommit) {
    var params = {
        'in_hl6_id': hl6Id ,
        'in_budget_status': budgetStatus
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spHl6ChangeInOutBudget,params,'out_result');
    }else{
        rdo = db.executeScalarManual(spHl6ChangeInOutBudget,params,'out_result');
    }
    return db.extractArray(rdo);
}

function updHl6ChangedFields(hl6IdCrmBinding,budgetStatus,columnName, changed,userId,displayName,autoCommit) {
    var params = {
        'in_hl6_crm_binding_id': hl6IdCrmBinding,
        'in_hl6_id': budgetStatus,
        'in_column_name' : columnName,
        'in_changed' : changed,
        'in_user_id' : userId,
        'in_display_name' : displayName
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spUpdHl6ChangedFields,params,'out_result');
    }else{
        rdo = db.executeScalarManual(spUpdHl6ChangedFields,params,'out_result');
    }
    return db.extractArray(rdo);
}

function delHl6Budget(hl6Id,modifiedUserId, autoCommit) {
    var params = {
        'in_hl6_id': hl6Id ,
        'in_modified_user_id': modifiedUserId
    };
    var rdo = db.executeScalarManual(spDelHl6Budget,params,'out_result');
    return rdo;
}

function delHl6BudgetHard(hl6Id,autoCommit) {
    var params = {
        'in_hl6_id': hl6Id
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spDelHl6BudgetHard,params,'out_result');
    }else{
        rdo = db.executeScalarManual(spDelHl6BudgetHard,params,'out_result');
    }
    return rdo;
}

function delHl6Sale(hl6Id,modifiedUserId,autoCommit) {
    var params = {
        'in_hl6_id': hl6Id,
        'in_modified_user_id' : modifiedUserId
    };
    var rdo = db.executeScalarManual(spDelHl6Sales,params,'out_result');
    return rdo;
}

function delHl6SaleHard(hl6Id,autoCommit) {
    var params = {
        'in_hl6_id': hl6Id
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spDelHl6SalesHard,params,'out_result');
    }else{
        rdo = db.executeScalarManual(spDelHl6SalesHard,params,'out_result');
    }
    return rdo;
}

function hl6ExistsInCrm(hl6Id,autoCommit) {
    var params = {
        'in_hl6_id' : hl6Id
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spHl6ExistsInCrm,params,'out_result');
    }else{
        rdo = db.executeScalarManual(spHl6ExistsInCrm,params,'out_result');
    }
    return rdo;
}

function hl6ChangeStatus(hl6Id,statusId,userId,autoCommit) {
    var params = {
        'in_hl6_id': hl6Id,
        'in_status_id': statusId,
        'in_user_id': userId
    };
    var rdo = db.executeScalarManual(spHl6ChangeStatus,params,'out_result');
    return rdo;
}

function insertHl6CRMBinding(hl6Id, columnName, changed, displayName, userId){
    var parameters = {
        "in_hl6_id": hl6Id,
        "in_column_name": columnName,
        "in_changed": changed,
        "in_user_id": userId,
        "in_display_name": displayName
    };
    var rdo = db.executeScalarManual(spInsertHl6CRMBinding, parameters, 'out_hl6_crm_binding_id');
    return rdo;
}

function updateHl6CRMBinding(hl6CrmBindingId, hl6Id, columnName, changed, displayName, userId){
    var parameters = {
        "in_hl6_crm_binding_id": hl6CrmBindingId,
        "in_hl6_id": hl6Id,
        "in_column_name": columnName,
        "in_changed": changed,
        "in_user_id": userId,
        "in_display_name": displayName
    };
    var rdo = db.executeScalarManual(spUpdateHl6CRMBinding, parameters, 'out_result');
    return rdo;
}

function getHl6MyBudgetByHl6Id(hl6Id){
    if(id){
        var rdo = db.executeProcedureManual(spGetHl6MyBudgetByHl6Id,{'in_hl6_id': hl6Id});
        return db.extractArray(rdo.out_result);
    }
    return null;
}

function getHl6SalesByHl6Id(hl6Id){
    if(id){
        var rdo = db.executeProcedureManual(spGetHl6SalesByHl6Id,{'in_hl6_id':hl6Id});
        return db.extractArray(rdo.out_result);
    }
    return null;
}

function insertHl6LogStatus(hl6Id,columnName,userId,autoCommit){
    var params = {
        'in_hl6_id' : hl6Id,
        'in_status_id'  : columnName,
        'in_user_id' : userId
    };
    var rdo = db.executeScalarManual(spInsHl6LogStatus,params,'out_hl6_log_status_id');
    return rdo;
}


function updateHl6(hl6Id,hl6CrmDescription,budget, routeToMarket
    ,campaignObjectiveId,campaignTypeId,campaignSubTypeId,marketingProgramId,marketingActivityId
    ,actualStartDate,actualEndDate,showOnDgCalendar,businessOwnerId,employeeResponsibleId,costCenterId, inBudget
    ,budgetSpendQ1,budgetSpendQ2,budgetSpendQ3,budgetSpendQ4,euroConversionId,hl6StatusDetailId,salesOrganizationId,userId,autoCommit){
    var params = {
        'in_hl6_id': hl6Id,
        'in_hl6_crm_description' : hl6CrmDescription,
        'in_hl6_budget' : budget,
        'in_route_to_market_id' : routeToMarket,
        'in_campaign_objective_id' : campaignObjectiveId,
        'in_campaign_type_id' : campaignTypeId,
        'in_campaign_subtype_id' : campaignSubTypeId,
        'in_marketing_program_id' : marketingProgramId,
        'in_marketing_activity_id' : marketingActivityId,

        'in_actual_start_date' : actualStartDate,
        'in_actual_end_date' : actualEndDate,
        'in_show_on_dg_calendar' : showOnDgCalendar,
        'in_business_owner_id' : businessOwnerId,
        'in_employee_responsible_id' : employeeResponsibleId,
        'in_cost_center_id' : costCenterId,

        'in_in_budget' : inBudget,
        'in_budget_spend_q1' : budgetSpendQ1,
        'in_budget_spend_q2' : budgetSpendQ2,
        'in_budget_spend_q3' : budgetSpendQ3,
        'in_budget_spend_q4' : budgetSpendQ4,
        'in_euro_conversion_id' : euroConversionId,
        'in_hl6_status_detail_id' : hl6StatusDetailId,
        'in_sales_organization_id' : salesOrganizationId,
        'in_modified_user_id' : userId
    };

    //throw JSON.stringify(params);
    var rdo = db.executeScalarManual(spUpdHl6,params,'out_result');
    return rdo;
}

function delHl6(hl6Id, userId){
	if(hl6Id){
		return db.executeScalarManual(spDelHl6ById, {'in_hl6_id': hl6Id, 'in_modified_user_id': userId}, 'out_result');
	}
	return null;
}