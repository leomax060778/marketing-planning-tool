/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetHl4Byhl3Id = "GET_HL4_BY_HL3_ID";
var spGetHl4ById = "GET_HL4_BY_ID";
var spGetHl4ByAcronym = "GET_HL4_BY_ACRONYM";
var spGetCountHl5ByHl4Id = "GET_COUNT_HL5_BY_HL4_ID";
var spGetHl4CategoryByHl4Id = "GET_HL4_CATEGORY_BY_HL4_ID";
var spGetHl4CategoryByHl4CategoryId = "GET_HL4_CATEGORY_BY_HL4_CATEGORY_ID";
var spGetHl4Category = "GET_HL4_CATEGORY";
var spGetHl4CategoryOption = "GET_HL4_OPTION_BY_CATEGORY_ID";
var spGetHl4StatusByHl4Id = "GET_HL4_STATUS_BY_HL4_ID";
var spGetHl4MyBudgetByHl4Id = "GET_HL4_BUDGET_BY_ID";
var spGetHl4SalesByHl4Id = "GET_HL4_SALE_BY_ID";
var spGetHl4ForSerach = "GET_HL4_FOR_SEARCH";
var spGetHl4CategoryByCategoryId = "GET_HL4_CATEGORY_BY_CATEGORY_ID";
var spGetAllHl4 = "GET_ALL_HL4";
var spGetHl4CategoryOptionByHl4IdOptionId = "GET_HL4_CATEGORY_OPTION_BY_HL4_ID_OPTION_ID";
var spGET_COUNT_HL5_BY_HL4_ID = "GET_COUNT_HL5_BY_HL4_ID";
var GET_IMPLEMENT_EXECUTION_LEVEL_BY_HL4_ID = "GET_IMPLEMENT_EXECUTION_LEVEL_BY_HL4_ID";

var spInsertHl4 = "INS_HL4";
var spInsertHl4_Category = "INS_HL4_CATEGORY";
var spInsertHl4CategoryOption = "INS_HL4_CATEGORY_OPTION";
var spInsertHl4BudgetRegion = "INS_HL4_BUDGET_REGION";
var spInsertHl4BudgetSubregion = "INS_HL4_BUDGET_SUBREGION";
var spInsertHl4BudgetRoute = "INS_HL4_BUDGET_ROUTE";
var spInsertHl4SaleRegion = "INS_HL4_SALE_REGION";
var spInsertHl4SaleRoute = "INS_HL4_SALE_ROUTE";
var spInsertHl4SaleOther = "INS_HL4_SALE_OTHER";
var spInsertHl4LogStatus = "INS_HL4_LOG_STATUS";
var spInsertHl4CRMBinding = "INS_HL4_CRM_BINDING";

var spSetHl4InBudget = "HL4_CHANGE_IN_BUDGET";
var spSetHl4OutBudget = "HL4_CHANGE_OUT_BUDGET";

var spUpdateHl4 = "UPD_HL4";
var spUpdateHl4CategoryOption = "UPD_HL4_CATEGORY_OPTION";
var spUpdateHl4CRMBinding = "UPD_HL4_CHANGED_FIELDS";

var spDeleteHl4 = "DEL_HL4";
var spDeleteHl4Category = "DEL_HL4_CATEGORY";
var spDeleteHl4CategoryOption = "DEL_HL4_CATEGORY_OPTION";
var spDeleteHl4BudgetRegion = "DEL_HL4_BUDGET_REGION";
var spDeleteHl4BudgetSubregion = "DEL_HL4_BUDGET_SUBREGION";
var spDeleteHl4BudgetRoute = "DEL_HL4_BUDGET_GLOBAL_TEAM";
var spDeleteHl4SaleRegion = "DEL_HL4_SALE_REGION";
var spDeleteHl4SaleRoute = "DEL_HL4_SALE_GLOBAL_TEAM";
var spDeleteHl4SaleOther = "DEL_HL4_SALE_OTHER";
var spDeleteHl4CRMBinding = "DEL_HL4_CRM_BINDING";

var HL4_EXISTS_IN_CRM = "HL4_EXISTS_IN_CRM";
var HL4_CHANGE_STATUS = "HL4_CHANGE_STATUS";

var spGetHl4AllocatedBudget = "GET_HL4_ALLOCATED_BUDGET";

var spResetHl4CategoryOptionUpdated = "RESET_HL4_CATEGORY_OPTION_UPDATED";
/******************************************************/

function getAllHl4(){
	var rdo = db.executeProcedure(spGetAllHl4,{});
	return db.extractArray(rdo.out_hl4);
}

function getHl4(id){
	var result = {};
	var list = db.executeProcedureManual(spGetHl4Byhl3Id, {"in_hl3_id": id});
	result.out_result = db.extractArray(list.out_result);
	result.out_total_budget = list.out_total_budget;
	result.out_remaining_budget = list.out_remaining_budget;
	return result;
}

function getHl4ById(id){
	if(id != ""){
		var rdo = db.executeProcedureManual(spGetHl4ById,{'in_hl4_id':id});
		return db.extractArray(rdo.out_hl4)[0];
	}	
	return null;
}

function getHl4MyBudgetByHl4Id(id){
	if(id){
		var rdo = db.executeProcedure(spGetHl4MyBudgetByHl4Id,{'in_hl4_id':id});
		var myBudget = {
			"region": db.extractArray(rdo.out_budget_region),
			"subregion": db.extractArray(rdo.out_budget_subregion),
			"globalTeam": db.extractArray(rdo.out_budget_global_team)
		};
		return myBudget;
	}	
	return null;
}
function getAllHl4Category(){
	var rdo = db.executeProcedure(spGetHl4CategoryByCategoryId,{});
	return db.extractArray(rdo.out_hl4_category);
}

function getHl4SalesByHl4Id(id){
	if(id){
		var rdo = db.executeProcedure(spGetHl4SalesByHl4Id,{'in_hl4_id':id});
		var sales = {
			"region": db.extractArray(rdo.out_sale_region),
			"subregion": db.extractArray(rdo.out_sale_subregion),
			"globalteam": db.extractArray(rdo.out_sale_global_team)
			,"others": db.extractArray(rdo.out_sale_other)
		};
		return sales;
	}	
	return null;
}

function getHl4ByAcronym(acronym, hl2_id){
	var parameters = {};
	parameters.in_acronym = acronym.toUpperCase();
	parameters.in_hl2_id = hl2_id;
	var result = db.executeProcedure(spGetHl4ByAcronym, parameters);
	var list = db.extractArray(result.out_result);
	if(list.length)
		return list[0];
	else
		return {};
}

function getHl4Category(hl4_id,category_id,hl4CategoryId){
	if(hl4_id && category_id){
		var rdo = db.executeProcedureManual(spGetHl4Category,{'in_hl4_id':hl4_id, 'in_category_id':category_id});
		return db.extractArray(rdo.out_hl4_category);
	} else if (hl4_id && !category_id){
		var rdo = db.executeProcedureManual(spGetHl4CategoryByHl4Id,{'in_hl4_id':hl4_id});
		return db.extractArray(rdo.out_hl4_category);
	} else if (!hl4_id && !category_id && hl4CategoryId){
		var rdo = db.executeProcedureManual(spGetHl4CategoryByHl4CategoryId,{'in_hl4_category_id':hl4CategoryId});
		return db.extractArray(rdo.out_hl4_category);
	}
	return null;
}

function getHl4CategoryOption(hl4CategoryId,hl4Id,optionId){
	if(hl4CategoryId && !hl4Id && !optionId){
		var rdo = db.executeProcedureManual(spGetHl4CategoryOption,{'in_hl4_category_id':hl4CategoryId});
		return db.extractArray(rdo.out_hl4_category_option);
	} else if (!hl4CategoryId && hl4Id && optionId){
		var rdo = db.executeProcedureManual(spGetHl4CategoryOptionByHl4IdOptionId,{'in_hl4_id':hl4Id, 'in_option_id':optionId});
		return db.extractArray(rdo.out_hl4_category_option);
	}
	return null;
}

function getHl4StatusByHl4Id(hl4_id){
	if(hl4_id != ""){
		var rdo = db.executeProcedureManual(spGetHl4StatusByHl4Id,{'in_hl4_id':hl4_id});
		return db.extractArray(rdo.out_result)[0];
	}	
	return null;
}

function getCountHl4Childrens(hl4_id){
		return db.executeScalarManual(spGET_COUNT_HL5_BY_HL4_ID,{'in_hl4_id':hl4_id},'out_total_hl5');
}

function getLevel4ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userSessionID, isSA){
    var parameters = {
        in_budget_year_id: budgetYearId
        , in_region_id: regionId
        , in_subRegion_id: subRegionId
        , in_limit: limit
        , in_offset: offset
        , in_user_id: userSessionID
        , in_isSA: isSA
    };
	var result = db.executeProcedure(spGetHl4ForSerach,parameters);	
	return {result: db.extractArray(result.out_result), total_rows: result.total_rows};
}

function getImplementExecutionLevel(hl4Id) {
	var parameters = {
		in_hl4_id: hl4Id
	};
    var rdo = db.executeScalarManual(GET_IMPLEMENT_EXECUTION_LEVEL_BY_HL4_ID, parameters, 'out_result');
    return rdo;
}

function insertHl4(parameters){
		var rdo = db.executeScalarManual(spInsertHl4, parameters, 'out_hl4_id');
		return rdo;
}

function insertHl4Category(parameters){
		var rdo = db.executeScalarManual(spInsertHl4_Category, parameters, 'out_hl4_category_id');
		return rdo;
}

function insertHl4CategoryOption(parameters){
		var rdo = db.executeScalarManual(spInsertHl4CategoryOption, parameters, 'out_hl4_category_option_id');
		return rdo;
}

function insertHl4BudgetRegion(parameters){
	var rdo = db.executeScalarManual(spInsertHl4BudgetRegion, parameters, 'out_hl4_budget_region_id');
	return rdo;
}

function insertHl4BudgetSubRegion(parameters){
	var rdo = db.executeScalarManual(spInsertHl4BudgetSubregion, parameters, 'out_hl4_budget_subregion_id');
	return rdo;
}

function insertHl4BudgetRoute(parameters){
	var rdo = db.executeScalarManual(spInsertHl4BudgetRoute, parameters, 'out_hl4_budget_route_id');
	return rdo;
}

function insertHl4SaleRegion(parameters){
	var rdo = db.executeScalarManual(spInsertHl4SaleRegion, parameters, 'out_hl4_sale_region_id');
	return rdo;
}

function insertHl4SaleSubRegion(parameters){
	var rdo = db.executeScalarManual(spInsertHl4SaleSubregion, parameters, 'out_hl4_sale_subregion_id');
	return rdo;
}

function insertHl4SaleRoute(parameters){
	var rdo = db.executeScalarManual(spInsertHl4SaleRoute, parameters, 'out_hl4_sale_route_id');
	return rdo;
}

function insertHl4SaleOther(parameters){
	var rdo = db.executeScalarManual(spInsertHl4SaleOther, parameters, 'out_hl4_sale_other_id');
	return rdo;
}

function insertHl4CRMBinding(parameters){
	var rdo = db.executeScalarManual(spInsertHl4CRMBinding, parameters, 'out_hl4_crm_binding_id');
	return rdo;
}

function insertHl4LogStatus(hl4_id, status, userId){
	var parameters = {"in_hl4_id": hl4_id, 'in_status_id': status, 'in_user_id' : userId};
	var rdo = db.executeScalarManual(spInsertHl4LogStatus, parameters, 'out_hl4_log_status_id');
	return rdo;
}

function updateHl4(parameters){
	var rdo = db.executeScalarManual(spUpdateHl4, parameters, 'out_result');
	return rdo;
}

function updateHl4CategoryOption(parameters){
	var rdo = db.executeScalarManual(spUpdateHl4CategoryOption, parameters, 'out_result');
	return rdo;
}

function updateHl4BudgetStatus(hl4_id, nextStatus){
	var sp = nextStatus === 1 ? spSetHl4InBudget : spSetHl4OutBudget;
	var parameters = {"in_hl4_id": hl4_id };
	var rdo = db.executeScalarManual(sp, parameters, 'out_result');
	return rdo;
}

function updateHl4CRMBinding(parameters){
	var rdo = db.executeScalarManual(spUpdateHl4CRMBinding, parameters, 'out_result');
	return rdo;
}

function deleteHl4(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4, parameters, 'out_result');
	return rdo;
}

function deleteHl4Category(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4Category, parameters, 'out_result');
	return rdo;
}

function deleteHl4CategoryOption(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4CategoryOption, parameters, 'out_result');
	return rdo;
}

function deleteHl4BudgetRegion(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4BudgetRegion, parameters, 'out_result');
	return rdo;
}

function deleteHl4BudgetSubRegion(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4BudgetSubregion, parameters, 'out_result');
	return rdo;
}

function deleteHl4BudgetRoute(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4BudgetRoute, parameters, 'out_result');
	return rdo;
}

function deleteHl4SaleRegion(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4SaleRegion, parameters, 'out_result');
	return rdo;
}

function deleteHl4SaleRoute(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4SaleRoute, parameters, 'out_result');
	return rdo;
}

function deleteHl4SaleOther(parameters){
	var param = {'in_hl4_id': parameters.in_hl4_id}
	var rdo = db.executeScalarManual(spDeleteHl4SaleOther, param, 'out_result');
	return rdo;
}

function deleteHl4CRMBinding(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4CRMBinding, parameters, 'out_result');
	return rdo;
}

function existsInCrm(hl4Id) {
	if(hl4Id){
		return db.executeScalarManual(HL4_EXISTS_IN_CRM, {'in_hl4_id': hl4Id}, 'out_result');
	}
	return null;
}

function changeStatusHl4(hl4_id, status, userId){
	var result = {};
	var parameters = {"in_hl4_id": hl4_id, 'in_status_id': status, 'in_user_id': userId };
	var list = db.executeProcedureManual(HL4_CHANGE_STATUS, parameters);
	result.out_result_hl4 = list.out_result;
	return result;
}

function getHl4Childrens(hl4_id){
	var parameters = {"in_hl4_id": hl4_id};
	var totalHl5 = db.executeScalarManual(spGetCountHl5ByHl4Id, parameters, 'out_total_hl5');
	return totalHl5;
}


function getHl4AllocatedBudget(hl4Id, hl5Id) {
	if(hl4Id){
		var rdo = db.executeDecimalManual(spGetHl4AllocatedBudget
					, {'in_hl4_id': hl4Id, 'in_hl5_id': hl5Id}, 'out_hl4_allocated_budget');
		return rdo;
	}
	return null;
}

function resetHl4CategoryOptionUpdated(hl4CategoryId, userId){
	if(hl4CategoryId){
		var params = {
			'in_hl4_category_id' : hl4CategoryId,
			'in_user_id'  : userId
		};
		var rdo = db.executeScalarManual(spResetHl4CategoryOptionUpdated,params,'out_result');
		return rdo;
	}
	return null;
}