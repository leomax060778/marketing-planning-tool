$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataObjective = mapper.getDataObjectives();
var ErrorLib = mapper.getErrors();
var dataCampaignObjective = mapper.getDataCampaignObjective();
/** ***********END INCLUDE LIBRARIES*************** */

var OBJECTIVE_EXISTS = "Already exists an Objective with the name you want to enter.";

function getObjectiveAnswerByObjectiveId(objectiveAnswer, objectiveId){
	return objectiveAnswer.OBJECTIVE_ID == objectiveId;
}

function getAllObjectives() {
	var answerObjectives = dataObjective.getAnswerForAllObjectives();
	var objectives =  JSON.parse(JSON.stringify(dataObjective.getAllObjectives()));
	for (var i = 0; i < objectives.length; i++) {
		objectives[i].answers = answerObjectives.filter(function (objectiveAnswer){
			return getObjectiveAnswerByObjectiveId(objectiveAnswer, objectives[i].OBJECTIVE_ID);
		});
	}
	return objectives;
}

function getObjectiveById(objectiveId){
	return dataObjective.getObjectiveById(objectiveId);
}

function checkInUseObjectiveById(objectiveData, userId){
	if (!objectiveData.IN_OBJECTIVE_ID)
		throw ErrorLib.getErrors().CustomError("",
			"objectiveServices/handleDelete/deleteObjective",
			"The OBJECTIVE_ID is not found");

	var countRegisters = dataObjective.checkInUseObjectiveById(objectiveData.IN_OBJECTIVE_ID);
	var retValue = 0;
	if (countRegisters > 0)
		throw ErrorLib.getErrors().ConfirmDelete("",
			"objectiveServices/handleDelete/checkInUseObjectiveById",
			countRegisters);
	else
		retValue = dataObjective.deleteObjective(objectiveData.IN_OBJECTIVE_ID, userId);

	return retValue;
}

function updateObjective(objectiveData, userId){
	return dataObjective.updateObjective(objectiveData.IN_OBJECTIVE_ID, objectiveData.IN_NAME, userId);
}

function deleteObjective(objectiveData, userId, confirm){
	if (!objectiveData.IN_OBJECTIVE_ID)
		throw ErrorLib.getErrors().CustomError("",
			"objectiveServices/handleDelete/deleteObjective",
			"The OBJECTIVE_ID is not found");

	if(confirm){
		dataCampaignObjective.deleteObjectiveCampaignTypeByObjectiveId(objectiveData.IN_OBJECTIVE_ID);
		return dataObjective.deleteObjective(objectiveData.IN_OBJECTIVE_ID, userId);
	}
	else{
		var countRegisters = dataObjective.checkInUseObjectiveById(objectiveData.IN_OBJECTIVE_ID);
		if (countRegisters)
			throw ErrorLib.getErrors().ConfirmDelete("",
				"objectiveServices/handleDelete/checkInUseObjectiveById",
				countRegisters);
		else{

			dataCampaignObjective.deleteObjectiveCampaignTypeByObjectiveId(objectiveData.IN_OBJECTIVE_ID);
			return dataObjective.deleteObjective(objectiveData.IN_OBJECTIVE_ID, userId);
		}
	}
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