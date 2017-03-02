/** *****************Import Library******************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

/** ***************** Stored Procedures ******************** */

var spGetAPIByWbsId = "GET_API_WBS_BY_ID";
var spGetAPIByWbsPath = "GET_API_WBS_BY_CRM_PATH";

/** ********* END LIST OF PROCEDURES ************** */

function getL6ById(l6_id) {
	var rdo = db.executeProcedure(spGetAPIByWbsId, {
		'in_hl6_id' : l6_id
	});
	return db.extractArray(rdo.out_result);
}

function getL6ByWBSPath(wbs_path) {
	var rdo = db.executeProcedure(spGetAPIByWbsPath, {
		'in_crm_path' : wbs_path
	});
	return db.extractArray(rdo.out_result);

}