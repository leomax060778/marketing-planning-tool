/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blLevel1 = mapper.getLevel1();
var config = mapper.getDataConfig();
/******************************************/

var method = "GET_ALL";
var section = "FOR_SEARCH";
var hl1Id = "HL1_ID";
var GET_HL1_BY_FILTER = "GET_HL1_BY_FILTER";

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level1()));
}

//Implementation of GET call -- GET HL1
function handleGet(parameters, userSessionID){
	if(parameters.length > 0){
		if(parameters[0].name == method){
			
			var rdo = blLevel1.getAllLevel1();
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);				
		}
		else if (parameters[0].name == hl1Id){
			var rdo = blLevel1.getLevel1ById(parameters[0].value);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == GET_HL1_BY_FILTER){
			//var objFilter = {};

			var budgetYearId = parameters[1].name == "BUDGET_YEAR_ID" ? parameters[1].value : null;
			var regionId = parameters[2].name == "REGION_ID" ? parameters[2].value : null;
			var subRegionId = parameters[3].name == "SUBREGION_ID" ? parameters[3].value : null;

			var rdo = blLevel1.getLevel1ByFilters(budgetYearId, regionId, subRegionId, userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == section){
			
			var rdo = blLevel1.getLevel1ForSearch();
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else{
			throw ErrorLib.getErrors().BadRequest("","userServices/handleGet","invalid parameter name (can be: GET_ALL, HL2_ID or GET_HL1_BY_FILTER)");
		}
	}else{
		
		var rdo = blLevel1.getLevel1ByUser(userSessionID);
		httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	}	
}

//Implementation of POST call -- Insert HL1
function handlePost(reqBody,userSessionID) {	
	var rdo =  blLevel1.insertHl1(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of UPDATE call -- UPDATE HL1
function handlePut(reqBody,userSessionID){
	var rdo =  blLevel1.updateHl1(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of DELETE call -- Delete HL1
function handleDelete(reqBody,userSessionID){
	var rdo = blLevel1.deleteHl1(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Call request processing  
processRequest();