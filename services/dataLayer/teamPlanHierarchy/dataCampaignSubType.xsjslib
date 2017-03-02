$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_CAMPAIGN_SUB_TYPE = "GET_ALL_CAMPAIGN_SUB_TYPE";
var GET_ALL_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID = "GET_ALL_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID";
var GET_CAMPAIGN_SUB_TYPE_BY_ID = "GET_CAMPAIGN_SUB_TYPE_BY_ID";


function getAllCampaignSubType(){
	var parameters = {};
	var data = db.executeProcedureManual(GET_ALL_CAMPAIGN_SUB_TYPE, parameters);
	return db.extractArray(data.out_result);
}

function getAllCampaignSuTypeByCampaignTypeId(idCampaignType){
	var parameters = {'in_campaign_type_id': idCampaignType};
	var data = db.executeProcedureManual(GET_ALL_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID, parameters);
	return db.extractArray(data.out_result);
}

function getCampaignSubTypeById(idCampaignSubType){
	var parameters = {'in_campaign_sub_type_id': idCampaignSubType};
	var data = db.executeProcedureManual(GET_CAMPAIGN_SUB_TYPE_BY_ID, parameters);
	var result = db.extractArray(data.out_result);
	if (result.length)
		return result[0];
	else
		return null;
}