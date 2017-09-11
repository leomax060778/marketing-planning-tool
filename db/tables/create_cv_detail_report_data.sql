CREATE COLUMN TABLE "PLANNING_TOOL"."CV_DETAILED_REPORT_DATA"(
	"TEAM_TYPE_NAME" NVARCHAR(255),
	"L1_ACRONYM" NVARCHAR(25),
	"L1_DESCRIPTION" NVARCHAR(255),
	"REGION_NAME" NVARCHAR(255) NOT NULL,
	"SUBREGION_NAME" NVARCHAR(255) NOT NULL,
	"L2_ACRONYM" NVARCHAR(25),
	"L2_NAME" NVARCHAR(255),
	"L3_ACRONYM" NVARCHAR(25),
	"L3_DESCRIPTION" NVARCHAR(255),
	"L4_ACRONYM" NVARCHAR(25),
	"L4_CRM_DESCRIPTION" NVARCHAR(100),
	"L4_STATUS_DETAIL" NVARCHAR(255),
	"CATEGORY_NAME" NVARCHAR(60),
	"OPTION_NAME" NVARCHAR(255),
	"BUDGET_TYPE" NVARCHAR(255),
	"KPI_TYPE" NVARCHAR(127),
	"KPI_DESC" NVARCHAR(255),
	"BUDGET_YEAR" INTEGER,
	"L1_BUDGET" DECIMAL(28, 10),
	"L4_ID" BIGINT,
	"BUDGET_Q1" DECIMAL(19, 10),
	"BUDGET_Q2" DECIMAL(19, 10),
	"BUDGET_Q3" DECIMAL(19, 10),
	"BUDGET_Q4" DECIMAL(19, 10),
	"L4_BUDGET" DECIMAL(19, 10)NOT NULL,
	"OPTION_AMOUNT" DECIMAL(19, 10),
	"INVESTMENT_TYPE" VARCHAR(9) NOT NULL,
	"HL1_BUD_PROP" DECIMALNOT NULL,
	"HL1_BUD_PROP_MAX" DECIMAL,
	"HL2_BUD_PROP" DECIMAL(30, 21)NOT NULL,
	"HL3_BUD_PROP" DECIMAL(30, 21)NOT NULL,
	"HL4_BUD_PROP" DECIMAL(30, 21)NOT NULL,
	"HL4_BUD_PROP_2" DECIMAL,
	"HL2_NOT_ASSIGNED" DECIMAL(31, 21),
	"HL3_NOT_ASSIGNED" DECIMAL(31, 21),
	"REGION" NVARCHAR(255)
);
