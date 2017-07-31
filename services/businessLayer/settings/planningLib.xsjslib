$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataBY = mapper.getDataBudgetYear();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


var JsonPlanning = [
	{
	startDate: new Date(2017, 1, 1, 0, 0, 0, 0),
	endDate: new Date(2017, 3, 31, 0, 0, 0, 0),
	event: "Plan test 1"
	},
	{
		startDate: new Date(2017, 4, 1, 0, 0, 0, 0),
		endDate: new Date(2017, 8, 31, 0, 0, 0, 0),
		event: "Plan test 2"
	}
];

var JsonPlanningDefault = [
	{
		startDate: new Date(2017, 1, 1, 0, 0, 0, 0),
		endDate: new Date(2017, 3, 31, 0, 0, 0, 0),
		event: "Plan test 1"
	},
	{
		startDate: new Date(2017, 4, 1, 0, 0, 0, 0),
		endDate: new Date(2017, 8, 31, 0, 0, 0, 0),
		event: "Plan test 2"
	}
];
function getPlanningByBudgetYear(budgetYearId){
	var bys = dataBY.getAllBudgetYear();
	var by = {};
	for(var i = 0; i < bys.length; i++){
		if(bys[i].DEFAULT_YEAR) by = bys[i];
	}
	if(!budgetYearId){
		var result = {budgetYear: by, dates:getHardPlanning(by.BUDGET_YEAR)};
		return result;
	}
	if(budgetYearId){
		by = dataBY.getBudgetYearId(budgetYearId);
		//return planning to this budget year
		if(by){
			var result = {budgetYear: by, dates:getHardPlanning(by.BUDGET_YEAR)};
			return result;
		}
	}
	throw ErrorLib.getErrors().CustomError("","","The Budget Year does not exist");
}

function getHardPlanning(year){
	if(Number(year))
	return [
		{
			startDate: new Date(year, 1, 1, 0, 0, 0, 0),
			endDate: new Date(year, 3, 31, 0, 0, 0, 0),
			event: "Plan test 1"
		},
		{
			startDate: new Date(year, 4, 1, 0, 0, 0, 0),
			endDate: new Date(year, 8, 31, 0, 0, 0, 0),
			event: "Plan test 2"
		},
		{
			startDate: new Date(year, 1, 1, 0, 0, 0, 0),
			endDate: new Date(year, 10, 31, 0, 0, 0, 0),
			event: "Plan test 3"
		},
		{
			startDate: new Date(year, 7, 1, 0, 0, 0, 0),
			endDate: new Date(year, 8, 31, 0, 0, 0, 0),
			event: "Plan test 4"
		}
		,
		{
			startDate: new Date(year, 3, 1, 0, 0, 0, 0),
			endDate: new Date(year, 9, 30, 0, 0, 0, 0),
			event: "Plan test 5"
		}
		,
		{
			startDate: new Date(year+1, 3, 1, 0, 0, 0, 0),
			endDate: new Date(year+1, 9, 30, 0, 0, 0, 0),
			event: "Plan test 6"
		}
	];

	return null;
}
