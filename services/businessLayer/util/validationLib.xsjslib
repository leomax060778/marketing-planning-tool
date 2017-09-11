$.import("xsplanningtool.services.commonLib", "mapper");
var dataValidation = mapper.getDataValidation();

/** ***********END INCLUDE LIBRARIES*************** */

var Quarter = {
	'1' : {
		start:new Date(new Date().getFullYear(), 0, 1).setHours(0, 0, 0, 0),
		end: new Date(new Date().getFullYear(), 2, 31).setHours(0, 0, 0, 0)
	},
	'2' : {
		start:new Date(new Date().getFullYear(), 3, 1).setHours(0, 0, 0, 0),
		end: new Date(new Date().getFullYear(), 5, 30).setHours(0, 0, 0, 0)
	},
	'3' : {
		start:new Date(new Date().getFullYear(), 6, 1).setHours(0, 0, 0, 0),
		end: new Date(new Date().getFullYear(), 8, 30).setHours(0, 0, 0, 0)
	},
	'4' : {
		start:new Date(new Date().getFullYear(), 9, 1).setHours(0, 0, 0, 0),
		end: new Date(new Date().getFullYear(), 11, 31).setHours(0, 0, 0, 0)
	}
};

function validateActualDatesRange(campaignTypeId, campaignSubTypeId, Actual_Start_Date, Actual_End_Date){


	if(dataValidation.getValidateDateRule(campaignTypeId, campaignSubTypeId)){
		if(!Actual_Start_Date || !Actual_End_Date) return false;

		Actual_End_Date = new Date(Actual_End_Date).setHours(0, 0, 0, 0);
		Actual_Start_Date = new Date(Actual_Start_Date).setHours(0, 0, 0, 0);

		if(Actual_Start_Date.valueOf() == Quarter[1].start.valueOf() && Actual_End_Date.valueOf() == Quarter[4].end.valueOf()) return true;
		if(Actual_Start_Date.valueOf() == Quarter[1].start.valueOf() && Actual_End_Date.valueOf() == Quarter[1].end.valueOf()) return true;
		if(Actual_Start_Date.valueOf() == Quarter[2].start.valueOf() && Actual_End_Date.valueOf() == Quarter[2].end.valueOf()) return true;
		if(Actual_Start_Date.valueOf() == Quarter[3].start.valueOf() && Actual_End_Date.valueOf() == Quarter[3].end.valueOf()) return true;
		if(Actual_Start_Date.valueOf() == Quarter[4].start.valueOf() && Actual_End_Date.valueOf() == Quarter[4].end.valueOf()) return true;

	}
	return false;
}