$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/

// List of stored procedures
var GET_ALL_HL6_DE_REPORT = "GET_HL6_DE_REPORT";
var spGetL6ChangedFieldsByHl6Id = "GET_HL6_CHANGED_FIELDS_BY_HL6_ID";
var spGetL6ChangedFieldsByHl6IdByField = "GET_HL6_CHANGED_FIELDS_BY_HL6_ID_BY_FIELD";
var spDelL6ChangedFieldsByHl6Id = "DEL_HL6_CRM_BINDING";
var GET_HL6_FOR_PROCESSING_REPORT = "GET_HL6_FOR_PROCESSING_REPORT";

/*********** END LIST OF PROCEDURES ***************/

function getAllLevel6Report(userId) {
	var parameters = {};
	var result = db.executeProcedureManual(GET_ALL_HL6_DE_REPORT, {});
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;
}

function getL6ForProcessingReportByHl6Id(id){
	if(id){
		var result = {};
		var rdo = db.executeProcedureManual(GET_HL6_FOR_PROCESSING_REPORT,{'in_hl6_id':id});
		result.hl6 = db.extractArray(rdo.out_result)[0];
		result.marketing_activity_id = db.extractArray(rdo.out_marketing_activity_id)[0];
		return result;
	}
	return null;
}

function getL6ChangedFieldsByHl6Id(id){
	if(id){
		var rdo = db.executeProcedureManual(spGetL6ChangedFieldsByHl6Id,{'in_hl6_id':id});
		return db.extractArray(rdo.out_hl6_changed_fields);
	}	
	return null;
}

function getL6ChangedFieldsByHl6IdByField(id, fieldName){
	if(id && fieldName){
		var rdo = db.executeProcedureManual(spGetL6ChangedFieldsByHl6IdByField,{'in_hl6_id':id, 'in_column_name': fieldName});
		return db.extractArray(rdo.out_result);
	}	
	return null;
}

function deleteL6ChangedFieldsByHl6Id(id){
	if(id){
		
		var rdo = db.executeScalarManual(spDelL6ChangedFieldsByHl6Id,{'in_hl6_id':id}, 'out_result');
		return rdo;
	}	
	return null;
}