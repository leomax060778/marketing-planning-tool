/************Business Layer Mapper*****************/

function getUtil(){
	$.import("xsplanningtool.services.businessLayer.util","util");
	return $.xsplanningtool.services.businessLayer.util.util;
}

function getLogin(){
	$.import("xsplanningtool.services.businessLayer.admin","loginLib");
	return $.xsplanningtool.services.businessLayer.admin.loginLib;
}

function getMail(){
	$.import("xsplanningtool.services.businessLayer.util","mail");
	return $.xsplanningtool.services.businessLayer.util.mail;
}

function getLogError(){
	$.import("xsplanningtool.services.businessLayer.util","logError");
	return $.xsplanningtool.services.businessLayer.util.logError;
}

function getErrors(){
	$.import("xsplanningtool.services.commonLib","errorLib");
	return $.xsplanningtool.services.commonLib.errorLib;
}

function getHttp(){
	$.import("xsplanningtool.services.commonLib","httpLib");
	return $.xsplanningtool.services.commonLib.httpLib;
}

function getLevel3(){
	$.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","level3Lib");
	return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.level3Lib;
}

function getLevel4(){
	$.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","level4Lib");
	return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.level4Lib;
}

function getUser(){
	$.import("xsplanningtool.services.businessLayer.admin","userLib");
	return $.xsplanningtool.services.businessLayer.admin.userLib;
}

function getPlan(){
	$.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","planLib");
	return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.planLib;
}

function getRegion(){
	$.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","regionLib");
	return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.regionLib;
}

function getSubRegion(){
	$.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","subRegionLib");
	return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.subRegionLib;
}

function getLevel2(){
    $.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","level2Lib");
    return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.level2Lib;
}

function getRole(){
	$.import("xsplanningtool.services.businessLayer.admin","roleLib");
	return $.xsplanningtool.services.businessLayer.admin.roleLib;
}

function getPath(){
	$.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","pathLib");
	return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.pathLib;
}

function getUserRole(){
	$.import("xsplanningtool.services.businessLayer.admin","userRoleLib");
	return $.xsplanningtool.services.businessLayer.admin.userRoleLib;
}

function getInterlock(){
     $.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","interlockLib");
     return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.interlockLib;
}
  
function getPartner(){
	 $.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","partnerLib");
     return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.partnerLib;
}

/****** Refactor This ******/ 
function getOutcomes2(){
     $.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","outcomesLib");
     return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.outcomesLib;
}

function getOutcomesType(){
    $.import("xsplanningtool.services.businessLayer.settings","outcomesTypeLib");
    return $.xsplanningtool.services.businessLayer.settings.outcomesTypeLib;
}

function getOutcomes(){
    $.import("xsplanningtool.services.businessLayer.settings","outcomesLib");
    return $.xsplanningtool.services.businessLayer.settings.outcomesLib;
}

function getExpectedOutcomes(){
    $.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","expectedOutcomesLib");
    return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.expectedOutcomesLib;
}
  
function getSpendCategory(){
     $.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","spendCategoryLib");
     return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.spendCategoryLib;
}

function getLevel4DEReport(){
	$.import("xsplanningtool.services.businessLayer.dataEntryReport","level4ReportLib");
    return $.xsplanningtool.services.businessLayer.dataEntryReport.level4ReportLib;
}

function getRolePermission(){
	$.import("xsplanningtool.services.businessLayer.admin","rolePermissionLib");
    return $.xsplanningtool.services.businessLayer.admin.rolePermissionLib;
}

function getPermission(){
	$.import("xsplanningtool.services.businessLayer.admin","permissionLib");
    return $.xsplanningtool.services.businessLayer.admin.permissionLib;
}

function getResource(){
	$.import("xsplanningtool.services.businessLayer.admin","resourceLib");
    return $.xsplanningtool.services.businessLayer.admin.resourceLib;
}
    
/************Data Layer Mapper*****************/

function getdbHelper(){
	$.import("xsplanningtool.services.dataLayer.util","dbHelper");
	return $.xsplanningtool.services.dataLayer.util.dbHelper;
}

function getDataLogin(){
	$.import("xsplanningtool.services.dataLayer.admin","dataLogin");
	return $.xsplanningtool.services.dataLayer.admin.dataLogin;
}

function getDataLogError(){
	$.import("xsplanningtool.services.dataLayer.util","dataLogError");
	return $.xsplanningtool.services.dataLayer.util.dataLogError;
}

function getDataLevel3(){
	$.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel3");
	return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel3;
}

function getDataLevel4(){
	$.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel4");
	return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel4;
}

function getDataExpectedOutcome(){
	$.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataExpectedOutcome");
	return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataExpectedOutcome;
}

function getDataPartner(){
	$.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataPartner");
	return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataPartner;
}

function getDataInterLock(){
	$.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataInterlock");
	return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataInterlock;
}

function getDataUser(){
	$.import("xsplanningtool.services.dataLayer.admin","dataUser");
	return $.xsplanningtool.services.dataLayer.admin.dataUser;
}

function getDataPlan(){
	$.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataPlan");
	return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataPlan;
}

function getDataRegion(){
	$.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataRegion");
	return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataRegion;
}

function getDataSubRegion(){
	$.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataSubRegion");
	return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataSubRegion;
}

function getDataLevel2(){
    $.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel2");
    return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel2;
}

function getDataCrm(){
    $.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataCrm");
    return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataCrm;
}

function getDataLevel2User(){
    $.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel2User");
    return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel2User;
}

function getDataUserRole(){
	$.import("xsplanningtool.services.dataLayer.admin","dataUserRole");
	return $.xsplanningtool.services.dataLayer.admin.dataUserRole;
}

function getDataPath(){
    $.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataPath");
    return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataPath;
}

function getDataRole(){
	$.import("xsplanningtool.services.dataLayer.admin","dataRole");
	return $.xsplanningtool.services.dataLayer.admin.dataRole;
}

function getDataLevel3User(){
    $.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel3User");
    return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel3User;
}

function getDataSpendCategory(){
    $.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataSpendCategory");
    return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataSpendCategory;
}

function getDataEuroConversion(){
    $.import("xsplanningtool.services.dataLayer.settings","dataEuroConversion");
    return $.xsplanningtool.services.dataLayer.settings.dataEuroConversion;
}


function getDataCategory(){
    $.import("xsplanningtool.services.dataLayer.settings","dataCategory");
    return $.xsplanningtool.services.dataLayer.settings.dataCategory;
}

function getDataOption(){
    $.import("xsplanningtool.services.dataLayer.settings","dataOption");
    return $.xsplanningtool.services.dataLayer.settings.dataOption;
}

function getDataOutcomeType(){
	$.import("xsplanningtool.services.dataLayer.settings","dataOutcomeType");
	return $.xsplanningtool.services.dataLayer.settings.dataOutcomeType;
}

function getDataOutcome(){
	$.import("xsplanningtool.services.dataLayer.settings","dataOutcome");
	return $.xsplanningtool.services.dataLayer.settings.dataOutcome;
}

function getDataLevel4Report(){
    $.import("xsplanningtool.services.dataLayer.dataEntryReport","dataLevel4Report");
    return $.xsplanningtool.services.dataLayer.dataEntryReport.dataLevel4Report;
}
 
function getDataRolePermission(){
	$.import("xsplanningtool.services.dataLayer.admin","dataRolePermission");
	return $.xsplanningtool.services.dataLayer.admin.dataRolePermission;
}

function getDataConfig(){
	$.import("xsplanningtool.services.dataLayer.util","dataConfiguration");
	return $.xsplanningtool.services.dataLayer.util.dataConfiguration;
}

function getDataPermission(){
	$.import("xsplanningtool.services.dataLayer.admin","dataPermission");
	return $.xsplanningtool.services.dataLayer.admin.dataPermission;
}

function getDataResource(){
	$.import("xsplanningtool.services.dataLayer.admin","dataResource");
	return $.xsplanningtool.services.dataLayer.admin.dataResource;
}

	 