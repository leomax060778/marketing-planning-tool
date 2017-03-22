/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataHl4 = mapper.getDataLevel4();
var dataHl3 = mapper.getDataLevel3();
var dataExOut = mapper.getDataExpectedOutcome();
var dataPartner = mapper.getDataPartner();
var dataInterlock = mapper.getDataInterLock();
var dataCurrency = mapper.getDataCurrency();
/*************************************************/


var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();

/*************************************************/
var interlockLib = mapper.getInterlock();
var partnerLib = mapper.getPartner();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var level4DER = mapper.getLevel4DEReport();
var dataL4DER = mapper.getDataLevel4Report();
var level5Lib = mapper.getLevel5();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var userbl = mapper.getUser();
var level3BL = mapper.getLevel3();
var userBL = mapper.getUser();
var mail = mapper.getMail();
var businessError = mapper.getLogError();
var pathBL = mapper.getPath();
var config = mapper.getDataConfig();
/*************************************************/

var levelCampaign = "Initiative/Campaign";
var L3_MSG_INITIATIVE_NOT_FOUND = "The Initiative/Campaign can not be found.";
var L3_MSG_USER_NOT_FOUND = "The User can not be found.";
var L3_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L3_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Initiative/Campaign, because the status doesn´t allow it.";
var L3_MSG_INITIATIVE_CANT_DEL_CHILD = "The selected Initiative/Campaign can not be deleted because has childs.";
var L3_MSG_INITIATIVE_DETAIL = "The Initiative/Campaign details can not be null or empty.";
var L3_MSG_INITIATIVE_BUSINESS = "The Initiative/Campaign business value can not be null or empty.";
var L3_MSG_INITIATIVE_ACRONYM = "The Initiative/Campaign acronym can not be null or empty.";
var L3_MSG_INITIATIVE_IN_CRM = "Cannot modified CRM ID if already exists in CRM.";
var L3_MSG_INITIATIVE_EXISTS = "Another Initiative/Campaign with the same acronym already exists on this plan.";
var L3_MSG_INITIATIVE_ACRONYM_LENGTH = "The Initiative/Campaign Acronym length must be 3 characters.";
var L3_MSG_INITIATIVE_CRM_DESCRIPTION = "The Initiative/Campaign CRM description can not be null or empty.";
var L3_MSG_INITIATIVE_BUDGET_DATA = "The Initiative/Campaign Budget data can not be found.";
var L3_MSG_INITIATIVE_BUDGET_VALUE = "The Initiative/Campaign Budget value must be greater than zero.";
var L3_MSG_INITIATIVE_CURRENCY = "The Initiative/Campaign Currency can not be found.";
var L3_MSG_INITIATIVE_BUDGET_SPEND = "The Initiative/Campaign Budget spend must be set.";
var L3_MSG_INITIATIVE_BUDGET_SPEND_PERCENT = "The Initiative/Campaign Budget Spend must be 100%.";
var L3_MSG_INITIATIVE_MY_BUDGET = " The Initiative/Campaign in My Budget can not be found.";
var L3_MSG_INITIATIVE_BUDGET_PERCENT = "The Initiative/Campaign in My Budget percentage should be less than or equal to 100%.";
var L3_MSG_INITIATIVE_SALES_OTHER = "The Initiative/Campaign in Sales Other has not attributes.";
var L3_MSG_INTERLOCK_ENTITY = "Interlock entity can not be found.";
var L3_MSG_INTERLOCK_REQ_RESOURCE = "Interlock request resource and budget can not be found.";
var L3_MSG_INTERLOCK_REQ_BUDGET = "Interlock request budget can not be found.";
var L3_MSG_INTERLOCK_ORGANIZATION = "Interlock organization can not be found.";
var L3_MSG_INTERLOCK_ORGANIZATION_TYPE = "Interlock organization type can not be found.";
var L3_CAMPAIGN_FORECASTING_KPIS_DETAILS = "Campaign Forecasting / KPIS details amount value is not valid.";
var L3_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO = "Campaign Forecasting / KPIS details euro value is not valid.";
var L3_CAMPAIGN_FORECASTING_KPIS_NOT_VALID = "Campaign Forecasting / KPIS is not valid.";
var L3_PARTNER_TYPE_NOT_VALID = "Partner type is not valid.";
var L3_PARTNER_NAME_NOT_FOUND = "Partner name can not be found.";
var L3_PARTNER_REGION_NOT_VALID = "Partner region is not valid.";
var L3_PARTNER_VALUE_NOT_VALID = "Partner value is not valid.";
var L3_CATEGORY_NOT_EMPTY = "Category cannot be empty.";
var L3_CATEGORY_INCORRECT_NUMBER = "Incorrect number of categories.";
var L3_CATEGORY_OPTIONS_NOT_EMPTY = "Category Options cannot be empty.";
var L3_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L3_CATEGORY_OPTION_NOT_VALID = "Option is not valid.";
var L3_CATEGORY_NOT_VALID = "Category is not valid.";
var L3_CATEGORY_TOTAL_PERCENTAGE = "Category total percentage should be less than or equal to 100%.";
var L3_CATEGORY_OPTION = "Error while trying to save Option.";
var L3_CATEGORY_OPTION_NOT_VALID = "Option or User is not valid.";
var L3_MSG_INITIATIVE_COULDNT_CHAGE_STATUS = "Couldn´t change INITIATIVE/CAMPAIGN status due to incomplete data. Please review Budget and Options information";
var L3_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any Campaign type.";
var L3_MY_BUDGET_COMPLETE = "My Budget should be 100% complete.";

var HL4_STATUS = {
    IN_PROGRESS: 1,
    LOAD_DATA_ENTRY: 2,
    IN_CRM: 3,
    UPDATE_IN_CRM: 4,
    EXCEED_BUDGET: 5,
    COMPLETE: 6
};

var INTERLOCK_STATUS = {
    NO_RESPONSE: 1,
    APPROVED: 2,
    REJECTED: 3,
    MORE_INFOR: 4
};

/** ****************END CONSTANTS***************** */

function getHl4(id) {
    var spResult = dataHl4.getHl4(id);
    var result = [];
    spResult.out_result.forEach(function (hl4) {
        var aux = {};
        aux = util.extractObject(hl4);
        aux.CRM_ID = 'CRM-' + hl4.CRM_ID;
        aux.HL4_TOTAL = hl4.HL4_BUDGET;
        aux.TOTAL_HL5 = hl4.TOTAL_HL5;
        aux.QUANTITY_HL5_OUT_BUDGET = hl4.QUANTITY_HL5_OUT_BUDGET;
        aux.ALLOCATED = hl4.ALLOCATED;
        aux.REMAINING = hl4.REMAINING;
        result.push(aux);
    });

    var responseObj = {
        "results": result,
        "total_budget": spResult.out_total_budget,
        "remaining_budget": spResult.out_remaining_budget
    };

    return responseObj;

}

function getHl4ById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "hl4Services/handleGet/getHl4ById", L3_MSG_INITIATIVE_NOT_FOUND);
    try {
        var objHl4 = parseObject(dataHl4.getHl4ById(id));
        var currencyValueAux = dataCurrency.getCurrencyValueId(objHl4.in_euro_conversion_id);
        currencyValueAux = Number(currencyValueAux);
        var partner = partnerLib.getPartnerByHl4Id(id, currencyValueAux);
        partner.partners = parseObject(partner.partners);
        var myBudget = getHl4MyBudgetByHl4Id(id);
        var sale = getHl4SalesByHl4Id(id, currencyValueAux);

        objHl4.in_totalbudget = (Number(objHl4.in_hl4_fnc_budget_total_mkt) + Number(partner.total) / currencyValueAux + Number(sale.total) / currencyValueAux).toFixed(2);

        var hl4 = {
            "hl4": objHl4,
            "interlock": interlockLib.getInterlockByHl4Id(id),
            "expectedOutcomes": expectedOutcomesLib.getExpectedOutcomesByHl4Id(id),
            "partner": partner,
            "hl4_fnc": objHl4,
            "myBudget": myBudget,
            "sale": sale,
            "hl4_category": getHl4CategoryOption(id)
        };

        return hl4;
    } finally {
        db.closeConnection();
    }
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "userServices/handleGet/getUserById", L3_MSG_USER_NOT_FOUND);
    return dbUser.getUserById(id);

}

function getLevel4ForSearch(userSessionID) {
    var result = dataHl4.getLevel4ForSearch(userSessionID, util.isSuperAdmin(userSessionID) ? 1:0);
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

function insertHl4(data, userId) {
    var hl4_id = 0;
    try {
        var transactionOk = true;
        var hl4_budget_regions = true;
        var hl4_budget_subregions = true;
        var hl4_budget_route = true;
        var hl4_sale_regions = true;
        var hl4_sale_subregions = true;
        var hl4_sale_other_regions = true;
        var hl4_sale_other_subregions = true;
        var hl4_sale_other = true;
        var hl4_sale_route = true;
        var hl4_category_option = true;
        var hl4_expected_outcomes = true;
        var hl4_expected_outcomes_detail = true;
        var hl4_partner = true;
        var partnerOK = true;
        var interlockResult = true;

        var validationResult = validateHl4(data);
        data.hl4.in_hl4_status_detail_id = validationResult.statusId;

        if (data.hl4.in_hl4_status_detail_id > 0) {

            data.hl4.in_created_user_id = userId;
            data.hl4.in_is_send_mail = 0;
            data.hl4.in_read_only = 0;

            /********************refactor 03/11/2016*****************************/

            var conversionValue = dataCurrency.getCurrencyValueId(data.hl4_fnc.in_euro_conversion_id);

            data.hl4_fnc.in_in_budget = checkBudgetStatus(data.hl4.in_hl3_id, hl4_id, Number(data.hl4_fnc.in_hl4_fnc_budget_total_mkt));
            data.hl4_fnc.in_hl4_id = hl4_id;
            data.hl4_fnc.in_created_user_id = userId;

            data.hl4_fnc.in_hl4_fnc_budget_spend_q1 = data.hl4.in_is_annual_plan == 0 ? Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q1) : 25;
            data.hl4_fnc.in_hl4_fnc_budget_spend_q2 = data.hl4.in_is_annual_plan == 0 ? Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q2) : 25;
            data.hl4_fnc.in_hl4_fnc_budget_spend_q3 = data.hl4.in_is_annual_plan == 0 ? Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q3) : 25;
            data.hl4_fnc.in_hl4_fnc_budget_spend_q4 = data.hl4.in_is_annual_plan == 0 ? Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q4) : 25;

            data.hl4_fnc.in_hl4_fnc_result_q1 = data.hl4_fnc.in_hl4_fnc_budget_spend_q1;
            data.hl4_fnc.in_hl4_fnc_result_q2 = data.hl4_fnc.in_hl4_fnc_budget_spend_q2;
            data.hl4_fnc.in_hl4_fnc_result_q3 = data.hl4_fnc.in_hl4_fnc_budget_spend_q3;
            data.hl4_fnc.in_hl4_fnc_result_q4 = data.hl4_fnc.in_hl4_fnc_budget_spend_q4;

            data.hl4_fnc.in_hl4_fnc_budget_total_mkt = Number(data.hl4_fnc.in_hl4_fnc_budget_total_mkt);

            data.hl4.in_EURO_CONVERSION_ID = data.hl4_fnc.in_euro_conversion_id;
            data.hl4.in_IN_BUDGET = data.hl4_fnc.in_in_budget;
            data.hl4.in_SPEND_CATEGORY_ID = data.hl4_fnc.in_spend_category_id ? data.hl4_fnc.in_spend_category_id : null;
            data.hl4.in_HL4_FNC_BUDGET_SPEND_Q1 = data.hl4_fnc.in_hl4_fnc_budget_spend_q1;
            data.hl4.in_HL4_FNC_BUDGET_SPEND_Q2 = data.hl4_fnc.in_hl4_fnc_budget_spend_q2;
            data.hl4.in_HL4_FNC_BUDGET_SPEND_Q3 = data.hl4_fnc.in_hl4_fnc_budget_spend_q3;
            data.hl4.in_HL4_FNC_BUDGET_SPEND_Q4 = data.hl4_fnc.in_hl4_fnc_budget_spend_q4;
            data.hl4.in_HL4_FNC_BUDGET_TOTAL_MKT = data.hl4_fnc.in_hl4_fnc_budget_total_mkt;
            /*************************************************/

            data.hl4.in_user_id_send_mail = 1;
            hl4_id = dataHl4.insertHl4(data.hl4);


            if (hl4_id > 0) {
                data.hl4.in_hl4_id = hl4_id;

                if (validationResult.isComplete) {
                    insertHl4CRMBinding(data, 'insert');
                }
                setHl4Status(hl4_id, data.hl4.in_hl4_status_detail_id, userId);
                var hl4_fnc_id = true;

                var outcome = {};
                outcome.in_created_user_id = userId;
                outcome.in_hl4_id = hl4_id;
                outcome.in_comments = data.hl4_expected_outcomes.in_comments || "";
                var hl4_expected_outcomes_id = dataExOut.insertHl4ExpectedOutcomes(outcome);
                hl4_expected_outcomes = (hl4_expected_outcomes_id > 0);
                if (hl4_expected_outcomes) {
                    data.hl4_expected_outcomes.hl4_expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
                        if (hl4_expected_outcomes) {
                            expectedOutcomeDetail.in_created_user_id = userId;
                            expectedOutcomeDetail.in_hl4_expected_outcomes_id = hl4_expected_outcomes_id;
                            expectedOutcomeDetail.in_amount_value = Number(expectedOutcomeDetail.in_amount_value);
                            expectedOutcomeDetail.in_outcomes_id = dataExOut.getExpectedOutcomeLevelByLevelAndOptionId('HL4', expectedOutcomeDetail.in_outcomes_id).EXPECTED_OUTCOME_LEVEL_ID;
                            var hl4_expected_outcomes_detail_id = dataExOut.insertHl4ExpectedOutcomesDetail(expectedOutcomeDetail);
                            hl4_expected_outcomes = hl4_expected_outcomes && (hl4_expected_outcomes_detail_id > 0);
                        }
                    });
                }


                if (data.hl4_budget.regions) {
                    data.hl4_budget.regions.forEach(function (budget_region) {
                        budget_region.in_hl4_id = hl4_id;
                        budget_region.in_created_user_id = userId;
                        var budget_region_id = dataHl4.insertHl4BudgetRegion(budget_region);
                        hl4_budget_regions = hl4_budget_regions && (budget_region_id > 0);
                    });
                }

                if (data.hl4_budget.subregions) {
                    data.hl4_budget.subregions.forEach(function (budget_subregion) {
                        budget_subregion.in_hl4_id = hl4_id;
                        budget_subregion.in_created_user_id = userId;
                        var budget_subregion_id = dataHl4.insertHl4BudgetSubRegion(budget_subregion);
                        hl4_budget_subregions = hl4_budget_regions && (budget_subregion_id > 0);
                    });
                }
                if (data.hl4_budget.routes) {
                    data.hl4_budget.routes.forEach(function (budget_route) {
                        budget_route.in_hl4_id = hl4_id;
                        budget_route.in_created_user_id = userId;
                        var budget_route_id = dataHl4.insertHl4BudgetRoute(budget_route);
                        hl4_budget_route = hl4_budget_regions && (budget_route_id > 0);
                    });
                }

                if (data.hl4_sale.regions) {
                    data.hl4_sale.regions.forEach(function (sale_region) {
                        sale_region.in_hl4_id = hl4_id;
                        sale_region.in_created_user_id = userId;
                        sale_region.in_amount = Number(sale_region.in_amount) / conversionValue;
                        var sale_region_id = dataHl4.insertHl4SaleRegion(sale_region);
                        hl4_sale_regions = hl4_sale_regions && (sale_region_id > 0);
                    });
                }

                if (data.hl4_sale.routes) {
                    data.hl4_sale.routes.forEach(function (sale_route) {
                        sale_route.in_hl4_id = hl4_id;
                        sale_route.in_created_user_id = userId;
                        sale_route.in_amount = Number(sale_route.in_amount) / conversionValue;
                        var sale_route_id = dataHl4.insertHl4SaleRoute(sale_route);
                        hl4_sale_route = hl4_sale_route && (sale_route_id > 0);
                    });
                }

                //sale others
                if (data.hl4_sale.others) {
                    data.hl4_sale.others.forEach(function (other) {
                        other.in_hl4_id = hl4_id;
                        other.in_created_user_id = userId;
                        other.in_amount = Number(other.in_amount) / conversionValue;
                        var sale_other_id = dataHl4.insertHl4SaleOther(other);
                        hl4_sale_other = hl4_sale_other && (sale_other_id > 0);
                    });
                }

                data.partners.forEach(function (partner) {
                    partner.in_created_user_id = userId;
                    partner.in_hl4_id = hl4_id;
                    partner.in_value = Number(partner.in_value) / conversionValue;
                    var partner_id = dataPartner.insertHl4Partner(partner);
                    partnerOK = partnerOK && (partner_id > 0);
                });

                data.hl4_category.forEach(function (hl4Category) {
                    if (hl4Category) {
                        hl4Category.hl4_category_option.forEach(function (hl4CategoryOption) {
                            hl4CategoryOption.in_created_user_id = userId;
                            hl4CategoryOption.in_amount = hl4CategoryOption.in_amount || 0;
                            hl4CategoryOption.in_updated = hl4Category.in_in_processing_report && hl4CategoryOption.in_amount ? 1 : 0;
                            hl4Category.categoryOptionLevelId = dataCategoryOptionLevel.getAllocationOptionLevelByCategoryAndLevelId(hl4Category.in_category_id, 'hl4', hl4CategoryOption.in_option_id).ALLOCATION_CATEGORY_OPTION_LEVEL_ID;
                            hl4_category_option = hl4_category_option && dataCategoryOptionLevel.insertCategoryOption(hl4_id, hl4Category.categoryOptionLevelId, hl4CategoryOption.in_amount, userId, hl4CategoryOption.in_updated, 'HL4');
                        });
                    }
                });

                data.interlock.forEach(function (interlock) {
                    var il = {};
                    il.in_entity_id = interlock.in_entity_id;
                    il.in_hl4_id = hl4_id;
                    il.in_organization_type_id = interlock.organization.type === 'globalTeam' ? 1 :
                        interlock.organization.type === 'region' ? 2 :
                            interlock.organization.type === 'subregion' ? 3 : 0;
                    il.in_requested_resource = interlock.in_requested_resource;
                    il.in_requested_budget = Number(interlock.in_requested_budget);
                    il.in_created_user_id = userId;
                    il.in_interlock_status_id = INTERLOCK_STATUS.NO_RESPONSE;
                    var interlock_id = dataInterlock.insertInterlock(il);
                    var id = null;
                    if ((interlock_id > 0) && !!interlock.organization.id) {
                        var interlock_organization = {};
                        interlock_organization.in_organization_id = interlock.organization.id;
                        interlock_organization.in_interlock_request_id = interlock_id;
                        interlock_organization.in_created_user_id = userId;
                        switch (interlock.organization.type) {
                            case 'globalTeam':
                                id = dataInterlock.insertInterlockRoute(interlock_organization);
                                break;
                            case 'region':
                                id = dataInterlock.insertInterlockRegion(interlock_organization);
                                break;
                            case 'subregion':
                                id = dataInterlock.insertInterlockSubregion(interlock_organization);
                                break;
                        }
                        ;
                    }
                    interlockResult = interlockResult && (interlock_id > 0) && (id > 0);
                    if (interlockResult) {
                        dataInterlock.insertInterlockLogStatus(interlock_id, il.in_interlock_status_id, userId, "");
                        var contactEmails = interlock.in_contact_data.split(";");
                        var contactData = [];
                        contactEmails.forEach(function (email) {
                            contactData.push({'email': email, 'hash': getSYSUUID()});
                        });
                        dataInterlock.insertInterlockContactData(interlock_id, contactData, userId);
                        contactData.forEach(function (contact) {
                            notifyInterlockEmail(contact.email, contact.hash);
                            dataInterlock.setSentMailByHash(contact.hash, userId);
                        });
                    }
                });
                transactionOk = !!hl4_id && !!hl4_fnc_id && hl4_expected_outcomes
                    && hl4_expected_outcomes_detail && hl4_budget_regions && hl4_budget_subregions
                    && hl4_budget_route && hl4_sale_regions && hl4_sale_subregions && hl4_sale_route
                    && hl4_sale_other_regions && hl4_sale_other_subregions && hl4_sale_other && partnerOK
                    && hl4_partner && hl4_category_option && interlockResult;
                if (transactionOk) {
                    db.commit();
                } else {
                    db.rollback();
                    deleteHl4({'in_hl4_id': hl4_id, 'in_user_id': userId}, userId, true);
                    hl4_id = null;
                }
            }
            return hl4_id;
        }
    } catch (e) {
        db.rollback();
        deleteHl4({'in_hl4_id': hl4_id, 'in_user_id': userId}, userId, true);
        throw e;
    }
}

function updateHl4(data, userId) {
    if (!data.hl4.in_hl4_id)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/updateHl4", L3_MSG_INITIATIVE_NOT_FOUND);

    if (!util.validateIsNumber(data.hl4.in_hl4_id))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/updateHl4", L3_MSG_INITIATIVE_NOT_FOUND);

    if (!userId)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/updateHl4", L3_MSG_USER_NOT_FOUND);

    try {

        var hl4_id = null;
        var transactionOk = true;
        var hl4_budget_regions = true;
        var hl4_budget_subregions = true;
        var hl4_budget_route = true;
        var hl4_sale_regions = true;
        var hl4_sale_subregions = true;
        var hl4_sale_other_regions = true;
        var hl4_sale_other_subregions = true;
        var hl4_sale_other = true;
        var hl4_sale_route = true;
        var hl4_category = true;
        var hl4_category_option = true;
        var hl4_expected_outcomes = true;
        var hl4_expected_outcomes_detail = true;
        var hl4_partner = true;
        var partnerOK = true;
        var interlockResult = true;

        var validationResult = validateHl4(data);

        data.hl4.in_hl4_status_detail_id = validationResult.statusId;

        if (data.hl4.in_hl4_status_detail_id > 0) {
            data.hl4.in_user_id = userId;
            data.hl4.in_is_send_mail = 0;
            data.hl4.in_read_only = 0;

            data.hl4.in_user_id_send_mail = 1;

            var hl4 = {};
            hl4.in_hl4_id = data.hl4.in_hl4_id;
            hl4.in_acronym = data.hl4.in_acronym;
            hl4.in_hl4_crm_description = data.hl4.in_hl4_crm_description;
            hl4.in_hl4_details = data.hl4.in_hl4_details;
            hl4.in_hl4_business_details = data.hl4.in_hl4_business_details;
            hl4.in_hl4_status_detail_id = data.hl4.in_hl4_status_detail_id;
            hl4.in_is_send_mail = data.hl4.in_is_send_mail;
            hl4.in_user_id_send_mail = data.hl4.in_user_id_send_mail;
            hl4.in_hl4_parent_id = data.hl4.in_hl4_parent_id;
            hl4.in_read_only = data.hl4.in_read_only;
            hl4.in_is_annual_plan = data.hl4.in_is_annual_plan;
            hl4.in_user_id = userId;


            /********************REFACTOR*************************/
            var conversionValue = dataCurrency.getCurrencyValueId(data.hl4_fnc.in_euro_conversion_id);
            data.hl4_fnc.in_in_budget = checkBudgetStatus(data.hl4.in_hl3_id, data.hl4.in_hl4_id, Number(data.hl4_fnc.in_hl4_fnc_budget_total_mkt));
            data.hl4_fnc.in_hl4_id = data.hl4.in_hl4_id;
            data.hl4_fnc.in_user_id = userId;

            data.hl4_fnc.in_hl4_fnc_budget_spend_q1 = data.hl4.in_is_annual_plan == 0 ? Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q1) : 25;
            data.hl4_fnc.in_hl4_fnc_budget_spend_q2 = data.hl4.in_is_annual_plan == 0 ? Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q2) : 25;
            data.hl4_fnc.in_hl4_fnc_budget_spend_q3 = data.hl4.in_is_annual_plan == 0 ? Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q3) : 25;
            data.hl4_fnc.in_hl4_fnc_budget_spend_q4 = data.hl4.in_is_annual_plan == 0 ? Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q4) : 25;

            data.hl4_fnc.in_hl4_fnc_result_q1 = data.hl4_fnc.in_hl4_fnc_budget_spend_q1;
            data.hl4_fnc.in_hl4_fnc_result_q2 = data.hl4_fnc.in_hl4_fnc_budget_spend_q2;
            data.hl4_fnc.in_hl4_fnc_result_q3 = data.hl4_fnc.in_hl4_fnc_budget_spend_q3;
            data.hl4_fnc.in_hl4_fnc_result_q4 = data.hl4_fnc.in_hl4_fnc_budget_spend_q4;

            data.hl4_fnc.in_hl4_fnc_budget_total_mkt = Number(data.hl4_fnc.in_hl4_fnc_budget_total_mkt);
            hl4.in_EURO_CONVERSION_ID = data.hl4_fnc.in_euro_conversion_id;
            hl4.in_IN_BUDGET = data.hl4_fnc.in_in_budget;
            hl4.in_SPEND_CATEGORY_ID = data.hl4_fnc.in_spend_category_id ? data.hl4_fnc.in_spend_category_id : null;
            hl4.in_HL4_FNC_BUDGET_SPEND_Q1 = data.hl4_fnc.in_hl4_fnc_budget_spend_q1;
            hl4.in_HL4_FNC_BUDGET_SPEND_Q2 = data.hl4_fnc.in_hl4_fnc_budget_spend_q2;
            hl4.in_HL4_FNC_BUDGET_SPEND_Q3 = data.hl4_fnc.in_hl4_fnc_budget_spend_q3;
            hl4.in_HL4_FNC_BUDGET_SPEND_Q4 = data.hl4_fnc.in_hl4_fnc_budget_spend_q4;
            hl4.in_HL4_FNC_BUDGET_TOTAL_MKT = data.hl4_fnc.in_hl4_fnc_budget_total_mkt;

            /**********************************************************/

            hl4_id = data.hl4.in_hl4_id;
            if (validationResult.isComplete) {
                insertHl4CRMBinding(data, 'update');
            }
            var deleteParameters = {"in_hl4_id": hl4_id, "in_user_id": userId};
            var objHL4 = dataHl4.getHl4ById(data.hl4.in_hl4_id);
            var hl4RowsUpdated = dataHl4.updateHl4(hl4);
            if (hl4RowsUpdated > 0) {
                if (objHL4.HL4_FNC_BUDGET_TOTAL_MKT != hl4.in_HL4_FNC_BUDGET_TOTAL_MKT) {
                    level5Lib.checkBudgetStatus(hl4);
                }
                var hl4FncRowsUpdated = true;

                dataExOut.deleteHl4ExpectedOutcomesDetail(deleteParameters);
                dataExOut.deleteHl4ExpectedOutcomes(deleteParameters);
                var outcome = {};
                outcome.in_created_user_id = userId;
                outcome.in_hl4_id = hl4_id;
                outcome.in_comments = data.hl4_expected_outcomes.in_comments || "";
                var hl4_expected_outcomes_id = dataExOut.insertHl4ExpectedOutcomes(outcome);
                hl4_expected_outcomes = (hl4_expected_outcomes_id > 0);
                if (hl4_expected_outcomes) {
                    data.hl4_expected_outcomes.hl4_expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
                        if (hl4_expected_outcomes) {
                            expectedOutcomeDetail.in_created_user_id = userId;
                            expectedOutcomeDetail.in_hl4_expected_outcomes_id = hl4_expected_outcomes_id;
                            expectedOutcomeDetail.in_amount_value = Number(expectedOutcomeDetail.in_amount_value);
                            expectedOutcomeDetail.in_outcomes_id = dataExOut.getExpectedOutcomeLevelByLevelAndOptionId('HL4', expectedOutcomeDetail.in_outcomes_id).EXPECTED_OUTCOME_LEVEL_ID;
                            var hl4_expected_outcomes_detail_id = dataExOut.insertHl4ExpectedOutcomesDetail(expectedOutcomeDetail);
                            hl4_expected_outcomes = hl4_expected_outcomes && (hl4_expected_outcomes_detail_id > 0);
                        }
                    });
                }

                dataHl4.deleteHl4BudgetRegion(deleteParameters);
                if (data.hl4_budget.regions) {
                    data.hl4_budget.regions.forEach(function (budget_region) {
                        budget_region.in_hl4_id = hl4_id;
                        budget_region.in_created_user_id = userId;
                        var budget_region_id = dataHl4.insertHl4BudgetRegion(budget_region);
                        hl4_budget_regions = hl4_budget_regions && (budget_region_id > 0);
                    });
                }

                dataHl4.deleteHl4BudgetSubRegion(deleteParameters);
                if (data.hl4_budget.subregions) {
                    data.hl4_budget.subregions.forEach(function (budget_subregion) {
                        budget_subregion.in_hl4_id = hl4_id;
                        budget_subregion.in_created_user_id = userId;
                        var budget_subregion_id = dataHl4.insertHl4BudgetSubRegion(budget_subregion);
                        hl4_budget_subregions = hl4_budget_regions && (budget_subregion_id > 0);
                    });
                }

                dataHl4.deleteHl4BudgetRoute(deleteParameters);
                if (data.hl4_budget.routes) {
                    data.hl4_budget.routes.forEach(function (budget_route) {
                        budget_route.in_hl4_id = hl4_id;
                        budget_route.in_created_user_id = userId;
                        var budget_route_id = dataHl4.insertHl4BudgetRoute(budget_route);
                        hl4_budget_route = hl4_budget_regions && (budget_route_id > 0);
                    });
                }

                dataHl4.deleteHl4SaleRegion(deleteParameters);
                if (data.hl4_sale.regions) {
                    data.hl4_sale.regions.forEach(function (sale_region) {
                        sale_region.in_hl4_id = hl4_id;
                        sale_region.in_created_user_id = userId;
                        sale_region.in_amount = Number(sale_region.in_amount) / conversionValue;
                        var sale_region_id = dataHl4.insertHl4SaleRegion(sale_region);
                        hl4_sale_regions = hl4_sale_regions && (sale_region_id > 0);
                    });
                }

                dataHl4.deleteHl4SaleRoute(deleteParameters);
                if (data.hl4_sale.routes) {
                    data.hl4_sale.routes.forEach(function (sale_route) {
                        sale_route.in_hl4_id = hl4_id;
                        sale_route.in_created_user_id = userId;
                        sale_route.in_amount = Number(sale_route.in_amount) / conversionValue;
                        var sale_route_id = dataHl4.insertHl4SaleRoute(sale_route);
                        hl4_sale_route = hl4_sale_route && (sale_route_id > 0);
                    });
                }

                //sales other
                dataHl4.deleteHl4SaleOther({"in_hl4_id": hl4_id});
                if (data.hl4_sale.others) {
                    data.hl4_sale.others.forEach(function (other) {
                        other.in_hl4_id = hl4_id;
                        other.in_created_user_id = userId;
                        other.in_amount = Number(other.in_amount) / conversionValue;
                        var sale_other_id = dataHl4.insertHl4SaleOther(other);
                        hl4_sale_other = hl4_sale_other && (sale_other_id > 0);
                    });
                }


                dataPartner.deleteHl4Partner(deleteParameters);
                data.partners.forEach(function (partner) {
                    partner.in_created_user_id = userId;
                    partner.in_hl4_id = hl4_id;
                    partner.in_value = Number(partner.in_value) / conversionValue;
                    var partner_id = dataPartner.insertHl4Partner(partner);
                    partnerOK = partnerOK && (partner_id > 0);
                });

                data.hl4_category.forEach(function (hl4Category) {
                    hl4Category.hl4_category_option.forEach(function (hl4CategoryOption) {
                        hl4CategoryOption.in_amount = hl4CategoryOption.in_amount || 0;
                        hl4CategoryOption.in_updated = hl4CategoryOption.in_updated ? hl4CategoryOption.in_updated : 0;
                        hl4Category.in_category_option_level_id = dataCategoryOptionLevel.getAllocationOptionLevelByCategoryAndLevelId(hl4Category.in_category_id, 'hl4', hl4CategoryOption.in_option_id).ALLOCATION_CATEGORY_OPTION_LEVEL_ID;
                        dataCategoryOptionLevel.updateCategoryOption(hl4Category.in_category_option_level_id, hl4CategoryOption.in_amount, userId, hl4CategoryOption.in_updated, 'HL4');
                    });
                });

                var hl4Interlock = dataInterlock.getInterlockByHl4Id(hl4_id);
                data.interlock.forEach(function (interlock) {
                    if (!interlock.in_interlock_request_id) {

                        var il = {};
                        il.in_entity_id = interlock.in_entity_id;
                        il.in_hl4_id = hl4_id;
                        il.in_organization_type_id = interlock.organization.type === 'globalTeam' ? 1 :
                            interlock.organization.type === 'region' ? 2 :
                                interlock.organization.type === 'subregion' ? 3 : 0;
                        il.in_requested_resource = interlock.in_requested_resource;
                        il.in_requested_budget = Number(interlock.in_requested_budget);
                        il.in_created_user_id = userId;
                        il.in_interlock_status_id = INTERLOCK_STATUS.NO_RESPONSE;

                        var interlock_id = dataInterlock.insertInterlock(il);

                        var id = null;

                        if (interlock_id && interlock.organization.id) {
                            var interlock_organization = {};
                            interlock_organization.in_organization_id = interlock.organization.id;
                            interlock_organization.in_interlock_request_id = interlock_id;
                            interlock_organization.in_created_user_id = userId;
                            switch (interlock.organization.type) {
                                case 'globalTeam':
                                    id = dataInterlock.insertInterlockRoute(interlock_organization);
                                    break;
                                case 'region':
                                    id = dataInterlock.insertInterlockRegion(interlock_organization);
                                    break;
                                case 'subregion':
                                    id = dataInterlock.insertInterlockSubregion(interlock_organization);
                                    break;
                            }
                            ;
                        }

                        interlockResult = interlockResult && interlock_id && id;
                        if (interlockResult) {

                            dataInterlock.insertInterlockLogStatus(interlock_id, il.in_interlock_status_id, userId, "");

                            var contactEmails = interlock.in_contact_data.split(";");
                            var contactData = [];
                            contactEmails.forEach(function (email) {
                                contactData.push({'email': email, 'hash': getSYSUUID()});
                            });
                            dataInterlock.insertInterlockContactData(interlock_id, contactData, userId);
                            contactData.forEach(function (contact) {
                                notifyInterlockEmail(contact.email, contact.hash);
                                dataInterlock.setSentMailByHash(contact.hash, userId);
                            });
                        }
                    }
                });

                var ilToDelete = [];

                if (hl4Interlock && hl4Interlock.length) {
                    hl4Interlock.forEach(function (il) {
                        var deleted = true;
                        var a = 0;
                        data.interlock.forEach(function (interlock) {
                            if (interlock.in_interlock_request_id && interlock.in_interlock_request_id == il.INTERLOCK_REQUEST_ID) {
                                deleted = false;
                            }
                            ;
                        });
                        if (deleted) {
                            ilToDelete.push(il.INTERLOCK_REQUEST_ID);
                        }
                    });
                    ilToDelete.forEach(function (IlId) {
                        dataInterlock.deleteInterlockRouteByIlId(IlId, userId);
                        dataInterlock.deleteInterlockRegionByIlId(IlId, userId);
                        dataInterlock.deleteInterlockSubregionByIlId(IlId, userId);
                        dataInterlock.deleteInterlockContactDataByIlId(IlId, userId);//delete il contact data
                        dataInterlock.deleteInterlockRequestMessageByIlId(IlId, userId);//delete il message
                        dataInterlock.deleteInterlockByIlId(IlId, userId);
                    });
                }
                ;

                transactionOk = !!hl4RowsUpdated && !!hl4FncRowsUpdated && hl4_expected_outcomes && hl4_expected_outcomes_detail && hl4_budget_regions && hl4_budget_subregions && hl4_budget_route && hl4_sale_regions && hl4_sale_subregions && hl4_sale_route && hl4_sale_other_regions && hl4_sale_other_subregions && hl4_sale_other && partnerOK && hl4_partner && hl4_category && hl4_category_option && interlockResult;
                if (transactionOk) {
                    db.commit();
                } else {
                    db.rollback();
                    return null;
                }
            } else {
                db.rollback();
                return null;
            }

            return data;
        }
    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }
}

function deleteHl4(hl4, userId, rollBack) {
    if (!hl4.in_hl4_id && !rollBack)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl4", L3_MSG_INITIATIVE_NOT_FOUND);

    if (!rollBack && !util.validateIsNumber(hl4.in_hl4_id))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl4", L3_MSG_INITIATIVE_NOT_FOUND);

    var userRoleId = Number(dbUserRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    if (!rollBack && userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl4", L3_MSG_NO_PRIVILEGE);

    var hl4StatusId = !rollBack ? Number(dataHl4.getHl4StatusByHl4Id(hl4.in_hl4_id).HL4_STATUS_DETAIL_ID) : 0;
    if (!rollBack && userRoleId !== 1 && (hl4StatusId !== HL4_STATUS.IN_CRM && hl4StatusId !== HL4_STATUS.UPDATE_IN_CRM))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl4", L3_MSG_CANNOT_DEL_STATUS);


    if (!rollBack && dataHl4.getCountHl4Childrens(hl4.in_hl4_id) > 0)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl4", L3_MSG_INITIATIVE_CANT_DEL_CHILD);

    try {
        hl4.in_user_id = userId;
        var transactionOk = true;
        var hl4_id = hl4.in_hl4_id;
        dataPartner.deleteHl4Partner(hl4);
        dataExOut.deleteHl4ExpectedOutcomesDetail(hl4);
        dataExOut.deleteHl4ExpectedOutcomes(hl4);

        dataInterlock.deleteInterlockRoute(hl4);
        dataInterlock.deleteInterlockRegion(hl4);
        dataInterlock.deleteInterlockSubregion(hl4);
        dataInterlock.deleteInterlockContacDataByHl4Id(hl4);
        dataInterlock.deleteInterlockRequestMessageByHl4Id(hl4);
        dataInterlock.deleteInterlock(hl4);
        level4DER.deleteL4ChangedFieldsByHl4Id(hl4_id);

        dataCategoryOptionLevel.deleteCategoryOption(hl4_id, userId, 'HL4');

        //dataHl4.deleteHl4CategoryOption(hl4);
        //dataHl4.deleteHl4Category(hl4);

        dataHl4.deleteHl4BudgetRegion(hl4);
        dataHl4.deleteHl4BudgetSubRegion(hl4);
        dataHl4.deleteHl4BudgetRoute(hl4);
        dataHl4.deleteHl4SaleRegion(hl4);
        //dataHl4.deleteHl4SaleSubRegion(hl4);
        dataHl4.deleteHl4SaleRoute(hl4);
        //TODO: delete deleteHl4SaleOtherRegion & deleteHl4SaleOtherSubRegion
        //dataHl4.deleteHl4SaleOtherRegion(hl4);
        //dataHl4.deleteHl4SaleOtherSubRegion(hl4);
        //sale others
        dataHl4.deleteHl4SaleOther(hl4);
        dataHl4.deleteHl4(hl4);
        db.commit();
    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }

    return hl4;
}

function validateHl4(data) {
    var existInCrm = 0;
    if (!data)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_NOT_FOUND);

    if (!data.hl4.in_hl4_details)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_DETAIL);

    if (!data.hl4.in_hl4_business_details)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_BUSINESS);

    if (!data.hl4.in_acronym)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_ACRONYM);

    // Validate whether Acronym already exists or not

    if (existsHl4inPlan(data.hl4))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_EXISTS);

    // end validate Acronym

    if (data.hl4.in_acronym.length !== 3)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_ACRONYM_LENGTH);

    if (!data.hl4.in_hl4_crm_description)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_CRM_DESCRIPTION);

    if (!data.hl4_fnc)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_BUDGET_DATA);


    if (data.hl4_fnc.in_hl4_fnc_budget_total_mkt < 0)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_BUDGET_VALUE);
    //throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4", data);

    if (data.hl4_fnc.in_euro_conversion_id < 0)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_CURRENCY);
    //throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4", data);

    if (!Number(data.hl4_fnc.in_euro_conversion_id))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_CURRENCY);
    //throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4", data);

    if (!data.hl4_fnc.in_hl4_fnc_budget_spend_q1 && !data.hl4_fnc.in_hl4_fnc_budget_spend_q2 && !data.hl4_fnc.in_hl4_fnc_budget_spend_q3 && !data.hl4_fnc.in_hl4_fnc_budget_spend_q4)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_BUDGET_SPEND);

    var q1 = Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q1) || 0;
    var q2 = Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q2) || 0;
    var q3 = Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q3) || 0;
    var q4 = Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q4) || 0;

    var budgetSpend = q1 + q2 + q3 + q4;

    if (budgetSpend < 100)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_BUDGET_SPEND_PERCENT);

    if (!data.hl4_budget)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_MY_BUDGET);

    var myBudgetComplete = isMyBudgetComplete(data.hl4_budget);

    if (data.hl4_sale) {
        Object.keys(data.hl4_sale).forEach(function (key) {
            data.hl4_sale[key].forEach(function (sale) {
                if (key == "regions") {
                    if (!sale.in_region_id || !Number(sale.in_region_id))
                        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", levelCampaign + " Sales " + key + " can not be found.");
                } else if (key === "routes") {
                    if (!sale.in_route_id || !Number(sale.in_route_id))
                        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", levelCampaign + " Sales " + key + " can not be found. ");
                }
                else {
                    validateSaleOthers(data.hl4_sale[key]);
                }
                if (!Number(sale.in_amount) && sale.in_amount != 0)
                    throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", "The " + levelCampaign + " Sales " + key + " amount (" + sale.in_amount + ") is invalid.");
            });
        });
    }
    ;

    if (data.interlock && data.interlock.length) {
        data.interlock.forEach(function (interlock) {
            if (!interlock.in_entity_id)
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INTERLOCK_ENTITY);
            if (!interlock.in_requested_budget && !interlock.in_requested_resource)
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INTERLOCK_REQ_RESOURCE);
            if (!Number(interlock.in_requested_budget))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INTERLOCK_REQ_BUDGET);
            if (!interlock.organization) {
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INTERLOCK_ORGANIZATION);
            } else {
                if (!interlock.organization.type)
                    throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INTERLOCK_ORGANIZATION_TYPE);
                if (!interlock.organization.id)
                    throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INTERLOCK_ORGANIZATION);
            }

        })
    }

    if (data.hl4_expected_outcomes) {
        if (!data.hl4_expected_outcomes.hl4_expected_outcomes_detail.length && !data.hl4_expected_outcomes.in_comments)
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CAMPAIGN_FORECASTING_KPIS_COMMENT);

        data.hl4_expected_outcomes.hl4_expected_outcomes_detail.forEach(function (hl4ExpectedOutcomesDetail) {
            if (hl4ExpectedOutcomesDetail.in_amount_value != 0 && !Number(hl4ExpectedOutcomesDetail.in_amount_value))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CAMPAIGN_FORECASTING_KPIS_DETAILS);
            if (!hl4ExpectedOutcomesDetail.in_euro_value || !Number(hl4ExpectedOutcomesDetail.in_euro_value))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);
            if (!hl4ExpectedOutcomesDetail.in_outcomes_id || !Number(hl4ExpectedOutcomesDetail.in_outcomes_id))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);
        });
    }

    if (data.partners && data.partners.length) {
        data.partners.forEach(function (partner) {
            if (!partner.in_partner_type_id || !Number(partner.in_partner_type_id))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_PARTNER_TYPE_NOT_VALID);
            if (!partner.in_partner_name)
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_PARTNER_NAME_NOT_FOUND);
            if (!partner.in_region_id || !Number(partner.in_region_id))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_PARTNER_REGION_NOT_VALID);
            if (!partner.in_value || !Number(partner.in_value))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_PARTNER_VALUE_NOT_VALID);
        });
    }

    if (!data.hl4_category)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_NOT_EMPTY);

    if (!data.hl4.in_hl4_id && data.hl4_category.length !== dataCategory.getAllocationCategoryCountByHlId('hl4'))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_INCORRECT_NUMBER);

    var categoryOptionComplete = isCategoryOptionComplete(data);

    var statusId = null;

    if (data.hl4.in_hl4_id) {
        if (data.hl4.in_hl4_status_detail_id != HL4_STATUS.IN_PROGRESS && !myBudgetComplete)
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MY_BUDGET_COMPLETE);

        existInCrm = dataHl4.existsInCrm(data.hl4.in_hl4_id);

        var objHL4 = dataHl4.getHl4ById(data.hl4.in_hl4_id);
        if (existInCrm && data.hl4.in_acronym.toUpperCase() != objHL4.ACRONYM.toUpperCase()) {
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_IN_CRM);

        }
        var categoryHasChanged = categoryChanged(data, existInCrm);
        var crmFieldsHasChanged = crmFieldsHaveChanged(data);

        if (!crmFieldsHasChanged && !categoryHasChanged)
            statusId = data.hl4.in_hl4_status_detail_id;
        else
            statusId = HL4_STATUS.IN_PROGRESS;
        //statusId = !crmFieldsHaveChanged(data) && categoryOptionComplete && myBudgetComplete && !hasDeReportFields.length? HL4_STATUS.IN_CRM : HL4_STATUS.IN_PROGRESS;
    } else {
        statusId = HL4_STATUS.IN_PROGRESS;
    }
    return {statusId: statusId, isComplete: categoryOptionComplete && myBudgetComplete};
}

//TODO:09/01/2017
function categoryChanged(data, existInCrm) {
    var optionChange = false;
    //obtain the CATEGORY options in bd
    var hl4_categoryBD = getHl4CategoryOption(data.hl4.in_hl4_id);
    var optionChange = CompareCategories(data.hl4_category, hl4_categoryBD, existInCrm);
    return optionChange;
}


/***************************************/
//Verify if mount of option change
//Option1: option from UI
//Option2: option from DB
function CompareOptions(Option1, Option2, existInCrm) {
    Option1.in_updated = 1;

    if (Number(Option1.in_amount) && Option2.in_updated) return !!Option1.in_updated;

    if ((!Number(Option1.in_amount) && !Number(Option2.in_amount)) ||
        (!Number(Option1.in_amount) && Number(Option2.in_amount) && !existInCrm) ||
        (Number(Option1.in_amount) && Number(Option2.in_amount) && Number(Option1.in_amount) == Number(Option2.in_amount)))
        Option1.in_updated = 0;

    return !!Option1.in_updated;
}

function getOptionFromList(listOptions, OptionId) {
    for (var i = 0; i < listOptions.length; i++) {
        var option = listOptions[i];
        //throw JSON.stringify(option);
        if (option.in_option_id === OptionId) {
            return option;
        }
    }
    return null;
}

function CompareListOptions(ListOption1, ListOption2, existInCrm) {
    var flag = false;
    for (var i = 0; i < ListOption1.length; i++) {
        var option = ListOption1[i];
        //throw JSON.stringify(option);
        flag = CompareOptions(option, getOptionFromList(ListOption2, option.in_option_id), existInCrm) || flag;
    }
    return flag;
}

function getCategoryFromList(listCategory, categoryId) {
    for (var i = 0; i < listCategory.length; i++) {
        var category = listCategory[i];
        //throw JSON.stringify(category);
        if (category.in_category_id === categoryId) {
            return category;
        }
    }
    return null;
}

function CompareCategoryOption(Category1, Category1_id, ListCategories, existInCrm) {
    var Category2 = getCategoryFromList(ListCategories, Category1_id);
    return CompareListOptions(Category1.hl4_category_option, Category2.hl4_category_option, existInCrm)
}

function CompareCategories(ListCategories1, ListCategories2, existInCrm) {

    var flag = false;
    for (var i = 0; i < ListCategories1.length; i++) {
        var category = ListCategories1[i];
        var actualCategory = dataCategory.getCategoryById(category.in_category_id, 'hl4');
        if (actualCategory.IN_PROCESSING_REPORT)
            flag = CompareCategoryOption(category, category.in_category_id, ListCategories2, existInCrm) || flag;
    }
    return flag;
}


function isMyBudgetComplete(hl4_budget) {
    var hl4MyBudgetKeys = Object.keys(hl4_budget);
    var myBudgetTotalPercentage = 0;
    var myBudgetComplete = false;
    var percentage = 0;
    hl4MyBudgetKeys.forEach(function (hl4MyBudgetKey) {
        if (hl4_budget[hl4MyBudgetKey] && hl4_budget[hl4MyBudgetKey].length) {
            hl4_budget[hl4MyBudgetKey].forEach(function (myBudget) {
                if (hl4MyBudgetKey == "regions") {
                    if (!myBudget.in_region_id || !Number(myBudget.in_region_id))
                        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", levelCampaign + " in My Budget " + hl4MyBudgetKey + " can not be found.");
                } else if (hl4MyBudgetKey == "routes") {
                    if (!myBudget.in_route_id || !Number(myBudget.in_route_id))
                        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", levelCampaign + " in My Budget " + hl4MyBudgetKey + " can not be found.");
                }
                if (!myBudget.PERCENTAGE && !Number(myBudget.in_percentage) && myBudget.in_percentage != 0)
                    throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", levelCampaign + " in My Budget " + hl4MyBudgetKey + " can not be found.");
                percentage = myBudget.in_percentage;

                if (myBudget.PERCENTAGE)
                    percentage = myBudget.PERCENTAGE;

                myBudgetTotalPercentage = myBudgetTotalPercentage + Number(percentage);
            });
        }
    });

    if (myBudgetTotalPercentage > 100)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_BUDGET_PERCENT);
    if (myBudgetTotalPercentage < 100)
        myBudgetTotalPercentage = 0;

    myBudgetComplete = !!myBudgetTotalPercentage;
    return myBudgetComplete;
}

function isCategoryOptionComplete(data) {
    var categoryOptionComplete = false;
    for (var i = 0; i < data.hl4_category.length; i++) {
        var hl4Category = data.hl4_category[i];
        var percentagePerOption = 0;
        if (!hl4Category.in_category_id || !Number(hl4Category.in_category_id))
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_NOT_VALID);

        if (!hl4Category.hl4_category_option.length)
            percentagePerOption = 100;

        if (!data.hl4.in_hl4_id && hl4Category.hl4_category_option.length !== dataOption.getAllocationOptionCountByCategoryIdLevelId(hl4Category.in_category_id, 'hl4'))
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl4Category.hl4_category_option.forEach(function (option) {
            if (!option.in_option_id || !Number(option.in_option_id))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.in_amount) && !Number(option.in_amount)) || Number(option.in_amount) > 100 || Number(option.in_amount) < 0)
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", "Option value is not valid (actual value " + option.in_amount + ")");

            percentagePerOption = percentagePerOption + Number(option.in_amount);

        });
        if (percentagePerOption > 100) {
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_TOTAL_PERCENTAGE);
        } else if (percentagePerOption < 100) {
            categoryOptionComplete = false;
            break;
        } else {
            categoryOptionComplete = true;
        }
    }
    return categoryOptionComplete;
}

function validateSaleOthers(others) {
    var keys = ['in_description', 'in_amount'];
    var valid = true;
    if (others) {
        others.forEach(function (obj) {
            keys.forEach(function (key) {
                if (obj[key] === null || obj[key] === undefined) {
                    throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4"
                        , L3_MSG_INITIATIVE_SALES_OTHER);
                } else {
                    // validate attribute type
                    if (key === "in_description")
                        valid = obj[key].length > 0;
                    else if (key === "in_amount") {
                        if (Number(obj[key]) !== 0)
                            valid = Number(obj[key]);
                    }

                    if (!valid)
                        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4"
                            , "The " + levelCampaign + " in Sales Other " + obj.in_description + " amount (" + obj.in_amount + ") is invalid ");
                }
            });
        });
    }
    return valid;
}


function getLevel4ByAcronym(acronym, hl2_id) {
    return dataHl4.getHl4ByAcronym(acronym, hl2_id);
}

function existsHl4inPlan(objHL4) {
    var hl3 = dataHl3.getLevel3ById({IN_HL3_ID: objHL4.in_hl3_id});
    var hl4 = getLevel4ByAcronym(objHL4.in_acronym, hl3.HL2_ID);
    return !!(hl4.HL4_ID && Number(hl4.HL4_ID) !== Number(objHL4.in_hl4_id));
}

function existsInCrm(objHL4, data) {
    var existInCrm = dataHl4.existsInCrm(objHL4.in_hl4_id);
    // TODO: data.hl4.in_acronym != hl4.ACRONYM
    if (existInCrm && data.hl4.in_acronym != objHL4.ACRONYM)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_IN_CRM);

}

function checkBudgetStatus(objHl3, hl4_id, new_hl4_budget) {
    if (!hl4_id) hl4_id = 0;
    if (Number(objHl3) && (new_hl4_budget || new_hl4_budget == 0)) {
        var objHl = {};
        objHl.IN_HL3_ID = Number(objHl3) ? objHl3 : objHl3.IN_HL3_ID;
        objHl.IN_HL4_ID = hl4_id;
        var hl3 = dataHl3.getLevel3ById(objHl);
        var hl3AllocatedBudget = dataHl3.getHl3AllocatedBudget(objHl.IN_HL3_ID, hl4_id);
        return (Number(hl3.HL3_FNC_BUDGET_TOTAL) - Number(hl3AllocatedBudget) - Number(new_hl4_budget)) >= 0 ? 1 : 0;
    } else {
        var result = {};
        result.out_result = 0;
        //lists of hl4 changed to send email to client
        result.emailListInBudget = [];
        result.emailListOutBudget = [];

        var resultHl4 = dataHl4.getHl4(objHl3.IN_HL3_ID);// GET_HL4_BY_HL3_ID
        if (resultHl4) {
            var total = 0;

            for (var i = 0; i < resultHl4.out_result.length; i++) {
                if (objHl3.IN_HL3_FNC_BUDGET_TOTAL < total + parseFloat(resultHl4.out_result[i].HL4_BUDGET)) {
                    dataHl4.updateHl4BudgetStatus(resultHl4.out_result[i].HL4_ID, 0);
                    //store hl4id and users to be send email when register change to in budget
                    result.emailListOutBudget.push(resultHl4.out_result[i]);
                } else {
                    dataHl4.updateHl4BudgetStatus(resultHl4.out_result[i].HL4_ID, 1);
                    total = total + parseFloat(resultHl4.out_result[i].HL4_BUDGET);
                    //store hl4id and users to be send email when register change to in budget
                    result.emailListInBudget.push(resultHl4.out_result[i]);
                }
            }
            result.out_result = resultHl4.out_result.length;
        }
        return result;
    }
}

/* Function to set HL4 status */
function setHl4Status(hl4_id, status_id, userId) {
    try {
        var updateOK = null;

        if (hl4_id && status_id && userId) {
            var changeHL4tatus = dataHl4.changeStatusHl4(hl4_id, status_id, userId).out_result_hl4;
            var insertHL4LogStatus = dataHl4.insertHl4LogStatus(hl4_id, status_id, userId);
            if (!!changeHL4tatus && !!insertHL4LogStatus) {
                updateOK = changeHL4tatus;
                if (HL4_STATUS.IN_CRM == status_id) {
                    if (level4DER.deleteL4ChangedFieldsByHl4Id(hl4_id) !== null) {
                        resetHl4CategoryOptionUpdated(hl4_id, userId);
                        db.commit();
                    } else {
                        updateOK = false;
                        db.rollback();
                    }

                } else {
                    db.commit();
                }
            } else {
                updateOK = false;
                db.rollback();
            }
        }

        return updateOK;
    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }
}

function resetHl4CategoryOptionUpdated(hl4Id, userId) {
    dataCategoryOptionLevel.resetHl4CategoryOptionUpdated(hl4Id, 'hl4', userId);

    /*var hl4Categories = dataHl4.getHl4Category(hl4Id);
     hl4Categories.forEach(function(hl4Category){
     dataHl4.resetHl4CategoryOptionUpdated(hl4Id, userId);
     });*/
    return true;
}

/* Set HL4 status to In CRM */
function setHl4StatusInCRM(hl4_id, userId) {
    return setHl4Status(hl4_id, HL4_STATUS.IN_CRM, userId);
}

function changeHl4StatusOnDemand(hl4_id, userId) {
    var hl4_category = getHl4CategoryOption(hl4_id);
    var myBudget = getHl4MyBudgetByHl4Id(hl4_id);

    var isComplete = isMyBudgetComplete(myBudget) && isCategoryOptionComplete({
            hl4_category: hl4_category,
            hl4: {in_hl4_id: hl4_id}
        });

    if (!isComplete)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePut/changeHl4Status", L3_MSG_INITIATIVE_COULDNT_CHAGE_STATUS);

    var existInCrm = dataHl4.existsInCrm(hl4_id);

    var statusId = existInCrm ? HL4_STATUS.UPDATE_IN_CRM
        : HL4_STATUS.LOAD_DATA_ENTRY;

    return setHl4Status(hl4_id, statusId, userId);
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

function getHl4CategoryOption(hl4Id) {
    var hl4Categories = dataCategoryOptionLevel.getAllocationCategory(hl4Id, 'hl4');
    //throw JSON.stringify(hl4Categories);
    var result = [];
    hl4Categories.forEach(function (catgory) {
        var aux = util.extractObject(catgory);
        var hl4Category = {};
        aux["hl4_category_option"] = dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(aux.CATEGORY_ID, 'hl4', hl4Id);
        //throw JSON.stringify(aux);
        hl4Category.hl4_category_option = [];
        Object.keys(aux).forEach(function (key) {
            if (key === "hl4_category_option") {
                for (var i = 0; i < aux[key].length; i++) {
                    var option = {};
                    Object.keys(aux[key][i]).forEach(function (auxKey) {
                        option["in_" + auxKey.toLowerCase()] = aux[key][i][auxKey];
                    });
                    hl4Category.hl4_category_option.push(option);
                }
            } else {
                hl4Category["in_" + key.toLowerCase()] = aux[key];
            }
        });
        result.push(hl4Category);
    });
    return result;
}

function getHl4MyBudgetByHl4Id(id) {
    var myBudgets = dataHl4.getHl4MyBudgetByHl4Id(id);
    var hl4MyBudgetKeys = Object.keys(myBudgets);
    var myBudgetTotalPercentage = 0;
    var aux = {};
    hl4MyBudgetKeys.forEach(function (hl4MyBudgetKey) {
        aux["in_" + hl4MyBudgetKey.toLowerCase()] = myBudgets[hl4MyBudgetKey];
        myBudgets[hl4MyBudgetKey].forEach(function (myBudget) {
            myBudgetTotalPercentage = myBudgetTotalPercentage + Number(myBudget.PERCENTAGE);
        });
    });
    aux.total = myBudgetTotalPercentage;
    return aux;
}

function getHl4SalesByHl4Id(id, currencyValue) {
    var sales = dataHl4.getHl4SalesByHl4Id(id);
    var hl4SalesKeys = Object.keys(sales);
    var totalAmount = 0;
    var aux = {};
    hl4SalesKeys.forEach(function (hl4SalesKey) {
        sales[hl4SalesKey] = JSON.parse(JSON.stringify(sales[hl4SalesKey]));
        aux["in_" + hl4SalesKey.toLowerCase()] = sales[hl4SalesKey];
        sales[hl4SalesKey].forEach(function (sale) {
            sale.AMOUNT = (Number(sale.AMOUNT) * Number(currencyValue)).toFixed(2);
            totalAmount = totalAmount + Number(sale.AMOUNT);
        });
    });
    aux.total = totalAmount;
    return aux;
}

function insertHl4CRMBinding(hl4, action) {
    /************refactor 04112016***********/
    /*TODO: review next code ******/

    var crmBindingFields = {
        "hl4": ["ACRONYM",
            "HL4_CRM_DESCRIPTION",
            "HL4_DETAILS",
            "HL4_BUSINESS_DETAILS",
            "PARENT_PATH"],
        "hl4_fnc": ["HL4_FNC_BUDGET_TOTAL_MKT"]
    };

    var deReportDisplayName = {
        "ACRONYM": "Acronym",
        "HL4_CRM_DESCRIPTION": "CRM description",
        "HL4_DETAILS": "Initiative/Campaign details",
        "HL4_BUSINESS_DETAILS": "Business value",
        "HL4_FNC_BUDGET_TOTAL_MKT": "Budget",
        "PARENT_PATH": "Parent"
    };

    var existInCrm = dataHl4.existsInCrm(hl4.hl4.in_hl4_id);

    if (action == 'insert') {
        level4DER.deleteL4ChangedFieldsByHl4Id(hl4.hl4.in_hl4_id);
        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var parameters = {
                    "in_hl4_id": hl4.hl4.in_hl4_id,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": hl4.hl4.in_created_user_id,
                    "in_display_name": deReportDisplayName[field]
                };
                dataHl4.insertHl4CRMBinding(parameters);
            });
        });

    } else if (action == 'update') {
        var oldHl4 = getHl4ById(hl4.hl4.in_hl4_id);
        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                if (field != "PARENT_PATH") {
                    var parameters = {
                        "in_hl4_id": hl4.hl4.in_hl4_id,
                        "in_column_name": field,
                        "in_changed": 1,
                        "in_user_id": hl4.hl4.in_user_id,
                        "in_display_name": deReportDisplayName[field]
                    };
                    if (!existInCrm) {
                        var in_hl4_crm_binding_id = dataL4DER.getL4ChangedFieldsByHl4IdByField(hl4.hl4.in_hl4_id, field)[0] ? dataL4DER.getL4ChangedFieldsByHl4IdByField(hl4.hl4.in_hl4_id, field)[0].ID : null;
                        if (in_hl4_crm_binding_id) {
                            parameters.in_hl4_crm_binding_id = in_hl4_crm_binding_id;
                            dataHl4.updateHl4CRMBinding(parameters);
                        } else {
                            dataHl4.insertHl4CRMBinding(parameters);
                        }
                    } else {
                        if (oldHl4[object]["in_" + field.toLowerCase()] != hl4[object]["in_" + field.toLowerCase()]) {
                            var in_hl4_crm_binding_id = dataL4DER.getL4ChangedFieldsByHl4IdByField(hl4.hl4.in_hl4_id, field)[0] ? dataL4DER.getL4ChangedFieldsByHl4IdByField(hl4.hl4.in_hl4_id, field)[0].ID : null;
                            if (in_hl4_crm_binding_id) {
                                parameters.in_hl4_crm_binding_id = in_hl4_crm_binding_id;
                                dataHl4.updateHl4CRMBinding(parameters);
                            } else {
                                dataHl4.insertHl4CRMBinding(parameters);
                            }
                        }
                    }
                }
            });
        });
    }
}

function crmFieldsHaveChanged(hl4) {
    crmFieldsHaveChanged = false;

    /************refactor 04112016***********/
    /*TODO: review next code ******/

    var crmBindingFields = {
        "hl4": ["ACRONYM",
            "HL4_CRM_DESCRIPTION",
            "HL4_DETAILS",
            "HL4_BUSINESS_DETAILS"],
        "hl4_fnc": ["HL4_FNC_BUDGET_TOTAL_MKT"]
    };

    var oldHl4 = getHl4ById(hl4.hl4.in_hl4_id);
    Object.keys(crmBindingFields).forEach(function (object) {
        crmBindingFields[object].forEach(function (field) {
            if (oldHl4[object]["in_" + field.toLowerCase()] != hl4[object]["in_" + field.toLowerCase()]) {
                crmFieldsHaveChanged = true;
            }
        });
    });
    return crmFieldsHaveChanged;
}

function parseObject(data) {
    if (Array.isArray(data)) {
        var collection = [];
        data.forEach(function (obj) {
            var object = {};
            Object.keys(obj).forEach(function (key) {
                object["in_" + key.toLowerCase()] = obj[key];
            });
            collection.push(object);
        });
        return collection;
    } else {
        var object = {};
        Object.keys(data).forEach(function (key) {
            object["in_" + key.toLowerCase()] = data[key];
        });
        return object;
    }

}
//event is "Created" or "Updated"
function notifyChangeByEmail(data, userId, event) {

    var Hl3Id = data.hl4.in_hl3_id;
    var HL3 = level3BL.getLevel3ById(Hl3Id);
    var ownerId = HL3.CREATED_USER_ID;
    var Owner = userBL.getUserById(ownerId);
    var user = userBL.getUserById(userId);
    var path = pathBL.getPathByLevelParentToCRM(4, Hl3Id).PATH_TPH;

    var body = ' <p> Dear Colleague </p>  <p>The User : ' + userBL.getUserById(userId).USER_NAME + ' has set the Initiative/Campaign ' + path + ' for you.</p>  <p>Click on the ' + config.getAppUrl() + ' to review</p>';
    var mailObject = mail.getJson([{
        "address": Owner[0].EMAIL
    }], "Marketing Planning Tool - Level 4 " + event, body);

    var rdo = mail.sendMail(mailObject, true);


}

function sendProcessingReportEmail(hl4Id) {
    var objHl3 = {};
    var appUrl = config.getAppUrl();

    var hl4 = dataHl4.getHl4ById(hl4Id);
    objHl3.IN_HL3_ID = hl4.HL3_ID;
    var hl3 = dataHl3.getLevel3ById(objHl3);
    var hl3OwnerEmail = getUserById(hl3.CREATED_USER_ID).EMAIL;

    var body = '<p> Dear Colleague </p>';
    body += '<p>An initiative has been created in CRM.</p><br>';
    body += '<p>' + appUrl + '/TeamPlanHierarchy/Level3/edit/' + hl4.HL3_ID + '/' + hl4Id + '</p>';


    var mailObject = mail.getJson([{
        "address": hl3OwnerEmail
    }], "Marketing Planning Tool - Interlock Process", body);

    mail.sendMail(mailObject, true);
}

function notifyInterlockEmail(TO, token) {
    var appUrl = config.getAppUrl();
    var body = '<p> Dear Colleague </p>';
    body += '<p>An interlock request has been created and needs your approval. Please follow the link: </p>';
    body += '<p>' + appUrl + '/#InterlockManagement/' + token + '</p>';
    var mailObject = mail.getJson([{
        "address": TO
    }], "Marketing Planning Tool - Interlock Process", body);

    mail.sendMail(mailObject, true);
}

function checkPermission(userSessionID, method, hl4Id){
    if(((method && method == "GET_BY_HL3_ID") || !method) && !util.isSuperAdmin(userSessionID)){
        var hl4 = dataHl4.getHl4ById(hl4Id);
        var usersL3 = userbl.getUserByHl3Id(hl4.HL3_ID).users_in;
        var users = usersL3.find(function(user){return user.USER_ID == userSessionID});
        if(!users){
            throw ErrorLib.getErrors().CustomError("","level3/handlePermission","User hasn´t permission for this resource.");
        }
    }
}