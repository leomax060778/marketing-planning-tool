/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataExpectedOutcomesLevel = mapper.getDataExpectedOutcomeLevel();
var ErrorLib = mapper.getErrors();
var db = mapper.getdbHelper();
/** ********************************************** */

var HIERARCHY_LEVEL = {
    L3: 4,
    L4: 1,
    L5: 2,
    L6: 3
};

function updateExpectedOutcomesLevel(parameters, modifiedUserId) {
    var level = parameters.IN_LEVEL;
    var hlId = HIERARCHY_LEVEL[level];
    var expectedOutcomeId = parameters.IN_EXPECTED_OUTCOME_ID;
    var optionList = parameters.IN_OPTION_LIST;

    if (!hlId)
        throw ErrorLib.getErrors().CustomError("",
            "expectedOutcomesLevelServices/handlePost/updateExpectedOutcomesLevel",
            "Hierarchy Level is invalid");

    if (!expectedOutcomeId)
        throw ErrorLib.getErrors().CustomError("",
            "expectedOutcomesLevelServices/handlePost/updateExpectedOutcomesLevel",
            "The Expected Outcome is not found");

    var resultTransaction = 0;
    dataExpectedOutcomesLevel.delExpectedOutcomeLevel(expectedOutcomeId, hlId, modifiedUserId);
    for (var i = 0; i < optionList.length; i++) {
        var optionId = optionList[i];
        try
        {
            var count = dataExpectedOutcomesLevel.getOutcomesLevelCountByOutcomesOptionAndLevelId(expectedOutcomeId, hlId, optionId);
            if(count <= 0)
                resultTransaction = dataExpectedOutcomesLevel.insExpectedOutcomeLevel(expectedOutcomeId, optionId, hlId, modifiedUserId);
        }
        catch(e){
            throw e;
        }
    }
    return resultTransaction;
}

function getExpectedOutcomeLevelIdByOptionNameAndLevelId(optionName, levelId){
    return dataExpectedOutcomesLevel.getExpectedOutcomeLevelIdByOptionNameAndLevelId(optionName, levelId);
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