$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataObjective = mapper.getDataObjectives();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var OBJECTIVE_EXISTS = "Already exists an Objective with the name you want to enter.";

function getAllObjectives() {
	return dataObjective.getAllObjectives();
}

function getObjectiveById(objectiveId){
	return dataObjective.getObjectiveById(objectiveId);
}

function updateObjective(objectiveData, userId){
	return dataObjective.updateObjective(objectiveData.IN_OBJECTIVE_ID, objectiveData.IN_NAME, userId);
}

function deleteObjective(objectiveData, userId){

	if (!objectiveData.IN_OBJECTIVE_ID)
		throw ErrorLib.getErrors().CustomError("",
			"objectiveServices/handleDelete/deleteObjective",
			"The OBJECTIVE_ID is not found");

	return dataObjective.deleteObjective(objectiveData.IN_OBJECTIVE_ID, userId);
}

function insertObjective(objectiveData, userId) {
	
	if(existObjectiveByName(objectiveData))
		throw ErrorLib.getErrors().BadRequest("", "objectivesService/handlePost/insertObjective", OBJECTIVE_EXISTS);
	
	return dataObjective.insertObjective(objectiveData.IN_NAME, userId);
}

function existObjectiveByName(objectiveData){
	var aux = dataObjective.getObjectiveByName(objectiveData.IN_NAME);
	
	if(aux)
		return true;
	return false;
}