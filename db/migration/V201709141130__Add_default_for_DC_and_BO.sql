-- *************************************************************************************
-- Add default column 
ALTER TABLE "PLANNING_TOOL"."BUSINESS_OWNER" ADD ("DEFAULT" TINYINT NOT NULL DEFAULT 0);
ALTER TABLE "PLANNING_TOOL"."DISTRIBUTION_CHANNEL" ADD ("DEFAULT" TINYINT NOT NULL DEFAULT 0);

-- Update tables to indicate the default value
UPDATE "PLANNING_TOOL"."BUSINESS_OWNER" SET DEFAULT = 1 WHERE description = 'Marketing';
UPDATE "PLANNING_TOOL"."DISTRIBUTION_CHANNEL" SET DEFAULT = 1 WHERE name = 'Indirect Sales (VAR)';

-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-61', 'Add default column to Dist Channel and Buz Owner', 'V201709141130__Add_default_for_DC_and_BO.sql');

COMMIT;