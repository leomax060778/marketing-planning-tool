INSERT INTO "PLANNING_TOOL"."SALE_ORGANIZATION"(NAME, created_user_id) VALUES('SAP ASIA PTE LTD' , 1);
INSERT INTO "PLANNING_TOOL"."SALE_ORGANIZATION"(NAME, created_user_id) VALUES('SAP Columbia SAS' , 1);
INSERT INTO "PLANNING_TOOL"."SALE_ORGANIZATION"(NAME, created_user_id) VALUES('SAP China' , 1);
INSERT INTO "PLANNING_TOOL"."SALE_ORGANIZATION"(NAME, created_user_id) VALUES('SAP Argentina' , 1);
INSERT INTO "PLANNING_TOOL"."SALE_ORGANIZATION"(NAME, created_user_id) VALUES('SAP Indonesia' , 1);
-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-53', 'Add New Marketing Organization', 'V201708181130__Add_New_Marketing_Organization.sql');

COMMIT;