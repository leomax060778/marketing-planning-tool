create column table "PLANNING_TOOL"."HL4_FNC"
(
        "HL4_FNC_ID" bigint not null primary key generated by default as IDENTITY,
        "HL4_ID" bigint NOT NULL,
        "HL4_FNC_BUDGET_SPEND_Q1" decimal not null,
        "HL4_FNC_BUDGET_SPEND_Q2" decimal not null,
        "HL4_FNC_BUDGET_SPEND_Q3" decimal not null,
        "HL4_FNC_BUDGET_SPEND_Q4" decimal not null,
        "HL4_FNC_RESULT_Q1" decimal not null,
        "HL4_FNC_RESULT_Q2" decimal not null,
        "HL4_FNC_RESULT_Q3" decimal not null,
        "HL4_FNC_RESULT_Q4" decimal not null,
        "HL4_FNC_BUDGET_TOTAL" decimal not null,
        "HL4_FNC_BUDGET_TOTAL_MKT" decimal not null,
        "HL4_FNC_BUDGET_TOTAL_MKT_REG" decimal not null,
        "HL4_FNC_BUDGET_TOTAL_SALES" decimal not null,
        "HL4_FNC_BUDGET_TOTAL_PARTNER" decimal not null,
        "EURO_CONVERSION_ID" BIGINT not null,
        "IN_BUDGET" tinyint not null,
        "READ_ONLY" tinyint default 0,
        "BUDGET" decimal not null,
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,
        FOREIGN KEY ("HL4_ID") REFERENCES "PLANNING_TOOL"."HL4"("HL4_ID"),
        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "PLANNING_TOOL"."USER"("USER_ID"),
        FOREIGN KEY ("EURO_CONVERSION_ID") REFERENCES "PLANNING_TOOL"."EURO_CONVERSION"("EURO_CONVERSION_ID")
);