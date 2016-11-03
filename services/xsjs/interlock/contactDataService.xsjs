/** **** libs *********** */
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var contactDataLib = mapper.getContactData();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */
function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level1()));
//	return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false,"",true);
}

function handleGet(parameters, userId){
	var contactTypeId = httpUtil.getUrlParameters().get("CONTACT_TYPE_ID");
	var contactType = httpUtil.getUrlParameters().get("CONTACT_TYPE");
	var result = {};	
	if (!contactTypeId || !contactType)
		throw ErrorLib.getErrors().BadRequest("","contactDataServices/handleGet","Insufficient parameters");
			
	result = contactDataLib.getContactData(contactTypeId, contactType);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePost(reqBody, userId){
	var rdo = contactDataLib.insertContactData(reqBody, userId);	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePut(reqBody, userId){
	var rdo = contactDataLib.updateContactData(reqBody, userId);	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleDelete(reqBody, userId){
	var rdo = contactDataLib.deleteContactData(reqBody.ID, userId);	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();