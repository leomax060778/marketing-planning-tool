

function Errors(){
	
	var Errors = {};

    /******************* 400 **********************************************/
    Errors.BadRequest = function(message,stack, details){
        this.name = "Bad Request";
        this.message = message || "Bad Request";
        this.code = 400;
        this.stack = stack || (new Error).stack;
        this.details = details || "without details";
    }
    Errors.BadRequest.prototype = Object.create(Error.prototype);
    Errors.BadRequest.prototype.constructor = Errors.BadRequest;

    Errors.Unauthorized  = function(message, details){
        this.name = "Unauthorized";
        this.message = message || "Unauthorized";
        this.code = 401;
        this.stack = (new Error()).stack;
        this.details = details || "without details";
    }
    Errors.Unauthorized.prototype = Object.create(Error.prototype);
    Errors.Unauthorized.prototype.constructor = Errors.Unauthorized;

    Errors.Forbidden  = function(message, details){
        this.name = "Forbidden";
        this.message = message || "Forbidden";
        this.code = 403;
        this.stack = (new Error()).stack;
        this.details = details || "without details";
    }
    Errors.Forbidden.prototype = Object.create(Error.prototype);
    Errors.Forbidden.prototype.constructor = Errors.Forbidden;

    Errors.NotFound  = function(message, details){
        this.name = "Not Found";
        this.message = message || "Not Found";
        this.code = 404;
        this.stack = (new Error()).stack;
        this.details = details || "without details";
    }
    Errors.NotFound.prototype = Object.create(Error.prototype);
    Errors.NotFound.prototype.constructor = Errors.NotFound;

    Errors.RequestTimeout  = function(message, details){
        this.name = "Request Timeout";
        this.message = message || "Request Timeout";
        this.code = 408;
        this.stack = (new Error()).stack;
        this.details = details || "without details";
    }
    Errors.RequestTimeout.prototype = Object.create(Error.prototype);
    Errors.RequestTimeout.prototype.constructor = Errors.RequestTimeout;

    Errors.RequestURITooLong  = function(message, details){
        this.name = "Request-URI Too Long";
        this.message = message || "Request-URI Too Long";
        this.code = 414;
        this.stack = (new Error()).stack;
        this.details = details || "without details";
    }
    Errors.RequestURITooLong.prototype = Object.create(Error.prototype);
    Errors.RequestURITooLong.prototype.constructor = Errors.RequestURITooLong;

    /******************* 500 **********************************************/
    Errors.InternalServerError  = function(message, details){
        this.name = "Internal Server Error";
        this.message = message || "Internal Server Error";
        this.code = 500;
        this.stack = (new Error()).stack;
        this.details = details || "without details";
    }
    Errors.InternalServerError.prototype = Object.create(Error.prototype);
    Errors.InternalServerError.prototype.constructor = Errors.InternalServerError;

    Errors.NotImplemented  = function(message, details){
        this.name = "Not Implemented";
        this.message = message || "Not Implemented";
        this.code = 501;
        this.stack = (new Error()).stack;
        this.details = details || "without details";
    }
    Errors.NotImplemented.prototype = Object.create(Error.prototype);
    Errors.NotImplemented.prototype.constructor = Errors.NotImplemented;

    Errors.ServiceUnavailable  = function(message, details){
        this.name = "Service Unavailable";
        this.message = message || "Service Unavailable";
        this.code = 503;
        this.stack = (new Error()).stack;
        this.details = details || "without details";
    }
    Errors.ServiceUnavailable.prototype = Object.create(Error.prototype);
    Errors.ServiceUnavailable.prototype.constructor = Errors.ServiceUnavailable;

    Errors.NetworkAuthenticationRequired  = function(message, details){
        this.name = "Network Authentication Required";
        this.message = message || "Network Authentication Required";
        this.code = 511;
        this.stack = (new Error()).stack;
        this.details = details || "without details";
    }
    Errors.ServiceUnavailable.prototype = Object.create(Error.prototype);
    Errors.ServiceUnavailable.prototype.constructor = Errors.ServiceUnavailable;

    Errors.list = {
        '400': new Errors.BadRequest(),
        '401': new Errors.Unauthorized(),
        '403': new Errors.Forbidden(),
        '404': new Errors.NotFound(),
        '408': new Errors.RequestTimeout(),
        '414': new Errors.RequestURITooLong(),
        '500': new Errors.InternalServerError(),
        '501': new Errors.NotImplemented(),
        '503': new Errors.ServiceUnavailable(),
        '511': new Errors.NetworkAuthenticationRequired()
    };

    Errors.getError = function (code){
        var errorSelected =  Errors.list[code];
        if(errorSelected) return errorSelected;
        return Errors.list[500];
    }
   

    return Errors;
}