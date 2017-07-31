
alter table "PLANNING_TOOL"."OBJECTIVE_CAMPAIGN_TYPE_SUBTYPE" alter(VALIDATE_DATE_RULE tinyint default 0);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-44', 'Set Default 0 to validate date rule for a combination of Campaign Type and Campaign Sub type', 'V201706151112__SetDefaultFlag_to_Obj_Type_Sub_Type.sql');

COMMIT;