create column table "PLANNING_TOOL".hl2 (
	hl2_id bigint not null primary key generated by default as IDENTITY,
	acronym nvarchar(25) NOT NULL,
	description nvarchar(255) NULL,
	budget_year_id BIGINT NOT NULL,
	plan_id BIGINT NOT NULL,
	region_id BIGINT NULL,
	subregion_id BIGINT NULL,
	created_date_tz timestamp default CURRENT_TIMESTAMP,
	modified_date_tz timestamp default CURRENT_TIMESTAMP,
	created_user_id bigint not null,
	modified_user_id bigint,
	enabled tinyint default 1,
	deleted tinyint default 0,
	FOREIGN KEY (budget_year_id) REFERENCES "PLANNING_TOOL".budget_year(budget_year_id),
	FOREIGN KEY (plan_id) REFERENCES "PLANNING_TOOL".plan(plan_id)
);