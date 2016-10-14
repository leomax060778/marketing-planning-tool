$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataSubRegion = mapper.getDataSubRegion();
var util = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */

function getSubRegionsByRegionId(regionId){
	return dataSubRegion.getSubRegionsByRegionId(regionId);
}

function insertSubregion(subregion, createUser) {
	if (validateSubregion(subregion)) {
		return dataSubRegion.insertSubregion(subregion, createUser);
	}
}

function updateSubregion(subregion, updateUser) {
	if (!util.validateIsNumber(subregion.SUBREGION_ID))
		throw ErrorLib.getErrors().CustomError("",
				"subregionServices/handlePost/updateSubregion", "The SUBREGION_ID is invalid");

	if (validateSubregion(subregion)) {
		return dataSubRegion.updateSubregion(subregion, updateUser);
	}
}

function deleteSubregion(subregion, deleteUser) {
	if (!subregion.SUBREGION_ID)
		throw ErrorLib.getErrors().CustomError("",
				"subregionServices/handleDelete/deleteSubregion",
				"The SUBREGION_ID is not found");

	if (!util.validateIsNumber(subregion.SUBREGION_ID))
		throw ErrorLib.getErrors().CustomError("",
				"subregionServices/handleDelete/deleteSubregion", "The SUBREGION_ID is invalid");

	return dataSubRegion.deleteSubregion(subregion, deleteUser);
}

function validateSubregion(subregion) {
	if (!subregion)
		throw ErrorLib.getErrors().CustomError("",
				"planServices", "Subregion is not found");
	
	if (!subregion.NAME)
		throw ErrorLib.getErrors().CustomError("",
				"subregionServices",
				"The NAME is not found");
	return true;
}