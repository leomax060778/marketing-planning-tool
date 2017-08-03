$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var dataL5DER = mapper.getDataLevel5ReportLegacy();
var dataHl5 = mapper.getDataLevel5Legacy();
var dataPath = mapper.getDataPath();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataObjective = mapper.getDataObjectives();
var dataCampaignType = mapper.getDataCampaignType();
var dataCampaignSubType = mapper.getDataCampaignSubType();
var dataCostCenter = mapper.getDataCostCenter();
var dataRouteToMarket = mapper.getDataRouteToMarket();
var dataMarketingOrganization = mapper.getDataMarketingOrganization();
var dbER = mapper.getDataEmployeeResponsible();

/** ***********END INCLUDE LIBRARIES*************** */

function getAllL5DEReport(userId) {
    var hl5List = dataL5DER.getAllLevel5Report(userId);
    var allHl5 = [];
    hl5List.forEach(function (hl5) {
        var aux = {};
        Object.keys(hl5).forEach(function (key) {
            aux[key] = key != 'HL5_PATH' ? hl5[key]
                : 'CRM-' + hl5[key];
        });
        allHl5.push(aux);
    });
    return allHl5;
}

function getL5CrmBindingFieldsByHl5Id(hl5Id) {
    var sp_result = dataL5DER.getL5ChangedFieldsByHl5Id(hl5Id);
    var mapL5CrmBindignFields = {};
    for (var i = 0; i < sp_result.length; i++) {
        var obj = sp_result[i];
        mapL5CrmBindignFields[obj.COLUMN_NAME] = {};
        mapL5CrmBindignFields[obj.COLUMN_NAME].HL5_CRM_BINDING_ID = obj.ID
    }
    return mapL5CrmBindignFields;
}

function getL5ChangedFieldsByHl5Id(hl5Id, userId) {
    var l5ReportFields = this.getProcessingReportFields();
    var data = {"hl5": [], "category": []};
    var changedFields = dataL5DER.getL5ChangedFieldsByHl5Id(hl5Id);
    var costCenter;
    var hl5Categories = dataCategoryOptionLevel.getAllocationCategory(hl5Id, 'hl5');
    var hl5CategoryOptions = util.getAllocationOptionByCategoryAndLevelId('hl5', hl5Id);
    var processingReportData = dataL5DER.getL5ForProcessingReportByHl5Id(hl5Id);

    var hl5 = processingReportData.hl5;
    Object.keys(l5ReportFields).forEach(function (field) {
        if (field == "CATEGORY") {
            hl5Categories.forEach(function (hl5Category) {
                if (hl5Category.IN_PROCESSING_REPORT) {
                    var object = {};
                    object.option = [];
                    object.display_name = hl5Category.CATEGORY_NAME;
                    hl5CategoryOptions[hl5Category.CATEGORY_ID].forEach(function (hl5CategoryOption) {
                        if (hl5CategoryOption.AMOUNT != 0 || hl5CategoryOption.UPDATED) {
                            object.option.push({
                                "option_name": hl5CategoryOption.OPTION_NAME,
                                "value": hl5CategoryOption.AMOUNT,
                                "changed": hl5CategoryOption.UPDATED
                            });
                        }
                    });
                    data.category.push(object);
                }
            });

        } else {
            var object = {};
            object.display_name = l5ReportFields[field];
            var CRM_ACRONYM = "CRM";
            var parentPath = CRM_ACRONYM + "-" + hl5.L1_ACRONYM + hl5.BUDGET_YEAR + "-" + hl5.L3_ACRONYM + "-" + hl5.L4_ACRONYM;
            switch (field) {
                case "ACRONYM":
                    object.value = parentPath + hl5.ACRONYM;
                    break;
                case "CAMPAIGN_TYPE_ID":
                    object.value = hl5.CAMPAIGN_TYPE;
                    break;
                case "CAMPAIGN_SUBTYPE_ID":
                    object.value = hl5.CAMPAIGN_SUB_TYPE;
                    break;
                case "CAMPAIGN_OBJECTIVE_ID":
                    object.value = hl5.CAMPAIGN_OBJECTIVE;
                    break;
                case "ROUTE_TO_MARKET_ID":
                    object.value = hl5.ROUTE_TO_MARKET;
                    break;
                case "COST_CENTER_ID":
                    object.value = hl5.COST_CENTER_CODE;
                    break;
                case "SALES_ORGANIZATION_ID":
                    if(hl5.SALES_ORGANIZATION_ID) {
                        var saleOrganization = dataMarketingOrganization.getMarketingOrganizationById(hl5.SALES_ORGANIZATION_ID)[0];
                        object.value = saleOrganization.NAME;
                    }

                    //object.value = hl5.SALE_ORGANIZATION;
                    break;
                //TODO:
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
                    object.value = hl5.SHOW_ON_DG_CALENDAR ? "Yes" : "No";
                    break;
                case "BUSINESS_OWNER_ID":
                    object.value = hl5.BUSINESS_OWNER;
                    break;
                case "EMPLOYEE_RESPONSIBLE_ID":
                    object.value = hl5.EMPLOYEE_RESPONSIBLE;
                    break;
                case "MARKETING_PROGRAM_ID":
                    object.value = hl5.MARKETING_PROGRAM;
                    break;
                case "MARKETING_PROGRAM_DESC":
                    object.value = hl5.MARKETING_PROGRAM_DESCRIPTION;
                    break;
                case "MARKETING_ACTIVITY_DESC":
                    object.value = hl5.MARKETING_ACTIVITY;
                    break;
                case "DISTRIBUTION_CHANNEL_DESC":
                    object.value = hl5.DISTRIBUTION_CHANNEL;
                    break;
                case "PLANNED_START_DATE":
                    object.value = (new Date(hl5.PLANNED_START_DATE)).toLocaleDateString();
                    break;
                case "PLANNED_END_DATE":
                    object.value = (new Date(hl5.PLANNED_END_DATE)).toLocaleDateString();
                    break;
                case "ACTUAL_START_DATE":
                    object.value = (new Date(hl5.ACTUAL_START_DATE)).toLocaleDateString();
                    break;
                case "ACTUAL_END_DATE":
                    object.value = (new Date(hl5.ACTUAL_END_DATE)).toLocaleDateString();
                    break;
                case "PARENT_PATH":
                    object.value = parentPath;
                    break;
                case "PRIORITY_ID":
                    object.value = hl5.PRIORITY;
                    break;
                default:
                    object.value = hl5[field];
                    break;
            }
            var fieldToCheck = field == "DISTRIBUTION_CHANNEL_DESC" ? "DISTRIBUTION_CHANNEL_ID"
                : field == "MARKETING_PROGRAM_DESC" ? "MARKETING_PROGRAM_ID"
                    : field == "MARKETING_ACTIVITY_DESC" ? "MARKETING_ACTIVITY_ID"
                        : field;

            object.changed = checkChangedField(changedFields, fieldToCheck);
            data.hl5.push(object);
        }
    });
    data.HL5_ID = hl5Id;
    return data;
}

function deleteL5ChangedFieldsByHl5Id(hl5Id) {
    return dataL5DER.deleteL5ChangedFieldsByHl5Id(hl5Id);
}

function checkChangedField(changedFields, field, value) {
    var hasChanged = false;
    for (var i = 0; i < changedFields.length; i++) {
        hasChanged = changedFields[i].COLUMN_NAME == field;
        if (hasChanged) break;
    }
    return hasChanged;
}

function getProcessingReportFields() {
    return {
        "ACRONYM": "ID"
        , "HL5_CRM_DESCRIPTION": "Description"
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
        , "EMPLOYEE_RESPONSIBLE_ID": "Person Responsible"
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