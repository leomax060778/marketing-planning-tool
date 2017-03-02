/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataBudget = mapper.getDataBudgetReports();
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
	var arrPlan = [];
	var arrRegion = [];
	var arrBudgetYear = [];
	
	//if has filter plan then apply filter by parameter, else apply filter to related user plan
	if(reqBody.arrPlan)
		arrPlan = reqBody.arrPlan;
	else
		arrPlan = dataBudget.getPlansUser(userSessionID);
		
	if(reqBody.arrRegion)
		arrRegion = reqBody.arrRegion;

	if(reqBody.arrBudgetYear)
		arrBudgetYear = reqBody.arrBudgetYear;

	
	var myBudget = dataBudget.getHl4ByFilter(arrPlan, arrRegion, arrBudgetYear, userSessionID);
	
	if(myBudget){
		var aux = {};
		var list = Object.keys(myBudget.OUT_RESULT);
		for (var i = 0; i < list.length; i++) {
			var elem = myBudget.OUT_RESULT[i];
			if (aux.plan_id !== elem.PLAN_ID) {
				aux = {
						  plan: elem.PLAN
						, plan_id: elem.PLAN_ID
						, l2_acronym: elem.ORGANIZATION_ACRONYM
						, budget_year:  elem.BUDGET_YEAR
						, budget_total: elem.HL2_BUDGET_TOTAL
						, remaining: !elem.REMAINING ? 0 : elem.REMAINING
						, allocated: !elem.ALLOCATED ? 0 : elem.ALLOCATED
						, value: elem.VALUE
			    };
				result.push(aux);
			}
			aux[elem.BUDGET_REGION_NAME] = !elem.PERCENTAGE ? 0 : elem.PERCENTAGE;
		}
	}
	var myObj = {};
	myObj.result = result;
	myObj.regions = myBudget.out_result_rg_name;
	return myObj;	
}