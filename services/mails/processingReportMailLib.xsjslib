$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var config = mapper.getDataConfig();

function parseNightlyReport(list, basicData){
	var mailObj = {};
	var appUrl = config.getAppUrl();
	var tableStyle = ' style="font-family: arial, sans-serif  !important; border-collapse: collapse !important; width: 100% !important;"';
	var tdStyle = ' style="border: 1px solid #dddddd !important; text-align: left !important; padding: 8px !important; text-align:center !important;"';
	var body = '<p> Dear Collegues,</p>';
	Object.keys(list).forEach(function (level) {
		var uiLevel = level.slice(-2).toLowerCase();
        body += '<p>Below you will find a summary report of the ' + level + '. In order to access to the detail report <a href="' + appUrl + '#/dereport/' + uiLevel + '">Click here</a></p>';
        Object.keys(list[level]).forEach(function (status) {
            body += '<p>'+ status +'</p>';

            if(list[level][status].length) {
                body += '<table' + tableStyle + '>';
                body += '<tr><th' + tdStyle + '>' + level + '</th><th' + tdStyle + '>Last Day</th><th' + tdStyle + '>2-3 Days</th><th' + tdStyle + '>3-5 Days</th><th' + tdStyle + '>+5 Days</th></tr>';
                list[level][status].forEach(function (elem) {
                    var days = elem.DAYS < 2
                        ? '<td' + tdStyle + '>&#10004;</td><td' + tdStyle + '></td><td' + tdStyle + '></td><td' + tdStyle + '></td>'
                        : elem.DAYS >= 2 && elem.DAYS <= 3
                            ? '<td' + tdStyle + '></td><td' + tdStyle + '>&#10004;</td><td' + tdStyle + '></td><td' + tdStyle + '></td>'
                            : elem.DAYS > 3 && elem.DAYS <= 5
                                ? '<td' + tdStyle + '></td><td' + tdStyle + '></td><td' + tdStyle + '>&#10004;</td><td' + tdStyle + '></td>'
                                :'<td' + tdStyle + '></td><td' + tdStyle + '></td><td' + tdStyle + '></td><td' + tdStyle + '>&#10004;</td>';

					body += '<tr><td' + tdStyle + '>' + elem.CRM_ID + '</td>' + days +'</tr>';
				});
                body += '</table>';
			} else {
                body += '<p>None '+ status.split(" ")[0] +'</p>';
			}
		});
	});
	mailObj.body = body;
	mailObj.subject = basicData.ENVIRONMENT+' MPT - Processing Report';
	return mailObj;
}
