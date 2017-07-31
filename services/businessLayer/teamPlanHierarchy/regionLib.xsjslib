$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataRegion = mapper.getDataRegion();
var dataSubRegion = mapper.getDataSubRegion();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllRegions() {
	return dataRegion.getAllRegions();
}

function getRegionById(regionId) {
	return dataRegion.getRegionById(regionId);
}

function insertRegion(objRegion, userId) {
	var region = dataRegion.existRegion(objRegion);
	if (region)
		throw ErrorLib.getErrors().CustomError("","", "Region name already exist", objRegion);
	else
		return dataRegion.insertRegion(objRegion, userId);
}

function updateRegion(objRegion, userId) {
	if (validateUpdateRegion(objRegion))
		return dataRegion.updateRegion(objRegion, userId);
}

function deleteRegion(objRegion, userId) {
    if (validateDeleteRegion(objRegion)) {
        dataSubRegion.delSubregionsByRegion(objRegion, userId);
        return dataRegion.delRegion(objRegion, userId);
    }
	else
		throw ErrorLib.getErrors().CustomError("",
				"", "Region is already used, can't be deleted.");
}

function validateDeleteRegion(objRegion) {
	return dataRegion.canDeleteRegion(objRegion);
}

/* validations */
function validateInsertRegion(objRegion) {
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'IN_REGION_NAME', 'IN_REGION_ISO', 'IN_CREATED_USER_ID' ];

	if (!objRegion)
		throw ErrorLib.getErrors().CustomError("",
				"regionServices/handlePost/insertRegion",
				"The object Region is not found");

	try {
		keys.forEach(function(key) {
			if (objRegion[key] === null || objRegion[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objRegion[key])
				if (!isValid) {
					errors[key] = objRegion[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"regionServices/handlePost/insertRegion", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"regionServices/handlePost/insertRegion",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateRegion(objRegion) {
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'IN_REGION_ID', 'IN_REGION_NAME', 'IN_REGION_ISO',
			'IN_MODIFIED_USER_ID' ];

	if (!objRegion)
		throw ErrorLib.getErrors().CustomError("",
				"regionServices/handlePost/insertRegion",
				"The object Region is not found");

	try {
		keys.forEach(function(key) {
			if (objRegion[key] === null || objRegion[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objRegion[key])
				if (!isValid) {
					errors[key] = objRegion[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"regionServices/handlePut/updateRegion", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"regionServices/handlePut/updateRegion",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'IN_REGION_ISO':
		valid = value.length > 0 && value.length <= 100;
		break;
	case 'IN_REGION_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'IN_CREATED_USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'IN_REGION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	}
	return valid;
}

function validateRegionAndMarketUnit(idRegion, idMarketUnit){
	dataRegion.validateRegionAndMarketUnit(idRegion, idMarketUnit);
}