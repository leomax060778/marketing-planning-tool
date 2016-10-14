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
		"HL4_FNC_BUDGET_TOTAL_MKT": "Budget"};

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
		
		Object.keys(l4ReportFields).forEach(function(field){
			var object = {};
			object.display_name = l4ReportFields[field];
			object.value = hl4[field] || hl4Fnc[field];
			object.changed = checkChangedField(changedFields, hl4Id, field);
			
			data.push(object);
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

function checkChangedField(changedFields, hl4Id, field){
	var hasChanged = false;
	for(var i=0;i<changedFields.length;i++){
		hasChanged = changedFields[i].COLUMN_NAME == field;
		if(hasChanged) break;
	}
	return hasChanged;
}