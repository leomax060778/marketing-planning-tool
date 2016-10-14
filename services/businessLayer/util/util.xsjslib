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

function validateIsPassword(value){
//	var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
//	return re.test(value);
	return true;
}

function validateIsDecimal(value){
	return isNumeric(value);
}

function validateLength(value, max, min){
	if(max)
		if(value.length > max) return false;
	if(min)
		if(value.length < min) return false;
		
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
