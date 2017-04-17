
-- Deactivate Subtype
UPDATE OBJECTIVE_CAMPAIGN_TYPE_SUBTYPE
SET ENABLED = 0,
MODIFIED_DATE_TZ = CURRENT_TIMESTAMP,
MODIFIED_USER_ID = 1
WHERE OBJECTIVE_ID = 1 AND CAMPAIGN_TYPE_ID = 14 AND CAMPAIGN_SUB_TYPE_ID = 59;

UPDATE OBJECTIVE_CAMPAIGN_TYPE_SUBTYPE
SET ENABLED = 0,
MODIFIED_DATE_TZ = CURRENT_TIMESTAMP,
MODIFIED_USER_ID = 1
WHERE OBJECTIVE_ID = 2 AND CAMPAIGN_TYPE_ID = 14 AND CAMPAIGN_SUB_TYPE_ID = 59;

-- Update Sub Type Desc
UPDATE CAMPAIGN_SUB_TYPE
SET
NAME = 'Acquire Competitive Market Studies',
MODIFIED_DATE_TZ = CURRENT_TIMESTAMP,
MODIFIED_USER_ID = 1
WHERE CAMPAIGN_SUB_TYPE_ID = 42;

UPDATE CAMPAIGN_SUB_TYPE
SET
NAME = 'Acquire Product/Industry Studies',
MODIFIED_DATE_TZ = CURRENT_TIMESTAMP,
MODIFIED_USER_ID = 1
WHERE CAMPAIGN_SUB_TYPE_ID = 43;

-- New Subtype
INSERT INTO CAMPAIGN_SUB_TYPE(NAME, CREATED_USER_ID) VALUES ('Paid Mobile Display Ads', 1);
INSERT INTO CAMPAIGN_SUB_TYPE(NAME, CREATED_USER_ID) VALUES ('Paid Content Creation', 1);

--IMPORTANT!!!
--Review if the Paid Mobile Display Ads was insert with its id = 105 and PaiD Content Creation with its id = 106.

-- New Relationships
--1	Create Awareness	14	Paid Media	105	Paid Mobile Display Ads
INSERT INTO OBJECTIVE_CAMPAIGN_TYPE_SUBTYPE(OBJECTIVE_ID, CAMPAIGN_TYPE_ID, CAMPAIGN_SUB_TYPE_ID,CREATED_DATE_TZ, CREATED_USER_ID)
VALUES(1,14,105,CURRENT_TIMESTAMP,1);

-- 1	Create Awareness	14	Paid Media	106	Paid Content Creation
INSERT INTO OBJECTIVE_CAMPAIGN_TYPE_SUBTYPE(OBJECTIVE_ID, CAMPAIGN_TYPE_ID, CAMPAIGN_SUB_TYPE_ID,CREATED_DATE_TZ, CREATED_USER_ID)
VALUES(1,14,106,CURRENT_TIMESTAMP,1);

-- 2	Foster Consideration (Demand Gen.)	14	Paid Media	105	Paid Mobile Display Ads
INSERT INTO OBJECTIVE_CAMPAIGN_TYPE_SUBTYPE(OBJECTIVE_ID, CAMPAIGN_TYPE_ID, CAMPAIGN_SUB_TYPE_ID,CREATED_DATE_TZ, CREATED_USER_ID)
VALUES(2,14,105,CURRENT_TIMESTAMP,1);

-- 2	Foster Consideration (Demand Gen.)	14	Paid Media	106	Paid Content Creation
INSERT INTO OBJECTIVE_CAMPAIGN_TYPE_SUBTYPE(OBJECTIVE_ID, CAMPAIGN_TYPE_ID, CAMPAIGN_SUB_TYPE_ID,CREATED_DATE_TZ, CREATED_USER_ID)
VALUES(2,14,106,CURRENT_TIMESTAMP,1);

--4	Support Usage	8	Direct Marketing	35	Direct Mail
INSERT INTO OBJECTIVE_CAMPAIGN_TYPE_SUBTYPE(OBJECTIVE_ID, CAMPAIGN_TYPE_ID, CAMPAIGN_SUB_TYPE_ID,CREATED_DATE_TZ, CREATED_USER_ID)
VALUES(4,8,35,CURRENT_TIMESTAMP,1);

--5	Generate Advocacy	8	Direct Marketing	35	Direct Mail
INSERT INTO OBJECTIVE_CAMPAIGN_TYPE_SUBTYPE(OBJECTIVE_ID, CAMPAIGN_TYPE_ID, CAMPAIGN_SUB_TYPE_ID,CREATED_DATE_TZ, CREATED_USER_ID)
VALUES(5,8,35,CURRENT_TIMESTAMP,1);


-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-27', 'Migration L1 L2', 'V201702201136__Update_Objetive_Campaign.sql');

COMMIT;