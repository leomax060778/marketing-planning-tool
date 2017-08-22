update ALLOCATION_CATEGORY
set enabled = 0,
deleted = 1,
modified_user_id = 1,
modified_date_tz = CURRENT_TIMESTAMP
where name = 'Audience Integrated Plans';

UPDATE ALLOCATION_CATEGORY_OPTION_LEVEL ACOL
        SET ACOL.DELETED = 1
            , ACOL.ENABLED = 0
            , ACOL.modified_user_id = 1
            , ACOL.modified_date_tz = CURRENT_TIMESTAMP
        WHERE ACOL.ALLOCATION_CATEGORY_ID IN (SELECT ALLOCATION_CATEGORY_ID FROM "PLANNING_TOOL"."ALLOCATION_CATEGORY"
WHERE NAME = 'Audience Integrated Plans');
-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-54', 'Remove Audience Integrated Plans From Categories', 'V201708171130__Remove_Audience_Integrated_Plans_Category.sql');

COMMIT;