$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataL5DER = mapper.getDataLevel5Report();
var dataHl5 = mapper.getDataLevel5();
var dataPath = mapper.getDataPath();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */
var l5ReportFields = {"ACRONYM": "ID",
        "HL5_CRM_DESCRIPTION": "CRM description",
        "BUDGET": "Budget",
        "DISTRIBUTION_CHANNEL_ID": "Distribution Channel",
		"CATEGORY": ""};

function getAllL5DEReport(userId) {
	var hl5List = dataL5DER.getAllLevel5Report(userId);
	var allHl5 = [];
	hl5List.forEach(function(hl5){
		var aux = {};
		Object.keys(hl5).forEach(function(key){
			aux[key] = key != 'HL5_PATH' ? hl5[key]
				: 'CRM-' + hl5[key];
		});
		allHl5.push(aux);
	});

	return allHl5;
}

function getL5ChangedFieldsByHl5Id(hl5Id, userId) {
		var data = {"hl5": [], "category": []};
		var changedFields = dataL5DER.getL5ChangedFieldsByHl5Id(hl5Id);
		var hl5 = dataHl5.getHl5ById(hl5Id);
		
		var hl5Categories = dataHl5.getHl5Category(hl5Id);
		
		Object.keys(l5ReportFields).forEach(function(field){
			if(field == "CATEGORY"){
				var changedFieldsByHl5Id = dataL5DER.getL5ChangedFieldsByHl5IdByField(hl5Id, field);
				hl5Categories.forEach(function(hl5Category){
					if(hl5Category.IN_PROCESSING_REPORT){
						var object = {};
						object.option = [];
						object.display_name = hl5Category.CATEGORY_NAME;
						var hl5CategoryOptions = dataHl5.getHl5CategoryOption(hl5Category.HL5_CATEGORY_ID);
						hl5CategoryOptions.forEach(function(hl5CategoryOption){
							if(hl5CategoryOption.AMOUNT != 0){
								object.option.push({"option_name": hl5CategoryOption.OPTION_NAME, "value": hl5CategoryOption.AMOUNT});
							}
						});
						object.changed = checkChangedField(changedFieldsByHl5Id, field, hl5Category.HL5_CATEGORY_ID);
						data.category.push(object);
					}
				});
				
			} else {
				var object = {};
				object.display_name = l5ReportFields[field];

				switch (l5ReportFields[field]){
					case "ID":
						var CRM_ACRONYM = "CRM";
						var path = dataPath.getPathByLevelParent(5, hl5['HL4_ID']);
						if (path.length > 0) {
							object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH + "-" + hl5['ACRONYM'];
						}
						break;
					default:
						//throw JSON.stringify(dataHl5.getDistributionChannelById(hl5.DISTRIBUTION_CHANNEL_ID));
						object.value = field == "DISTRIBUTION_CHANNEL_ID" ? dataHl5.getDistributionChannelById(hl5.DISTRIBUTION_CHANNEL_ID).NAME
							: object.value = hl5[field];
						break;
				}



				//if(l5ReportFields[field] == "ID"){
				//	var CRM_ACRONYM = "CRM";
				//	var path = dataPath.getPathByLevelParent(5, hl5['HL4_ID']);
				//	if (path.length > 0) {
				//		object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH + "-" + hl5['ACRONYM'];
				//	}
				//}else{
				//	object.value = hl5[field];
				//}
				object.changed = checkChangedField(changedFields, field);
				data.hl5.push(object);
			}
		});
		return data;
}

function deleteL5ChangedFieldsByHl5Id(hl5Id){
	return dataL5DER.deleteL5ChangedFieldsByHl5Id(hl5Id);
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