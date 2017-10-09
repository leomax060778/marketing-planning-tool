$.import("xsplanningtool.services.commonLib", "mapper");
var mapper = $.xsplanningtool.services.commonLib.mapper;
var mail = mapper.getMail();

function sendNightlyNotification() {
    mail.sendProcessingReportNightlyReport();
    return true;
}

