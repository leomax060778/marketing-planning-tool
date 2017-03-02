/** *************Import Library****************** */
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var spGetAll = "GET_ALL_USER";
var spGetUserById = "GET_USER_BY_ID";
var spGetUserByUserName = "GET_USER_BY_USERNAME";
var spInseruser = "INS_USER";
var spUpdateUser = "UPD_USER";
var spDeleteUser = "DEL_USER";
var spUpdatePass = "UPD_USER_PASSWORD";
var spGetUsersByHl1Id = "GET_USERS_BY_HL1_ID";
var spGetUsersByHl2Id = "GET_USERS_BY_HL2_ID";
var spGetUsersByHl3Id = "GET_USERS_BY_HL3_ID";
var spGetHash = "GET_HASH_SHA256";
var spGetUserByRoleId = "GET_USER_BY_ROLE_ID";

var spGET_ALL_HL1_PERMISSIONS_BY_USER = "GET_ALL_HL1_PERMISSIONS_BY_USER";
var spGET_ALL_HL2_PERMISSIONS_BY_USER = "GET_ALL_HL2_PERMISSIONS_BY_USER";
var spGET_ALL_HL3_PERMISSIONS_BY_USER = "GET_ALL_HL3_PERMISSIONS_BY_USER";

/** *************************************************** */

function getPermissionForLevelByUser(level, levelId, userId){

	if(level == 1){
		var rdo = db.executeProcedure(spGET_ALL_HL1_PERMISSIONS_BY_USER, {'in_user_id':userId});
		return db.extractArray(rdo.out_result);
	}else if(level == 2){
		var rdo = db.executeProcedure(spGET_ALL_HL2_PERMISSIONS_BY_USER, {'in_user_id':userId, 'in_level_id':levelId});
		return db.extractArray(rdo.out_result);
	}else if(level == 3){
		var rdo = db.executeProcedure(spGET_ALL_HL3_PERMISSIONS_BY_USER, {'in_user_id':userId, 'in_level_id':levelId});
		return db.extractArray(rdo.out_result);
	}
	return null;
}

function getAllUser() {

	var rdo = db.executeProcedure(spGetAll, {});
	return db.extractArray(rdo.USER);
}

function getUserById(id) {
	if (id != "") {
		var rdo = db.executeProcedure(spGetUserById, {
			'in_user_id' : id
		});
		return db.extractArray(rdo.USER);
	}
	return null;
}


function getUserByRoleId(id) {
	if (id != "") {
		var rdo = db.executeProcedureManual(spGetUserByRoleId, {
			'in_role_id' : id
		});
		return db.extractArray(rdo.USER_ROLE);
	}
	return null;
}

function getUserByUserName(userName){
	if (userName != "") {
		var rdo = db.executeProcedure(spGetUserByUserName, {
			'in_user_name' : userName
		});
		if(rdo['OUT_RESULT']){
			return rdo['OUT_RESULT'][0];
		}
	}
	return null;
}

function getUserByHl2Id(hl2Id) {
	var res = {};
	if (hl2Id > 0) {
		var rdo = db.executeProcedure(spGetUsersByHl2Id, {
			'in_hl2_id' : hl2Id
		});
		res.users_in = db.extractArray(rdo.users_in);
		res.users_out = db.extractArray(rdo.users_out);
	}
	return res;
}

function getUserByHl1Id(hl1Id) {
	var res = {};
	if (hl1Id > 0) {
		var rdo = db.executeProcedure(spGetUsersByHl1Id, {
			'in_hl1_id' : hl1Id
		});
		res.users_in = db.extractArray(rdo.users_in);
		res.users_out = db.extractArray(rdo.users_out);
	}
	return res;
}

function getUserByHl2IdToNewL3(hl2Id) {
	var res = {};
	if (hl2Id > 0) {
		var rdo = db.executeProcedure(spGetUsersByHl2Id, {
			'in_hl2_id' : hl2Id
		});
		res.users_in = db.extractArray(rdo.users_in);
		res.users_out = [];
	}
	return res;
}

function getUserByHl3Id(hl3Id, hl2Id) {
	var res = {};
	if (hl3Id > 0) {
		var rdo = db.executeProcedure(spGetUsersByHl3Id, {
			'in_hl3_id' : hl3Id
			, 'in_hl2_id' : hl2Id
		});
		res.users_in = db.extractArray(rdo.users_in);
		res.users_out = db.extractArray(rdo.users_out);
	}
	return res;
}

function insertUser(user, createUser) {
	var param = {};
	param.in_user_name = user.USER_NAME;
	param.in_first_name = user.FIRST_NAME;
	param.in_last_name = user.LAST_NAME;
	param.in_email = user.EMAIL;
	param.in_phone = user.PHONE;
	param.in_user_id = createUser; // User that insert.

	return db.executeScalarManual(spInseruser, param, "out_user_id");
}

function updateUser(user, modUser) {
	var param = {};
	param.in_user_id = user.USER_ID;
	param.in_user_name = user.USER_NAME;
	param.in_first_name = user.FIRST_NAME;
	param.in_last_name = user.LAST_NAME;
	param.in_email = user.EMAIL;
	param.in_phone = user.PHONE;
	param.in_modified_user_id = modUser; // User that insert.

	return db.executeScalar(spUpdateUser, param, "out_result");
}

function deleteUser(user, modUser) {
	var param = {};
	param.in_user_id = user.USER_ID;
	param.in_modified_user_id = modUser; // User that insert.

	return db.executeScalar(spDeleteUser, param, "out_result");
}

function updatePass(userId, pass, passSalt, modUser) {
	var param = {};
	param.in_user_id = userId;
	param.in_password = pass;
	param.in_salt = passSalt;
	param.in_modified_user_id = modUser;
	param.out_result = '?';

	return db.executeScalarManual(spUpdatePass, param, "out_result");
}

function getPasswordHash(pass) {
	if(pass !== ""){	
		var result = db.executeProcedure(spGetHash, {
			'in_message' : pass
		});
		return db.extractArray(result['out_result']);
	}
	return null;	
}

function insertLevelUser(hlId, levelUserId, level, userId){
	var parameters = {};
	var hl_id = "in_hl"+level+"_id";
	parameters[hl_id] = hlId;
	parameters.in_user_id = levelUserId;
	parameters.in_created_user_id = userId;

	var INS_HL_USER = 'INS_HL' + level + '_USER';

	return db.executeScalarManual(INS_HL_USER,parameters, "out_hl" + level + "_user_id");
}

function deleteLevelUser(lUserId, hlId, level){
	var parameters = {};
	var hl_id = "in_hl"+level+"_id";
	parameters[hl_id] = hlId;


	var DEL_HL_USER = "";
	switch (level){
		case 1:DEL_HL_USER = 'DEL_HL1_USER_BY_ID';
				parameters.IN_L1_USER_ID  = lUserId;break;
		case 2:DEL_HL_USER = 'DEL_HL2_USER_BY_ID';
				parameters.in_l2_user_id = lUserId;break;
		case 3:DEL_HL_USER = 'DEL_HL3_USER'
				parameters.in_user_id = lUserId;break;
	}

	return db.executeScalarManual(DEL_HL_USER,parameters,"out_result");
}

function existsHlUserPair(levelUserId, hlId, level){
	var exists = false;
	var hl_id = "in_hl"+level+"_id";
	var parameters = {'in_user_id': levelUserId};
	parameters[hl_id] = hlId;

	var GET_HL_USER = 'GET_HL' + level + '_USER';

	var result = db.executeProcedureManual(GET_HL_USER, parameters);
	var list = db.extractArray(result.out_result);
	exists = list.length > 0;
	return exists;
}