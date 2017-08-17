update ALLOCATION_CATEGORY
set enabled = 0,
deleted = 1,
modified_user_id = 1,
modified_date_tz = CURRENT_TIMESTAMP
where name = 'Audience Integrated Plans';
-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-51', 'Remove Audience Integrated Plans From Categories', 'V201708171130__Remove_Audience_Integrated_Plans_Category.sql');

COMMIT;