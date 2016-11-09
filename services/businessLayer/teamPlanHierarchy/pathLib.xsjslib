$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataPath = mapper.getDataPath();
/** ***********END INCLUDE LIBRARIES*************** */

var CRM_ACRONYM = "CRM";

// Get complete path of specific level and parent id of HL
function getPathByLevelParent(levelId, parentId) {

	var result = {};
	var levelPath = "Plan Level 1";
	var path = dataPath.getPathByLevelParent(levelId, parentId);
	//throw JSON.stringify(path);
	/*
	 * Determine current plan level correspondence between Parameter Level 2 =
	 * means Level 1 in SAP Parameter Level 3 = means Level 2 Parameter Level 4 =
	 * means Level 3
	 * 
	 */
	switch (parseInt(levelId)) {
	case 1:
		levelPath = "Level 1";
		break;
	case 2:
		levelPath = "Level 1";
		break;
	case 3:
		levelPath = "Level 2";
		break;
	case 4:
		levelPath = "Level 3";
		break;
	case 5:
		levelPath = "Level 5";
		break;
	default:
		levelPath = "";
	}

	// Build the path to return
	if (path.length > 0) {
		result.PATH_TPH = levelPath + " for " + CRM_ACRONYM + "-"
				+ path[0].PATH_TPH;
		// Special case for Central Team
		if (parseInt(levelId) >= 3) {
			var pathOrgAcronym = dataPath.getPathOrganizationAcronym(levelId, parentId);
			
			var isCentralTeam = !pathOrgAcronym[0] ? false : true;
			if (isCentralTeam) {
				result.PATH_TPH = levelPath + " for " + CRM_ACRONYM + "-"
						+ path[0].PATH_TPH + "-"
						+ pathOrgAcronym[0].ORG_ACRONYM_PATH;
			}
		}
	} else
		result.PATH_TPH = levelPath;

	return result;
}

// Get complete path of specific level and parent id of HL to CRM
function getPathByLevelParentToCRM(levelId, parentId) {
	//with out path refactor
	var result = {};
	var path = dataPath.getPathByLevelParent(levelId, parentId);
	
	
	
	var pathOrgAcronym = dataPath.getPathOrganizationAcronym(levelId, parentId);
	var isOrgAcronym = !pathOrgAcronym[0] ? false : true;
	//throw  path[0].PATH_TPH ;
	if (isOrgAcronym) {
		result.PATH_TPH = CRM_ACRONYM + "-"
				+ path[0].PATH_TPH + "-"
				+ pathOrgAcronym[0].ORG_ACRONYM_PATH;
	}
	
	
	
	
	/*result.PATH_TPH = CRM_ACRONYM + path[0].PATH_TPH;
	if (path.length > 0)
		result.PATH_TPH = CRM_ACRONYM + "-" + path[0].PATH_TPH;*/
	else {
		result.PATH_TPH = CRM_ACRONYM;
	}
	return result;
}
