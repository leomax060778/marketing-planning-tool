//Implementation of POST call
function handlePost() {
	var rdo = "Email sended";
	try{
		//create email from JS Object and send
		var mail = new $.net.Mail({  
		    sender: {address: "lpeccin@folderit.net"},  
		    to: [{ address: "lucianopeccin@gmail.com"}],  
		    subject: "XSJS Email Test",  
		    parts: [ new $.net.Mail.Part({  
		        type: $.net.Mail.Part.TYPE_TEXT,  
		        text: "The body of the mail.",  
		        contentType: "text/plain"  
		    })]  
		});  
		
		var returnValue = mail.send();
		var response = "MessageId = " + returnValue.messageId + ", final reply ="+ returnValue.finalReply;
	}catch(e){
		rdo = e.message; 
	}
	
	
	$.response.contentType = "plain/text";
	$.response.status = 200;
	$.response.setBody(rdo);
}

handlePost();