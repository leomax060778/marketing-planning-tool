

function getErrors(){
	
	var Errors = {};

    var commonStack = new Error().stack;
	
    /******************* 400 **********************************************/
	Errors.BadRequest = function(message,stack, details){
		var e = {};
        e.name = "Bad Request";
        e.message = message || "Bad Request";
        e.code = 400;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
	
	Errors.Unauthorized = function(message,stack, details){
		var e = {};
        e.name = "Unauthorized";
        e.message = message || "Unauthorized";
        e.code = 401;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
	
    Errors.Forbidden  = function(message,stack, details){
    	var e = {};
        e.name = "Forbidden";
        e.message = message || "Forbidden";
        e.code = 403;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    

    Errors.NotFound  = function(message,stack, details){
    	var e={};
        e.name = "Not Found";
        e.message = message || "Not Found";
        e.code = 404;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    

    Errors.RequestTimeout  = function(message,stack, details){
    	var e={};
        e.name = "Request Timeout";
        e.message = message || "Request Timeout";
        e.code = 408;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
   

    Errors.RequestURITooLong  = function(message,stack, details){
    	var e={};
        e.name = "Request-URI Too Long";
        e.message = message || "Request-URI Too Long";
        e.code = 414;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    
    
    Errors.CustomError  = function(message,stack, details){
    	var e={};
        e.name = "Custom Error";
        e.message = message || "Custom Error";
        e.code = 450;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    
    Errors.LoginError  = function(message,stack, details){
    	var e={};
        e.name = "Login Error";
        e.message = message || "Login Error";
        e.code = 451;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    
    Errors.MailError  = function(message,stack, details){
    	var e={};
        e.name = "Mail Error";
        e.message = message || "Mail Error";
        e.code = 452;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }

    Errors.Hl6AcronymError  = function(message,stack, details){
        var e={};
        e.name = "Hl6 Acronym error";
        e.message = message || "Hl6 Acronym error";
        e.code = 453;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.data = "";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
            e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }

    Errors.OutOfRange  = function(message,stack, details){
        var e={};
        e.name = "Out of Range";
        e.message = message || "Out of Range";
        e.code = 454;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.data = "";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
            e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }

    Errors.NoCurrencyForBudgetYear  = function(message,stack, details){
        var e={};
        e.name = "No Currency for Budget Year";
        e.message = message || "No Currency for Budget Year";
        e.code = 455;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
            e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }

    Errors.ImportError  = function(message,stack, details){
        var e={};
        e.name = "There aren't matches for this object.";
        e.message = message || "There aren't matches for this object.";
        e.code = 456;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.row = {};
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
            e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }

    Errors.ConfirmDelete  = function(message,stack, details){
        var e={};
        e.name = "The user client must confirm next action.";
        e.message = message || "The user client must confirm next action.";
        e.code = 457;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.row = {};
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
            e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }

    Errors.CRMConstraintError  = function(message,stack, details){
        var e={};
        e.name = "CRM Constraint Error";
        e.message = message || "THE CRM IS ALREADY IN USE. PLEASE TRY TO SAVE THE RECORD AGAIN.";
        e.code = 458;
        e.stack = stack || commonStack;
        e.details = details || "THE CRM IS ALREADY IN USE. PLEASE TRY TO SAVE THE RECORD AGAIN.";
        e.row = {};
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
            e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }

    Errors.CRMKEYConstraintError  = function(message,stack, details){
        var e={};
        e.name = "CRM KEY Constraint Error";
        e.message = message || "THE CRM KEY IS ALREADY IN USE. PLEASE TRY TO SAVE THE RECORD AGAIN.";
        e.code = 550;
        e.stack = stack || commonStack;
        e.details = details || "THE CRM KEY IS ALREADY IN USE. PLEASE TRY TO SAVE THE RECORD AGAIN.";
        e.row = {};
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
            e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    /******************* 500 **********************************************/
    Errors.InternalServerError  = function(message,stack, details){
    	var e={};
        e.name = "Internal Server Error";
        e.message = message || "Internal Server Error";
        e.code = 500;
        e.stack = stack || commonStack;
        e.details = details || "Unexpected Error.";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
      
     

    Errors.NotImplemented  = function(message,stack, details){
    	var e={};
        e.name = "Not Implemented";
        e.message = message || "Not Implemented";
        e.code = 501;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    

    Errors.ServiceUnavailable  = function(message,stack, details){
    	var e={};
        e.name = "Service Unavailable";
        e.message = message || "Service Unavailable";
        e.code = 503;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    

    Errors.NetworkAuthenticationRequired  = function(message,stack, details){
    	var e={};
        e.name = "Network Authentication Required";
        e.message = message || "Network Authentication Required";
        e.code = 511;
        e.stack = stack || commonStack;
        e.details = details || "An unexpected error occurred, please try again!";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }

    Errors.DBError  = function(message,stack, details){
        var e={};
        e.name = "Data Base Error";
        e.message = message || "Data Base Error";
        e.code = 550;
        e.stack = stack || commonStack;
        e.details = details || "Data Base Error";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
            e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    

    Errors.list = {
        '400':  Errors.BadRequest(),
        '401':  Errors.Unauthorized(),
        '403':  Errors.Forbidden(),
        '404':  Errors.NotFound(),
        '408':  Errors.RequestTimeout(),
        '414':  Errors.RequestURITooLong(),
        '450':  Errors.CustomError(),
        '451':  Errors.LoginError(),
        '452':  Errors.MailError(),
        '453':  Errors.Hl6AcronymError(),
        '454':  Errors.OutOfRange(),
        '455':  Errors.NoCurrencyForBudgetYear(),
        '456':  Errors.ImportError(),
        '457':  Errors.ConfirmDelete(),
        '458':  Errors.CRMConstraintError(),
        '500':  Errors.InternalServerError(),
        '501':  Errors.NotImplemented(),
        '503':  Errors.ServiceUnavailable(),
        '511':  Errors.NetworkAuthenticationRequired(),
        '550':  Errors.DBError()
    };

    Errors.getError = function (code){
        var errorSelected =  Errors.list[code];
        if(errorSelected) return errorSelected;
        return Errors.list[500];
    }
   

    return Errors;
}