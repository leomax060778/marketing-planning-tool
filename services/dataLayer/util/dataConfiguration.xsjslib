/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

// Todo: this is a hardcode.
var AppUrl = "http://OPT.Hana.com";
var SMTPAccount = "info_planningtool@sap.com";// "lpeccin@folderit.net"; //adderes configured  - SMTP server
var SupportAccount = "support_planningtool@sap.com";
//TODO: move this to configuration
var tokenLifeTimeSeconds = 43200;

//this Enum represent the "PLANNING_TOOL"."ROLE" table
var RoleEnum = {
		SuperAdmin : 1,
		Admin : 2,
		Data_Entry : 3,
		Campaign_Manager : 4
	}
//*************************

function getAppUrl(){
	return AppUrl;
}

function getSMTPAccount(){
	return SMTPAccount;
}

function getSupportAccount(){
	return SupportAccount;
}

function getTokenLifeTimeSeconds(){
	return tokenLifeTimeSeconds;
}

function getRoleEnum(){
	return RoleEnum;
}


