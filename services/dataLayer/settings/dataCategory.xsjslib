/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetCountByHlId = "GET_CATEGORY_COUNT_BY_HL_ID";
/******************************************************/

var hierarchyLevel = {
		"hl3": 4,
		"hl4": 1,
		"hl5": 2,
		"hl6": 3
}

function getCountByHlId(hl){	
	if(hl){
		return db.executeScalarManual(spGetCountByHlId, {'in_hl_id':hierarchyLevel[hl]}, "out_hl_category");
	}	
	return null;
}