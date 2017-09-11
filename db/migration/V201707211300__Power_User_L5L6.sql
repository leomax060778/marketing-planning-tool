ALTER TABLE HL5 ADD ("IS_POWER_USER" tinyint DEFAULT 1);
ALTER TABLE HL6 ADD ("IS_POWER_USER" tinyint DEFAULT 1);
-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-49', 'Service Request Category Options', 'V201707211300__Power_User_L5L6.sql');

COMMIT;