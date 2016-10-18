/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dbRolePermission = mapper.getRolePermission();
var ErrorLib = mapper.getErrors();
/*************************************************/

function getAll(){
	return dbRolePermission.getAllPermissionByRole();
}

