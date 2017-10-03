$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var mail = mapper.getMail();

function sendNightlyNotification() {
    mail.sendProcessingReportNightlyReport();
    return true;
}

