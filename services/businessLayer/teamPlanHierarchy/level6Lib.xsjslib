/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataHl6 = mapper.getDataLevel6();
var dataHl5 = mapper.getDataLevel5();
var dataExOut = mapper.getDataExpectedOutcome();
var dataPartner = mapper.getDataPartner();
var partnerLib = mapper.getPartner();
var dataEuroConversion = mapper.getDataEuroConversion();
var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var dataPath = mapper.getDataPath();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var level6DER = mapper.getLevel6DEReport();
var dataL6DER = mapper.getDataLevel6Report();
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
var dataMO = mapper.getDataMarketingOrganization();
var dataRTM = mapper.getDataRouteToMarket();
var dataCST = mapper.getDataCampaignSubType();
var dataCT = mapper.getDataCampaignType();
var dataObj = mapper.getDataObjectives();
/** ********************************************** */

var levelCampaign = "Initiative/Campaign";
var L6_MSG_INITIATIVE_NOT_FOUND = "The Sub tactic/Campaign & Activity can not be found.";
var L6_MSG_USER_NOT_FOUND = "The User can not be found.";
var L6_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L6_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Sub tactic/Campaign & Activity, because the status doesn´t allow it.";
var L6_MSG_INITIATIVE_CRM_DESCRIPTION = "The Sub tactic/Campaign & Activity CRM description can not be null or empty.";
var L6_MSG_INITIATIVE_BUDGET_VALUE = "The Sub tactic/Campaign & Activity Budget value must be greater than zero.";
var L6_MSG_INITIATIVE_CURRENCY = "The Sub tactic/Campaign & Activity Currency can not be found.";
var L6_MSG_INITIATIVE_BUDGET_SPEND = "The Sub tactic/Campaign & Activity Budget spend must be set.";
var L6_MSG_INITIATIVE_BUDGET_SPEND_PERCENT = "The Sub tactic/Campaign & Activity Budget Spend must be 100%.";
var L6_MSG_INITIATIVE_MY_BUDGET = " The Sub tactic/Campaign & Activity in My Budget can not be found.";
var L6_MSG_INITIATIVE_BUDGET_PERCENT = "The Sub tactic/Campaign & Activity in My Budget percentage should be less than or equal to 100%.";
var L6_PARTNER_TYPE_NOT_VALID = "Partner type is not valid.";
var L6_PARTNER_NAME_NOT_FOUND = "Partner name can not be found.";
var L6_PARTNER_REGION_NOT_VALID = "Partner region is not valid.";
var L6_PARTNER_VALUE_NOT_VALID = "Partner value is not valid.";
var L6_MSG_INITIATIVE_ROUTE_TO_MARKET = "The Sub tactic/Campaign & Activity route to market cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_OBJECTIVE = "The Sub tactic/Campaign & Activity campaign objective cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_TYPE = "The Sub tactic/Campaign & Activity campaign type cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_SUBTYPE = "The Sub tactic/Campaign & Activity campaign subtype cannot be found.";
var L6_MSG_INITIATIVE_ACTUAL_START_DATE = "The Sub tactic/Campaign & Activity actual start date cannot be found.";
var L6_MSG_INITIATIVE_ACTUAL_END_DATE = "The Sub tactic/Campaign & Activity actual end date cannot be found.";
var L6_MSG_INITIATIVE_SALES_ORGANIZATION = "The Sub tactic/Campaign & Activity sales organization cannot be found.";
var L6_MSG_INITIATIVE_INVALID_DATE_RANGE = "The Actual End Date must be mayor than Actual Start Date";

var HL6_STATUS = {
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

function getHl6ByHl5Id(hl5Id) {
    var hl6List = dataHl6.getHl6ByHl5Id(hl5Id, true);
    var total_budget = 0;
    var remaining_budget = 0;
    var allHl6 = [];
    if (hl6List.length) {
        hl6List.forEach(function(hl6){
            var aux = {};
            Object.keys(hl6).forEach(function(key){
                if(key != 'HL5_PATH') {
                    aux[key] = hl6[key];
                } else {
                    aux.CRM_ID = 'CRM-' + hl6[key] + (hl6.HL6_ACRONYM.length === 1 ? '00'+hl6.HL6_ACRONYM
                        : hl6.HL6_ACRONYM.length === 2 ? '0'+hl6.HL6_ACRONYM
                        : hl6.HL6_ACRONYM);
                }

            });
            allHl6.push(aux);
        });

        total_budget = dataHl6.getHl6TotalBudgetByHl5Id(hl5Id);
        remaining_budget = dataHl6.getHl6RemainingBudgetByHl5Id(hl5Id, total_budget);
    }

    return {
        "results": allHl6,
        "total_budget": total_budget,
        "remaining_budget": remaining_budget
    };

}

function getHl6ById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "hl5Services/handleGet/getHl6ById", L6_MSG_INITIATIVE_NOT_FOUND);
    
    var hl6 = JSON.parse(JSON.stringify(dataHl6.getHl6ById(id)));
    var partner = partnerLib.getPartnerByHl6Id(id);
    var myBudget = dataHl6.getHl6MyBudgetByHl6Id(id);
    var sale = dataHl6.getHl6SalesByHl6Id(id);
    var currencyValueAux = dataEuroConversion.getEuroConversionValueById(hl6.EURO_CONVERSION_ID);

    hl6.BUDGET = (Number(hl6.BUDGET) * Number(currencyValueAux)).toFixed(2);

    var result = {
        "hl6": hl6,
        "expectedOutcomes": expectedOutcomesLib.getExpectedOutcomesByHl6Id(id),
        "partner": partner,
        "myBudget": myBudget,
        "sale": sale
    };
    return serverToUiParser(result);
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserById", L6_MSG_USER_NOT_FOUND);
    return dbUser.getUserById(id);

}

function getLevel6ForSearch() {
    var result = dataHl6.getLevel6ForSearch();
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

function insertHl6(data, userId) {
    var hl6_id = 0;
    var pathHl6 = '';
     data = uiToServerParser(data);
    data.hl6.HL6_STATUS_DETAIL_ID = validateHl6(data);

    if (data.hl6.HL6_STATUS_DETAIL_ID > 0) {

        // todo: set correct data
        data.hl6.MARKETING_PROGRAM_ID = null;
        data.hl6.MARKETING_ACTIVITY_ID = null;
        data.hl6.SHOW_ON_DG_CALENDAR = null;
        data.hl6.BUSINESS_OWNER_ID = null;
        data.hl6.EMPLOYEE_RESPONSIBLE_ID = data.hl6.EMPLOYEE_RESPONSIBLE_ID || null;
        data.hl6.COST_CENTER_ID = data.hl6.COST_CENTER_ID || null;

        var conversionValue = dataEuroConversion.getEuroConversionValueById(data.hl6.EURO_CONVERSION_ID);
        
        data.hl6.IN_BUDGET = checkBudgetStatus(data.hl6.HL5_ID, hl6_id, Number(data.hl6.BUDGET) / conversionValue);
        
        data.hl6.BUDGET_SPEND_Q1 = Number(data.hl6.BUDGET_SPEND_Q1);
        data.hl6.BUDGET_SPEND_Q2 = Number(data.hl6.BUDGET_SPEND_Q2);
        data.hl6.BUDGET_SPEND_Q3 = Number(data.hl6.BUDGET_SPEND_Q3);
        data.hl6.BUDGET_SPEND_Q4 = Number(data.hl6.BUDGET_SPEND_Q4);
        data.hl6.BUDGET = Number(data.hl6.BUDGET) / conversionValue;
        data.hl6.CREATED_USER_ID = userId;
                
        hl6_id = dataHl6.insertHl6(data.hl6.HL6_CRM_DESCRIPTION,
            data.hl6.BUDGET,
            data.hl6.HL5_ID,
            data.hl6.ROUTE_TO_MARKET_ID,
            data.hl6.CAMPAIGN_OBJECTIVE_ID,
            data.hl6.CAMPAIGN_TYPE_ID,
            data.hl6.CAMPAIGN_SUBTYPE_ID,
            data.hl6.MARKETING_PROGRAM_ID,//
            data.hl6.MARKETING_ACTIVITY_ID,//
            data.hl6.ACTUAL_START_DATE,
            data.hl6.ACTUAL_END_DATE,
            data.hl6.SHOW_ON_DG_CALENDAR,//
            data.hl6.BUSINESS_OWNER_ID,//
            data.hl6.EMPLOYEE_RESPONSIBLE_ID,//for now just save cost_center_id
            data.hl6.COST_CENTER_ID,
            data.hl6.IN_BUDGET,
            data.hl6.BUDGET_SPEND_Q1,
            data.hl6.BUDGET_SPEND_Q2,
            data.hl6.BUDGET_SPEND_Q3,
            data.hl6.BUDGET_SPEND_Q4,
            data.hl6.EURO_CONVERSION_ID,
            data.hl6.HL6_STATUS_DETAIL_ID,
            data.hl6.SALES_ORGANIZATION_ID, //MARKETING ORGANIZATION
            data.hl6.CREATED_USER_ID);
        
        if (hl6_id > 0) {
            data.hl6.HL6_ID = hl6_id;
            if (data.hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.LOAD_DATA_ENTRY ||
                data.hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.UPDATE_IN_CRM) {
                insertHl6CRMBinding(data, 'insert');

            }

            setHl6Status(hl6_id, data.hl6.HL6_STATUS_DETAIL_ID, userId);

            //insert Budget
            insertBudget(data);

            //insert Sales
            insertSales(data, conversionValue);

            //insert expected outcomes
            insertExpectedOutcomes(data);

            //insert insertPartners
            insertPartners(data);
            
            var pathHl5 = dataPath.getPathByLevelParent(6,data.hl6.HL5_ID)[0].PATH_TPH;
            var hl6Acronym = dataHl6.getHl6ById(hl6_id).ACRONYM;
            hl6Acronym = hl6Acronym.length <= 1 ? '0' + hl6Acronym : hl6Acronym;
            pathHl6 = 'CRM-' + pathHl5 + '-' + hl6Acronym;
        }
        
        return pathHl6;
    }
}

function insertExpectedOutcomes(data) {
    if (data.hl6_expected_outcomes && data.hl6_expected_outcomes.hl6_expected_outcomes_detail.length) {
        var outcome = {};
        outcome.CREATED_USER_ID = data.hl6.CREATED_USER_ID;
        outcome.HL6_ID = data.hl6.HL6_ID;
        outcome.COMMENTS = data.hl6_expected_outcomes.COMMENTS || "";
        var hl6_expected_outcomes_id = dataExOut.insertHl6ExpectedOutcomes(outcome.HL6_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);
        data.hl6_expected_outcomes.hl6_expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
            expectedOutcomeDetail.CREATED_USER_ID = userId;
            expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID = hl6_expected_outcomes_id;
            expectedOutcomeDetail.VOLUME_VALUE = Number(expectedOutcomeDetail.VOLUME_VALUE);
            dataExOut.insertHl6ExpectedOutcomesDetail(expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID, expectedOutcomeDetail.OUTCOMES_ID, expectedOutcomeDetail.EURO_VALUE, expectedOutcomeDetail.VOLUME_VALUE, expectedOutcomeDetail.CREATED_USER_ID || data.hl6.USER_ID);
        });
    }
}

function insertBudget(data) {
    if (data.hl6_budget) {
        data.hl6_budget.forEach(function (myBudget) {
            myBudget.HL6_ID = data.hl6.HL6_ID;
            myBudget.CREATED_USER_ID =  data.hl6.CREATED_USER_ID;
            dataHl6.insertHl6Budget(myBudget.HL6_ID, myBudget.ORGANIZATION_ID, myBudget.PERCENTAGE, ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE], myBudget.CREATED_USER_ID || data.hl6.USER_ID);
        });
    }
}

function insertSales(data, conversionValue) {
    if (data.hl6_sale) {
        data.hl6_sale.forEach(function (sale) {
            sale.HL6_ID = data.hl6.HL6_ID;
            sale.CREATED_USER_ID = data.hl6.CREATED_USER_ID;
            sale.AMOUNT = Number(sale.AMOUNT) / conversionValue;
            sale.DESCRIPTION = ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION : null;
            sale.ORGANIZATION_ID = ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] !== 3 ? sale.ORGANIZATION_ID : null;
            var saleId = dataHl6.insertHl6Sale(sale.HL6_ID, sale.ORGANIZATION_ID, sale.AMOUNT, ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE], sale.DESCRIPTION, sale.CREATED_USER_ID || data.hl6.USER_ID);

        });
    }
}

function insertPartners(data) {
    data.partners.forEach(function (partner) {
        partner.CREATED_USER_ID = data.hl6.CREATED_USER_ID;
        partner.HL6_ID = data.hl6.HL6_ID;
        dataPartner.insertHl6Partner(partner.HL6_ID, partner.NAME, partner.PARTNER_TYPE_ID, partner.REGION_ID, partner.VALUE, partner.CREATED_USER_ID || data.hl6.USER_ID);
    });
}

function updateHl6(data, userId) {
    data = uiToServerParser(data);

    if (!data.hl6.HL6_ID)
        throw ErrorLib.getErrors().CustomError("",
            "hl6Services/handlePost/updatehl6",
            L6_MSG_INITIATIVE_NOT_FOUND);

    if (!util.validateIsNumber(data.hl6.HL6_ID))
        throw ErrorLib.getErrors().CustomError("",
            "hl6Services/handlePost/updatehl6",
            L6_MSG_INITIATIVE_NOT_FOUND);

    if (!userId)
        throw ErrorLib.getErrors().CustomError("",
            "hl6Services/handlePost/updatehl6", L6_MSG_USER_NOT_FOUND);
        data.hl6.HL6_STATUS_DETAIL_ID = validateHl6(data);
        
        if (data.hl6.HL6_STATUS_DETAIL_ID > 0) {
        	// todo: set correct data
            data.hl6.MARKETING_PROGRAM_ID = null;
            data.hl6.MARKETING_ACTIVITY_ID = null;
            data.hl6.SHOW_ON_DG_CALENDAR = null;
            data.hl6.BUSINESS_OWNER_ID = null;
            data.hl6.EMPLOYEE_RESPONSIBLE_ID = data.hl6.EMPLOYEE_RESPONSIBLE_ID || null;
            data.hl6.COST_CENTER_ID = data.hl6.COST_CENTER_ID || null;
            
            var conversionValue = dataEuroConversion.getEuroConversionValueById(data.hl6.EURO_CONVERSION_ID);

            data.hl6.IN_BUDGET = checkBudgetStatus(data.hl6.HL5_ID, data.hl6.HL6_ID, Number(data.hl6.BUDGET) / conversionValue);
            
            data.hl6.BUDGET_SPEND_Q1 = Number(data.hl6.BUDGET_SPEND_Q1);
            data.hl6.BUDGET_SPEND_Q2 = Number(data.hl6.BUDGET_SPEND_Q2);
            data.hl6.BUDGET_SPEND_Q3 = Number(data.hl6.BUDGET_SPEND_Q3);
            data.hl6.BUDGET_SPEND_Q4 = Number(data.hl6.BUDGET_SPEND_Q4);
            data.hl6.BUDGET = Number(data.hl6.BUDGET) / conversionValue;
            data.hl6.USER_ID = userId;

            // todo: set correct data
            
            if (data.hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.LOAD_DATA_ENTRY || data.hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.UPDATE_IN_CRM) {
                insertHl6CRMBinding(data, 'update');
            };
            
            dataHl6.updateHl6(
                    data.hl6.HL6_ID,
                    data.hl6.HL6_CRM_DESCRIPTION,
                    data.hl6.BUDGET,
                    data.hl6.ROUTE_TO_MARKET_ID,
                    data.hl6.CAMPAIGN_OBJECTIVE_ID,
                    data.hl6.CAMPAIGN_TYPE_ID,
                    data.hl6.CAMPAIGN_SUBTYPE_ID,
                    data.hl6.MARKETING_PROGRAM_ID,
                    data.hl6.MARKETING_ACTIVITY_ID,
                    data.hl6.ACTUAL_START_DATE,
                    data.hl6.ACTUAL_END_DATE,
                    data.hl6.SHOW_ON_DG_CALENDAR,
                    data.hl6.BUSINESS_OWNER_ID,
                    data.hl6.EMPLOYEE_RESPONSIBLE_ID,
                    data.hl6.COST_CENTER_ID,
                    data.hl6.IN_BUDGET,
                    data.hl6.BUDGET_SPEND_Q1,
                    data.hl6.BUDGET_SPEND_Q2,
                    data.hl6.BUDGET_SPEND_Q3,
                    data.hl6.BUDGET_SPEND_Q4,
                    data.hl6.EURO_CONVERSION_ID,
                    data.hl6.HL6_STATUS_DETAIL_ID,
                    data.hl6.SALES_ORGANIZATION_ID,
                    data.hl6.USER_ID);

            setHl6Status(data.hl6.HL6_ID, data.hl6.HL6_STATUS_DETAIL_ID, userId);

            updateBudget(data, conversionValue);

            updateSales(data, conversionValue);

            updateExpectedOutcomes(data, conversionValue);

            updatePartners(data, conversionValue);

            return data;
        }
}

function updateExpectedOutcomes(data, conversionValue) {
    dataExOut.deleteHl6ExpectedOutcomesDetail(data.hl6.HL6_ID, data.hl6.USER_ID);
    dataExOut.deleteHl6ExpectedOutcomes(data.hl6.HL6_ID, data.hl6.USER_ID);
    insertExpectedOutcomes(data, conversionValue);
}

function updateBudget(data, conversionValue) {
    dataHl6.delHl6BudgetHard(data.hl6.HL6_ID, data.hl6.USER_ID);
    insertBudget(data, conversionValue);
}

function updateSales(data, conversionValue) {
    dataHl6.delHl6SaleHard(data.hl6.HL6_ID, data.hl6.USER_ID);
    insertSales(data, conversionValue);
}

function updatePartners(data, conversionValue) {
    dataPartner.deleteHl6Partner(data.hl6.HL6_ID, data.hl6.USER_ID);
    insertPartners(data, conversionValue);
}

function deleteHl6(hl6, userId, rollBack) {
    hl6.HL6_ID = hl6.in_hl6_id;
    if (!hl6.HL6_ID && !rollBack)
        throw ErrorLib.getErrors().CustomError("",
                "hl6Services/handlePost/deletehl6",
                L6_MSG_INITIATIVE_NOT_FOUND);

    if (!rollBack && !util.validateIsNumber(hl6.HL6_ID))
        throw ErrorLib.getErrors().CustomError("",
                "hl6Services/handlePost/deletehl6",
                L6_MSG_INITIATIVE_NOT_FOUND);

    var userRoleId = Number(dbUserRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    if (!rollBack && userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("",
                "hl6Services/handlePost/deletehl6", L6_MSG_NO_PRIVILEGE);

    var hl6StatusId = !rollBack ? Number(dataHl6.getHl6StatusByHl6Id(hl6.HL6_ID).HL6_STATUS_DETAIL_ID) : 0;
    if (!rollBack
            && userRoleId !== 1
            && (hl6StatusId !== HL6_STATUS.IN_CRM && hl6StatusId !== HL6_STATUS.UPDATE_IN_CRM))
        throw ErrorLib.getErrors().CustomError("",
                "hl6Services/handlePost/deletehl6",
                L6_MSG_CANNOT_DEL_STATUS);

    hl6.USER_ID = userId;
    dataPartner.deleteHl6Partner(hl6.HL6_ID, hl6.USER_ID);
    dataExOut.deleteHl6ExpectedOutcomesDetail(hl6.HL6_ID, hl6.USER_ID);
    dataExOut.deleteHl6ExpectedOutcomes(hl6.HL6_ID, hl6.USER_ID);
    level6DER.deleteL6ChangedFieldsByHl6Id(hl6.HL6_ID, hl6.USER_ID);
    dataHl6.delHl6Budget(hl6.HL6_ID, hl6.USER_ID);
    dataHl6.delHl6Sale(hl6.HL6_ID, hl6.USER_ID);
    dataHl6.delHl6(hl6.HL6_ID, hl6.USER_ID);

    return hl6;
}

function validateHl6(data) {
    var existInCrm = 0;
    if (!data)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_NOT_FOUND);

    if (!data.hl6.HL6_CRM_DESCRIPTION)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CRM_DESCRIPTION);

    if (data.hl6.BUDGET < 0)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_VALUE);

    if(!data.hl6.ROUTE_TO_MARKET_ID || !Number(data.hl6.ROUTE_TO_MARKET_ID) || !dataRTM.getRouteToMarketById(data.hl6.ROUTE_TO_MARKET_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ROUTE_TO_MARKET);

    if(!data.hl6.CAMPAIGN_OBJECTIVE_ID || !Number(data.hl6.CAMPAIGN_OBJECTIVE_ID) || !dataObj.getObjectiveById(data.hl6.CAMPAIGN_OBJECTIVE_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_OBJECTIVE);

    if(!data.hl6.CAMPAIGN_TYPE_ID || !Number(data.hl6.CAMPAIGN_TYPE_ID) || ! dataCT.getCampaignTypeById(data.hl6.CAMPAIGN_TYPE_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_TYPE);    
    
    if(!data.hl6.CAMPAIGN_SUBTYPE_ID || !Number(data.hl6.CAMPAIGN_SUBTYPE_ID) || !dataCST.getCampaignSubTypeById(data.hl6.CAMPAIGN_SUBTYPE_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_SUBTYPE);

    if(!data.hl6.ACTUAL_START_DATE /*|| !isNaN((new Date(data.hl6.ACTUAL_START_DATE)).getDate())*/)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ACTUAL_START_DATE);

    if(!data.hl6.ACTUAL_END_DATE /*|| !isNaN((new Date(data.hl6.ACTUAL_END_DATE)).getDate())*/)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ACTUAL_END_DATE);

    if(util.validateDateEndMayorStart((new Date(data.hl6.ACTUAL_START_DATE)),(new Date(data.hl6.ACTUAL_END_DATE))))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6",  L6_MSG_INITIATIVE_INVALID_DATE_RANGE);

    if(!data.hl6.SALES_ORGANIZATION_ID || !Number(data.hl6.SALES_ORGANIZATION_ID) || !dataMO.getMarketingOrganizationById(data.hl6.SALES_ORGANIZATION_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_SALES_ORGANIZATION);


    if (data.hl6.EURO_CONVERSION_ID < 0)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CURRENCY);

    if (!Number(data.hl6.EURO_CONVERSION_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CURRENCY);

    if (!data.hl6.BUDGET_SPEND_Q1 && !data.hl6.BUDGET_SPEND_Q2 && !data.hl6.BUDGET_SPEND_Q3 && !data.hl6.BUDGET_SPEND_Q4)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_SPEND);

    var q1 = Number(data.hl6.BUDGET_SPEND_Q1) || 0;
    var q2 = Number(data.hl6.BUDGET_SPEND_Q2) || 0;
    var q3 = Number(data.hl6.BUDGET_SPEND_Q3) || 0;
    var q4 = Number(data.hl6.BUDGET_SPEND_Q4) || 0;

    var budgetSpend = q1 + q2 + q3 + q4;

    if (budgetSpend < 100)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_SPEND_PERCENT);

    if (!data.hl6_budget)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_MY_BUDGET);

    var myBudgetTotalPercentage = 0;
    var myBudgetComplete = false;

    data.hl6_budget.forEach(function (hl6_budget) {
        if (!hl6_budget.ORGANIZATION_ID || !Number(hl6_budget.ORGANIZATION_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", levelCampaign + " in My Budget " + hl6_budget.ORGANIZATION_ID + " can not be found.");

        myBudgetTotalPercentage = myBudgetTotalPercentage + Number(hl6_budget.PERCENTAGE);
    });

    if (myBudgetTotalPercentage > 100)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_PERCENT);
    if (myBudgetTotalPercentage < 100)
        myBudgetTotalPercentage = 0;

    myBudgetComplete = !!myBudgetTotalPercentage;

    if (data.hl6_sale) {
        data.hl6_sale.forEach(function (sale) {
            if (ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3) {
                if (!sale.DESCRIPTION)
                    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", levelCampaign + " Sales description can not be found.");
            } else {
                if (!sale.ORGANIZATION_ID || !Number(sale.ORGANIZATION_ID))
                    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", levelCampaign + " Sales can not be found.");
            }

            if (!Number(sale.AMOUNT) && sale.AMOUNT != 0)
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", "The " + levelCampaign + " Sales amount (" + sale.in_amount + ") is invalid.");
        });
    }

    if (data.hl6_expected_outcomes && data.hl6_expected_outcomes.hl6_expected_outcomes_detail.length) {
        data.hl6_expected_outcomes.hl6_expected_outcomes_detail.forEach(function (hl6ExpectedOutcomesDetail) {
            if (hl6ExpectedOutcomesDetail.VOLUME_VALUE != 0 && !Number(hl6ExpectedOutcomesDetail.VOLUME_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CAMPAIGN_FORECASTING_KPIS_DETAILS);
            if (!hl6ExpectedOutcomesDetail.EURO_VALUE || !Number(hl6ExpectedOutcomesDetail.EURO_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);
            if (!hl6ExpectedOutcomesDetail.OUTCOMES_ID || !Number(hl6ExpectedOutcomesDetail.OUTCOMES_ID))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);
        });
    }

    if (data.partners && data.partners.length) {
        data.partners.forEach(function (partner) {
            if (!partner.PARTNER_TYPE_ID || !Number(partner.PARTNER_TYPE_ID))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_TYPE_NOT_VALID);
            if (!partner.NAME)
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_NAME_NOT_FOUND);
            if (!partner.REGION_ID || !Number(partner.REGION_ID))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_REGION_NOT_VALID);
            if (!partner.VALUE || !Number(partner.VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_VALUE_NOT_VALID);
        });
    }

    var status = null;
    if (data.hl6.HL6_ID) {

        existInCrm = dataHl6.hl6ExistsInCrm(data.hl6.HL6_ID);
        var objHL6 = dataHl6.getHl6ById(data.hl6.HL6_ID);

        status = !myBudgetComplete ? HL6_STATUS.IN_PROGRESS :
            !existInCrm ? HL6_STATUS.LOAD_DATA_ENTRY :
                crmFieldsHaveChanged(data) ? HL6_STATUS.UPDATE_IN_CRM : HL6_STATUS.IN_CRM;
    } else {
        status = myBudgetComplete ? HL6_STATUS.LOAD_DATA_ENTRY : HL6_STATUS.IN_PROGRESS;
    }
    return status;
}
function getLevel6ByAcronym(acronym, hl5_id) {
    return dataHl6.getHl6ByAcronym(acronym, hl5_id);
}

function existsHl6(objHl6) {
    var hl6 = getLevel6ByAcronym(objHl6.ACRONYM, objHl6.HL5_ID);
    return !!(hl6 && hl6.HL6_ID && Number(hl6.HL6_ID) !== Number(objHl6.HL6_ID));
}

function checkBudgetStatus(objHl5, hl6_id, new_hl6_budget) {
    if (!hl6_id) hl6_id = 0;
    if (Number(objHl5) && new_hl6_budget) {
        var objHl = {};
        objHl.HL5_ID = objHl5;
        objHl.HL6_ID = hl6_id;
        var hl5 = dataHl5.getHl5ById(objHl.HL5_ID);

        var hl5AllocatedBudget = dataHl5.getHl5AllocatedBudget(objHl.HL5_ID, hl6_id);
        return (Number(hl5.BUDGET) - Number(hl5AllocatedBudget) - Number(new_hl6_budget)) >= 0 ? 1 : 0;
    } else {
        var result = {};
        result.out_result = 0;
        // lists of hl6 changed to send email to client
        result.emailListInBudget = [];
        result.emailListOutBudget = [];
        var resultHl6 = dataHl6.getHl6ByHl5Id(objhl5.HL5_ID);

        if (resultHl6) {
            var total = 0;

            for (var i = 0; i < resultHl6.out_result.length; i++) {
                if (objhl5.BUDGET < total + parseFloat(resultHl6.out_result[i].BUDGET)) {
                    dataHl6.hl6ChangeInOUTBudget(resultHl6.out_result[i].HL6_ID, 0);
                    // store hl6id and users to be send email when register
                    // change to in budget
                    result.emailListOutBudget.push(resultHl6.out_result[i]);
                } else {
                    dataHl6.hl6ChangeInOUTBudget(resultHl6.out_result[i].HL6_ID, 1);
                    total = total + parseFloat(resultHl6.out_result[i].hl6_BUDGET);
                    // store hl6id and users to be send email when register
                    // change to in budget
                    result.emailListInBudget.push(resultHl6.out_result[i]);
                }
            }
            result.out_result = resultHl6.out_result.length;
        }
        return result;
    }
}

/* Function to set HL6 status */
function setHl6Status(hl6_id, status_id, userId) {
    var updateOK = null;
    if (hl6_id && status_id && userId) {
        updateOK = dataHl6.hl6ChangeStatus(hl6_id, status_id, userId);
        updateOK = dataHl6.insertHl6LogStatus(hl6_id, status_id, userId);
        if (HL6_STATUS.IN_CRM == status_id) {
            level6DER.deleteL6ChangedFieldsByHl6Id(hl6_id);
        }
    }
    return updateOK;
};

/* Set hl6 status to In CRM */
function setHl6StatusInCRM(hl6_id, userId) {
    return setHl6Status(hl6_id, HL6_STATUS.IN_CRM, userId);
}

function insertHl6CRMBinding(hl6, action) {
    if (hl6.hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.IN_PROGRESS)
        return 0;

    var crmBindingFields = {
        "hl6": ["ACRONYM",
            "HL6_CRM_DESCRIPTION",
            "ACTUAL_START_DATE",
            "ACTUAL_END_DATE",
            "CAMPAIGN_TYPE_ID",
            "CAMPAIGN_SUBTYPE_ID",
            "CAMPAIGN_OBJECTIVE_ID",
            "ROUTE_TO_MARKET_ID",
            "COST_CENTER_ID",
            "SALES_ORGANIZATION_ID"]
    };

    var deReportDisplayName = {
        "ACRONYM": 'ID',
        "HL6_CRM_DESCRIPTION": 'CRM description',
        "ACTUAL_START_DATE": 'Start date',
        "ACTUAL_END_DATE": 'End date',
        "CAMPAIGN_TYPE_ID": 'Campaign type',
        "CAMPAIGN_SUBTYPE_ID": 'Campaign subtype',
        "CAMPAIGN_OBJECTIVE_ID": 'Campaign objective',
        "ROUTE_TO_MARKET_ID": 'Route to market',
        "COST_CENTER_ID": 'Cost center',
        "SALES_ORGANIZATION_ID": 'Sales organization'
    };

    if (action == 'insert') {
        level6DER.deleteL6ChangedFieldsByHl6Id(hl6.hl6.HL6_ID);
        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
            	dataHl6.insertHl6CRMBinding(hl6.hl6.HL6_ID, field, 1, deReportDisplayName[field], hl6.hl6.CREATED_USER_ID);
            });
        });
        
    } else if (action == 'update') {
        var oldHl6 = dataHl6.getHl6ById(hl6.hl6.HL6_ID);
        var hl6CRMBindingField = null;
        var hasChanged = null;
        var in_hl6_crm_binding_id = null;
            Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                hl6CRMBindingField = null;
                in_hl6_crm_binding_id = null;
                
                hasChanged = field == 'ACTUAL_START_DATE' || field == 'ACTUAL_END_DATE' ? new Date(oldHl6[field]).valueOf() != new Date(hl6[object][field]).valueOf() : oldHl6[field] != hl6[object][field];
                
                if (hl6[object][field] && (hl6.hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.LOAD_DATA_ENTRY || (hl6.hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.UPDATE_IN_CRM && hasChanged))) {
                    hl6CRMBindingField = dataL6DER.getL6ChangedFieldsByHl6IdByField(hl6.hl6.HL6_ID, field)[0];
                    in_hl6_crm_binding_id = !!hl6CRMBindingField ? hl6CRMBindingField.ID : null;
                    if (in_hl6_crm_binding_id) {
                        dataHl6.updateHl6CRMBinding(in_hl6_crm_binding_id, hl6.hl6.HL6_ID, field, 1, deReportDisplayName[field], hl6.hl6.USER_ID);
                    } else {
                        dataHl6.insertHl6CRMBinding(hl6.hl6.HL6_ID, field, 1, deReportDisplayName[field], hl6.hl6.USER_ID);
                    }
                }
            });
        });
    }
}

function crmFieldsHaveChanged(hl6) {
    var crmFieldsHaveChanged = false;
    var crmBindingFields = {
        "hl6": ["ACRONYM",
            "HL6_CRM_DESCRIPTION",
            "ACTUAL_START_DATE",
            "ACTUAL_END_DATE",
            "CAMPAIGN_TYPE_ID",
            "CAMPAIGN_SUBTYPE_ID",
            "CAMPAIGN_OBJECTIVE_ID",
            "ROUTE_TO_MARKET_ID",
            "COST_CENTER_ID",
            "SALES_ORGANIZATION_ID"]
    };
    var oldHl6 = dataHl6.getHl6ById(hl6.hl6.HL6_ID);
    Object.keys(crmBindingFields).forEach(function (object) {
        crmBindingFields[object].forEach(function (field) {
            if (oldHl6[field] != hl6[object][field]) {
                crmFieldsHaveChanged = true;
            }
        });
    });
    return crmFieldsHaveChanged;
}

function sendProcessingReportEmail(hl6Id) {
    var appUrl = config.getAppUrl();
    var hl6 = dataHl6.getHl6ById(hl6Id);
    //var hl5 = dataHl5.getHl5ById(hl6.HL5_ID);
    var hl6OwnerEmail = getUserById(hl6.CREATED_USER_ID).EMAIL;
    throw JSON.stringify(hl6OwnerEmail);
    var body = '<p> Dear Colleague </p>';
    body += '<p>An initiative has been created in CRM.</p><br>';
    body += '<p>' + appUrl + '/TeamPlanHierarchy/Level5/edit/' + hl6.HL5_ID
        + '/' + hl6Id + '</p>';

    var mailObject = mail.getJson([{
        "address": hl6OwnerEmail
    }], "Marketing Planning Tool - Interlock Process", body);

    mail.sendMail(mailObject, true);
}

var map = {
    "in_hl6_id": "HL6_ID",
    "in_sales_organization_id": "SALES_ORGANIZATION_ID",   
    "in_objective_id": "OBJECTIVE_ID",
    "in_hl6_crm_description": "HL6_CRM_DESCRIPTION",
    "in_hl5_id": "HL5_ID",
    "in_route_to_market_id": "ROUTE_TO_MARKET_ID",
    "in_campaign_objective_id": "CAMPAIGN_OBJECTIVE_ID",
    "in_campaign_type_id": "CAMPAIGN_TYPE_ID",
    "in_campaign_subtype_id": "CAMPAIGN_SUBTYPE_ID",
    "in_marketing_program_id": "MARKETING_PROGRAM_ID",
    "in_marketing_activity_id": "MARKETING_ACTIVITY_ID",
    "in_actual_start_date": "ACTUAL_START_DATE",
    "in_actual_end_date": "ACTUAL_END_DATE",
    "in_show_on_dg_calendar": "SHOW_ON_DG_CALENDAR",
    "in_business_owner_id": "BUSINESS_OWNER_ID",
    "in_employee_responsible_id": "EMPLOYEE_RESPONSIBLE_ID",
    "in_cost_center_id": "COST_CENTER_ID",
    "in_hl6_fnc_budget_spend_q1": "BUDGET_SPEND_Q1",
    "in_hl6_fnc_budget_spend_q2": "BUDGET_SPEND_Q2",
    "in_hl6_fnc_budget_spend_q3": "BUDGET_SPEND_Q3",
    "in_hl6_fnc_budget_spend_q4": "BUDGET_SPEND_Q4",
    "in_euro_conversion_id": "EURO_CONVERSION_ID",
    "in_hl6_fnc_budget_total_mkt": "BUDGET",
    "in_region_id": "ORGANIZATION_ID",
    "in_route_id": "ORGANIZATION_ID",
    "in_percentage": "PERCENTAGE",
    "in_amount": "AMOUNT",
    "in_description": "DESCRIPTION",
    "in_partner_name": "NAME",
    "in_partner_type_id": "PARTNER_TYPE_ID",
    "in_value": "VALUE",
    "in_budget": "BUDGET"
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

    data.hl6_budget = data.hl6_budget.regions.concat(data.hl6_budget.routes);
    data.hl6_sale = data.hl6_sale.regions.concat(data.hl6_sale.routes.concat(data.hl6_sale.others));
    data.hl6.BUDGET_SPEND_Q1 = data.hl6_fnc.BUDGET_SPEND_Q1;
    data.hl6.BUDGET_SPEND_Q2 = data.hl6_fnc.BUDGET_SPEND_Q2;
    data.hl6.BUDGET_SPEND_Q3 = data.hl6_fnc.BUDGET_SPEND_Q3;
    data.hl6.BUDGET_SPEND_Q4 = data.hl6_fnc.BUDGET_SPEND_Q4;
    data.hl6.EURO_CONVERSION_ID = data.hl6_fnc.EURO_CONVERSION_ID;
    data.hl6.BUDGET = data.hl6_fnc.BUDGET;

    data.hl6_fnc = undefined;

    return data;
};

function serverToUiParser(object) {

    var hl6_sale = {
        regions: [],
        globalteams: [],
        others: []
    };
    var hl6_budget = {
        regions: [],
        globalteams: []
    };
    object.myBudget.forEach(function (obj) {
        var aux = {};
        if (obj.ORGANIZATION_TYPE === 1) {
            aux.REGION_ID = obj.ORGANIZATION_ID;
            aux.PERCENTAGE = obj.PERCENTAGE;
            aux.REGION_NAME = obj.ORGANIZATION_NAME;
            hl6_budget.regions.push(aux);
        } else {
            aux.ROUTE_ID = obj.ORGANIZATION_ID;
            aux.PERCENTAGE = obj.PERCENTAGE;
            aux.GLOBAL_TEAM_NAME = obj.ORGANIZATION_NAME;
            hl6_budget.globalteams.push(aux);
        };
    });

    object.sale.forEach(function (obj) {
        var aux = {};
        if (obj.ORGANIZATION_TYPE === 1) {
            aux.REGION_ID = obj.ORGANIZATION_ID;
            aux.AMOUNT = obj.AMOUNT;
            aux.REGION_NAME = obj.ORGANIZATION_NAME;
            hl6_sale.regions.push(aux);
        } else if (obj.ORGANIZATION_TYPE === 2) {
            aux.ROUTE_ID = obj.ORGANIZATION_ID;
            aux.AMOUNT = obj.AMOUNT;
            aux.GLOBAL_TEAM_NAME = obj.ORGANIZATION_NAME;
            hl6_sale.globalteams.push(aux);
        } else {
            aux.DESCRIPTION = obj.DESCRIPTION;
            aux.AMOUNT = obj.AMOUNT;
            hl6_sale.others.push(aux);
        };
    });

    object.sale = hl6_sale;
    object.myBudget = hl6_budget;

    return object;
}