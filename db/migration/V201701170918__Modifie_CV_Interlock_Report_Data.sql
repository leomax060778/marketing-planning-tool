--ALTER TABLE "PLANNING_TOOL"."CV_INTERLOCK_REPORT_DATA" ADD ("RECEIVER_REGION" NVARCHAR(255));
--ALTER TABLE "PLANNING_TOOL"."CV_INTERLOCK_REPORT_DATA" ADD ("REQUESTER_REGION" NVARCHAR(255));

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V5.0.0-10', 'Modifie CV Interlock Process Report', 'V201701170918__Modifie_CV_Interlock_Report_Data.sql');

COMMIT;