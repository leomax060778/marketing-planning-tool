$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataL4DER = mapper.getDataLevel4Report();
var dataHl4 = mapper.getDataLevel4();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */
var l4ReportFields = {"ACRONYM": "Acronym",
		"HL4_CRM_DESCRIPTION": "CRM Description",
		"HL4_DETAILS": "Initiative/Campaign Details",
		"HL4_BUSINESS_DETAILS": "Business Value",
		"HL4_FNC_BUDGET_TOTAL_MKT": "Budget",
		"CATEGORY": ""};

function getAllL4DEReport(userId) {
	try {
		return dataL4DER.getAllLevel4Report(userId);
	} catch (e) {
		db.rollback();
		throw ErrorLib.getErrors().CustomError("",
				"level4ReportServices/handleGet/getAllL4DEReport", e.toString());
	}
}

function getL4ChangedFieldsByHl4Id(hl4Id, userId) {
	try {
		var data = [];
		var changedFields = dataL4DER.getL4ChangedFieldsByHl4Id(hl4Id);
		var hl4 = dataHl4.getHl4ById(hl4Id);
		var hl4Fnc = dataHl4.getHl4FncByHl4Id(hl4Id);
		var hl4Categories = dataHl4.getHl4Category(hl4Id);
		Object.keys(l4ReportFields).forEach(function(field){
			var object = {};
			if(field == "CATEGORY"){
				var changedFieldsByHl4Id = dataL4DER.getL4ChangedFieldsByHl4IdByField(hl4Id, field);
				
				hl4Categories.forEach(function(hl4Category){
					if(hl4Category.IN_PROCESSING_REPORT){
						object.value = [];
						object.display_name = hl4Category.CATEGORY_NAME;
						var hl4CategoryOptions = dataHl4.getHl4CategoryOption(hl4Category.HL4_CATEGORY_ID);
						hl4CategoryOptions.forEach(function(hl4CategoryOption){
							if(hl4Category.AMOUNT > 0){
								object.value.push({"OPTION_NAME": hl4CategoryOption.OPTION_NAME, "AMOUNT": hl4CategoryOption.AMOUNT});
							}
						});
						object.changed = checkChangedField(changedFieldsByHl4Id, field, hl4Category.HL4_CATEGORY_ID);
						data.push(object);
					}
				});
				
			} else {
				object.display_name = l4ReportFields[field];
				object.value = hl4[field] || hl4Fnc[field];
				object.changed = checkChangedField(changedFields, field);
				data.push(object);
			};
		});
		return data;
	} catch (e) {
		throw ErrorLib.getErrors().CustomError("",
				"level4ReportServices/handleGet/getL4ChangedFieldsByHl4Id", e.toString());
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
		if(field == "CATEGORY"){
			hasChanged = changedFields[i].DISPLAY_NAME == value;
		} else {
			hasChanged = changedFields[i].COLUMN_NAME == field;
		}
		if(hasChanged) break;
	}
	return hasChanged;
}