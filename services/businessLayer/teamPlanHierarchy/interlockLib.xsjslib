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
	//throw ErrorLib.getErrors().CustomError("getHl4ById","Get Hl4 By Id",interlock);
	var result = [];
	interlock.forEach(function(il){
		var aux = util.extractObject(il);
		//throw ErrorLib.getErrors().CustomError("getHl4ById","Get Hl4 By Id",JSON.stringify(aux));
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
	//return dbInterlock.getGlobalTeam(hl3Id, userId);
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
		/*if (hl2) {
            var globals = businessLavel2.getAllCentralTeam();

            var organizationTypes = getAllOrganizationType();           

            var organizationObject = {};

            organizationTypes.forEach(function (elem) {
                organizationObject[elem.TYPE] = elem.TYPE;
            });
            
            result[organizationObject.Route] = globals;
            
            if (!hl2.REGION_ID) {

                result[organizationObject.Region] = blRegion.getAllRegions();
            }
            else if (!hl2.SUBREGION_ID) {

                result[organizationTypes.Subregion] = blSubRegion.getSubRegionsByRegionId(hl2.REGION_ID);
            }
        }*/
	}
	return result;
	
}

/*function parseInterlock(data){
	var result = [];
	data.forEach(function(interlock){
		var interlockRefactor = {};
		Object.keys(interlock).forEach(function(key){
			if(key == "organization"){
				var organization = {};
				
				organization.in_organization_name = interlock.organization.name;
				organization.in_organization_id = interlock.organization.id;
				interlockRefactor.organization = organization;
			} else {
				interlockRefactor["in_" + key.toLowerCase()] = interlock[key];
			}
		});
		result.push(interlockRefactor);
	});
	return result;
}*/
