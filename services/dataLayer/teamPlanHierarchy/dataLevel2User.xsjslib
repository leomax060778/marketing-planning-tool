$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

var INS_HL2_USER = "INS_HL2_USER";
var GET_HL2_USER = "GET_HL2_USER";
var GET_ALL_HL2_USER = "GET_ALL_HL2_USER";
var DEL_ALL_HL2_BY_ID = "DEL_ALL_HL2_BY_ID";
var DEL_HL2_USER_BY_ID = "DEL_HL2_USER_BY_ID";

function getAllHl2User(hl2Id){
	var parameters = {'in_hl2_id': hl2Id};
	var result = db.executeProcedureManual(GET_ALL_HL2_USER, parameters);
	var list = db.extractArray(result.out_result);
	return list;
}

/*EXECUTE QUERY TO INSERT NEW PAIR HL2_USER*/
function insertLevel2User(objLevel2User, objLevel2, userId){
	var parameters = {};	
	parameters.in_hl2_id = Number(objLevel2) || objLevel2.IN_HL2_ID;
	parameters.in_user_id = Number(objLevel2User) || objLevel2User.IN_USER_ID;
	parameters.in_created_user_id = userId;
	parameters.out_hl2_user_id = '?';
	return db.executeScalarManual(INS_HL2_USER,parameters,"out_hl2_user_id");
}

function delAllLevel2User(objLevel2, userId){
	var parameters = {};
	parameters.in_hl2_id = objLevel2.IN_HL2_ID;
	return db.executeScalarManual(DEL_ALL_HL2_BY_ID,parameters,"out_result");
}

function deleteLevel2User(l2UserId, hl2Id, userId){
	var parameters = {};
	parameters.in_hl2_id = hl2Id;
	parameters.in_l2_user_id = l2UserId;
	return db.executeScalarManual(DEL_HL2_USER_BY_ID,parameters,"out_result");
}

function existsHl2UserPair(objHl2User, objLevel2){
	var exists = false;
	var parameters = {'in_user_id': objHl2User.IN_USER_ID, 'in_hl2_id': objLevel2.IN_HL2_ID};	
	var result = db.executeProcedureManual(GET_HL2_USER, parameters);	
	var list = db.extractArray(result.out_result); 	
	exists = list.length > 0;
	return exists;
}

