$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/

// List of stored procedures
var GET_ALL_HL4_DE_REPORT = "GET_HL4_DE_REPORT";
var spGetL4ChangedFieldsByHl4Id = "GET_HL4_CHANGED_FIELDS_BY_HL4_ID";
var spGetL4ChangedFieldsByHl4IdByField = "GET_HL4_CHANGED_FIELDS_BY_HL4_ID_BY_FIELD";
var spDelL4ChangedFieldsByHl4Id = "DEL_HL4_CRM_BINDING";

/*********** END LIST OF PROCEDURES ***************/

function getAllLevel4Report(userId) {
	var parameters = {};
	var result = db.executeProcedureManual(GET_ALL_HL4_DE_REPORT, {});
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;
}

function getL4ChangedFieldsByHl4Id(id){
	if(id){
		var rdo = db.executeProcedureManual(spGetL4ChangedFieldsByHl4Id,{'in_hl4_id':id});
		return db.extractArray(rdo.out_hl4_changed_fields);
	}	
	return null;
}

function getL4ChangedFieldsByHl4IdByField(id, fieldName){
	if(id && fieldName){
		var rdo = db.executeProcedureManual(spGetL4ChangedFieldsByHl4IdByField,{'in_hl4_id':id, 'in_column_name': fieldName}, 'out_result');
		return db.extractArray(rdo.out_hl4_crm_binding_id);
	}	
	return null;
}

function deleteL4ChangedFieldsByHl4Id(id){
	if(id){
		var rdo = db.executeScalarManual(spDelL4ChangedFieldsByHl4Id,{'in_hl4_id':id}, 'out_result');
		return rdo;
	}	
	return null;
}