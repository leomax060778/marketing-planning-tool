CREATE PROCEDURE "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS" (

--CATEGORY PARAMETERS
	IN in_description NVARCHAR(255),
	IN in_nametag NVARCHAR(255),
	IN in_hierarchy_level_id BIGINT,
	IN in_measure_id BIGINT,
	IN in_in_processing_report TINYINT,
	IN in_user_id BIGINT,

--OPTION PARAMETER
	IN in_name NVARCHAR(3000),
	IN in_order_option INTEGER

)
	LANGUAGE SQLSCRIPT
	SQL SECURITY INVOKER

	AS
BEGIN
   	DECLARE OUT_CATEGORY_ID BIGINT;
   	DECLARE OUT_OPTION_ID_2 BIGINT;
   	DECLARE OUT_COUNT_CATEGORY INT;
   	DECLARE OUT_COUNT_OPTION INT;
   	DECLARE OUT_ROW INT;
	DECLARE out_option_id BIGINT;


	SELECT COUNT(C.CATEGORY_ID) INTO OUT_COUNT_CATEGORY FROM "PLANNING_TOOL"."CATEGORY" C WHERE UPPER(C.NAME) = UPPER(in_nametag) AND C.HIERARCHY_LEVEL_ID = in_hierarchy_level_id;

	IF OUT_COUNT_CATEGORY > 0
	THEN
	SELECT TOP 1 C.CATEGORY_ID INTO OUT_CATEGORY_ID FROM "PLANNING_TOOL"."CATEGORY" C WHERE UPPER(C.NAME) = UPPER(in_nametag) AND C.HIERARCHY_LEVEL_ID = in_hierarchy_level_id;
	ELSE
	OUT_CATEGORY_ID := 0;
	END IF;

	IF OUT_CATEGORY_ID <> 0
	THEN
		CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::UPD_CATEGORY"(:OUT_CATEGORY_ID,in_description,in_nametag,in_hierarchy_level_id,in_measure_id,in_in_processing_report,in_user_id, :OUT_ROW);
		SELECT COUNT(O.OPTION_ID) INTO OUT_COUNT_OPTION FROM "PLANNING_TOOL"."OPTION" O WHERE UPPER(O.NAME) = UPPER(in_name) AND O.CATEGORY_ID = :OUT_CATEGORY_ID;
		IF OUT_COUNT_OPTION = 0
		THEN
		CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_OPTION"( :OUT_CATEGORY_ID, in_name,in_order_option,in_user_id, :out_option_id);
		ELSE
		SELECT O.OPTION_ID INTO OUT_OPTION_ID_2 FROM "PLANNING_TOOL"."OPTION" O WHERE UPPER(O.NAME) = UPPER(in_name) AND O.CATEGORY_ID = :OUT_CATEGORY_ID;
		CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::UPD_OPTION"(:OUT_OPTION_ID_2, :OUT_CATEGORY_ID, in_name,in_order_option,in_user_id, :OUT_ROW);
		END IF;
	ELSE
		CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY"(in_description,in_nametag,in_hierarchy_level_id,in_measure_id,in_in_processing_report,in_user_id, :OUT_CATEGORY_ID);
		CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_OPTION"( :OUT_CATEGORY_ID, in_name,in_order_option,in_user_id, :out_option_id);
	END IF;

END;


--Hl5
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Buying Classfication', 2, 1,0,1,'Active',1);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Buying Classfication', 2, 1,0,1,'Customer Dormant',2);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Buying Classfication', 2, 1,0,1,'Net New',3);

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Sap Marketing Pillars', 2, 1,0,1,'Invest in People',1);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Sap Marketing Pillars', 2, 1,0,1,'Monetize the Portfolio',2);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Sap Marketing Pillars', 2, 1,0,1,'Run Simple - External',3);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Sap Marketing Pillars', 2, 1,0,1,'Run Simple - Internal',4);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Sap Marketing Pillars', 2, 1,0,1,'Shape the Perception',5);

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Buy-side Solutions',1);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Contract Management',2);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Discount Management',3);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Discovery',4);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Financial Solutions',5);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Invoice Management',6);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Network',7);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Procurement',8);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Sell-side Solutions',9);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Sourcing',10);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Spend Analysis',11);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Supplier Management',12);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Supply Chain Collaboration',13);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Ariba Supply Chain Financing',14);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'AribaPay',15);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 2, 1,0,1,'Business Intelligence',16);

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Type of Investment', 2, 1,0,1,'Buid',1);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Type of Investment', 2, 1,0,1,'Run',2);

--Hl6
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Buying Classfication', 3, 1,0,1,'Active',1);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Buying Classfication', 3, 1,0,1,'Customer Dormant',2);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Buying Classfication', 3, 1,0,1,'Net New',3);

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Sap Marketing Pillars', 3, 1,0,1,'Invest in People',1);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Sap Marketing Pillars', 3, 1,0,1,'Monetize the Portfolio',2);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Sap Marketing Pillars', 3, 1,0,1,'Run Simple - External',3);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Sap Marketing Pillars', 3, 1,0,1,'Run Simple - Internal',4);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Sap Marketing Pillars', 3, 1,0,1,'Shape the Perception',5);

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Buy-side Solutions',1);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Contract Management',2);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Discount Management',3);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Discovery',4);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Financial Solutions',5);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Invoice Management',6);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Network',7);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Procurement',8);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Sell-side Solutions',9);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Sourcing',10);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Spend Analysis',11);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Supplier Management',12);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Supply Chain Collaboration',13);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Ariba Supply Chain Financing',14);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'AribaPay',15);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Solutions', 3, 1,0,1,'Business Intelligence',16);

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Type of Investment', 3, 1,0,1,'Buid',1);
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS"('a Category','Type of Investment', 3, 1,0,1,'Run',2);

DROP PROCEDURE "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_CATEGORY_IF_NOT_EXISTS";

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-11', 'Load Category and Option for Level 5 and Level 6 - Sript', 'V201701171305__INS_OR_UPD_CATEGORY_OPTION_L5_L6.sql');

COMMIT;

