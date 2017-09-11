/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var permissions = mapper.getPermission();
var CurrencyLib = mapper.getCurrency();
var buyLib = mapper.getBudgetYear();
/******************************************/

var LEVEL = "LEVEL";
var HL_ID = "HL_ID";

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handlePost(reqBody, userId){
	var rdo =  CurrencyLib.InsertOrUpdateCurrency(reqBody.currencyList, reqBody.BUDGET_YEAR_ID);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

//delete function, no implemented
function handleDelete() {
	return httpUtil.notImplementedMethod();
}

//get function
function handleGet(parameters) {
		var in_ec_id = httpUtil.getUrlParameters().get("CURRENCY_ID");

		if(parameters.length === 2){
			if(parameters[0].name === LEVEL && parameters[1].name === HL_ID){
				var budget_year = buyLib.getBudgetYearByLevelParent(parameters[0].value, parameters[1].value);

				var rdo =  CurrencyLib.getAllCurrency(budget_year);

				if(!rdo.length)
					throw ErrorLib.getErrors().NoCurrencyForBudgetYear("","pathService/handleGet","There is no currency for this Budget Year. Please check it out at Settings section.");

				httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
			}
			else{
				throw ErrorLib.getErrors().BadRequest("","pathService/handleGet","invalid parameters names (can be: LEVEL or HL_ID)");
			}
		}
		else if(in_ec_id){
			var rdo =  CurrencyLib.getCurrencyValueId(in_ec_id);
			return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}else{
			var budget_year = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID");
			var rdo =  CurrencyLib.getAllCurrency(budget_year);
			return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
}

//get function, no implemented
function handlePut() {
	return httpUtil.notImplementedMethod();
}
//main function
processRequest();