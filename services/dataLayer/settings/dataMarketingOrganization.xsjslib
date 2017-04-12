/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
//STORE PROCEDURE LIST NAME
var GET_ALL_SALES_ORGANIZATIONS = "GET_ALL_SALES_ORGANIZATIONS";
var INS_SALE_ORGANIZATION = "INS_SALE_ORGANIZATION";
var UPD_SALE_ORGANIZATION = "UPD_SALE_ORGANIZATION";
var DEL_SALE_ORGANIZATION = "DEL_SALE_ORGANIZATION";
var GET_SALES_ORGANIZATIONS_BY_ID = "GET_SALES_ORGANIZATIONS_BY_ID";
var GET_SALES_ORGANIZATIONS_BY_NAME = "GET_SALES_ORGANIZATIONS_BY_NAME";
var COUNT_MARKETING_ORGANIZATION_USES = "COUNT_MARKETING_ORGANIZATION_USES";
/******************************************************/


function getAllMarketingOrganization(){
	var parameters = {};
	var data = db.executeProcedureManual(GET_ALL_SALES_ORGANIZATIONS, parameters);
	return db.extractArray(data.out_result);
}

function getMarketingOrganizationUses(marketingOrganizationId) {
    var params = {
        'in_marketing_organization_id': marketingOrganizationId
    };
    return db.executeScalarManual(COUNT_MARKETING_ORGANIZATION_USES, params, 'out_result');
}

function InsertMarketingOrganization(name, userId, autoCommit){
	var params = {
		'IN_NAME': name,
		'IN_CREATED_USER_ID' : userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(INS_SALE_ORGANIZATION,params,'OUT_RESULT');
	}else{
		rdo = db.executeScalarManual(INS_SALE_ORGANIZATION,params,'OUT_RESULT');
	}
	return rdo;
}

function UpdateMarketingOrganization(SALES_ORGANIZATION_ID, name, userId, autoCommit){
	var params = {
		'IN_SALES_ORGANIZATION_ID': SALES_ORGANIZATION_ID,
		'IN_NAME': name,
		'IN_MODIFIED_USER_ID' : userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(UPD_SALE_ORGANIZATION,params,'OUT_RESULT');
	}else{
		rdo = db.executeScalarManual(UPD_SALE_ORGANIZATION,params,'OUT_RESULT');
	}
	return rdo;
}

function DeleteMarketingOrganization(SALES_ORGANIZATION_ID, userId, autoCommit){
	var params = {
		'IN_SALES_ORGANIZATION_ID': SALES_ORGANIZATION_ID,
		'IN_MODIFIED_USER_ID' : userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(DEL_SALE_ORGANIZATION,params,'OUT_RESULT');
	}else{
		rdo = db.executeScalarManual(DEL_SALE_ORGANIZATION,params,'OUT_RESULT');
	}
	return rdo;
}

function getMarketingOrganizationById(Id){
	var parameters = {'in_id':Id};
	var data = db.executeProcedureManual(GET_SALES_ORGANIZATIONS_BY_ID, parameters);
	return db.extractArray(data.out_result);
}

function getMarketingOrganizationByName(name){
	var parameters = {'in_name':name};
	var data = db.executeProcedureManual(GET_SALES_ORGANIZATIONS_BY_NAME, parameters);
	return db.extractArray(data.out_result)[0];
}