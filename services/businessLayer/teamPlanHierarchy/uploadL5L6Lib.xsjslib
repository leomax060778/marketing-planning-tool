$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataUploadL5L6 = mapper.getDataUploadL5L6();
var util = mapper.getUtil();
var categoryLib = mapper.getAllocationCategoryLib();
var expectedLib = mapper.getExpectedOutcomesOptionLib();
var ErrorLib = mapper.getErrors();
var blLevel5 = mapper.getLevel5();
var blLevel6 = mapper.getLevel6();
var blcurrency = mapper.getCurrency();
var dataL4 = mapper.getDataLevel4();
var dataL5 = mapper.getDataLevel5();
/** ***********END INCLUDE LIBRARIES*************** */

var MSG_HL4_NOT_FOUND = "Hl4 not found.";
var MSG_HL5_NOT_FOUND = "Hl5 not found.";
var MSG_FK_MAP_NOT_FOUND = "Foreign key map, not found.";
var MSG_NOT_FOUND = ", not found.";
var MSG_INVALID_DATE_FORMAT = "Invalid date format";
var MSG_RECORD_WITHOUT_PARENT = "This record does not have a value parent.";
var MSG_ACRONYM_NOT_FOUND = "Acronym does not match with Parent.";
//Mapper//
var map = {};
var mapKPY = {};
var mapCategory = {};

//map to asosciate hierarchy_level_id and business layer method to create new l5 or l6
var mapInsertHierarchyLevelInsert = {
 2: blLevel5.insertHl5FromUpload,
 3: blLevel6.insertHl6FromUpload
 }

//get map excel upload file configuration for static relation between field on database tables and excel column header
function getMapHLExcel() {
    return dataUploadL5L6.getMapHLExcel();

}

//get object value from map from a key
function getValue(element_key) {
    return map.filter(function (elem) {
        return elem.COLUMN_NAME == element_key
    })[0];
}

//define a map for all expected outcomes options on database
//the main fields are:
//TYPE: 0 to L5, 1 to L6
//MAP_L5_L6_ID: unique expected outcome option id
//CSV_COLUMN_NAME: column name in csv file related to expected outcome option with the same name in database
//COLUMN_NAME: Same as above field
//DATA_TYPE: needed to cast use or custom handler
//FOREIGN_TABLE_NAME: Referenced table (only for static configuration)
//FOREIGN_COLUMN_REFERENCE: Referenced field in above table needed to extract value (only for static configuration)
//FOREIGN_COLUMN_FILTER: needed table column name to find foreign register
function getMapKPY() {
    var rdo = [];
    var expectedOutcomes = expectedLib.getAllExpectedOutcomeOptionIncludeDeleted();
    expectedOutcomes.forEach(function (exp) {

        var objL5 = {};
        objL5.MAP_L5_L6_ID = exp.expected_outcome_option_id;
        objL5.TYPE = 0;
        objL5.COLUMN_NAME = exp.NAME;
        objL5.CSV_COLUMN_NAME = exp.NAME;
        objL5.DATA_TYPE = "decimal";
        objL5.FOREIGN_TABLE_NAME = "";
        objL5.FOREIGN_COLUMN_REFERENCE = "";
        objL5.FOREIGN_COLUMN_FILTER = "";
        objL5.OTHER_CONDITION = "";

        var objL6 = {};
        objL6.MAP_L5_L6_ID = exp.expected_outcome_option_id;
        objL6.TYPE = 1;
        objL6.COLUMN_NAME = exp.NAME;
        objL6.CSV_COLUMN_NAME = exp.NAME;
        objL6.DATA_TYPE = "decimal";
        objL6.FOREIGN_TABLE_NAME = "";
        objL6.FOREIGN_COLUMN_REFERENCE = "";
        objL6.FOREIGN_COLUMN_FILTER = "";
        objL6.OTHER_CONDITION = "";

        rdo.push(objL5);
        rdo.push(objL6);
    });
    mapKPY = rdo;
    return rdo;
}

//define a map for all categories on database
//the main fields are:
//TYPE: 0 to L5, 1 to L6
//MAP_L5_L6_ID: unique id category
//CSV_COLUMN_NAME: column name related to category with the same name
//COLUMN_NAME: Same as above field
//DATA_TYPE: needed to cast use or custom handler
//FOREIGN_TABLE_NAME: Referenced table (only for static configuration)
//FOREIGN_COLUMN_REFERENCE: Referenced field in above table needed to extract value (only for static configuration)
//FOREIGN_COLUMN_FILTER: needed table column name to find foreign register
function getMapCategories() {
    var rdo = [];
    var categories = categoryLib.getAllAllocationCategory();
    categories.forEach(function (cat) {

        var objL5 = {};
        objL5.MAP_L5_L6_ID = cat.CATEGORY_ID;
        objL5.TYPE = 0;
        objL5.COLUMN_NAME = cat.NAME;
        objL5.CSV_COLUMN_NAME = cat.NAME;
        objL5.DATA_TYPE = "decimal";
        objL5.FOREIGN_TABLE_NAME = "";
        objL5.FOREIGN_COLUMN_REFERENCE = "";
        objL5.FOREIGN_COLUMN_FILTER = "";

        var objL6 = {};
        objL6.MAP_L5_L6_ID = cat.CATEGORY_ID;
        objL6.TYPE = 1;
        objL6.COLUMN_NAME = cat.NAME;
        objL6.CSV_COLUMN_NAME = cat.NAME;
        objL6.DATA_TYPE = "decimal";
        objL6.FOREIGN_TABLE_NAME = "";
        objL6.FOREIGN_COLUMN_REFERENCE = "";
        objL6.FOREIGN_COLUMN_FILTER = "";

        rdo.push(objL5);
        rdo.push(objL6);
    });
    mapCategory = rdo;
    return rdo;
}

//create a complete map with Excel, Categories and expected outcomes (KPI)
function getMapHLExcelComplete() {
    var rdo = this.getMapHLExcel();
    //concat is slower, but easier to read
    //rdo = rdo.concat(getMapCategories());
    //rdo = rdo.concat(getMapKPY());
    //uncomment for faster concat!
    Array.prototype.push.apply(rdo, getMapCategories());
    Array.prototype.push.apply(rdo, getMapKPY());
    map = rdo;
    return rdo;
}

//check if is a category by name
function isCategory(key) {
    for (var i = 0; i < mapCategory.length; i++) {
        var category = mapCategory[i];
        if (category.COLUMN_NAME == key) {
            return true;
        }
    }
    return false;
}

//insert dictionary register in database
function insertDictionaryL5L6(payload, userId) {

    for (var i = 0; i < payload.length; i++) {

        var path = payload[i]["ACRONYM"];
        var level = payload[i]["OBJECT_TYPE"];

        Object.keys(payload[i]).forEach(function (key) {
            if (key != "ACRONYM" && key != "OBJECT_TYPE") {
                dataUploadL5L6.insertDictionaryL5L6(path, key, payload[i][key], level, userId);
            }
        });
    }
    return true;
}

function getForeignId(tableName, columnReference, columnFilter, findValue, otherCondition) {
    return dataUploadL5L6.getForeignId(tableName, columnReference, columnFilter, findValue, otherCondition);
}

//get all distinct path from dictionary L5 and L6
function getAllPathFromDictionary(userId){
    var result={};
        result.hl5 = getHL5PathFromDictionary(userId);
        result.hl6 = getHL6PathFromDictionary(userId);
        result.IMPORT_ID = dataUploadL5L6.insertImport("", userId);
    return result;
}

//get all distinct path from dictionary for level 5
function getHL5PathFromDictionary(userId){
    return dataUploadL5L6.getHL5PathFromDictionary(userId);
}

//get all distinct path from dictionary for level 6
function getHL6PathFromDictionary(userId){
    return dataUploadL5L6.getHL6PathFromDictionary(userId);
}

//
function processor(userId, arrayPaths,IMPORT_ID) {
    var HLs = [];

    //initialize map
    getMapHLExcelComplete();

    arrayPaths.forEach(function (obj) {

        try {
            var hl = {};
            hl.IMPORT_ID = IMPORT_ID;
            hl.categories = [];
            hl.expectedOutcomes = [];
            hl.expected_outcomes_detail = [];

            //get all row by each path
            var row = dataUploadL5L6.getDataFromDictionaryByPath(obj.PATH, userId);
            var budget = 0;

            if (validate(row)) {
                row.forEach(function (cell) {

                    var fieldMapper = getValue(cell.KEY_L5_L6);

                    if(cell.HIERARCHY_LEVEL_ID)
                        hl.HIERARCHY_LEVEL_ID = cell.HIERARCHY_LEVEL_ID;

                    if (cell.KEY_L5_L6 == 'HL5_ID' || cell.KEY_L5_L6 == 'HL4_ID'){
                        hl.PARENT = cell.VALUE_L5_L6;
                    }
                        
                    //complete all foreign Key
                    if (fieldMapper && fieldMapper.FOREIGN_TABLE_NAME) {//IS A FOREIGN KEY
                        var value = getForeignId(
                            fieldMapper.FOREIGN_TABLE_NAME,
                            fieldMapper.FOREIGN_COLUMN_REFERENCE,
                            fieldMapper.FOREIGN_COLUMN_FILTER,
                            fieldMapper.DATA_TYPE == 'KPI' ? fieldMapper.CSV_COLUMN_NAME : cell.VALUE_L5_L6,
                            fieldMapper.OTHER_CONDITION)[fieldMapper.FOREIGN_COLUMN_REFERENCE];

                            if(fieldMapper.DATA_TYPE == 'KPI') {
                                var kpi={};
                                kpi.VOLUME_VALUE = 0;
                                kpi.EURO_VALUE = 0;
                                if(fieldMapper.CSV_COLUMN_NAME.toLowerCase().indexOf("volume") >= 0) {
                                    kpi.VOLUME_VALUE = cell.VALUE_L5_L6;
                                }
                                else {
                                    kpi.EURO_VALUE = cell.VALUE_L5_L6;
                                }
                                kpi.EXPECTED_OUTCOME_OPTION_ID = value;
                                hl.expected_outcomes_detail.push(kpi);
                            }

                            hl[cell.KEY_L5_L6] = value;

                    } else {
                        if (isCategory(cell.KEY_L5_L6)) {
                            var objCat = processCategory(cell);
                            if (objCat)
                                hl.categories.push(objCat);
                        } else if (cell.KEY_L5_L6 == 'SHOW_ON_DG_CALENDAR') {
                            var showOnCalendar = cell.VALUE_L5_L6.replace("\r", "");
                            if (showOnCalendar.indexOf("X") < 0)
                                hl[cell.KEY_L5_L6] = 0;
                            else
                                hl[cell.KEY_L5_L6] = 1;
                        }
                        else if (cell.KEY_L5_L6 == 'BUDGET') {
                            budget = Number(parseNumberBudget(cell.VALUE_L5_L6));
                            if (!processDistributionComplete(row, budget)) {
                                var error = ErrorLib.getErrors().ImportError("","uploadL5L6Lib/Processor/","Distribution budget is not complete.");
                                error.row = row;
                                //error.details = "Distribution budget is not complete.";
                                throw error;
                            }
                            hl[cell.KEY_L5_L6] = budget;
                        }
                        else if (cell.KEY_L5_L6 == 'BUDGET_SPEND_Q1'
                            || cell.KEY_L5_L6 == 'BUDGET_SPEND_Q2'
                            || cell.KEY_L5_L6 == 'BUDGET_SPEND_Q3'
                            || cell.KEY_L5_L6 == 'BUDGET_SPEND_Q4'
                        ) {
                            hl[cell.KEY_L5_L6] = processDistribution(row, budget, cell.KEY_L5_L6);
                        }
                        else if (cell.KEY_L5_L6 == 'PLANNED_START_DATE'
                            || cell.KEY_L5_L6 == 'PLANNED_END_DATE'
                            || cell.KEY_L5_L6 == 'ACTUAL_START_DATE'
                            || cell.KEY_L5_L6 == 'ACTUAL_END_DATE'
                        ) {
                            var newDate = cell.VALUE_L5_L6;
                            if(!new Date(newDate).valueOf()) {
                                var error = ErrorLib.getErrors().ImportError("","uploadL5L6Lib/processor/",MSG_INVALID_DATE_FORMAT);
                                error.row = row;
                                //error.detail = MSG_INVALID_DATE_FORMAT;
                                throw error;
                            }
                            hl[cell.KEY_L5_L6] = (new Date(newDate)).toISOString();
                        }
                        else {
                            hl[cell.KEY_L5_L6] = cell.VALUE_L5_L6;
                        }
                    }
                });

                //set acronym to L5 or L6
                if(hl.HIERARCHY_LEVEL_ID == 2) {
                    //get last piece of path separete with "_" or "-"
                    if (obj.PATH.indexOf("_") === -1){
                        if (obj.PATH.indexOf(hl.PARENT) >= 0){
                            hl.ACRONYM = obj.PATH.substring(hl.PARENT.length);
                        } else {
                            //var error = ErrorLib.getErrors().ImportError("","uploadL5L6Lib/processor",MSG_ACRONYM_NOT_FOUND);
                            var error = ErrorLib.getErrors().ImportError("","path: "+obj.PATH +" parent: "+hl.PARENT
                                ,MSG_ACRONYM_NOT_FOUND);
                            error.row = row;
                            throw error;
                        }
                    }
                    else {
                        var auxAcronym = obj.PATH.split("_");
                        hl.ACRONYM = auxAcronym[auxAcronym.length - 1];
                    }

                }
                else{
                    if(hl.PARENT)
                        hl.ACRONYM = obj.PATH.substring(hl.PARENT.length);
                    else{

                        var error = ErrorLib.getErrors().ImportError("","uploadL5L6Lib/processor",MSG_RECORD_WITHOUT_PARENT);
                        error.row = row;
                        throw error;
                    }
                }

                //set currency
                hl.EURO_CONVERSION_ID = blcurrency.getCurrencyByDefaultBudgetYearIdAbbr("EUR").EURO_CONVERSION_ID;

                //set status
                //hl.HL5_STATUS_DETAIL_ID = 1; //in progress

                //set user
                hl.CREATED_USER_ID = userId;

                //set in budget false
                hl.IN_BUDGET = 0;
                hl.IMPORT_ID = IMPORT_ID;

                if(hl.HIERARCHY_LEVEL_ID != 2 && hl.HIERARCHY_LEVEL_ID !=3){
                    var error = ErrorLib.getErrors().ImportError("","uploadL5L6Lib/processor","This record is incomplete or is not HL5/6");
                    error.row = row;
                    throw error;
                }

                if(mapInsertHierarchyLevelInsert[hl.HIERARCHY_LEVEL_ID](hl, userId))
                    logImportSuccess(row, IMPORT_ID, userId)
            }
        } catch (e) {
            if (e && e.code == 456) {
                logImportError(e, IMPORT_ID, userId);
            } else {
                logImportAnotherError(obj.PATH, obj.HIERARCHY_LEVEL_ID, e, IMPORT_ID, userId)
            }
        }
    });


    return true;
}

function deleteDictionary(userId){
    return dataUploadL5L6.deleteDictionary(userId);
}

function parseNumberBudget(stringValue){
    var separator = stringValue[stringValue.length - 3];
    stringValue = stringValue.replace(/\.|,/g, "");

    if (separator === "," || separator === ".") {
        stringValue = stringValue / 100;
    }
    return stringValue;
}

function logImportAnotherError(path,level, error,importId,userId){
    var separator = "/**/";
    var values = "";
    var path = "";
    var level = "";
    dataUploadL5L6.insertLog("", "", 1,
        "logImportAnotherError - PATH: " + path + separator + "HL_ID: " + level + separator + "DETAIL: " + error, importId,
        userId);
}

function processDistribution(row, budgetAsigned, attribute) {
    var percentDistribution = 0;
    if(! budgetAsigned)
        return percentDistribution;

    row.forEach(function (cell) {
        if (cell.KEY_L5_L6 == attribute) {
            if (Number(cell.VALUE_L5_L6) != 0) {
                percentDistribution = Number(cell.VALUE_L5_L6) * 100 / budgetAsigned;
            }
        }
    });
    return percentDistribution;
}

function processDistributionComplete(row, budgetAsigned) {
    var distribution = 0;
    row.forEach(function (cell) {
        if (cell.KEY_L5_L6 == 'BUDGET_SPEND_Q1'
            || cell.KEY_L5_L6 == 'BUDGET_SPEND_Q2'
            || cell.KEY_L5_L6 == 'BUDGET_SPEND_Q3'
            || cell.KEY_L5_L6 == 'BUDGET_SPEND_Q4'
        ) {
            distribution = distribution + Number(parseNumberBudget(cell.VALUE_L5_L6));
        }
    });
    return distribution == budgetAsigned;
}

function validate(row) {

    var parent;
    var error = ErrorLib.getErrors().ImportError("","uploadL5L6Lib/validate/","");
    error.row = row;

    var fieldMapper;
    row.forEach(function (cell) {
        if (cell.KEY_L5_L6 == "HL4_ID" || cell.KEY_L5_L6 == "HL5_ID") {
            parent = cell.VALUE_L5_L6;
            fieldMapper = getValue(cell.KEY_L5_L6);
        }
    });

    if (fieldMapper && fieldMapper.FOREIGN_TABLE_NAME) {//IS A FOREIGN KEY
        var value = getForeignId(
            fieldMapper.FOREIGN_TABLE_NAME,
            fieldMapper.FOREIGN_COLUMN_REFERENCE,
            fieldMapper.FOREIGN_COLUMN_FILTER,
            parent)[fieldMapper.FOREIGN_COLUMN_REFERENCE];

        if (value) {
            if (row[0].HIERARCHY_LEVEL_ID == 2) {
                var hl4 = dataL4.getHl4ById(value);
                if (!hl4){
                    error.details = MSG_HL4_NOT_FOUND;
                    throw error
                };
            }
            else{
                var hl5 = dataL5.getHl5ById(value);
                if (!hl5){
                    error.details = MSG_HL5_NOT_FOUND;
                    throw error;
                }
            }
        } else {

            error.details = fieldMapper.FOREIGN_COLUMN_REFERENCE + MSG_NOT_FOUND;
            throw error;
        }

    } else {
        error.details = MSG_FK_MAP_NOT_FOUND;
        throw error;
    }
    return true; 
    
}

function logImportError(error, IMPORT_ID, userId) {
    if (!error || error.code != 456) throw error;

    var separator = "/**/";
    var keys = "";
    var values = "";
    var row = error.row;
    var path = "";
    var level = "";
    if (row) {
        for (var i = 0; i < row.length; i++) {
            var cell = row[i];
            if(cell){
                keys = keys + separator + cell.KEY_L5_L6;
                values = values + separator + cell.VALUE_L5_L6;
            }
        }
        if (row[0]) {
            path = row[0].PATH;
            level = row[0].HIERARCHY_LEVEL_ID
        }
    }

    dataUploadL5L6.insertLog(keys, values, 1,
        "logImportError - PATH: " + path + separator + "HL_ID: " + level + separator + "DETAIL: " + error.toString(), IMPORT_ID,
        userId);
}

function logImportSuccess(row, IMPORT_ID, userId){
    var separator = "/**/";
    var keys = "";
    var values = "";
    var path = "";
    var level = "";
        for (var i = 0; i < row.length; i++) {
            var cell = row[i];
            keys = keys + separator + cell.KEY_L5_L6;
            values = values + separator + cell.VALUE_L5_L6;
        }

        if (row[0]) {
            path = row[0].PATH;
            level = row[0].HIERARCHY_LEVEL_ID
        }


    dataUploadL5L6.insertLog(keys, values, 0,
        "PATH: " + path + separator + "HL_ID: " + level + separator + "DETAIL: Insert succefully.", IMPORT_ID,
        userId);
}
/*
 "DICTIONARY_L5_L6_ID": "61882",
 "PATH": "CRM-AT17-1AN-SAP_AA02",
 "KEY_L5_L6": "Show on Calendar",
 "VALUE_L5_L6": "X\r",
 "HIERARCHY_LEVEL_ID": 0
 * */

function findOption(option, listOptions) {
    for (var i = 0; i < listOptions.length; i++) {
        var obj = listOptions[i];
        if (obj.OPTION_NAME.toUpperCase() == option.NAME.toUpperCase())
            return obj;
    }
    return null;
}

function processCategory(cell) {
    var category = categoryLib.getAllocationCategoryByName(cell.KEY_L5_L6);
    var options = categoryLib.getOptionByLevelByCategory(cell.HIERARCHY_LEVEL_ID, category.CATEGORY_ID);
    var parsedOptions = optionParser(cell.VALUE_L5_L6);
    var parsedOptionsFilter = [];

    for (var i = 0; i < parsedOptions.length; i++) {
        var opt = parsedOptions[i];
        var optionFounded = findOption(opt, options);
        if (optionFounded) {
            parsedOptions[i].OPTION_ID = optionFounded.OPTION_ID;
            parsedOptionsFilter[i] = parsedOptions[i];
        }
    }
    if (parsedOptionsFilter.length) {
        var result = {
            'CATEGORY': category.CATEGORY_ID,
            'OPTIONS': parsedOptionsFilter
        };
        return result;
    }
    else
        return null;
}

function optionParser(str) {
    var options = str.split('\u21b5');
    var parseOption = [];
    for (var i = 0; i < options.length; i++) {
        var obj = options[i];
        var parse = obj.trim().split(/ % - /);
        if (parse.length > 1) {

            parseOption[i] = {};
            parseOption[i].NAME = parse[1].trim().replace('\n', "").replace('\"', "");
            parseOption[i].VALUE = parse[0].trim().replace('\n', "").replace('\"', "");

        }
    }
    return parseOption;
}

function getLogByImport(importId){
   return dataUploadL5L6.getLogByImport(importId);
}

function getImports(){ 
    return dataUploadL5L6.getImports();
}

function deleteDataUploadL5L6ByImportId(data, userId){
    var deleteOk = false;
    //delete all data from L6
    deleteOk = blLevel6.delHl6DataImportByImportId(data.IMPORT_ID);
    deleteOk = deleteOk && blLevel5.delHl5DataImportByImportId(data.IMPORT_ID);

    if(deleteOk)
        deleteOk = updateImportToRollbackState(data.IMPORT_ID, userId);

    return deleteOk;
}

function updateImportToRollbackState(importId, userId){
    return dataUploadL5L6.updateImport(importId, userId) > 0;
}