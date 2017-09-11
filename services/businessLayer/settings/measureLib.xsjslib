/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbMeasure = mapper.getDataMeasure();
/*************************************************/


function getAllMeasure(){
	return dbMeasure.getAllMeasure();
}
