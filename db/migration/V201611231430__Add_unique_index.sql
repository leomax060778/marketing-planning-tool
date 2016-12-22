CREATE UNIQUE INDEX idxschversion ON "PLANNING_TOOL".SCHEMA_VERSION(VERSION);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V5.0.0-03', 'Add unique index to schema version', 'V201611231430__Add_unique_index.sql');

COMMIT;