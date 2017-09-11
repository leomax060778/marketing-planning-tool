create column table "PLANNING_TOOL"."HL1_VERSION" (
    hl1_id bigint not null,
    "VERSION" INTEGER NOT NULL,
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
    created_user_id bigint not null,
    FOREIGN KEY (created_user_id) REFERENCES "PLANNING_TOOL".USER(user_id),
    FOREIGN KEY (hl1_id) REFERENCES "PLANNING_TOOL".HL1(hl1_id)
);

create column table "PLANNING_TOOL"."HL2_VERSION" (
    hl2_id bigint not null,
    "VERSION" INTEGER NOT NULL,
    acronym NVARCHAR(25),
    description NVARCHAR(255),
    budget_year_id BIGINT,
    region_id BIGINT,
    subregion_id BIGINT,
    created_date_tz timestamp DEFAULT CURRENT_TIMESTAMP,
    created_user_id BIGINT NOT NULL ,
    hl2_budget_total DECIMAL(19,	2) NOT NULL ,
    organization_acronym NVARCHAR(25),
    organization_name NVARCHAR(255),
    team_type_id BIGINT DEFAULT 1,
    crt_related TINYINT DEFAULT 0 NOT NULL ,
    implement_execution_level TINYINT DEFAULT 0 NOT NULL ,
    hl1_id BIGINT NOT NULL ,
    in_budget TINYINT NOT NULL ,
    allow_automatic_budget_approval TINYINT DEFAULT 0,
    FOREIGN KEY (created_user_id) REFERENCES "PLANNING_TOOL".USER(user_id),
    FOREIGN KEY (hl2_id) REFERENCES "PLANNING_TOOL".HL2(hl2_id)
);

create column table "PLANNING_TOOL"."HL3_VERSION" (
    hl3_id bigint not null,
    "VERSION" INTEGER NOT NULL,
    hl3_description NVARCHAR(255) NOT NULL ,
    business_owner_id BIGINT NOT NULL ,
    origin_plan_id BIGINT,
    hl2_id BIGINT NOT NULL ,
    crm_id BIGINT,
    hl3_hierarchy_id BIGINT,
    created_date_tz timestamp DEFAULT CURRENT_TIMESTAMP,
    created_user_id BIGINT NOT NULL ,
    hl3_status_detail_id BIGINT,
    acronym NVARCHAR(25) NOT NULL ,
    hl3_fnc_budget_total DECIMAL(19,2),
    in_budget TINYINT,

    FOREIGN KEY (created_user_id) REFERENCES "PLANNING_TOOL".USER(user_id),
    FOREIGN KEY (hl3_id) REFERENCES "PLANNING_TOOL".HL3(hl3_id)
);
ALTER TABLE HL1_VERSION ADD PRIMARY KEY (hl1_id,version);
ALTER TABLE HL2_VERSION ADD PRIMARY KEY (hl2_id,version);
ALTER TABLE HL3_VERSION ADD PRIMARY KEY (hl3_id,version);
ALTER TABLE HL1 ADD ("VERSION" INTEGER DEFAULT 1);
ALTER TABLE HL2 ADD ("VERSION" INTEGER DEFAULT 1);
ALTER TABLE HL3 ADD ("VERSION" INTEGER DEFAULT 1);

ALTER TABLE BUDGET_YEAR ADD ("VERSIONED_START_DATE" timestamp NULL);
ALTER TABLE BUDGET_YEAR ADD ("VERSIONED_END_DATE" timestamp NULL);

--***************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-47', 'Lock/Save Integrated Plan(s)', 'V201707101000__Lock_Save_Integrated_Plans.sql');

COMMIT;