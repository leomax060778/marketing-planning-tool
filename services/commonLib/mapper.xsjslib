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
function getLevel5(){
    $.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","level5Lib");
    return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.level5Lib;
}
function getLevel6(){
    $.import("xsplanningtool.services.businessLayer.teamPlanHierarchy","level6Lib");
    return $.xsplanningtool.services.businessLayer.teamPlanHierarchy.level6Lib;
}

function getCampaignTypeLib(){
    $.import("xsplanningtool.services.businessLayer.settings","campaignTypeLib");
    return $.xsplanningtool.services.businessLayer.settings.campaignTypeLib;
}

function getCampaignSubTypeLib(){
    $.import("xsplanningtool.services.businessLayer.settings","campaignSubTypeLib");
    return $.xsplanningtool.services.businessLayer.settings.campaignSubTypeLib;
}

function getObjectiveLib(){
    $.import("xsplanningtool.services.businessLayer.settings","objectivesLib");
    return $.xsplanningtool.services.businessLayer.settings.objectivesLib;
}
function getCampaignObjectiveLib(){
    $.import("xsplanningtool.services.businessLayer.settings","campaignObjectiveLib");
    return $.xsplanningtool.services.businessLayer.settings.campaignObjectiveLib;
}

function getSaleOrganizationLib(){
    $.import("xsplanningtool.services.businessLayer.settings","saleOrganizationLib");
    return $.xsplanningtool.services.businessLayer.settings.saleOrganizationLib;
}

function getRouteToMarketLib(){
    $.import("xsplanningtool.services.businessLayer.settings","routeToMarketLib");
    return $.xsplanningtool.services.businessLayer.settings.routeToMarketLib;
}

function getCostCenter(){
    $.import("xsplanningtool.services.businessLayer.settings","costCenterLib");
    return $.xsplanningtool.services.businessLayer.settings.costCenterLib;
}

///
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
    $.import("xsplanningtool.services.businessLayer.interlock","interlockLib");
    return $.xsplanningtool.services.businessLayer.interlock.interlockLib;
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

function getLevel5DEReport(){
    $.import("xsplanningtool.services.businessLayer.dataEntryReport","level5ReportLib");
    return $.xsplanningtool.services.businessLayer.dataEntryReport.level5ReportLib;
}

function getLevel6DEReport(){
    $.import("xsplanningtool.services.businessLayer.dataEntryReport","level6ReportLib");
    return $.xsplanningtool.services.businessLayer.dataEntryReport.level6ReportLib;
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

function getBudgetReport(){
    $.import("xsplanningtool.services.businessLayer.reports","budgetLib");
    return $.xsplanningtool.services.businessLayer.reports.budgetLib;
}

function getDetailedReport(){
    $.import("xsplanningtool.services.businessLayer.reports","detailedReportLib");
    return $.xsplanningtool.services.businessLayer.reports.detailedReportLib;
}

function getContactData(){
    $.import("xsplanningtool.services.businessLayer.interlock","contactDataLib");
    return $.xsplanningtool.services.businessLayer.interlock.contactDataLib;
}

function getBudgetYear(){
    $.import("xsplanningtool.services.businessLayer.settings","budgetYearLib");
    return $.xsplanningtool.services.businessLayer.settings.budgetYearLib;
}


function getHl(){
    $.import("xsplanningtool.services.businessLayer.settings","hlLib");
    return $.xsplanningtool.services.businessLayer.settings.hlLib;
}

function getMarketingOrganization(){
    $.import("xsplanningtool.services.businessLayer.settings","marketingOrganizationLib");
    return $.xsplanningtool.services.businessLayer.settings.marketingOrganizationLib;
}

function getEmployeeResponsible(){
    $.import("xsplanningtool.services.businessLayer.settings","employeeResponsibleLib");
    return $.xsplanningtool.services.businessLayer.settings.employeeResponsibleLib;
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

function getDataCostCenter(){
    $.import("xsplanningtool.services.dataLayer.settings","dataCostCenter");
    return $.xsplanningtool.services.dataLayer.settings.dataCostCenter;
}

function getDataLevel4Report(){
    $.import("xsplanningtool.services.dataLayer.dataEntryReport","dataLevel4Report");
    return $.xsplanningtool.services.dataLayer.dataEntryReport.dataLevel4Report;
}

function getDataLevel5Report(){
    $.import("xsplanningtool.services.dataLayer.dataEntryReport","dataLevel5Report");
    return $.xsplanningtool.services.dataLayer.dataEntryReport.dataLevel5Report;
}

function getDataLevel6Report(){
    $.import("xsplanningtool.services.dataLayer.dataEntryReport","dataLevel6Report");
    return $.xsplanningtool.services.dataLayer.dataEntryReport.dataLevel6Report;
}

function getDataRolePermission(){
    $.import("xsplanningtool.services.dataLayer.admin","dataRolePermission");
    return $.xsplanningtool.services.dataLayer.admin.dataRolePermission;
}
function getDataCampaignObjective(){
    $.import("xsplanningtool.services.dataLayer.settings","dataCampaignObjective");
    return $.xsplanningtool.services.dataLayer.settings.dataCampaignObjective;
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

function getDataBudgetReports(){
    $.import("xsplanningtool.services.dataLayer.reports","dataBudget");
    return $.xsplanningtool.services.dataLayer.reports.dataBudget;
}

function getDataDetailedReport(){
    $.import("xsplanningtool.services.dataLayer.reports","dataDetailedReport");
    return $.xsplanningtool.services.dataLayer.reports.dataDetailedReport;
}

function getDataContactData(){
    $.import("xsplanningtool.services.dataLayer.interlock","dataContactData");
    return $.xsplanningtool.services.dataLayer.interlock.dataContactData;
}


function getDataBudgetYear(){
    $.import("xsplanningtool.services.dataLayer.settings","dataBudgetYear");
    return $.xsplanningtool.services.dataLayer.settings.dataBudgetYear;
}

function getDataHl(){
    $.import("xsplanningtool.services.dataLayer.settings","dataHl");
    return $.xsplanningtool.services.dataLayer.settings.dataHl;
}

function getDataMarketingOrganization(){
    $.import("xsplanningtool.services.dataLayer.settings","dataMarketingOrganization");
    return $.xsplanningtool.services.dataLayer.settings.dataMarketingOrganization;
}


function getDataLevel5(){
    $.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel5");
    return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel5;
}
function getDataLevel6(){
    $.import("xsplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel6");
    return $.xsplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel6;
}

function getDataCampaignType(){
    $.import("xsplanningtool.services.dataLayer.settings","dataCampaignType");
    return $.xsplanningtool.services.dataLayer.settings.dataCampaignType;
}

function getDataCampaignSubType(){
    $.import("xsplanningtool.services.dataLayer.settings","dataCampaignSubType");
    return $.xsplanningtool.services.dataLayer.settings.dataCampaignSubType;
}

function getDataSalesOrganization(){
    $.import("xsplanningtool.services.dataLayer.settings","dataSalesOrganizations");
    return $.xsplanningtool.services.dataLayer.settings.dataSalesOrganizations;
}

function getDataObjectives(){
    $.import("xsplanningtool.services.dataLayer.settings","dataObjectives");
    return $.xsplanningtool.services.dataLayer.settings.dataObjectives;
}

function getDataRouteToMarket(){
    $.import("xsplanningtool.services.dataLayer.settings","dataRouteToMarket");
    return $.xsplanningtool.services.dataLayer.settings.dataRouteToMarket;
}

function getDataEmployeeResponsible(){
    $.import("xsplanningtool.services.dataLayer.settings","dataEmployeeResponsible");
    return $.xsplanningtool.services.dataLayer.settings.dataEmployeeResponsible;
}
