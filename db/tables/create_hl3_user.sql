create column table "PLANNING_TOOL".HL3_USER (
	hl3_user_id bigint not null primary key generated by default as IDENTITY,
	hl3_id bigint not null,
	user_id bigint not null,
	created_date_tz timestamp default CURRENT_TIMESTAMP,
	created_user_id bigint not null,
	FOREIGN KEY (user_id) REFERENCES "PLANNING_TOOL".USER(user_id),
	FOREIGN KEY (hl3_id) REFERENCES "PLANNING_TOOL".hl3(hl3_id),
	FOREIGN KEY (created_user_id) REFERENCES "PLANNING_TOOL".USER(user_id)
);