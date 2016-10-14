/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataHl4 = mapper.getDataLevel4();
var dataHl3 = mapper.getDataLevel3();
var dataExOut = mapper.getDataExpectedOutcome();
var dataPartner = mapper.getDataPartner();
var dataInterlock = mapper.getDataInterLock();
var dataEuroConversion = mapper.getDataEuroConversion();
var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var interlockLib = mapper.getInterlock();
var partnerLib = mapper.getPartner();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var level4DER = mapper.getLevel4DEReport();
var dataL4DER = mapper.getDataLevel4Report();
var db = mapper.getdbHelper();
var dbUser = mapper.getDataUserRole();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var level3BL = mapper.getLevel3();
var userBL = mapper.getUser();
var mail = mapper.getMail();
var businessError = mapper.getLogError();
var pathBL = mapper.getPath();
var config = mapper.getDataConfig();
/*************************************************/

var HL4_STATUS = {
	IN_PROGRESS : 1,
	LOAD_DATA_ENTRY : 2,
	IN_CRM : 3,
	UPDATE_IN_CRM : 4,
	EXCEED_BUDGET : 5,
	COMPLETE : 6
};

/** ****************END CONSTANTS***************** */

function getHl4(id){
	try{
	var spResult = dataHl4.getHl4(id);
	var result = [];
	var hl4Total = 0;
	//JSON.parse(JSON.stringify(json_original));
	spResult.out_result.forEach(function(hl4) {
	    //hl4Total = 0;
	    var aux = {};
	    aux = util.extractObject(hl4);
	    //aux.CREATED_BY = hl4.FIRST_NAME + " " + hl4.LAST_NAME;
	    aux.CRM_ID = 'CRM-' + hl4.CRM_ID;// + hl4.BUDGET_YEAR + '-' + hl4.HL3_ACRONYM + '-' + hl4.HL4_ACRONYM;

	    /*if(!!hl4.HL4_BUDGET && !!hl4.CURRENCY_VALUE){
	        hl4Total = hl4.HL4_BUDGET * Number(hl4.CURRENCY_VALUE);
	    }*/
	    
	    //hl4Total = hl4.HL4_BUDGET.toFixed(2);
	    aux.HL4_TOTAL = hl4.HL4_BUDGET;
	    aux.ALLOCATED = hl4.HL5_TOTAL_IN_BUDGET;
	    aux.REMAINDER = hl4.HL4_TOTAL - hl4.HL5_TOTAL_IN_BUDGET;

	    aux.ALLOCATED_BUDGET_COLOR = hl4.ALLOCATED <= hl4.HL4_TOTAL ?  1 : 0;
	    aux.REMAINDER_BUDGET_COLOR = hl4.REMAINDER <= hl4.HL4_TOTAL  && hl4.REMAINDER >= 0?  1 : 0;
	    aux.HL5_OUT_BUDGET = hl4.HL5_TOTAL_OUT_BUDGET <= hl4.HL4_TOTAL  && hl4.HL5_TOTAL_OUT_BUDGET >= 0 ?  1 : 0;
	    aux.COLOR = hl4.REMAINDER < 0 ?  0 : 1;
	    aux.QUANTITY_TOTAL_HL5 = hl4.HL5_TOTAL_IN_BUDGET + hl4.HL5_TOTAL_OUT_BUDGET;

	    /*-- black = 1, red = 0
	     -- HL5_TOTAL_IN_BUDGET = ALLOCATED
	     --,CASE WHEN ALLOCATED &lt;= HL4_TOTAL THEN 1 ELSE 0 END AS ALLOCATED_BUDGET_COLOR
	     --,CASE WHEN REMAINDER &lt;= HL4_TOTAL AND REMAINDER >= 0 THEN 1 ELSE 0 END AS REMAINDER_BUDGET_COLOR
	     --,CASE WHEN HL5_TOTAL_OUT_BUDGET &lt;= HL4_TOTAL AND HL5_TOTAL_OUT_BUDGET >= 0 THEN 1 ELSE 0 END AS OUT_OF_BUDGET_COLOR
	     --,CASE WHEN REMAINDER &lt; 0 THEN 0 ELSE 1 END AS COLOR*/
	    result.push(aux);
	});
	
	var responseObj = {"results": result, "total_budget": spResult.out_total_budget};
	
	return responseObj;
	} catch(e) {
		throw ErrorLib.getErrors().CustomError("prueba","Test",e.toString());
	}
}

function getHl4ById(id){
	if(!id) 
		throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found","hl4Services/handleGet/getHl4ById",id);
	try{
		var hl4_fnc = util.extractObject(dataHl4.getHl4FncByHl4Id(id));
		var partner = partnerLib.getPartnerByHl4Id(id);
		partner.partners = parseObject(partner.partners);
		var myBudget = getHl4MyBudgetByHl4Id(id);//dataHl4.getHl4MyBudgetByHl4Id(id);
		var sale = getHl4SalesByHl4Id(id);//dataHl4.getHl4SalesByHl4Id(id);
		
		hl4_fnc.totalBudget = Number(hl4_fnc.HL4_FNC_BUDGET_TOTAL_MKT) + Number(partner.total) + Number(myBudget.total) + Number(sale.total);
		var hl4 = {
			"hl4": parseObject(dataHl4.getHl4ById(id)),
			"interlock": interlockLib.getInterlockByHl4Id(id),
			"expectedOutcomes": expectedOutcomesLib.getExpectedOutcomesByHl4Id(id),
			"partner": partner,
			"hl4_fnc": parseObject(hl4_fnc),
			"myBudget": myBudget,
			"sale": sale,
			"hl4_category": getHl4CategoryOption(id)
		}
		
		return hl4;//dataHl4.getHl4ById(id);
	} catch(e) {
		throw ErrorLib.getErrors().CustomError("getHl4ById","Get Hl4 By Id",e.toString());
	} finally {
		db.closeConnection();
	}
}

function getUserById(id){
	if(!id) 
		throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found","userServices/handleGet/getUserById",id);	
	return dbUser.getUserById(id);
	
}

function insertHl4(data, userId){
	try{
		var hl4_id = null;
		var transactionOk = true;
		var hl4_budget_regions = true;
		var hl4_budget_subregions = true;
		var hl4_budget_route = true;
		var hl4_sale_regions = true;
		var hl4_sale_subregions = true;
		var hl4_sale_other_regions = true;
		var hl4_sale_other_subregions = true;
		var hl4_sale_other = true;
		var hl4_sale_route = true;
		var hl4_category = true
		var hl4_category_option = true;
		var hl4_expected_outcomes = true;
		var hl4_expected_outcomes_detail = true;
		var hl4_partner = true;
		var partnerOK = true;
		var interlockResult = true;
		

		data.hl4.in_hl4_status_detail_id = validateHl4(data);
		
		if(data.hl4.in_hl4_status_detail_id > 0){
			
			data.hl4.in_created_user_id = userId;
			data.hl4.in_is_send_mail = 0;
			data.hl4.in_read_only = 0;
			
			data.hl4.in_user_id_send_mail = 1;
			hl4_id = dataHl4.insertHl4(data.hl4);
			
			if(hl4_id > 0){
				data.hl4.in_hl4_id = hl4_id;
				insertHl4CRMBinding(data);
				setHl4Status(hl4_id, data.hl4.in_hl4_status_detail_id, userId);
				var conversionValue = dataEuroConversion.getEuroConversionValueById(data.hl4_fnc.in_euro_conversion_id);
				data.hl4_fnc.in_in_budget = checkBudgetStatus(data.hl4.in_hl3_id, hl4_id, Number(data.hl4_fnc.in_hl4_fnc_budget_total_mkt) / conversionValue);
				data.hl4_fnc.in_hl4_id = hl4_id;
				data.hl4_fnc.in_created_user_id = userId;
				
				data.hl4_fnc.in_hl4_fnc_result_q1 = data.hl4_fnc.in_hl4_fnc_budget_spend_q1;
				data.hl4_fnc.in_hl4_fnc_result_q2 = data.hl4_fnc.in_hl4_fnc_budget_spend_q2;
				data.hl4_fnc.in_hl4_fnc_result_q3 = data.hl4_fnc.in_hl4_fnc_budget_spend_q3;
				data.hl4_fnc.in_hl4_fnc_result_q4 = data.hl4_fnc.in_hl4_fnc_budget_spend_q4;
				
				data.hl4_fnc.in_hl4_fnc_budget_total_mkt =  Number(data.hl4_fnc.in_hl4_fnc_budget_total_mkt) / conversionValue;
				var hl4_fnc_id = dataHl4.insertHl4_fnc(data.hl4_fnc);
				
				if(data.hl4_expected_outcomes.hl4_expected_outcomes_detail.length){
					var outcome = {};
					outcome.in_created_user_id = userId;
					outcome.in_hl4_id = hl4_id;
					outcome.in_comments = data.hl4_expected_outcomes.in_comments;
					var hl4_expected_outcomes_id = dataExOut.insertHl4ExpectedOutcomes(outcome);
					hl4_expected_outcomes = (hl4_expected_outcomes_id > 0);
					if(hl4_expected_outcomes){
						data.hl4_expected_outcomes.hl4_expected_outcomes_detail.forEach(function(expectedOutcomeDetail){
							if(hl4_expected_outcomes){
								expectedOutcomeDetail.in_created_user_id = userId;
								expectedOutcomeDetail.in_hl4_expected_outcomes_id = hl4_expected_outcomes_id;
								expectedOutcomeDetail.in_amount_value = Number(expectedOutcomeDetail.in_amount_value);
								var hl4_expected_outcomes_detail_id = dataExOut.insertHl4ExpectedOutcomesDetail(expectedOutcomeDetail);
								hl4_expected_outcomes = hl4_expected_outcomes && (hl4_expected_outcomes_detail_id > 0);
							}
						});
					}
				}
								
				if(data.hl4_budget.regions){
					data.hl4_budget.regions.forEach(function(budget_region){
						budget_region.in_hl4_id = hl4_id;
						budget_region.in_created_user_id = userId;
						var budget_region_id = dataHl4.insertHl4BudgetRegion(budget_region);
						hl4_budget_regions = hl4_budget_regions && (budget_region_id > 0);
					});
				}
				
				if(data.hl4_budget.subregions){
					data.hl4_budget.subregions.forEach(function(budget_subregion){
						budget_subregion.in_hl4_id = hl4_id;
						budget_subregion.in_created_user_id = userId;
						var budget_subregion_id = dataHl4.insertHl4BudgetSubRegion(budget_subregion);
						hl4_budget_subregions = hl4_budget_regions && (budget_subregion_id > 0);
					});
				}
				if(data.hl4_budget.routes){
					data.hl4_budget.routes.forEach(function(budget_route){
						budget_route.in_hl4_id = hl4_id;
						budget_route.in_created_user_id = userId;
						var budget_route_id = dataHl4.insertHl4BudgetRoute(budget_route);
						hl4_budget_route = hl4_budget_regions && (budget_route_id > 0);
					});
				}
				
				if(data.hl4_sale.regions){
					data.hl4_sale.regions.forEach(function(sale_region){
					    sale_region.in_hl4_id = hl4_id;
					    sale_region.in_created_user_id = userId;
					    sale_region.in_amount = Number(sale_region.in_amount) / conversionValue;
					    var sale_region_id = dataHl4.insertHl4SaleRegion(sale_region);
					    hl4_sale_regions = hl4_sale_regions && (sale_region_id > 0);
					});
				}

				if(data.hl4_sale.subregions){
					data.hl4_sale.subregions.forEach(function(sale_subregion){
					    sale_subregion.in_hl4_id = hl4_id;
					    sale_subregion.in_created_user_id = userId;
					    sale_subregion.in_amount = Number(sale_subregion.in_amount) / conversionValue;
					    var sale_subregion_id = dataHl4.insertHl4SaleSubRegion(sale_subregion);
					    hl4_sale_subregions = hl4_sale_subregions && (sale_subregion_id > 0);
					});
				}

				if(data.hl4_sale.routes){
					data.hl4_sale.routes.forEach(function(sale_route){
					    sale_route.in_hl4_id = hl4_id;
					    sale_route.in_created_user_id = userId;
					    sale_route.in_amount = Number(sale_route.in_amount) / conversionValue;
					    var sale_route_id = dataHl4.insertHl4SaleRoute(sale_route);
					    hl4_sale_route = hl4_sale_route && (sale_route_id > 0);
					});
				}
				
				if(data.hl4_sale.other){
					if(Object.keys(data.hl4_sale.other.region).length > 0){
						data.hl4_sale.other.region.in_hl4_id = hl4_id;
						data.hl4_sale.other.region.in_created_user_id = userId;
						data.hl4_sale.other.region.in_amount = Number(data.hl4_sale.other.region.in_amount) / conversionValue;
					    var sale_other_region_id = dataHl4.insertHl4SaleOtherRegion(data.hl4_sale.other.region);
					    hl4_sale_other_regions = hl4_sale_other_regions && (sale_other_region_id > 0);
					} else if(Object.keys(data.hl4_sale.other.subregion).length > 0){
						data.hl4_sale.other.subregion.in_hl4_id = hl4_id;
						data.hl4_sale.other.subregion.in_created_user_id = userId;
						data.hl4_sale.other.subregion.in_amount = Number(data.hl4_sale.other.subregion.in_amount) / conversionValue;
					    var sale_other_subregion_id = dataHl4.insertHl4SaleOtherSubRegion(data.hl4_sale.other.subregion);
					    hl4_sale_other_subregions = hl4_sale_other_subregions && (sale_other_subregion_id > 0);
					}
				}
				
				//sale others
				if(data.hl4_sale.others){
					data.hl4_sale.others.forEach(function(other){
						other.in_hl4_id = hl4_id;
						other.in_created_user_id = userId;
						other.in_amount = Number(other.in_amount) / conversionValue;
					    var sale_other_id = dataHl4.insertHl4SaleOther(other);
					    hl4_sale_other = hl4_sale_other && (sale_other_id > 0);
		            });
				}
				
				data.partners.forEach(function(partner){
            		partner.in_created_user_id = userId;
            		partner.in_hl4_id = hl4_id
            		var partner_id = dataPartner.insertHl4Partner(partner);
	            	partnerOK = partnerOK && (partner_id > 0);
	            });
								
				data.hl4_category.forEach(function(hl4Category){
					var category = {};
					category.in_hl4_id = hl4_id;
					category.in_category_id = hl4Category.in_category_id;
					category.in_created_user_id = hl4Category.in_created_user_id;
					category.in_created_user_id = userId;
					var in_hl4_category_id = dataHl4.insertHl4Category(category);
					hl4_category = hl4_category && (in_hl4_category_id > 0);
					if(hl4_category){						
						hl4Category.hl4_category_option.forEach(function(hl4CategoryOption){
							hl4CategoryOption.in_created_user_id = userId;
							hl4CategoryOption.in_hl4_category_id = in_hl4_category_id;
							hl4CategoryOption.in_amount = hl4CategoryOption.in_amount || 0;
							var hl4_category_option_id = dataHl4.insertHl4CategoryOption(hl4CategoryOption);
							hl4_category_option = hl4_category_option && (hl4_category_option_id > 0);
						});
					}
				});
				
				data.interlock.forEach(function(interlock){
					var il = {};
					var hash = getSYSUUID();
					il.in_entity_id= interlock.in_entity_id;
					il.in_hl4_id = hl4_id;
					il.in_organization_type_id= interlock.organization.type === 'globalTeam' ? 1 :
						interlock.organization.type === 'region' ? 2 :
							interlock.organization.type === 'subregion' ? 3 : 0;
					/*
					 * TODO: remove hardcoded in_requested_user_id
					 */
					il.in_requested_user_id= 1;
					il.in_requested_resource= interlock.in_requested_resource;
					il.in_requested_budget= Number(interlock.in_requested_budget) / conversionValue;
					il.in_created_user_id= userId;
					il.in_interlock_status_id = 1;
					il.in_hash = hash;
					il.in_salt = hash;
					
					var interlock_id = dataInterlock.insertInterlock(il);
					var id = null;
					if((interlock_id > 0) && !!interlock.organization.id){
						var interlock_organization = {};
						interlock_organization.in_organization_id = interlock.organization.id
						interlock_organization.in_interlock_request_id = interlock_id
						interlock_organization.in_created_user_id= userId;
						switch(interlock.organization.type){
							case 'globalTeam':
								id = dataInterlock.insertInterlockRoute(interlock_organization);
								break;
							case 'region':
								id = dataInterlock.insertInterlockRegion(interlock_organization);
								break;
							case 'subregion':
								id = dataInterlock.insertInterlockSubregion(interlock_organization);
								break;
						};
					}
					interlockResult = interlockResult && (interlock_id > 0) && (id > 0);
					if(interlockResult){
						var parameter = {
								"in_interlock_request_id": interlock_id,
								"in_interlock_status_id": il.in_interlock_status_id,
								"in_created_user_id": userId
						}
						dataInterlock.insertInterlockLogStatus(parameter);
					}
				});
				transactionOk = !!hl4_id && !!hl4_fnc_id && hl4_expected_outcomes && hl4_expected_outcomes_detail && hl4_budget_regions && hl4_budget_subregions && hl4_budget_route && hl4_sale_regions && hl4_sale_subregions && hl4_sale_route && hl4_sale_other_regions && hl4_sale_other_subregions && hl4_sale_other && partnerOK && hl4_partner && hl4_category && hl4_category_option && interlockResult;
				if(transactionOk){
					db.commit();
					/*
					 * Send the mail to HL3 owner 
					 */
					notifyChangeByEmail(data, userId, "created"); //data.hl4.in_hl3_id
				} else {
					db.rollback();
					hl4_id = null;
				}
			}
			
			return hl4_id;
		}		
	} catch(e) {
		db.rollback();
		throw e;
	} finally {
		db.closeConnection();
	}
}

function updateHl4(data, userId){
	if(!data.hl4.in_hl4_id)
	    throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/updateHl4","The HL4_ID is not found");

	if(!util.validateIsNumber(data.hl4.in_hl4_id))
	    throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/updateHl4","The HL4_ID is invalid");
	
	if(!userId)
	    throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/updateHl4","The User Id is invalid");
	
	try{
		
	    var hl4_id = null;
	    var transactionOk = true;
	    var hl4_budget_regions = true;
	    var hl4_budget_subregions = true;
	    var hl4_budget_route = true;
	    var hl4_sale_regions = true;
	    var hl4_sale_subregions = true;
	    var hl4_sale_other_regions = true;
	    var hl4_sale_other_subregions = true;
	    var hl4_sale_other = true;
	    var hl4_sale_route = true;
	    var hl4_category = true
	    var hl4_category_option = true;
	    var hl4_expected_outcomes = true;
	    var hl4_expected_outcomes_detail = true;
	    var hl4_partner = true;
	    var partnerOK = true;
	    var interlockResult = true;

	    var validationResult = validateHl4(data);

	    data.hl4.in_hl4_status_detail_id = validationResult;//.in_hl4_status_detail_id;

	    if(data.hl4.in_hl4_status_detail_id > 0){
	        //var hl3_owner = getUserById(hl3.CREATED_USER_ID);
	        data.hl4.in_user_id = userId;
	        data.hl4.in_is_send_mail = 0;
	        data.hl4.in_read_only = 0;

	        data.hl4.in_user_id_send_mail = 1;

	        var hl4 = {};
	        hl4.in_hl4_id = data.hl4.in_hl4_id;
	        hl4.in_acronym = data.hl4.in_acronym;
	        hl4.in_hl4_crm_description = data.hl4.in_hl4_crm_description;
	        hl4.in_hl4_details = data.hl4.in_hl4_details;
	        hl4.in_hl4_business_details = data.hl4.in_hl4_business_details;
	        hl4.in_hl4_status_detail_id = data.hl4.in_hl4_status_detail_id;
	        hl4.in_is_send_mail = data.hl4.in_is_send_mail;
	        hl4.in_user_id_send_mail = data.hl4.in_user_id_send_mail;
	        hl4.in_hl4_parent_id = data.hl4.in_hl4_parent_id;
	        hl4.in_read_only = data.hl4.in_read_only;
	        hl4.in_user_id = userId;
	        hl4_id = data.hl4.in_hl4_id;
	        insertHl4CRMBinding(data);
	        var deleteParameters = {"in_hl4_id": hl4_id, "in_user_id": userId}; 
	        var hl4RowsUpdated = dataHl4.updateHl4(hl4);
	        if(hl4RowsUpdated > 0){
	        	setHl4Status(hl4_id, data.hl4.in_hl4_status_detail_id, userId);
	            var conversionValue = dataEuroConversion.getEuroConversionValueById(data.hl4_fnc.in_euro_conversion_id);
	            data.hl4_fnc.in_in_budget = checkBudgetStatus(data.hl4.in_hl3_id, hl4_id, Number(data.hl4_fnc.in_hl4_fnc_budget_total_mkt) / conversionValue);
	            data.hl4_fnc.in_hl4_id = hl4_id;
	            data.hl4_fnc.in_user_id = userId;

	            data.hl4_fnc.in_hl4_fnc_result_q1 = data.hl4_fnc.in_hl4_fnc_budget_spend_q1;
	            data.hl4_fnc.in_hl4_fnc_result_q2 = data.hl4_fnc.in_hl4_fnc_budget_spend_q2;
	            data.hl4_fnc.in_hl4_fnc_result_q3 = data.hl4_fnc.in_hl4_fnc_budget_spend_q3;
	            data.hl4_fnc.in_hl4_fnc_result_q4 = data.hl4_fnc.in_hl4_fnc_budget_spend_q4;

	            data.hl4_fnc.in_hl4_fnc_budget_total_mkt =  Number(data.hl4_fnc.in_hl4_fnc_budget_total_mkt) / conversionValue;
	            
	            var hl4FncRowsUpdated = dataHl4.updateHl4Fnc(data.hl4_fnc);
	            
	            dataExOut.deleteHl4ExpectedOutcomesDetail(deleteParameters);
	            dataExOut.deleteHl4ExpectedOutcomes(deleteParameters);
	            if(data.hl4_expected_outcomes.hl4_expected_outcomes_detail.length){
		            var outcome = {};
		            outcome.in_created_user_id = userId;
		            outcome.in_hl4_id = hl4_id;
		            outcome.in_comments = data.hl4_expected_outcomes.in_comments;
		            var hl4_expected_outcomes_id = dataExOut.insertHl4ExpectedOutcomes(outcome);
		            hl4_expected_outcomes = (hl4_expected_outcomes_id > 0);
		            if(hl4_expected_outcomes){
		                data.hl4_expected_outcomes.hl4_expected_outcomes_detail.forEach(function(expectedOutcomeDetail){
		                    //if(hl4_expected_outcomes){
		                        expectedOutcomeDetail.in_created_user_id = userId;
		                        expectedOutcomeDetail.in_hl4_expected_outcomes_id = hl4_expected_outcomes_id;
		                        expectedOutcomeDetail.in_amount_value = Number(expectedOutcomeDetail.in_amount_value);
		                        var hl4_expected_outcomes_detail_id = dataExOut.insertHl4ExpectedOutcomesDetail(expectedOutcomeDetail);
		                        hl4_expected_outcomes = hl4_expected_outcomes && (hl4_expected_outcomes_detail_id > 0);
		                    //}
		                });
		            }
	            }

	            dataHl4.deleteHl4BudgetRegion(deleteParameters);
	            if(data.hl4_budget.regions){
	                data.hl4_budget.regions.forEach(function(budget_region){
	                    budget_region.in_hl4_id = hl4_id;
	                    budget_region.in_created_user_id = userId;
	                    var budget_region_id = dataHl4.insertHl4BudgetRegion(budget_region);
	                    hl4_budget_regions = hl4_budget_regions && (budget_region_id > 0);
	                });
	            }

	            dataHl4.deleteHl4BudgetSubRegion(deleteParameters);
	            if(data.hl4_budget.subregions){
	                data.hl4_budget.subregions.forEach(function(budget_subregion){
	                    budget_subregion.in_hl4_id = hl4_id;
	                    budget_subregion.in_created_user_id = userId;
	                    var budget_subregion_id = dataHl4.insertHl4BudgetSubRegion(budget_subregion);
	                    hl4_budget_subregions = hl4_budget_regions && (budget_subregion_id > 0);
	                });
	            }

	            dataHl4.deleteHl4BudgetRoute(deleteParameters);
	            if(data.hl4_budget.routes){
	                data.hl4_budget.routes.forEach(function(budget_route){
	                    budget_route.in_hl4_id = hl4_id;
	                    budget_route.in_created_user_id = userId;
	                    var budget_route_id = dataHl4.insertHl4BudgetRoute(budget_route);
	                    hl4_budget_route = hl4_budget_regions && (budget_route_id > 0);
	                });
	            }

	            dataHl4.deleteHl4SaleRegion(deleteParameters);
	            if(data.hl4_sale.regions){
	                data.hl4_sale.regions.forEach(function(sale_region){
	                    sale_region.in_hl4_id = hl4_id;
	                    sale_region.in_created_user_id = userId;
	                    sale_region.in_amount = Number(sale_region.in_amount) / conversionValue;
	                    var sale_region_id = dataHl4.insertHl4SaleRegion(sale_region);
	                    hl4_sale_regions = hl4_sale_regions && (sale_region_id > 0);
	                });
	            }

	            dataHl4.deleteHl4SaleSubRegion(deleteParameters);
	            if(data.hl4_sale.subregions){
	                data.hl4_sale.subregions.forEach(function(sale_subregion){
	                    sale_subregion.in_hl4_id = hl4_id;
	                    sale_subregion.in_created_user_id = userId;
	                    sale_subregion.in_amount = Number(sale_subregion.in_amount) / conversionValue;
	                    var sale_subregion_id = dataHl4.insertHl4SaleSubRegion(sale_subregion);
	                    hl4_sale_subregions = hl4_sale_subregions && (sale_subregion_id > 0);
	                });
	            }

	            dataHl4.deleteHl4SaleRoute(deleteParameters);
	            if(data.hl4_sale.routes){
	                data.hl4_sale.routes.forEach(function(sale_route){
	                    sale_route.in_hl4_id = hl4_id;
	                    sale_route.in_created_user_id = userId;
	                    sale_route.in_amount = Number(sale_route.in_amount) / conversionValue;
	                    var sale_route_id = dataHl4.insertHl4SaleRoute(sale_route);
	                    hl4_sale_route = hl4_sale_route && (sale_route_id > 0);
	                });
	            }
                //TODO: delete deleteHl4SaleOtherRegion, deleteHl4SaleOtherSubRegion
	            dataHl4.deleteHl4SaleOtherRegion(deleteParameters);
	            dataHl4.deleteHl4SaleOtherSubRegion(deleteParameters);
	            if(data.hl4_sale.other){

	                if(Object.keys(data.hl4_sale.other.region).length > 0){
	                    data.hl4_sale.other.region.in_hl4_id = hl4_id;
	                    data.hl4_sale.other.region.in_created_user_id = userId;
	                    data.hl4_sale.other.region.in_amount = Number(data.hl4_sale.other.region.in_amount) / conversionValue;
	                    var sale_other_region_id = dataHl4.insertHl4SaleOtherRegion(data.hl4_sale.other.region);
	                    hl4_sale_other_regions = hl4_sale_other_regions && (sale_other_region_id > 0);
	                }

	                if(Object.keys(data.hl4_sale.other.subregion).length > 0){
	                    data.hl4_sale.other.subregion.in_hl4_id = hl4_id;
	                    data.hl4_sale.other.subregion.in_created_user_id = userId;
	                    data.hl4_sale.other.subregion.in_amount = Number(data.hl4_sale.other.subregion.in_amount) / conversionValue;
	                    var sale_other_subregion_id = dataHl4.insertHl4SaleOtherSubRegion(data.hl4_sale.other.subregion);
	                    hl4_sale_other_subregions = hl4_sale_other_subregions && (sale_other_subregion_id > 0);
	                }

	            }
	            
	            //sales other
	            dataHl4.deleteHl4SaleOther({"in_hl4_id": hl4_id});
	            if(data.hl4_sale.others){
		            data.hl4_sale.others.forEach(function(other){
						other.in_hl4_id = hl4_id;
						other.in_created_user_id = userId;
						other.in_amount = Number(other.in_amount) / conversionValue;
					    var sale_other_id = dataHl4.insertHl4SaleOther(other);
					    hl4_sale_other = hl4_sale_other && (sale_other_id > 0);
		            });
	            }
	            
	            
	            dataPartner.deleteHl4Partner(deleteParameters)
	            data.partners.forEach(function(partner){
	                partner.in_created_user_id = userId;
	                partner.in_hl4_id = hl4_id
	                var partner_id = dataPartner.insertHl4Partner(partner);
	                partnerOK = partnerOK && (partner_id > 0);
	            });
	            var hl4CategoryIds = [];
	            var hl4CategoryOptionRowsUpdated = 0;
	            data.hl4_category.forEach(function(hl4Category){
	                var hl4_category_id = dataHl4.getHl4Category(hl4_id,hl4Category.in_category_id)[0].HL4_CATEGORY_ID;
	                hl4CategoryIds.push(hl4_category_id);
	                hl4Category.hl4_category_option.forEach(function(hl4CategoryOption){
	                    hl4CategoryOption.in_user_id = userId;
	                    hl4CategoryOption.in_hl4_category_id = hl4_category_id;
	                    hl4CategoryOptionRowsUpdated = hl4CategoryOptionRowsUpdated + dataHl4.updateHl4CategoryOption(hl4CategoryOption);
	                    
	                    hl4_category_option = hl4_category_option && (hl4CategoryOptionRowsUpdated > 0);
	                });
	            });

	            //dataInterlock.deleteInterlockLogStatus(hl4_id);
	            dataInterlock.deleteInterlockRoute(deleteParameters);
	            dataInterlock.deleteInterlockRegion(deleteParameters);
	            dataInterlock.deleteInterlockSubregion(deleteParameters);
	            dataInterlock.deleteInterlock(deleteParameters);

	            data.interlock.forEach(function(interlock){
	                var il = {};
	                var hash = getSYSUUID();
	                il.in_entity_id= interlock.in_entity_id;
	                il.in_hl4_id = hl4_id;
	                il.in_organization_type_id= interlock.organization.type === 'globalTeam' ? 1 :
						interlock.organization.type === 'region' ? 2 :
							interlock.organization.type === 'subregion' ? 3 : 0;
					/*
					 * TODO: remove hardcoded in_requested_user_id
					 */
	                //il.in_requested_user_id= interlock.in_requested_user_id;
					il.in_requested_user_id= 1;
	                
	                il.in_requested_resource= interlock.in_requested_resource;
	                il.in_requested_budget= Number(interlock.in_requested_budget) / conversionValue;
	                il.in_created_user_id= userId;
	                il.in_interlock_status_id = 1;
	                il.in_hash = hash;
	                il.in_salt = hash;

	                var interlock_id = dataInterlock.insertInterlock(il);
	                
	                var id = null;
	                
	                if(interlock_id && interlock.organization.id){
	                    var interlock_organization = {};
	                    interlock_organization.in_organization_id = interlock.organization.id
	                    interlock_organization.in_interlock_request_id = interlock_id
	                    interlock_organization.in_created_user_id= userId;
	                    switch(interlock.organization.type){
	                        case 'globalTeam':
	                            id = dataInterlock.insertInterlockRoute(interlock_organization);
	                            break;
	                        case 'region':
	                            id = dataInterlock.insertInterlockRegion(interlock_organization);
	                            break;
	                        case 'subregion':
	                            id = dataInterlock.insertInterlockSubregion(interlock_organization);
	                            break;
	                    };
	                }
	                
	                interlockResult = interlockResult && interlock_id && id;
	                if(interlockResult){
	                 var parameter = {
	                 "in_interlock_request_id": interlock_id,
	                 "in_interlock_status_id": il.in_interlock_status_id,
	                 "in_created_user_id": userId
	                 }
	                 dataInterlock.insertInterlockLogStatus(parameter);
	                 }
	            });

	            transactionOk = !!hl4RowsUpdated && !!hl4FncRowsUpdated && hl4_expected_outcomes && hl4_expected_outcomes_detail && hl4_budget_regions && hl4_budget_subregions && hl4_budget_route && hl4_sale_regions && hl4_sale_subregions && hl4_sale_route && hl4_sale_other_regions && hl4_sale_other_subregions && hl4_sale_other && partnerOK && hl4_partner && hl4_category && hl4_category_option && interlockResult;
	            if(transactionOk){
	            	 db.commit();
	            	/*
	                 * Send the mail to HL3 owner 
	                 */	               
	                notifyChangeByEmail(data, userId, "updated"); //data.hl4.in_hl3_id
	            } else {
	                db.rollback();
	                return null;
	            }
	        } else {
	        	db.rollback();
	            return null;
	        }

	        return data;
	    }
	} catch(e) {
	    db.rollback();
	    throw ErrorLib.getErrors().CustomError("prueba","Test",e.toString());
	} finally {
	    db.closeConnection();
	}
}

function deleteHl4(hl4, userId){
	if(!hl4.in_hl4_id)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/deleteHl4","The HL4_ID is not found");
	
	if(!util.validateIsNumber(hl4.in_hl4_id))
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/deleteHl4","The HL4_ID is invalid");

	var userRoleId = Number(dbUser.getUserRoleByUserId(userId)[0].ROLE_ID);
	if(userRoleId !== 1 && userRoleId !== 2)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/deleteHl4","Not enough privilege 666");
	
	var hl4StatusId = Number(dataHl4.getHl4StatusByHl4Id(hl4.in_hl4_id).hl4_status_detail_id);
	if(hl4StatusId !== 3 && hl4StatusId !== 4)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/deleteHl4","Cannot delete this Item, status doesn´t allow it");
	
	if(dataHl4.getCountHl4Childrens(hl4.in_hl4_id) > 0)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/deleteHl4","Cannot delete this Item, it has associated HL5");
	
	try{
		hl4.in_user_id = userId;
		var transactionOk = true;
		var hl4_id = hl4.in_hl4_id;		
		dataPartner.deleteHl4Partner(hl4);
		dataExOut.deleteHl4ExpectedOutcomesDetail(hl4);
		dataExOut.deleteHl4ExpectedOutcomes(hl4);

		//dataInterlock.deleteInterlockLogStatus(hl4);
		dataInterlock.deleteInterlockRoute(hl4);
		//throw ErrorLib.getErrors().CustomError("Delete HL4","Delete HL4","hello --- "+transactionOk);
		dataInterlock.deleteInterlockRegion(hl4);
		dataInterlock.deleteInterlockSubregion(hl4);
		dataInterlock.deleteInterlock(hl4);
		dataHl4.deleteHl4Fnc(hl4);
		dataHl4.deleteHl4CategoryOption(hl4);
		dataHl4.deleteHl4Category(hl4);
		dataHl4.deleteHl4BudgetRegion(hl4);
		dataHl4.deleteHl4BudgetSubRegion(hl4);
		dataHl4.deleteHl4BudgetRoute(hl4);
		dataHl4.deleteHl4SaleRegion(hl4);
		dataHl4.deleteHl4SaleSubRegion(hl4);
		dataHl4.deleteHl4SaleRoute(hl4);
		//TODO: delete deleteHl4SaleOtherRegion & deleteHl4SaleOtherSubRegion
		dataHl4.deleteHl4SaleOtherRegion(hl4);
		dataHl4.deleteHl4SaleOtherSubRegion(hl4);
		//sale others
		dataHl4.deleteHl4SaleOther(hl4);
		dataHl4.deleteHl4(hl4);
		db.commit();
	} catch(e) {
		db.rollback();
		throw ErrorLib.getErrors().CustomError("Delete HL4","Delete HL4",e.toString());
	} finally {
		db.closeConnection();
	}
	
	return hl4;
}

function validateHl4(data){
	if(!data)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 is not found");
	
	if(!data.hl4.in_hl4_details)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 Priority Details is not found");
	
	if(!data.hl4.in_hl4_business_details)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 Business Value is not found");
	
	if(!data.hl4.in_acronym)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 Acronym is not found");
	
	var hl4 = dataHl4.getHl4ByAcronym(data.hl4.in_acronym)[0];
	
	if(data.hl4.in_hl4_id && hl4 && hl4.HL4_ID != data.hl4.in_hl4_id)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4-666","The Hl4 Acronym is duplicated");
	
	if(!data.hl4.in_hl4_id && hl4)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 Acronym is duplicated");
	
	if(!data.hl4.in_acronym.length === 4)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 Acronym length must be 4 leters");
	
	if(!data.hl4.in_hl4_crm_description)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 CRM description is not found");
	
	if(!data.hl4_fnc)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 FNC is not found");
	
	if(!data.hl4_fnc.in_hl4_fnc_budget_total_mkt)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 Budget is not found");
	
	if(!data.hl4_fnc.in_euro_conversion_id)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 Currency ID is not found");
	
	if(!Number(data.hl4_fnc.in_euro_conversion_id))
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 Currency ID is invalid");
	
	if(!data.hl4_fnc.in_hl4_fnc_budget_spend_q1 && !data.hl4_fnc.in_hl4_fnc_budget_spend_q2 && !data.hl4_fnc.in_hl4_fnc_budget_spend_q3 && !data.hl4_fnc.in_hl4_fnc_budget_spend_q4)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 budget spend must be set");
	
	var q1 = Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q1) || 0;
	var q2 = Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q2) || 0;
	var q3 = Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q3) || 0;
	var q4 = Number(data.hl4_fnc.in_hl4_fnc_budget_spend_q4) || 0;
	
	var budgetSpend = q1 + q2 + q3 +q4;
	
	if(budgetSpend < 100)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 Budget Spend must be 100%");

	if(!data.hl4_budget)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Hl4 My Budget is not found");
	var hl4MyBudgetKeys = Object.keys(data.hl4_budget);
	var myBudgetTotalPercentage = 0;
	var myBudgetComplete = false;
	hl4MyBudgetKeys.forEach(function(hl4MyBudgetKey){
		if(data.hl4_budget[hl4MyBudgetKey] && data.hl4_budget[hl4MyBudgetKey].length){
			data.hl4_budget[hl4MyBudgetKey].forEach(function(myBudget){
				if(hl4MyBudgetKey == "regions"){
					if(!myBudget.in_region_id || !Number(myBudget.in_region_id))
						throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Hl4 My Budget " + hl4MyBudgetKey + " ID is invalid ");
				} else {
					if(!myBudget.in_route_id || !Number(myBudget.in_route_id))
						throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Hl4 My Budget " + hl4MyBudgetKey + " ID is invalid ");
				}
				if(!Number(myBudget.in_percentage) && myBudget.in_percentage != 0)
					throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 My Budget " + hl4MyBudgetKey + " amount is invalid ");
				
				myBudgetTotalPercentage = myBudgetTotalPercentage + Number(myBudget.in_percentage);
			});
		}
	});
	if(myBudgetTotalPercentage > 100)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 My Budget percentage should be less than or equal to 100%");
	if(myBudgetTotalPercentage < 100)
		myBudgetTotalPercentage = 0;
	
	myBudgetComplete = !!myBudgetTotalPercentage;
	
	if(data.hl4_sale){
		Object.keys(data.hl4_sale).forEach(function(key){
			data.hl4_sale[key].forEach(function(sale){
				if(key == "regions"){
					if(!sale.in_region_id || !Number(sale.in_region_id))
						throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Hl4 Sales " + key +  " ID is invalid ");
				} else if (key === "routes"){
					if(!sale.in_route_id || !Number(sale.in_route_id))
						throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Hl4 Sales " + key +  " ID is invalid ");
				}
				else{
					 validateSaleOthers(data.hl4_sale[key]);
				}
				if(!Number(sale.in_amount) && sale.in_amount != 0)
					throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","The Hl4 Sales " + key +  " amount (" + sale.in_amount + ") is invalid ");
			});
		});
	};
		
	if(data.interlock && data.interlock.length){
		data.interlock.forEach(function(interlock){
			if(!interlock.in_entity_id)
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Interlock entity is not found");
			if(!interlock.in_requested_budget && !interlock.in_requested_resource)
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Interlock request resource and budget are not found");
			if(!Number(interlock.in_requested_budget))
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Interlock request budget is invalid");
			if(!interlock.organization) {
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Interlock organization is not found");
			} else {
				if(!interlock.organization.type)
					throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Interlock organization type is not found");
				if(!interlock.organization.id)
					throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Interlock organization id is not found");
			}
			
		})
	}
	
	if(data.hl4_expected_outcomes && data.hl4_expected_outcomes.hl4_expected_outcomes_detail.length){
		//data.hl4_expected_outcomes.forEach(function(hl4ExpectedOutcomes){
			/*if(!data.hl4_expected_outcomes.in_comments)
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Expected Outcomes comment is not found");*/
			//if(!data.hl4_expected_outcomes.hl4_expected_outcomes_detail || !data.hl4_expected_outcomes.hl4_expected_outcomes_detail.length)
				//throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Expected Outcomes details is not found");
			data.hl4_expected_outcomes.hl4_expected_outcomes_detail.forEach(function(hl4ExpectedOutcomesDetail){
				if(hl4ExpectedOutcomesDetail.in_amount_value != 0 && !Number(hl4ExpectedOutcomesDetail.in_amount_value))
					throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Expected Outcomes details amount value is invalid");
				if(!hl4ExpectedOutcomesDetail.in_euro_value || !Number(hl4ExpectedOutcomesDetail.in_euro_value))
					throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Expected Outcomes details euro value is invalid");
				if(!hl4ExpectedOutcomesDetail.in_outcomes_id || !Number(hl4ExpectedOutcomesDetail.in_outcomes_id))
					throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Outcome ID is invalid");
			});
		//});
	}
	
	if(data.partners && data.partners.length){
		data.partners.forEach(function(partner){
			if(!partner.in_partner_type_id || !Number(partner.in_partner_type_id))
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Partner type ID is invalid");
			if(!partner.in_partner_name)
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Partner name is not found");
			if(!partner.in_region_id || !Number(partner.in_region_id))
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Partner region ID is invalid");
			if(!partner.in_value || !Number(partner.in_value))
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Partner value ID is invalid");
		});
	}
		
	if(!data.hl4_category)
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Category cannot be empty");
	
	if(data.hl4_category.length !== dataCategory.getCountByHlId("hl4"))
		throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Incorrect number of categories");
	
	var totalPercentage = 0;
	
	var categoryOptionComplete = false;
	data.hl4_category.forEach(function(hl4Category){
		var percentagePerOption = 0;
		if(!hl4Category.in_category_id || !Number(hl4Category.in_category_id))
			throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Category ID is invalid");
		if(!hl4Category.hl4_category_option.length)
			throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Category Options cannot be empty");
		if(hl4Category.hl4_category_option.length !== dataOption.getOptionCountByCategoryId(hl4Category.in_category_id))
			throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Incorrect number of options");
		hl4Category.hl4_category_option.forEach(function(option){
			if(!option.in_option_id || !Number(option.in_option_id))
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Option ID is invalid");
			if((parseFloat(option.in_amount) && !Number(option.in_amount)) || Number(option.in_amount) > 100 || Number(option.in_amount) < 0)
				throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Option value is invalid (actual value " + option.in_amount + ")");

			percentagePerOption = percentagePerOption + Number(option.in_amount);

		});
		if(percentagePerOption > 100){
			throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4","Category total percentage should be less than or equal to 100%");
		} else if (percentagePerOption < 100){
			categoryOptionComplete = false;
			return false;
		} else {
			categoryOptionComplete = true;
		}
	});

	var status = null;
	if(data.hl4.in_hl4_id){
		var hl4StatusId = dataHl4.getHl4StatusByHl4Id(data.hl4.in_hl4_id).HL4_STATUS_DETAIL_ID;
		status = !categoryOptionComplete || !myBudgetComplete ? HL4_STATUS.IN_PROGRESS : hl4StatusId == HL4_STATUS.IN_CRM || hl4StatusId == HL4_STATUS.UPDATE_IN_CRM ? HL4_STATUS.UPDATE_IN_CRM : HL4_STATUS.LOAD_DATA_ENTRY;
	} else {
		status = categoryOptionComplete && myBudgetComplete ? HL4_STATUS.LOAD_DATA_ENTRY : HL4_STATUS.IN_PROGRESS;
	}
	return status;
}

function validateSaleOthers(others){
	var keys = [ 'in_description', 'in_amount'];
	var valid = true;
	if(others){
		others.forEach(function(obj) {
			keys.forEach(function(key) {
				if (obj[key] === null || obj[key] === undefined) {
					throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4"
							,"The Hl4 Sales Other has not attributes.");
				} else {
					// validate attribute type
					if(key === "in_description")
						valid = obj[key].length > 0;
					else if(key === "in_amount"){
						if(Number(obj[key]) !== 0)
							valid = Number(obj[key]);
					}
					
					if(!valid)
						throw ErrorLib.getErrors().CustomError("","hl4Services/handlePost/insertHl4"
							,"The Hl4 Sales Other " + obj.in_description +  " amount (" + obj.in_amount + ") is invalid ");
				}
			});
		});
	}
	return valid;
}

function checkBudgetStatus(objHl3, hl4_id, new_hl4_budget) {
	if(hl4_id && new_hl4_budget){
		var objHl = {};
		objHl.IN_HL3_ID = Number(objHl3) ? objHl3 : objHl3.IN_HL3_ID;
		objHl.IN_HL4_ID = hl4_id;
		var hl3 =  dataHl3.getLevel3ById(objHl);
		var hl3AllocatedBudget = dataHl3.getHl3AllocatedBudget(objHl.IN_HL3_ID);
		return (hl3.HL3_FNC_BUDGET_TOTAL - hl3AllocatedBudget - new_hl4_budget) > 0 ? 1 : 0;
	} else {
		var result = {};
		result.out_result = 0;
		//lists of hl4 changed to send email to client
		result.emailListInBudget = [];
		result.emailListOutBudget = [];
		
		//var parameters = {};
		//parameters.in_hl3_id = objHl3.IN_HL3_ID;
		var resultHl4 = dataHl4.getHl4(objHl3.IN_HL3_ID);// GET_HL4_BY_HL3_ID

		if (resultHl4) {
			var total = 0;
		
			for (var i = 0; i < resultHl4.out_result.length; i++) {				
				//objHl3.IN_HL3_FNC_BUDGET_TOTAL came from request
				//total	+ resOdb.out_hl4_budget_total_mkt asigned on hl4
				
				if (objHl3.IN_HL3_FNC_BUDGET_TOTAL < total	+ parseFloat(resultHl4.out_result[i].HL4_BUDGET)) {
					dataHl4.updateHl4BudgetStatus(resultHl4.out_result[i].HL4_ID, 0);
					//store hl4id and users to be send email when register change to in budget
					result.emailListOutBudget.push(resultHl4.out_result[i]);
				} else {
					dataHl4.updateHl4BudgetStatus(resultHl4.out_result[i].HL4_ID, 1);
					total = total + parseFloat(resultHl4.out_result[i].HL4_BUDGET);
					//is completed
					if(resultHl4.out_result[i].STATUS_ID === 3){
						dataHl4.changeStatusHl4(resultHl4.out_result[i].HL4_ID, 4, userId);
					}
					//store hl4id and users to be send email when register change to in budget
					result.emailListInBudget.push(resultHl4.out_result[i]);
				}
			}
			result.out_result = resultHl4.out_result.length;
		}
		return result;
	}
}

/* Function to set HL4 status */
function setHl4Status(hl4_id, status_id, userId) {
	try {
		
		// TODO: add validation rules
		// var isHl4Complete = checkComplete();
		var updateOK = null;

		if(hl4_id && status_id && userId){
			var changeHL4tatus= dataHl4.changeStatusHl4(hl4_id, status_id, userId).out_result_hl4;
			var insertHL4LogStatus = dataHl4.insertHl4LogStatus(hl4_id, status_id, userId);
			if( !!changeHL4tatus &&  !!insertHL4LogStatus){
				updateOK = changeHL4tatus;
				if(HL4_STATUS.IN_CRM == status_id){
					if(level4DER.deleteL4ChangedFieldsByHl4Id(hl4_id)){
						db.commit();
					} else {
						updateOK = false;
						db.rollback();
					}
						
				} else {
					db.commit();
				}
			} else {
				updateOK = false;
				db.rollback();
			}
		}
		
		return updateOK;
	} catch(e) {
		db.rollback();
		throw e;
	} finally {
		db.closeConnection();
	}	
}

/* Set HL4 status to In CRM */
function setHl4StatusInCRM(hl4_id, userId){
	return setHl4Status(hl4_id, HL4_STATUS.IN_CRM, userId);
}

function getSYSUUID(){
	var conn = $.hdb.getConnection();

	try {

		// Delete any existing token for this user
		var spUserToken = conn.loadProcedure('PLANNING_TOOL', 'xsplanningtool.db.procedures::GET_SYSUUID');
		var result = spUserToken();
		conn.close();
		
		var spResult = result['out_result'];
		if(spResult != null && spResult.length > 0){
			var rowResult = spResult[0];
			return rowResult['SYS_UNIQUE_NUMBER'];
		}

		return null;

	} catch (e) {
		conn.close();
		throw e;
	}
}

function getHl4CategoryOption(hl4_id){
	var hl4Categories = dataHl4.getHl4Category(hl4_id);
	var result = [];
	hl4Categories.forEach(function(catgory){
		var aux = util.extractObject(catgory);
		var hl4Category = {};
		aux["hl4_category_option"] = dataHl4.getHl4CategoryOption(aux.HL4_CATEGORY_ID);
		hl4Category.hl4_category_option = [];
		Object.keys(aux).forEach(function(key){
			if(key === "hl4_category_option"){
				for(var i=0;i<aux[key].length; i++){
					var option = {};
					Object.keys(aux[key][i]).forEach(function(auxKey){
						option["in_"+auxKey.toLowerCase()] = aux[key][i][auxKey];
					});
					hl4Category.hl4_category_option.push(option);
				}
			} else {
				hl4Category["in_"+key.toLowerCase()] = aux[key];
			}
		});
		result.push(hl4Category);
	});
	return result;
}

function getHl4MyBudgetByHl4Id(id){
	var myBudgets = dataHl4.getHl4MyBudgetByHl4Id(id);
	var hl4MyBudgetKeys = Object.keys(myBudgets);
	var myBudgetTotalPercentage = 0;
	var aux = {};
	hl4MyBudgetKeys.forEach(function(hl4MyBudgetKey){
		aux["in_" + hl4MyBudgetKey.toLowerCase()] = myBudgets[hl4MyBudgetKey];
		myBudgets[hl4MyBudgetKey].forEach(function(myBudget){
			myBudgetTotalPercentage = myBudgetTotalPercentage + Number(myBudget.PERCENTAGE);
		});
	});
	aux.total = myBudgetTotalPercentage;
	return aux;
}

function getHl4SalesByHl4Id(id){
	var sales = dataHl4.getHl4SalesByHl4Id(id);
	var hl4SalesKeys = Object.keys(sales);
	var totalAmount = 0;
	var aux = {};
	hl4SalesKeys.forEach(function(hl4SalesKey){
		aux["in_" + hl4SalesKey.toLowerCase()] = sales[hl4SalesKey]
		sales[hl4SalesKey].forEach(function(sale){
			totalAmount = totalAmount + Number(sale.AMOUNT);
		});
	});
	aux.total = totalAmount;
	return aux;
}

function insertHl4CRMBinding(hl4, action) {
	if(hl4.hl4.in_hl4_status_detail_id == HL4_STATUS.IN_PROGRESS)
		return 0;
		
	var crmBindingFields = {"hl4": ["ACRONYM",
	                                "HL4_CRM_DESCRIPTION",
	                                "HL4_DETAILS",
	                                "HL4_BUSINESS_DETAILS"],
                            "hl4_fnc": ["HL4_FNC_BUDGET_TOTAL_MKT"]}
	
	var deReportDisplayName = {
		"ACRONYM": "Acronym",
		"HL4_CRM_DESCRIPTION": "CRM description",
		"HL4_DETAILS": "Initiative/Campaign details",
		"HL4_BUSINESS_DETAILS": "Business value",
		"HL4_FNC_BUDGET_TOTAL_MKT": "Budget"
	}
	
	if(hl4.hl4.in_hl4_status_detail_id == HL4_STATUS.LOAD_DATA_ENTRY){
		level4DER.deleteL4ChangedFieldsByHl4Id(hl4.hl4.in_hl4_id)
		Object.keys(crmBindingFields).forEach(function(object){
			crmBindingFields[object].forEach(function(field){
				var parameters = {
					"in_hl4_id": hl4.hl4.in_hl4_id,
					"in_column_name": field,
					"in_changed": 1,
					"in_user_id": hl4.hl4.in_created_user_id,
					"in_display_name": deReportDisplayName[field]
				};
				dataHl4.insertHl4CRMBinding(parameters)
			});
		});
	} else if (hl4.hl4.in_hl4_status_detail_id == HL4_STATUS.UPDATE_IN_CRM) {
		var hl4CrmBinding = dataL4DER.getL4ChangedFieldsByHl4Id(hl4.hl4.in_hl4_id);
		var oldHl4 = getHl4ById(hl4.hl4.in_hl4_id);
		Object.keys(crmBindingFields).forEach(function(object){
			crmBindingFields[object].forEach(function(field){
				if(oldHl4[object]["in_" + field.toLowerCase()] != hl4[object]["in_" + field.toLowerCase()]){
					var parameters = {
						"in_hl4_id": hl4.hl4.in_hl4_id,
						"in_column_name": field,
						"in_changed": 1,
						"in_user_id": hl4.hl4.in_user_id,
						"in_display_name": deReportDisplayName[field]
					};
					var in_hl4_crm_binding_id = dataL4DER.getL4ChangedFieldsByHl4IdByField(hl4.hl4.in_hl4_id, field)[0] ? dataL4DER.getL4ChangedFieldsByHl4IdByField(hl4.hl4.in_hl4_id, field)[0].ID : null;
					if(in_hl4_crm_binding_id){
						parameters.in_hl4_crm_binding_id = in_hl4_crm_binding_id;
						dataHl4.updateHl4CRMBinding(parameters);
					} else {
						dataHl4.insertHl4CRMBinding(parameters);
					}
				}
			});
		});
	}
}

function parseObject(data) {
	if(Array.isArray(data)){
		var collection = [];
		data.forEach(function(obj){
			var object = {};
			Object.keys(obj).forEach(function(key){
				object["in_" + key.toLowerCase()] = obj[key];
			});
			collection.push(object);
		});
		return collection;
	} else {
		var object = {};
		Object.keys(data).forEach(function(key){
			object["in_" + key.toLowerCase()] = data[key];
		});
		return object;
	}
	
}
//event is "Created" or "Updated"
function notifyChangeByEmail(data, userId, event){
 	try{
		var Hl3Id = data.hl4.in_hl3_id;	
		var HL3 = level3BL.getLevel3ById(Hl3Id);		
		var ownerId = HL3.CREATED_USER_ID;
		var Owner = userBL.getUserById(ownerId);
		var user = userBL.getUserById(userId);
		var path = pathBL.getPathByLevelParentToCRM(4,Hl3Id).PATH_TPH;
		
		var body = ' <p> Dear Colleague </p>  <p>The User : '+userBL.getUserById(userId).USER_NAME+' has set the Initiative/Campaign '+path+' for you.</p>  <p>Click on the '+config.getAppUrl()+' to review</p>';
		var mailObject = mail.getJson([ {
			"address" : Owner[0].EMAIL
		} ], "Marketing Planning Tool - Level 4 "+event, body);
		
		var rdo = mail.sendMail(mailObject,true);
		
	}catch(e){
		businessError.log(ErrorLib.getErrors().CustomError("","level4/notifyChangeByEmail",e),userId);
	}

}