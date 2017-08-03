$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataBudgetSpendRequest = mapper.getDataBudgetSpendRequest();
var dataBudgetReport = mapper.getDataBudgetSpendReport();
/** ***********END INCLUDE LIBRARIES*************** */
var BUDGET_SPEND_REQUEST_ORIGIN = {
    BUDGET_REQUESTOR: 1,
    BUDGET_APPROVER: 2
};

var HIERARCHY_LEVEL = {
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};

var ORGANIZATION_TYPE = {
    REGIONAL: 1,
    CENTRAL: 2,
    OTHER: 3
};

var BUDGET_SPEND_REQUEST_TYPE = {
    OWN_MONEY: 1,
    CO_FUNDING_EXTERNAL: 2,
    CO_FUNDING_INTERNAL: 3
};

var BUDGET_SPEND_REQUEST_STATUS = {
    'PENDING': 1,
    'APPROVED': 2,
    'NO_LONGER_REQUESTED': 3,
    'REJECTED': 4
};

var L2_ID_MISSING = "Team ID was not found.";

var DEFAULT_DELETE_MESSAGE = "Budget Spend Request deleted by user.";

function getBudgetSpendRequestsStatus() {
    return BUDGET_SPEND_REQUEST_STATUS;
}

function getL2BudgetApproverByL2Id(l2Id) {
    if (!l2Id || !Number(l2Id))
        throw ErrorLib
            .getErrors()
            .CustomError(
                "",
                "budgetSpendRequestServices/handleGet/getL2BudgetApproverByL2Id",
                L2_ID_MISSING);

    return dataBudgetSpendRequest.getL2BudgetApproverByL2Id(l2Id);
}

function insertL2BudgetApprover(l2Id, budgetApproverIds, userId) {
    if(budgetApproverIds && budgetApproverIds.length){
        var l2BudgetApproverToInsert = budgetApproverIds.map(function (elem) {
            return {
                in_hl2_id: l2Id,
                in_budget_approver_id: elem.USER_ID,
                in_user_id: userId
            };
        });
        return dataBudgetSpendRequest
            .insertL2BudgetApprover(l2BudgetApproverToInsert);
    }
    return true;
}

function insertOwnMoneyBudgetSpendRequest(amount, id, level, userId, budgetRequestApproved) {
    var message = 'Own money Budget Request';

    var budgetSpendRequestId = dataBudgetSpendRequest.insertBudgetSpendRequest(
        amount, id, level, message, BUDGET_SPEND_REQUEST_TYPE['OWN_MONEY'],
        budgetRequestApproved ? BUDGET_SPEND_REQUEST_STATUS['APPROVED']
            : BUDGET_SPEND_REQUEST_STATUS['PENDING'], userId);

    /*var arrBudgetSpendRequestMessage = [];
    arrBudgetSpendRequestMessage.push({
        in_budget_spend_request_id: budgetSpendRequestId,
        in_message: message,
        in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
        in_user_id: userId
    });*/

    return 1; // dataBudgetSpendRequest.insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessage,
    // level);
}

function insertSalesBudgetSpendRequest(sales, id, level, conversionValue, userId) {
    var aux = {};
    var arrSaleHl = [];
    sales
        .forEach(function (sale) {
            if (!aux[sale.ORGANIZATION_ID]
                && !aux[sale.ORGANIZATION_ID] != sale.ORGANIZATION_TYPE) {
                arrSaleHl
                    .push({
                        in_hl_id: id,
                        in_organization_id: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] !== 3 ? sale.ORGANIZATION_ID
                            : null,
                        in_organization_type: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE]
                    });
                aux[sale.ORGANIZATION_ID] = sale.ORGANIZATION_TYPE;
            }
        });

    // look for SALES ID
    var hlSales = dataBudgetSpendRequest
        .getSalesByHlIdOrganizationIdOrganizationType(arrSaleHl, level);

    arrSaleHl = [];
    var arrBudgetSpendRequestMessage = [];

    sales
        .forEach(function (sale) {
            if (Number(sale.AMOUNT) && sale.MESSAGE) {
                var budgetSpendRequestId = dataBudgetSpendRequest
                    .insertBudgetSpendRequest(
                        Number(sale.AMOUNT) / conversionValue,
                        id,
                        level,
                        sale.MESSAGE,
                        BUDGET_SPEND_REQUEST_TYPE['CO_FUNDING_INTERNAL'],
                        BUDGET_SPEND_REQUEST_STATUS['PENDING'],
                        userId);
                hlSales
                    .forEach(function (hlSale) {
                        if (hlSale.ORGANIZATION_TYPE_ID == ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE]
                            && hlSale.ORGANIZATION_ID == sale.ORGANIZATION_ID) {
                            arrSaleHl
                                .push({
                                    in_hl_sale_id: hlSale.HL_SALES_ID,
                                    in_budget_spend_request_id: budgetSpendRequestId,
                                    in_user_id: userId
                                });
                        }
                    });
                arrBudgetSpendRequestMessage
                    .push({
                        in_budget_spend_request_id: budgetSpendRequestId,
                        in_message: sale.MESSAGE,
                        in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
                        in_user_id: userId
                    });
            }
        });
    if (arrBudgetSpendRequestMessage.length)
        dataBudgetSpendRequest
            .insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessage);

    if (arrSaleHl.length)
        return dataBudgetSpendRequest.insertSaleBudgetSpendRequest(arrSaleHl,
            level);

    return null;
}

function updateSalesBudgetSpendRequest(sales, id, level, conversionValue, userId) {
    var arrBudgetSpendRequestToUpdate = [];
    var arrBudgetSpendRequestMessageToInsert = [];
    var arrBudgetSpendRequestMessageToUpdate = [];
    var arrSaleHl = [];

    sales
        .forEach(function (sale) {
            if (Number(sale.AMOUNT) && sale.MESSAGE) {
                var budgetSpendRequestId = sale.BUDGET_SPEND_REQUEST_ID;
                var insertMessage = false;
                if (!sale.BUDGET_SPEND_REQUEST_ID) {
                    insertMessage = true;
                    budgetSpendRequestId = dataBudgetSpendRequest
                        .insertBudgetSpendRequest(
                            Number(sale.AMOUNT) / conversionValue,
                            id,
                            level,
                            sale.MESSAGE,
                            BUDGET_SPEND_REQUEST_TYPE['CO_FUNDING_INTERNAL'],
                            BUDGET_SPEND_REQUEST_STATUS['PENDING'],
                            userId);
                    arrSaleHl.push({
                        in_hl_sale_id: sales.HL5_SALE_ID || sale.HL_SALES_ID,
                        in_budget_spend_request_id: budgetSpendRequestId,
                        in_user_id: userId
                    });
                } else {
                    arrBudgetSpendRequestToUpdate.push({
                        in_budget_spend_request_id: budgetSpendRequestId,
                        in_amount: Number(sale.AMOUNT) / conversionValue,
                        in_message: sale.MESSAGE,
                        in_user_id: userId
                    });
                }
                var message = {
                    in_budget_spend_request_id: budgetSpendRequestId,
                    in_message: sale.MESSAGE,
                    in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
                    in_user_id: userId
                };

                if (insertMessage) {
                    arrBudgetSpendRequestMessageToInsert.push(message);
                } else {
                    arrBudgetSpendRequestMessageToUpdate.push(message);
                }
            }
        });
    if (arrBudgetSpendRequestToUpdate.length)
        dataBudgetSpendRequest
            .updateBudgetSpendRequest(arrBudgetSpendRequestToUpdate);

    if (arrBudgetSpendRequestMessageToInsert.length)
        dataBudgetSpendRequest
            .insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessageToInsert);

    if (arrBudgetSpendRequestMessageToUpdate.length)
        dataBudgetSpendRequest
            .updateBudgetSpendRequestMessage(arrBudgetSpendRequestMessageToUpdate);

    if(arrSaleHl.length)
        dataBudgetSpendRequest.insertSaleBudgetSpendRequest(arrSaleHl, level);
    return 1;
}

function insertPartnerBudgetSpendRequest(value, message, id, level, conversionValue, userId) {
    var arrBudgetSpendRequestMessage = [];
    var budgetSpendRequestId = dataBudgetSpendRequest.insertBudgetSpendRequest(
        value / conversionValue, id, level, message,
        BUDGET_SPEND_REQUEST_TYPE['CO_FUNDING_EXTERNAL'],
        BUDGET_SPEND_REQUEST_STATUS['PENDING'], userId);
    arrBudgetSpendRequestMessage
        .push({
            in_budget_spend_request_id: budgetSpendRequestId,
            in_message: message,
            in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
            in_user_id: userId
        });

    dataBudgetSpendRequest
        .insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessage);

    return budgetSpendRequestId;
}

function updateBudgetSpendRequest(budgetSpendRequest, userId, externalCall) {

    if (externalCall) {
        var arrBudgetSpendRequestMessageToUpdate = [];
        budgetSpendRequest
            .forEach(function (request) {
                arrBudgetSpendRequestMessageToUpdate
                    .push({
                        in_budget_spend_request_id: request.in_budget_spend_request_id,
                        in_message: request.in_message,
                        in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
                        in_user_id: userId
                    });
            });

        if (arrBudgetSpendRequestMessageToUpdate.length)
            dataBudgetSpendRequest
                .updateBudgetSpendRequestMessage(arrBudgetSpendRequestMessageToUpdate);
    }

    return dataBudgetSpendRequest.updateBudgetSpendRequest(budgetSpendRequest);
}

function deleteBudgetSpendRequestBySale(arrSaleToDelete, level) {
    var aux = JSON.parse(JSON.stringify(arrSaleToDelete));
    deleteBudgetSpendRequest(arrSaleToDelete);
    return dataBudgetSpendRequest
        .deleteBudgetSpendRequestBySale(aux,level);
}

function deleteBudgetSpendRequest(budgetSpendRequests) {
    var arrBudgetSpendRequestMessageToInsert = budgetSpendRequests
        .map(function (request) {
            return {
                in_budget_spend_request_id: request.in_budget_spend_request_id,
                in_message: DEFAULT_DELETE_MESSAGE,
                in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
                in_user_id: request.in_user_id
            }
        });

    dataBudgetSpendRequest
        .insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessageToInsert);

    budgetSpendRequests.forEach(function(bsr){
        bsr.in_status_id = BUDGET_SPEND_REQUEST_STATUS.NO_LONGER_REQUESTED;
    });

    return dataBudgetReport.deleteBudgetSpendRequest(budgetSpendRequests);
}

function deleteL2BudgetApprover(l2Id, budgetApproverIds) {
    var l2BudgetApproverToDelete = [];
    if(budgetApproverIds){
        budgetApproverIds.forEach(function (elem) {
            l2BudgetApproverToDelete.push({
                in_user_id: elem.USER_ID
            });
        });

        return dataBudgetSpendRequest.deleteL2BudgetApprover(l2Id,
            l2BudgetApproverToDelete);
    }
    else
        return true;
}

function validateApprovers(listApprovers) {
    var approvers = dataBudgetSpendRequest.getAllApprovers();
}

function checkCountBudgetSpendRequestByHlIdLevel(hlId, level) {
    if (!hlId)
        throw ErrorLib
            .getErrors()
            .BadRequest(
                "The ID was not found",
                "budgetSpendRequestServices/handleGet/checkCountBudgetSpendRequestByHlIdLevel",
                L5_MSG_INITIATIVE_NOT_FOUND);

    if (!level)
        throw ErrorLib
            .getErrors()
            .BadRequest(
                "The Level ID was not found",
                "budgetSpendRequestServices/handleGet/checkCountBudgetSpendRequestByHlIdLevel",
                L5_MSG_INITIATIVE_NOT_FOUND);

    var budgetSpendRequests = dataBudgetSpendRequest
        .getAllBudgetSpendRequestByHlIdAndLevel(hlId, level);

    var countCoFundingRequest = 0;
    budgetSpendRequests
        .forEach(function (request) {
            if (request.BUDGET_SPEND_REQUEST_TYPE_ID != BUDGET_SPEND_REQUEST_TYPE.OWN_MONEY
                && request.BUDGET_SPEND_REQUEST_STATUS_ID != BUDGET_SPEND_REQUEST_STATUS.NO_LONGER_REQUESTED
                && request.BUDGET_SPEND_REQUEST_STATUS_ID != BUDGET_SPEND_REQUEST_STATUS.REJECTED)
                countCoFundingRequest = +1;
        });
    return !!countCoFundingRequest;
}

function getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(hlId, level) {
    if (!hlId)
        throw ErrorLib
            .getErrors()
            .BadRequest(
                "The ID was not found",
                "budgetSpendRequestServices/handleGet/checkCountBudgetSpendRequestByHlIdLevel",
                L5_MSG_INITIATIVE_NOT_FOUND);

    if (!level)
        throw ErrorLib
            .getErrors()
            .BadRequest(
                "The Level ID was not found",
                "budgetSpendRequestServices/handleGet/checkCountBudgetSpendRequestByHlIdLevel",
                L5_MSG_INITIATIVE_NOT_FOUND);

    var budgetSpendRequests = dataBudgetSpendRequest
        .getAllBudgetSpendRequestByHlIdAndLevel(hlId, level);

    var budgetSpendRequestType = null;
    budgetSpendRequests
        .forEach(function (request) {
            if (request.BUDGET_SPEND_REQUEST_TYPE_ID == BUDGET_SPEND_REQUEST_TYPE.OWN_MONEY)
                budgetSpendRequestType = request.BUDGET_SPEND_REQUEST_STATUS_ID;
        });

    return budgetSpendRequestType;
}

function updateOwnMoneyBudgetSpendRequestByHlIdLevel(hlId, level, amount, budgetRequestApproved, userId) {
    return dataBudgetSpendRequest.updateBudgetSpendRequestByHlIdLevelType(hlId,
        HIERARCHY_LEVEL[level], amount, BUDGET_SPEND_REQUEST_TYPE.OWN_MONEY,
        budgetRequestApproved ? BUDGET_SPEND_REQUEST_STATUS['APPROVED']
            : BUDGET_SPEND_REQUEST_STATUS['PENDING'], userId);
}

function countPendingBudgetRequestByHl5Id(hl5Id) {
    if (!hl5Id)
        throw ErrorLib
            .getErrors()
            .BadRequest(
                "The HL5 ID was not found",
                "budgetSpendRequestServices/handleGet/getPendingBudgetRequestByHl5Id",
                L5_MSG_INITIATIVE_NOT_FOUND);

    try {
        return dataBudgetSpendRequest
            .getHl5CountBudgetSpendRequestByBudgetRequestStatus(hl5Id,
                BUDGET_SPEND_REQUEST_STATUS['PENDING'], HIERARCHY_LEVEL['HL5']);
    } catch (e) {
        throw e;
    }
}

function countPendingBudgetRequestByHl6Id(hl6Id) {
    if (!hl6Id)
        throw ErrorLib
            .getErrors()
            .BadRequest(
                "The HL6 ID was not found",
                "budgetSpendRequestServices/handleGet/getPendingBudgetRequestByHl6Id",
                L6_MSG_INITIATIVE_NOT_FOUND);

    try {
        return dataBudgetSpendRequest
            .getHl6CountBudgetSpendRequestByBudgetRequestStatus(hl6Id,
                BUDGET_SPEND_REQUEST_STATUS['PENDING'], HIERARCHY_LEVEL['HL6']);
    } catch (e) {
        throw e;
    }
}

function setBudgetSpendRequestStatusNoLongerRequested(hlId, level, userId){
    return setBudgetSpendRequestStatus(hlId, level, userId, BUDGET_SPEND_REQUEST_STATUS.NO_LONGER_REQUESTED);
}

function setBudgetSpendRequestStatus(hlId, level, userId, status){
    var budgetSpendRequests = dataBudgetSpendRequest
        .getAllBudgetSpendRequestByHlIdAndLevel(hlId, level);

    var arrBudgSpendStatus = [];
    var arrBudgSpendStatusLog = [];
    var arrBudgetSpendRequestMessage = [];

    budgetSpendRequests.forEach(function (request) {
        arrBudgSpendStatus.push({
            in_budget_spend_request_id: request.BUDGET_SPEND_REQUEST_ID
            , in_status_id: status
            , in_user_id: userId
        });
        arrBudgetSpendRequestMessage.push({
                in_budget_spend_request_id: request.BUDGET_SPEND_REQUEST_ID,
                in_message: DEFAULT_DELETE_MESSAGE,
                in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
                in_user_id: userId
        });

        arrBudgSpendStatusLog.push({
            in_budget_spend_request_id: request.BUDGET_SPEND_REQUEST_ID
            ,in_status_id: request.BUDGET_SPEND_REQUEST_STATUS_ID
            ,in_created_user_id: userId
        });
    });

    if(arrBudgSpendStatus.length){
        dataBudgetReport.insertBudgetSpendRequestStatusLog(arrBudgSpendStatusLog);
        dataBudgetSpendRequest.insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessage);
        dataBudgetReport.deleteBudgetSpendRequest(arrBudgSpendStatus);
    }
    return true;
}