INSERT INTO "PLANNING_TOOL"."MARKETING_PROGRAM" (name, description, created_user_id) values('No Global Program', 'No Global Program',1);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-42', 'Validation for Field Marketing Program ID', 'V201705151010__Validation_Marketing_Program_ID.sql');

COMMIT;