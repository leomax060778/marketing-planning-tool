/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbMO = mapper.getDataMarketingOrganization();
/*************************************************/



function getAllMarketingOrganization(){
	return dbMO.getAllMarketingOrganization();
}

function InsertMarketingOrganization(organization, userId){
	if(organization)
		return dbMO.InsertMarketingOrganization(organization.NAME, userId, true);
	return ErrorLib.getErrors().BadRequest("","","Marketing Organization is empty");
}

function UpdateMarketingOrganization(organization, userId){
	if(organization)
		return dbMO.UpdateMarketingOrganization(organization.SALES_ORGANIZATION_ID, organization.NAME, userId, true);
	return ErrorLib.getErrors().BadRequest("","","Marketing Organization is empty");
}

function DeleteMarketingOrganization(organization, userId){
	if(organization.SALES_ORGANIZATION_ID){
		if(dbMO.getMarketingOrganizationUses(organization.SALES_ORGANIZATION_ID))
            throw ErrorLib.getErrors().CustomError("",
                "marketingOrganizationServices/handleDelete/delMarketingOrganization/DeleteMarketingOrganization",
                "Cannot delete this marketing organization, it´s in use.");

        return dbMO.DeleteMarketingOrganization(organization.SALES_ORGANIZATION_ID, userId, true);
    }
	return ErrorLib.getErrors().BadRequest("","","Marketing Organization is empty");
}

function getMarketingOrganizationById(id){
	if(id)
		return dbMO.getMarketingOrganizationById(id);
	return ErrorLib.getErrors().BadRequest("","","Marketing Organization Id is empty");
}