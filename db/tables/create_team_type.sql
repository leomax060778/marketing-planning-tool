create column table "PLANNING_TOOL".TEAM_TYPE (
	team_type_id bigint not null primary key generated by default as IDENTITY,
	name nvarchar(255)
);