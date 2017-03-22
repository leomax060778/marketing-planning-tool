/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataPriority = mapper.getDataPriority();
/*************************************************/


function getAllPriority(){
	return dataPriority.getAllPriority();
}
