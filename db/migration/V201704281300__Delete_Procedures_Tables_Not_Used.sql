DROP PROCEDURE "PLANNING_TOOL"."xsplanningtool.db.procedures::GET_HL3_BY_USER";
DROP PROCEDURE "PLANNING_TOOL"."xsplanningtool.db.procedures::GET_HL3_CHILDREN";
DROP PROCEDURE "PLANNING_TOOL"."xsplanningtool.db.procedures::GET_ALL_HL6";
DROP PROCEDURE "PLANNING_TOOL"."xsplanningtool.db.procedures::GET_HL2_BY_ORGANIZATION_ACRONYM";

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-38', 'Delete procedures or tables not used', 'V201704281300__Delete_Procedures_Tables_Not_Used.sql');

COMMIT;