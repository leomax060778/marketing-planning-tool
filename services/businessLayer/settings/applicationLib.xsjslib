/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbApplication = mapper.getDataApplication();
var util = mapper.getUtil();
/*************************************************/

function getApplicationInfo() {
	return dbApplication.getApplicationInfo();
}