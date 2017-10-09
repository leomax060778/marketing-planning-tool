$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var config = mapper.getDataConfig();

function parseNightlyReport(list, basicData){
	var mailObj = {};
	var appUrl = config.getLoginUrl();
	var tableStyle = ' id="content-table"';
	var thStyle = ' class="content-table-header"';
	var tdStyle = ' class="content-table-description-column"';
	var body = '<p> Dear Collegues,</p>';
	Object.keys(list).forEach(function (level) {
		var uiLevel = level.slice(-2).toLowerCase();
        body += '<p>Below you will find a summary report of the ' + level + '. In order to access to the detail report <a href="' + appUrl + '#/dereport/' + uiLevel + '">Click here</a></p>';
        Object.keys(list[level]).forEach(function (status) {
            body += '<p>'+ status +'</p>';

            if(list[level][status].length) {
                body += '<table' + tableStyle + '>';
                body += '<tr><th' + thStyle + '>' + level + '</th><th' + thStyle + '>Last Day</th><th' + thStyle + '>2-3 Days</th><th' + thStyle + '>3-5 Days</th><th' + thStyle + '>+5 Days</th></tr>';
                list[level][status].forEach(function (elem) {
                    var days = elem.DAYS < 2
                        ? '<td' + thStyle + '>&#10004;</td><td' + thStyle + '></td><td' + thStyle + '></td><td' + thStyle + '></td>'
                        : elem.DAYS >= 2 && elem.DAYS <= 3
                            ? '<td' + thStyle + '></td><td' + thStyle + '>&#10004;</td><td' + thStyle + '></td><td' + thStyle + '></td>'
                            : elem.DAYS > 3 && elem.DAYS <= 5
                                ? '<td' + thStyle + '></td><td' + thStyle + '></td><td' + thStyle + '>&#10004;</td><td' + thStyle + '></td>'
                                :'<td' + thStyle + '></td><td' + thStyle + '></td><td' + thStyle + '></td><td' + thStyle + '>&#10004;</td>';

					body += '<tr><td' + tdStyle + '>' + elem.CRM_ID + '</td>' + days +'</tr>';
				});
                body += '</table>';
			} else {
                body += '<p>None '+ status.split(" ")[0] +'</p>';
			}
		});
	});
	mailObj.body = body;
	mailObj.subject = 'MPT - Processing Report';
	if(basicData.ENVIRONMENT !== "Production"){
	    mailObj.subject = basicData.ENVIRONMENT+' MPT - Processing Report';
	}
	return mailObj;
}
