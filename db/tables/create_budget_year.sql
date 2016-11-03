CREATE COLUMN TABLE "PLANNING_TOOL"."BUDGET_YEAR"
(
	BUDGET_YEAR_ID BIGINT not null primary key generated by default as IDENTITY,
	BUDGET_YEAR integer not null,
 	START_DATE timestamp not null,
 	END_DATE timestamp not null,
 	DEFAULT_YEAR tinyint default 0,
 	DESCRIPTION nvarchar(255),
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP,
	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT,
	ENABLED TINYINT DEFAULT 1, 
	DELETED TINYINT DEFAULT 0
)