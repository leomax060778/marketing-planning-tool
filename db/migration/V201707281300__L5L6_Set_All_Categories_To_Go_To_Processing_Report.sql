UPDATE ALLOCATION_CATEGORY_OPTION_LEVEL
SET IN_PROCESSING_REPORT = 1
WHERE ENABLED = 1 AND DELETED = 0
AND HIERARCHY_LEVEL_ID IN (2,3);
-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-50', 'L5/L6 Set All Categories To Go To Processing Report', 'V201707281300__L5L6_Set_All_Categories_To_Go_To_Processing_Report.sql');

COMMIT;