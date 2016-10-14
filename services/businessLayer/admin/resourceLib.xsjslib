/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var data = mapper.getDataResource();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ********************************************** */

function getAllResource() {
	return data.getAllResource();
}