/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataHl6 = mapper.getDataLevel6();
var dataHl5 = mapper.getDataLevel5();
var dataExOut = mapper.getDataExpectedOutcome();
var dataPartner = mapper.getDataPartner();
var partnerLib = mapper.getPartner();
var dataCurrency = mapper.getDataCurrency();
var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var dataPath = mapper.getDataPath();
var pathBL = mapper.getPath();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var level6DER = mapper.getLevel6DEReport();
var dataL6DER = mapper.getDataLevel6Report();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var mail = mapper.getMail();
var businessError = mapper.getLogError();
var config = mapper.getDataConfig();
var dataMO = mapper.getDataMarketingOrganization();
var dataRTM = mapper.getDataRouteToMarket();
var dataCST = mapper.getDataCampaignSubType();
var dataCT = mapper.getDataCampaignType();
var dataObj = mapper.getDataObjectives();
var level5Lib = mapper.getLevel5();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var allocationCategory = mapper.getAllocationCategoryLib();
var blLevel2 = mapper.getLevel2();
var blRegion = mapper.getRegion();
var budgetYear = mapper.getBudgetYear();
var budgetSpendRequest = mapper.getBudgetSpendRequest();
var databudgetSpendRequest = mapper.getDataBudgetSpendRequest();
/** ********************************************** */

var levelCampaign = "Marketing Sub Tactic";
var L6_MSG_INITIATIVE_NOT_FOUND = "The Marketing Sub Tactic can not be found.";
var L6_MSG_ROUTE_TO_MARKET_NULL = "The Route to market is mandatory.";
var L6_MSG_INITIATIVE_CRM_ACRONYM = "The Acronym has been used. The new Acronym is: ";
var L6_MSG_INITIATIVE_CRM_ACRONYM_EXISTS = "The Acronym has been used.";
var L6_MSG_USER_NOT_FOUND = "The User can not be found.";
var L6_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L6_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Marketing Sub Tactic, because the status doesn´t allow it.";
var L6_MSG_INITIATIVE_CRM_DESCRIPTION = "The Marketing Sub Tactic CRM description can not be null or empty.";
var L6_MSG_INITIATIVE_BUDGET_VALUE = "The Marketing Sub Tactic Budget value must be greater than zero.";
var L6_MSG_INITIATIVE_CURRENCY = "The Marketing Sub Tactic Currency can not be found.";
var L6_MSG_INITIATIVE_BUDGET_SPEND = "The Marketing Sub Tactic Budget spend must be set.";
var L6_MSG_INITIATIVE_BUDGET_SPEND_PERCENT = "The Marketing Sub Tactic Budget Spend must be 100%.";
var L6_MSG_INITIATIVE_MY_BUDGET = " The Marketing Sub Tactic in My Budget can not be found.";
var L6_MSG_INITIATIVE_BUDGET_PERCENT = "The Marketing Sub Tactic in My Budget percentage should be less than or equal to 100%.";
var L6_PARTNER_TYPE_NOT_VALID = "Partner type is not valid.";
var L6_PARTNER_NAME_NOT_FOUND = "Partner name can not be found.";
var L6_PARTNER_REGION_NOT_VALID = "Partner region is not valid.";
var L6_PARTNER_VALUE_NOT_VALID = "Partner value is not valid.";
var L6_PARTNER_AMOUNT_NOT_VALID = "Partner amount is not valid.";
var L6_PARTNER_INCOMPLETE_INTEL = "Intel Project ID, Claim ID and Comments must be filled in.";
var L6_PARTNER_INCOMPLETE_EXTERNAL_PARTNER = "Company Name and Company Address must be filled in.";
var L6_MSG_INITIATIVE_ROUTE_TO_MARKET = "The Marketing Sub Tactic route to market cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_OBJECTIVE = "The Marketing Sub Tactic campaign objective cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_TYPE = "The Marketing Sub Tactic campaign type cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_SUBTYPE = "The Marketing Sub Tactic campaign subtype cannot be found.";
var L6_MSG_INITIATIVE_ACTUAL_START_DATE = "The Marketing Sub Tactic actual start date cannot be found.";
var L6_MSG_INITIATIVE_ACTUAL_END_DATE = "The Marketing Sub Tactic actual end date cannot be found.";
var L6_MSG_INITIATIVE_SALES_ORGANIZATION = "The Marketing Sub Tactic sales organization cannot be found.";
var L6_MSG_INITIATIVE_INVALID_DATE_RANGE = "The Actual End Date must be greater than Actual Start Date";
var L6_CAMPAIGN_FORECASTING_KPIS_DETAILS = "Campaign Forecasting / KPIS details amount value is not valid.";
var L6_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO = "Campaign Forecasting / KPIS details euro value is not valid.";
var L6_CAMPAIGN_FORECASTING_KPIS_NOT_VALID = "Campaign Forecasting / KPIS is not valid.";
var L6_MSG_RESULTS_CAMPAIGN = "The Marketing Sub Tactic, Results/Campaign Forecasting must be set.";
var L6_MSG_RESULTS_CAMPAIGN_PERCENT = "The Marketing Sub Tactic, Results/Campaign Forecasting must be 100%.";
var L6_MSG_COULDNT_CHAGE_STATUS = "Couldn´t change Sub tactic/Campaign status due to incomplete data. Please review Budget and Options information";
var L6_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any KPI type.";
var L6_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE = "Once Marketing Sub Tactic is already in CRM, properties CRM ID, Cost Center and Markting Organization cannot be modified.";
var L6_MY_BUDGET_COMPLETE = "My Budget should be 100% complete.";
var L6_CATEGORY_NOT_VALID = "Category is not valid.";
var L6_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L6_CATEGORY_OPTION_NOT_VALID = "Option or User is not valid.";
var L6_CATEGORY_TOTAL_PERCENTAGE = "Category total percentage should be less than or equal to 100%.";
var L6_COST_CENTER_NOT_VALID = "Cost Center cannot be empty.";
var L6_RESPONSIBLE_NOT_VALID = "Employee Responsible cannot be empty.";
var L6_RESPONSIBLE_PERSON_NOT_VALID = "Responsible Person cannot be empty.";
var L6_BUDGET_APPROVER_NOT_VALID = "Budget Approver cannot be empty.";
var L6_PRIORITY_NOT_VALID = "Priority cannot be empty.";
var L6_MSG_COULDNT_CHANGE_STATUS_DUE_PENDING_BUDGET_SPEND_REQUEST = "Couldn´t change 'Marketing Subtactic' status due to Pending Budget Spend requests. Please contact the Budget Approver";


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

var hierarchyLevel = {
    "hl6": 3
};

var PARTNER_TYPE = {
    EXTERNAL_PARTNER: 1,
    MDF: 2,
    INTEL: 3
};

/** ****************END CONSTANTS***************** */

function getHl6ByHl5Id(hl5Id) {
    var hl6List = dataHl6.getHl6ByHl5Id(hl5Id, true);
    var total_budget = 0;
    var remaining_budget = 0;
    var allHl6 = [];
    if (hl6List.length) {
        hl6List.forEach(function (hl6) {
            var aux = {};
            Object.keys(hl6).forEach(function (key) {
                if (key != 'HL5_PATH') {
                    //set view link to CRT
                    if (key === 'CRT_RELATED') {
                        aux.TO_CRT = !!showLinkToCRT(hl6);
                    } else {
                        aux[key] = hl6[key];
                    }
                } else {
                    aux.CRM_ID = 'CRM-' + hl6[key] + (hl6.HL6_ACRONYM.length === 1 ? '00' + hl6.HL6_ACRONYM
                            : hl6.HL6_ACRONYM.length === 2 ? '0' + hl6.HL6_ACRONYM
                                : hl6.HL6_ACRONYM);
                }
            });
            allHl6.push(aux);
        });

        total_budget = dataHl6.getHl6TotalBudgetByHl5Id(hl5Id);
        remaining_budget = dataHl6.getHl6RemainingBudgetByHl5Id(hl5Id, total_budget);
    }

    var response = {
        "results": allHl6,
        "total_budget": total_budget,
        "remaining_budget": remaining_budget
    };
    response.budget_year = budgetYear.getBudgetYearByLevelParent(6, hl5Id, true);
    return response;
}

function showLinkToCRT(hl6) {
    return hl6.STATUS_ID == HL6_STATUS.IN_CRM && hl6.CRT_RELATED;
}

function getHl6CategoryOption(hl6_id) {
    var hl6Categories = dataCategoryOptionLevel.getAllocationCategory(hl6_id, 'hl6');
    var result = [];
    var allocationOptions = util.getAllocationOptionByCategoryAndLevelId('hl6', hl6_id);

    hl6Categories.forEach(function (catgory) {
        var aux = util.extractObject(catgory);
        var hl6Category = {};
        aux["hl6_category_option"] = allocationOptions[aux.CATEGORY_ID];// dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(aux.CATEGORY_ID, 'hl6', hl6_id);
        hl6Category.hl6_category_option = [];
        Object.keys(aux).forEach(function (key) {
            if (key === "hl6_category_option") {
                for (var i = 0; i < aux[key].length; i++) {
                    var option = {};
                    Object.keys(aux[key][i]).forEach(function (auxKey) {
                        option[auxKey] = aux[key][i][auxKey];
                    });
                    hl6Category.hl6_category_option.push(option);
                }
            } else {
                hl6Category[key] = aux[key];
            }
        });
        result.push(hl6Category);
    });
    return result;
}

function getHl6ById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "hl6Services/handleGet/getHl6ById", L6_MSG_INITIATIVE_NOT_FOUND);

    var hl6 = JSON.parse(JSON.stringify(dataHl6.getHl6ById(id)));

    var currencyValueAux = dataCurrency.getCurrencyValueId(hl6.EURO_CONVERSION_ID);
    currencyValueAux = Number(currencyValueAux);

    var partner = partnerLib.getPartnerByHl6Id(id);
    var myBudget = dataHl6.getHl6MyBudgetByHl6Id(id);
    var sale = dataHl6.getHl6SalesByHl6Id(id);
    var saleRequests = databudgetSpendRequest.getHlSalesByHlId(id, 'HL6');

    var saleRequestsFiltered = saleRequests.filter(function (request) {
        return !!Number(request.AMOUNT);
    });

    var totalAmount = 0;

    sale = JSON.parse(JSON.stringify(sale));

    var saleCurrencyValue = (Number(sale[0].CURRENCY_VALUE)).toFixed(2);
    var saleCurrencyId = sale[0].CURRENCY_ID;

    sale.forEach(function (elem) {
        elem.AMOUNT = Number(elem.AMOUNT).toFixed(2);
        totalAmount = totalAmount + Number(elem.AMOUNT);
    });

    var hl6_category = getHl6CategoryOption(id);

    hl6.in_totalbudget = (Number(hl6.BUDGET) + (partner.total ? (partner.total / partner.partnerCurrencyValue) : 0) + Number(totalAmount) / saleCurrencyValue).toFixed(2);
    hl6.IS_IN_CRM = !!dataHl6.hl6ExistsInCrm(id);
    hl6.BUDGET = (Number(hl6.BUDGET) * currencyValueAux).toFixed(2);

    var result = {
        "hl6": hl6,
        "expectedOutcomes": expectedOutcomesLib.getExpectedOutcomesByHl6Id(id),
        "partner": {
            partnerRequests: partner.partners,
            total: partner.total,
            partnerRequestsCurrencyId: partner.partnerCurrencyId,
            totalExternal: partner.totalExternal
        },
        "myBudget": myBudget,
        "sale": {
            saleRequests: sale,
            total: totalAmount,
            saleRequestsCurrencyId: saleCurrencyId,
            salesRequestLoaded: saleRequestsFiltered
        },
        "hl6_category": hl6_category
    };
    return serverToUiParser(result);
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserById", L6_MSG_USER_NOT_FOUND);
    return dbUser.getUserById(id);

}

function getLevel6ForSearch(userSessionID, budget_year_id, region_id, subregion_id, limit, offset) {
    var list = dataHl6.getHl6ForSearch(userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0, budget_year_id, region_id || 0, subregion_id || 0, limit, offset || 0);
    var resultRefactor = [];
    var returnResult = {};
    list.result.forEach(function (object) {
        var aux = {};
        aux.ID = object.ID;
        aux.PARENT_ID = object.PARENT_ID;
        aux.ORGANIZATION_ACRONYM = object.ORGANIZATION_ACRONYM;
        aux.REGION_NAME = object.REGION_NAME;
        aux.SUBREGION_NAME = object.SUBREGION_NAME;
        aux.PATH = "CRM-" + object.PATH;
        resultRefactor.push(aux);
    });

    returnResult.result = resultRefactor;
    returnResult.total_rows = list.total_rows;
    return returnResult;
}

function getHl6ByUserId(userId) {
    var crm = 'CRM-';
    var hl6List = dataHl6.getHl6ByUserId(userId,util.isSuperAdmin(userId) ? 1 : 0);
    var result = {};
    var requestResult = {results: []};

    if (hl6List.length) {
        for (var i = 0; i < hl6List.length; i++) {
            if (!result[hl6List[i].HL5_ID]) {
                result[hl6List[i].HL5_ID] = {
                    PARENT_ID: hl6List[i].HL5_ID
                    , PARENT_PATH: crm + hl6List[i].HL5_PATH
                    , CHILDREN: []
                };
                if (hl6List[i].HL6_ID) {
                    result[hl6List[i].HL5_ID].CHILDREN.push({
                        HL6_ID: hl6List[i].HL6_ID
                        , STATUS_DETAIL: hl6List[i].STATUS_DETAIL
                        , HL6_PATH: crm + hl6List[i].HL5_PATH + hl6List[i].HL6_ACRONYM
                        , CREATED_BY: hl6List[i].CREATED_BY
                        , HL6_BUDGET: hl6List[i].HL6_BUDGET
                        , IMPORTED: hl6List[i].IMPORTED
                        , CRT_RELATED: hl6List[i].CRT_RELATED
                        , CRM_DESCRIPTION: hl6List[i].CRM_DESCRIPTION
                    })
                }
            } else if (hl6List[i].HL6_ID) {
                result[hl6List[i].HL5_ID].CHILDREN.push({
                    HL6_ID: hl6List[i].HL6_ID
                    , STATUS_DETAIL: hl6List[i].STATUS_DETAIL
                    , HL6_PATH: crm + hl6List[i].HL5_PATH + hl6List[i].HL6_ACRONYM
                    , CREATED_BY: hl6List[i].CREATED_BY
                    , HL6_BUDGET: hl6List[i].HL6_BUDGET
                    , IMPORTED: hl6List[i].IMPORTED
                    , CRT_RELATED: hl6List[i].CRT_RELATED
                    , CRM_DESCRIPTION: hl6List[i].CRM_DESCRIPTION
                })
            }
        }
        requestResult.results = util.objectToArray(result);
    }

    return requestResult;
}

function insertHl6(data, userId) {

    var hl6_id = 0;
    var pathHl6 = '';
    data = uiToServerParser(data);

    var validationResult = validateHl6(data, userId);

    var newAcronym = getNewHl6Id(data.hl6.HL5_ID);
    var newAcronymFormated = "00".substr(-1 + (newAcronym + "").length) + (newAcronym + "");
    if (data.hl6.HL5_ID && data.hl6.ACRONYM != newAcronym) {
        var error = ErrorLib.getErrors().Hl6AcronymError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CRM_ACRONYM + newAcronymFormated);
        error.data = newAcronym;
        throw error;
    }

    data.hl6.HL6_STATUS_DETAIL_ID = validationResult.statusId;

    if (data.hl6.HL6_STATUS_DETAIL_ID > 0) {

        var showOnCalendar = data.hl6.SHOW_ON_DG_CALENDAR ? 1 : 0;

        data.hl6.EMPLOYEE_RESPONSIBLE_ID = data.hl6.EMPLOYEE_RESPONSIBLE_ID || null;
        data.hl6.COST_CENTER_ID = data.hl6.COST_CENTER_ID || null;

        var conversionValue = dataCurrency.getCurrencyValueId(data.hl6.EURO_CONVERSION_ID);

        data.hl6.BUDGET = data.hl6.ALLOW_BUDGET_ZERO ? 0 : Number(data.hl6.BUDGET) / conversionValue;

        data.hl6.IN_BUDGET = checkBudgetStatus(data.hl6.HL5_ID, hl6_id, data.hl6.BUDGET);

        data.hl6.BUDGET_SPEND_Q1 = Number(data.hl6.BUDGET_SPEND_Q1);
        data.hl6.BUDGET_SPEND_Q2 = Number(data.hl6.BUDGET_SPEND_Q2);
        data.hl6.BUDGET_SPEND_Q3 = Number(data.hl6.BUDGET_SPEND_Q3);
        data.hl6.BUDGET_SPEND_Q4 = Number(data.hl6.BUDGET_SPEND_Q4);

        data.hl6.CREATED_USER_ID = userId;
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1) : 0;
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2) : 0;
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3) : 0;
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4) : 0;

        hl6_id = dataHl6.insertHl6(data.hl6.HL6_CRM_DESCRIPTION,
            data.hl6.ACRONYM,
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
            showOnCalendar,//
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
            data.hl6.CREATED_USER_ID,
            data.hl6.DISTRIBUTION_CHANNEL_ID,
            data.hl6.VENUE,
            data.hl6.CITY,
            data.hl6.COUNTRY,
            data.hl6.URL,
            data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1,
            data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2,
            data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3,
            data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4,
            data.hl6.PLANNED_START_DATE,
            data.hl6.PLANNED_END_DATE,
            data.hl6.STREET,
            data.hl6.POSTAL_CODE
            , data.hl6.REGION
            , data.hl6.EVENT_OWNER
            , data.hl6.NUMBER_OF_PARTICIPANTS
            , data.hl6.PRIORITY_ID
            , data.hl6.CO_FUNDED
            , data.hl6.ALLOW_BUDGET_ZERO
            , Number(data.hl6.IS_POWER_USER) === 0 ? 0 : 1
        );

        if (hl6_id > 0) {
            data.hl6.HL6_ID = hl6_id;
            budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.hl6.BUDGET, hl6_id, 'HL6', userId, blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(data.hl6.HL5_ID) && data.hl6.IN_BUDGET);

            insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl6_id);

            pathBL.insParentPath('hl6', hl6_id, data.hl6.HL5_ID, userId);


            setHl6Status(hl6_id, data.hl6.HL6_STATUS_DETAIL_ID, userId);

            //insert Budget
            insertBudget(data);

            //insert Sales
            insertSales(data, userId);

            //insert expected outcomes
            insertExpectedOutcomes(data);

            //insert insertPartners
            insertPartners(data, userId);

            var pathHl5 = dataPath.getPathByLevelParent(6, data.hl6.HL5_ID)[0].PATH_TPH;
            var hl6Acronym = data.hl6.ACRONYM;// dataHl6.getHl6ById(hl6_id).ACRONYM;

            hl6Acronym = hl6Acronym.length <= 1 ? '0' + hl6Acronym : hl6Acronym;
            pathHl6 = 'CRM-' + pathHl5 + '-' + hl6Acronym;

            var mapCOL = util.getMapCategoryOption('hl6');
            var categoryOptionBulk = [];
            data.hl6_category.forEach(function (hl6Category) {
                var category = {};
                hl6Category.hl6_category_option.forEach(function (hl6CategoryOption) {
                    hl6CategoryOption.CREATED_USER_ID = userId;
                    hl6CategoryOption.AMOUNT = hl6CategoryOption.AMOUNT || 0;
                    hl6CategoryOption.UPDATED = hl6CategoryOption.AMOUNT ? 1 : 0;
                    hl6Category.categoryOptionLevelId = mapCOL[hl6Category.CATEGORY_ID][hl6CategoryOption.OPTION_ID];
                    categoryOptionBulk.push({
                        in_hl6_id: hl6_id
                        , in_category_option_level_id: hl6Category.categoryOptionLevelId
                        , in_amount: hl6CategoryOption.AMOUNT
                        , in_created_user_id: userId
                        , in_updated: hl6CategoryOption.UPDATED
                    });
                });
            });
            dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl6');
        }

        return pathHl6;
    }
}
function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
}

function validateHl6Upload(data) {


    if (!data.ACRONYM) {
        var error = ErrorLib.getErrors().ImportError("", "level6Lib/validateHl6Upload-data.ACRONYM", L6_MSG_INITIATIVE_NOT_FOUND);
        error.row = valuesToArray(data);
        //error.details = L6_MSG_INITIATIVE_NOT_FOUND;
        throw error;
    }

    if (!data.ROUTE_TO_MARKET_ID) {
        var error = ErrorLib.getErrors().ImportError("", "level6Lib/validateHl6Upload-data.ROUTE_TO_MARKET_ID", L6_MSG_ROUTE_TO_MARKET_NULL);
        error.row = valuesToArray(data);
        //error.details = L6_MSG_INITIATIVE_NOT_FOUND;
        throw error;
    }
    //if (data.hl5.ACRONYM.length !== 4)
    //  throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM_LENGTH);

    if (existsHl6(data)) {
        var error = ErrorLib.getErrors().ImportError("", "level6Lib/validateHl6Upload-existsHl6", L6_MSG_INITIATIVE_CRM_ACRONYM_EXISTS);
        error.row = valuesToArray(data);
        // error.details = L6_MSG_INITIATIVE_CRM_ACRONYM_EXISTS;
        throw error;
    }
    //if (util.validateDateEndMayorStart((new Date(data.hl5.ACTUAL_START_DATE)), (new Date(data.hl5.ACTUAL_END_DATE))))
    //    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L5_MSG_INITIATIVE_INVALID_DATE_RANGE);

    //if (data.hl5.EURO_CONVERSION_ID < 0)
//        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CURRENCY);

    return true;
}

function insertHl6FromUpload(data, userId) {
    var hl6_id = 0;
    if (validateHl6Upload(data)) {

        hl6_id = dataHl6.insertHl6(data.HL6_CRM_DESCRIPTION,
            data.ACRONYM,
            data.BUDGET || 0,
            data.HL5_ID,
            data.ROUTE_TO_MARKET_ID,
            data.CAMPAIGN_OBJECTIVE_ID,
            data.CAMPAIGN_TYPE_ID,
            data.CAMPAIGN_SUBTYPE_ID,
            data.MARKETING_PROGRAM_ID,
            data.MARKETING_ACTIVITY_ID,
            data.ACTUAL_START_DATE,
            data.ACTUAL_END_DATE,
            data.SHOW_ON_DG_CALENDAR,//
            data.BUSINESS_OWNER_ID,//
            data.EMPLOYEE_RESPONSIBLE_ID,//for now just save cost_center_id
            data.COST_CENTER_ID,
            0,
            data.BUDGET_SPEND_Q1 || 0,
            data.BUDGET_SPEND_Q2 || 0,
            data.BUDGET_SPEND_Q3 || 0,
            data.BUDGET_SPEND_Q4 || 0,
            data.EURO_CONVERSION_ID,
            1,//data.HL6_STATUS_DETAIL_ID,
            data.SALES_ORGANIZATION_ID, //MARKETING ORGANIZATION
            data.CREATED_USER_ID,
            data.DISTRIBUTION_CHANNEL_ID,
            data.VENUE,
            data.CITY,
            data.COUNTRY,
            data.URL,
            0//data.RESULTS_CAMPAIGN_Q1,
            , 0//data.RESULTS_CAMPAIGN_Q2,
            , 0//data.RESULTS_CAMPAIGN_Q3,
            , 0//data.RESULTS_CAMPAIGN_Q4,
            , data.PLANNED_START_DATE,
            data.PLANNED_END_DATE,
            data.STREET,
            data.POSTAL_CODE
            , data.REGION
            , data.EVENT_OWNER
            , data.NUMBER_OF_PARTICIPANTS
            , data.PRIORITY_ID || null
            ,0
            ,0
            ,1
            , false
            , 1
            , data.IMPORT_ID
        );


        if (hl6_id) {

            var mapCOL = util.getMapCategoryOption('hl6');

            var categoryOptionBulk = [];
            //insert categories
            data.categories.forEach(function (hl6Category) {
                hl6Category.OPTIONS.forEach(function (hl6CategoryOption) {
                    hl6CategoryOption.CREATED_USER_ID = userId;
                    hl6CategoryOption.AMOUNT = Number(hl6CategoryOption.VALUE) || 0;
                    hl6CategoryOption.UPDATED = Number(hl6CategoryOption.VALUE) ? 1 : 0;
                    hl6Category.categoryOptionLevelId = mapCOL[hl6Category.CATEGORY][hl6CategoryOption.OPTION_ID];
                    categoryOptionBulk.push({
                        //in_hl5_id: hl6_id,
                        in_category_option_level_id: hl6Category.categoryOptionLevelId
                        , in_amount: hl6CategoryOption.AMOUNT
                        , in_user_id: userId
                        , in_updated: hl6CategoryOption.UPDATED
                    });
                });
            });
            dataCategoryOptionLevel.updateCategoryOption(categoryOptionBulk, 'hl6');
            var outcome = {};
            outcome.CREATED_USER_ID = userId;
            outcome.HL6_ID = hl6_id;
            outcome.COMMENTS = data.COMMENTS || "";
            var hl6_expected_outcomes_id = dataExOut.insertHl6ExpectedOutcomes(outcome.HL6_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);
            data.expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
                expectedOutcomeDetail.CREATED_USER_ID = userId;
                expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID = hl6_expected_outcomes_id;
                expectedOutcomeDetail.VOLUME_VALUE = Number(expectedOutcomeDetail.VOLUME_VALUE);
                expectedOutcomeDetail.EURO_VALUE = Number(expectedOutcomeDetail.EURO_VALUE);
                var expectedoutcomelevelid = expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID;//dataExOut.getExpectedOutcomeLevelByLevelAndOptionId('hl6', expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID).EXPECTED_OUTCOME_LEVEL_ID;
                dataExOut.insertHl6ExpectedOutcomesDetail(expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID, expectedoutcomelevelid, expectedOutcomeDetail.EURO_VALUE, expectedOutcomeDetail.VOLUME_VALUE, userId);
            });

            //inserts budget regions
            var regions = blRegion.getAllRegions();
            var centralTeams = blLevel2.getAllCentralTeam(0);

            regions.forEach(function (myBudget) {
                myBudget.HL6_ID = hl6_id;
                dataHl6.insertHl6BudgetSalesUpload(myBudget.HL6_ID, myBudget.REGION_ID, 0, ORGANIZATION_TYPE["REGIONAL"], "", userId, data.EURO_CONVERSION_ID);
            });

            centralTeams.forEach(function (sale) {
                sale.HL6_ID = hl6_id;
                dataHl6.insertHl6BudgetSalesUpload(sale.HL6_ID, sale.HL2_ID, 0, ORGANIZATION_TYPE["CENTRAL"], "", userId, data.EURO_CONVERSION_ID);
            });
            //insert sale other data

            dataHl6.insertHl6Sale([{
                in_hl6_id: hl6_id,
                in_organization_id: null,
                in_amount: 0,
                in_organization_type: ORGANIZATION_TYPE["OTHER"],
                in_description: "Other",
                in_currency_id: data.EURO_CONVERSION_ID,
                in_created_user_id: userId
            }]);
            /***********************************/

        }
    }
    return hl6_id;
}

function insertExpectedOutcomes(data) {
    var outcome = {};
    outcome.CREATED_USER_ID = data.hl6.CREATED_USER_ID;
    outcome.HL6_ID = data.hl6.HL6_ID;
    outcome.COMMENTS = data.hl6_expected_outcomes.COMMENTS || "";
    var hl6_expected_outcomes_id = dataExOut.insertHl6ExpectedOutcomes(outcome.HL6_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);

    if (data.hl6_expected_outcomes.hl6_expected_outcomes_detail.length) {
        data.hl6_expected_outcomes.hl6_expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
            expectedOutcomeDetail.CREATED_USER_ID = data.hl6.CREATED_USER_ID;
            expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID = hl6_expected_outcomes_id;
            expectedOutcomeDetail.VOLUME_VALUE = Number(expectedOutcomeDetail.VOLUME_VALUE);
            expectedOutcomeDetail.in_outcomes_id = dataExOut.getExpectedOutcomeLevelByLevelAndOptionId('HL6', expectedOutcomeDetail.OUTCOMES_ID).EXPECTED_OUTCOME_LEVEL_ID;
            dataExOut.insertHl6ExpectedOutcomesDetail(expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID, expectedOutcomeDetail.in_outcomes_id, expectedOutcomeDetail.EURO_VALUE, expectedOutcomeDetail.VOLUME_VALUE, expectedOutcomeDetail.CREATED_USER_ID || data.hl6.USER_ID);
        });
    }
}

function insertBudget(data) {
    if (data.hl6_budget) {
        var data_budget = [];
        data.hl6_budget.forEach(function (myBudget) {
            data_budget.push({
                in_hl6_id: data.hl6.HL6_ID,
                in_organization_id: myBudget.ORGANIZATION_ID,
                in_percentage: myBudget.PERCENTAGE,
                in_organization_type: ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE],
                in_created_user_id: data.hl6.CREATED_USER_ID || data.hl6.USER_ID
            });
        });
        dataHl6.insertHl6Budget(data_budget);
    }
}

function insertSales(data, userId) {
    var aux = {};
    if (data.hl6_sale && data.hl6_sale.length) {
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
        var arrSaleHl6 = [];

        data.hl6_sale.forEach(function (sale) {
            if (!aux[sale.ORGANIZATION_ID]) {
                arrSaleHl6.push({
                    in_hl6_id: data.hl6.HL6_ID
                    , in_organization_id: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] !== 3 ? sale.ORGANIZATION_ID : null
                    , in_amount: null
                    , in_organization_type: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE]
                    , in_description: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION == '' ? sale.DESCRIPTION : 'OTHER' : null
                    , in_currency_id: data.SALE_CURRENCY_ID
                    , in_created_user_id: userId
                });
                aux[sale.ORGANIZATION_ID] = sale.ORGANIZATION_TYPE;
            }
        });

        if (arrSaleHl6.length)
            dataHl6.insertHl6Sale(arrSaleHl6);

        if (!data.hl6.ALLOW_BUDGET_ZERO && data.hl6.CO_FUNDED && data.saleRequests && data.saleRequests.length)
            budgetSpendRequest.insertSalesBudgetSpendRequest(data.saleRequests, data.hl6.HL6_ID, 'HL6', internalCoFundingCurrency, userId);
    }
}

function insertPartners(data, userId) {
    if (!data.hl6.ALLOW_BUDGET_ZERO && data.hl6.CO_FUNDED && data.partners && data.partners.length) {
        var arrPartner = [];
        var externalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
        data.partners.forEach(function (partner) {
            if(Number(partner.AMOUNT) && partner.MESSAGE) {
                var budgetSpendRequetId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.hl6.HL6_ID, 'HL6', externalCoFundingCurrency, userId);
                arrPartner.push({
                    in_hl6_id: data.hl6.HL6_ID
                    ,in_partner_name: null
                    ,in_partner_type_id: partner.PARTNER_TYPE_ID
                    ,in_region_id: null
                    ,in_value: null
                    ,in_created_user_id: userId
                    ,in_budget_spend_request: budgetSpendRequetId
                    ,in_currency_id: data.PARTNER_CURRENCY_ID
                    ,in_intel_project_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.INTEL_PROJECT_ID : null
                    ,in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.CLAIM_ID : null
                    ,in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.COMMENTS : null
                    ,in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_NAME : null
                    ,in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_ADDRESS : null
                    ,in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
                });
            }
        });
        if (arrPartner.length)
            dataPartner.insertHl6Partner(arrPartner);
    }
}

function insertInCrmBinding(crmBindingChangedFields, crmBindingChangedFieldsUpdate, hl6Id) {
    if (hl6Id) {
        for (var i = 0; i < crmBindingChangedFields.length; i++) {
            crmBindingChangedFields[i].in_hl6_id = hl6Id;
        }
        for (var j = 0; j < crmBindingChangedFieldsUpdate.length; j++) {
            crmBindingChangedFieldsUpdate[j].in_hl6_id = hl6Id;
        }
    }

    if (crmBindingChangedFields.length)
        dataHl6.insertHl6CRMBinding(crmBindingChangedFields);

    if (crmBindingChangedFieldsUpdate.length)
        dataHl6.updateHl6CRMBinding(crmBindingChangedFieldsUpdate);
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

    var validationResult = validateHl6(data, userId);
    data.hl6.HL6_STATUS_DETAIL_ID = validationResult.statusId;

    if (data.hl6.HL6_STATUS_DETAIL_ID > 0) {
        // todo: set correct data
        data.hl6.MARKETING_PROGRAM_ID = data.hl6.MARKETING_PROGRAM_ID || null;
        data.hl6.MARKETING_ACTIVITY_ID = data.hl6.MARKETING_ACTIVITY_ID || null;
        data.hl6.SHOW_ON_DG_CALENDAR = data.hl6.SHOW_ON_DG_CALENDAR ? 1 : 0;
        data.hl6.BUSINESS_OWNER_ID = data.hl6.BUSINESS_OWNER_ID || null;
        data.hl6.EMPLOYEE_RESPONSIBLE_ID = data.hl6.EMPLOYEE_RESPONSIBLE_ID || null;
        data.hl6.COST_CENTER_ID = data.hl6.COST_CENTER_ID || null;

        var conversionValue = dataCurrency.getCurrencyValueId(data.hl6.EURO_CONVERSION_ID);
        data.hl6.BUDGET = data.hl6.ALLOW_BUDGET_ZERO ? 0 : Number(data.hl6.BUDGET) / conversionValue;
        data.hl6.IN_BUDGET = checkBudgetStatus(data.hl6.HL5_ID, data.hl6.HL6_ID,data.hl6.BUDGET);

        data.hl6.BUDGET_SPEND_Q1 = Number(data.hl6.BUDGET_SPEND_Q1);
        data.hl6.BUDGET_SPEND_Q2 = Number(data.hl6.BUDGET_SPEND_Q2);
        data.hl6.BUDGET_SPEND_Q3 = Number(data.hl6.BUDGET_SPEND_Q3);
        data.hl6.BUDGET_SPEND_Q4 = Number(data.hl6.BUDGET_SPEND_Q4);
        data.hl6.USER_ID = userId;
        data.hl6.CREATED_USER_ID = userId;

        //TODO: delete verification before set validation
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1) : 0;
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2) : 0;
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3) : 0;
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4) : 0;

        // todo: set correct data

        var objHL6 = dataHl6.getHl6ById(data.hl6.HL6_ID);
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
            data.hl6.CREATED_USER_ID,
            data.hl6.DISTRIBUTION_CHANNEL_ID,
            data.hl6.VENUE,
            data.hl6.CITY,
            data.hl6.COUNTRY,
            data.hl6.URL,
            data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1,
            data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2,
            data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3,
            data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4,
            data.hl6.PLANNED_START_DATE,
            data.hl6.PLANNED_END_DATE,
            data.hl6.STREET,
            data.hl6.POSTAL_CODE
            , data.hl6.REGION
            , data.hl6.EVENT_OWNER
            , data.hl6.NUMBER_OF_PARTICIPANTS
            , data.hl6.PRIORITY_ID
            , data.hl6.CO_FUNDED
            , data.hl6.ALLOW_BUDGET_ZERO
            , Number(data.hl6.IS_POWER_USER) === 0 ? 0 : 1
        );

        if (objHL6.BUDGET != data.hl6.BUDGET) {
            var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();

            var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(data.hl6.HL6_ID, 'HL6');
            if(ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.PENDING)
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePut/updateHl6", "Cannot update Marketing Subtactic Budget because Own money budget spend request is no longer in Pending Status.");

            budgetSpendRequest.updateOwnMoneyBudgetSpendRequestByHlIdLevel(data.hl6.HL6_ID, 'HL6', data.hl6.BUDGET, blLevel2.getHl2AllowAutomaticBudgetApprovalByHl5Id(data.hl6.HL5_ID) && data.hl6.IN_BUDGET, userId);
        }

        insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, data.hl6.HL6_ID);

        setHl6Status(data.hl6.HL6_ID, data.hl6.HL6_STATUS_DETAIL_ID, userId);

        updateBudget(data/*, conversionValue*/);

        if(!data.hl6.CO_FUNDED || data.hl6.ALLOW_BUDGET_ZERO)
            budgetSpendRequest.setBudgetSpendRequestStatusNoLongerRequested(data.hl6.HL6_ID, 'HL6', userId);

        updateSales(data, conversionValue);

        updateExpectedOutcomes(data/*, conversionValue*/);

        updatePartners(data, conversionValue);

        updateCategoryOptions(data, userId);

        return data;
    }
}

function updateCategoryOptions(data, userId) {
    var mapCOL = util.getMapCategoryOption('hl6');
    var categoryOptionBulk = [];
    data.hl6_category.forEach(function (hl6Category) {

        hl6Category.hl6_category_option.forEach(function (hl6CategoryOption) {
            hl6CategoryOption.AMOUNT = hl6CategoryOption.AMOUNT || 0;
            hl6CategoryOption.UPDATED = hl6CategoryOption.UPDATED || 0;
            hl6Category.CATEGORY_OPTION_LEVEL_ID = mapCOL[hl6Category.CATEGORY_ID][hl6CategoryOption.OPTION_ID];
            categoryOptionBulk.push({
                in_category_option_level_id: hl6Category.CATEGORY_OPTION_LEVEL_ID
                , in_amount: hl6CategoryOption.AMOUNT
                , in_user_id: userId
                , in_updated: hl6CategoryOption.UPDATED || 0
            });
        });
    });
    dataCategoryOptionLevel.updateCategoryOption(categoryOptionBulk, 'hl6');
}

function updateExpectedOutcomes(data/*, conversionValue*/) {
    dataExOut.deleteHl6ExpectedOutcomesDetail(data.hl6.HL6_ID, data.hl6.CREATED_USER_ID);
    dataExOut.deleteHl6ExpectedOutcomes(data.hl6.HL6_ID, data.hl6.CREATED_USER_ID);
    insertExpectedOutcomes(data/*, conversionValue*/);
}

function updateBudget(data/*, conversionValue*/) {
    dataHl6.delHl6BudgetHard(data.hl6.HL6_ID, data.hl6.USER_ID);
    insertBudget(data/*, conversionValue*/);
}

function updateSales(data, userId) {
    if (data.hl6_sale && data.hl6_sale.length) {
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
        var aux = {};
        var arrSaleHl6 = [];
        data.hl6_sale.forEach(function (sale) {
            sale.HL6_SALE_ID = data.hl6.HL6_ID;
            if (aux[sale.ORGANIZATION_ID]) {
                arrSaleHl6.push({
                    in_hl6_sale_id: sale.HL6_SALE_ID
                    ,in_description: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION : null
                    ,in_currency_id: data.SALE_CURRENCY_ID
                    ,in_user_id: userId
                });
                aux[sale.ORGANIZATION_ID] = sale.ORGANIZATION_TYPE;
            }
        });

        if (arrSaleHl6.length)
            dataHl6.updateHl6Sale(arrSaleHl6);

        /**/
        data.saleRequests = JSON.parse(JSON.stringify(data.saleRequests));
        data.saleRequests.forEach(function(sr){
            var idSaleHl6 = findHLSalesId(data.hl6_sale, sr.ORGANIZATION_ID, sr.ORGANIZATION_TYPE);
            sr.HL_SALES_ID = idSaleHl6;
        });

        if(!data.hl6.ALLOW_BUDGET_ZERO && data.hl6.CO_FUNDED && data.saleRequests && data.saleRequests.length)
            budgetSpendRequest.updateSalesBudgetSpendRequest(data.saleRequests, data.hl6.HL6_ID, 'HL6', internalCoFundingCurrency, userId);
    }

    if (data.salesIdsRemoved && data.salesIdsRemoved.length) {
        var saleBudgetSpendRquestToDelete = data.salesIdsRemoved.map(function (id) {
            return {in_budget_spend_request_id: id, in_user_id: userId};
        });
        budgetSpendRequest.deleteBudgetSpendRequestBySale(saleBudgetSpendRquestToDelete, 'HL6');
    }
}

function findHLSalesId(Sales, OrganizationId, OrganizationType){
    var id = null;
    Sales.forEach(function(sale){
        if(sale.ORGANIZATION_ID == OrganizationId && sale.ORGANIZATION_TYPE == OrganizationType){
            id = sale.HL_SALES_ID;
            return;
        }
    });
    return id;
}

function updatePartners(data, userId) {
    if (!data.hl6.ALLOW_BUDGET_ZERO && data.hl6.CO_FUNDED && data.partners && data.partners.length) {
        var arrPartnerToInsert = [];
        var arrPartnerToUpdate = [];
        var budgetSpendRequestToUpdate = [];
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
        data.partners.forEach(function (partner) {
            if (!partner.PARTNER_ID) {
                var budgetSpendRequetId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.hl6.HL6_ID, 'HL6', internalCoFundingCurrency, userId);
                arrPartnerToInsert.push({
                    in_hl6_id: data.hl6.HL6_ID
                    ,in_partner_name: null
                    ,in_partner_type_id: partner.PARTNER_TYPE_ID
                    ,in_region_id: null
                    ,in_value: null
                    ,in_currency_id: data.PARTNER_CURRENCY_ID
                    ,in_created_user_id: userId
                    ,in_budget_spend_request: budgetSpendRequetId
                    ,in_intel_project_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.INTEL_PROJECT_ID : null
                    ,in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.CLAIM_ID : null
                    ,in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.COMMENTS : null
                    ,in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_NAME : null
                    ,in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_ADDRESS : null
                    ,in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
                });
            } else {
                budgetSpendRequestToUpdate.push({
                    in_budget_spend_request_id: partner.BUDGET_SPEND_REQUEST_ID
                    , in_amount: partner.AMOUNT / internalCoFundingCurrency
                    , in_message: partner.MESSAGE
                    , in_user_id: userId
                });

                arrPartnerToUpdate.push({
                    in_partner_id: partner.PARTNER_ID
                    ,in_partner_name: null
                    ,in_partner_type_id: partner.PARTNER_TYPE_ID
                    ,in_region_id: null
                    ,in_value: null
                    ,in_currency_id: data.PARTNER_CURRENCY_ID
                    ,in_created_user_id: userId
                    ,in_intel_project_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.INTEL_PROJECT_ID : null
                    ,in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.CLAIM_ID : null
                    ,in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.COMMENTS : null
                    ,in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_NAME : null
                    ,in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_ADDRESS : null
                    ,in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
                });
            }
        });
        if (arrPartnerToInsert.length)
            dataPartner.insertHl6Partner(arrPartnerToInsert);

        if (arrPartnerToUpdate.length)
            dataPartner.updatePartner(arrPartnerToUpdate, 'HL6');

        if (budgetSpendRequestToUpdate.length)
            budgetSpendRequest.updateBudgetSpendRequest(budgetSpendRequestToUpdate, userId, true);
    }

    if (data.partnersIdsRemoved && data.partnersIdsRemoved.length) {
        var arrPartnerToDelete = data.partnersIdsRemoved.map(function (id) {
            return {in_partner_id: id, in_user_id: userId};
        });

        var pendingPartner = dataPartner.getPendingPartnerByPartnerId(arrPartnerToDelete, 'HL6');

        arrPartnerToDelete = pendingPartner.map(function (elem) {
            return {in_partner_id: elem.PARTNER_ID, in_user_id: userId};
        });

        var arrBudgetSpendRequestToDelete = pendingPartner.map(function (elem) {
            return {in_budget_spend_request_id: elem.BUDGET_SPEND_REQUEST_ID, in_user_id: userId};
        });

        dataPartner.deleteHlPartnerByPartnerId(arrPartnerToDelete, 'HL6');
        budgetSpendRequest.deleteBudgetSpendRequest(arrBudgetSpendRequestToDelete);
    }
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
    dataExOut.deleteHl6ExpectedOutcomesDetail(hl6.HL6_ID, hl6.USER_ID);
    dataExOut.deleteHl6ExpectedOutcomes(hl6.HL6_ID, hl6.USER_ID);
    level6DER.deleteL6ChangedFieldsByHl6Id(hl6.HL6_ID, hl6.USER_ID);
    dataHl6.delHl6Budget(hl6.HL6_ID, hl6.USER_ID);

    //delete HL5_SALE_BUDGET_SPEND_REQUEST
    databudgetSpendRequest.delAllHlSaleBudgetSpendRequestByHlId(hl6.HL6_ID, hl6.USER_ID, 'HL6'); //ready
    dataHl5.deleteHl5Sale(hl6.HL6_ID, hl6.USER_ID);
    //BUDGET_SPEND_REQUEST_LOG_STATUS
    databudgetSpendRequest.delAllBudgetSpendRequestLogStatusByHlId(hl6.HL6_ID, hl6.USER_ID, 'HL6');//ready
    //BUDGET_SPEND_REQUEST_MESSAGE
    databudgetSpendRequest.delAllBudgetSpendRequestMessageByHlId(hl6.HL6_ID, hl6.USER_ID, 'HL6');
    //DEL_ALL_BUDGET_SPEND_REQUEST_BY_HL5_ID
    databudgetSpendRequest.delAllBudgetSpendRequestByHlId(hl6.HL6_ID, hl6.USER_ID, 'HL6');//ready
    dataPath.delParentPath('hl6', hl6.HL6_ID);

    dataPartner.deleteHl6Partner(hl6.HL6_ID, hl6.USER_ID);
    dataHl6.delHl6Sale(hl6.HL6_ID, hl6.USER_ID);
    dataHl6.delHl6(hl6.HL6_ID, hl6.USER_ID);

    return hl6;
}

function validateHl6(data, userId) {
    var existInCrm = 0;
    if (!data)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_NOT_FOUND);

    if (data.hl6.HL6_ID && dataHl6.hl6ExistsInCrm(data.hl6.HL6_ID)) {
        var hl6 = dataHl6.getHl6ById(data.hl6.HL6_ID);
        if (hl6.ACRONYM != data.hl6.ACRONYM
            || hl6.COST_CENTER_ID != data.hl6.COST_CENTER_ID
            || hl6.SALES_ORGANIZATION_ID != data.hl6.SALES_ORGANIZATION_ID)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE);
    }

    if (!data.hl6.HL6_CRM_DESCRIPTION)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CRM_DESCRIPTION);

    if (!data.hl6.ALLOW_BUDGET_ZERO && !Number(data.hl6.BUDGET))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_VALUE);

    if (!data.hl6.ROUTE_TO_MARKET_ID || !Number(data.hl6.ROUTE_TO_MARKET_ID) || !dataRTM.getRouteToMarketById(data.hl6.ROUTE_TO_MARKET_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ROUTE_TO_MARKET);

    if (!data.hl6.CAMPAIGN_OBJECTIVE_ID || !Number(data.hl6.CAMPAIGN_OBJECTIVE_ID) || !dataObj.getObjectiveById(data.hl6.CAMPAIGN_OBJECTIVE_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_OBJECTIVE);

    if (!data.hl6.CAMPAIGN_TYPE_ID || !Number(data.hl6.CAMPAIGN_TYPE_ID) || !dataCT.getCampaignTypeById(data.hl6.CAMPAIGN_TYPE_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_TYPE);

    if (!data.hl6.CAMPAIGN_SUBTYPE_ID || !Number(data.hl6.CAMPAIGN_SUBTYPE_ID) || !dataCST.getCampaignSubTypeById(data.hl6.CAMPAIGN_SUBTYPE_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_SUBTYPE);

    if (!data.hl6.ACTUAL_START_DATE)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ACTUAL_START_DATE);

    if (!data.hl6.ACTUAL_END_DATE)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ACTUAL_END_DATE);

    if (util.validateDateEndMayorStart((new Date(data.hl6.ACTUAL_START_DATE)), (new Date(data.hl6.ACTUAL_END_DATE))))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_INVALID_DATE_RANGE);

    if (data.hl6_sale && data.hl6_sale.length) {
        data.hl6_sale.forEach(function (sale) {
            if (ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3) {
                if (sale.DESCRIPTION != '' && !sale.DESCRIPTION)
                    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", levelCampaign + " Sales description can not be found.");
            } else {
                if (!sale.ORGANIZATION_ID || !Number(sale.ORGANIZATION_ID))
                    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", levelCampaign + " Sales " + key + " can not be found.");
            }
        });
    }

    if (!data.hl6.SALES_ORGANIZATION_ID || !Number(data.hl6.SALES_ORGANIZATION_ID) || !dataMO.getMarketingOrganizationById(data.hl6.SALES_ORGANIZATION_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_SALES_ORGANIZATION);

    if (!data.hl6.COST_CENTER_ID || data.hl6.COST_CENTER_ID < 0)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_COST_CENTER_NOT_VALID);

    if (!data.hl6.EMPLOYEE_RESPONSIBLE_ID || data.hl6.EMPLOYEE_RESPONSIBLE_ID < 0)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_RESPONSIBLE_NOT_VALID);

    if (!data.hl6.PRIORITY_ID || data.hl6.PRIORITY_ID < 0)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L6_PRIORITY_NOT_VALID);

    if (data.hl6.EURO_CONVERSION_ID < 0)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CURRENCY);

    if (!Number(data.hl6.EURO_CONVERSION_ID))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CURRENCY);

    if (!data.hl6.BUDGET_SPEND_Q1 && !data.hl6.BUDGET_SPEND_Q2 && !data.hl6.BUDGET_SPEND_Q3 && !data.hl6.BUDGET_SPEND_Q4)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_SPEND);

    if (!data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1 && !data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2 && !data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3
        && !data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_RESULTS_CAMPAIGN);

    var q1 = Number(data.hl6.BUDGET_SPEND_Q1) || 0;
    var q2 = Number(data.hl6.BUDGET_SPEND_Q2) || 0;
    var q3 = Number(data.hl6.BUDGET_SPEND_Q3) || 0;
    var q4 = Number(data.hl6.BUDGET_SPEND_Q4) || 0;

    var budgetSpend = q1 + q2 + q3 + q4;

    if (budgetSpend < 100)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_SPEND_PERCENT);

    if (!data.hl6_budget)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_MY_BUDGET);


    var myBudgetComplete = isMyBudgetComplete(data.hl6_budget);

    //RESULTS CAMPAIGN validations
    var rq1 = Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1) || 0;
    var rq2 = Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2) || 0;
    var rq3 = Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3) || 0;
    var rq4 = Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4) || 0;

    var resultsCampaign = rq1 + rq2 + rq3 + rq4;

    if (resultsCampaign < 100)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_RESULTS_CAMPAIGN_PERCENT);

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

    if (data.hl6_expected_outcomes) {
        if (!data.hl6_expected_outcomes.hl6_expected_outcomes_detail.length && !data.hl6_expected_outcomes.COMMENTS)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CAMPAIGN_FORECASTING_KPIS_COMMENT);

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

            if (!partner.AMOUNT || !Number(partner.AMOUNT))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_AMOUNT_NOT_VALID);

            if (PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID && (!partner.INTEL_PROJECT_ID || !partner.CLAIM_ID || !partner.COMMENTS))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_INCOMPLETE_INTEL);

            if (PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && (!partner.COMPANY_NAME || !partner.COMPANY_ADDRESS))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_INCOMPLETE_EXTERNAL_PARTNER);
        });
    }

    var categoryOptionComplete = isCategoryOptionComplete(data);

    //var hasDeReportFields = dataL6DER.getL6ChangedFieldsByHl6Id(data.hl6.HL6_ID);

    var statusId = null;
    var crmFieldsHasChangedResult = crmFieldsHaveChanged(data, data.hl6.ALLOW_BUDGET_ZERO || (categoryOptionComplete && myBudgetComplete), userId);
    var crmFieldsHasChanged = crmFieldsHasChangedResult.crmFieldsHaveChanged;
    if (data.hl6.HL6_ID) {
        if (!data.hl6.ALLOW_BUDGET_ZERO && data.hl6.in_hl6_status_detail_id != HL6_STATUS.IN_PROGRESS && !myBudgetComplete)
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl6", L6_MY_BUDGET_COMPLETE);

        existInCrm = dataHl6.hl6ExistsInCrm(data.hl6.HL6_ID);
        var categoryHasChanged = categoryChanged(data, existInCrm);
        statusId = !crmFieldsHasChanged && !categoryHasChanged && !Number(budgetSpendRequest.countPendingBudgetRequestByHl6Id(data.hl6.HL6_ID)) ? data.hl6.in_hl6_status_detail_id : HL6_STATUS.IN_PROGRESS;
    } else {
        statusId = HL6_STATUS.IN_PROGRESS;
    }
    return {
        statusId: statusId
        , isComplete: categoryOptionComplete && myBudgetComplete
        , crmBindingChangedFields: crmFieldsHasChangedResult.crmBindingChangedFields
        , crmBindingChangedFieldsUpdate: crmFieldsHasChangedResult.crmBindingChangedFieldsUpdate
    };
}
function categoryChanged(data, existInCrm) {
    var optionChange;
    //obtain the CATEGORY options in bd
    var hl6_categoryBD = getHl5CategoryOption(data.hl6.HL6_ID);

    optionChange = compareCategories(data.hl6_category, hl6_categoryBD, existInCrm);
    return optionChange;
}

function getHl5CategoryOption(hl6_id) {
    var hl6Categories = dataCategoryOptionLevel.getAllocationCategory(hl6_id, 'hl6');
    var result = [];
    var allocationOptions = util.getAllocationOptionByCategoryAndLevelId('hl6', hl6_id);

    hl6Categories.forEach(function (catgory) {
        var aux = util.extractObject(catgory);
        var hl6Category = {};
        aux["hl6_category_option"] = allocationOptions[aux.CATEGORY_ID];//dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(aux.CATEGORY_ID, 'hl6', hl6_id);
        hl6Category.hl6_category_option = [];
        Object.keys(aux).forEach(function (key) {
            if (key === "hl6_category_option") {
                for (var i = 0; i < aux[key].length; i++) {
                    var option = {};
                    Object.keys(aux[key][i]).forEach(function (auxKey) {
                        option[auxKey] = aux[key][i][auxKey];
                    });
                    hl6Category.hl6_category_option.push(option);
                }
            } else {
                hl6Category[key] = aux[key];
            }
        });
        result.push(hl6Category);
    });
    return result;
}

function compareCategories(ListCategories1, ListCategories2, existInCrm) {

    var flag = false;
    var actualCategory = util.getCategoryById('hl6');
    for (var i = 0; i < ListCategories1.length; i++) {
        var category = ListCategories1[i];
        //var actualCategory = dataCategory.getCategoryById(category.CATEGORY_ID, 'hl6');
        if (actualCategory[category.CATEGORY_ID].IN_PROCESSING_REPORT)
            flag = CompareCategoryOption(category, category.CATEGORY_ID, ListCategories2, existInCrm) || flag;
    }
    return flag;
}

function CompareCategoryOption(Category1, Category1_id, ListCategories, existInCrm) {
    var Category2 = getCategoryFromList(ListCategories, Category1_id);
    return compareListOptions(Category1.hl6_category_option, Category2.hl6_category_option, existInCrm)
}

function getCategoryFromList(listCategory, categoryId) {
    for (var i = 0; i < listCategory.length; i++) {
        var category = listCategory[i];
        if (category.CATEGORY_ID === categoryId) {
            return category;
        }
    }
    return null;
}

function compareListOptions(ListOption1, ListOption2, existInCrm) {
    var flag = false;
    for (var i = 0; i < ListOption1.length; i++) {
        var option = ListOption1[i];
        flag = compareOptions(option, getOptionFromList(ListOption2, option.OPTION_ID), existInCrm) || flag;
    }
    return flag;
}

function getOptionFromList(listOptions, OptionId) {
    for (var i = 0; i < listOptions.length; i++) {
        var option = listOptions[i];
        if (option.OPTION_ID === OptionId) {
            return option;
        }
    }
    return null;
}

/***************************************/
//Verify if mount of option change
//Option1: option from UI
//Option2: option from DB
function compareOptions(Option1, Option2, existInCrm) {
    var hasChanged = false;
    if (Number(Option1.AMOUNT) === Number(Option2.AMOUNT)) {
        hasChanged = false;
        Option1.UPDATED = Option2.UPDATED;
    } else {
        Option1.UPDATED = 1;
        hasChanged = true;

        if (Number(Option1.AMOUNT) && Option2.UPDATED) {
            return hasChanged;
        }

        if ((!Number(Option1.AMOUNT) && !Number(Option2.AMOUNT)) ||
            (!Number(Option1.AMOUNT) && Number(Option2.AMOUNT) && !existInCrm)
        ) {
            Option1.UPDATED = 0;
            hasChanged = false;
        }
    }
    return hasChanged;
}

function isMyBudgetComplete(hl6Budget) {
    var myBudgetTotalPercentage = 0;
    var myBudgetComplete;

    hl6Budget.forEach(function (hl6_budget) {
        if (!hl6_budget.ORGANIZATION_ID || !Number(hl6_budget.ORGANIZATION_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", levelCampaign + " in My Budget " + hl6_budget.ORGANIZATION_ID + " can not be found.");

        myBudgetTotalPercentage = myBudgetTotalPercentage + Number(hl6_budget.PERCENTAGE);
    });

    if (myBudgetTotalPercentage > 100)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_PERCENT);
    if (myBudgetTotalPercentage < 100)
        myBudgetTotalPercentage = 0;

    myBudgetComplete = !!myBudgetTotalPercentage;
    return myBudgetComplete;
}

function isCategoryOptionComplete(data) {
    var categoryOptionComplete = false;
    for (var i = 0; i < data.hl6_category.length; i++) {
        var hl6Category = data.hl6_category[i];
        var percentagePerOption = 0;
        if (!hl6Category.CATEGORY_ID || !Number(hl6Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_NOT_VALID);

        if (!hl6Category.hl6_category_option.length)
            percentagePerOption = 100;
        //TODO review. Workaround for empty categories on edit
        //throw ErrorLib.getErrors().CustomError("","hl6Services/handlePost/insertHl6", L6_CATEGORY_OPTIONS_NOT_EMPTY);

        if (!data.hl6.HL6_ID && hl6Category.hl6_category_option.length !== dataOption.getAllocationOptionCountByCategoryIdLevelId(hl6Category.CATEGORY_ID, 'hl6'))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl6Category.hl6_category_option.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", "Option value is not valid (actual value " + option.AMOUNT + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT);
        });
        if (percentagePerOption > 100) {
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_TOTAL_PERCENTAGE);
        } else if (percentagePerOption < 100) {
            categoryOptionComplete = false;
            break;
        } else {
            categoryOptionComplete = true;
        }
    }
    return categoryOptionComplete;
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
    if (Number(objHl5) && (new_hl6_budget || new_hl6_budget == 0)) {
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
        var hl5Id = Number(objHl5) ? objHl5 : objHl5.HL5_ID;
        var resultHl6 = dataHl6.getHl6ByHl5Id(hl5Id);

        if (resultHl6.length > 0) {
            var total = 0;

            for (var i = 0; i < resultHl6.length; i++) {
                if (parseFloat(objHl5.BUDGET) < total + parseFloat(resultHl6[i].HL6_BUDGET)) {
                    dataHl6.hl6ChangeInOUTBudget(resultHl6[i].HL6_ID, 0);
                    // store hl6id and users to be send email when register
                    // change to in budget
                    result.emailListOutBudget.push(resultHl6[i]);
                } else {
                    dataHl6.hl6ChangeInOUTBudget(resultHl6[i].HL6_ID, 1);
                    total = total + parseFloat(resultHl6[i].HL6_BUDGET);
                    // store hl6id and users to be send email when register
                    // change to in budget
                    result.emailListInBudget.push(resultHl6[i]);
                }
            }
            result = resultHl6.length;
        }
        return result;
    }
}

/* Function to set HL6 status */
function setHl6Status(hl6_id, status_id, userId) {
    var updateOK = null;
    if (hl6_id && status_id && userId) {
        dataHl6.hl6ChangeStatus(hl6_id, status_id, userId);
        updateOK = dataHl6.insertHl6LogStatus(hl6_id, status_id, userId);
        if (HL6_STATUS.IN_CRM == status_id) {
            level6DER.deleteL6ChangedFieldsByHl6Id(hl6_id);
            resetHl6CategoryOptionUpdated(hl6_id, userId)
        }
    }
    return updateOK;
}

function changeHl6StatusOnDemand(hl6_id, userId) {
    var hl6 = dataHl6.getHl6ById(hl6_id);
    var existInCrm = dataHl6.hl6ExistsInCrm(hl6_id);
    var statusId = existInCrm ? HL6_STATUS.UPDATE_IN_CRM
        : HL6_STATUS.LOAD_DATA_ENTRY;

    if(!hl6.ALLOW_BUDGET_ZERO) {
        var myBudget = dataHl6.getHl6MyBudgetByHl6Id(hl6_id);

        var isComplete = isMyBudgetComplete(myBudget);

        var hasBudgetRequestPending = budgetSpendRequest.countPendingBudgetRequestByHl6Id(hl6_id) > 0;

        if (!isComplete || !hl6.EMPLOYEE_RESPONSIBLE_ID || !hl6.COST_CENTER_ID)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePut/changeHl6Status", L6_MSG_COULDNT_CHAGE_STATUS);

        if (hasBudgetRequestPending)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePut/changeHl6Status", L6_MSG_COULDNT_CHANGE_STATUS_DUE_PENDING_BUDGET_SPEND_REQUEST);
    }

    return setHl6Status(hl6_id, statusId, userId);
}

function resetHl6CategoryOptionUpdated(hl6Id, userId) {
    dataCategoryOptionLevel.resetHl4CategoryOptionUpdated(hl6Id, 'hl6', userId);
    return true;
}

/* Set hl6 status to In CRM */
function setHl6StatusInCRM(hl6_id, userId) {
    return setHl6Status(hl6_id, HL6_STATUS.IN_CRM, userId);
}

function crmFieldsHaveChanged(data, isComplete, userId) {
    var crmFieldsHaveChanged = false;
    var crmBindingChangedFields = [];
    var crmBindingChangedFieldsUpdate = [];

    if (!isComplete)
        return {
            crmFieldsHaveChanged: true,
            crmBindingChangedFields: crmBindingChangedFields,
            crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate
        };

    var deReportDisplayName = level6DER.getProcessingReportFields();
    var crmBindingFields = {hl6: Object.keys(deReportDisplayName)};

    /*var crmBindingFields = {
        "hl6": ["ACRONYM"
            , "HL6_CRM_DESCRIPTION"
            , "BUDGET"
            , "DISTRIBUTION_CHANNEL_ID"
            , "ACTUAL_START_DATE"
            , "ACTUAL_END_DATE"
            , "CAMPAIGN_TYPE_ID"
            , "CAMPAIGN_SUBTYPE_ID"
            , "CAMPAIGN_OBJECTIVE_ID"
            , "ROUTE_TO_MARKET_ID"
            , "COST_CENTER_ID"
            , "SALES_ORGANIZATION_ID"
            , "MARKETING_PROGRAM_ID"
            , "MARKETING_ACTIVITY_ID"
            , "SHOW_ON_DG_CALENDAR"
            , "BUSINESS_OWNER_ID"
            , "EMPLOYEE_RESPONSIBLE_ID"
            , "VENUE"
            , "CITY"
            , "COUNTRY"
            , "URL"
            , "STREET"
            , "PLANNED_START_DATE"
            , "PLANNED_END_DATE"
            , "POSTAL_CODE"
            , "PARENT_PATH"
            , "REGION"
            , "EVENT_OWNER"
            , "NUMBER_OF_PARTICIPANTS"
            , "PRIORITY_ID"
        ]
    };
    var deReportDisplayName = {
        "ACRONYM": "ID"
        , "HL6_CRM_DESCRIPTION": "Description"
        , "SHOW_ON_DG_CALENDAR": "Show on calendar"
        , "CAMPAIGN_OBJECTIVE_ID": "Objective"
        , "CAMPAIGN_TYPE_ID": "Type"
        , "CAMPAIGN_SUBTYPE_ID": "Sub-Type"
        , "MARKETING_PROGRAM_ID": "Marketing program ID"
        , "MARKETING_PROGRAM_DESC": "Marketing program Desc" //
        , "MARKETING_ACTIVITY_ID": "Marketing activity ID"
        , "MARKETING_ACTIVITY_DESC": "Marketing activity Desc" //
        , "PLANNED_START_DATE": "Planned Start"
        , "PLANNED_END_DATE": "Planned End"
        , "ACTUAL_START_DATE": "Actual Start"
        , "ACTUAL_END_DATE": "Actual End"
        , "SALES_ORGANIZATION_ID": "Marketing organization"
        , "DISTRIBUTION_CHANNEL_ID": "Distribution Channel"
        , "DISTRIBUTION_CHANNEL_DESC": "Distribution Channel Desc" //
        , "COST_CENTER_ID": "Cost center"
        , "EMPLOYEE_RESPONSIBLE_ID": "Employee responsible"
        , "BUSINESS_OWNER_ID": "Business Owner"
        , "BUDGET": "Budget"
        , "URL": "Url"
        , "VENUE": "Venue"
        , "STREET": "Street"
        , "CITY": "City"
        , "COUNTRY": "Country"
        , "POSTAL_CODE": "Postal code"
        , "ROUTE_TO_MARKET_ID": "Route to market"
        , "PARENT_PATH": "Parent"
        , "REGION": "Region"
        , "EVENT_OWNER": "Event Owner"
        , "NUMBER_OF_PARTICIPANTS": "Number Of Participants"
        , "PRIORITY_ID": "Priority"
    };*/

    if (!data.hl6.HL6_ID) {
        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var parameters = {
                    "in_hl6_id": data.hl6.HL6_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };
                crmBindingChangedFields.push(parameters);
            });
        });
    } else {
        var oldHl6 = dataHl6.getHl6ById(data.hl6.HL6_ID);
        var existInCrm = dataHl6.hl6ExistsInCrm(data.hl6.HL6_ID);
        var l6CrmBindigFields = util.getMapHl6ChangedFieldsByHl6Id(data.hl6.HL6_ID);

        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var oldParentPath = '';
                var parentPath = '';
                if (field === "PARENT_PATH") {
                    oldParentPath = dataPath.getCrmParentPathByIdLevelId('hl6', data.hl6.HL6_ID)[0].PARENT_PATH;
                    parentPath = pathBL.getPathByLevelParentForCrm('hl6', data.hl6.HL5_ID);
                }
                var parameters = {
                    "in_hl6_id": data.hl6.HL6_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };


                if (field.indexOf('_DATE') <= 0) {
                    var fieldChanged = field === 'BUDGET' ?
                        Number(oldHl6[field]) !== Number(data[object][field]) :
                        oldHl6[field] != data[object][field];

                } else {
                    fieldChanged = new Date(oldHl6[field]).valueOf() !== new Date(data[object][field]).valueOf();
                }
                if (fieldChanged || oldParentPath != parentPath) {

                    if (oldParentPath) {
                        if (oldParentPath != parentPath) {
                            pathBL.updParentPath('hl6', data.hl6.HL6_ID, parentPath, userId);
                        }
                    } else {
                        pathBL.insParentPath('hl6', data.hl6.HL6_ID, data.hl6.HL5_ID, userId);
                    }

                    var in_hl6_crm_binding_id = l6CrmBindigFields[field] ? l6CrmBindigFields[field].HL6_CRM_BINDING_ID : null;
                    if (in_hl6_crm_binding_id) {
                        parameters.in_hl6_crm_binding_id = in_hl6_crm_binding_id;
                        crmBindingChangedFieldsUpdate.push(parameters);
                    } else {
                        crmBindingChangedFields.push(parameters);
                    }

                    crmFieldsHaveChanged = true;
                }
            });
        });
    }
    return {
        crmFieldsHaveChanged: crmFieldsHaveChanged,
        crmBindingChangedFields: crmBindingChangedFields,
        crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate
    };
}

function sendProcessingReportEmail(hl6Id) {
    var appUrl = config.getAppUrl();
    var hl6 = dataHl6.getHl6ById(hl6Id);
    //var hl5 = dataHl5.getHl5ById(hl6.HL5_ID);
    var hl6OwnerEmail = getUserById(hl6.CREATED_USER_ID).EMAIL;
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
    "in_acronym": "ACRONYM",
    "in_hl6_id": "HL6_ID",
    "in_sales_organization_id": "SALES_ORGANIZATION_ID",
    "in_objective_id": "OBJECTIVE_ID",
    "in_hl6_crm_description": "HL6_CRM_DESCRIPTION",
    "in_hl5_id": "HL5_ID",
    "in_route_to_market_id": "ROUTE_TO_MARKET_ID",
    "in_campaign_objective_id": "CAMPAIGN_OBJECTIVE_ID",
    "in_campaign_type_id": "CAMPAIGN_TYPE_ID",
    "in_campaign_subtype_id": "CAMPAIGN_SUBTYPE_ID",
    "marketing_program_id": "MARKETING_PROGRAM_ID",
    "marketing_activity_id": "MARKETING_ACTIVITY_ID",
    "in_actual_start_date": "ACTUAL_START_DATE",
    "in_actual_end_date": "ACTUAL_END_DATE",
    "show_on_dg_calendar": "SHOW_ON_DG_CALENDAR",
    "business_process_owner_id": "BUSINESS_OWNER_ID",
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
    "amount": "AMOUNT",
    "intel": "INTEL_PROJECT_ID",
    "claim": "CLAIM_ID",
    "notes": "COMMENTS",
    "companyName": "COMPANY_NAME",
    "companyAddress": "COMPANY_ADDRESS",
    "invoiceNumber": "INVOICE_NUMBER",
    "partner_type_id": "PARTNER_TYPE_ID",
    "in_description": "DESCRIPTION",
    "in_partner_name": "NAME",
    "in_partner_type_id": "PARTNER_TYPE_ID",
    "in_value": "VALUE",
    "in_budget": "BUDGET",
    "distribution_channel_id": "DISTRIBUTION_CHANNEL_ID",
    "in_option_id": "OPTION_ID",
    "in_comments": "COMMENTS",
    "in_outcomes_id": "OUTCOMES_ID",
    "in_euro_value": "EURO_VALUE",
    "in_amount_value": "VOLUME_VALUE",
    "in_results_campaign_q1": "RESULTS_CAMPAIGN_Q1",
    "in_results_campaign_q2": "RESULTS_CAMPAIGN_Q2",
    "in_results_campaign_q3": "RESULTS_CAMPAIGN_Q3",
    "in_results_campaign_q4": "RESULTS_CAMPAIGN_Q4",
    "venue": "VENUE",
    "city": "CITY",
    "country": "COUNTRY",
    "url": "URL",
    "in_planned_start_date": "PLANNED_START_DATE",
    "in_planned_end_date": "PLANNED_END_DATE",
    "street": "STREET",
    "postal_code": "POSTAL_CODE",
    "in_category_id": "CATEGORY_ID",
    "in_in_processing_report": "IN_PROCESSING_REPORT",
    "region": "REGION",
    "event_owner": "EVENT_OWNER",
    "number_of_participants": "NUMBER_OF_PARTICIPANTS",
    "priority_id": "PRIORITY_ID",
    "in_message": "MESSAGE",
    "message": "MESSAGE",
    "in_intel_project_id": "INTEL_PROJECT_ID",
    "in_claim_id": "CLAIM_ID",
    "in_company_name": "COMPANY_NAME",
    "in_company_address": "COMPANY_ADDRESS",
    "in_invoice_number": "INVOICE_NUMBER",
    "in_partner_currency_id": "PARTNER_CURRENCY_ID",
    "in_sale_currency_id": "SALE_CURRENCY_ID",
    "co_funded": "CO_FUNDED",
    "partnerId": "PARTNER_ID",
    "budget_spend_request_id": "BUDGET_SPEND_REQUEST_ID",
    "status": "STATUS",
    "allow_zero": "ALLOW_BUDGET_ZERO"
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
    data.hl6.BUDGET = data.hl6_fnc.BUDGET ? data.hl6_fnc.BUDGET : 0;
    data.hl6.CO_FUNDED = data.hl6_fnc.CO_FUNDED ? 1 : 0;
    data.hl6.ALLOW_BUDGET_ZERO = data.hl6_fnc.ALLOW_BUDGET_ZERO ? 1 : 0;

    data.hl6_fnc = undefined;

    return data;
}

function serverToUiParser(object) {
    var hl6_sale = {
        regions: [],
        globalteams: [],
        others: [],
        total: ''
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
        }
    });
    object.sale.saleRequests.forEach(function (obj) {
        var aux = {};
        aux.HL6_SALES_ID = obj.HL6_SALES_ID;
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
        }
        aux.MESSAGE = obj.MESSAGE;
    });
    hl6_sale.total = object.sale.total;
    hl6_sale.saleCurrencyId = object.sale.saleRequestsCurrencyId;
    object.saleRequests = object.sale.salesRequestLoaded;
    object.sale = hl6_sale;
    object.myBudget = hl6_budget;

    return object;
}

function getNewHl6Id(HL5_ID) {
    return dataHl6.getNewHl6Id(HL5_ID);
}

function getHl6Categories(hl5_id) {
    var hl5_category = level5Lib.getHl5CategoryOption(hl5_id)
    var hl6_category = JSON.parse(JSON.stringify(allocationCategory.getCategoryByHierarchyLevelId(hierarchyLevel['hl6']).results));
    hl6_category = hl6_category.map(function (category) {
        category.hl6_category_option = JSON.parse(JSON.stringify(dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevel(category.CATEGORY_ID, 'hl6')));
        return category;
    });

    return hl6_category.map(function (category) {

        var hl5Cat = extractElementByList(hl5_category, "CATEGORY_NAME", category.NAME);
        if (hl5Cat) {
            category.CATEGORY_NAME = category.NAME;
            category.hl6_category_option.map(function (option) {
                var hl5option = extractElementByList(hl5Cat.hl5_category_option, "OPTION_NAME", option.OPTION_NAME);
                option.AMOUNT = hl5option ? hl5option.AMOUNT : 0;
                option.NAME = option.OPTION_NAME;
                return option;
            });
        }
        return category;
    });

}

function extractElementByList(list, criterion, value) {
    for (var i = 0; i < list.length; i++) {
        if (list[i][criterion].trim() == value.trim()) return list[i];
    }

    return null;
}

function getHl6ExpectedOutcomesOptions(hl5_id) {
    var expectedOutcomesL5 = expectedOutcomesLib.getExpectedOutcomesByHl5Id(hl5_id);
    var expectedOutcomesL6 = {};
    var expectedOutcomesDetailL6 = [];

    if (expectedOutcomesL5 && expectedOutcomesL5.detail) {
        for (var i = 0; i < expectedOutcomesL5.detail.length; i++) {
            var reg = expectedOutcomesL5.detail[i];
            var expectedOutcomeLevelId = expectedOutcomesLib.getOutcomesLevelByOptionNameOutcomeIdAndLevelId(reg.OUTCOMES_NAME, reg.OUTCOMES_TYPE_ID, 'HL6');
            if (expectedOutcomeLevelId) {
                expectedOutcomesL5.detail[i] = JSON.parse(JSON.stringify(expectedOutcomesL5.detail[i]));
                expectedOutcomesL5.detail[i].OUTCOMES_ID = expectedOutcomeLevelId.EXPECTED_OUTCOME_OPTION_ID;
                expectedOutcomesDetailL6.push(expectedOutcomesL5.detail[i]);
            }
        }
        expectedOutcomesL6.COMMENTS = expectedOutcomesL5.COMMENTS;
    }
    expectedOutcomesL6.detail = expectedOutcomesDetailL6;
    return expectedOutcomesL6;
}

function delHl6DataImportByImportId(importId) {
    var hl6List = dataHl6.getHl6ByImportId(importId);
    for (var i = 0; i < hl6List.length; i++) {
        var hl6 = hl6List[i];
        //delete sales
        dataHl6.delHl6SaleHard(hl6.HL6_ID, true);
        //delete budget
        dataHl6.delHl6BudgetHard(hl6.HL6_ID, true);
        //delete hl6 category option
        dataHl6.delHl6CategoryOptionHard(hl6.HL6_ID, true);

        dataExOut.deleteHl6ExpectedOutcomesDetailHard(hl6.HL6_ID);
        dataExOut.deleteHl6ExpectedOutcomesHard(hl6.HL6_ID);

        //delete hl6
        dataHl6.delHl6Hard(hl6.HL6_ID, true);
    }
    return true;
}

function checkPermission(userSessionID, method, hl6Id) {
    if (((method && method == "GET_BY_HL6_ID") || !method) && !util.isSuperAdmin(userSessionID)) {
        var hl6 = dataHl6.getHl6ById(hl6Id);
        var hl5 = dataHl5.getHl5ById(hl6.HL5_ID);
        var hl4 = dataHl4.getHl4ById(hl5.HL4_ID);
        var usersL3 = userBL.getUserByHl3Id(hl4.HL3_ID).users_in;
        var users = usersL3.find(function (user) {
            return user.USER_ID == userSessionID
        });
        if (!users) {
            throw ErrorLib.getErrors().CustomError("", "level3/handlePermission", "User hasn´t permission for this resource.");
        }
    }
}