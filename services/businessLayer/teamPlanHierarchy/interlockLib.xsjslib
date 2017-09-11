/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib","mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataInterlock = mapper.getDataInterLock();
var db = mapper.getdbHelper();
var dbInterlock = mapper.getDataInterLock();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var businessLavel3 = mapper.getLevel3();
var businessLavel2 = mapper.getLevel2();
var blRegion = mapper.getRegion();
var blSubRegion =  mapper.getSubRegion();
/*************************************************/
function getInterlockByHl4Id(hl4_id){
	var interlock = dbInterlock.getInterlockByHl4Id(hl4_id);
	var result = [];
	interlock.forEach(function(il){
		var aux = util.extractObject(il);
		aux["organization"] = dbInterlock.getInterlockOrganizationByIlId(il.INTERLOCK_REQUEST_ID);
		result.push(aux);
	});
	return result;
}

function getAllEntity(userId){
	return dbInterlock.getInterlockEntity();
}

function getAllOrganizationType(){
	return dbInterlock.getInterlockOrganizationType();
}

function getGlobalTeam(hl3Id, userId){
	var result = {};
	var hl3 = businessLavel3.getLevel3ById(hl3Id, userId);
	
	if(hl3){
		var objLevel2 = {};
		objLevel2.IN_HL2_ID = hl3.HL2_ID;
		var hl2 = businessLavel2.getLevel2ById(objLevel2);
		if(hl2){
			var globals = businessLavel2.getAllCentralTeam();
			result["Central teams"] = globals;
			if(!hl2.REGION_ID){
				result['Regions'] = blRegion.getAllRegions();	
			}
			else if(!hl2.SUBREGION_ID){
				result['Market Unit'] =blSubRegion.getSubRegionsByRegionId(hl2.REGION_ID);
			}
		}
	}
	return result;
	
}