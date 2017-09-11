/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbOption = mapper.getDataServiceRequest();
/*************************************************/

function getAvailableOptionByCategoryIdByLevelId(categoryId, levelId){
	if(!categoryId || !levelId)
		throw ErrorLib.getErrors().CustomError("",
			"",
			"Either Category or Level wasn´t found.");

	return dbOption.getAvailableOptionByCategoryIdByLevelId(categoryId, levelId);
}

function getAssignedOptionByCategoryIdByLevelId(categoryId, levelId, fromTph){
	if(!categoryId || !levelId)
		throw ErrorLib.getErrors().CustomError("",
			"",
			"Either Category or Level wasn´t found.");

	return dbOption.getAssignedOptionByCategoryIdByLevelId(categoryId, levelId);
}

function getServiceRequestOptions(){
	return dbOption.getServiceRequestOption();
}

function insertServiceRequestOption(reqBody, userId) {
	var objOption = dbOption.getServiceRequestOptionByName(reqBody.NAME);
	if(objOption && objOption.length)
		throw ErrorLib.getErrors().CustomError("","AllocationOptionService", "Cannot create the option beacause exists another with same name.");

	return dbOption.insertServiceRequestOption(reqBody.NAME, userId);
}

function updateServiceRequestOption(reqbody, userId) {
    var objOption = dbOption.getServiceRequestOptionByName(reqbody.NAME);
    if(objOption && objOption.length && objOption.SERVICE_REQUEST_OPTION_ID != reqbody.SERVICE_REQUEST_OPTION_ID)
        throw ErrorLib.getErrors().CustomError("","AllocationOptionService", "Already exists another Option with same name.");

	return dbOption.updateServiceRequestOption(reqbody.SERVICE_REQUEST_OPTION_ID,reqbody.NAME, userId);
}

function deleteServiceRequestOption(optionId, userId){
	return dbOption.deleteServiceRequestOption(optionId, userId);
}



