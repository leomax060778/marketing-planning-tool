/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataBudget = mapper.getDataBudgetDistributionReports();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/

function getAllBudget(){
	var myBudget = dataBudget.getAllBudget();
	return myBudget;	
}

function getHl4ByFilter2(reqBody,userSessionID){
	var result = [];
	var myBudget = dataBudget.getHl4ByFilter(reqBody.arrPlan, reqBody.arrRegion, reqBody.arrSubRegion, reqBody.arrCentralTeam, userSessionID);
	if(myBudget){
		myBudget.forEach(function(obj) {
			var aux = util.extractObject(obj);
			aux.budget_region = dataBudget.getBudgetRegionByHl4(aux.HL4_ID);
			aux.budget_subregion = dataBudget.getBudgetSubRegionByHl4(aux.HL4_ID);
			aux.budget_globalteam = dataBudget.getBudgetGlobalTeamByHl4(aux.HL4_ID);
			result.push(aux);
		});
	}
	return result;	
}

function getHl4ByFilter(reqBody,userSessionID){
	var result = [];
	var myBudget = dataBudget.getHl4ByFilter();
	
	if(myBudget){
		var aux = {};
		var list = Object.keys(myBudget.OUT_RESULT);
		for (var i = 0; i < list.length; i++) {
			var elem = myBudget.OUT_RESULT[i];
			if (aux.plan !== elem.PLAN) {
				aux = {
						  plan: elem.PLAN
						, budget_year:  elem.BUDGET_YEAR
						, budget_total: elem.BUDGET_TOTAL
						, remaining: elem.REMAINING
						, allocated: elem.ALLOCATED
						, value: elem.VALUE
			    };
				result.push(aux);
			}
			aux[elem.BG_REGION_NAME] = elem.PERCENTAGE;
		}
	}
	var myObj = {};
	myObj.result = result;
	myObj.regions = myBudget.out_result_rg_name;
	return myObj;	
}