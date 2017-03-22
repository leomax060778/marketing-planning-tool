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
/** ********************************************** */

var levelCampaign = "Campaign/Activity & Sub tactic";
var L6_MSG_INITIATIVE_NOT_FOUND = "The Campaign/Activity & Sub tactic can not be found.";
var L6_MSG_INITIATIVE_CRM_ACRONYM = "The Acronym has been used. The new Acronym is: ";
var L6_MSG_INITIATIVE_CRM_ACRONYM_EXISTS = "The Acronym has been used.";
var L6_MSG_USER_NOT_FOUND = "The User can not be found.";
var L6_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L6_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Campaign/Activity & Sub tactic, because the status doesn´t allow it.";
var L6_MSG_INITIATIVE_CRM_DESCRIPTION = "The Campaign/Activity & Sub tactic CRM description can not be null or empty.";
var L6_MSG_INITIATIVE_BUDGET_VALUE = "The Campaign/Activity & Sub tactic Budget value must be greater than zero.";
var L6_MSG_INITIATIVE_CURRENCY = "The Campaign/Activity & Sub tactic Currency can not be found.";
var L6_MSG_INITIATIVE_BUDGET_SPEND = "The Campaign/Activity & Sub tactic Budget spend must be set.";
var L6_MSG_INITIATIVE_BUDGET_SPEND_PERCENT = "The Campaign/Activity & Sub tactic Budget Spend must be 100%.";
var L6_MSG_INITIATIVE_MY_BUDGET = " The Campaign/Activity & Sub tactic in My Budget can not be found.";
var L6_MSG_INITIATIVE_BUDGET_PERCENT = "The Campaign/Activity & Sub tactic in My Budget percentage should be less than or equal to 100%.";
var L6_PARTNER_TYPE_NOT_VALID = "Partner type is not valid.";
var L6_PARTNER_NAME_NOT_FOUND = "Partner name can not be found.";
var L6_PARTNER_REGION_NOT_VALID = "Partner region is not valid.";
var L6_PARTNER_VALUE_NOT_VALID = "Partner value is not valid.";
var L6_MSG_INITIATIVE_ROUTE_TO_MARKET = "The Campaign/Activity & Sub tactic route to market cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_OBJECTIVE = "The Campaign/Activity & Sub tactic campaign objective cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_TYPE = "The Campaign/Activity & Sub tactic campaign type cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_SUBTYPE = "The Campaign/Activity & Sub tactic campaign subtype cannot be found.";
var L6_MSG_INITIATIVE_ACTUAL_START_DATE = "The Campaign/Activity & Sub tactic actual start date cannot be found.";
var L6_MSG_INITIATIVE_ACTUAL_END_DATE = "The Campaign/Activity & Sub tactic actual end date cannot be found.";
var L6_MSG_INITIATIVE_SALES_ORGANIZATION = "The Campaign/Activity & Sub tactic sales organization cannot be found.";
var L6_MSG_INITIATIVE_INVALID_DATE_RANGE = "The Actual End Date must be mayor than Actual Start Date";
var L6_CAMPAIGN_FORECASTING_KPIS_DETAILS = "Campaign Forecasting / KPIS details amount value is not valid.";
var L6_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO = "Campaign Forecasting / KPIS details euro value is not valid.";
var L6_CAMPAIGN_FORECASTING_KPIS_NOT_VALID = "Campaign Forecasting / KPIS is not valid.";
var L6_MSG_RESULTS_CAMPAIGN = "The Campaign/Activity & Sub tactic, Results/Campaign Forecasting must be set.";
var L6_MSG_RESULTS_CAMPAIGN_PERCENT = "The Campaign/Activity & Sub tactic, Results/Campaign Forecasting must be 100%.";
var L6_MSG_COULDNT_CHAGE_STATUS = "Couldn´t change Sub tactic/Campaign status due to incomplete data. Please review Budget and Options information";
var L6_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any KPI type.";
var L6_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE = "Once Campaign/Activity & Sub tactic is already in CRM, properties CRM ID, Cost Center and Markting Organization cannot be modified.";
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

    return {
        "results": allHl6,
        "total_budget": total_budget,
        "remaining_budget": remaining_budget
    };

}

function showLinkToCRT(hl6) {
    return hl6.STATUS_ID == HL6_STATUS.IN_CRM && hl6.CRT_RELATED;
}

function getHl6CategoryOption(hl6_id) {
    var hl6Categories = dataCategoryOptionLevel.getAllocationCategory(hl6_id, 'hl6');
    var result = [];
    hl6Categories.forEach(function (catgory) {
        var aux = util.extractObject(catgory);
        var hl6Category = {};
        aux["hl6_category_option"] = dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(aux.CATEGORY_ID, 'hl6', hl6_id);
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
    hl6.IS_IN_CRM = !!dataHl6.hl6ExistsInCrm(id);
    var currencyValueAux = dataCurrency.getCurrencyValueId(hl6.EURO_CONVERSION_ID);
    currencyValueAux = Number(currencyValueAux);
    var partner = partnerLib.getPartnerByHl6Id(id, currencyValueAux);
    var myBudget = dataHl6.getHl6MyBudgetByHl6Id(id);
    var sale = dataHl6.getHl6SalesByHl6Id(id);
    var hl6_category = getHl6CategoryOption(id);
    //var currencyValueAux = dataCurrency.getCurrencyValueId(hl6.EURO_CONVERSION_ID);
    //currencyValueAux = Number(currencyValueAux);
    var totalAmount = 0;
    sale = JSON.parse(JSON.stringify(sale));
    sale.forEach(function (elem) {
        elem.AMOUNT = (Number(elem.AMOUNT) * Number(currencyValueAux)).toFixed(2);
        totalAmount = totalAmount + Number(elem.AMOUNT);
    });
    sale.total = totalAmount;
    hl6.BUDGET = (Number(hl6.BUDGET)); //* currencyValueAux).toFixed(2);
    hl6.in_totalbudget = (Number(hl6.BUDGET) + Number(partner.total) / currencyValueAux + Number(sale.total) / currencyValueAux);

    var result = {
        "hl6": hl6,
        "expectedOutcomes": expectedOutcomesLib.getExpectedOutcomesByHl6Id(id),
        "partner": partner,
        "myBudget": myBudget,
        "sale": sale,
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

function getLevel6ForSearch(userSessionID) {
    var result = dataHl6.getHl6ForSearch(userSessionID, util.isSuperAdmin(userSessionID) ? 1:0);
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

    var validationResult = validateHl6(data);

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

        data.hl6.IN_BUDGET = checkBudgetStatus(data.hl6.HL5_ID, hl6_id, Number(data.hl6.BUDGET) /* / conversionValue*/);

        data.hl6.BUDGET_SPEND_Q1 = Number(data.hl6.BUDGET_SPEND_Q1);
        data.hl6.BUDGET_SPEND_Q2 = Number(data.hl6.BUDGET_SPEND_Q2);
        data.hl6.BUDGET_SPEND_Q3 = Number(data.hl6.BUDGET_SPEND_Q3);
        data.hl6.BUDGET_SPEND_Q4 = Number(data.hl6.BUDGET_SPEND_Q4);
        data.hl6.BUDGET = Number(data.hl6.BUDGET);// / conversionValue;
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
        );

        if (hl6_id > 0) {
            data.hl6.HL6_ID = hl6_id;
            if (validationResult.isComplete) {
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
            insertPartners(data, conversionValue);

            var pathHl5 = dataPath.getPathByLevelParent(6, data.hl6.HL5_ID)[0].PATH_TPH;
            var hl6Acronym = data.hl6.ACRONYM;// dataHl6.getHl6ById(hl6_id).ACRONYM;

            hl6Acronym = hl6Acronym.length <= 1 ? '0' + hl6Acronym : hl6Acronym;
            pathHl6 = 'CRM-' + pathHl5 + '-' + hl6Acronym;

            data.hl6_category.forEach(function (hl6Category) {
                var category = {};
                hl6Category.hl6_category_option.forEach(function (hl6CategoryOption) {
                    hl6CategoryOption.CREATED_USER_ID = userId;
                    hl6CategoryOption.AMOUNT = hl6CategoryOption.AMOUNT || 0;
                    hl6CategoryOption.UPDATED = hl6CategoryOption.AMOUNT ? 1 : 0;
                    hl6Category.categoryOptionLevelId = dataCategoryOptionLevel.getAllocationOptionLevelByCategoryAndLevelId(hl6Category.CATEGORY_ID, 'hl6', hl6CategoryOption.OPTION_ID).ALLOCATION_CATEGORY_OPTION_LEVEL_ID;
                    dataCategoryOptionLevel.insertCategoryOption(hl6_id, hl6Category.categoryOptionLevelId, hl6CategoryOption.AMOUNT, userId, hl6CategoryOption.UPDATED, 'HL6');
                });
            });
        }

        return pathHl6;
    }
}
function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
}

function validateHl6Upload(data){


    if (!data.ACRONYM) {
        var error = ErrorLib.getErrors().ImportError();
        error.row = valuesToArray(data);
        error.details = L6_MSG_INITIATIVE_NOT_FOUND;
        throw error;
    }
    //if (data.hl5.ACRONYM.length !== 4)
    //  throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM_LENGTH);

    if (existsHl6(data)) {
        var error = ErrorLib.getErrors().ImportError();
        error.row = valuesToArray(data);
        error.details = L6_MSG_INITIATIVE_CRM_ACRONYM_EXISTS;
        throw error;
    }
    //if (util.validateDateEndMayorStart((new Date(data.hl5.ACTUAL_START_DATE)), (new Date(data.hl5.ACTUAL_END_DATE))))
    //    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L5_MSG_INITIATIVE_INVALID_DATE_RANGE);

    //if (data.hl5.EURO_CONVERSION_ID < 0)
//        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CURRENCY);

    return true;
}

function insertHl6FromUpload(data, userId){
    var hl6_id = 0;
//throw JSON.stringify(data);
    if(validateHl6Upload(data)) {

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
            ,0//data.RESULTS_CAMPAIGN_Q2,
            ,0//data.RESULTS_CAMPAIGN_Q3,
            ,0//data.RESULTS_CAMPAIGN_Q4,
            ,data.PLANNED_START_DATE,
            data.PLANNED_END_DATE,
            data.STREET,
            data.POSTAL_CODE
            , data.REGION
            , data.EVENT_OWNER
            , data.NUMBER_OF_PARTICIPANTS
            , data.PRIORITY_ID || null
            ,true
            ,1
            , data.IMPORT_ID
        );


        if(hl6_id) {

            //insert categories
            data.categories.forEach(function (hl6Category) {
                hl6Category.OPTIONS.forEach(function (hl6CategoryOption) {
                    hl6CategoryOption.CREATED_USER_ID = userId;
                    hl6CategoryOption.AMOUNT = Number(hl6CategoryOption.VALUE) || 0;
                    hl6CategoryOption.UPDATED = Number(hl6CategoryOption.VALUE) ? 1 : 0;
                    hl6Category.categoryOptionLevelId = dataCategoryOptionLevel.getAllocationOptionLevelByCategoryAndLevelId(hl6Category.CATEGORY, 'hl6', hl6CategoryOption.OPTION_ID).ALLOCATION_CATEGORY_OPTION_LEVEL_ID;
                    dataCategoryOptionLevel.insertCategoryOption(hl6_id, hl6Category.categoryOptionLevelId, hl6CategoryOption.AMOUNT, userId, hl6CategoryOption.UPDATED, 'HL6');
                });
            });

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
                var expectedoutcomelevelid = dataExOut.getExpectedOutcomeLevelByLevelAndOptionId('hl6',expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID).EXPECTED_OUTCOME_LEVEL_ID;
                dataExOut.insertHl6ExpectedOutcomesDetail(expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID, expectedoutcomelevelid, expectedOutcomeDetail.EURO_VALUE, expectedOutcomeDetail.VOLUME_VALUE, userId);
            });

            //inserts budget regions
            var regions = blRegion.getAllRegions();
            var centralTeams = blLevel2.getAllCentralTeam(0);

            regions.forEach(function (myBudget) {
                myBudget.HL6_ID = hl6_id;
                dataHl6.insertHl6BudgetSalesUpload(myBudget.HL6_ID, myBudget.REGION_ID, 0, ORGANIZATION_TYPE["REGIONAL"], "", userId);
            });

            centralTeams.forEach(function (sale) {
                sale.HL6_ID = hl6_id;
                dataHl6.insertHl6BudgetSalesUpload(sale.HL6_ID, sale.HL2_ID, 0, ORGANIZATION_TYPE["CENTRAL"], "", userId);
            });
            //insert sale other data
            dataHl6.insertHl6Sale(hl6_id, null, 0, ORGANIZATION_TYPE["OTHER"], "Other", userId);
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
        data.hl6_budget.forEach(function (myBudget) {
            myBudget.HL6_ID = data.hl6.HL6_ID;
            myBudget.CREATED_USER_ID = data.hl6.CREATED_USER_ID;
            dataHl6.insertHl6Budget(myBudget.HL6_ID, myBudget.ORGANIZATION_ID, myBudget.PERCENTAGE, ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE], myBudget.CREATED_USER_ID || data.hl6.USER_ID);
        });
    }
}

function insertSales(data, conversionValue) {
    if (data.hl6_sale) {
        data.hl6_sale.forEach(function (sale) {
            sale.HL6_ID = data.hl6.HL6_ID;
            sale.CREATED_USER_ID = data.hl6.CREATED_USER_ID;
            sale.AMOUNT = Number(sale.AMOUNT) /* / conversionValue*/;
            sale.DESCRIPTION = ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION : null;
            sale.ORGANIZATION_ID = ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] !== 3 ? sale.ORGANIZATION_ID : null;
            dataHl6.insertHl6Sale(sale.HL6_ID, sale.ORGANIZATION_ID, sale.AMOUNT / conversionValue, ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE], sale.DESCRIPTION, sale.CREATED_USER_ID || data.hl6.USER_ID);

        });
    }
}

function insertPartners(data, conversionValue) {
    data.partners.forEach(function (partner) {
        partner.CREATED_USER_ID = data.hl6.CREATED_USER_ID;
        partner.HL6_ID = data.hl6.HL6_ID;
        dataPartner.insertHl6Partner(partner.HL6_ID, partner.NAME, partner.PARTNER_TYPE_ID, partner.REGION_ID, partner.VALUE / conversionValue, partner.CREATED_USER_ID || data.hl6.USER_ID);
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

    var validationResult = validateHl6(data);
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

        data.hl6.IN_BUDGET = checkBudgetStatus(data.hl6.HL5_ID, data.hl6.HL6_ID, Number(data.hl6.BUDGET) /*/ conversionValue*/);

        data.hl6.BUDGET_SPEND_Q1 = Number(data.hl6.BUDGET_SPEND_Q1);
        data.hl6.BUDGET_SPEND_Q2 = Number(data.hl6.BUDGET_SPEND_Q2);
        data.hl6.BUDGET_SPEND_Q3 = Number(data.hl6.BUDGET_SPEND_Q3);
        data.hl6.BUDGET_SPEND_Q4 = Number(data.hl6.BUDGET_SPEND_Q4);
        data.hl6.BUDGET = Number(data.hl6.BUDGET); // / conversionValue;
        data.hl6.USER_ID = userId;
        data.hl6.CREATED_USER_ID = userId;

        //TODO: delete verification before set validation
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q1) : 0;
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q2) : 0;
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q3) : 0;
        data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4 = data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4 ? Number(data.hl6_expected_outcomes.RESULTS_CAMPAIGN_Q4) : 0;

        // todo: set correct data
        if (validationResult.isComplete) {
            insertHl6CRMBinding(data, 'update');
        }

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
        );

        setHl6Status(data.hl6.HL6_ID, data.hl6.HL6_STATUS_DETAIL_ID, userId);

        updateBudget(data/*, conversionValue*/);

        updateSales(data, conversionValue);

        updateExpectedOutcomes(data/*, conversionValue*/);

        updatePartners(data, conversionValue);

        updateCategoryOptions(data, userId);

        return data;
    }
}

function updateCategoryOptions(data, userId) {
    data.hl6_category.forEach(function (hl6Category) {
        //var hl6_category_id = dataHl6.getHl6Category(data.hl6.HL6_ID, hl6Category.CATEGORY_ID)[0].HL6_CATEGORY_ID;
        hl6Category.hl6_category_option.forEach(function (hl6CategoryOption) {
            hl6CategoryOption.AMOUNT = hl6CategoryOption.AMOUNT || 0;
            hl6CategoryOption.UPDATED = hl6CategoryOption.AMOUNT ? 1 : 0;
            hl6Category.in_category_option_level_id = dataCategoryOptionLevel.getAllocationOptionLevelByCategoryAndLevelId(hl6Category.CATEGORY_ID, 'hl6', hl6CategoryOption.OPTION_ID).ALLOCATION_CATEGORY_OPTION_LEVEL_ID;
            dataCategoryOptionLevel.updateCategoryOption(hl6Category.in_category_option_level_id, hl6CategoryOption.AMOUNT, userId, hl6CategoryOption.UPDATED, 'HL6');
        });
    });
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

    if (data.hl6.HL6_ID && dataHl6.hl6ExistsInCrm(data.hl6.HL6_ID)) {
        var hl6 = dataHl6.getHl6ById(data.hl6.HL6_ID);
        if (hl6.ACRONYM != data.hl6.ACRONYM
            || hl6.COST_CENTER_ID != data.hl6.COST_CENTER_ID
            || hl6.SALES_ORGANIZATION_ID != data.hl6.SALES_ORGANIZATION_ID)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE);
    }

    if (!data.hl6.HL6_CRM_DESCRIPTION)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CRM_DESCRIPTION);

    if (data.hl6.BUDGET < 0)
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
            if (!partner.NAME)
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_NAME_NOT_FOUND);
            if (!partner.REGION_ID || !Number(partner.REGION_ID))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_REGION_NOT_VALID);
            if (!partner.VALUE || !Number(partner.VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_VALUE_NOT_VALID);
        });
    }
    var categoryOptionComplete = isCategoryOptionComplete(data);

    //var hasDeReportFields = dataL6DER.getL6ChangedFieldsByHl6Id(data.hl6.HL6_ID);

    var statusId = null;
    if (data.hl6.HL6_ID) {
        if (data.hl6.in_hl6_status_detail_id != HL6_STATUS.IN_PROGRESS && !myBudgetComplete)
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl6", L6_MY_BUDGET_COMPLETE);
        existInCrm = dataHl6.hl6ExistsInCrm(data.hl6.HL6_ID);
        var categoryHasChanged = categoryChanged(data, existInCrm);

        statusId = !crmFieldsHaveChanged(data) && !categoryHasChanged ? data.hl6.in_hl6_status_detail_id : HL6_STATUS.IN_PROGRESS;
    } else {
        statusId = HL6_STATUS.IN_PROGRESS;
    }
    return {statusId: statusId, isComplete: categoryOptionComplete && myBudgetComplete};
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
    hl6Categories.forEach(function (catgory) {
        var aux = util.extractObject(catgory);
        var hl6Category = {};
        aux["hl6_category_option"] = dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(aux.CATEGORY_ID, 'hl6', hl6_id);
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
    for (var i = 0; i < ListCategories1.length; i++) {
        var category = ListCategories1[i];
        var actualCategory = dataCategory.getCategoryById(category.CATEGORY_ID, 'hl6');
        if (actualCategory.IN_PROCESSING_REPORT)
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
    Option1.UPDATED = 1;

    if (Number(Option1.AMOUNT) && Option2.UPDATED) return !!Option1.UPDATED;

    if ((!Number(Option1.AMOUNT) && !Number(Option2.AMOUNT)) ||
        (!Number(Option1.AMOUNT) && Number(Option2.AMOUNT) && !existInCrm) ||
        (Number(Option1.AMOUNT) && Number(Option2.AMOUNT) && Number(Option1.AMOUNT) == Number(Option2.AMOUNT)))
        Option1.UPDATED = 0;

    return !!Option1.UPDATED;
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
                    //throw JSON.stringify(parseFloat(objHl5.BUDGET) < total + parseFloat(resultHl6[i].HL6_BUDGET));
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
    var myBudget = dataHl6.getHl6MyBudgetByHl6Id(hl6_id);

    var hl6 = dataHl6.getHl6ById(hl6_id);

    var isComplete = isMyBudgetComplete(myBudget);

    if (!isComplete || !hl6.EMPLOYEE_RESPONSIBLE_ID || !hl6.COST_CENTER_ID)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePut/changeHl6Status", L6_MSG_COULDNT_CHAGE_STATUS);

    var existInCrm = dataHl6.hl6ExistsInCrm(hl6_id);

    var statusId = existInCrm ? HL6_STATUS.UPDATE_IN_CRM
        : HL6_STATUS.LOAD_DATA_ENTRY;

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

function insertHl6CRMBinding(hl6, action) {
    var crmBindingFields = {
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
    };

    var existInCrm = dataHl6.hl6ExistsInCrm(hl6.hl6.HL6_ID);

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
                if (object != "PARENT_PATH") {
                    hl6CRMBindingField = null;
                    in_hl6_crm_binding_id = null;


                    if (!existInCrm) {
                        hl6CRMBindingField = dataL6DER.getL6ChangedFieldsByHl6IdByField(hl6.hl6.HL6_ID, field)[0];
                        in_hl6_crm_binding_id = !!hl6CRMBindingField ? hl6CRMBindingField.ID : null;
                        if (in_hl6_crm_binding_id) {
                            dataHl6.updateHl6CRMBinding(in_hl6_crm_binding_id, hl6.hl6.HL6_ID, field, 1, deReportDisplayName[field], hl6.hl6.CREATED_USER_ID);
                        } else {
                            dataHl6.insertHl6CRMBinding(hl6.hl6.HL6_ID, field, 1, deReportDisplayName[field], hl6.hl6.CREATED_USER_ID);
                        }
                    } else {
                        hasChanged = field.indexOf('_DATE') > 0 ? new Date(oldHl6[field]).valueOf() != new Date(hl6[object][field]).valueOf() : oldHl6[field] != hl6[object][field];
                        if (hl6[object][field] && hasChanged) {
                            hl6CRMBindingField = dataL6DER.getL6ChangedFieldsByHl6IdByField(hl6.hl6.HL6_ID, field)[0];
                            in_hl6_crm_binding_id = !!hl6CRMBindingField ? hl6CRMBindingField.ID : null;
                            if (in_hl6_crm_binding_id) {
                                dataHl6.updateHl6CRMBinding(in_hl6_crm_binding_id, hl6.hl6.HL6_ID, field, 1, deReportDisplayName[field], hl6.hl6.CREATED_USER_ID);
                            } else {
                                dataHl6.insertHl6CRMBinding(hl6.hl6.HL6_ID, field, 1, deReportDisplayName[field], hl6.hl6.CREATED_USER_ID);
                            }
                        }
                    }
                }
            });
        });
    }
}

function crmFieldsHaveChanged(hl6) {
    var crmFieldsHaveChanged = 0;
    var crmBindingFields = {
        "hl6": ["HL6_CRM_DESCRIPTION"
            , "BUDGET"
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
            , "DISTRIBUTION_CHANNEL_ID"
            , "RESPONSIBLE_PERSON_ID"
            , "BUDGET_APPROVER_ID"
            , "REGION"
            , "EVENT_OWNER"
            , "NUMBER_OF_PARTICIPANTS"
            , "PRIORITY_ID"
        ]
    };
    var oldHl6 = dataHl6.getHl6ById(hl6.hl6.HL6_ID);

    Object.keys(crmBindingFields).forEach(function (object) {
        crmBindingFields[object].forEach(function (field) {
            var value = oldHl6[field] == null ? "" : oldHl6[field];
            if (field.indexOf('_DATE') > 0) {
                crmFieldsHaveChanged = new Date(value).valueOf() != new Date(hl6[object][field]).valueOf() ? ++crmFieldsHaveChanged : crmFieldsHaveChanged;
            } else {
                crmFieldsHaveChanged = value != hl6[object][field] ? ++crmFieldsHaveChanged : crmFieldsHaveChanged;
            }
        });
    });
    return !!crmFieldsHaveChanged;
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
    "in_description": "DESCRIPTION",
    "in_partner_name": "NAME",
    "in_partner_type_id": "PARTNER_TYPE_ID",
    "in_value": "VALUE",
    "in_budget": "BUDGET",
    "distribution_channel_id": "DISTRIBUTION_CHANNEL_ID",
    "in_option_id": "OPTION_ID",
    "in_comments": "COMMENTS",
    "in_outcomes_id": "OUTCOMES_ID",
    "in_amount_value": "VOLUME_VALUE",
    "in_euro_value": "EURO_VALUE",
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
    "priority_id": "PRIORITY_ID"
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

    data.hl6_fnc = undefined;

    return data;
}

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
        }
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
        }
    });
    hl6_sale.total = object.sale.total;
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

function delHl6DataImportByImportId(importId){
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

function checkPermission(userSessionID, method, hl6Id){
    if(((method && method == "GET_BY_HL6_ID") || !method) && !util.isSuperAdmin(userSessionID)){
        var hl6 = dataHl6.getHl6ById(hl6Id);
        var hl5 = dataHl5.getHl5ById(hl6.HL5_ID);
        var hl4 = dataHl4.getHl4ById(hl5.HL4_ID);
        var usersL3 = userBL.getUserByHl3Id(hl4.HL3_ID).users_in;
        var users = usersL3.find(function(user){return user.USER_ID == userSessionID});
        if(!users){
            throw ErrorLib.getErrors().CustomError("","level3/handlePermission","User hasn´t permission for this resource.");
        }
    }
}