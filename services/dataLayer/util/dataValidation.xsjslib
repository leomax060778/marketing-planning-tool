$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_VALIDATE_DATE_RULE_BY_CAMPAIGN_TYPE_ID_CAMPAIGN_SUBTYPE_ID = "GET_VALIDATE_DATE_RULE_BY_CAMPAIGN_TYPE_ID_CAMPAIGN_SUBTYPE_ID";

function getValidateDateRule(campaignTypeId, campaignSubTypeId){
        var parameters = {
            in_campaign_type_id: campaignTypeId
            , in_campaign_sub_type_Id: campaignSubTypeId
        };
        return db.executeScalarManual(GET_VALIDATE_DATE_RULE_BY_CAMPAIGN_TYPE_ID_CAMPAIGN_SUBTYPE_ID, parameters, 'out_result');
}