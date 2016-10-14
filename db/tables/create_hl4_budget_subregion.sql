create column table "PLANNING_TOOL"."HL4_BUDGET_SUBREGION"(
        "HL4_BUDGET_SUBREGION_ID" bigint not null primary key generated by default as IDENTITY,
        "HL4_ID" bigint not null,
        "SUBREGION_ID" bigint not null,
        "PERCENTAGE" DECIMAL(19,2),
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("HL4_ID") REFERENCES "PLANNING_TOOL"."HL4"("HL4_ID"),
        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "PLANNING_TOOL"."USER"("USER_ID")
);