/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataHl4 = mapper.getDataLevel4();
var dataHl5 = mapper.getDataLevel5();
var dataHl6 = mapper.getDataLevel6();
var dataExOut = mapper.getDataExpectedOutcome();
var dataPartner = mapper.getDataPartner();
var partnerLib = mapper.getPartner();
var dataEuroConversion = mapper.getDataEuroConversion();
var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var level5DER = mapper.getLevel5DEReport();
var dataL5DER = mapper.getDataLevel5Report();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var userBL = mapper.getUser();
var mail = mapper.getMail();
var businessError = mapper.getLogError();
var pathBL = mapper.getPath();
var config = mapper.getDataConfig();
/*************************************************/

var levelCampaign = "Initiative/Campaign";
var L5_MSG_INITIATIVE_NOT_FOUND = "The Initiative/Campaign can not be found.";
var L5_MSG_USER_NOT_FOUND = "The User can not be found.";
var L5_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L5_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Initiative/Campaign, because the status doesn´t allow it.";
var L5_MSG_INITIATIVE_CANT_DEL_CHILD = "The selected Initiative/Campaign can not be deleted because has childs.";
var L5_MSG_INITIATIVE_DETAIL = "The Initiative/Campaign details can not be null or empty.";
var L5_MSG_INITIATIVE_BUSINESS = "The Initiative/Campaign business value can not be null or empty.";
var L5_MSG_INITIATIVE_ACRONYM = "The Initiative/Campaign acronym can not be null or empty.";
var L5_MSG_INITIATIVE_IN_CRM = "Cannot modified CRM ID if already exists in CRM.";
var L5_MSG_INITIATIVE_EXISTS = "Another Initiative/Campaign with the same acronym already exists.";
var L5_MSG_INITIATIVE_ACRONYM_LENGTH = "The Initiative/Campaign Acronym length must be 3 character.";
var L5_MSG_INITIATIVE_CRM_DESCRIPTION = "The Initiative/Campaign CRM description can not be null or empty.";
var L5_MSG_INITIATIVE_DISTRIBUTION_CHANNEL = "The Initiative/Campaign Distribution channel can not be null or empty.";
var L5_MSG_INITIATIVE_BUDGET_DATA = "The Initiative/Campaign Budget data can not be found.";
var L5_MSG_INITIATIVE_BUDGET_VALUE = "The Initiative/Campaign Budget value must be greater than zero.";
var L5_MSG_INITIATIVE_CURRENCY = "The Initiative/Campaign Currency can not be found.";
var L5_MSG_INITIATIVE_BUDGET_SPEND = "The Initiative/Campaign Budget spend must be set.";
var L5_MSG_INITIATIVE_BUDGET_SPEND_PERCENT = "The Initiative/Campaign Budget Spend must be 100%.";
var L5_MSG_INITIATIVE_MY_BUDGET = " The Initiative/Campaign in My Budget can not be found.";
var L5_MSG_INITIATIVE_BUDGET_PERCENT = "The Initiative/Campaign in My Budget percentage should be less than or equal to 100%.";
var L5_MSG_INITIATIVE_SALES_OTHER = "The Initiative/Campaign in Sales Other has not attributes.";
var L5_CAMPAIGN_FORECASTING_KPIS_DETAILS = "Campaign Forecasting / KPIS details amount value is not valid.";
var L5_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO = "Campaign Forecasting / KPIS details euro value is not valid.";
var L5_CAMPAIGN_FORECASTING_KPIS_NOT_VALID = "Campaign Forecasting / KPIS is not valid.";
var L5_PARTNER_TYPE_NOT_VALID = "Partner type is not valid.";
var L5_PARTNER_NAME_NOT_FOUND = "Partner name can not be found.";
var L5_PARTNER_REGION_NOT_VALID = "Partner region is not valid.";
var L5_PARTNER_VALUE_NOT_VALID = "Partner value is not valid.";
var L5_CATEGORY_NOT_EMPTY = "Category cannot be empty.";
var L5_CATEGORY_INCORRECT_NUMBER = "Incorrect number of categories.";
var L5_CATEGORY_NOT_VALID = "Category is not valid.";
var L5_CATEGORY_OPTIONS_NOT_EMPTY = "Category Options cannot be empty.";
var L5_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L5_CATEGORY_OPTION_NOT_VALID = "Option is not valid.";
var L5_CATEGORY_NOT_VALID = "Category is not valid.";
var L5_CATEGORY_TOTAL_PERCENTAGE = "Category total percentage should be less than or equal to 100%.";
var L5_CATEGORY_OPTION = "Error while trying to save Option.";
var L5_CATEGORY_OPTION_NOT_VALID = "Option or User is not valid.";
var L5_MSG_INITIATIVE_HAS_LEVEL_6 = "The selected Initiative/Campaign can not be deleted because has childs."

var HL5_STATUS = {
    IN_PROGRESS: 1,
    LOAD_DATA_ENTRY: 2,
    IN_CRM: 3,
    UPDATE_IN_CRM: 4,
    EXCEED_BUDGET: 5,
    COMPLETE: 6
};

var ORGANIZATION_TYPE = {
    REGIONAL: 1,
    CENTRAL: 2,
    OTHER: 3
};

/** ****************END CONSTANTS***************** */

function getHl5ByHl4Id(id) {
    var hl5List = dataHl5.getHl5ByHl4Id(id);
    var hl5TotalBudget = 0;
    var hl5BudgetRemaining = 0;
    var allHl5 = [];
    if (hl5List.length) {       
        hl5List.forEach(function(hl5){
            var aux = {};
            Object.keys(hl5).forEach(function(key){
                aux[key] = key != 'CRM_ID' ? hl5[key]
                    : 'CRM-' + hl5[key];
            });
            allHl5.push(aux);
        });

        hl5TotalBudget = dataHl5.getHl5TotalBudgetByHl4Id(id);
        hl5BudgetRemaining = dataHl5.getHl5RemainingBudgetByHl4Id(id, hl5TotalBudget);
    }

    var response = {"results": allHl5, "total_budget": hl5TotalBudget, "remaining_budget": hl5BudgetRemaining};
    return response;
}

function getHl5ById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "hl5Services/handleGet/getHl5ById", L5_MSG_INITIATIVE_NOT_FOUND);

    var hl5 = JSON.parse(JSON.stringify(dataHl5.getHl5ById(id)));
    var partner = partnerLib.getPartnerByHl5Id(id);
    var myBudget = dataHl5.getHl5MyBudgetByHl5Id(id);
    var sale = dataHl5.getHl5SalesByHl5Id(id);
    var currencyValueAux = dataEuroConversion.getEuroConversionValueById(hl5.EURO_CONVERSION_ID);
    var hl5_category = getHl5CategoryOption(id);
    hl5.BUDGET = (Number(hl5.BUDGET) * Number(currencyValueAux)).toFixed(2);

    var result = {
        "hl5": hl5,
        "expectedOutcomes": expectedOutcomesLib.getExpectedOutcomesByHl5Id(id),
        "partner": partner,
        "myBudget": myBudget,
        "sale": sale,
        "hl5_category": hl5_category
    };

    //throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found","hl5Services/handleGet/getHl5ById", JSON.stringify(result));
    return serverToUiParser(result);
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "userServices/handleGet/getUserById", L5_MSG_USER_NOT_FOUND);
    return dbUser.getUserById(id)[0];
}

function getLevel5ForSearch() {
    var result = dataHl5.getHl5ForSearch();
    var resultRefactor = [];
    result.forEach(function (object) {
        var aux = {};
        aux.ID = object.ID;
        aux.PARENT_ID = object.PARENT_ID;
        aux.BUDGET_YEAR = Number(ctypes.Int64(object.BUDGET_YEAR));
        aux.ACRONYM = object.ACRONYM;
        aux.ORGANIZATION_ACRONYM = object.ORGANIZATION_ACRONYM;
        aux.REGION_NAME = object.REGION_NAME;
        aux.SUBREGION_NAME = object.SUBREGION_NAME;
        aux.PATH = "CRM-" + object.PATH;
        resultRefactor.push(aux);
    });
    return resultRefactor;
}

function getAllDistributionChannel() {
    return dataHl5.getAllDistributionChannel();
}

function insertHl5(data, userId) {
    var hl5_id = 0;
    data = uiToServerParser(data);
    data.hl5.HL5_STATUS_DETAIL_ID = validateHl5(data);
    //todo: set correct data
    data.hl5.CAMPAIGN_OBJECTIVE_ID = null;
    data.hl5.CAMPAIGN_TYPE_ID = null;
    data.hl5.CAMPAIGN_SUBTYPE_ID = null;
    data.hl5.MARKETING_PROGRAM_ID = null;
    data.hl5.MARKETING_ACTIVITY_ID = null;
    data.hl5.ACTUAL_START_DATE = null;
    data.hl5.ACTUAL_END_DATE = null;
    data.hl5.SHOW_ON_DG_CALENDAR = null;
    data.hl5.BUSINESS_OWNER_ID = null;
    data.hl5.EMPLOYEE_RESPONSIBLE_ID = null;
    data.hl5.BUSINESS_OWNER_ID = null;
    data.hl5.COST_CENTER_ID = null;

    if (data.hl5.HL5_STATUS_DETAIL_ID > 0) {
        var conversionValue = dataEuroConversion.getEuroConversionValueById(data.hl5.EURO_CONVERSION_ID);

        data.hl5.IN_BUDGET = checkBudgetStatus(data.hl5.HL4_ID, hl5_id, Number(data.hl5.BUDGET) / conversionValue);
        data.hl5.BUDGET_SPEND_Q1 = Number(data.hl5.BUDGET_SPEND_Q1);
        data.hl5.BUDGET_SPEND_Q2 = Number(data.hl5.BUDGET_SPEND_Q2);
        data.hl5.BUDGET_SPEND_Q3 = Number(data.hl5.BUDGET_SPEND_Q3);
        data.hl5.BUDGET_SPEND_Q4 = Number(data.hl5.BUDGET_SPEND_Q4);
        data.hl5.BUDGET = Number(data.hl5.BUDGET) / conversionValue;

        data.hl5.CREATED_USER_ID = userId;

        hl5_id = dataHl5.insertHl5(
            data.hl5.HL5_CRM_DESCRIPTION
            , data.hl5.ACRONYM
            , data.hl5.DISTRIBUTION_CHANNEL_ID
            , data.hl5.BUDGET
            , data.hl5.HL4_ID
            , data.hl5.CAMPAIGN_OBJECTIVE_ID
            , data.hl5.CAMPAIGN_TYPE_ID
            , data.hl5.CAMPAIGN_SUBTYPE_ID
            , data.hl5.MARKETING_PROGRAM_ID
            , data.hl5.MARKETING_ACTIVITY_ID
            , data.hl5.ACTUAL_START_DATE
            , data.hl5.ACTUAL_END_DATE
            , data.hl5.SHOW_ON_DG_CALENDAR
            , data.hl5.BUSINESS_OWNER_ID
            , data.hl5.EMPLOYEE_RESPONSIBLE_ID
            , data.hl5.COST_CENTER_ID
            , data.hl5.IN_BUDGET
            , data.hl5.BUDGET_SPEND_Q1
            , data.hl5.BUDGET_SPEND_Q2
            , data.hl5.BUDGET_SPEND_Q3
            , data.hl5.BUDGET_SPEND_Q4
            , data.hl5.EURO_CONVERSION_ID
            , data.hl5.HL5_STATUS_DETAIL_ID
            , data.hl5.CREATED_USER_ID
        );

        if (hl5_id > 0) {
            data.hl5.HL5_ID = hl5_id;
            if (data.hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.LOAD_DATA_ENTRY || data.hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.UPDATE_IN_CRM) {
                insertHl5CRMBinding(data, 'insert');
            }
            ;
            setHl5Status(hl5_id, data.hl5.HL5_STATUS_DETAIL_ID, userId);

            if (data.hl5_expected_outcomes.hl5_expected_outcomes_detail.length) {
                var outcome = {};
                outcome.CREATED_USER_ID = userId;
                outcome.HL5_ID = hl5_id;
                outcome.COMMENTS = data.hl5_expected_outcomes.COMMENTS || "";
                var hl5_expected_outcomes_id = dataExOut.insertHl5ExpectedOutcomes(outcome.HL5_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);
                data.hl5_expected_outcomes.hl5_expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
                    expectedOutcomeDetail.CREATED_USER_ID = userId;
                    expectedOutcomeDetail.HL5_EXPECTED_OUTCOMES_ID = hl5_expected_outcomes_id;
                    expectedOutcomeDetail.VOLUME_VALUE = Number(expectedOutcomeDetail.VOLUME_VALUE);
                    dataExOut.insertHl5ExpectedOutcomesDetail(expectedOutcomeDetail.HL5_EXPECTED_OUTCOMES_ID, expectedOutcomeDetail.OUTCOMES_ID, expectedOutcomeDetail.EURO_VALUE, expectedOutcomeDetail.VOLUME_VALUE, expectedOutcomeDetail.CREATED_USER_ID);
                });
            }
            if (data.hl5_budget) {
                data.hl5_budget.forEach(function (myBudget) {
                    myBudget.HL5_ID = hl5_id;
                    myBudget.CREATED_USER_ID = userId;
                    dataHl5.insertHl5Budget(myBudget.HL5_ID, myBudget.ORGANIZATION_ID, myBudget.PERCENTAGE, ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE], myBudget.CREATED_USER_ID);
                });
            }
            ;
            if (data.hl5_sale) {
                data.hl5_sale.forEach(function (sale) {
                    sale.HL5_ID = hl5_id;
                    sale.CREATED_USER_ID = userId;
                    sale.AMOUNT = Number(sale.AMOUNT) / conversionValue;
                    sale.DESCRIPTION = ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION : null;
                    sale.ORGANIZATION_ID = ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] !== 3 ? sale.ORGANIZATION_ID : null;
                    dataHl5.insertHl5Sale(sale.HL5_ID, sale.ORGANIZATION_ID, sale.AMOUNT, ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE], sale.DESCRIPTION, sale.CREATED_USER_ID);
                });
            }

            data.partners.forEach(function (partner) {
                partner.CREATED_USER_ID = userId;
                partner.HL5_ID = hl5_id;
                dataPartner.insertHl5Partner(partner.HL5_ID, partner.NAME, partner.PARTNER_TYPE_ID, partner.REGION_ID, partner.VALUE, partner.CREATED_USER_ID);
            });

            data.hl5_category.forEach(function (hl5Category) {
                var category = {};
                category.HL5_ID = hl5_id;
                category.CATEGORY_ID = hl5Category.CATEGORY_ID;
                category.CREATED_USER_ID = userId;
                category.IN_PROCESSING_REPORT = hl5Category.IN_PROCESSING_REPORT;
                var hl5CategoryId = dataHl5.insertHl5Category(category.HL5_ID, category.CATEGORY_ID, category.CREATED_USER_ID, category.IN_PROCESSING_REPORT);
                hl5Category.hl5_category_option.forEach(function (hl5CategoryOption) {
                    hl5CategoryOption.CREATED_USER_ID = userId;
                    hl5CategoryOption.HL5_CATEGORY_ID = hl5CategoryId;
                    hl5CategoryOption.AMOUNT = hl5CategoryOption.AMOUNT || 0;
                    dataHl5.insertHl5CategoryOption(hl5CategoryOption.HL5_CATEGORY_ID, hl5CategoryOption.OPTION_ID, hl5CategoryOption.AMOUNT, hl5CategoryOption.CREATED_USER_ID);
                });
            });
        }
        return hl5_id;
    }
}

function updateHl5(data, userId) {
	
    data = uiToServerParser(data);
    
    //throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", JSON.stringify(data));
	var hl5_id;
    if (!data.hl5.HL5_ID)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/updateHl5", L5_MSG_INITIATIVE_NOT_FOUND);

    if (!util.validateIsNumber(data.hl5.HL5_ID))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/updateHl5", L5_MSG_INITIATIVE_NOT_FOUND);
    
    if (!userId)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/updateHl5", L5_MSG_USER_NOT_FOUND);

    data.hl5.HL5_STATUS_DETAIL_ID = validateHl5(data);
    //throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", JSON.stringify(data));

    if (data.hl5.HL5_STATUS_DETAIL_ID > 0) {
        hl5_id = data.hl5.HL5_ID;
        var conversionValue = dataEuroConversion.getEuroConversionValueById(data.hl5.EURO_CONVERSION_ID);
        
        data.hl5.IN_BUDGET = checkBudgetStatus(data.hl5.HL4_ID, hl5_id, Number(data.hl5.BUDGET) / conversionValue);
        data.hl5.BUDGET_SPEND_Q1 = Number(data.hl5.BUDGET_SPEND_Q1);
        data.hl5.BUDGET_SPEND_Q2 = Number(data.hl5.BUDGET_SPEND_Q2);
        data.hl5.BUDGET_SPEND_Q3 = Number(data.hl5.BUDGET_SPEND_Q3);
        data.hl5.BUDGET_SPEND_Q4 = Number(data.hl5.BUDGET_SPEND_Q4);
        data.hl5.BUDGET = Number(data.hl5.BUDGET) / conversionValue;
        data.hl5.USER_ID = userId;
        
        data.hl5.CAMPAIGN_OBJECTIVE_ID = null;
        data.hl5.CAMPAIGN_TYPE_ID = null;
        data.hl5.CAMPAIGN_SUBTYPE_ID = null;
        data.hl5.MARKETING_PROGRAM_ID = null;
        data.hl5.MARKETING_ACTIVITY_ID = null;
        data.hl5.ACTUAL_START_DATE = null;
        data.hl5.ACTUAL_END_DATE = null;
        data.hl5.SHOW_ON_DG_CALENDAR = null;
        data.hl5.BUSINESS_OWNER_ID = null;
        data.hl5.EMPLOYEE_RESPONSIBLE_ID = null;
        data.hl5.COST_CENTER_ID = null;
        
        hl5_id = data.hl5.HL5_ID;
        
        if (data.hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.LOAD_DATA_ENTRY || data.hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.UPDATE_IN_CRM) {
            insertHl5CRMBinding(data, 'update');
        };
        
        dataHl5.updateHl5(
        		data.hl5.HL5_ID
                , data.hl5.HL5_CRM_DESCRIPTION
                , data.hl5.ACRONYM
                , data.hl5.DISTRIBUTION_CHANNEL_ID
                , data.hl5.BUDGET
                , data.hl5.HL4_ID
                , data.hl5.CAMPAIGN_OBJECTIVE_ID
                , data.hl5.CAMPAIGN_TYPE_ID
                , data.hl5.CAMPAIGN_SUBTYPE_ID
                , data.hl5.MARKETING_PROGRAM_ID
                , data.hl5.MARKETING_ACTIVITY_ID
                , data.hl5.ACTUAL_START_DATE
                , data.hl5.ACTUAL_END_DATE
                , data.hl5.SHOW_ON_DG_CALENDAR
                , data.hl5.BUSINESS_OWNER_ID
                , data.hl5.EMPLOYEE_RESPONSIBLE_ID
                , data.hl5.COST_CENTER_ID
                , data.hl5.IN_BUDGET
                , data.hl5.BUDGET_SPEND_Q1
                , data.hl5.BUDGET_SPEND_Q2
                , data.hl5.BUDGET_SPEND_Q3
                , data.hl5.BUDGET_SPEND_Q4
                , data.hl5.EURO_CONVERSION_ID
                , data.hl5.HL5_STATUS_DETAIL_ID
                , data.hl5.USER_ID
            );
        dataExOut.deleteHl5ExpectedOutcomesDetail(hl5_id, userId);
        dataExOut.deleteHl5ExpectedOutcomes(hl5_id, userId);
        if (data.hl5_expected_outcomes.hl5_expected_outcomes_detail.length) {
            var outcome = {};
            outcome.CREATED_USER_ID = userId;
            outcome.HL5_ID = hl5_id;
            outcome.COMMENTS = data.hl5_expected_outcomes.COMMENTS || "";
            var hl5_expected_outcomes_id = dataExOut.insertHl5ExpectedOutcomes(outcome.HL5_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);
                data.hl5_expected_outcomes.hl5_expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
                    expectedOutcomeDetail.CREATED_USER_ID = userId;
                    expectedOutcomeDetail.HL5_EXPECTED_OUTCOMES_ID = hl5_expected_outcomes_id;
                    expectedOutcomeDetail.VOLUME_VALUE = Number(expectedOutcomeDetail.VOLUME_VALUE);
                    dataExOut.insertHl5ExpectedOutcomesDetail(expectedOutcomeDetail.HL5_EXPECTED_OUTCOMES_ID, expectedOutcomeDetail.OUTCOMES_ID, expectedOutcomeDetail.EURO_VALUE, expectedOutcomeDetail.VOLUME_VALUE, expectedOutcomeDetail.CREATED_USER_ID);
                });
        }

        dataHl5.delHl5BudgetHard(hl5_id, userId);
        if (data.hl5_budget) {
            data.hl5_budget.forEach(function (myBudget) {
                myBudget.HL5_ID = hl5_id;
                myBudget.CREATED_USER_ID = userId;
                dataHl5.insertHl5Budget(myBudget.HL5_ID, myBudget.ORGANIZATION_ID, myBudget.PERCENTAGE, ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE], myBudget.CREATED_USER_ID);
            });
        };

        dataHl5.delHl5SaleHard(hl5_id, userId);
        if (data.hl5_sale) {
            data.hl5_sale.forEach(function (sale) {
                sale.HL5_ID = hl5_id;
                sale.CREATED_USER_ID = userId;
                sale.AMOUNT = Number(sale.AMOUNT);
                sale.DESCRIPTION = ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION : null;
                sale.ORGANIZATION_ID = ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] !== 3 ? sale.ORGANIZATION_ID : null;
                dataHl5.insertHl5Sale(sale.HL5_ID, sale.ORGANIZATION_ID, sale.AMOUNT, ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE], sale.DESCRIPTION, sale.CREATED_USER_ID);
            });
        };

        dataPartner.deleteHl5Partner(hl5_id, userId);
        data.partners.forEach(function (partner) {
            partner.CREATED_USER_ID = userId;
            partner.HL5_ID = hl5_id;
            dataPartner.insertHl5Partner(partner.HL5_ID, partner.NAME, partner.PARTNER_TYPE_ID, partner.REGION_ID, partner.VALUE, partner.CREATED_USER_ID);
        });

        data.hl5_category.forEach(function (hl5Category) {
            var hl5_category_id = dataHl5.getHl5Category(hl5_id, hl5Category.in_category_id)[0].HL5_CATEGORY_ID;
            hl5Category.hl5_category_option.forEach(function (hl5CategoryOption) {
                hl5CategoryOption.USER_ID = userId;
                hl5CategoryOption.HL5_CATEGORY_ID = hl5_category_id;
                dataHl5.updateHl5CategoryOption(hl5CategoryOption.HL5_CATEGORY_ID, hl5CategoryOption.OPTION_ID, hl5CategoryOption.AMOUNT, hl5CategoryOption.USER_ID);
            });
        });
        return data;
    }
}

function deleteHl5(hl5, userId, rollBack) {
	hl5.HL5_ID = hl5.in_hl5_id;
    if (!hl5.HL5_ID && !rollBack)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_INITIATIVE_NOT_FOUND);

    if(dataHl5.getCountHl5Childrens(hl5.HL5_ID) > 0)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_INITIATIVE_HAS_LEVEL_6);

    if (!rollBack && !util.validateIsNumber(hl5.HL5_ID))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_INITIATIVE_NOT_FOUND);

    var userRoleId = Number(dbUserRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    if (!rollBack && userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_NO_PRIVILEGE);
    
    var hl5StatusId = !rollBack ? Number(dataHl5.getHl5StatusByHl5Id(hl5.HL5_ID).HL5_STATUS_DETAIL_ID) : 0;
    if (!rollBack && userRoleId !== 1 && (hl5StatusId !== HL5_STATUS.IN_CRM && hl5StatusId !== HL5_STATUS.UPDATE_IN_CRM))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_CANNOT_DEL_STATUS);

    if (!rollBack && dataHl5.getCountHl5Childrens(hl5.HL5_ID) > 0)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_INITIATIVE_CANT_DEL_CHILD);

    hl5.USER_ID = userId;

    dataPartner.deleteHl5Partner(hl5.HL5_ID, hl5.USER_ID);
    dataExOut.deleteHl5ExpectedOutcomesDetail(hl5.HL5_ID, hl5.USER_ID);
    dataExOut.deleteHl5ExpectedOutcomes(hl5.HL5_ID, hl5.USER_ID);
    level5DER.deleteL5ChangedFieldsByHl5Id(hl5.HL5_ID, hl5.USER_ID);
    dataHl5.deleteHl5CategoryOption(hl5.HL5_ID, hl5.USER_ID);
    dataHl5.deleteHl5Category(hl5.HL5_ID, hl5.USER_ID);
    dataHl5.deleteHl5Budget(hl5.HL5_ID, hl5.USER_ID);
    dataHl5.deleteHl5Sale(hl5.HL5_ID, hl5.USER_ID);
    dataHl5.deleteHl5(hl5.HL5_ID, hl5.USER_ID);

    return hl5;
}

function validateHl5(data) {
    var existInCrm = 0;
    if (!data)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_NOT_FOUND);

    if (!data.hl5.ACRONYM)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM);

    if (data.hl5.ACRONYM.length !== 4)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM_LENGTH);

    if (existsHl5(data.hl5))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_EXISTS);

    if (!data.hl5.HL5_CRM_DESCRIPTION)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CRM_DESCRIPTION);

    if (!Number(data.hl5.DISTRIBUTION_CHANNEL_ID))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_DISTRIBUTION_CHANNEL);

    if (data.hl5.BUDGET < 0)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_BUDGET_VALUE);

    if (data.hl5.EURO_CONVERSION_ID < 0)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CURRENCY);
    //throw ErrorLib.getErrors().CustomError("","hl5Services/handlePost/insertHl5", data);

    if (!Number(data.hl5.EURO_CONVERSION_ID))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CURRENCY);
    //throw ErrorLib.getErrors().CustomError("","hl5Services/handlePost/insertHl5", data);

    if (!data.hl5.BUDGET_SPEND_Q1 && !data.hl5.BUDGET_SPEND_Q2 && !data.hl5.BUDGET_SPEND_Q3 && !data.hl5.BUDGET_SPEND_Q4)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_BUDGET_SPEND);

    var q1 = Number(data.hl5.BUDGET_SPEND_Q1) || 0;
    var q2 = Number(data.hl5.BUDGET_SPEND_Q2) || 0;
    var q3 = Number(data.hl5.BUDGET_SPEND_Q3) || 0;
    var q5 = Number(data.hl5.BUDGET_SPEND_Q4) || 0;

    var budgetSpend = q1 + q2 + q3 + q5;

    if (budgetSpend < 100)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_BUDGET_SPEND_PERCENT);

    if (!data.hl5_budget)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_MY_BUDGET);

    var myBudgetTotalPercentage = 0;
    var myBudgetComplete = false;

    data.hl5_budget.forEach(function (hl5_budget) {
        if (!hl5_budget.ORGANIZATION_ID || !Number(hl5_budget.ORGANIZATION_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", levelCampaign + " in My Budget " + hl5_budget.ORGANIZATION_ID + " can not be found.");

        myBudgetTotalPercentage = myBudgetTotalPercentage + Number(hl5_budget.PERCENTAGE);
    });

    if (myBudgetTotalPercentage > 100)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_BUDGET_PERCENT);
    if (myBudgetTotalPercentage < 100)
        myBudgetTotalPercentage = 0;

    myBudgetComplete = !!myBudgetTotalPercentage;


    if (data.hl5_sale) {
        data.hl5_sale.forEach(function (sale) {
            if (ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3) {
                if (!sale.DESCRIPTION)
                    throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", levelCampaign + " Sales description can not be found.");
            } else {
                if (!sale.ORGANIZATION_ID || !Number(sale.ORGANIZATION_ID))
                    throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", levelCampaign + " Sales " + key + " can not be found.");
            }

            if (!Number(sale.AMOUNT) && sale.AMOUNT != 0)
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", "The " + levelCampaign + " Sales " + key + " amount (" + sale.in_amount + ") is invalid.");
        });
    }
    ;

    if (data.hl5_expected_outcomes && data.hl5_expected_outcomes.hl5_expected_outcomes_detail.length) {
        data.hl5_expected_outcomes.hl5_expected_outcomes_detail.forEach(function (hl5ExpectedOutcomesDetail) {
            if (hl5ExpectedOutcomesDetail.VOLUME_VALUE != 0 && !Number(hl5ExpectedOutcomesDetail.VOLUME_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CAMPAIGN_FORECASTING_KPIS_DETAILS);
            if (!hl5ExpectedOutcomesDetail.EURO_VALUE || !Number(hl5ExpectedOutcomesDetail.EURO_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);
            if (!hl5ExpectedOutcomesDetail.OUTCOMES_ID || !Number(hl5ExpectedOutcomesDetail.OUTCOMES_ID))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);
        });
    }

    if (data.partners && data.partners.length) {
        data.partners.forEach(function (partner) {
            if (!partner.PARTNER_TYPE_ID || !Number(partner.PARTNER_TYPE_ID))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_PARTNER_TYPE_NOT_VALID);
            if (!partner.NAME)
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_PARTNER_NAME_NOT_FOUND);
            if (!partner.REGION_ID || !Number(partner.REGION_ID))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_PARTNER_REGION_NOT_VALID);
            if (!partner.VALUE || !Number(partner.VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_PARTNER_VALUE_NOT_VALID);
        });
    }

    if (!data.hl5_category)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_NOT_EMPTY);

    if (!data.hl5.HL5_ID && data.hl5_category.length !== dataCategory.getCountByHlId("hl5"))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_INCORRECT_NUMBER);

    var totalPercentage = 0;

    var categoryOptionComplete = false;
    for (var i = 0; i < data.hl5_category.length; i++) {
        var hl5Category = data.hl5_category[i];
        var percentagePerOption = 0;
        if (!hl5Category.CATEGORY_ID || !Number(hl5Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_NOT_VALID);

        if (!hl5Category.hl5_category_option.length)
            percentagePerOption = 100;
        //TODO review. Workaround for empty categories on edit
        //throw ErrorLib.getErrors().CustomError("","hl5Services/handlePost/insertHl5", L5_CATEGORY_OPTIONS_NOT_EMPTY);

        if (!data.hl5.HL5_ID && hl5Category.hl5_category_option.length !== dataOption.getOptionCountByCategoryId(hl5Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl5Category.hl5_category_option.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", "Option value is not valid (actual value " + option.AMOUNT + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT);

        });
        if (percentagePerOption > 100) {
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_TOTAL_PERCENTAGE);
        } else if (percentagePerOption < 100) {
            categoryOptionComplete = false;
            break;
        } else {
            categoryOptionComplete = true;
        }
    }
    
    var status = null;
    if (data.hl5.HL5_ID) {
        existInCrm = dataHl5.hl5ExistsInCrm(data.hl5.HL5_ID);
        var objHL5 = dataHl5.getHl5ById(data.hl5.HL5_ID);
        if (existInCrm && data.hl5.ACRONYM.toUpperCase() != objHL5.ACRONYM.toUpperCase())
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_IN_CRM);
        
        status = !categoryOptionComplete || !myBudgetComplete ? HL5_STATUS.IN_PROGRESS :
            !existInCrm ? HL5_STATUS.LOAD_DATA_ENTRY :
                crmFieldsHaveChanged(data, objHL5) ? HL5_STATUS.UPDATE_IN_CRM : HL5_STATUS.IN_CRM;
    } else {
        status = categoryOptionComplete && myBudgetComplete ? HL5_STATUS.LOAD_DATA_ENTRY : HL5_STATUS.IN_PROGRESS;
    }
    return status;
}

function getLevel5ByAcronym(acronym, hl4_id) {
    return dataHl5.getHl5ByAcronym(acronym, hl4_id);
}

function existsHl5(objHL5) {
    var hl5 = getLevel5ByAcronym(objHL5.ACRONYM, objHL5.HL4_ID);
    if (hl5 && hl5.HL5_ID && Number(hl5.HL5_ID) !== Number(objHL5.HL5_ID))
        return true;
    else
        return false;
}

function checkBudgetStatus(objHl4, hl5_id, new_hl5_budget) {
    //workaround 19/12/2016
    if(!objHl4.HL4_ID) objHl4.HL4_ID = objHl4.in_hl4_id;
    /***************************************************/

    if (!hl5_id) hl5_id = 0;
    if (Number(objHl4) && new_hl5_budget) {
        var objHl = {};
        objHl.HL4_ID = Number(objHl4) ? objHl4 : objHl4.HL4_ID;
        objHl.HL5_ID = hl5_id;
        var hl4 = dataHl4.getHl4ById(objHl.HL4_ID);

        var hl4AllocatedBudget = dataHl4.getHl4AllocatedBudget(objHl.HL4_ID, hl5_id);
        return (Number(hl4.HL4_FNC_BUDGET_TOTAL) - Number(hl4AllocatedBudget) - Number(new_hl5_budget)) >= 0 ? 1 : 0;
    } else {
        var result = {};
        result.out_result = 0;
        //lists of hl5 changed to send email to client
        result.emailListInBudget = [];
        result.emailListOutBudget = [];
        //var parameters = {};
        //parameters.in_hL5_id = objHl3.HL5_ID;

        //throw ("objHl3.HL5_ID" + objHl3.HL5_ID);

        var resultHl5 = dataHl5.getHl5ByHl4Id(objHl4.HL4_ID);// GET_HL5_BY_HL4_ID


        if (resultHl5.length > 0) {
            
            var total = 0;

            for (var i = 0; i < resultHl5.length; i++) {
                //objHl3.IN_HL5_FNC_BUDGET_TOTAL came from request
                //total	+ resOdb.out_hl5_budget_total_mkt asigned on hl5

                if (objHl4.HL4_FNC_BUDGET_TOTAL < total + parseFloat(resultHl5[i].BUDGET)) {
                    dataHl5.updateHl5BudgetStatus(resultHl5[i].HL5_ID, 0);
                    //store hl5id and users to be send email when register change to in budget
                    result.emailListOutBudget.push(resultHl5[i]);
                } else {
                    dataHl5.updateHl5BudgetStatus(resultHl5[i].HL5_ID, 1);
                    total = total + parseFloat(resultHl5[i].BUDGET);
                    //is completed
                    /*if(resultHl5[i].STATUS_ID === 3){
                     dataHl5.changeStatusHl5(resultHl5[i].HL5_ID, 5, userId);
                     }*/
                    //store hl5id and users to be send email when register change to in budget
                    result.emailListInBudget.push(resultHl5[i]);
                }
            }
            result.out_result = resultHl5.length;
        }
        return result;
    }
}

/* Function to set HL5 status */
function setHl5Status(hl5_id, status_id, userId) {
    var updateOK = null;
    if (hl5_id && status_id && userId) {
    	updateOK = dataHl5.changeStatusHl5(hl5_id, status_id, userId);
    	updateOK = dataHl5.insertHl5LogStatus(hl5_id, status_id, userId);
        if (HL5_STATUS.IN_CRM == status_id) {
            level5DER.deleteL5ChangedFieldsByHl5Id(hl5_id);
        }
    }
    return updateOK;
};

/* Set HL5 status to In CRM */
function setHl5StatusInCRM(hl5_id, userId) {
	
    return setHl5Status(hl5_id, HL5_STATUS.IN_CRM, userId);
}

function getSYSUUID() {
    var conn = $.hdb.getConnection();

    try {

        // Delete any existing token for this user
        var spUserToken = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_SYSUUID');
        var result = spUserToken();
        conn.close();

        var spResult = result['out_result'];
        if (spResult != null && spResult.length > 0) {
            var rowResult = spResult[0];
            return rowResult['SYS_UNIQUE_NUMBER'];
        }

        return null;

    } catch (e) {
        conn.close();
        throw e;
    }
}

function getHl5CategoryOption(hl5_id) {
    var hl5Categories = dataHl5.getHl5Category(hl5_id);
    var result = [];
    hl5Categories.forEach(function (catgory) {
        var aux = util.extractObject(catgory);
        var hl5Category = {};
        aux["hl5_category_option"] = dataHl5.getHl5CategoryOption(aux.HL5_CATEGORY_ID);
        hl5Category.hl5_category_option = [];
        Object.keys(aux).forEach(function (key) {
            if (key === "hl5_category_option") {
                for (var i = 0; i < aux[key].length; i++) {
                    var option = {};
                    Object.keys(aux[key][i]).forEach(function (auxKey) {
                        option[auxKey] = aux[key][i][auxKey];
                    });
                    hl5Category.hl5_category_option.push(option);
                }
            } else {
                hl5Category[key] = aux[key];
            }
        });
        result.push(hl5Category);
    });
    return result;
}

function insertHl5CRMBinding(hl5, action) {
    if (hl5.hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.IN_PROGRESS)
        return 0;

    var crmBindingFields = {
        "hl5": ["ACRONYM",
            "HL5_CRM_DESCRIPTION",
            "BUDGET",
            "DISTRIBUTION_CHANNEL_ID"],
        "CATEGORY": ""
    };

    var deReportDisplayName = {
        "ACRONYM": "Acronym",
        "HL5_CRM_DESCRIPTION": "CRM description",
        "BUDGET": "Budget",
        "DISTRIBUTION_CHANNEL_ID": "Distribution Channel"
    };

    if (action == 'insert') {
        level5DER.deleteL5ChangedFieldsByHl5Id(hl5.hl5.HL5_ID);
        Object.keys(crmBindingFields).forEach(function (object) {
            if (object == "CATEGORY") {
                var hl5Categories = dataHl5.getHl5Category(hl5.hl5.HL5_ID);
                hl5Categories.forEach(function (hl5Category) {
                    if (hl5Category.IN_PROCESSING_REPORT) {
                        dataHl5.insertHl5CRMBinding(hl5.hl5.HL5_ID, "CATEGORY", 1, hl5Category.HL5_CATEGORY_ID, hl5.hl5.CREATED_USER_ID);
                    };
                });
            } else {
                crmBindingFields[object].forEach(function (field) {
                    dataHl5.insertHl5CRMBinding(hl5.hl5.HL5_ID, field, 1, deReportDisplayName[field], hl5.hl5.CREATED_USER_ID);
                });
            }
        });
    } else if (action == 'update') {
        var oldHl5 = getHl5ById(hl5.hl5.HL5_ID);
        Object.keys(crmBindingFields).forEach(function (object) {
            if (object == "CATEGORY") {
                var hl5Categories = hl5.hl5_category;
                for (var i = 0; i < hl5Categories.length; i++) {
                    if (hl5Categories[i].IN_PROCESSING_REPORT == 1) {
                        var hl5CategoryOptions = hl5Categories[i].hl5_category_option;
                        for (var j = 0; j < hl5CategoryOptions.length; j++) {
                            var hl5CategoryOption = dataHl5.getHl5CategoryOption(null, hl5.hl5.HL5_ID, hl5CategoryOptions[j].OPTION_ID)[0];
                            if (hl5CategoryOptions[j].AMOUNT != hl5CategoryOption.AMOUNT) {
                                var hl5CrmBinding = dataL5DER.getL5ChangedFieldsByHl5IdByField(hl5.hl5.HL5_ID, object);//[0] ? dataL5DER.getL5ChangedFieldsByHl5IdByField(hl5.hl5.in_hl5_id, object)[0].ID : null;
                                hl5CrmBinding.forEach(function (obj) {
                                    if (hl5CategoryOption.HL5_CATEGORY_ID == obj.DISPLAY_NAME) {
                                        dataHl5.updateHl5CRMBinding(hl5.hl5.HL5_ID, object, 1, hl5.hl5.USER_ID, hl5Category.HL5_CATEGORY_ID, obj.ID);
                                    } else {
                                        dataHl5.insertHl5CRMBinding(hl5.hl5.HL5_ID, object, 1, hl5Category.HL5_CATEGORY_ID, hl5.hl5.USER_ID);
                                    }
                                });
                                break;
                            }
                        };
                    }
                }
            } else {
                crmBindingFields[object].forEach(function (field) {
                    var in_hl5_crm_binding_id = null;
                    var hl5CRMBindingField = null;

                    if (hl5.hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.LOAD_DATA_ENTRY || (hl5.hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.UPDATE_IN_CRM && oldHl5[object][field] != hl5[object][field])) {
                        hl5CRMBindingField = dataL5DER.getL5ChangedFieldsByHl5IdByField(hl5.hl5.HL5_ID, field)[0];
                        in_hl5_crm_binding_id = !!hl5CRMBindingField ? hl5CRMBindingField.ID : null;

                        if (in_hl5_crm_binding_id) {
                            dataHl5.updateHl5CRMBinding(hl5.hl5.HL5_ID, field, 1, hl5.hl5.USER_ID, deReportDisplayName[field], in_hl5_crm_binding_id);
                        } else {
                            dataHl5.insertHl5CRMBinding(hl5.hl5.HL5_ID, field, 1, deReportDisplayName[field], hl5.hl5.USER_ID);
                        }
                    }
                });
            }
        });
    }
}

function crmFieldsHaveChanged(hl5, oldHl5) {
    crmFieldsHaveChanged = false;
    //throw JSON.stringify(hl5);
    var crmBindingFields = {
        "hl5": ["ACRONYM",
            "HL5_CRM_DESCRIPTION",
            "BUDGET",
            "DISTRIBUTION_CHANNEL_ID"]
    };

    //var oldHl5 = getHl5ById(hl5.hl5.HL5_ID);
    //throw JSON.stringify(oldHl5.DISTRIBUTION_CHANNEL_ID + ' --- ' + hl5.hl5.DISTRIBUTION_CHANNEL_ID);
    //var aux = [];
    Object.keys(crmBindingFields).forEach(function (object) {
        crmBindingFields[object].forEach(function (field) {
            //aux.push({old: oldHl5[field], hl5: hl5[object][field]});
            if (oldHl5[field] != hl5[object][field]) {
                crmFieldsHaveChanged = true;
            }
        });
    });
    //throw JSON.stringify(aux);
    return crmFieldsHaveChanged;
}

//event is "Created" or "Updated"
function notifyChangeByEmail(data, userId, event) {
    try {
        var Hl3Id = data.hl5.in_hL5_id;
        var HL3 = level3BL.getLevel3ById(Hl3Id);
        var ownerId = HL3.CREATED_USER_ID;
        var Owner = userBL.getUserById(ownerId);
        var user = userBL.getUserById(userId);
        var path = pathBL.getPathByLevelParentToCRM(5, Hl3Id).PATH_TPH;

        var body = ' <p> Dear Colleague </p>  <p>The User : ' + userBL.getUserById(userId).USER_NAME + ' has set the Initiative/Campaign ' + path + ' for you.</p>  <p>Click on the ' + config.getAppUrl() + ' to review</p>';
        var mailObject = mail.getJson([{
            "address": Owner[0].EMAIL
        }], "Marketing Planning Tool - Level 5 " + event, body);

        var rdo = mail.sendMail(mailObject, true);

    } catch (e) {
        businessError.log(ErrorLib.getErrors().CustomError("", "level5/notifyChangeByEmail", e), userId);
    }

}

function sendProcessingReportEmail(hl5Id) {
    var appUrl = config.getAppUrl();
    var hl5 = dataHl5.getHl5ById(hl5Id);
    //var hl4 = dataHl4.getHl4ById(hl5.HL4_ID);
    var hl5OwnerEmail = getUserById(hl5.CREATED_USER_ID).EMAIL;
    
    /*TODO: change TO email for a real email account*/
    var body = '<p> Dear Colleague </p>';
    body += '<p>An initiative has been created in CRM.</p><br>';
    body += '<p>' + appUrl + '#/TeamPlanHierarchy/Level4/edit/' + hl5.HL4_ID + '/' + hl5Id + '</p>';

    //body +='http://localhost:63352/sap-fiori/webapp/index.html#/TeamPlanHierarchy/Level4/edit/' + hl5.HL4_ID + '/' + hl5Id;

    var mailObject = mail.getJson([{
        "address": hl5OwnerEmail
    }], "Marketing Planning Tool - Interlock Process", body);

    mail.sendMail(mailObject, true);
}

function insertAllHl5Category(categoryId, createdUserId, inProcessingReport) {
    return dataHl5.insertHl5Category(category.HL5_ID, category.CATEGORY_ID, category.CREATED_USER_ID, category.IN_PROCESSING_REPORT);
}

var map = {
    "in_hl5_id": "HL5_ID",
    "in_acronym": "ACRONYM",
    "in_hl5_crm_description": "HL5_CRM_DESCRIPTION",
    "distribution_channel_id": "DISTRIBUTION_CHANNEL_ID",
    "in_hl4_id": "HL4_ID",
    "in_hl5_fnc_budget_spend_q1": "BUDGET_SPEND_Q1",
    "in_hl5_fnc_budget_spend_q2": "BUDGET_SPEND_Q2",
    "in_hl5_fnc_budget_spend_q3": "BUDGET_SPEND_Q3",
    "in_hl5_fnc_budget_spend_q4": "BUDGET_SPEND_Q4",
    "in_euro_conversion_id": "EURO_CONVERSION_ID",
    "in_hl5_fnc_budget_total_mkt": "BUDGET",
    "in_region_id": "ORGANIZATION_ID",
    "in_route_id": "ORGANIZATION_ID",
    "in_percentage": "PERCENTAGE",
    "in_amount": "AMOUNT",
    "in_description": "DESCRIPTION",
    "in_category_id": "CATEGORY_ID",
    "in_in_processing_report": "IN_PROCESSING_REPORT",
    "in_option_id": "OPTION_ID",
    "in_comments": "COMMENTS",
    "in_outcomes_id": "OUTCOMES_ID",
    "in_euro_value": "EURO_VALUE",
    "in_amount_value": "VOLUME_VALUE",
    "in_partner_name": "NAME",
    "in_partner_type_id": "PARTNER_TYPE_ID",
    "in_value": "VALUE"
};

function uiToServerParser(object) {
    var data = JSON.stringify(object, function (key, value) {
        if (Array.isArray(value)) {
            return value;
        } else if (value && typeof value === 'object') {
            var replacement = {};
            Object.keys(value).forEach(function (k) {
                replacement[map[k] || k] = value[k];
                if (k === "in_region_id") {
                    if (value.in_partner_name) {
                        replacement.REGION_ID = value[k];
                    } else {
                        replacement.ORGANIZATION_TYPE = "REGIONAL";
                    }
                } else if (k === "in_route_id") {
                    replacement.ORGANIZATION_TYPE = "CENTRAL";
                } else if (k === "in_description") {
                    replacement.ORGANIZATION_TYPE = "OTHER";
                }
            });
            return replacement;
        }
        return value;
    });

    data = JSON.parse(data);

    data.hl5_budget = data.hl5_budget.regions.concat(data.hl5_budget.routes);
    data.hl5_sale = data.hl5_sale.regions.concat(data.hl5_sale.routes.concat(data.hl5_sale.others));
    data.hl5.BUDGET_SPEND_Q1 = data.hl5_fnc.BUDGET_SPEND_Q1;
    data.hl5.BUDGET_SPEND_Q2 = data.hl5_fnc.BUDGET_SPEND_Q2;
    data.hl5.BUDGET_SPEND_Q3 = data.hl5_fnc.BUDGET_SPEND_Q3;
    data.hl5.BUDGET_SPEND_Q4 = data.hl5_fnc.BUDGET_SPEND_Q4;
    data.hl5.EURO_CONVERSION_ID = data.hl5_fnc.EURO_CONVERSION_ID;
    data.hl5.BUDGET = data.hl5_fnc.BUDGET;

    data.hl5_fnc = undefined;

    return data;
};

function serverToUiParser(object) {
    var hl5_sale = {
        regions: [],
        globalteams: [],
        others: []
    };
    var hl5_budget = {
        regions: [],
        globalteams: []
    };
    object.myBudget.forEach(function (obj) {
        var aux = {};
        if (obj.ORGANIZATION_TYPE === 1) {
            aux.REGION_ID = obj.ORGANIZATION_ID;
            aux.PERCENTAGE = obj.PERCENTAGE;
            aux.REGION_NAME = obj.ORGANIZATION_NAME;
            hl5_budget.regions.push(aux);
        } else {
            aux.ROUTE_ID = obj.ORGANIZATION_ID;
            aux.PERCENTAGE = obj.PERCENTAGE;
            aux.GLOBAL_TEAM_NAME = obj.ORGANIZATION_NAME;
            hl5_budget.globalteams.push(aux);
        }
        ;
    });

    object.sale.forEach(function (obj) {
        var aux = {};
        if (obj.ORGANIZATION_TYPE === 1) {
            aux.REGION_ID = obj.ORGANIZATION_ID;
            aux.AMOUNT = obj.AMOUNT;
            aux.REGION_NAME = obj.ORGANIZATION_NAME;
            hl5_sale.regions.push(aux);
        } else if (obj.ORGANIZATION_TYPE === 2) {
            aux.ROUTE_ID = obj.ORGANIZATION_ID;
            aux.AMOUNT = obj.AMOUNT;
            aux.GLOBAL_TEAM_NAME = obj.ORGANIZATION_NAME;
            hl5_sale.globalteams.push(aux);
        } else {
            aux.DESCRIPTION = obj.DESCRIPTION;
            aux.AMOUNT = obj.AMOUNT;
            hl5_sale.others.push(aux);
        }
        ;
    });

    object.sale = hl5_sale;
    object.myBudget = hl5_budget;

    return object;
}