CREATE COLUMN TABLE "PLANNING_TOOL"."INTERLOCK_REQUEST" (
        "INTERLOCK_REQUEST_ID" bigint not null primary key generated by default as IDENTITY,
        "ENTITY_ID" BIGINT NOT NULL,
        --"REQUESTER_USER_ID" BIGINT NOT NULL, rEPLACE THIS ATTRIBUTE WITH CREATED_USER_ID
        "REQUESTED_USER_ID" BIGINT NOT NULL,
        "HL4_ID" BIGINT NOT NULL,
        "ORGANIZATION_TYPE_ID" BIGINT NOT NULL,
        --"ORGANIZATION_ID" BIGINT NOT NULL,
        "REQUESTED_RESOURCE" NVARCHAR(140) NULL,
        "REQUESTED_BUDGET" DECIMAL(19,2) NULL,
        "INTERLOCK_STATUS_ID" BIGINT NOT NULL,

        "HASH" NVARCHAR(500) NOT NULL UNIQUE,
        "SALT" NVARCHAR(500) NULL,

        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("HL4_ID") REFERENCES "PLANNING_TOOL"."HL4"("HL4_ID"),
        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "PLANNING_TOOL"."USER"("USER_ID"),
        FOREIGN KEY ("ENTITY_ID") REFERENCES "PLANNING_TOOL"."INTERLOCK_ENTITY"("INTERLOCK_ENTITY_ID"),
        FOREIGN KEY ("ORGANIZATION_TYPE_ID") REFERENCES "PLANNING_TOOL"."ORGANIZATION_TYPE"("ORGANIZATION_TYPE_ID"),
        FOREIGN KEY ("INTERLOCK_STATUS_ID") REFERENCES "PLANNING_TOOL"."INTERLOCK_STATUS"("INTERLOCK_STATUS_ID")
);