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
        blLevel1.checkPermission(userSessionID, parameters[0].name, parameters[0].value);

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
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
			var regionId = httpUtil.getUrlParameters().get("REGION_ID") || null;
			var subRegionId = httpUtil.getUrlParameters().get("SUBREGION_ID") || null;

			var rdo = blLevel1.getLevel1ByFilters(budgetYearId, regionId, subRegionId, userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (httpUtil.getUrlParameters().get("section") == section){
            var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
            var regionId = httpUtil.getUrlParameters().get("REGION_ID") || null;
            var subRegionId = httpUtil.getUrlParameters().get("SUBREGION_ID") || null;
            var limit = httpUtil.getUrlParameters().get("LIMIT") || null;
            var offset = httpUtil.getUrlParameters().get("OFFSET") || null;

			var rdo = blLevel1.getLevel1ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userSessionID);
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
    blLevel1.checkPermission(userSessionID);
	var rdo =  blLevel1.updateHl1(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of DELETE call -- Delete HL1
function handleDelete(reqBody,userSessionID){
    blLevel1.checkPermission(userSessionID);

	var rdo = blLevel1.deleteHl1(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Call request processing  
processRequest();