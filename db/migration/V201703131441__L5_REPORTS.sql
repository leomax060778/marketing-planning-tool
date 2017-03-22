CREATE COLUMN TABLE "PLANNING_TOOL"."CV_L5_DETAILED_REPORT_DATA"(
    TEAM_TYPE_NAME NVARCHAR(255),
    L1_ACRONYM NVARCHAR(255),
    L1_DESCRIPTION NVARCHAR(255),
    REGION_NAME NVARCHAR(255),
    SUBREGION_NAME NVARCHAR(255),
    L2_ACRONYM NVARCHAR(255),
    L2_NAME NVARCHAR(255),
    L3_ACRONYM NVARCHAR(255),
    L3_DESCRIPTION NVARCHAR(255),
    L4_ACRONYM NVARCHAR(255),
    L4_DESCRIPTION NVARCHAR(255),
    L5_ACRONYM NVARCHAR(255),
    L5_CRM_DESCRIPTION NVARCHAR(255),
    L5_STATUS_DETAIL NVARCHAR(255),
    CATEGORY_NAME NVARCHAR(255),
    OPTION_NAME NVARCHAR(255),
    BUDGET_TYPE NVARCHAR(255),
    KPI_TYPE NVARCHAR(255),
    KPI_DESC NVARCHAR(255),
    ROW_INDEX INTEGER,
    BUDGET_YEAR NVARCHAR(255),
    L1_BUDGET DECIMAL(19,10),
    COUNT_L1 INTEGER,
    L2_BUDGET DECIMAL(19,10),
    L3_BUDGET DECIMAL(19,10),
    L5_ID INTEGER,
    COUNT_L5 INTEGER,
    BUDGET_Q1 DECIMAL(19,10),
    BUDGET_Q2 DECIMAL(19,10),
    BUDGET_Q3 DECIMAL(19,10),
    BUDGET_Q4 DECIMAL(19,10),
    ACTUAL_START_DATE TIMESTAMP,
    ACTUAL_END_DATE TIMESTAMP,
    PLANNED_START_DATE TIMESTAMP,
    PLANNED_END_DATE TIMESTAMP,
    MODIFIED_DATE TIMESTAMP,
    DISTRIBUTION_CHANNEL NVARCHAR(255),
    CAMPAIGN_OBJECTIVE NVARCHAR(255),
    L5_CAMPAIGN_TYPE NVARCHAR(255),
    CAMPAIGN_SUBTYPE NVARCHAR(255),
    MARKETING_PROGRAM NVARCHAR(255),
    BUSINESS_OWNER NVARCHAR(255),
    EMPLOYEE_RESPONSIBLE NVARCHAR(255),
    COST_CENTER NVARCHAR(255),
    SALE_ORGANIZATION NVARCHAR(255),
    ROUTE_TO_MARKET NVARCHAR(255),
    L5_PRIORITY NVARCHAR(255),
    L4_BUDGET DECIMAL(19,10),
    L5_BUDGET DECIMAL(19,10),
    OPTION_AMOUNT DECIMAL(19,10),
    BUDGET_PERCENTAGE DECIMAL(19,10),
    KPI_EURO_VALUE DECIMAL(19,10),
    KPI_AMOUNT_VOLUME DECIMAL(19,10),
    COUNT_KPI_BY_L5 INTEGER,
    TOTAL_MY_BUDGET DECIMAL(19,10),
    TOTAL_SALE DECIMAL(19,10),
    TOTAL_PARTNER DECIMAL(19,10),
    TOTAL_BUDGET DECIMAL(19,10),
    ROW_COUNTER INTEGER,
    HL1_BUD_PROP DECIMAL(19,10),
    HL2_BUD_PROP DECIMAL(19,10),
    HL3_BUD_PROP DECIMAL(19,10),
    HL4_BUD_PROP DECIMAL(19,10),
    HL5_BUD_PROP DECIMAL(19,10),
    HL1_BUD_PROP_MAX DECIMAL(19,10),
    HL5_BUD_PROP_2 DECIMAL(19,10),
    HL5_KPI_PROP_EUR DECIMAL(19,10),
    HL5_KPI_PROP_VOL DECIMAL(19,10),
    HL1_NOT_ASSIGNED DECIMAL(19,10),
    HL2_NOT_ASSIGNED DECIMAL(19,10),
    HL3_NOT_ASSIGNED DECIMAL(19,10),
    HL4_NOT_ASSIGNED DECIMAL(19,10),
    COUNT_L5_PROP DECIMAL(19,10),
    REGION NVARCHAR(255),
    INVESTMENT_TYPE NVARCHAR(255)
)

CREATE COLUMN TABLE "PLANNING_TOOL"."CV_COMPARATIVE_L4_L5_REPORT_DATA"
(
    HL4_ID INTEGER
    , HL3_ID INTEGER
    , L4_ACRONYM NVARCHAR(255)
    , L4_BUDGET DECIMAL(19,10)
    , L4_STATUS_DETAIL NVARCHAR(255)
    , CATEGORY_NAME NVARCHAR(255)
    , OPTION_NAME NVARCHAR(255)
    , L4_BUDGET_DISTRIBUTION DECIMAL(19,10)
    , L5_BUDGET_DISTRIBUTION DECIMAL(19,10)
    , DIFFERENCE DECIMAL(19,10)
    , PATH NVARCHAR(255)
    , ROW_COUNTER INTEGER
    , L4_BUDGET_PROP DECIMAL(19,10)
    , L4_BUDGET_DISTRIBUTION_PROP DECIMAL(19,10)
    , L5_BUDGET_DISTRIBUTION_PROP DECIMAL(19,10)
    , DIFFERENCE_PROP DECIMAL(19,10)
)

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-31', 'L5 report', 'V201703131441__L5_Report.sql');

COMMIT;

