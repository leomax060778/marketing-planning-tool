function updateReportTable() {

	try {
		var conn = $.db.getConnection();
		var query = 'call "PLANNING_TOOL"."xsplanningtool.db.procedures::CV_COMPARATIVE_L4_L5_REPORT_DATA"()';
		var pstmt = conn.prepareCall(query);

		pstmt.execute();
		conn.commit();
		conn.close();

	} catch (e) {
		// handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR,
		// "errors":{"INTERNAL_SERVER_ERROR": e.toString()}},
		// $.net.http.INTERNAL_SERVER_ERROR);
	}
}