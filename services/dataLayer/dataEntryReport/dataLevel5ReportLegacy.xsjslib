$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/

// List of stored procedures
var GET_ALL_HL5_DE_REPORT = "GET_HL5_DE_REPORT";
var spGetL5ChangedFieldsByHl5Id = "GET_HL5_CHANGED_FIELDS_BY_HL5_ID";
var spGetL5ChangedFieldsByHl5IdByField = "GET_HL5_CHANGED_FIELDS_BY_HL5_ID_BY_FIELD";
var spDelL5ChangedFieldsByHl5Id = "DEL_HL5_CRM_BINDING";
var GET_HL5_FOR_PROCESSING_REPORT = "GET_HL5_FOR_PROCESSING_REPORT";

/*********** END LIST OF PROCEDURES ***************/

function getAllLevel5Report(userId) {
	var parameters = {};
	var result = db.executeProcedureManual(GET_ALL_HL5_DE_REPORT, {});
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;
}

function getL5ForProcessingReportByHl5Id(id){
	if(id){
		var result = {};
		var rdo = db.executeProcedureManual(GET_HL5_FOR_PROCESSING_REPORT,{'in_hl5_id':id});
		result.hl5 = db.extractArray(rdo.out_result)[0];
		result.marketing_activity_id = db.extractArray(rdo.out_marketing_activity_id)[0];
		return result;
	}
	return null;
}

function getL5ChangedFieldsByHl5Id(id){
	if(id){
		var rdo = db.executeProcedureManual(spGetL5ChangedFieldsByHl5Id,{'in_hl5_id':id});
		return db.extractArray(rdo.out_hl5_changed_fields);
	}	
	return null;
}

function getL5ChangedFieldsByHl5IdByField(id, fieldName){
	if(id && fieldName){
		var rdo = db.executeProcedureManual(spGetL5ChangedFieldsByHl5IdByField,{'in_hl5_id':id, 'in_column_name': fieldName}, 'out_result');
		return db.extractArray(rdo.out_hl5_crm_binding_id);
	}	
	return null;
}

function deleteL5ChangedFieldsByHl5Id(id){
	if(id){
		var rdo = db.executeScalarManual(spDelL5ChangedFieldsByHl5Id,{'in_hl5_id':id}, 'out_result');
		return rdo;
	}	
	return null;
}