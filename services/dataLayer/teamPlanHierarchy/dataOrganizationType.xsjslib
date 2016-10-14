/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetOrganizationType = "GET_ALL_ORGANIZATION_TYPE";
/******************************************************/

function getInterlockByHl4Id(id){	
	if(id != ""){
		var rdo = db.executeProcedure(spGetOrganizationType, {});
		return db.extractArray(rdo.out_organization_type);
	}	
	return null;
}