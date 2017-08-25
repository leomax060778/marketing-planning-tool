update "PLANNING_TOOL"."MARKETING_PROGRAM"
set deleted = 1
, enabled = 0
, modified_user_id = 1
, modified_date_tz = CURRENT_TIMESTAMP
WHERE upper(NAME) LIKE '%NO GLOBAL PROGRAM%';
-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-56', 'Remove Global Program from Marketing Program', 'V201708231543__Remove_Global_Program_from_Marketing_Program.sql');

COMMIT;