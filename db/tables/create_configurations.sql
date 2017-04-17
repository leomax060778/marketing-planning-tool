CREATE COLUMN TABLE "PLANNING_TOOL"."CONFIGURATIONS" (
        CONFIGURATION_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
        CONF_KEY NVARCHAR(255),
        CONF_VALUE NVARCHAR(500),
        CONF_DESCRIPTION NVARCHAR(500),
        CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        MODIFIED_DATE_TZ TIMESTAMP,
        CREATED_USER_ID BIGINT NOT NULL,
        MODIFIED_USER_ID BIGINT,
        ENABLED TINYINT DEFAULT 1,
        DELETED TINYINT DEFAULT 0,
        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "PLANNING_TOOL"."USER"("USER_ID")
);