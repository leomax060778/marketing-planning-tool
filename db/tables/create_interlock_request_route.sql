CREATE COLUMN TABLE "PLANNING_TOOL"."INTERLOCK_REQUEST_ROUTE" (
        "INTERLOCK_REQUEST_ORGANIZATION_ID" bigint not null primary key generated by default as IDENTITY,
        "INTERLOCK_REQUEST_ID" BIGINT NOT NULL,
        "ROUTE_ID" BIGINT NOT NULL,

        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "PLANNING_TOOL"."USER"("USER_ID"),
        FOREIGN KEY ("INTERLOCK_REQUEST_ID") REFERENCES "PLANNING_TOOL"."INTERLOCK_REQUEST"("INTERLOCK_REQUEST_ID"),
        FOREIGN KEY ("ROUTE_ID") REFERENCES "PLANNING_TOOL"."HL3"("HL3_ID")
);