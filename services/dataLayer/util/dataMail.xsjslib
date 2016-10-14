/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

var GET = "GET_TEMPLATE";



function getTemplate(idTemplate){		
var celda = "<td> Esto es una celda</td>";
var fila = "<tr>" + celda + celda + celda + "</tr>";
var rdo = "<html><head></head><body><table>";
rdo = rdo + fila + fila + fila + fila;
rdo = "</table></body></html>";
		
		return rdo;
}