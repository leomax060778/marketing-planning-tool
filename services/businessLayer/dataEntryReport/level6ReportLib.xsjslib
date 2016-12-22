$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataL6DER = mapper.getDataLevel6Report();
var dataHl6 = mapper.getDataLevel6();
var dataHl5 = mapper.getDataLevel5();
var dataPath = mapper.getDataPath();
var dataObjective = mapper.getDataObjectives();
var dataCampaignType = mapper.getDataCampaignType();
var dataCampaignSubType = mapper.getDataCampaignSubType();
var dataRouteToMarket = mapper.getDataRouteToMarket();
var dataMarketingOrganization = mapper.getDataMarketingOrganization();
var dataCostCenter = mapper.getDataCostCenter();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */

var l6ReportFields = {
	"ACRONYM": 'ID',
	"HL6_CRM_DESCRIPTION": 'CRM description',
	"ACTUAL_START_DATE": 'Start date',
	"ACTUAL_END_DATE": 'End date',
	"CAMPAIGN_TYPE_ID": 'Campaign type',
	"CAMPAIGN_SUBTYPE_ID": 'Campaign subtype',
	"CAMPAIGN_OBJECTIVE_ID": 'Campaign objective',
	"ROUTE_TO_MARKET_ID": 'Route to market',
	"COST_CENTER_ID": 'Cost center',
	"SALES_ORGANIZATION_ID": 'Sales organization',
	"DISTRIBUTION_CHANNEL_ID": "Distribution Channel"
};

function getAllL6DEReport(userId) {
	var hl6List = dataL6DER.getAllLevel6Report(userId);
	var allHl6 = [];
	hl6List.forEach(function(hl6){
		var aux = {};
		Object.keys(hl6).forEach(function(key){
			aux[key] = key != 'HL6_PATH' ? hl6[key]
				: 'CRM-' + hl6[key];
		});
		allHl6.push(aux);
	});

	return allHl6;
}

function getL6ChangedFieldsByHl6Id(hl6Id, userId) {
	var data = {"hl6": []};
	var changedFields = dataL6DER.getL6ChangedFieldsByHl6Id(hl6Id);
	var hl6 = dataHl6.getHl6ById(hl6Id);
	var costCenter;
	Object.keys(l6ReportFields).forEach(function(field){
		var object = {};
		object.display_name = l6ReportFields[field];

		switch (field){
			case "ACRONYM":
				var CRM_ACRONYM = "CRM";
				var path = dataPath.getPathByLevelParent(6, hl6['HL5_ID']);
				if (path.length > 0) {
					object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH + hl6['ACRONYM'];
				}
				break;
			case "DISTRIBUTION_CHANNEL_ID":
				var hl5 = dataHl5.getHl5ById(hl6['HL5_ID']);
				var distributionChannel = dataHl5.getDistributionChannelByL5Id(hl5.DISTRIBUTION_CHANNEL_ID);
				object.value = distributionChannel.NAME;
				break;
			case "CAMPAIGN_TYPE_ID":
				object.value = dataCampaignType.getCampaignTypeById(hl6[field]).NAME;
				break;
			case "CAMPAIGN_SUBTYPE_ID":
				object.value = dataCampaignSubType.getCampaignSubTypeById(hl6[field]).NAME;
				break;
			case "CAMPAIGN_OBJECTIVE_ID":
				object.value = dataObjective.getObjectiveById(hl6[field]).NAME;
				break;
			case "ROUTE_TO_MARKET_ID":
				object.value = dataRouteToMarket.getRouteToMarketById(hl6[field]).NAME;
				break;
			case "COST_CENTER_ID":
				costCenter = dataCostCenter.getCostCenterById(hl6[field]);
				object.value = costCenter.CODE;
				break;
			case "SALES_ORGANIZATION_ID":
				var saleOrganization = dataMarketingOrganization.getMarketingOrganizationById(costCenter.SALE_ORGANIZATION_ID)[0];
				object.value = saleOrganization.NAME;
				break;
			default:
				object.value = hl6[field];
				break;
		}
		object.changed = checkChangedField(changedFields, field);
		data.hl6.push(object);
	});
	return data;
}

function deleteL6ChangedFieldsByHl6Id(hl6Id){
	return dataL6DER.deleteL6ChangedFieldsByHl6Id(hl6Id);
}

function checkChangedField(changedFields, field, value){
	var hasChanged = false;
	for(var i=0;i<changedFields.length;i++){
		hasChanged = changedFields[i].COLUMN_NAME == field;

		if(hasChanged) break;
	}
	return hasChanged;
}