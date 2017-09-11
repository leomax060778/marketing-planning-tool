update hl3 set deleted = 1, enabled= 0
 where hl3_id in (SELECT hl3.hl3_id from hl3 join hl2 on hl2.hl2_id = hl3.hl2_id where hl2.deleted = 1 and hl3.deleted = 0);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-51', 'Data cleanup', 'V201708081100__Data_CleanUp.sql');

COMMIT;