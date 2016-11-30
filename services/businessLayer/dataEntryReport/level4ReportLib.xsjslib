$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataL4DER = mapper.getDataLevel4Report();
var dataHl4 = mapper.getDataLevel4();
var dataPath = mapper.getDataPath();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */
var l4ReportFields = {"ACRONYM": "ID",
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
		var data = {"hl4": [], "category": []};
		var changedFields = dataL4DER.getL4ChangedFieldsByHl4Id(hl4Id);
		var hl4 = dataHl4.getHl4ById(hl4Id);
		//new refactor 04112016
		//var hl4Fnc = dataHl4.getHl4FncByHl4Id(hl4Id);
		
		var hl4Categories = dataHl4.getHl4Category(hl4Id);
		Object.keys(l4ReportFields).forEach(function(field){
			
			if(field == "CATEGORY"){
				var changedFieldsByHl4Id = dataL4DER.getL4ChangedFieldsByHl4IdByField(hl4Id, field);
				
				hl4Categories.forEach(function(hl4Category){
					if(hl4Category.IN_PROCESSING_REPORT){
						var object = {};
						object.option = [];
						object.display_name = hl4Category.CATEGORY_NAME;
						var hl4CategoryOptions = dataHl4.getHl4CategoryOption(hl4Category.HL4_CATEGORY_ID);
						hl4CategoryOptions.forEach(function(hl4CategoryOption){
							if(hl4CategoryOption.AMOUNT != 0){
								object.option.push({"option_name": hl4CategoryOption.OPTION_NAME, "value": hl4CategoryOption.AMOUNT});
							}
						});
						//throw ErrorLib.getErrors().CustomError("","level4ReportServices/handleGet/getL4ChangedFieldsByHl4Id", JSON.stringify(object));
						object.changed = checkChangedField(changedFieldsByHl4Id, field, hl4Category.HL4_CATEGORY_ID);
						data.category.push(object);
					}
				});
				
			} else {
				var object = {};
				object.display_name = l4ReportFields[field];
				//new refactor 04112016
				//object.value = hl4[field] || hl4Fnc[field];
				
				// When Acronym/ID display the CRM path for L4 entry
				if(l4ReportFields[field] == "ID"){
					var CRM_ACRONYM = "CRM";
					var path = dataPath.getPathByLevelParent(4, hl4['HL3_ID']);
					if (path.length > 0) {
						object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH + "-" + hl4['ACRONYM'];
					}
				}else{
					object.value = hl4[field];
				}
								
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
		if(field == "CATEGORY"){
			hasChanged = changedFields[i].DISPLAY_NAME == value;
		} else {
			hasChanged = changedFields[i].COLUMN_NAME == field;
		}
		if(hasChanged) break;
	}
	return hasChanged;
}