create column table "PLANNING_TOOL".hl1 (
        hl1_id bigint not null primary key generated by default as IDENTITY,
        acronym nvarchar(25) NOT NULL,
        description nvarchar(255) NULL,
        budget DECIMAL(19,2) NOT NULL ,
        budget_year_id BIGINT NOT NULL,
        region_id BIGINT NULL,
        subregion_id BIGINT NULL,
        crt_related TINYINT DEFAULT 0 NOT NULL ,
        implement_execution_level TINYINT DEFAULT 0 NOT NULL ,
        team_type_id bigint not null,
        created_date_tz timestamp default CURRENT_TIMESTAMP,
        modified_date_tz timestamp default CURRENT_TIMESTAMP,
        created_user_id bigint not null,
        modified_user_id bigint,
        enabled tinyint default 1,
        deleted tinyint default 0,
        FOREIGN KEY (budget_year_id) REFERENCES "PLANNING_TOOL".budget_year(budget_year_id),
        FOREIGN KEY (team_type_id) REFERENCES "PLANNING_TOOL".team_type(team_type_id),
        FOREIGN KEY (created_user_id) REFERENCES "PLANNING_TOOL".USER(user_id)
);