/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var GET_ALL_PRIORITY = "GET_ALL_PRIORITY";
var GET_PRIORITY_BY_ID = "GET_PRIORITY_BY_ID";
/******************************************************/


function getAllPriority(){
	var rdo =  db.executeProcedureManual(GET_ALL_PRIORITY, {}, "out_result");
	return  db.extractArray(rdo.out_result);
}

function getPriorityById(id){
	if(id){
		var rdo =  db.executeProcedureManual(GET_PRIORITY_BY_ID, {in_priority_id: id}, "out_result");
		return  db.extractArray(rdo.out_result);
	}

	return null;
}