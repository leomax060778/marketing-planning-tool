create column table "PLANNING_TOOL"."HL5_REQUEST_CATEGORY_OPTION"(
    hl5_request_category_option_id BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	service_request_category_option_level_id bigint not null,
	hl5_id bigint not null,
	created_date_tz timestamp default CURRENT_TIMESTAMP,
	modified_date_tz timestamp,
	created_user_id bigint not null,
	modified_user_id bigint,
	enabled tinyint default 1,
	deleted tinyint default 0,
    FOREIGN KEY (CREATED_USER_ID) REFERENCES "PLANNING_TOOL".USER(USER_ID),
    FOREIGN KEY (SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID) REFERENCES "PLANNING_TOOL".SERVICE_REQUEST_CATEGORY_OPTION_LEVEL(SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID),
    FOREIGN KEY (HL5_ID) REFERENCES "PLANNING_TOOL".HL5(HL5_ID)
);