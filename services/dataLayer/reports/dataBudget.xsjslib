$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var userbl = mapper.getUser();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_REP_HL4_BASIC = "GET_REP_HL4_BASIC";
var GET_HL4_BUDGET_REGION = "GET_HL4_BUDGET_REGION";
var GET_HL4_BUDGET_SUBREGION = "GET_HL4_BUDGET_SUBREGION";
var GET_HL4_BUDGET_GLOBAL = "GET_HL4_BUDGET_GLOBAL";
var GET_PLAN_BY_USER = "GET_PLAN_BY_USER";

function getHl4ByFilter(arrPlan, arrRegion, arrBudgetYear, userId) {	
	var parameters = {};
	var strPlans = "";
	if (arrPlan.length > 0)
		strPlans = arrPlan.join("','");	

	var strRegion = "";
	if (arrRegion.length > 0)
		strRegion = arrRegion.join(",");

	var strBudgetYear = "";
	if (arrBudgetYear.length > 0)
		strBudgetYear = arrBudgetYear.join(",");
	
	var filter = " 1 = 1 ";


	if (strPlans !== "") {
		filter = filter + " AND PLAN in ('" + strPlans + "') ";
	}

	if (strRegion !== "") {
		filter = filter + " AND REGION_ID in (" + strRegion + ") ";
	}
	
	if (strBudgetYear !== "") {
		filter = filter + " AND BUDGET_YEAR_ID in (" + strBudgetYear + ") ";
	}
	
	parameters.in_filter = filter;
	return db.executeProcedure(GET_REP_HL4_BASIC, parameters);
}

function getPlansUser(userId){
	var user = userbl.getUserById(userId);
	var isSuperAdmin = false;
	 
	if(user && user[0]['ROLENAME'] === 'SuperAdmin' ) {
		isSuperAdmin = true;
	}
	
	var arrPlanUser = [];
	if(!isSuperAdmin){
		var predicate = {};
		predicate.in_filter = " USER_ID = " + userId;
		var list = db.executeProcedure(GET_PLAN_BY_USER, predicate);
		var arrObj = db.extractArray(list.out_result);
		arrObj.forEach(function(obj){
			arrPlanUser.push(obj["HL2_ID"])	
		});
	}
	return arrPlanUser;
}

function getBudgetRegionByHl4(hl4Id) {
	if (hl4Id) {
		var filter = "HL4_ID = " + hl4Id;
		var rdo = db.executeProcedure(GET_HL4_BUDGET_REGION, {
			'in_filter' : filter
		});
		return db.extractArray(rdo.out_result);
	}
	return null;
}

function getBudgetSubRegionByHl4(hl4Id) {
	if (hl4Id) {
		var filter = "HL4_ID = " + hl4Id;
		var rdo = db.executeProcedure(GET_HL4_BUDGET_SUBREGION, {
			'in_filter' : filter
		});
		return db.extractArray(rdo.out_result);
	}
	return null;
}

function getBudgetGlobalTeamByHl4(hl4Id) {
	if (hl4Id) {
		var filter = "HL4_ID = " + hl4Id;
		var rdo = db.executeProcedure(GET_HL4_BUDGET_GLOBAL, {
			'in_filter' : filter
		});
		return db.extractArray(rdo.out_result);
	}
	return null;
}
