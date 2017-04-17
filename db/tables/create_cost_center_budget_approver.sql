CREATE COLUMN TABLE COST_CENTER_BUDGET_APPROVER(
	"COST_CENTER_BUDGET_APPROVER_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL,
	"COST_CENTER_ID" BIGINT NOT NULL,
	"BUDGET_APPROVER_ID" BIGINT NOT NULL,
	"CREATED_DATE_TZ" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"MODIFIED_DATE_TZ" TIMESTAMP,
	"CREATED_USER_ID" BIGINT NOT NULL,
	"MODIFIED_USER_ID" BIGINT,
	"ENABLED" TINYINT DEFAULT 1,
	"DELETED" TINYINT DEFAULT 0,
    FOREIGN KEY ("CREATED_USER_ID") REFERENCES "PLANNING_TOOL"."USER" ("USER_ID"),
	FOREIGN KEY ("COST_CENTER_ID") REFERENCES "PLANNING_TOOL"."COST_CENTER" ("COST_CENTER_ID"),
	FOREIGN KEY ("BUDGET_APPROVER_ID") REFERENCES "PLANNING_TOOL"."BUDGET_APPROVER" ("BUDGET_APPROVER_ID")
);