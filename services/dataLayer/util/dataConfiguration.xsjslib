/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

// Todo: this is a hardcode.
var AppUrl = "http://OPT.Hana.com";
var SMTPAccount = "fsavat@folderit.net"//"lpeccin@folderit.net"; //adderes configured  - SMTP server
//TODO: move this to configuration
var tokenLifeTimeSeconds = 43200;
//*************************

function getAppUrl(){
	return AppUrl;
}

function getSMTPAccount(){
	return SMTPAccount;
}

function getTokenLifeTimeSeconds(){
	return tokenLifeTimeSeconds;
}
