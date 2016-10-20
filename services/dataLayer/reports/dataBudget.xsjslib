$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/

var VIEW_PATH = "'_SYS_BIC'.'xsplanningtool.db.data.views/";
var CV_HL4_BUDGET = "CV_HL4_BUDGET'";
var GET_HL4_ALL_BUDGET = "GET_HL4_ALL_BUDGET";
var GET_REP_HL4_BASIC = "GET_REP_HL4_BASIC";
var GET_HL4_BUDGET_REGION = "GET_HL4_BUDGET_REGION";
var GET_HL4_BUDGET_SUBREGION = "GET_HL4_BUDGET_SUBREGION";
var GET_HL4_BUDGET_GLOBAL = "GET_HL4_BUDGET_GLOBAL";

function getAllBudget() {
	var result = {};
	var parameters = {};
	var nameValue = "NAM";
	var hl4Value = hl4Id;
	//parameters.in_filter = " NAME like 'NAM' AND HL4_ID = 10 ";
	parameters.in_filter = " NAME like " + "'" + nameValue + "'" + " AND HL4_ID = " + hl4Value;
	var list = db.executeProcedure(GET_HL4_ALL_BUDGET, parameters);
	result.out_result = db.extractArray(list.out_result);
	return result;
	
	/*
	var spResult = [];	
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	
	return spResult;*/
}


function getHl4ByFilter(arrPlan, arrRegion, arrSubRegion, arrCentralTeam ,userId){
	var result = [];
	var parameters = {};
	
	var strPlands = "";
	if(arrPlan.length > 0)
		strPlands = arrPlan.join(",");
	
	var strRegion = "";
	if(arrRegion.length > 0)
		strRegion = arrRegion.join(",");
	
	var strSubRegion = "";
	if(arrSubRegion.length > 0)
		strSubRegion = arrSubRegion.join(",");
	
	var strCentralTeam = "";
	if(arrCentralTeam.length > 0)
		strCentralTeam = arrCentralTeam.join(",");
	
	
	var filter = " 1 = 1 ";
	
	if(strPlands !== ""){
		filter = filter + " AND HL2_ID in (" + strPlands + ") "; 
	}
	
	if(strRegion !== ""){
		filter = filter + " AND REGION_ID in (" + strRegion + ") ";
	}
	
	if(strSubRegion !== ""){
		filter = filter + " AND SUBREGION_ID in (" + strSubRegion + ") ";
	}
	
	if(strCentralTeam !== ""){
		filter = filter + " AND HL2_ID in (" + strCentralTeam + ") ";
	}
	
	//parameters.in_filter = " NAME like " + "'" + nameValue + "'" + " AND HL4_ID = " + hl4Value;
	parameters.in_filter = filter;
	
	var list = db.executeProcedure(GET_REP_HL4_BASIC, parameters);
	result = db.extractArray(list.out_result);
	return result;
}


function getBudgetRegionByHl4(hl4Id){
	if(hl4Id){
		var filter = "HL4_ID = " + hl4Id;
		var rdo = db.executeProcedure(GET_HL4_BUDGET_REGION,{'in_filter':filter});
		return db.extractArray(rdo.out_result);
	}	
	return null;
}

function getBudgetSubRegionByHl4(hl4Id){
	if(hl4Id){
		var filter = "HL4_ID = " + hl4Id;
		var rdo = db.executeProcedure(GET_HL4_BUDGET_SUBREGION,{'in_filter':filter});
		return db.extractArray(rdo.out_result);
	}	
	return null;
}

function getBudgetGlobalTeamByHl4(hl4Id){
	if(hl4Id){
		var filter = "HL4_ID = " + hl4Id;
		var rdo = db.executeProcedure(GET_HL4_BUDGET_GLOBAL,{'in_filter':filter});
		return db.extractArray(rdo.out_result);
	}	
	return null;
}

