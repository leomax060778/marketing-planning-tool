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
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
/** ***********END INCLUDE LIBRARIES*************** */

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
    var l6ReportFields = this.getProcessingReportFields();
    var data = {"hl6": [], "category": []};
    var changedFields = dataL6DER.getL6ChangedFieldsByHl6Id(hl6Id);
    var hl6Categories = dataCategoryOptionLevel.getAllocationCategory(hl6Id, 'hl6');

    var hl6CategoryOptions = util.getAllocationOptionByCategoryAndLevelId('hl6', hl6Id);
    var processingReportData = dataL6DER.getL6ForProcessingReportByHl6Id(hl6Id);

    var hl6 = processingReportData.hl6;
    //var hl6 = dataHl6.getHl6ById(hl6Id);
    var hl5 = dataHl5.getHl5ById(hl6['HL5_ID']);
    var costCenter;
    Object.keys(l6ReportFields).forEach(function (field) {
        if (field == "CATEGORY") {
            hl6Categories.forEach(function (hl6Category) {
                if(hl6Category.IN_PROCESSING_REPORT){
                    var object = {};
                    object.option = [];
                    object.display_name = hl6Category.CATEGORY_NAME;
                    //var hl6CategoryOptions = dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(hl6Category.CATEGORY_ID, 'hl6', hl6Id);
                    hl6CategoryOptions[hl6Category.CATEGORY_ID].forEach(function (hl6CategoryOption) {
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
            //var path = dataPath.getPathByLevelParent(6, hl6['HL5_ID']);
            var parentPath = CRM_ACRONYM + "-" + hl6.L1_ACRONYM + hl6.BUDGET_YEAR + "-" + hl6.L3_ACRONYM + "-" + hl6.L4_ACRONYM  + hl6.L5_ACRONYM;
            switch (field) {
                case "ACRONYM":
                    object.value = parentPath + hl6.ACRONYM;
                    break;
                case "DISTRIBUTION_CHANNEL_ID":
                    object.value = hl6.DISTRIBUTION_CHANNEL;
                    break;
                case "CAMPAIGN_TYPE_ID":
                    object.value = hl6.CAMPAIGN_TYPE;
                    break;
                case "CAMPAIGN_SUBTYPE_ID":
                    object.value = hl6.CAMPAIGN_SUB_TYPE;
                    break;
                case "CAMPAIGN_OBJECTIVE_ID":
                    object.value = hl6.CAMPAIGN_OBJECTIVE;
                    break;
                case "ROUTE_TO_MARKET_ID":
                    object.value = hl6.ROUTE_TO_MARKET;
                    break;
                case "COST_CENTER_ID":
                    object.value = hl6.COST_CENTER_CODE;
                    break;
                case "SALES_ORGANIZATION_ID":
                    object.value = hl6.SALE_ORGANIZATION;
                    break;

                case "MARKETING_ACTIVITY_ID":
                    if (processingReportData.marketing_activity_id) {
                        object.value = CRM_ACRONYM + '-'
                            + processingReportData.marketing_activity_id.BUDGET_YEAR
                            + processingReportData.marketing_activity_id.L1_ACRONYM
                            + '-' + processingReportData.marketing_activity_id.L3_ACRONYM
                            + '-' + processingReportData.marketing_activity_id.L4_ACRONYM
                            + processingReportData.marketing_activity_id.L5_ACRONYM;
                    }
                    break;
                case "SHOW_ON_DG_CALENDAR":
                    object.value = hl6.SHOW_ON_DG_CALENDAR ? "Yes" : "No";
                    break;
                case "BUSINESS_OWNER_ID":
                    object.value = hl6.BUSINESS_OWNER;
                    break;
                case "EMPLOYEE_RESPONSIBLE_ID":
                    object.value = hl6.EMPLOYEE_RESPONSIBLE;
                    break;
                case "MARKETING_PROGRAM_DESC":
                    object.value = hl6.MARKETING_PROGRAM_DESCRIPTION;
                    break;
                case "MARKETING_ACTIVITY_DESC":
                    object.value = hl6.MARKETING_ACTIVITY;
                    break;
                case "DISTRIBUTION_CHANNEL_DESC":
                    object.value = hl6.DISTRIBUTION_CHANNEL;
                    break;
                case "COST_CENTER_RESP_PERS":
                    if (hl6['COST_CENTER_ID']) {
                        costCenter = dataCostCenter.getCostCenterById(hl6['COST_CENTER_ID']);
                        object.value = costCenter.EMPLOYEE_RESPONSIBLE_DESCRIPTION;
                    }
                    break;
                case "PLANNED_START_DATE":
                    object.value = (new Date(hl6.PLANNED_START_DATE)).toLocaleDateString();
                    break;
                case "PLANNED_END_DATE":
                    object.value = (new Date(hl6.PLANNED_END_DATE)).toLocaleDateString();
                    break;
                case "ACTUAL_START_DATE":
                    object.value = (new Date(hl6.ACTUAL_START_DATE)).toLocaleDateString();
                    break;
                case "ACTUAL_END_DATE":
                    object.value = (new Date(hl6.ACTUAL_END_DATE)).toLocaleDateString();
                    break;
                case "PARENT_PATH":
                    object.value = parentPath;
                    break;
                case "PRIORITY_ID":
                    object.value = hl6.PRIORITY;
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

function getProcessingReportFields(){
    return {
        "ACRONYM": "ID"
        , "HL6_CRM_DESCRIPTION": "Description"
        , "CAMPAIGN_OBJECTIVE_ID": "Objective"
        , "CAMPAIGN_TYPE_ID": "Type"
        , "CAMPAIGN_SUBTYPE_ID": "Sub-Type"
        , "MARKETING_PROGRAM_ID": "Marketing Program ID"
        , "MARKETING_PROGRAM_DESC": "Marketing Program Desc"
        , "MARKETING_ACTIVITY_ID": "Marketing Activity ID"
        , "MARKETING_ACTIVITY_DESC": "Marketing Activity Desc"
        , "PARENT_PATH": "Parent"
        , "PRIORITY_ID": "Priority"
        , "SHOW_ON_DG_CALENDAR": "Show on calendar"
        , "PLANNED_START_DATE": "Planned Start"
        , "PLANNED_END_DATE": "Planned End"
        , "ACTUAL_START_DATE": "Actual Start"
        , "ACTUAL_END_DATE": "Actual End"
        , "SALES_ORGANIZATION_ID": "Marketing Organization"
        , "DISTRIBUTION_CHANNEL_ID": "Distribution Channel"
        , "DISTRIBUTION_CHANNEL_DESC": "Distribution Channel Desc"
        , "COST_CENTER_ID": "Cost Center"
        , "EMPLOYEE_RESPONSIBLE_ID": "Employee Responsible"
        , "BUSINESS_OWNER_ID": "Business Owner"
        , "ROUTE_TO_MARKET_ID": "Route to Market"
        , "BUDGET": "Budget"
        , "URL": "Event URL"
        , "VENUE": "Venue"
        , "STREET": "Street"
        , "CITY": "City"
        , "COUNTRY": "Country"
        , "POSTAL_CODE": "Postal Code"
        , "REGION": "Region"
        , "EVENT_OWNER": "Event Owner"
        , "NUMBER_OF_PARTICIPANTS": "Number Of Participants"
        , "CATEGORY": ""
    };
}