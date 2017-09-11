/*******************Import Library*********************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var api = mapper.getDataApi();
var dataHl6 = mapper.getDataLevel6();
/** ***********END INCLUDE LIBRARIES*************** */

var L6_MSG_INITIATIVE_NOT_FOUND = "The Campaign/Activity & Sub tactic can not be found.";

function getL6ById(l6_id){
	if(!l6_id){
		throw ErrorLib.getErrors().BadRequest("The Parameter l6_id is not found","apiService/handleGet/getL6ById",l6_id);
	}
	if(!dataHl6.getHl6ById(l6_id))
		throw ErrorLib.getErrors().BadRequest("The L6 is not found", "apiService/handleGet/getL6ById", L6_MSG_INITIATIVE_NOT_FOUND);

	return api.getL6ById(l6_id);
}

function getL6ByWBSPath(wbs_path){
	if(!wbs_path){
		throw ErrorLib.getErrors().BadRequest("The Parameter wbs_path is not found","apiService/handleGet/getL6ByWBSPath",wbs_path);
	}
	return api.getL6ByWBSPath(wbs_path);
}