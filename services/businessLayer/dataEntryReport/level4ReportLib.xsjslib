$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataL4DER = mapper.getDataLevel4Report();
var dataHl4 = mapper.getDataLevel4();
var dataCategory = mapper.getDataCategory();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataPath = mapper.getDataPath();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */
var l4ReportFields = {"ACRONYM": "ID",
		"HL4_CRM_DESCRIPTION": "CRM Description",
		"HL4_DETAILS": "Initiative/Campaign Details",
		"HL4_BUSINESS_DETAILS": "Business Value",
		"HL4_FNC_BUDGET_TOTAL_MKT": "Budget",
		"PARENT_PATH": "Parent",
		"CATEGORY": ""};

function getAllL4DEReport(userId) {
	var hl4List = dataL4DER.getAllLevel4Report(userId);
	var allHl4 = [];
	hl4List.forEach(function(hl4){
		var aux = {};
		Object.keys(hl4).forEach(function(key){
			aux[key] = key != 'HL4_PATH' ? hl4[key]
				: 'CRM-' + hl4[key];
		});
		allHl4.push(aux);
	});

	return allHl4;
}

function getL4ChangedFieldsByHl4Id(hl4Id, userId) {
	try {
		var data = {"hl4": [], "category": []};
		var changedFields = dataL4DER.getL4ChangedFieldsByHl4Id(hl4Id);
		var hl4 = dataHl4.getHl4ById(hl4Id);

		var hl4Categories = dataCategoryOptionLevel.getAllocationCategory(hl4Id, 'hl4');
		//var hl4Categories = dataHl4.getHl4Category(hl4Id);
		Object.keys(l4ReportFields).forEach(function(field){
			if(field == "CATEGORY"){
				hl4Categories.forEach(function(hl4Category){
                    //var actualCategory = dataCategory.getCategoryById(hl4Category.CATEGORY_ID);
                    if(hl4Category.IN_PROCESSING_REPORT){
						var object = {};
						object.option = [];
						object.display_name = hl4Category.CATEGORY_NAME;
						//var hl4CategoryOptions = dataHl4.getHl4CategoryOption(hl4Category.HL4_CATEGORY_ID);
						var hl4CategoryOptions = dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(hl4Category.CATEGORY_ID, 'hl4', hl4Id);
						hl4CategoryOptions.forEach(function(hl4CategoryOption){
							if(hl4CategoryOption.AMOUNT != 0 || hl4CategoryOption.UPDATED){
								object.option.push({"option_name": hl4CategoryOption.OPTION_NAME, "value": hl4CategoryOption.AMOUNT, "changed": hl4CategoryOption.UPDATED});
							}
						});
						data.category.push(object);
					}
				});
			} else {
				var object = {};
				object.display_name = l4ReportFields[field];
				// When Acronym/ID display the CRM path for L4 entry
				var CRM_ACRONYM = "CRM";
				var path = '';

				switch (field){
					case 'ACRONYM':
						path = dataPath.getPathByLevelParent(4, hl4['HL3_ID']);
						if (path.length > 0) {
							object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH + "-" + hl4['ACRONYM'];
						}
						break;
					case 'PARENT_PATH':
						path = dataPath.getPathByLevelParent(4, hl4['HL3_ID']);
						if (path.length > 0) {
							object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH;
						}
						break;
					default:
						object.value = hl4[field];
						break;
				}

				/*if(field == "ACRONYM"){
					path = dataPath.getPathByLevelParent(4, hl4['HL3_ID']);
					if (path.length > 0) {
						object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH + "-" + hl4['ACRONYM'];
					}
				}else if(field){
					path = dataPath.getPathByLevelParent(4, hl4['HL3_ID']);
					if (path.length > 0) {
						object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH;
					}
				}else{
					object.value = hl4[field];
				}*/
								
				object.changed = checkChangedField(changedFields, field);
				data.hl4.push(object);
			};
		});
		return data;
	} catch (e) {
		throw e;
	}
}

function deleteL4ChangedFieldsByHl4Id(hl4Id){
	try {
		return dataL4DER.deleteL4ChangedFieldsByHl4Id(hl4Id);
	} catch (e) {
		throw ErrorLib.getErrors().CustomError("",
				"level4ReportServices/handleGet/deleteL4ChangedFieldsByHl4Id", e.toString());
	}
}

function checkChangedField(changedFields, field, value){
	var hasChanged = false;
	for(var i=0;i<changedFields.length;i++){
		hasChanged = changedFields[i].COLUMN_NAME == field;
		if(hasChanged) break;
	}
	return hasChanged;
}