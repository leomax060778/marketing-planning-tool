function validateIsNumber(value){
	return !isNaN(value);
}

function validateIsNatural(value){
	return (validateIsNumber(value) && value >= 0);
}

function validateIsEmail(value){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	 return re.test(value);
}

function validateIsSapEmail(value){
	var emailParts = value.split('@sap.com');
	return emailParts.length == 2 && !emailParts[1]; 
};

/********************another options**********************************/
//Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character://
//	"^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$"

//	Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number://
//	"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"

//	Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
//  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"
//	
//  Minimum 8 and Maximum 10 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
//	"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}"
/**************************************************************************/
function validateIsPassword(value){
//	var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
//	return re.test(value);

//Minimum 6 characters at least 1 Alphabet and 1 Number:
	var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
	if(! re.test(value)){
		throw ErrorLib.getErrors()
		.CustomError("", "util/validateIsPassword",
				"The PASSWORD should have minimum 6 characters at least, 1 alphabet and 1 number.");
	};
	return true;
}

function validateIsDecimal(value){
	return isNumeric(value);
}

function validateLength(value, max, min, field){
	if(!field){
		field = "";
	}
	if(max)
		if(value.length > max) throw ErrorLib.getErrors()
		.CustomError("", "util/validateLength",
		"The "+field+" value should have between "+min+" and "+max+" characters");

	if(min)
		if(value.length < min) throw ErrorLib.getErrors()
		.CustomError("", "util/validateLength",
				"The "+field+" value should have between "+min+" and "+max+" characters");
		
		
	return true;
}

function validateIsString(value){
	return (typeof value == "string");
}

function extractObject(object) {
	var aux = {};
		if(object){
		Object.keys(object).forEach(function(key){
			aux[key] = object[key];
		});
	}
	return aux;
}
