/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataExpectedOutcome = mapper.getDataExpectedOutcome();
var dataExpectedOutcomeLevel = mapper.getDataExpectedOutcomeLevel();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/
var EXPECTED_OUTCOMES_NOT_FOUND = "Expected Outcomes can not be found.";
var EXPECTED_OUTCOME_NAME_NOT_FOUND = "Expected Outcome Name not found";
var EXPECTED_OUTCOME_IN_USE = "Expected Outcome can not be deleted because it is in use.";
var EXPECTED_OUTCOME_ALREADY_EXIST = "A Expected Outcome with the same Name already exist.";

var map = {
    'IN_EXPECTED_OUTCOME_ID': 'EXPECTED_OUTCOME_ID',
    'IN_NAME': 'EXPECTED_OUTCOME_NAME'
};

function getAllExpectedOutcomes() {
    return dataExpectedOutcome.getAllExpectedOutcomes();
}

function getExpectedOutcomeById(expectedOutcomeId) {
    if (!expectedOutcomeId)
        throw ErrorLib.getErrors().CustomError("",
            "expectedOutcomeServices/handleget/getExpectedOutcomeById",
            EXPECTED_OUTCOMES_NOT_FOUND);
    return dataExpectedOutcome.getExpectedOutcomeById(expectedOutcomeId);
}

function insertExpectedOutcome(expectedOutcome, userId) {
    expectedOutcome = uiToServerParser(expectedOutcome);
    validate(expectedOutcome);

    return dataExpectedOutcome.insertExpectedOutcome(expectedOutcome.EXPECTED_OUTCOME_NAME, userId);
}

function updateExpectedOutcome(expectedOutcome, userId) {
    expectedOutcome = uiToServerParser(expectedOutcome);
    if (!expectedOutcome.EXPECTED_OUTCOME_ID || !Number(expectedOutcome.EXPECTED_OUTCOME_ID))
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handlePut/updateExpectedOutcome", EXPECTED_OUTCOMES_NOT_FOUND);

    validate(expectedOutcome);
    return dataExpectedOutcome.updateExpectedOutcome(expectedOutcome.EXPECTED_OUTCOME_ID, expectedOutcome.EXPECTED_OUTCOME_NAME, userId);
}

function deleteExpectedOutcome(expectedOutcome, userId) {
    expectedOutcome = uiToServerParser(expectedOutcome);
    if (!expectedOutcome.EXPECTED_OUTCOME_ID || !Number(expectedOutcome.EXPECTED_OUTCOME_ID))
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handleDelete/deleteExpectedOutcome", EXPECTED_OUTCOMES_NOT_FOUND);

    if (dataExpectedOutcome.getExpectedOutcomeInUseByExpectedOutcomeId(expectedOutcome.EXPECTED_OUTCOME_ID).length)
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handleDelete/deleteExpectedOutcome", EXPECTED_OUTCOME_IN_USE);

    return dataExpectedOutcome.deleteExpectedOutcome(expectedOutcome.EXPECTED_OUTCOME_ID, userId);
}

function validate(expectedOutcome) {
    if (!expectedOutcome.EXPECTED_OUTCOME_NAME)
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handlePost/validateExpectedOutcome", EXPECTED_OUTCOME_NAME_NOT_FOUND);

    var expectedOutcomeFromDb = dataExpectedOutcome.getExpectedOutcomeByName(expectedOutcome.EXPECTED_OUTCOME_NAME);
    if (expectedOutcomeFromDb && expectedOutcomeFromDb.EXPECTED_OUTCOME_ID != expectedOutcome.EXPECTED_OUTCOME_ID)
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handlePost/validateExpectedOutcome", EXPECTED_OUTCOME_ALREADY_EXIST);

    return true;
}

function uiToServerParser(object) {
    var data = JSON.stringify(object, function (key, value) {
        if (Array.isArray(value)) {
            return value;
        } else if (value && typeof value === 'object') {
            var replacement = {};
            Object.keys(value).forEach(function (k) {
                replacement[map[k] || k] = value[k];
            });
            return replacement;
        }
        return value;
    });

    data = JSON.parse(data);

    return data;
}

function getOutcomesLevelByOptionNameOutcomeIdAndLevelId(optionName, expectedOutcomeId, hlName){
    return dataExpectedOutcomeLevel.getOutcomesLevelByOptionNameOutcomeIdAndLevelId(optionName, expectedOutcomeId, hlName);
}

function getExpectedOutcomesByHl4Id(hl4_id){
    var expectedOutcomes = dataExpectedOutcome.getExpectedOutcomeByHl4Id(hl4_id);
    var result = [];
    expectedOutcomes.forEach(function(eo){
        var aux = util.extractObject(eo);
        aux["detail"] = dataExpectedOutcome.getExpectedOutcomeDetailById(aux.HL4_EXPECTED_OUTCOMES_ID);
        result.push(aux);
    });
    return result[0];
}

function getExpectedOutcomesByHl5Id(hl5_id){
    var expectedOutcomes = dataExpectedOutcome.getExpectedOutcomeByHl5Id(hl5_id);
    var result = [];
    expectedOutcomes.forEach(function(eo){
        var aux = util.extractObject(eo);
        aux["detail"] = dataExpectedOutcome.getHl5ExpectedOutcomeDetailById(aux.HL5_EXPECTED_OUTCOMES_ID);
        result.push(aux);
    });
    return result[0];
}

function getExpectedOutcomesByHl6Id(hl6_id){
    var expectedOutcomes = dataExpectedOutcome.getExpectedOutcomeByHl6Id(hl6_id);
    var result = [];
    expectedOutcomes.forEach(function(eo){
        var aux = util.extractObject(eo);
        aux["detail"] = dataExpectedOutcome.getHl6ExpectedOutcomeDetailById(aux.HL6_EXPECTED_OUTCOMES_ID);
        result.push(aux);
    });
    return result[0];
}