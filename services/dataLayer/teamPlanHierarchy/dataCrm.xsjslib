$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_CRM = "INS_CRM";
var UPD_CRM = "UPD_CRM";
var INS_CRM_DATA = "INS_CRM_DATA";
var GET_CRM = "GET_CRM";

//update CRM data
function updateCrm(objHl3, userId){
	var parameters = {
			  'in_crm_id': objHl3.IN_CRM_ID
			, 'in_hl3_acronym': objHl3.IN_ACRONYM
			, 'in_description': objHl3.IN_HL3_DESCRIPTION
			, 'in_user_id': userId};	
	var result = db.executeScalarManual(UPD_CRM, parameters, 'out_result');	
	return result;
}

//Insert new CRM data new
function insertCrm(objHl, userId){
	var parameters = {'in_path': objHl.IN_PATH
			, 'in_description': objHl.IN_DESCRIPTION
			, 'in_user_id': userId};	
	var crmId = db.executeScalarManual(INS_CRM, parameters, 'out_crm_id');	
	return crmId;
}

//get CRM
function getCrm(path){
	var crm = 0;
	var parameters = {'in_path': path};	
	var result = db.executeProcedureManual(GET_CRM, parameters);	
	var list = db.extractArray(result.out_result); 	
	if(list.length)
		crm =  list[0].CRM_ID;
	return crm;
}

