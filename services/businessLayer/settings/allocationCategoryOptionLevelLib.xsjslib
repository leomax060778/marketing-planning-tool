/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
/*************************************************/
var HIERARCHY_LEVEL = {
	HL3: 4,
	HL4: 1,
	HL5: 2,
	HL6: 3
};

function updateCategoryOptionLevel(data, userId) {
	if(data && data.IN_CATEGORY_ID && HIERARCHY_LEVEL[data.IN_LEVEL.toUpperCase()]){
		var countInsert = 0;
		var totalOptions = data.IN_OPTION_LIST.length;

		dataCategoryOptionLevel.deleteAllocationCATEGORYOptionLevel(data.IN_CATEGORY_ID, HIERARCHY_LEVEL[data.IN_LEVEL.toUpperCase()],userId);
		dataCategoryOptionLevel.updateAllocationCategoryOptionLevelProcessingReport(
			data.IN_CATEGORY_ID, HIERARCHY_LEVEL[data.IN_LEVEL.toUpperCase()],
			data.IN_PROCESSING_REPORT,userId);
		for(var i = 0; i < totalOptions; i++){
			dataCategoryOptionLevel.insertAllocationCATEGORYOptionLevel(
				data.IN_CATEGORY_ID,
				data.IN_OPTION_LIST[i],
				HIERARCHY_LEVEL[data.IN_LEVEL.toUpperCase()],
				data.IN_PROCESSING_REPORT,
				 userId);
			++countInsert;
		}



		if(totalOptions != countInsert)
			throw ErrorLib.getErrors().CustomError("",
				"categoryOptionLevelServices/handlePut/updateCategoryOptionLevel",
				"Could not complete the process.");

		return countInsert;
	}
	throw ErrorLib.getErrors().BadRequest();
}