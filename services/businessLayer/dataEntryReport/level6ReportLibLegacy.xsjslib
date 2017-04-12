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
var dbER = mapper.getDataEmployeeResponsible();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */

var l6ReportFields = {
    "ACRONYM": "ID"
    , "HL6_CRM_DESCRIPTION": "Description"
    , "ACTUAL_START_DATE": "Actual Start"
    , "ACTUAL_END_DATE": "Actual End"
    , "CAMPAIGN_TYPE_ID": "Type"
    , "CAMPAIGN_SUBTYPE_ID": "Sub-Type"
    , "CAMPAIGN_OBJECTIVE_ID": "Objective"
    , "EMPLOYEE_RESPONSIBLE_ID": "Employee Responsible"
    , "DISTRIBUTION_CHANNEL_DESC": "Distribution Channel Desc"
    , "COST_CENTER_ID": "Cost Center"
    , "SALES_ORGANIZATION_ID": "Marketing Organization"
    , "BUDGET": "Budget"
    // , "DISTRIBUTION_CHANNEL_ID": "Distribution Channel ID"
    // , "ROUTE_TO_MARKET_ID": "Route to Market"
    ,"CATEGORY": ""
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
    var hl6 = dataHl6.getHl6ById(hl6Id);
    var hl5 = dataHl5.getHl5ById(hl6['HL5_ID']);
    var costCenter;
    Object.keys(l6ReportFields).forEach(function (field) {
        if (field == "CATEGORY") {
            hl6Categories.forEach(function (hl6Category) {
                if(hl6Category.IN_PROCESSING_REPORT){
                    var object = {};
                    object.option = [];
                    object.display_name = hl6Category.CATEGORY_NAME;
                    var hl6CategoryOptions = dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(hl6Category.CATEGORY_ID, 'hl6', hl6Id);
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
                case "EMPLOYEE_RESPONSIBLE_ID":
                    if (hl6[field]) {
                        var employeeResponsible = dbER.getEmployeeResponsibleById(hl6[field]);
                        object.value = employeeResponsible.FULL_NAME + ", " + employeeResponsible.EMPLOYEE_NUMBER;
                    }
                    break;
                case "DISTRIBUTION_CHANNEL_DESC":
                    if (hl6['DISTRIBUTION_CHANNEL_ID']) {
                        object.value = dataHl5.getDistributionChannelById(hl6['DISTRIBUTION_CHANNEL_ID']).NAME
                    }
                    break;
                case "ACTUAL_START_DATE":
                    object.value = (new Date(hl6[field])).toLocaleDateString();
                    break;
                case "ACTUAL_END_DATE":
                    object.value = (new Date(hl6[field])).toLocaleDateString();
                    break;
                /*case "DISTRIBUTION_CHANNEL_ID":
                    if (hl6[field]) {
                        object.value = dataHl5.getDistributionChannelById(hl6[field]).NAME;
                    }
                    break;*/
                default:
                    object.value = hl6[field];
                    break;
            }
            var fieldToCheck = field == "DISTRIBUTION_CHANNEL_DESC" ? "DISTRIBUTION_CHANNEL_ID" : field;

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