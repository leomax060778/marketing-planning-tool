CREATE COLUMN TABLE "PLANNING_TOOL"."EMPLOYEE_RESPONSIBLE" (
		"EMPLOYEE_RESPONSIBLE_ID" bigint not null primary key generated by default as IDENTITY,
        "FULL_NAME" NVARCHAR(255),
        "EMPLOYEE_NUMBER" NVARCHAR(255),        
        
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "PLANNING_TOOL"."USER"("USER_ID")     
);