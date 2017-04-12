RENAME COLUMN "PLANNING_TOOL"."CONFIGURATION"."CONF_KEY" TO "KEY";
RENAME COLUMN "PLANNING_TOOL"."CONFIGURATION"."CONF_VALUE" TO "VALUE";
RENAME COLUMN "PLANNING_TOOL"."CONFIGURATION"."CONF_DESCRIPTION" TO "DESCRIPTION";

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-34', 'Rename Configuration Columns', 'V201704101336__Rename_Configuration_Columns.sql');

COMMIT;