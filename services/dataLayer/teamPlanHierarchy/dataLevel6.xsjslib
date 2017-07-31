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
var spGetHl6TotalBudgetByHl5Id = "GET_ALL_HL6_TOTAL_BUDGET";
var spGetHl6RemainingBudgetByHl5Id = "GET_ALL_HL6_REMAINING_BUDGET";
var spGetNewHL6ID = "GET_NEW_HL6_ID";
var GET_HL6_BY_USER_ID = 'GET_HL6_BY_USER_ID';

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
//var spUpdHl6ChangedFields = "UPD_HL6_CHANGED_FIELDS";
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
var spGetHl6SalesByHl6Id = "GET_HL6_SALES_BY_ID";

var spGetHl6Category = "GET_HL6_CATEGORY";
var spGetHl6CategoryByHl6Id = "GET_HL6_CATEGORY_BY_HL6_ID";
var spGetHl6CategoryByHl6CategoryId = "GET_HL6_CATEGORY_BY_HL6_CATEGORY_ID";
var spGetHl6OptionByCategoryId = "GET_HL6_OPTION_BY_CATEGORY_ID";
var spGetHl6CategoryByCategoryId = "GET_HL6_CATEGORY_BY_CATEGORY_ID";
var spGetHl6CategoryOption = "GET_HL6_OPTION_BY_CATEGORY_ID";
var spGetHl6CategoryOptionByHl6IdOptionId = "GET_HL6_CATEGORY_OPTION_BY_HL6_ID_OPTION_ID";
var spInsHl6Category = "INS_HL6_CATEGORY";
var spInsHl6CategoryOption = "INS_HL6_CATEGORY_OPTION";
var spUpdateHl6CategoryOption = "UPD_HL6_CATEGORY_OPTION";
var spDelHl6Category = "DEL_HL6_CATEGORY";
var spDelHl6CategoryOption = "DEL_HL6_CATEGORY_OPTION";
var spResetHl6CategoryOptionUpdated = "RESET_HL6_CATEGORY_OPTION_UPDATED";
var spGetCategoryByHierarchyLevelId = "GET_CATEGORY_BY_HIERARCHY_LEVEL_ID";
var spGetOptionByCategoryId = "GET_OPTION_BY_CATEGORY_ID";
var spInsHl6BudgetSalesUpload = "INS_HL6_BUDGET_SALES_UPLOAD";
var GET_HL6_BY_IMPORT_ID = "GET_HL6_BY_IMPORT_ID";
var DEL_HL6_HARD_BY_ID = "DEL_HL6_HARD_BY_ID";
var DEL_HL6_CATEGORY_OPTION_HARD = "DEL_HL6_CATEGORY_OPTION_HARD";

/*inserts*/
function insertHl6(hl6CrmDescription,hl6Acronym,budget,hl5Id, routeToMarket
    ,campaignObjectiveId,campaignTypeId,campaignSubTypeId,marketingProgramId,marketingActivityId
    ,actualStartDate,actualEndDate,showOnDgCalendar,businessOwnerId,employeeResponsibleId,costCenterId, inBudget
    ,budgetSpendQ1,budgetSpendQ2,budgetSpendQ3,budgetSpendQ4,euroConversionId,hl6StatusDetailId,salesOrganizationId,createdUserId
    ,distribution_channel_id,venue,city,country,url,results_campaign_q1,results_campaign_q2,results_campaign_q3,results_campaign_q4
    ,planned_start_date,planned_end_date,street,postal_code
    , region
    , event_owner
    , number_of_participants
    , priority_id,co_funded,allow_budget_zero, is_power_user,autoCommit, imported,import_id){
    var params = {
        'in_hl6_crm_description' : hl6CrmDescription,
        'in_acronym': hl6Acronym,
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
        'in_created_user_id' : createdUserId,
        'in_distribution_channel_id' : distribution_channel_id ? distribution_channel_id : null,
        'in_venue' : venue ? venue : "",
        'in_city' : city ? city : "",
        'in_country' : country ? country : "",
        'in_url' : url ? url : "",

        'in_results_campaign_q1' : results_campaign_q1,
        'in_results_campaign_q2' : results_campaign_q2,
        'in_results_campaign_q3' : results_campaign_q3,
        'in_results_campaign_q4' : results_campaign_q4
        ,'in_planned_start_date' : planned_start_date
        ,'in_planned_end_date' : planned_end_date
        ,'in_street' : street ? street : ""
        ,'in_postal_code' : postal_code ? postal_code : ""
        , 'in_region': region || ''
        , 'in_event_owner': event_owner || ''
        , 'in_number_of_participants': number_of_participants || ''
        , 'in_priority_id': priority_id
        , 'in_imported' : imported ? imported : 0
        , 'in_import_id': import_id ? import_id : null
        , 'in_co_funded': co_funded ? co_funded : 0
        , 'in_allow_budget_zero': allow_budget_zero ? allow_budget_zero : 0
        , 'in_is_power_user': is_power_user || Number(is_power_user) ? is_power_user : 1
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

function getHl6ByUserId(userId, isSA){
    var params = {'in_user_id': userId, 'in_issa': isSA};
    var rdo = db.executeProcedureManual(GET_HL6_BY_USER_ID,params);
    return db.extractArray(rdo.out_result);
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

function getHl6ForSearch(userSessionID, isSA, budget_year_id, region_id, subregion_id, limit, offset, autoCommit){
	var parameters = {
          in_user_id: userSessionID
        , in_isSA: isSA
        , in_budget_year_id: budget_year_id
        , in_region_id: region_id
        , in_subregion_id: subregion_id
        , in_limit: limit
        , in_offset: offset
    };
    var result = {};
    var list;
    if(autoCommit){
        list = db.executeProcedure(spGetHl6ForSearch,parameters);
    }else{
        list = db.executeProcedureManual(spGetHl6ForSearch,parameters);
    }
    result.result = db.extractArray(list.out_result);
    result.total_rows = list.totalRows;
    return result;
}

function insertHl6Budget(data){
        return db.executeScalarManual(spInsHl6Budget,data,'out_hl6_budget_id');
}

function insertHl6Sale(data){

    return db.executeScalarManual(spInsHl6Sales,data,'out_hl6_sales_id');

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
        rdo = db.executeScalar(spUpdateHl6CRMBinding,params,'out_result');
    }else{
        rdo = db.executeScalarManual(spUpdateHl6CRMBinding,params,'out_result');
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


function insertHl6CRMBinding(data){
    var rdo = db.executeScalarManual(spInsertHl6CRMBinding, data, 'out_hl6_crm_binding_id');
    return rdo;
}

function updateHl6CRMBinding(data){
    var rdo = db.executeScalarManual(spUpdateHl6CRMBinding, data, 'out_result');
    return rdo;
}

function getHl6MyBudgetByHl6Id(hl6Id){
    
    if(hl6Id){
        var rdo = db.executeProcedureManual(spGetHl6MyBudgetByHl6Id,{'in_hl6_id': hl6Id});
        return db.extractArray(rdo.out_result);
    }
    return null;
}

function getHl6SalesByHl6Id(hl6Id){
    if(hl6Id){
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
    ,budgetSpendQ1,budgetSpendQ2,budgetSpendQ3,budgetSpendQ4,euroConversionId,hl6StatusDetailId,salesOrganizationId,userId
    ,distribution_channel_id,venue,city,country,url,results_campaign_q1,results_campaign_q2,results_campaign_q3,results_campaign_q4
    ,planned_start_date,planned_end_date,street,postal_code
    , region
    , event_owner
    , number_of_participants
    , priority_id, co_funded, allow_budget_zero,is_power_user,autoCommit){
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
        'in_modified_user_id' : userId,
        'in_distribution_channel_id' : distribution_channel_id ? distribution_channel_id : null,
        'in_venue' : venue ? venue : "",
        'in_city' : city ? city : "",
        'in_country' : country ? country : "",
        'in_url' : url ? url : "",
        'in_results_campaign_q1' : results_campaign_q1,
        'in_results_campaign_q2' : results_campaign_q2,
        'in_results_campaign_q3' : results_campaign_q3,
        'in_results_campaign_q4' : results_campaign_q4
        ,'in_planned_start_date' : planned_start_date
        ,'in_planned_end_date' : planned_end_date
        ,'in_street' : street ? street : ""
        ,'in_postal_code' : postal_code ? postal_code : ""
        , 'in_region': region || ''
        , 'in_event_owner': event_owner || ''
        , 'in_number_of_participants': number_of_participants || ''
        , 'in_priority_id': priority_id
        , 'in_co_funded': co_funded
        , 'in_allow_budget_zero':allow_budget_zero
        , 'in_is_power_user': is_power_user || Number(is_power_user) ? is_power_user : 1
    };

    var rdo = db.executeScalarManual(spUpdHl6,params,'out_result');
    return rdo;
}

function delHl6(hl6Id, userId){
	if(hl6Id){
		return db.executeScalarManual(spDelHl6ById, {'in_hl6_id': hl6Id, 'in_modified_user_id': userId}, 'out_result');
	}
	return null;
}

function getNewHl6Id(HL5_ID){
    var rdo =  db.executeScalarManual(spGetNewHL6ID, {'IN_HL5_ID':HL5_ID}, 'OUT_RESULT');
    if(rdo <= 0) return 1;
    if(rdo > 999) throw ErrorLib.getErrors().OutOfRange();
    return rdo;
}

function getHl6Category(hl6_id,category_id,hl6CategoryId){
    if(hl6_id && category_id){
        var rdo = db.executeProcedureManual(spGetHl6Category,{'in_hl6_id':hl6_id, 'in_category_id':category_id});
        return db.extractArray(rdo.out_hl6_category);
    } else if (hl6_id && !category_id){
        var rdo = db.executeProcedureManual(spGetHl6CategoryByHl6Id,{'in_hl6_id':hl6_id});
        return db.extractArray(rdo.out_hl6_category);
    } else if (!hl6_id && !category_id && hl6CategoryId){
        var rdo = db.executeProcedureManual(spGetHl6CategoryByHl6CategoryId,{'in_hl6_category_id':hl6CategoryId});
        return db.extractArray(rdo.out_hl6_category);
    }
    return null;
}

function getHl6OptionByCategoryId(categoryId){
    if(categoryId != ""){
        var params = {
            'in_hl6_category_id': categoryId
        };
        var rdo = db.executeProcedureManual(spGetHl6OptionByCategoryId,params);
        return db.extractArray(rdo.out_hl6_category_option)[0];
    }
    return null;
}

function getHl6CategoryByCategoryId(categoryId){
    if(categoryId != ""){
        var params = {
            'in_category_id': categoryId
        };
        var rdo = db.executeProcedureManual(spGetHl6CategoryByCategoryId,params);
        return db.extractArray(rdo.out_hl6_category)[0];
    }
    return null;
}

function getHl6CategoryOption(hl6CategoryId, hl6Id, optionId, autoCommit){

    var params = {
        'in_hl6_id' : hl6Id,
        'in_option_id'  : optionId
    };

    if(hl6CategoryId && !hl6Id && !optionId){
        var rdo = db.executeProcedureManual(spGetHl6CategoryOption,{'in_hl6_category_id': hl6CategoryId});
        return db.extractArray(rdo.out_hl6_category_option);
    } else if (!hl6CategoryId && hl6Id && optionId){
        var rdo = db.executeProcedureManual(spGetHl6CategoryOptionByHl6IdOptionId,{'in_hl6_id':hl6Id, 'in_option_id':optionId});
        return db.extractArray(rdo.out_hl6_category_option);
    }
    return null;

}

function insertHl6Category(hl6Id,categoryId,createdUserId,inProcessingReport,autoCommit){
    var params = {
        'in_hl6_id' : hl6Id,
        'in_category_id'  : categoryId,
        'in_created_user_id' : createdUserId,
        'in_in_processing_report' : inProcessingReport
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spInsHl6Category,params,'out_hl6_category_id');
    }else{
        rdo = db.executeScalarManual(spInsHl6Category,params,'out_hl6_category_id');
    }
    return rdo;
}

function insertHl6CategoryOption(hl6CategoryId,optionId,amount,createdUserId, updated, autoCommit){
    var params = {
        'in_hl6_category_id' : hl6CategoryId,
        'in_option_id'  : optionId,
        'in_amount' : amount,
        'in_created_user_id' : createdUserId,
        'in_updated': updated
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spInsHl6CategoryOption,params,'out_hl6_category_option_id');
    }else{
        rdo = db.executeScalarManual(spInsHl6CategoryOption,params,'out_hl6_category_option_id');
    }
    return rdo;
}

function updateHl6CategoryOption(hl6CategoryId, optionId, amount, userId, updated){
    var parameters = {
        "in_hl6_category_id": hl6CategoryId,
        "in_option_id": optionId,
        "in_amount": amount,
        "in_user_id": userId,
        "in_updated": updated
    };
    var rdo = db.executeScalarManual(spUpdateHl6CategoryOption, parameters, 'out_result');
    return rdo;
}

function deleteHl6Category(hl6Id, userId, autoCommit){
    var params = {
        'in_hl6_id' : hl6Id,
        'in_user_id'  : userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spDelHl6Category,params,'out_result');
    }else{
        rdo = db.executeScalarManual(spDelHl6Category,params,'out_result');
    }
    return rdo;
}

function deleteHl6CategoryOption(hl6Id, userId, autoCommit){
    var params = {
        'in_hl6_id' : hl6Id,
        'in_user_id'  : userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spDelHl6CategoryOption,params,'out_result');
    }else{
        rdo = db.executeScalarManual(spDelHl6CategoryOption,params,'out_result');
    }
    return rdo;
}

function resetHl6CategoryOptionUpdated(hl6CategoryId, userId){
    if(hl6CategoryId){
        var params = {
            'in_hl6_category_id' : hl6CategoryId,
            'in_user_id'  : userId
        };
        var rdo = db.executeScalarManual(spResetHl6CategoryOptionUpdated,params,'out_result');
        return rdo;
    }
    return null;
}

function getHl6CategoryByHl6CategoryId(categoryId){
    if(categoryId != ""){
        var params = {
            'in_hl6_category_id': categoryId
        };
        var rdo = db.executeProcedureManual(spGetHl6CategoryByHl6CategoryId,params);
        return db.extractArray(rdo.out_hl6_category)[0];
    }
    return null;
}

function getHl6Categories(){
    var params = {
        'in_hierarchy_level_id': 3
    };
    var rdo = db.executeProcedureManual(spGetCategoryByHierarchyLevelId, params);
    return db.extractArray(rdo.out_result);
}


function insertHl6BudgetSalesUpload(hl6Id,organizationId,value,organizationType,description,createdUserId, currencyId,autoCommit){
    var params = {
        'in_hl6_id' : hl6Id,
        'in_organization_id'  : organizationId,
        'in_value' : value,
        'in_organization_type' : organizationType,
        'in_description': description,
        'in_created_user_id': createdUserId,
        'in_currency_id': currencyId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spInsHl6BudgetSalesUpload,params,'out_hl6_budget_sales_id');
    }else{
        rdo = db.executeScalarManual(spInsHl6BudgetSalesUpload,params,'out_hl6_budget_sales_id');
    }
    return rdo;
}

function getHl6ByImportId(importId){
    var params = {
        'in_import_id': importId
    };
    var rdo = db.executeProcedureManual(GET_HL6_BY_IMPORT_ID,params);
    return db.extractArray(rdo.out_result);
}

function delHl6Hard(hl6Id, autoCommit){
    var params = {
        'in_hl6_id' : hl6Id
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(DEL_HL6_HARD_BY_ID,params,'out_result');
    }else{
        rdo = db.executeScalarManual(DEL_HL6_HARD_BY_ID,params,'out_result');
    }
    return rdo;
}

function delHl6CategoryOptionHard(hl6Id, autoCommit){
    var params = {
        'in_hl6_id' : hl6Id
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(DEL_HL6_CATEGORY_OPTION_HARD,params,'out_result');
    }else{
        rdo = db.executeScalarManual(DEL_HL6_CATEGORY_OPTION_HARD,params,'out_result');
    }
    return rdo;
}