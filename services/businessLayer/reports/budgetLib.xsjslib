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

function getHl4ByFilter(reqBody,userSessionID){
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
