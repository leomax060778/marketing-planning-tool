$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataL6DER = mapper.getDataLevel6Report();
var dataHl6 = mapper.getDataLevel6();
var dataHl5 = mapper.getDataLevel5();
var dataPath = mapper.getDataPath();
var dataObjective = mapper.getDataObjectives();
var dataCampaignType = mapper.getDataCampaignType();
var dataCategory = mapper.getDataCategory();
var dataCampaignSubType = mapper.getDataCampaignSubType();
var dataRouteToMarket = mapper.getDataRouteToMarket();
var dataMarketingOrganization = mapper.getDataMarketingOrganization();
var dataCostCenter = mapper.getDataCostCenter();
var dataMarketingProgram = mapper.getDataMarketingProgram();
//var dataMarketingActivity = mapper.getDataMarketingActivity();
var dataBusinessOwner = mapper.getDataBusinessOwner();
var dbER = mapper.getDataEmployeeResponsible();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var dataPriority = mapper.getDataPriority();
/** ***********END INCLUDE LIBRARIES*************** */

var l6ReportFields = {
    "ACRONYM": "ID"
    , "HL6_CRM_DESCRIPTION": "Description"
    , "SHOW_ON_DG_CALENDAR": "Show on calendar"
    , "CAMPAIGN_OBJECTIVE_ID": "Objective"
    , "CAMPAIGN_TYPE_ID": "Type"
    , "CAMPAIGN_SUBTYPE_ID": "Sub-Type"
    , "MARKETING_PROGRAM_ID": "Marketing Program ID"
    , "MARKETING_PROGRAM_DESC": "Marketing Program Desc" //
    , "MARKETING_ACTIVITY_ID": "Marketing Activity ID"
    , "MARKETING_ACTIVITY_DESC": "Marketing Activity Desc" //
    , "PLANNED_START_DATE": "Planned Start"
    , "PLANNED_END_DATE": "Planned End"
    , "ACTUAL_START_DATE": "Actual Start"
    , "ACTUAL_END_DATE": "Actual End"
    , "SALES_ORGANIZATION_ID": "Marketing Organization"
    , "DISTRIBUTION_CHANNEL_ID": "Distribution Channel"
    , "DISTRIBUTION_CHANNEL_DESC": "Distribution Channel Desc" //
    , "COST_CENTER_ID": "Cost Center"
    , "EMPLOYEE_RESPONSIBLE_ID": "Employee Responsible"
    , "BUSINESS_OWNER_ID": "Business Owner"
    , "BUDGET": "Budget"
    , "URL": "Event URL"
    , "VENUE": "Venue"
    , "STREET": "Street"
    , "CITY": "City"
    , "COUNTRY": "Country"
    , "POSTAL_CODE": "Postal Code"
    , "ROUTE_TO_MARKET_ID": "Route to Market"
    , "CATEGORY": ""
    , "PARENT_PATH": "Parent"
};

function getAllL6DEReport(userId) {
    var hl6List = dataL6DER.getAllLevel6Report(userId);
    var allHl6 = [];
    hl6List.forEach(function (hl6) {
        var aux = {};
        Object.keys(hl6).forEach(function (key) {
            aux[key] = key != 'HL6_PATH' ? hl6[key]
                : 'CRM-' + hl6[key];
        });
        allHl6.push(aux);
    });

    return allHl6;
}

function getL6ChangedFieldsByHl6Id(hl6Id, userId) {
    var data = {"hl6": [], "category": []};
    var changedFields = dataL6DER.getL6ChangedFieldsByHl6Id(hl6Id);
    var hl6Categories = dataCategoryOptionLevel.getAllocationCategory(hl6Id, 'hl6');
    //var hl6Categories = dataHl6.getHl6Category(hl6Id);
    var hl6 = dataHl6.getHl6ById(hl6Id);
    var hl5 = dataHl5.getHl5ById(hl6['HL5_ID']);
    var costCenter;
    Object.keys(l6ReportFields).forEach(function (field) {
        if (field == "CATEGORY") {
            hl6Categories.forEach(function (hl6Category) {
                //var actualCategory = dataCategory.getCategoryById(hl6Category.CATEGORY_ID);
                if(hl6Category.IN_PROCESSING_REPORT){
                    var object = {};
                    object.option = [];
                    object.display_name = hl6Category.CATEGORY_NAME;
                    var hl6CategoryOptions = dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(hl6Category.CATEGORY_ID, 'hl6', hl6Id);
                    //var hl6CategoryOptions = dataHl6.getHl6CategoryOption(hl6Category.HL6_CATEGORY_ID);
                    hl6CategoryOptions.forEach(function (hl6CategoryOption) {
                        if (hl6CategoryOption.AMOUNT != 0 || hl6CategoryOption.UPDATED) {
                            object.option.push({
                                "option_name": hl6CategoryOption.OPTION_NAME,
                                "value": hl6CategoryOption.AMOUNT,
                                "changed": hl6CategoryOption.UPDATED
                            });
                        }
                    });
                    data.category.push(object);
                }
            });
        } else {
            var object = {};
            object.display_name = l6ReportFields[field];
            var CRM_ACRONYM = "CRM";
            var path = dataPath.getPathByLevelParent(6, hl6['HL5_ID']);
            switch (field) {
                case "ACRONYM":
                    if (path.length > 0) {
                        object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH + hl6['ACRONYM'];
                    }
                    break;
                case "DISTRIBUTION_CHANNEL_ID":
                    if (hl6[field]) {
                        object.value = dataHl5.getDistributionChannelById(hl6[field]).NAME;
                    }
                    break;
                case "CAMPAIGN_TYPE_ID":
                    if (hl6[field]) {
                        object.value = dataCampaignType.getCampaignTypeById(hl6[field]).NAME;
                    }
                    break;
                case "CAMPAIGN_SUBTYPE_ID":
                    if (hl6[field]) {
                        object.value = dataCampaignSubType.getCampaignSubTypeById(hl6[field]).NAME;
                    }
                    break;
                case "CAMPAIGN_OBJECTIVE_ID":
                    if (hl6[field]) {
                        object.value = dataObjective.getObjectiveById(hl6[field]).NAME;
                    }
                    break;
                case "ROUTE_TO_MARKET_ID":
                    if (hl6[field]) {
                        object.value = dataRouteToMarket.getRouteToMarketById(hl6[field]).NAME;
                    }
                    break;
                case "COST_CENTER_ID":
                    if (hl6[field]) {
                        costCenter = dataCostCenter.getCostCenterById(hl6[field]);
                        object.value = costCenter.CODE;
                    }
                    break;
                case "SALES_ORGANIZATION_ID":
                    if (hl6[field]) {
                        costCenter = dataCostCenter.getCostCenterById(hl6[field]);
                        var saleOrganization = dataMarketingOrganization.getMarketingOrganizationById(costCenter.SALE_ORGANIZATION_ID)[0];
                        object.value = saleOrganization.NAME;
                    }
                    break;

                case "MARKETING_ACTIVITY_ID":
                    if (hl6['MARKETING_ACTIVITY_ID']) {
                        var hl6MarketingActivity = dataHl5.getHl5ById(hl6['MARKETING_ACTIVITY_ID']);
                        if (path.length > 0) {
                            object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH + hl6MarketingActivity['ACRONYM'];
                        }
                    }
                    break;
                case "SHOW_ON_DG_CALENDAR":
                    object.value = hl6[field] ? "Yes" : "No";
                    break;
                case "BUSINESS_OWNER_ID":
                    if (hl6[field]) {
                        object.value = dataBusinessOwner.getBusinessOwnerById(hl6[field]).DESCRIPTION;
                    }
                    break;
                case "EMPLOYEE_RESPONSIBLE_ID":
                    if (hl6[field]) {
                        var employeeResponsible = dbER.getEmployeeResponsibleById(hl6[field]);
                        object.value = employeeResponsible.FULL_NAME + ", " + employeeResponsible.EMPLOYEE_NUMBER;
                    }
                    break;
                case "MARKETING_PROGRAM_DESC":
                    if (hl6['MARKETING_PROGRAM_ID']) {
                        object.value = dataMarketingProgram.getMarketingProgramById(hl6['MARKETING_PROGRAM_ID']).NAME;
                    }
                    break;
                case "MARKETING_ACTIVITY_DESC":
                    if (hl6['MARKETING_ACTIVITY_ID']) {
                        var hl5MarketingActivity = dataHl5.getHl5ById(hl6['MARKETING_ACTIVITY_ID']);
                        object.value = hl5MarketingActivity.HL5_CRM_DESCRIPTION;
                    }
                    break;
                case "DISTRIBUTION_CHANNEL_DESC":
                    if (hl6['DISTRIBUTION_CHANNEL_ID']) {
                        object.value = dataHl5.getDistributionChannelById(hl6['DISTRIBUTION_CHANNEL_ID']).NAME
                    }
                    break;
                case "COST_CENTER_RESP_PERS":
                    if (hl6['COST_CENTER_ID']) {
                        costCenter = dataCostCenter.getCostCenterById(hl6['COST_CENTER_ID']);
                        object.value = costCenter.EMPLOYEE_RESPONSIBLE_DESCRIPTION;
                    }
                    break;
                case "PLANNED_START_DATE":
                    object.value = (new Date(hl6[field])).toLocaleDateString();
                    break;
                case "PLANNED_END_DATE":
                    object.value = (new Date(hl6[field])).toLocaleDateString();
                    break;
                case "ACTUAL_START_DATE":
                    object.value = (new Date(hl6[field])).toLocaleDateString();
                    break;
                case "ACTUAL_END_DATE":
                    object.value = (new Date(hl6[field])).toLocaleDateString();
                    break;
                case "PARENT_PATH":
                    if (path.length > 0) {
                        object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH;
                    }
                    break;
                case "PRIORITY_ID":
                    object.value = dataPriority.getPriorityById(hl6[field]).NAME;
                    break;
                default:
                    object.value = hl6[field];
                    break;
            }
            var fieldToCheck = field == "DISTRIBUTION_CHANNEL_DESC" ? "DISTRIBUTION_CHANNEL_ID"
                : field == "MARKETING_PROGRAM_DESC" ? "MARKETING_PROGRAM_ID"
                : field == "MARKETING_ACTIVITY_DESC" ? "MARKETING_ACTIVITY_ID"
                : field;

            object.changed = checkChangedField(changedFields, fieldToCheck);
            data.hl6.push(object);
        }
    });
    return data;
}

function deleteL6ChangedFieldsByHl6Id(hl6Id) {
    return dataL6DER.deleteL6ChangedFieldsByHl6Id(hl6Id);
}

function checkChangedField(changedFields, field, value) {
    var hasChanged = false;
    for (var i = 0; i < changedFields.length; i++) {
        hasChanged = changedFields[i].COLUMN_NAME == field;

        if (hasChanged) break;
    }
    return hasChanged;
}