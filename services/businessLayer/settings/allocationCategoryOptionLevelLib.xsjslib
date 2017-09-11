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
    if(!data || !data.IN_CATEGORY_ID || !data.IN_LEVEL.length)
        throw ErrorLib.getErrors().BadRequest();

    if(typeof data.IN_LEVEL == "string")
        data.IN_LEVEL= [data.IN_LEVEL];

	data.IN_LEVEL.forEach(function(level){

		var hierarchylevel = HIERARCHY_LEVEL[level.toUpperCase()];

        if(hierarchylevel){
            var countInsert = 0;
            var totalOptions = data.IN_OPTION_LIST.length;

            dataCategoryOptionLevel.deleteAllocationCATEGORYOptionLevel(data.IN_CATEGORY_ID, hierarchylevel,userId);

            for(var i = 0; i < totalOptions; i++){
                var categoryOptionLevel = dataCategoryOptionLevel.getAllocationOptionLevelByCategoryAndLevelId(data.IN_CATEGORY_ID, level, data.IN_OPTION_LIST[i]);

                if(categoryOptionLevel && categoryOptionLevel.ALLOCATION_CATEGORY_OPTION_LEVEL_ID){
                    dataCategoryOptionLevel.updateAllocationCategoryOptionLevel(
                        data.IN_CATEGORY_ID,
                        hierarchylevel,
                        data.IN_OPTION_LIST[i],
                        data.IN_PROCESSING_REPORT,
                        userId);
                } else {
                    dataCategoryOptionLevel.insertAllocationCATEGORYOptionLevel(
                        data.IN_CATEGORY_ID,
                        data.IN_OPTION_LIST[i],
                        hierarchylevel,
                        data.IN_PROCESSING_REPORT,
                        userId);
                }

                ++countInsert;
            }

            if(totalOptions != countInsert)
                throw ErrorLib.getErrors().CustomError("",
                    "categoryOptionLevelServices/handlePut/updateCategoryOptionLevel",
                    "Could not complete the process.");

            // return countInsert;
        }
	});
	
    return (data.IN_LEVEL.length * data.IN_OPTION_LIST.length);
}