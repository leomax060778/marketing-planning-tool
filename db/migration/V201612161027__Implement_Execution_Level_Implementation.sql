ALTER TABLE "PLANNING_TOOL"."HL2" ADD ("CRT_RELATED" TINYINT NOT NULL DEFAULT 0);
ALTER TABLE "PLANNING_TOOL"."HL2" ADD ("IMPLEMENT_EXECUTION_LEVEL" TINYINT NOT NULL DEFAULT 0);


UPDATE "PLANNING_TOOL"."HL2" SET IMPLEMENT_EXECUTION_LEVEL = 1 WHERE ACRONYM = 'GB' OR ACRONYM = 'GC';

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V5.0.0-07', 'Implement Execution Level Implementation', 'V201612161027__Implement_Execution_Level_Implementation.sql');

COMMIT;