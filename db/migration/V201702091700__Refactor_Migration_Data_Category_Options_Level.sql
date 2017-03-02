ALTER TABLE HL4_CATEGORY_OPTION ADD ("HL4_ID" BIGINT);
ALTER TABLE HL4_CATEGORY_OPTION ADD ("ALLOCATION_CATEGORY_OPTION_LEVEL_ID" BIGINT);
ALTER TABLE HL5_CATEGORY_OPTION ADD ("HL5_ID" BIGINT);
ALTER TABLE HL5_CATEGORY_OPTION ADD ("ALLOCATION_CATEGORY_OPTION_LEVEL_ID" BIGINT);
ALTER TABLE HL6_CATEGORY_OPTION ADD ("HL6_ID" BIGINT);
ALTER TABLE HL6_CATEGORY_OPTION ADD ("ALLOCATION_CATEGORY_OPTION_LEVEL_ID" BIGINT);

--update relations between L4 and category - options
update hl4_category_option
   set allocation_category_option_level_id = tt.allocation_category_option_level_id
   from hl4_category_option,
   (
   	select t2.allocation_category_option_level_id, t1.option_id from
   	(
   		select distinct o.option_id, trim(replace(o.name, char(9), '')) as name
		from option o
		inner join category c on c.category_id = o.category_id
		where c.hierarchy_level_id = 1
		and trim(replace(o.name, char(9), '')) in (select trim(replace(allocation_option.name, char(9), ''))  from allocation_option)
		order by o.name

   	) t1
   	inner join
   	(
   		select
		 acol.allocation_category_option_level_id
		,acol.allocation_category_id
		,acol.allocation_option_id
		,acol.hierarchy_level_id
		,ao.name as name
		from allocation_category_option_level acol
		inner join allocation_option ao on acol.allocation_option_id = ao.allocation_option_id
		where acol.hierarchy_level_id = 1
   	) t2 on trim(t1.name) = trim(t2.name)
   ) tt
   where hl4_category_option.option_id = tt.option_id;

--update relations between L5 and category - options
update hl5_category_option
   set allocation_category_option_level_id = tt.allocation_category_option_level_id
   from hl5_category_option,
   (
   	select t2.allocation_category_option_level_id, t1.option_id from
   	(
   		select distinct o.option_id, trim(replace(o.name, char(9), '')) as name
		from option o
		inner join category c on c.category_id = o.category_id
		where c.hierarchy_level_id = 2
		and trim(replace(o.name, char(9), '')) in (select trim(replace(allocation_option.name, char(9), ''))  from allocation_option)
		order by o.name

   	) t1
   	inner join
   	(
   		select
		 acol.allocation_category_option_level_id
		,acol.allocation_category_id
		,acol.allocation_option_id
		,acol.hierarchy_level_id
		,ao.name as name
		from allocation_category_option_level acol
		inner join allocation_option ao on acol.allocation_option_id = ao.allocation_option_id
		where acol.hierarchy_level_id = 2
   	) t2 on trim(t1.name) = trim(t2.name)
   ) tt
   where hl5_category_option.option_id = tt.option_id;

--update relations between L6 and category - options
update hl6_category_option
   set allocation_category_option_level_id = tt.allocation_category_option_level_id
   from hl6_category_option,
   (
   	select t2.allocation_category_option_level_id, t1.option_id from
   	(
   		select distinct o.option_id, trim(replace(o.name, char(9), '')) as name
		from option o
		inner join category c on c.category_id = o.category_id
		where c.hierarchy_level_id = 3
		and trim(replace(o.name, char(9), '')) in (select trim(replace(allocation_option.name, char(9), ''))  from allocation_option)
		order by o.name

   	) t1
   	inner join
   	(
   		select
		 acol.allocation_category_option_level_id
		,acol.allocation_category_id
		,acol.allocation_option_id
		,acol.hierarchy_level_id
		,ao.name as name
		from allocation_category_option_level acol
		inner join allocation_option ao on acol.allocation_option_id = ao.allocation_option_id
		where acol.hierarchy_level_id = 3
   	) t2 on trim(t1.name) = trim(t2.name)
   ) tt
   where hl6_category_option.option_id = tt.option_id;


--  store hl4_id into hl4_category_option
UPDATE HL4_CATEGORY_OPTION
SET HL4_ID = T.HL4_ID
FROM HL4_CATEGORY T, HL4_CATEGORY_OPTION
WHERE HL4_CATEGORY_OPTION.HL4_CATEGORY_ID = T.HL4_CATEGORY_ID;
--  store hl5_id into hl5_category_option
UPDATE HL5_CATEGORY_OPTION
SET HL5_ID = T.HL5_ID
FROM HL5_CATEGORY T, HL5_CATEGORY_OPTION
WHERE HL5_CATEGORY_OPTION.HL5_CATEGORY_ID = T.HL5_CATEGORY_ID;
--  store hl6_id into hl6_category_option
UPDATE HL6_CATEGORY_OPTION
SET HL6_ID = T.HL6_ID
FROM HL6_CATEGORY T, HL6_CATEGORY_OPTION
WHERE HL6_CATEGORY_OPTION.HL6_CATEGORY_ID = T.HL6_CATEGORY_ID;

---SET in_processing_report for new model in L4
update allocation_category_option_level
set in_processing_report = 1
from allocation_category_option_level, (
    select
	distinct aloc.allocation_category_id
	,aloc.hierarchy_level_id
	from hl4_category_option hl4CO
	inner join hl4_category hl4Cat on hl4CO.hl4_category_id = hl4Cat.hl4_category_id
	inner join category c on c.category_id = hl4Cat.category_id
	inner join allocation_category_option_level aloc on aloc.allocation_category_option_level_id = hl4CO.allocation_category_option_level_id
	where c.in_processing_report = 1
) T
where T.allocation_category_id = allocation_category_option_level.allocation_category_id
and T.hierarchy_level_id = allocation_category_option_level.hierarchy_level_id
and allocation_category_option_level.hierarchy_level_id = 1;

---SET in_processing_report for new model in L5
update allocation_category_option_level
set in_processing_report = 1
from allocation_category_option_level, (
    select
	distinct aloc.allocation_category_id
	,aloc.hierarchy_level_id
	from hl5_category_option hl5CO
	inner join hl5_category hl5Cat on hl5CO.hl5_category_id = hl5Cat.hl5_category_id
	inner join category c on c.category_id = hl5Cat.category_id
	inner join allocation_category_option_level aloc on aloc.allocation_category_option_level_id = hl5CO.allocation_category_option_level_id
	where c.in_processing_report = 1
) T
where T.allocation_category_id = allocation_category_option_level.allocation_category_id
and T.hierarchy_level_id = allocation_category_option_level.hierarchy_level_id
and allocation_category_option_level.hierarchy_level_id = 2;

---SET in_processing_report for new model in L6
update allocation_category_option_level
set in_processing_report = 1
from allocation_category_option_level, (
    select
	distinct aloc.allocation_category_id
	,aloc.hierarchy_level_id
	from hl6_category_option hl6CO
	inner join hl6_category hl6Cat on hl6CO.hl6_category_id = hl6Cat.hl6_category_id
	inner join category c on c.category_id = hl6Cat.category_id
	inner join allocation_category_option_level aloc on aloc.allocation_category_option_level_id = hl6CO.allocation_category_option_level_id
	where c.in_processing_report = 1
) T
where T.allocation_category_id = allocation_category_option_level.allocation_category_id
and T.hierarchy_level_id = allocation_category_option_level.hierarchy_level_id
and allocation_category_option_level.hierarchy_level_id = 3;


--delete unused constrains
CREATE PROCEDURE "PLANNING_TOOL"."xsplanningtool.db.procedures::DELETE_CONSTRAINT" (

	IN IN_TABLE_NAME NVARCHAR(255),
	IN IN_REFERENCED_TABLE_NAME NVARCHAR(255)

)
	LANGUAGE SQLSCRIPT
	SQL SECURITY INVOKER

	AS
BEGIN
   	DECLARE VALUE_CONSTRAINT NVARCHAR(255);
   	VALUE_CONSTRAINT := '';

	SELECT COALESCE(CONSTRAINT_NAME, '') INTO VALUE_CONSTRAINT from "SYS"."REFERENTIAL_CONSTRAINTS"
	WHERE TABLE_NAME = IN_TABLE_NAME AND REFERENCED_TABLE_NAME = IN_REFERENCED_TABLE_NAME;

	IF (:VALUE_CONSTRAINT <> '' )
	THEN
	exec 'ALTER TABLE '||:IN_TABLE_NAME||' DROP CONSTRAINT '||:VALUE_CONSTRAINT;
	COMMIT;
	END IF;

END;
--call procedure to delete FK
CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::DELETE_CONSTRAINT"('HL4_CATEGORY_OPTION','OPTION');
CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::DELETE_CONSTRAINT"('HL5_CATEGORY_OPTION','OPTION');
CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::DELETE_CONSTRAINT"('HL6_CATEGORY_OPTION','OPTION');

CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::DELETE_CONSTRAINT"('HL4_CATEGORY_OPTION','HL4_CATEGORY');
CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::DELETE_CONSTRAINT"('HL5_CATEGORY_OPTION','HL5_CATEGORY');
CALL "PLANNING_TOOL"."xsplanningtool.db.procedures::DELETE_CONSTRAINT"('HL6_CATEGORY_OPTION','HL6_CATEGORY');
--drop procedure from BD
DROP PROCEDURE "PLANNING_TOOL"."xsplanningtool.db.procedures::DELETE_CONSTRAINT" ;

-- BK
--ALTER TABLE "PLANNING_TOOL"."HL4_CATEGORY_OPTION" ADD FOREIGN KEY ( "OPTION_ID" ) REFERENCES "PLANNING_TOOL"."OPTION" ("OPTION_ID") ON UPDATE RESTRICT ON DELETE RESTRICT;
--ALTER TABLE "PLANNING_TOOL"."HL4_CATEGORY_OPTION" ADD FOREIGN KEY ( "HL4_CATEGORY_ID" ) REFERENCES "PLANNING_TOOL"."HL4_CATEGORY" ("HL4_CATEGORY_ID") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE HL4_CATEGORY_OPTION ADD CONSTRAINT HL4_ALLOCATION_CATEGORY_OPTION_LEVEL_ID FOREIGN KEY (ALLOCATION_CATEGORY_OPTION_LEVEL_ID) REFERENCES allocation_category_option_level(allocation_category_option_level_id);
ALTER TABLE HL5_CATEGORY_OPTION ADD CONSTRAINT HL5_ALLOCATION_CATEGORY_OPTION_LEVEL_ID FOREIGN KEY (ALLOCATION_CATEGORY_OPTION_LEVEL_ID) REFERENCES allocation_category_option_level(allocation_category_option_level_id);
ALTER TABLE HL6_CATEGORY_OPTION ADD CONSTRAINT HL6_ALLOCATION_CATEGORY_OPTION_LEVEL_ID FOREIGN KEY (ALLOCATION_CATEGORY_OPTION_LEVEL_ID) REFERENCES allocation_category_option_level(allocation_category_option_level_id);

ALTER TABLE "PLANNING_TOOL"."HL4_CATEGORY_OPTION" ALTER ("ALLOCATION_CATEGORY_OPTION_LEVEL_ID" BIGINT NOT NULL);
ALTER TABLE "PLANNING_TOOL"."HL5_CATEGORY_OPTION" ALTER ("ALLOCATION_CATEGORY_OPTION_LEVEL_ID" BIGINT NOT NULL);
ALTER TABLE "PLANNING_TOOL"."HL6_CATEGORY_OPTION" ALTER ("ALLOCATION_CATEGORY_OPTION_LEVEL_ID" BIGINT NOT NULL);

ALTER TABLE "PLANNING_TOOL"."HL4_CATEGORY_OPTION" ALTER ("HL4_CATEGORY_ID" BIGINT NULL);
ALTER TABLE "PLANNING_TOOL"."HL4_CATEGORY_OPTION" ALTER ("OPTION_ID" BIGINT NULL);

ALTER TABLE "PLANNING_TOOL"."HL5_CATEGORY_OPTION" ALTER ("HL5_CATEGORY_ID" BIGINT NULL);
ALTER TABLE "PLANNING_TOOL"."HL5_CATEGORY_OPTION" ALTER ("OPTION_ID" BIGINT NULL);

ALTER TABLE "PLANNING_TOOL"."HL6_CATEGORY_OPTION" ALTER ("HL6_CATEGORY_ID" BIGINT NULL);
ALTER TABLE "PLANNING_TOOL"."HL6_CATEGORY_OPTION" ALTER ("OPTION_ID" BIGINT NULL);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-25', 'Refactor Migration Data from Category Option Level', 'V201702091700__Refactor_Migration_Category_Options_Level.sql');

COMMIT;

