CREATE PROCEDURE "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS" (

--KPI TYPE PARAMETERS
	IN in_outcomes_type_name NVARCHAR(255),
	IN in_hierarchy_level_id BIGINT,
	IN in_user_id BIGINT,

--OPTION PARAMETER
	IN in_outcomes_name NVARCHAR(3000)
)
	LANGUAGE SQLSCRIPT
	SQL SECURITY INVOKER

	AS
BEGIN
   	DECLARE OUT_OUTCOMES_TYPE_ID BIGINT;
   	DECLARE OUT_OPTION_ID_2 BIGINT;
   	DECLARE OUT_COUNT_KPI_TYPE INT;
   	DECLARE OUT_COUNT_OPTION INT;
   	DECLARE OUT_ROW INT;
	DECLARE OUT_OUTCOMES_ID BIGINT;


	SELECT COUNT(C.OUTCOMES_TYPE_ID) INTO OUT_COUNT_KPI_TYPE FROM "PLANNING_TOOL"."OUTCOMES_TYPE" C
	WHERE UPPER(C.OUTCOMES_TYPE_NAME) = UPPER(in_outcomes_type_name) AND C.HIERARCHY_LEVEL_ID = in_hierarchy_level_id
	AND C.ENABLED = 1 AND C.DELETED = 0;

	IF OUT_COUNT_KPI_TYPE > 0
	THEN

	SELECT TOP 1 C.OUTCOMES_TYPE_ID INTO OUT_OUTCOMES_TYPE_ID FROM "PLANNING_TOOL"."OUTCOMES_TYPE" C
	WHERE UPPER(C.OUTCOMES_TYPE_NAME) = UPPER(in_outcomes_type_name) AND C.HIERARCHY_LEVEL_ID = in_hierarchy_level_id
	AND C.ENABLED = 1 AND C.DELETED = 0;

	ELSE
	    OUT_OUTCOMES_TYPE_ID := 0;
	END IF;

	IF OUT_OUTCOMES_TYPE_ID <> 0
	THEN
		CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::UPD_OUTCOMES_TYPE"(:OUT_OUTCOMES_TYPE_ID,in_outcomes_type_name
		,in_hierarchy_level_id,in_user_id, :OUT_ROW);

		SELECT COUNT(O.OUTCOMES_ID) INTO OUT_COUNT_OPTION FROM "PLANNING_TOOL"."OUTCOMES" O
		WHERE UPPER(O.OUTCOMES_NAME) = UPPER(in_outcomes_name) AND O.OUTCOMES_TYPE_ID = :OUT_OUTCOMES_TYPE_ID
		AND O.ENABLED = 1 AND O.DELETED = 0;

		IF OUT_COUNT_OPTION = 0
		THEN
		    CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_OUTCOMES"( :OUT_OUTCOMES_TYPE_ID, in_outcomes_name,
		    in_user_id, :OUT_OUTCOMES_ID);
		ELSE
            SELECT O.OUTCOMES_ID INTO OUT_OPTION_ID_2 FROM "PLANNING_TOOL"."OUTCOMES" O
            WHERE UPPER(O.OUTCOMES_NAME) = UPPER(in_outcomes_name) AND O.OUTCOMES_TYPE_ID = :OUT_OUTCOMES_TYPE_ID
            AND O.ENABLED = 1 AND O.DELETED = 0;

            CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::UPD_OUTCOMES"(:OUT_OPTION_ID_2, in_outcomes_name,
            :OUT_OUTCOMES_TYPE_ID, in_user_id, :OUT_ROW);
		END IF;
	ELSE
		CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_OUTCOMES_TYPE"(in_outcomes_type_name,in_hierarchy_level_id,
		in_user_id, :OUT_OUTCOMES_TYPE_ID);

		CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_OUTCOMES"( :OUT_OUTCOMES_TYPE_ID, in_outcomes_name,
		in_user_id, :OUT_OUTCOMES_ID);
	END IF;

END;
------------- KPIs for L5 -------------

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 2, 1,'Adoption - Field Marketing');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 2, 1,'Adoption - Partners');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 2, 1,'Apps');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 2, 1,'Assets - Case of Study/Success Story');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 2, 1,'Assets - Collateral');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 2, 1,'Assets - Translations');

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 2, 1,'Infraestructure');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 2, 1,'MGOs B1');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 2, 1,'MGOs Cloud');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 2, 1,'MGOs Direct JPR');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 2, 1,'MGO');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 2, 1,'MGO GB - High');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 2, 1,'MGO GB - Low');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 2, 1,'MGOs GB - All');

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Campaign Forecasting', 2, 1,'Attendees');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Campaign Forecasting', 2, 1,'MGOs');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Campaign Forecasting', 2, 1,'MTP');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Campaign Forecasting', 2, 1,'MIP');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Campaign Forecasting', 2, 1,'L3-L5');

------------- KPIs for L6 -------------
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 3, 1,'Infraestructure');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 3, 1,'MGOs B1');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 3, 1,'MGOs Cloud');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 3, 1,'MGOs Direct JPR');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 3, 1,'MGO');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 3, 1,'MGO GB - High');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 3, 1,'MGO GB - Low');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Business', 3, 1,'MGOs GB - All');

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 3, 1,'Adoption - Field Marketing');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 3, 1,'Adoption - Partners');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 3, 1,'Apps');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 3, 1,'Assets - Case of Study/Success Story');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 3, 1,'Assets - Collateral');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Operational', 3, 1,'Assets - Translations');

call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Campaign Forecasting', 3, 1,'Attendees');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Campaign Forecasting', 3, 1,'MGOs');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Campaign Forecasting', 3, 1,'MTP');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Campaign Forecasting', 3, 1,'MIP');
call "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS"('Campaign Forecasting', 3, 1,'L3-L5');

DROP PROCEDURE "PLANNING_TOOL"."xsplanningtool.db.procedures::INS_KPI_IF_NOT_EXISTS";

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-12', 'Load KPIs and Option for Level 5 and Level 6 - Sript', 'V201701171332__INS_KPI_TYPE_OPTION_L5_L6.sql');

COMMIT;