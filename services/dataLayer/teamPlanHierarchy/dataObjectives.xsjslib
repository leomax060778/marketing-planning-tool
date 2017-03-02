$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_OBJECTIVES = "GET_ALL_OBJECTIVES";

var INS_OBJECTIVE = "INS_OBJECTIVE";
var UPD_OBJECTIVE = "UPD_OBJECTIVE";
var GET_OBJECTIVE_BY_ID = "GET_OBJECTIVE_BY_ID";
var DEL_OBJECTIVE = "DEL_OBJECTIVE";

function getAllObjectives(){
	var parameters = {};	
	var list = db.executeProcedureManual(GET_ALL_OBJECTIVES, parameters);
	return db.extractArray(list.out_result);
}

function getObjectiveById(objectiveId){
	var parameters = {'IN_OBJECTIVE_ID': objectiveId};
	var list = db.executeProcedureManual(GET_OBJECTIVE_BY_ID, parameters);
	var result = db.extractArray(list.out_result);
	//throw JSON.stringify(result);
	if(result.length)
		return result[0];
	return {};
}

function updateObjective(objectiveId, name, userId){
	var parameters = {};
	parameters.IN_OBJECTIVE_ID = objectiveId;
	parameters.IN_NAME = name;
	parameters.IN_MODIFIED_USER_ID = userId;
	return db.executeScalarManual(UPD_OBJECTIVE, parameters, "out_result");
}

function deleteObjective(objectiveId, userId){
	var parameters = {};
	parameters.IN_OBJECTIVE_ID = objectiveId;
	parameters.IN_MODIFIED_USER_ID = userId;
	return db.executeScalarManual(DEL_OBJECTIVE, parameters, "out_result");
}

function insertObjective(name, userId){
	var parameters = {};
	parameters.IN_NAME = name;
	parameters.IN_CREATED_USER_ID = userId;
	return db.executeScalarManual(INS_OBJECTIVE, parameters, "out_result");
}