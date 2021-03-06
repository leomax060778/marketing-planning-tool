/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetHl4Byhl3Id = "GET_HL4_BY_HL3_ID";
var spGetHl4ById = "GET_HL4_BY_ID";
var spGetHl4FncByHl4Id = "GET_HL4_FNC_BY_HL4_ID";
var spGetHl4ByAcronym = "GET_HL4_BY_ACRONYM";
//var spGetHl3DifferentialBudget = "GET_HL3_ALLOCATED_BUDGET";
var spGetCountHl5ByHl4Id = "GET_COUNT_HL5_BY_HL4_ID";
var spGetHl4CategoryByHl4Id = "GET_HL4_CATEGORY_BY_HL4_ID";
var spGetHl4CategoryByHl4CategoryId = "GET_HL4_CATEGORY_BY_HL4_CATEGORY_ID";
var spGetHl4Category = "GET_HL4_CATEGORY";
var spGetHl4CategoryOption = "GET_HL4_OPTION_BY_CATEGORY_ID";
var spGetHl4StatusByHl4Id = "GET_HL4_STATUS_BY_HL4_ID";
var spGetHl4CRMBindingByHlId = "GET_HIERARCHY_CRM_BINDING_BY_HL_ID";
var spGetHl4MyBudgetByHl4Id = "GET_HL4_BUDGET_BY_ID";
var spGetHl4SalesByHl4Id = "GET_HL4_SALE_BY_ID";
var spGetHl4ForSerach = "GET_HL4_FOR_SEARCH";
var spGetHl4CategoryByCategoryId = "GET_HL4_CATEGORY_BY_CATEGORY_ID";
//var spGetAllHl4Category = "GET_ALL_HL4_CATEGORY";
var spGetAllHl4 = "GET_ALL_HL4";
var spGetHl4CategoryOptionByHl4IdOptionId = "GET_HL4_CATEGORY_OPTION_BY_HL4_ID_OPTION_ID";
var spGET_COUNT_HL5_BY_HL4_ID = "GET_COUNT_HL5_BY_HL4_ID";

var spInsertHl4 = "INS_HL4";
var spInsertHl4_fnc = "INS_HL4_FNC";
var spInsertHl4_Category = "INS_HL4_CATEGORY";
var spInsertHl4CategoryOption = "INS_HL4_CATEGORY_OPTION";
var spInsertHl4BudgetRegion = "INS_HL4_BUDGET_REGION";
var spInsertHl4BudgetSubregion = "INS_HL4_BUDGET_SUBREGION";
var spInsertHl4BudgetRoute = "INS_HL4_BUDGET_ROUTE";
var spInsertHl4SaleRegion = "INS_HL4_SALE_REGION";
var spInsertHl4SaleSubregion = "INS_HL4_SALE_SUBREGION";
var spInsertHl4SaleRoute = "INS_HL4_SALE_ROUTE";
//TODO: delete spInsertHl4SaleOtherRegion, spInsertHl4SaleOtherSubregion
var spInsertHl4SaleOtherRegion = "INS_HL4_SALE_OTHER_REGION";
var spInsertHl4SaleOtherSubregion = "INS_HL4_SALE_OTHER_SUBREGION";
var spInsertHl4SaleOther = "INS_HL4_SALE_OTHER";
var spInsertHl4LogStatus = "INS_HL4_LOG_STATUS";
var spInsertHl4CRMBinding = "INS_HL4_CRM_BINDING";

var spSetHl4InBudget = "HL4_CHANGE_IN_BUDGET";
var spSetHl4OutBudget = "HL4_CHANGE_OUT_BUDGET";

var spUpdateHl4 = "UPD_HL4";
var spUpdateHl4Fnc = "UPD_HL4_FNC";
var spUpdateHl4CategoryOption = "UPD_HL4_CATEGORY_OPTION";
var spUpdateHl4CRMBinding = "UPD_HL4_CHANGED_FIELDS";

var spDeleteHl4 = "DEL_HL4";
var spDeleteHl4Fnc = "DEL_HL4_FNC";
var spDeleteHl4Category = "DEL_HL4_CATEGORY";
var spDeleteHl4CategoryOption = "DEL_HL4_CATEGORY_OPTION";
var spDeleteHl4BudgetRegion = "DEL_HL4_BUDGET_REGION";
var spDeleteHl4BudgetSubregion = "DEL_HL4_BUDGET_SUBREGION";
var spDeleteHl4BudgetRoute = "DEL_HL4_BUDGET_GLOBAL_TEAM";
var spDeleteHl4SaleRegion = "DEL_HL4_SALE_REGION";
var spDeleteHl4SaleSubregion = "DEL_HL4_SALE_SUBREGION";
var spDeleteHl4SaleRoute = "DEL_HL4_SALE_GLOBAL_TEAM";
//TODO: delete spDeleteHl4SaleOtherRegion, spDeleteHl4SaleOtherSubregion
var spDeleteHl4SaleOtherRegion = "DEL_HL4_SALE_OTHER_REGION";
var spDeleteHl4SaleOtherSubregion = "DEL_HL4_SALE_OTHER_SUBREGION";
var spDeleteHl4SaleOther = "DEL_HL4_SALE_OTHER";
var spDeleteHl4CRMBinding = "DEL_HL4_CRM_BINDING";

var HL4_EXISTS_IN_CRM = "HL4_EXISTS_IN_CRM";
var HL4_CHANGE_STATUS = "HL4_CHANGE_STATUS";

var spInsInterlockDataContact = "INS_INTERLOCK_DATA_CONTACT";
var spGetHl4AllocatedBudget = "GET_HL4_ALLOCATED_BUDGET";
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
		var rdo = db.executeProcedure(spGetHl4ById,{'in_hl4_id':id});
		return db.extractArray(rdo.out_hl4)[0];
	}	
	return null;
}

/*************refactor************/
function getHl4FncByHl4Id(id){
//	if(id){
//		var rdo = db.executeProcedure(spGetHl4FncByHl4Id,{'in_hl4_id':id});
//		return db.extractArray(rdo.out_result)[0];
//	}	
//	return null;
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
	//var rdo = db.executeProcedure(spGetAllHl4Category,{});
	return db.extractArray(rdo.out_hl4_category);
}

function getHl4SalesByHl4Id(id){
	if(id){
		var rdo = db.executeProcedure(spGetHl4SalesByHl4Id,{'in_hl4_id':id});
		var sales = {
			"region": db.extractArray(rdo.out_sale_region),
			"subregion": db.extractArray(rdo.out_sale_subregion),
			"globalteam": db.extractArray(rdo.out_sale_global_team),
			"other_region": db.extractArray(rdo.out_sale_other_region),
			"other_subregion": db.extractArray(rdo.out_sale_other_subregion)
			,"others": db.extractArray(rdo.out_sale_other)
		};
		return sales;
	}	
	return null;
}

function getHl4ByAcronym(acronym, hl2_id){
	/*
	if(acronym != ""){
		var rdo = db.executeProcedureManual(spGetHl4ByAcronym,{'in_acronym':acronym});
		return db.extractArray(rdo.out_hl4);
	}	
	return null;
	*/
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

function getHl4CRMBinding(hl_id){
	if(hl_id != ""){
		var rdo = db.executeProcedureManual(spGetHl4CRMBindingByHlId,{'in_hl_id':hl_id});
		return db.extractArray(rdo.out_result);
	}	
	return null;
}

function getLevel4ForSearch(){
	var parameters = {};
	var result = db.executeProcedure(spGetHl4ForSerach,parameters);	
	return db.extractArray(result.out_result);
}

function insertHl4(parameters){
		var rdo = db.executeScalarManual(spInsertHl4, parameters, 'out_hl4_id');
		return rdo;
}

function insertHl4_fnc(parameters){
		var rdo = db.executeScalarManual(spInsertHl4_fnc, parameters, 'out_hl4_fnc_id');
		return rdo;
}

function insertHl4Category(parameters){
	//throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4Category",JSON.stringify(parameters));
		var rdo = db.executeScalarManual(spInsertHl4_Category, parameters, 'out_hl4_category_id');
		//throw ErrorLib.getErrors().CustomError("","hl4Services/handlePostData/insertHl4Category",JSON.stringify(rdo));
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

function insertHl4SaleOtherRegion(parameters){
	var rdo = db.executeScalarManual(spInsertHl4SaleOtherRegion, parameters, 'out_hl4_sale_other_region_id');
	return rdo;
}

function insertHl4SaleOther(parameters){
	var rdo = db.executeScalarManual(spInsertHl4SaleOther, parameters, 'out_hl4_sale_other_id');
	return rdo;
}

function insertHl4SaleOtherSubRegion(parameters){
	var rdo = db.executeScalarManual(spInsertHl4SaleOtherSubregion, parameters, 'out_hl4_sale_other_subregion_id');
	return rdo;
}

function insertHl4CRMBinding(parameters){
	var rdo = db.executeScalarManual(spInsertHl4CRMBinding, parameters, 'out_hl4_crm_binding_id');
	return rdo;
}

function insertHl4LogStatus(hl4_id, status, userId){
	var result = {};
	var parameters = {"in_hl4_id": hl4_id, 'in_status_id': status, 'in_user_id' : userId};		
	var rdo = db.executeScalarManual(spInsertHl4LogStatus, parameters, 'out_hl4_log_status_id');
	return rdo;
}

function updateHl4(parameters){
	var rdo = db.executeScalarManual(spUpdateHl4, parameters, 'out_result');
	return rdo;
}

function updateHl4Fnc(parameters){
	var rdo = db.executeScalarManual(spUpdateHl4Fnc, parameters, 'out_result');
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

function deleteHl4Fnc(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4Fnc, parameters, 'out_result');
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

function deleteHl4SaleSubRegion(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4SaleSubregion, parameters, 'out_result');
	return rdo;
}

function deleteHl4SaleRoute(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4SaleRoute, parameters, 'out_result');
	return rdo;
}

//TODO: delete deleteHl4SaleOtherRegion, deleteHl4SaleOtherSubRegion
function deleteHl4SaleOtherRegion(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4SaleOtherRegion, parameters, 'out_result');
	return rdo;
}

function deleteHl4SaleOtherSubRegion(parameters){
	var rdo = db.executeScalarManual(spDeleteHl4SaleOtherSubregion, parameters, 'out_result');
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

//function getHl4DiferentialBudget(objHl4) {
//	var parameters = {};
//	var result = {};
//	parameters.in_hl4_id = objHl4.IN_HL4_ID;
//	var list = db.executeProcedureManual(spGetHl4DifferentialBudget, parameters);
//	throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4",JSON.stringify(list));
//	if(list){
//		result.out_hl4_others_sum_budget = list.out_hl4_others_sum_budget;
//		result.out_hl4_budget_total_mkt = list.out_hl4_budget_total_mkt;
//	}
//	return result;
//}

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
	//result.out_result_hl4_history = list.out_result_hl4_history;
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
