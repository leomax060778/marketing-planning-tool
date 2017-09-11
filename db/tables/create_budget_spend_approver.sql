CREATE COLUMN TABLE "PLANNING_TOOL"."BUDGET_SPEND_APPROVER" (
    "BUDGET_SPEND_APPROVER_ID" bigint not null primary key generated by default as IDENTITY,
    "USER_ID" BIGINT,
    "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
    "MODIFIED_DATE_TZ" timestamp,
    "CREATED_USER_ID" bigint not null,
    "MODIFIED_USER_ID" bigint,
    "ENABLED" tinyint default 1,
    "DELETED" tinyint default 0,
    FOREIGN KEY ("CREATED_USER_ID") REFERENCES "PLANNING_TOOL"."USER"("USER_ID"),
    FOREIGN KEY ("USER_ID") REFERENCES "PLANNING_TOOL"."USER"("USER_ID")
);