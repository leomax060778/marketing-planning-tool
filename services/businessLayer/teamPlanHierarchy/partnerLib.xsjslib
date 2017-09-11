/***************Import Library*******************/
$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var dataPartner = mapper.getDataPartner();
var businessAttachment = mapper.getAttachment();
var db = mapper.getdbHelper();
var dbInterlock = mapper.getDataInterLock();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/

//Hierarchy level map
var HIERARCHY_LEVEL = {
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};

function getAllPartnerType() {
    return dataPartner.getAllPartnerType();
}

function getPartnerByHl4Id(hl4Id, currencyValueAux) {
    return parser(dataPartner.getPartnerByHl4Id(hl4Id), currencyValueAux);
}

function getPartnerByHl5Id(hl5Id) {
	var result = parseAttachment(dataPartner.getPartnerByHl5Id(hl5Id, HIERARCHY_LEVEL.HL5), HIERARCHY_LEVEL.HL5);
	
    return result;
}
/**
 *
 * @param hl6Id
 * @returns {{partners: Array, total: number, partnerCurrencyValue: *, partnerCurrencyId: null, totalExternal: number}}
 */
function getPartnerByHl6Id(hl6Id) {
    return parser(dataPartner.getPartnerByHl6Id(hl6Id));
}
/**
 *
 * @param partners {Array}
 * @param currencyValueAux
 * @returns {{partners: Array, total: number, partnerCurrencyValue: *, partnerCurrencyId: null, totalExternal: number}}
 */
function parser(partners, currencyValueAux) {
    var total = 0;
    var totalExternal = 0;
    var rdo = [];

    var par = partners.filter(function (partner) {
        return !!Number(partner.VALUE);
    });

    par.forEach(function (partner) {
        var obj = {};
        Object.keys(partner).forEach(function (key) {
            obj[key] = key == "VALUE" ? (Number(partner.VALUE) * (currencyValueAux || 1)).toFixed(2) : partner[key];
        });
        rdo.push(obj);

        if (obj.PARTNER_TYPE_ID != 1)
            total = total + parseFloat(obj.VALUE);
        else
            totalExternal = totalExternal + parseFloat(obj.VALUE);
    });
    return {
        partners: rdo, total: Number(total), partnerCurrencyValue: rdo.length ? Number(rdo[0].CURRENCY_VALUE) : null
        , partnerCurrencyId: rdo.length ? rdo[0].CURRENCY_ID : null, totalExternal: Number(totalExternal)
    };
	
}

function parseAttachment(res, hierarchyLevel, currencyValueAux){
	var total = 0;
    var totalExternal = 0;
    var rdo = [];
    var partnerAttachment = {};
    res = JSON.parse(JSON.stringify(res));
    
    var partners = res.out_result;
    var attachments = res.attachments;
    
    var par = partners.filter(function (partner) {
        return !!Number(partner.VALUE);
    });
    
    var len = (partners.length > attachments.length)? partners.length: attachments.length;
    
    
    for(var i=0; i<len; i++){
    	if(par[i]){
    		par[i].VALUE = (Number(par[i].VALUE) * (currencyValueAux || 1)).toFixed(2);
    		if (par[i].PARTNER_TYPE_ID != 1){
            	total = total + parseFloat(par[i].VALUE);
            } else{
            	totalExternal = totalExternal + parseFloat(par[i].VALUE);
            }
    	}
    	
    	if(attachments[i]){
    		if(!partnerAttachment[attachments[i].PARTNER_ID]){
    			partnerAttachment[attachments[i].PARTNER_ID] = [];
			}
			attachments[i].ATTACHMENT_SIZE = (parseFloat(Number(attachments[i].ATTACHMENT_SIZE) / 1048576).toFixed(2)) + " MB";
			partnerAttachment[attachments[i].PARTNER_ID].push(attachments[i]);
    	}
    }
    
    par.forEach(function(partner){
		partner.ATTACHMENTS = partnerAttachment[partner.PARTNER_ID] || [];
	});

    return {
        partners: par, total: Number(total), partnerCurrencyValue: par.length ? Number(par[0].CURRENCY_VALUE) : null
        , partnerCurrencyId: par.length ? par[0].CURRENCY_ID : null, totalExternal: Number(totalExternal)
    };
}

function updateAttachmentPartner(reqBody, hierarchyLevel, userId){
	var partner;

	try{
		var attachmentList = businessAttachment.getAttachmentByBudgetSpendRequestId(reqBody.BUDGET_SPEND_REQUEST_ID, HIERARCHY_LEVEL[hierarchyLevel], userId);
		//ATTACHMENTS UPDATE
		if(attachmentList){
			partner = updateAttachments(attachmentList, reqBody.ATTACHMENTS, reqBody.BUDGET_SPEND_REQUEST_ID, HIERARCHY_LEVEL[hierarchyLevel], userId);
		}
		db.commit();
	}
	catch(e){
		db.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"updateAttachmentPartner");
	}
	finally{
		db.closeConnection();
	}
	return partner;
}

function updateAttachments(original_attachments, newAttachments, budgetSpendRequestId, hierarchyLevelId, user_id){
	var original_attachments_local = original_attachments;
    var originalAttachmentsToUpdate = newAttachments;

    var insertOriginalAttachments = [];
    var deleteOriginalAttachments = [];

    //DELETE
    if(original_attachments_local.length > 0){
    	original_attachments_local.forEach(function (o_attachment) {
            var result = true;
            var o_attachment_id = o_attachment.ATTACHMENT_ID;
            if (typeof o_attachment_id === 'string') {
            	o_attachment_id = Number(o_attachment_id);
            }
            if(originalAttachmentsToUpdate.length > 0){
                originalAttachmentsToUpdate.forEach(function (updateAttach) {
                	updateAttach.ATTACHMENT_ID = Number(updateAttach.ATTACHMENT_ID);
                    if (o_attachment_id === updateAttach.ATTACHMENT_ID) {
                        result = false;
                    }
                });
            }
            if (result) {
            	deleteOriginalAttachments.push(o_attachment);
            }
        });
    }
    

    //INSERT
    if(originalAttachmentsToUpdate.length > 0){
        originalAttachmentsToUpdate.forEach(function (newAttach) {
            var result = true;
            newAttach.ATTACHMENT_ID = Number(newAttach.ATTACHMENT_ID);
            
            if(original_attachments_local.length > 0){
                original_attachments_local.forEach(function (attachment) {
                    var o_attachment_id = attachment.ATTACHMENT_ID;
                    if (typeof o_attachment_id === 'string') {
                    	o_attachment_id = Number(o_attachment_id);
                    }
                    if (newAttach.ATTACHMENT_ID === o_attachment_id) {
                        result = false;
                    }
                });
            }

            if (result) {
            	insertOriginalAttachments.push(newAttach);
            }
        });
    }

    //ACTIONS
    if(insertOriginalAttachments.length > 0){
    	insertOriginalAttachments.forEach(function(attachment){
    		attachment.BUDGET_SPEND_REQUEST_ID = budgetSpendRequestId;
    		attachment.HIERARCHY_LEVEL_ID = hierarchyLevelId;
    		insertAttachmentPartner(attachment, user_id);
    	});
    }
    if(deleteOriginalAttachments.length > 0){
    	deleteOriginalAttachments.forEach(function(attachment){
    		attachment.BUDGET_SPEND_REQUEST_ID = Number(budgetSpendRequestId);
    		deleteAttachmentPartner(attachment, user_id);
    	});
    }
	return 1;
}

//ATTACHMENT PARTNER
function insertAttachmentPartner(attachment, userId){
	return businessAttachment.insertAttachmentPartner(attachment, userId);
}

function deleteAttachmentPartner(attachment, userId){
	if(businessAttachment.deleteManualAttachment(attachment, userId)){
		businessAttachment.deletePartnerAttachment(attachment, userId);
	}
}