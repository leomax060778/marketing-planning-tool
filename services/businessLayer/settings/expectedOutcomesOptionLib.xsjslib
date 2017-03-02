/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataExpectedOutcomeOption = mapper.getDataExpectedOutcomeOption();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/
var EXPECTED_OUTCOME_OPTION_NOT_FOUND = "Option can not be found.";
var EXPECTED_OUTCOME_OPTION_NAME_NOT_FOUND = "Option Name not found";
var EXPECTED_OUTCOME_OPTION_IN_USE = "Option can not be deleted because it is in use.";
var EXPECTED_OUTCOME_OPTION_ALREADY_EXIST = "An Option with the same Name already exist.";
var HIERARCHY_LEVEL_INVALID = "Invalid hierarchy level.";

var HIERARCHY_LEVEL = {
    L3: 4,
    L4: 1,
    L5: 2,
    L6: 3
};

var map = {
    'IN_EXPECTED_OUTCOME_OPTION_ID': 'EXPECTED_OUTCOME_OPTION_ID',
    'IN_NAME': 'EXPECTED_OUTCOME_OPTION_NAME',
    'IN_HL': ''
};

function getAllOption() {
    return dataExpectedOutcomeOption.getAllExpectedOutcomeOption();
}

function getOptionById(expectedOutcomeOptionId) {
    if (!expectedOutcomeOptionId)
        throw ErrorLib.getErrors().CustomError("",
            "expectedOutcomeOptionServices/handleget/getExpectedOutcomeOptionrById",
            EXPECTED_OUTCOME_OPTION_NOT_FOUND);

    return dataExpectedOutcomeOption.getOptionById(expectedOutcomeOptionId);
}

function getOptionByExpectedOutcomeAndLevelId(expectedOutcomeId, hl){
    var options = {};
    if (!expectedOutcomeId)
        throw ErrorLib.getErrors().CustomError("",
            "expectedOutcomeOptionServices/handleget/getOptionByExpectedOutcomeAndLevelId",
            EXPECTED_OUTCOME_OPTION_NOT_FOUND);

    if(!HIERARCHY_LEVEL[hl])
        throw ErrorLib.getErrors().CustomError("",
            "expectedOutcomeOptionServices/handleget/getOptionByExpectedOutcomeAndLevelId",
            HIERARCHY_LEVEL_INVALID);
    options.availables = dataExpectedOutcomeOption.getAvailablesOptionByExpectedOutcomeAndLevelId(expectedOutcomeId, HIERARCHY_LEVEL[hl]);
    options.assigned = dataExpectedOutcomeOption.getAssignedOptionByExpectedOutcomeAndLevelId(expectedOutcomeId, HIERARCHY_LEVEL[hl]);

    return options;
}

function insertOption(expectedOutcomeOption, userId) {
    expectedOutcomeOption = uiToServerParser(expectedOutcomeOption);
    validate(expectedOutcomeOption);
    return dataExpectedOutcomeOption.insExpectedOutcomeOption(expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_NAME, userId);

}

function updateOption(expectedOutcomeOption, userId) {
    expectedOutcomeOption = uiToServerParser(expectedOutcomeOption);
    if (!expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_ID || !Number(expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_ID))
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomesOptionServices/handlePut/updateOption", EXPECTED_OUTCOME_OPTION_NOT_FOUND);

    validate(expectedOutcomeOption);
    return dataExpectedOutcomeOption.updExpectedOutcomeOption(expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_ID, expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_NAME, userId);
}

function deleteOption(expectedOutcomeOption, userId) {
    expectedOutcomeOption = uiToServerParser(expectedOutcomeOption);
    if (!expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_ID || !Number(expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_ID))
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomesOptionServices/handleDelete/deleteOption", EXPECTED_OUTCOME_OPTION_NOT_FOUND);

    if (dataExpectedOutcomeOption.getExpectedOutcomeOptionInUseByExpectedOutcomeOptionId(expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_ID).length)
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomesOptionServices/handleDelete/deleteOption", EXPECTED_OUTCOME_OPTION_IN_USE);

    return dataExpectedOutcomeOption.delExpectedOutcomeOption(expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_ID, userId);
}

function validate(expectedOutcomeOption) {
    if (!expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_NAME)
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomesOptionServices/handlePost/validateExpectedOutcomeOption", EXPECTED_OUTCOME_OPTION_NAME_NOT_FOUND);

    var expectedOutcomeFromDb = dataExpectedOutcomeOption.getExpectedOutcomeOptionByName(expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_NAME);
    if (expectedOutcomeFromDb && expectedOutcomeFromDb.EXPECTED_OUTCOME_OPTION_ID && expectedOutcomeFromDb.EXPECTED_OUTCOME_OPTION_ID != expectedOutcomeOption.EXPECTED_OUTCOME_OPTION_ID)
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomesOptionServices/handlePost/validateExpectedOutcomeOption", EXPECTED_OUTCOME_OPTION_ALREADY_EXIST);

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