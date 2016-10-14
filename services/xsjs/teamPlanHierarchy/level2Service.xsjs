/****** libs ************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blLevel2 = mapper.getLevel2();
var businessLavel3 = mapper.getLevel3();
/******************************************/

var method = "GET_ALL";
var hl2Id = "HL2_ID";
var GET_HL1_BY_FILTER = "GET_HL1_BY_FILTER";
var GET_ALL_CENTRAL_TEAM = "GET_ALL_CENTRAL_TEAM";

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete);
}

//Implementation of GET call -- GET HL2
function handleGet(parameters, userSessionID){
	if(parameters.length > 0){
		if(parameters[0].name == method){		
			var rdo = blLevel2.getAllLevel2();
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);				
		}
		else if (parameters[0].name == hl2Id){
			var objLevel2 = {};
			objLevel2.IN_HL2_ID = parameters[0].value;
			var rdo = blLevel2.getLevel2ById(objLevel2)
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == GET_ALL_CENTRAL_TEAM){
			var rdo = blLevel2.getAllCentralTeam();
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == GET_HL1_BY_FILTER){
			var objFilter = {};
			if(parameters[1].name == "BUDGET_YEAR_ID")
				objFilter.IN_BUDGET_YEAR_ID = parameters[1].value;
			if(parameters[2].name == "PLAN_ID")
				objFilter.IN_PLAN_ID = parameters[2].value;
			if(parameters[3].name == "REGION_ID"){
				if(parameters[3].value)
					objFilter.IN_REGION_ID = parameters[3].value;
				else
					objFilter.IN_REGION_ID = null;
			}
			if(parameters[4].name == "SUBREGION_ID"){
				if(parameters[4].value)
					objFilter.IN_SUBREGION_ID = parameters[4].value;
				else
					objFilter.IN_SUBREGION_ID = null;
			}
			
			var rdo = blLevel2.getLevel2ByFilters(objFilter, userSessionID)
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else{
			throw ErrorLib.getErrors().BadRequest("","userServices/handleGet","invalid parameter name (can be: GET_ALL, HL2_ID or GET_HL1_BY_FILTER)");
		}
	}else{
		var rdo = blLevel2.getLevel2ByUser(userSessionID);
		httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	}	
};

//Implementation of POST call -- Insert HL2
function handlePost(reqBody,userSessionID) {	
	var rdo =  blLevel2.insertHl2(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of UPDATE call -- UPDATE HL2
function handlePut(reqBody,userSessionID){
	var rdo =  blLevel2.updateHl2(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
};

//Implementation of DELETE call -- Delete HL2
function handleDelete(reqBody,userSessionID){
	var rdo = blLevel2.deleteHl2(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
};

//Call request processing  
processRequest();