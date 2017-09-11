insert into "PLANNING_TOOL"."DISTRIBUTION_CHANNEL" (NAME, CREATED_USER_ID) VALUES ('01', 1);
insert into "PLANNING_TOOL"."DISTRIBUTION_CHANNEL" (NAME, CREATED_USER_ID) VALUES ('02', 1);
-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-55', 'Add New Distribution Channel', 'V201708181230__Add_New_Distribution_Channel.sql');

COMMIT;