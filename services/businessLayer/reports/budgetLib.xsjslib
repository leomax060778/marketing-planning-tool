/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataBudget = mapper.getDataBudgetReports();
var ErrorLib = mapper.getErrors();
/*************************************************/

function getAllBudget(){
	var myBudget = dataBudget.getAllBudget();
	return myBudget;	
}

/*
function getAllBudget(filterText, filterRegion, filterSubRegion, filterGlobal){
	var result = {};
	
	//get all hl4
	var allHl4 = dataBudget.getAllHl4(filterText);
	
	//get mybudget by filters
	var myBudget = dataBudget.getAllBudget(filterRegion, filterSubRegion, filterGlobal);
	
	var j = 0;
	var result = {};
	for (var int = 0; int < allHl4.length; int++) {
		
		result[allHl4[i].HL4_ID] = { 'description': allHl4[i].description };
		
		while (allHl4[i].HL4_ID === myBudget[j].HL4_ID) {
			result[allHl4[i].HL4_ID][myBudget[j].type] =
		}

	}
	
	
	return myBudget;	
}
*/
