create column table "PLANNING_TOOL"."HL4_CATEGORY_OPTION" (
        "HL4_CATEGORY_OPTION_ID" bigint not null primary key generated by default as IDENTITY,
        "HL4_CATEGORY_ID" bigint NOT NULL,
        "OPTION_ID" bigint NOT NULL,
        "AMOUNT" DECIMAL(19,2) NULL,
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("OPTION_ID") REFERENCES "PLANNING_TOOL"."OPTION"("OPTION_ID"),
        FOREIGN KEY ("HL4_CATEGORY_ID") REFERENCES "PLANNING_TOOL"."HL4_CATEGORY"("HL4_CATEGORY_ID"),
        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "PLANNING_TOOL"."USER"("USER_ID")
);
