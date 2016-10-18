$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/

var VIEW_PATH = "'_SYS_BIC'.'xsplanningtool.db.data.views/";
var CV_HL4_BUDGET = "CV_HL4_BUDGET'";
var GET_HL4_ALL_BUDGET = "GET_HL4_ALL_BUDGET";

function getAllBudget() {
	var result = {};
	var parameters = {};
	var list = db.executeProcedure(GET_HL4_ALL_BUDGET, {});
	result.out_result = db.extractArray(list.out_result);
	return result;
	
	/*
	var spResult = [];	
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	
	return spResult;*/
}

/*
function getL4ChangedFieldsByHl4Id(id){
	if(id){
		var rdo = db.executeProcedureManual(spGetL4ChangedFieldsByHl4Id,{'in_hl4_id':id});
		return db.extractArray(rdo.out_hl4_changed_fields);
	}	
	return null;
}
*/
