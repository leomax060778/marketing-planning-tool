create column table "PLANNING_TOOL"."HL4_PARTNER"
(
        "HL4_PARTNER_ID" bigint not null PRIMARY KEY generated by default as IDENTITY,
        "HL4_ID" bigint not null,
        "PARTNER_ID" bigint not null,
        "VALUE" decimal not null,
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("partner_id") REFERENCES "PLANNING_TOOL"."partner"("PARTNER_ID"),
        FOREIGN KEY ("hl4_id") REFERENCES "PLANNING_TOOL"."hl4"("HL4_ID"),
        FOREIGN KEY ("region_id") REFERENCES "PLANNING_TOOL"."region"("REGION_ID"),
        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "PLANNING_TOOL"."USER"("USER_ID")
);