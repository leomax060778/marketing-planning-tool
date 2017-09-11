/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGET_ALL_MEASURE = "GET_ALL_MEASURE";
/******************************************************/


function getAllMeasure(){
		var result =  db.extractArray((db.executeProcedure(spGET_ALL_MEASURE, {}, "out_result")).out_result);
	//var result = db.extractArray(result.out_result);
	var rdo = {};
	rdo.results = result;
	return rdo;
}
