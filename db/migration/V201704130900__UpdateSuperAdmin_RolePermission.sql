--set available true all permission for superadmin role
update "PLANNING_TOOL"."ROLE_PERMISSION"
set deleted = 0, enabled = 1
where role_id = 1;

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-35', 'Update to enabled all permissions for SuperAdmin Role', 'V201704130900__UpdateSuperAdmin_RolePermission.sql');

COMMIT;