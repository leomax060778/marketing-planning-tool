create column table "PLANNING_TOOL".HL1_USER (
        hl1_id bigint not null,
        user_id bigint not null,
		created_date_tz timestamp default CURRENT_TIMESTAMP,
        created_user_id bigint not null,
        FOREIGN KEY (user_id) REFERENCES "PLANNING_TOOL".USER(user_id),
        FOREIGN KEY (hl1_id) REFERENCES "PLANNING_TOOL".hl1(hl1_id),
        FOREIGN KEY (created_user_id) REFERENCES "PLANNING_TOOL".USER(user_id)
);