/** **** libs *********** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessLavel3 = mapper.getLevel3();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */
var section = "FOR_SEARCH";
var GET_ALL_HL3 = "GET_ALL_HL3";
var GET_BY_HL3_ID = "GET_BY_HL3_ID";

// Main function
function processRequest() {
	return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,false, config.getResourceIdByName(config.level2()));
}

// function to manage an post request
function handlePost(reqBody, userSessionID) {
    businessLavel3.checkPermission(userSessionID, null ,reqBody.IN_HL2_ID);
	var rdo = businessLavel3.createHl3(reqBody, userSessionID);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// function to manage an get request
function handleGet(parameters, userSessionID) {
	var rdo = {};
	if (parameters.length > 0) {
        var budgetYearId = parameters[1] && parameters[1].name == "BUDGET_YEAR_ID" ? parameters[1].value : null;
        var regionId = parameters[2] && parameters[2].name == "REGION_ID" ? parameters[2].value : null;
        var subRegionId = parameters[3] && parameters[3].name == "SUBREGION_ID" ? parameters[3].value : null;
        businessLavel3.checkPermission(userSessionID, parameters[0].name, parameters[0].value);
		if (parameters[0].name === GET_ALL_HL3) {
			// get by hl2 and userid
			rdo = businessLavel3.getAllLevel3(parameters[0].value,
					userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		} else if (parameters[0].name === GET_BY_HL3_ID) {
			// get by hl3 and userid
			rdo = businessLavel3.getLevel3ById(parameters[0].value,
					userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		} else if (parameters[0].value == section){
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
			var regionId = httpUtil.getUrlParameters().get("REGION_ID") || null;
			var subRegionId = httpUtil.getUrlParameters().get("SUBREGION_ID") || null;
			var limit = httpUtil.getUrlParameters().get("LIMIT") || null;
			var offset = httpUtil.getUrlParameters().get("OFFSET") || null;
			rdo = businessLavel3.getLevel3ForSearch(userSessionID,budgetYearId,regionId,subRegionId,offset,limit);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		} else if (parameters[0] && parameters[0].value == 'ALL'){
            rdo = businessLavel3.getAllHl3GroupByHl1(budgetYearId, regionId, subRegionId);
            httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
        } else if (parameters[0] && parameters[0].value == 'BY_USER'){

            rdo = businessLavel3.getHl3ByUserGroupByHl1(userSessionID, budgetYearId, regionId, subRegionId);
            httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
        } else {
			throw ErrorLib.getErrors().BadRequest(
					"",
					"hl3Services/handleGet",
					"invalid parameter name (can be: GET_ALL_HL3 or GET_BY_HL3_ID)"
							+ parameters[0].name);
		}
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// function to manage an put request
function handlePut(reqBody,userSessionID) {
    businessLavel3.checkPermission(userSessionID);
	var rdo = businessLavel3.updateHl3(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// function to manage an del request
function handleDelete(reqBody,userSessionID) {
    businessLavel3.checkPermission(userSessionID);
	var rdo = businessLavel3.deleteHl3(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// Call the main function
processRequest();