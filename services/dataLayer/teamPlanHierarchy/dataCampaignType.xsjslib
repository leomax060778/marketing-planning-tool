$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_CAMPAIGN_TYPE = "GET_ALL_CAMPAIGN_TYPE";
var GET_CAMPAIGN_TYPE_BY_ID = "GET_CAMPAIGN_TYPE_BY_ID";

function getAllCampaignType(){
	var parameters = {};	
	var data = db.executeProcedureManual(GET_ALL_CAMPAIGN_TYPE, parameters);	
	return db.extractArray(data.out_result);
}

function getCampaignTypeById(idCampaignType){
	var parameters = {'in_campaign_type_id': idCampaignType};
	var data = db.executeProcedureManual(GET_CAMPAIGN_TYPE_BY_ID, parameters);
	var result = db.extractArray(data.out_result);
	if (result.length)
		return result[0];
	else
		return null;
}