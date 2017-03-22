$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataL5DER = mapper.getDataLevel5Report();
var dataHl5 = mapper.getDataLevel5();
var dataPath = mapper.getDataPath();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var dataCategory = mapper.getDataCategory();
var dataCostCenter = mapper.getDataCostCenter();
var dataCampaignType = mapper.getDataCampaignType();
var dataCampaignSubType = mapper.getDataCampaignSubType();
var dataMarketingProgram = mapper.getDataMarketingProgram();
//var dataMarketingActivity = mapper.getDataMarketingActivity();
var dataBusinessOwner = mapper.getDataBusinessOwner();
var dbER = mapper.getDataEmployeeResponsible();
var dataObjective = mapper.getDataObjectives();
var dataRouteToMarket = mapper.getDataRouteToMarket();
var dataMarketingOrganization = mapper.getDataMarketingOrganization();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataPriority = mapper.getDataPriority();
/** ***********END INCLUDE LIBRARIES*************** */
var l5ReportFields = {
	"ACRONYM": "ID"
	,"HL5_CRM_DESCRIPTION": "Description"
	,"SHOW_ON_DG_CALENDAR": "Show on calendar"
	,"CAMPAIGN_OBJECTIVE_ID": "Objective"
	,"CAMPAIGN_TYPE_ID": "Type"
	,"CAMPAIGN_SUBTYPE_ID": "Sub-Type"
	,"MARKETING_PROGRAM_ID": "Marketing Program ID"
	,"MARKETING_PROGRAM_DESC": "Marketing Program Desc" //
	,"MARKETING_ACTIVITY_ID": "Marketing Activity ID"
	,"MARKETING_ACTIVITY_DESC": "Marketing Activity Desc" //
	,"PLANNED_START_DATE": "Planned Start"
	,"PLANNED_END_DATE": "Planned End"
	,"ACTUAL_START_DATE": "Actual Start"
	,"ACTUAL_END_DATE": "Actual End"
	,"SALES_ORGANIZATION_ID": "Marketing Organization"
	,"DISTRIBUTION_CHANNEL_ID": "Distribution Channel"
	,"DISTRIBUTION_CHANNEL_DESC": "Distribution Channel Desc" //
	,"COST_CENTER_ID": "Cost Center"
	,"EMPLOYEE_RESPONSIBLE_ID": "Employee Responsible"
	,"BUSINESS_OWNER_ID": "Business Owner"
	,"BUDGET": "Budget"
	,"URL": "Event URL"
	,"VENUE": "Venue"
	,"STREET": "Street"
	,"CITY": "City"
	,"COUNTRY": "Country"
	,"POSTAL_CODE": "Postal Code"
	,"ROUTE_TO_MARKET_ID": "Route to Market"
	,"CATEGORY": ""
	,"PARENT_PATH": "Parent"
	, "RESPONSIBLE_PERSON_ID": "Responsible Person"
	, "BUDGET_APPROVER_ID": "Budget Approver"
	, "REGION": "Region"
	, "EVENT_OWNER": "Event Owner"
	, "NUMBER_OF_PARTICIPANTS": "Number Of Participants"
	, "PRIORITY_ID": "Priority"

};

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
		var costCenter;
		var hl5Categories = dataCategoryOptionLevel.getAllocationCategory(hl5Id, 'hl5');
		//var hl5Categories = dataHl5.getHl5Category(hl5Id);

		Object.keys(l5ReportFields).forEach(function(field){
			if(field == "CATEGORY"){
				hl5Categories.forEach(function(hl5Category){
                    //var actualCategory = dataCategory.getCategoryById(hl5Category.CATEGORY_ID);
                    //if(category.IN_PROCESSING_REPORT)
                    if(hl5Category.IN_PROCESSING_REPORT){
					// if(hl5Category.IN_PROCESSING_REPORT){
						var object = {};
						object.option = [];
						object.display_name = hl5Category.CATEGORY_NAME;
						var hl5CategoryOptions = dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(hl5Category.CATEGORY_ID, 'hl5', hl5Id);
						//var hl5CategoryOptions = dataHl5.getHl5CategoryOption(hl5Category.HL5_CATEGORY_ID);
						hl5CategoryOptions.forEach(function(hl5CategoryOption){
							if(hl5CategoryOption.AMOUNT != 0 || hl5CategoryOption.UPDATED){
								object.option.push({"option_name": hl5CategoryOption.OPTION_NAME, "value": hl5CategoryOption.AMOUNT, "changed": hl5CategoryOption.UPDATED});
							}
						});
						data.category.push(object);
					}
				});
				
			} else {
				var object = {};
				object.display_name = l5ReportFields[field];
				var CRM_ACRONYM = "CRM";
				var path = dataPath.getPathByLevelParent(5, hl5['HL4_ID']);
				switch (field){
					case "ACRONYM":
						if (path.length > 0) {
							object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH + hl5['ACRONYM'];
						}
						break;
					case "CAMPAIGN_TYPE_ID":
						if(hl5[field]) {
							object.value = dataCampaignType.getCampaignTypeById(hl5[field]).NAME;
						}
						break;
					case "CAMPAIGN_SUBTYPE_ID":
						object.value = dataCampaignSubType.getCampaignSubTypeById(hl5[field]).NAME;
						break;
					case "CAMPAIGN_OBJECTIVE_ID":
						if(hl5[field]) {
							object.value = dataObjective.getObjectiveById(hl5[field]).NAME;
						}
						break;
					case "ROUTE_TO_MARKET_ID":
						if(hl5[field]) {
							object.value = dataRouteToMarket.getRouteToMarketById(hl5[field]).NAME;
						}
						break;
					case "COST_CENTER_ID":
						if(hl5[field]) {
							costCenter = dataCostCenter.getCostCenterById(hl5[field]);
							object.value = costCenter.CODE;
						}
						break;
					case "SALES_ORGANIZATION_ID":
						if(hl5['COST_CENTER_ID']) {
							costCenter = dataCostCenter.getCostCenterById(hl5['COST_CENTER_ID']);
							var saleOrganization = dataMarketingOrganization.getMarketingOrganizationById(costCenter.SALE_ORGANIZATION_ID)[0];
							object.value = saleOrganization.NAME;
						}
						break;
					//TODO:
					case "MARKETING_ACTIVITY_ID":
						if(hl5['MARKETING_ACTIVITY_ID']) {
							var hl5MarketingActivity = dataHl5.getHl5ById(hl5['MARKETING_ACTIVITY_ID']);
							if (path.length > 0) {
								object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH + hl5MarketingActivity['ACRONYM'];
							}
						}
						break;

					case "SHOW_ON_DG_CALENDAR":
						object.value = hl5[field] ? "Yes" : "No";
						break;
					case "BUSINESS_OWNER_ID":
						if(hl5[field]){
							object.value = dataBusinessOwner.getBusinessOwnerById(hl5[field]).DESCRIPTION;
						}
						break;
					case "EMPLOYEE_RESPONSIBLE_ID":
						if(hl5[field]) {
							var employeeResponsible = dbER.getEmployeeResponsibleById(hl5[field]);
							object.value = employeeResponsible.FULL_NAME + ", " + employeeResponsible.EMPLOYEE_NUMBER;
							//object.value = dbER.getEmployeeResponsibleById(hl5[field]).FULL_NAME;
						}
						break;

					case "MARKETING_PROGRAM_DESC":
						if(hl5['MARKETING_PROGRAM_ID']){
							object.value = dataMarketingProgram.getMarketingProgramById(hl5['MARKETING_PROGRAM_ID']).NAME;
						}
						break;
					case "MARKETING_ACTIVITY_DESC":
						if(hl5['MARKETING_ACTIVITY_ID']) {
							var hl5MarketingActivity = dataHl5.getHl5ById(hl5['MARKETING_ACTIVITY_ID']);
							object.value = hl5MarketingActivity.HL5_CRM_DESCRIPTION;
						}
						break;
					case "DISTRIBUTION_CHANNEL_DESC":
						if(hl5['DISTRIBUTION_CHANNEL_ID']){
							object.value = dataHl5.getDistributionChannelById(hl5['DISTRIBUTION_CHANNEL_ID']).NAME
						}
						break;
					case "COST_CENTER_RESP_PERS":
						if(hl5['COST_CENTER_ID']) {
							costCenter = dataCostCenter.getCostCenterById(hl5['COST_CENTER_ID']);
							object.value = costCenter.EMPLOYEE_RESPONSIBLE_DESCRIPTION;
						}
						break;
					case "PLANNED_START_DATE":
						object.value =  (new Date(hl5[field])).toLocaleDateString();
						break;
					case "PLANNED_END_DATE":
						object.value =  (new Date(hl5[field])).toLocaleDateString();
						break;
					case "ACTUAL_START_DATE":
						object.value =  (new Date(hl5[field])).toLocaleDateString();
						break;
					case "ACTUAL_END_DATE":
						object.value =  (new Date(hl5[field])).toLocaleDateString();
						break;
					case "PARENT_PATH":
						if (path.length > 0) {
							object.value = CRM_ACRONYM + "-" + path[0].PATH_TPH;
						}
						break;
					case "PRIORITY_ID":
						object.value = dataPriority.getPriorityById(hl5[field]).NAME;
						break;
					default:
						object.value = hl5[field];
						break;
				}
				var fieldToCheck = field == "DISTRIBUTION_CHANNEL_DESC" ? "DISTRIBUTION_CHANNEL_ID"
					: field == "MARKETING_PROGRAM_DESC" ? "MARKETING_PROGRAM_ID"
					: field == "MARKETING_ACTIVITY_DESC" ? "MARKETING_ACTIVITY_ID"
					: field;

				object.changed = checkChangedField(changedFields, fieldToCheck);
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
		hasChanged = changedFields[i].COLUMN_NAME == field;
		if(hasChanged) break;
	}
	return hasChanged;
}