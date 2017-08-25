/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

/***************SPs******************************/
var spGET_CONFIGURATION_BY_NAME = "GET_CONFIGURATION_BY_NAME";
/*************************************************/

/***********************PERMISSIONS AND RESOURCES***************************/
var spGetResourceByName = "GET_RESOURCE_BY_NAME";
var spGetNewToken = "GET_SYSUUID";

function getResourceIdByName(name){
	
 var rdo =  db.executeProcedure(spGetResourceByName, {"IN_RESOURCE_NAME": name});
 var partialRdo = db.extractArray(rdo.OUT_RESULT);
 
 if(partialRdo.length){
	 return partialRdo[0].RESOURCE_ID;
 }
 return null;
}

/****Resources Names********/
function level1() { return "level1"}
function level2() { return "level2"}
function level3() { return "level3"}
function level4() { return "level4"}
function level5() { return "level5"}
function settings() { return "settings"}
function administration() { return "administration"}
function dereport() { return "dereport"}
function report() { return "report"}
function search() { return "search"}
function userAccess() { return "User access"}
function budgetSpendRequest() { return "SpendBudgetRequests" }
/**************************/

var spGetPermissionByName = "GET_PERMISSION_BY_NAME";

function getPermissionIdByName(name){
 var rdo =  db.executeProcedure(spGetPermissionByName, {"IN_PERMISSION_NAME": name});

 var partialRdo = db.extractArray(rdo.OUT_RESULT);
 
 if(partialRdo){
	 return partialRdo[0].PERMISSION_ID;
 }
 return null;
}

/****Resources Names********/
function ReadPermission(){ return "View/Read"}
function CreatePermission(){ return "Create/Edit"}
function DeletePermission(){ return "Delete"}

/**************************/

/***************************************************************************/


function getConfigurationByName(key){
	var result = db.executeProcedure(spGET_CONFIGURATION_BY_NAME,{'IN_KEY' : key}, true);
	return db.extractArray(result.out_result);
}

/*************Super Admin**************/
var ApplySuperAdminToAllInitiatives = true;
function getApplySuperAdminToAllInitiatives(){
	return getConfigurationByName("ApplySuperAdminToAllInitiatives");
}
/***************************************/


//this Enum represent the "PLANNING_TOOL"."ROLE" table
var RoleEnum = {
		SuperAdmin : 1,
		Admin : 2,
		Data_Entry : 3,
		Campaign_Manager : 4
	};
//*************************

var OriginMessageInterlock = {
	requester : 1,
	moneyLender : 2
};

function getDebugMode(){
	return getConfigurationByName("DebugMode")[0].VALUE;
}

function getAppUrl(){
	return getConfigurationByName("AppUrl")[0].VALUE;
}

function getLoginUrl(){
	return getConfigurationByName("UrlLogin")[0].VALUE;
}

function getSMTPAccount(){
	return getConfigurationByName("SMTPAccount")[0].VALUE;
}

function getSupportAccount(){
	return getConfigurationByName("SupportAccount")[0].VALUE;
}

function getSiteAdminAccount(){
	return getConfigurationByName("SiteAdministrator")[0].VALUE;
}

function getTokenLifeTimeSeconds(){
	return parseInt(getConfigurationByName("tokenLifeTimeSeconds")[0].VALUE);
}

function getDefaultPassword(){
	return getConfigurationByName("defaultPassword")[0].VALUE;
}

function getRoleEnum(){
	return RoleEnum;
}

function getOriginMessageInterlock(){
	return OriginMessageInterlock;
}

function getActivateNotificationLevel2(){
	return getConfigurationByName("notifyLevel2")[0].VALUE;
}

function getActivateNotificationLevel3(){
	return getConfigurationByName("notifyLevel3")[0].VALUE;
}


function getNotifyLevel2Account(){
	return getConfigurationByName("notifyLevel2Account")[0].VALUE;
}

function getNotifyLevel3Account(){
	return getConfigurationByName("notifyLevel3Account")[0].VALUE;
}

function getHash() {
	var rdo = db.executeProcedure(spGetNewToken, {});
	if (rdo['OUT_RESULT']) {
		return rdo['OUT_RESULT'][0]['SYS_UNIQUE_NUMBER'];
	}
}

/********************** ENVIRONMENT ***********************/

function getEnvironment(){
	var environment = getConfigurationByName("Environment");
	return environment[0].VALUE;
}

function getMailEnvironment() {
	var environment = getEnvironment();
	environment = (environment !== "Production")? '('+environment+')' : "";
	return environment;
}


