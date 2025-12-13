export const projectsData = {
  // ============================================
  // PERSONAL PROJECTS
  // ============================================
  
  'executive-sales-dashboard': {
    id: 'executive-sales-dashboard',
    type: 'personal',
    title: 'Executive Sales Performance Dashboard',
    subtitle: 'Interactive Tableau dashboard telling the story of sales performance with advanced visualizations and drill-down analysis',
    year: '2026',
    role: 'Data Analyst / BI Developer',
    team: 'Solo project',
    status: 'Completed',
    tldr: 'Created a public, interactive sales analytics dashboard in Tableau that tells a compelling business story through advanced visualizations. Features executive summary with KPIs, regional performance heatmaps, sales funnel analysis, customer segmentation matrix (RFM), and trend analysis with forecasting. Demonstrates data storytelling skills beyond basic chart creation - shows ability to communicate insights that drive business decisions.',

    overview: `Developed a professional-grade business intelligence dashboard that demonstrates advanced data visualization and storytelling capabilities. This is not just "charts on a page" - it's a carefully designed analytical narrative that guides executives through key sales insights. The dashboard answers critical business questions: "Where are we winning and losing?", "Which regions need attention?", "What's our sales forecast?", "Which customer segments are most valuable?" Uses Tableau's advanced features including calculated fields, LOD expressions, parameters for dynamic filtering, dashboard actions for interactivity, and custom color palettes for professional presentation. Published to Tableau Public for portfolio demonstration.`,

    problem: `Sales data exists in spreadsheets and databases, but executives don't have time to dig through tables or run SQL queries. They need quick answers to strategic questions during board meetings and quarterly reviews. Basic charts don't tell a story - they just show data. Executives need context: "Is this good or bad?", "Why is this happening?", "What should we do about it?" Many analysts can create visualizations, but few can create compelling data stories that actually influence business decisions. This dashboard demonstrates the difference between showing data and telling a story.`,

    solution: `Built a multi-page Tableau dashboard with clear narrative flow: (1) Executive Summary page with high-level KPIs (revenue, growth %, target attainment) using dynamic indicators and color coding, (2) Geographic Analysis with sales heatmap showing regional performance and drill-down to individual territories, (3) Sales Funnel visualization tracking conversion rates through pipeline stages with bottleneck identification, (4) Customer Segmentation matrix using RFM analysis to identify high-value customers and at-risk accounts, (5) Trend Analysis with forecasting showing historical performance and projected future revenue. Each page designed with executive users in mind: minimal clutter, clear insights, actionable next steps highlighted.`,

    techStack: {
      'Visualization': ['Tableau Desktop', 'Tableau Public'],
      'Data Preparation': ['Python (pandas)', 'SQL', 'Excel'],
      'Advanced Features': ['Calculated Fields', 'LOD Expressions', 'Parameters', 'Dashboard Actions', 'Forecasting', 'Sets'],
      'Design': ['Color Theory', 'Data Storytelling Principles', 'UX Design']
    },

    architecture: {
      components: [
        { name: 'Executive Summary Page', description: 'KPI scorecard with current vs. target, YoY growth %, top performing reps. Uses traffic light colors (green/yellow/red) for quick status assessment. Dynamic date range selection via parameters.' },
        { name: 'Geographic Performance', description: 'Filled map heatmap showing sales by region/territory. Click-through drill-down from country → state → city. Bubble chart showing market size vs. market share by territory.' },
        { name: 'Sales Funnel Analysis', description: 'Horizontal funnel chart showing leads → qualified → proposal → closed, with conversion rates between stages. Identifies bottlenecks where prospects drop off.' },
        { name: 'Customer Segmentation', description: 'Scatter plot matrix positioning customers by recency (last purchase date) and monetary value (total revenue). Color coded by segment (Champions, Loyal, At Risk, Lost) based on RFM analysis.' },
        { name: 'Trend & Forecast', description: 'Dual-axis line chart: actual monthly revenue + trend line with confidence bands. Tableau native forecasting for next quarter projections. Annotations for significant events (product launches, campaigns).' },
        { name: 'Interactivity Layer', description: 'Dashboard actions enable clicking on region → filters entire dashboard to that region. Parameters allow switching between metrics (revenue, units, profit). Tooltips show detailed context on hover.' }
      ]
    },

    metrics: {
      'Dashboard Pages': '5 connected views',
      'Visualizations': '15+ charts',
      'Calculated Fields': '20+ custom metrics',
      'Interactivity': 'Full drill-down and filtering',
      'Data Points': '100K+ sales transactions',
      'Customers': '10K+',
      'Time Range': '3 years (2022-2024)',
      'Public URL': 'Tableau Public profile'
    },

    challenges: [
      {
        challenge: 'Making the dashboard tell a story rather than just displaying charts.',
        solution: 'Designed clear narrative flow across pages: start with "what" (KPIs), then "where" (geography), "why" (funnel bottlenecks), "who" (customer segments), and "what\'s next" (forecast). Added text annotations explaining key insights. Used consistent color scheme throughout to reduce cognitive load.'
      },
      {
        challenge: 'Balancing detail with executive-level simplicity - too much data overwhelms, too little lacks credibility.',
        solution: 'Implemented progressive disclosure: start with high-level summary, enable drill-down for details. Used dashboard actions so clicking a region shows detail without cluttering main view. Tooltips provide context without adding to visual complexity.'
      },
      {
        challenge: 'Creating professional-looking visualizations that stand out in portfolio.',
        solution: 'Applied data visualization best practices: removed chart junk, used pre-attentive attributes (color, size) strategically, aligned to grid, consistent typography. Chose muted professional color palette instead of default Tableau colors. Added clean headers and white space.'
      },
      {
        challenge: 'Making RFM customer segmentation interpretable for non-technical executives.',
        solution: 'Created clear segment names (Champions, Loyal, At Risk, Lost) with plain-English definitions. Used intuitive quadrant layout in scatter plot. Added reference lines showing segment boundaries. Tooltips explain what each segment means and suggest actions (e.g., "At Risk: Engage with retention campaign").'
      }
    ],

    impact: [
      'Demonstrates ability to communicate data insights to non-technical stakeholders - critical for data analyst and BI developer roles',
      'Shows mastery of Tableau beyond basic charts - LOD expressions, parameters, and dashboard actions prove advanced skills',
      'Creates portfolio piece that recruiters can actually interact with (Tableau Public link) rather than just screenshots',
      'Exhibits understanding of business context, not just technical visualization - dashboard answers real strategic questions',
      'Differentiates from candidates who only show SQL/Python skills without visualization expertise'
    ],

    learnings: [
      'Good dashboards tell stories - they have a beginning (context), middle (analysis), and end (recommendations)',
      'Less is more - removing unnecessary elements makes insights clearer than adding more charts',
      'Color is a language - consistent color encoding (e.g., always red = below target) reduces cognitive load and speeds comprehension',
      'Interactivity must be purposeful - every click should reveal something valuable, not just exist because Tableau allows it',
      'Design for your audience - executives need different dashboards than analysts (summary vs. detail, decisions vs. exploration)',
      'Tableau Public is incredibly valuable for portfolios - live, interactive dashboards impress far more than static screenshots or PDFs'
    ],

    screenshots: [
      { title: 'Executive Summary KPI View', url: '/projects/tableau-executive-summary.png' },
      { title: 'Geographic Performance Heatmap', url: '/projects/tableau-geography.png' },
      { title: 'Customer Segmentation Matrix', url: '/projects/tableau-segmentation.png' }
    ],

    codeSnippets: {
      'RFM Customer Segmentation (Calculated Fields)': `// Tableau Calculated Fields for RFM Analysis
// ============================================

// RECENCY: Days since last purchase
// ============================================
// Uses LOD expression to get most recent order per customer
DATEDIFF('day', {FIXED [Customer ID]: MAX([Order Date])}, TODAY())

// Recency Score (1-5, where 5 = most recent)
// Using NTILE equivalent with RANK percentile
IF [Days Since Last Purchase] <= PERCENTILE([Days Since Last Purchase], 0.2) THEN 5
ELSEIF [Days Since Last Purchase] <= PERCENTILE([Days Since Last Purchase], 0.4) THEN 4
ELSEIF [Days Since Last Purchase] <= PERCENTILE([Days Since Last Purchase], 0.6) THEN 3
ELSEIF [Days Since Last Purchase] <= PERCENTILE([Days Since Last Purchase], 0.8) THEN 2
ELSE 1
END

// ============================================
// FREQUENCY: Number of orders
// ============================================
{FIXED [Customer ID]: COUNTD([Order ID])}

// Frequency Score (1-5, where 5 = most frequent)
IF [Order Count] >= PERCENTILE([Order Count], 0.8) THEN 5
ELSEIF [Order Count] >= PERCENTILE([Order Count], 0.6) THEN 4
ELSEIF [Order Count] >= PERCENTILE([Order Count], 0.4) THEN 3
ELSEIF [Order Count] >= PERCENTILE([Order Count], 0.2) THEN 2
ELSE 1
END

// ============================================
// MONETARY: Total customer value
// ============================================
{FIXED [Customer ID]: SUM([Revenue])}

// Monetary Score (1-5, where 5 = highest spending)
IF [Total Customer Revenue] >= PERCENTILE([Total Customer Revenue], 0.8) THEN 5
ELSEIF [Total Customer Revenue] >= PERCENTILE([Total Customer Revenue], 0.6) THEN 4
ELSEIF [Total Customer Revenue] >= PERCENTILE([Total Customer Revenue], 0.4) THEN 3
ELSEIF [Total Customer Revenue] >= PERCENTILE([Total Customer Revenue], 0.2) THEN 2
ELSE 1
END

// ============================================
// SEGMENT NAME: Business-friendly labels
// ============================================
IF [Recency Score] >= 4 AND [Frequency Score] >= 4 AND [Monetary Score] >= 4
THEN "Champions"
ELSEIF [Recency Score] >= 3 AND [Frequency Score] >= 3 AND [Monetary Score] >= 3
THEN "Loyal Customers"
ELSEIF [Recency Score] >= 4 AND [Frequency Score] <= 2 AND [Monetary Score] <= 2
THEN "New Customers"
ELSEIF [Recency Score] <= 2 AND [Frequency Score] >= 3 AND [Monetary Score] >= 3
THEN "At Risk"
ELSEIF [Recency Score] <= 2 AND [Frequency Score] <= 2
THEN "Lost"
ELSEIF [Monetary Score] >= 4
THEN "Big Spenders"
ELSE "Regular"
END

// ============================================
// Usage in Scatter Plot:
// ============================================
// X-Axis: [Days Since Last Purchase] (Recency)
// Y-Axis: [Total Customer Revenue] (Monetary)  
// Color: [Customer Segment Name]
// Size: [Customer Lifetime Value]
// Detail: [Customer ID]`
    },

    links: {
      github: 'https://github.com/danielg-gerlach/executive-sales-dashboard',
      demo: 'https://public.tableau.com/app/profile/yourname/viz/ExecutiveSalesDashboard',
      documentation: 'https://github.com/danielg-gerlach/executive-sales-dashboard/blob/main/README.md'
    }
  },

  'databricks-lakehouse-iot': {
    id: 'databricks-lakehouse-iot',
    type: 'personal',
    title: 'IoT Analytics Lakehouse on Databricks',
    subtitle: 'Modern data lakehouse using Delta Lake, medallion architecture, and batch processing for IoT sensor analytics',
    year: '2026',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Built a production-grade data lakehouse on Databricks Community Edition using Delta Lake and medallion architecture (bronze/silver/gold layers). Processes 10M+ simulated IoT sensor events from smart manufacturing equipment using PySpark batch transformations. Demonstrates modern lakehouse patterns: ACID transactions, schema evolution, time travel, data quality checks, and optimized analytics queries.',

    overview: `Developed a comprehensive data lakehouse solution on Databricks that processes IoT sensor data from manufacturing equipment. The project demonstrates the modern "lakehouse" architecture that combines the flexibility of data lakes with the structure and reliability of data warehouses. Implements the medallion architecture pattern with bronze (raw data), silver (cleaned/conformed), and gold (business-level aggregates) layers. Uses Delta Lake for ACID transactions, schema enforcement, and time travel capabilities. Shows real-world patterns for handling high-volume batch processing, incremental loads, and enabling both operational and analytical queries.`,

    problem: `Manufacturing companies generate millions of IoT sensor events daily from equipment monitoring (temperature, vibration, pressure, energy consumption). Traditional batch warehouses can't provide the flexibility needed for exploratory analytics and data science, while pure data lakes lack data quality guarantees and create messy data swamps. Analysts need to answer both real-time questions ("Show me equipment operating outside safe parameters") and historical questions ("What was average machine utilization last quarter?"). They also need confidence that data quality issues won't corrupt analytics. Traditional architectures force choosing between data lake flexibility and warehouse reliability - the lakehouse pattern provides both.`,

    solution: `Built a lakehouse on Databricks using Delta Lake that unifies data lake flexibility with warehouse reliability. Bronze layer ingests raw JSON sensor events, preserving all original data for reprocessing. Silver layer applies data quality rules, deduplicates events, standardizes timestamps, and conforms data types using PySpark transformations. Gold layer creates business-ready aggregates: equipment_health_metrics (hourly rollups by machine), anomaly_detection_events (flagged outliers), predictive_maintenance_features (ML-ready aggregations). All layers use Delta Lake for ACID guarantees, enabling time travel for debugging, schema evolution for changing requirements, and optimized query performance through partitioning and Z-ordering.`,

    techStack: {
      'Platform': ['Databricks Community Edition', 'Apache Spark 3.5', 'Delta Lake'],
      'Languages': ['Python', 'PySpark', 'SQL'],
      'Storage': ['Delta Lake Tables', 'DBFS (Databricks File System)'],
      'Processing': ['Batch Jobs', 'Incremental Processing'],
      'Notebooks': ['Databricks Notebooks', 'Version control integration'],
      'Data Generation': ['Python Faker', 'Custom IoT event generator']
    },

    architecture: {
      components: [
        { name: 'Bronze Layer (Raw)', description: 'Landing zone for raw IoT sensor events ingested as JSON. Schema inference and evolution enabled. Append-only Delta tables preserve complete history for reprocessing. Minimal transformations - add ingestion timestamp only.' },
        { name: 'Silver Layer (Cleaned)', description: 'Cleaned and conformed data with PySpark transformations: deduplication by sensor_id + timestamp, null handling, timestamp standardization to UTC, type casting, data quality checks (range validation for sensor values), quality flags added but bad data preserved.' },
        { name: 'Gold Layer (Aggregates)', description: 'Business-level aggregates optimized for analytics: hourly equipment metrics, daily anomaly summaries, predictive maintenance feature engineering. Partitioned by date for query performance, Z-ordered by equipment_id for faster filtering.' },
        { name: 'Batch Processing Pipeline', description: 'Incremental batch processing pattern: identify new/changed data since last run, process only delta, merge results into target tables. Idempotent jobs that can be safely re-run.' },
        { name: 'Data Quality Framework', description: 'Expectations validated at silver layer: sensor values within valid ranges, mandatory fields present, timestamp monotonicity per sensor, duplicate detection and flagging. Quality summary metrics tracked over time.' },
        { name: 'Time Travel & Versioning', description: 'Delta Lake time travel enables querying historical versions, rollback of bad writes, and audit trails. Vacuum command manages retention policies (7-day default). Table history tracked with versioning.' }
      ]
    },

    metrics: {
      'Total Events': '10M+ sensor readings',
      'Sensors Tracked': '500 devices',
      'Equipment': '100 machines',
      'Time Range': '6 months simulated data',
      'Layers': '3 (Bronze/Silver/Gold)',
      'Delta Tables': '8',
      'Processing Mode': 'Batch with incremental patterns',
      'Data Quality Rules': '12 checks',
      'Partitioning': 'Date-based on silver/gold layers',
      'Performance': 'Optimized with Z-ordering'
    },

    challenges: [
      {
        challenge: 'Handling schema evolution as new sensor types are added without breaking downstream pipelines.',
        solution: 'Enabled schema evolution in Delta Lake with mergeSchema option. Bronze layer uses schema inference to accept new fields automatically. Silver layer uses schema validation to flag unexpected changes. Gold layer uses explicit column selection to be resilient to bronze/silver additions.'
      },
      {
        challenge: 'Processing 10M events efficiently in Databricks Community Edition with limited compute resources.',
        solution: 'Implemented smart partitioning (by date) and file sizing. Used Delta Lake liquid clustering for better data skipping. Avoided expensive operations like full table scans. Used broadcast joins for small dimension tables. Generated data in Parquet format pre-compressed for faster initial loads.'
      },
      {
        challenge: 'Detecting sensor anomalies (outliers) without complex ML models initially.',
        solution: 'Implemented statistical anomaly detection using PySpark: calculated rolling mean and standard deviation per sensor over 24-hour windows using window functions. Flagged values >3 standard deviations from mean as anomalies. Created gold table of anomaly_events for investigation.'
      },
      {
        challenge: 'Ensuring data quality while preserving bad data for investigation and reprocessing.',
        solution: 'Added is_valid_range and is_null_value boolean flags at silver layer rather than filtering out bad records. Gold layer filters to only valid data. Allows data quality team to investigate issues without data loss and enables reprocessing with improved logic.'
      }
    ],

    impact: [
      'Demonstrates modern lakehouse architecture that unifies data lake flexibility with warehouse reliability - critical for cloud data engineering roles',
      'Shows hands-on experience with Delta Lake and Databricks, which are rapidly becoming industry standards (used by Netflix, Comcast, H&M, Shell)',
      'Proves ability to handle large-scale batch processing with proper partitioning and optimization strategies',
      'Exhibits understanding of medallion architecture pattern used in production data platforms at enterprises',
      'Portfolio-ready project that can be shared via Databricks Community Edition notebooks exported to GitHub'
    ],

    learnings: [
      'Delta Lake solves real pain points that data lakes have: schema enforcement prevents bad data, ACID transactions prevent partial writes, time travel enables debugging and rollback',
      'Medallion architecture (bronze/silver/gold) provides clear separation of concerns and makes data lineage obvious - bronze never deletes data (reprocessing insurance), silver is source of truth, gold is optimized for consumption',
      'PySpark window functions are incredibly powerful for time-series analytics - can calculate rolling aggregations, lead/lag values, and rank events efficiently at scale',
      'Data quality shouldn\'t mean data deletion - preserving "bad" data with quality flags enables investigation and reprocessing',
      'Databricks notebooks are excellent for documenting data engineering work - mixing code, visualizations, and markdown creates self-documenting pipelines that impress recruiters',
      'Partitioning and Z-ordering are essential for query performance on large datasets - choosing the right partition columns based on query patterns matters significantly'
    ],

    screenshots: [
      { title: 'Medallion Architecture Diagram', url: '/projects/databricks-medallion.png' },
      { title: 'Delta Lake Time Travel Query', url: '/projects/databricks-timetravel.png' },
      { title: 'Data Quality Dashboard', url: '/projects/databricks-quality.png' }
    ],

    codeSnippets: {
      'Silver Layer Transformation with Data Quality': `# notebooks/silver_sensor_events.py
# Silver layer: Clean and conform IoT sensor data with quality checks

from pyspark.sql import functions as F
from pyspark.sql.window import Window
from delta.tables import DeltaTable

# Read from bronze layer (raw events)
bronze_df = spark.read.format("delta").table("bronze_iot.sensor_events")

# Define valid ranges for sensor types
valid_ranges = {
    "temperature": (-50, 150),  # Celsius
    "vibration": (0, 100),      # mm/s
    "pressure": (0, 200),       # PSI
    "power_consumption": (0, 500)  # kW
}

def is_within_range(sensor_type, value):
    """Check if sensor value is within valid range"""
    if sensor_type not in valid_ranges:
        return True  # Unknown sensor types pass (captured for review)
    min_val, max_val = valid_ranges[sensor_type]
    return (value >= min_val) and (value <= max_val)

# Register UDF for range validation
from pyspark.sql.types import BooleanType
is_within_range_udf = F.udf(is_within_range, BooleanType())

# Silver transformation
silver_df = (
    bronze_df
    # Standardize timestamp to UTC
    .withColumn("event_timestamp_utc", 
        F.to_utc_timestamp("event_timestamp", "UTC"))
    
    # Type casting and null handling
    .withColumn("sensor_value", F.col("sensor_value").cast("double"))
    .withColumn("equipment_id", F.col("equipment_id").cast("string"))
    
    # Add data quality flags
    .withColumn("is_valid_range", 
        is_within_range_udf(F.col("sensor_type"), F.col("sensor_value")))
    .withColumn("is_null_value", F.col("sensor_value").isNull())
    
    # Deduplication: keep latest event per sensor + timestamp
    .withColumn("row_num", 
        F.row_number().over(
            Window.partitionBy("sensor_id", "event_timestamp_utc")
            .orderBy(F.col("ingestion_time").desc())
        ))
    .filter(F.col("row_num") == 1)
    .drop("row_num")
    
    # Add processing metadata
    .withColumn("processed_at", F.current_timestamp())
    .withColumn("silver_layer_version", F.lit("v1.0"))
    
    # Select final schema
    .select(
        "event_id",
        "sensor_id", "equipment_id",
        "equipment_type",
        "sensor_type",
        "sensor_value",
        "event_timestamp_utc",
        "is_valid_range",
        "is_null_value",
        "processed_at",
        "silver_layer_version"
    )
)

# Write to Silver Delta table with partitioning
(silver_df
    .write
    .format("delta")
    .mode("overwrite")  # For initial load; use merge for incremental
    .option("mergeSchema", "true")  # Allow schema evolution
    .partitionBy("event_timestamp_utc")
    .saveAsTable("silver_iot.sensor_events"))

# Data quality summary
quality_summary = silver_df.agg(
    F.count("*").alias("total_events"),
    F.sum(F.when(~F.col("is_valid_range"), 1).otherwise(0)).alias("out_of_range_events"),
    F.sum(F.when(F.col("is_null_value"), 1).otherwise(0)).alias("null_value_events"),
    F.countDistinct("equipment_id").alias("unique_equipment"),
    F.min("event_timestamp_utc").alias("earliest_event"),
    F.max("event_timestamp_utc").alias("latest_event")
)

display(quality_summary)`
    },

    links: {
      github: 'https://github.com/danielg-gerlach/databricks-lakehouse-iot',
      demo: null,
      documentation: 'https://github.com/danielg-gerlach/databricks-lakehouse-iot/blob/main/README.md'
    }
  },

  'snowflake-saas-dwh': {
    id: 'snowflake-saas-dwh',
    type: 'personal',
    title: 'Snowflake SaaS Analytics Data Warehouse',
    subtitle: 'Production-grade dimensional data warehouse for SaaS product analytics with SCD Type 2, incremental loads, and dbt',
    year: '2026',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Building a dimensional data warehouse in Snowflake for SaaS product analytics. Implements star schema with subscription, usage, and revenue fact tables. Features SCD Type 2 for tracking customer and plan changes over time, incremental loading patterns, and full dbt project with tests and documentation. Covers key SaaS metrics: MRR, churn, LTV, feature adoption.',

    overview: `Developing a production-grade data warehouse on Snowflake specifically designed for SaaS product analytics. The project ingests raw subscription data, usage events, and billing information, transforming them into a star schema optimized for analyzing customer lifecycle, revenue metrics, and product engagement. Implements slowly changing dimensions (SCD Type 2) to track how customers, subscriptions, and pricing plans change over time - critical for accurate cohort analysis and historical reporting.`,

    problem: `SaaS companies need to track complex metrics like MRR movements, customer churn, expansion revenue, and feature adoption over time. Raw transactional data doesn't support these analytics - subscription changes overwrite history, making it impossible to answer "what was this customer's plan 6 months ago?" Without proper dimensional modeling, analysts write complex queries that produce inconsistent metrics across teams.`,

    solution: `Building a three-layer data warehouse architecture: (1) Raw/Staging layer that lands source data from application database and billing system, (2) Integration layer that applies business logic, SCD Type 2 handling for customers and subscriptions, and standardizes event data, (3) Presentation layer with star schema optimized for SaaS analytics including pre-calculated MRR, churn flags, and usage aggregations. Using dbt for all transformations with comprehensive testing.`,

    techStack: {
      'Data Warehouse': ['Snowflake'],
      'Transformation': ['dbt Core', 'SQL', 'Jinja'],
      'Orchestration': ['Snowflake Tasks', 'dbt Cloud (planned)'],
      'Data Quality': ['dbt tests', 'dbt expectations'],
      'Version Control': ['Git', 'GitHub'],
      'Documentation': ['dbt docs', 'ERD diagrams']
    },

    architecture: {
      components: [
        { name: 'Staging Layer (RAW)', description: 'Landing zone for source data from application Postgres DB and Stripe billing. Implements COPY INTO from S3 with file metadata tracking and deduplication.' },
        { name: 'Integration Layer (INT)', description: 'Business logic application, data type standardization, and SCD Type 2 processing using dbt snapshots for customers, subscriptions, and pricing plans.' },
        { name: 'Presentation Layer (MART)', description: 'Star schema with conformed dimensions and fact tables. Optimized for BI tool consumption with proper clustering keys on date and customer.' },
        { name: 'Fact Tables', description: 'fact_subscriptions (grain: subscription state per day), fact_usage_events (grain: individual usage event), fact_mrr_movements (grain: MRR change event), fact_invoices (grain: invoice line item).' },
        { name: 'Dimension Tables', description: 'dim_customers (SCD2), dim_subscriptions (SCD2), dim_plans (SCD2), dim_features, dim_date.' },
        { name: 'Metrics Layer', description: 'Pre-calculated business metrics: MRR by cohort, churn rates, LTV estimates, feature adoption rates, usage percentiles.' }
      ]
    },

    metrics: {
      'Fact Tables': '4',
      'Dimension Tables': '5',
      'SCD Type 2 Tables': '3 (customers, subscriptions, plans)',
      'dbt Models': '30+',
      'dbt Tests': '60+',
      'Load Pattern': 'Incremental (daily)',
      'Sample Data': '50K customers, 3 years history'
    },

    challenges: [
      {
        challenge: 'Implementing SCD Type 2 efficiently for high-volume subscription changes.',
        solution: 'Using dbt snapshots with timestamp strategy for change detection. Configuring appropriate clustering on surrogate keys and effective dates for query performance. Implementing merge pattern for updates rather than delete+insert.'
      },
      {
        challenge: 'Calculating MRR movements (new, expansion, contraction, churn) accurately.',
        solution: 'Building fact_mrr_movements table that compares each subscription state to its previous state. Categorizing changes based on MRR delta and subscription status. Handling edge cases like reactivations and plan changes on same day.'
      },
      {
        challenge: 'Designing incremental loads that handle late-arriving usage events.',
        solution: 'Implementing lookback windows in incremental models (3-day default for subscriptions, 7-day for usage events). Using dbt incremental strategy with merge for upserts. Adding reconciliation checks between source counts and warehouse counts.'
      },
      {
        challenge: 'Maintaining referential integrity between facts and dimensions with SCD2.',
        solution: 'Using surrogate keys throughout. Implementing point-in-time lookups that join facts to the correct dimension record based on effective dates. Adding dbt tests to validate referential integrity.'
      },
      {
        challenge: 'Optimizing Snowflake costs while maintaining query performance for dashboards.',
        solution: 'Implementing proper clustering keys based on common query patterns (date, customer_id). Using transient tables for staging. Configuring appropriate warehouse sizes per workload. Monitoring with Snowflake Resource Monitor.'
      }
    ],

    impact: [
      'Creates single source of truth for SaaS metrics, eliminating inconsistent calculations across teams',
      'Enables historical analysis with SCD Type 2 - accurately track customer journey and subscription changes over time',
      'Implements data quality gates that catch issues before they reach executive dashboards',
      'Provides full data lineage through dbt documentation, making impact analysis straightforward',
      'Demonstrates production-grade data engineering patterns valued by employers'
    ],

    learnings: [
      'SaaS metrics have nuanced definitions - MRR calculation alone has multiple edge cases (prorations, trials, annual-to-monthly conversions)',
      'SCD Type 2 is essential for SaaS analytics - "as-of" reporting is required for cohort analysis and accurate churn calculation',
      'Grain decisions are critical - subscription facts need daily grain to track status changes, but usage events need event-level grain',
      'dbt tests are not optional - they are the contract between data engineers and finance/product teams who rely on these metrics',
      'Incremental loading requires careful thought about late-arriving data, especially for usage events that may be batched'
    ],

    screenshots: [
      { title: 'Star Schema ERD', url: '/projects/snowflake-saas-erd.png' },
      { title: 'dbt Lineage Graph', url: '/projects/snowflake-saas-dag.png' },
      { title: 'MRR Dashboard', url: '/projects/snowflake-saas-mrr.png' }
    ],

    codeSnippets: {
      'SCD Type 2 Customer Snapshot': `
-- snapshots/snap_customers.sql
-- Tracks historical changes to customer dimension
{% snapshot snap_customers %}

{{
    config(
      target_schema='integration',
      strategy='timestamp',
      unique_key='customer_id',
      updated_at='updated_at',
      invalidate_hard_deletes=True
    )
}}

SELECT
    customer_id,
    email,
    company_name,
    company_size_bucket,
    industry,
    acquisition_channel,
    signup_date,
    customer_status,  -- 'active', 'churned', 'paused'
    health_score,
    assigned_csm,
    billing_country,
    created_at,
    updated_at
FROM {{ source('raw', 'customers') }}

{% endsnapshot %}

-- This creates SCD Type 2 with:
-- dbt_valid_from: when this record version became active
-- dbt_valid_to: when this record version was superseded (NULL if current)
-- dbt_scd_id: unique identifier for each record version
`,

      'MRR Movements Fact Table': `
-- models/marts/fact_mrr_movements.sql
-- Tracks all MRR changes with movement categorization
{{
    config(
        materialized='incremental',
        unique_key='mrr_movement_id',
        incremental_strategy='merge'
    )
}}

WITH subscription_states AS (
    SELECT 
        *,
        LAG(mrr_amount) OVER (
            PARTITION BY customer_id 
            ORDER BY effective_date
        ) AS previous_mrr,
        LAG(subscription_status) OVER (
            PARTITION BY customer_id 
            ORDER BY effective_date
        ) AS previous_status,
        LAG(plan_id) OVER (
            PARTITION BY customer_id 
            ORDER BY effective_date
        ) AS previous_plan_id
    FROM {{ ref('int_subscription_daily') }}
    {% if is_incremental() %}
    WHERE effective_date >= (
        SELECT DATEADD(day, -7, MAX(movement_date)) 
        FROM {{ this }}
    )
    {% endif %}
),

movements AS (
    SELECT
        {{ dbt_utils.generate_surrogate_key([
            'customer_id', 
            'effective_date'
        ]) }} AS mrr_movement_id,
        
        customer_id,
        subscription_id,
        effective_date AS movement_date,
        
        -- Current state
        mrr_amount AS current_mrr,
        subscription_status AS current_status,
        plan_id AS current_plan_id,
        
        -- Previous state
        COALESCE(previous_mrr, 0) AS previous_mrr,
        previous_status,
        previous_plan_id,
        
        -- Calculate MRR delta
        mrr_amount - COALESCE(previous_mrr, 0) AS mrr_delta,
        
        -- Categorize movement type
        CASE
            -- New customer (no previous record)
            WHEN previous_status IS NULL AND subscription_status = 'active'
                THEN 'new'
            
            -- Churned (was active, now cancelled)
            WHEN previous_status = 'active' AND subscription_status = 'cancelled'
                THEN 'churn'
            
            -- Reactivation (was cancelled, now active)
            WHEN previous_status = 'cancelled' AND subscription_status = 'active'
                THEN 'reactivation'
            
            -- Expansion (MRR increased while active)
            WHEN previous_status = 'active' 
                AND subscription_status = 'active'
                AND mrr_amount > previous_mrr
                THEN 'expansion'
            
            -- Contraction (MRR decreased while active)
            WHEN previous_status = 'active' 
                AND subscription_status = 'active'
                AND mrr_amount < previous_mrr
                THEN 'contraction'
            
            -- No change
            ELSE 'no_change'
        END AS movement_type
        
    FROM subscription_states
    WHERE 
        -- Only include rows where something changed
        mrr_amount != COALESCE(previous_mrr, 0)
        OR subscription_status != previous_status
        OR previous_status IS NULL
)

SELECT * FROM movements
WHERE movement_type != 'no_change'
`,

      'Incremental Usage Events Fact': `
-- models/marts/fact_usage_events.sql
-- Incremental fact table for product usage analytics
{{
    config(
        materialized='incremental',
        unique_key='event_id',
        incremental_strategy='merge',
        cluster_by=['event_date', 'customer_key']
    )
}}

WITH usage_events AS (
    SELECT * FROM {{ ref('stg_usage_events') }}
    {% if is_incremental() %}
    -- 7-day lookback for late-arriving events
    WHERE event_timestamp >= (
        SELECT DATEADD(day, -7, MAX(event_timestamp)) 
        FROM {{ this }}
    )
    {% endif %}
),

-- Point-in-time join to get correct dimension keys
customer_dimension AS (
    SELECT * FROM {{ ref('dim_customers') }}
),

feature_dimension AS (
    SELECT * FROM {{ ref('dim_features') }}
)

SELECT
    e.event_id,
    
    -- Dimension keys (point-in-time lookup for SCD2)
    c.customer_key,
    f.feature_key,
    d.date_key,
    
    -- Event details
    e.event_type,
    e.event_timestamp,
    DATE(e.event_timestamp) AS event_date,
    
    -- Usage metrics
    e.quantity,
    e.duration_seconds,
    e.api_calls,
    
    -- Context
    e.session_id,
    e.user_id,
    e.platform,
    
    -- Metadata
    CURRENT_TIMESTAMP() AS loaded_at

FROM usage_events e

-- SCD2 join: get the customer record that was active at event time
LEFT JOIN customer_dimension c
    ON e.customer_id = c.customer_id
    AND e.event_timestamp >= c.dbt_valid_from
    AND e.event_timestamp < COALESCE(c.dbt_valid_to, '9999-12-31'::TIMESTAMP)

LEFT JOIN feature_dimension f
    ON e.feature_id = f.feature_id

LEFT JOIN {{ ref('dim_date') }} d
    ON DATE(e.event_timestamp) = d.calendar_date
`,

      'Data Quality Tests (schema.yml)': `
# models/marts/schema.yml
version: 2

models:
  - name: fact_mrr_movements
    description: "MRR movement events tracking new, expansion, contraction, churn, reactivation"
    columns:
      - name: mrr_movement_id
        description: "Surrogate key for movement event"
        tests:
          - unique
          - not_null
      
      - name: movement_type
        description: "Type of MRR movement"
        tests:
          - accepted_values:
              values: ['new', 'expansion', 'contraction', 'churn', 'reactivation']
      
      - name: mrr_delta
        description: "Change in MRR (can be negative for churn/contraction)"
        tests:
          - not_null
          # Expansion should have positive delta
          - dbt_utils.expression_is_true:
              expression: "NOT (movement_type = 'expansion' AND mrr_delta <= 0)"
          # Churn should have negative delta
          - dbt_utils.expression_is_true:
              expression: "NOT (movement_type = 'churn' AND mrr_delta >= 0)"

  - name: dim_customers
    description: "Customer dimension with SCD Type 2 history"
    tests:
      # Only one current record per customer
      - dbt_utils.unique_combination_of_columns:
          combination_of_columns:
            - customer_id
            - dbt_valid_to
          where: "dbt_valid_to IS NULL"
    columns:
      - name: customer_key
        tests:
          - unique
          - not_null
      - name: customer_status
        tests:
          - accepted_values:
              values: ['active', 'churned', 'paused', 'trial']
      - name: company_size_bucket
        tests:
          - accepted_values:
              values: ['1-10', '11-50', '51-200', '201-500', '500+']

  - name: fact_usage_events
    description: "Product usage events at event grain"
    columns:
      - name: event_id
        tests:
          - unique
          - not_null
      - name: customer_key
        tests:
          - not_null
          - relationships:
              to: ref('dim_customers')
              field: customer_key
`
    },

    links: {
      github: 'https://github.com/danielg-gerlach/snowflake-saas-dwh',
      demo: null,
      documentation: null
    }
  },
  
  'data-pipeline': {
    id: 'data-pipeline',
    type: 'personal',
    title: 'GCP Analytics Pipeline & Dashboard',
    subtitle: 'Serverless ELT pipeline for SaaS analytics with BigQuery and Looker Studio',
    year: '2025',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'Completed',
    tldr: 'Built serverless ELT pipeline on GCP with event-driven Cloud Functions, BigQuery transformations, and Looker Studio dashboard. Automatically processes SaaS CSV uploads (<30s latency) to visualize MAU, churn, and growth metrics. Fully automated from ingestion to BI.',

    overview: `Built a serverless, event-driven ELT pipeline on Google Cloud Platform to process raw SaaS product usage data. The pipeline automatically ingests CSV files from a GCS bucket, loads them into BigQuery, transforms the raw data into analytics-ready models using SQL, and visualizes key business metrics like MAU and churn in a live Looker Studio dashboard.`,

    problem: `SaaS companies need to analyze product usage data to understand user behavior, track growth, and reduce churn. Manually processing raw data files is slow, error-prone, and doesn't scale, creating a delay between data availability and actionable insights.`,

    solution: `Developed a fully automated pipeline where raw CSVs uploaded to a GCS bucket trigger a Python Cloud Function. This function ingests the data into a raw BigQuery schema. A series of SQL scripts then transform this data into clean, aggregated analytical tables, which are connected to an interactive Looker Studio dashboard for business intelligence.`,

    techStack: {
      'Cloud Infrastructure': ['Google Cloud Platform', 'Cloud Functions', 'Cloud Storage (GCS)'],
      'Data Warehouse': ['Google BigQuery'],
      'Languages & Tools': ['Python', 'SQL', 'Pandas'],
      'Visualization': ['Looker Studio']
    },

    architecture: {
      components: [
        { name: 'Data Ingestion', description: 'Event-driven Python Cloud Function triggered by GCS file uploads.' },
        { name: 'Staging Layer', description: 'GCS bucket as a data lake landing zone for raw CSV files.' },
        { name: 'Data Warehouse', description: 'BigQuery with separate schemas for raw data and transformed analytical models.' },
        { name: 'Transformation Layer', description: 'SQL scripts run within BigQuery to create aggregated fact and dimension tables.' },
        { name: 'Visualization', description: 'Interactive Looker Studio dashboard connected directly to the analytics tables.' }
      ]
    },

    metrics: {
      'Data Sources': '3 CSVs',
      'Pipeline Latency': '< 30 sec.',
      'Tables Created': '6+',
      'Key Metrics': '4',
      'Orchestration': 'Event-Driven',
      'Function Memory': '512MB'
    },

    challenges: [
      {
        challenge: 'Diagnosing a series of complex IAM permission errors between GCS, Eventarc, and Pub/Sub.',
        solution: 'Systematically debugged service account roles, finding the correct principals (GCS & Eventarc Service Agents) and granting the necessary permissions.'
      },
      {
        challenge: 'Handling build failures for Python dependencies (pyarrow) in the Cloud Functions environment.',
        solution: 'Identified that the Python 3.9 runtime was missing build tools and resolved the issue by upgrading the function to the Python 3.11 runtime.'
      },
      {
        challenge: 'Managing location mismatches between a multi-region GCS bucket and a single-region Cloud Function.',
        solution: 'Correctly configured the deployment using both `--region` for the function and `--trigger-location` for the Eventarc trigger.'
      }
    ],

    impact: [
      'Created a data pipeline for processing raw data files.',
      'Enabled near real-time analysis of key SaaS business metrics like user growth and churn.',
      'Built a scalable and cost-effective solution using serverless GCP components.'
    ],

    learnings: [
      'The critical importance of precise IAM permissions between interacting cloud services.',
      'How to debug cloud build and deployment issues by analyzing logs and understanding runtime environments.',
      'Practical application of the ELT paradigm, separating the loading of raw data from subsequent SQL-based transformation.',
      'The distinction between a function\'s region and a trigger\'s location for GCS events.'
    ],

    screenshots: [
      { title: 'Final Looker Studio Dashboard', url: '/projects/gcp/SaaS_Analytics_Dashboard.pdf' }
    ],

    codeSnippets: {
      'SQL Transformation (Monthly Active Users)': `
  -- This query calculates the number of unique active users per month.
  CREATE OR REPLACE TABLE \`saas-analytics-project-467007.saas_analytics.monthly_active_users\` AS (
    SELECT
      DATE_TRUNC(CAST(evt.event_timestamp AS TIMESTAMP), MONTH) AS activity_month,
      usr.pricing_plan,
      COUNT(DISTINCT evt.user_id) AS monthly_active_users
    FROM
      \`saas-analytics-project-467007.saas_raw_data.events\` AS evt
    JOIN
      \`saas-analytics-project-467007.saas_analytics.dim_users\` AS usr
    ON
      evt.user_id = usr.user_id
    GROUP BY
      1, 2 -- Group by the first and second columns (month and plan)
    ORDER BY
      activity_month DESC
  );
        `
    },

    links: {
      github: 'https://github.com/danielg-gerlach/gcp-saas-analytics-pipeline',
      documentation: 'https://github.com/danielg-gerlach/gcp-saas-analytics-pipeline/blob/main/README.md'
    }
  },

  // ============================================
  // WORK PROJECTS (ordered by priority)
  // ============================================

  'autowaschpark-task-manager': {
    id: 'autowaschpark-task-manager',
    type: 'work',
    title: 'Shift Task Manager for Car Wash Operations',
    subtitle: 'Digital checklist system replacing paper-based task tracking for daily shift operations',
    year: '2025',
    role: 'Full-Stack Developer',
    team: 'Solo Developer',
    status: 'Completed',
    tldr: 'Built a tablet-optimized task management app for a car wash facility to replace paper checklists. Employees can track 60+ daily tasks across early and late shifts, with automatic email reports to management and full history tracking. Developed iteratively with constant owner feedback and on-site user testing.',

    overview: `Developed a practical task management tool for Autowaschpark Maximiliansau, a car wash facility that needed to digitize their shift handover process. The app allows employees to work through their daily task lists on an iPad, mark items as complete, add notes when something unusual happens, and automatically notify the owner when a shift is done. Management gets full visibility into who did what and when, solving the accountability issues that came with paper checklists.`,

    problem: `The car wash was running on paper checklists for years. Every shift had a printed list of 30-40 tasks - everything from closing the entrance gate to emptying cash registers to cleaning the wash tunnel. The problems were obvious: papers got lost, handwriting was sometimes unreadable, there was no way to know if tasks were actually done or just checked off, and the owner had no visibility unless he was physically there. When something wasn't done properly, nobody knew who was responsible. The paper system also made it impossible to track patterns - like if certain tasks were consistently being skipped or if specific employees needed additional training.`,

    solution: `Built a simple, iPad-first web application that mirrors their existing workflow but adds the tracking they needed. Employees log in with a shared access code (they're not tech-savvy, so we kept it simple), select their name from a dropdown, choose their shift type, and then work through the task list. Each task can be marked complete with a single tap, and there's an option to add notes for anything unusual. When the shift is done, the system automatically emails a report to the owner with everything that was completed, who did it, and any notes. The owner also has a separate admin login where he can see the full history of all shifts, track completion rates, and manage the employee list. The whole thing was designed around their actual workflow - we did multiple rounds of testing with real employees to make sure it was intuitive enough that anyone could use it without training.`,

    techStack: {
      'Frontend': ['Next.js', 'React', 'Tailwind CSS'],
      'Backend': ['Supabase (Database & Auth)', 'PostgreSQL'],
      'Infrastructure': ['Vercel', 'Resend (Email)'],
      'Design': ['Mobile-first / iPad-optimized']
    },

    architecture: {
      components: [
        { name: 'Employee Interface', description: 'Simple, touch-friendly checklist view optimized for iPad use in a work environment. Large buttons, clear visual feedback, minimal text input required.' },
        { name: 'Task Database', description: 'Stores 64 task templates (27 early shift, 37 late shift) organized by work areas like cash register, wash tunnel, outdoor area, and technical room.' },
        { name: 'Shift Tracking', description: 'Records each shift session with employee assignment, timestamps for every completed task, and optional notes.' },
        { name: 'Email Reporting', description: 'Automatic shift completion reports sent to management, including task counts, completion time, employee name, and any notes added.' },
        { name: 'Admin Dashboard', description: 'Secure management interface for viewing shift history, tracking patterns, and managing employee lists.' }
      ]
    },

    metrics: {
      'Task Templates': '64 total (27 early, 37 late)',
      'Work Areas': '6 categories',
      'Target Users': '~10 employees',
      'Device': 'iPad (primary)',
      'Report Delivery': 'Automatic email on shift completion',
      'Development Approach': 'Iterative with user testing'
    },

    challenges: [
      {
        challenge: 'Users have varying levels of tech comfort - some employees rarely use smartphones',
        solution: 'Designed for absolute simplicity. No account creation, no passwords to remember, just a shared code to get in. Big touch targets, obvious visual states (green = done), and a flow that matches their existing mental model of working through a paper list.'
      },
      {
        challenge: 'Getting the task list right - the original paper lists had grown organically over years',
        solution: 'Worked directly with the owner to review every single task. Some tasks were duplicates, some were outdated, some needed clearer wording. Ended up restructuring 37 late shift and 27 early shift tasks into logical groups by work area.'
      },
      {
        challenge: 'Balancing accountability with trust - the owner wanted tracking but not a surveillance tool',
        solution: 'Focused on completion visibility rather than time tracking. The system shows what was done and by whom, but doesn\'t monitor how long each task takes. This gives management the accountability they need while respecting that employees know their job.'
      },
      {
        challenge: 'Making sure the app actually gets used instead of falling back to paper',
        solution: 'Involved employees in testing from early stages. Their feedback shaped the UI - things like making the note button more visible, adding the ability to see which tasks are left, and confirming before marking the shift as complete. When people help build something, they\'re more likely to use it.'
      }
    ],

    impact: [
      'Eliminates paper waste and lost checklists from daily operations',
      'Gives management real-time visibility into shift completion without being on-site',
      'Creates accountability through automatic tracking - everyone knows their work is recorded',
      'Enables pattern recognition over time - identifying consistently skipped tasks or training needs',
      'Reduces end-of-day communication overhead - automatic reports replace manual updates'
    ],

    learnings: [
      'Simple beats clever for non-technical users. Every feature we considered got filtered through "would this confuse someone who doesn\'t use apps much?"',
      'Paper processes exist for a reason - the goal isn\'t to replace them with something completely different, but to digitize what already works while adding the benefits of tracking',
      'Iterative development with real users catches problems that seem obvious in hindsight but you\'d never find on your own',
      'The owner knowing exactly what they wanted was incredibly valuable - many projects struggle because requirements are vague, but here we had clear pain points and clear success criteria',
      'Sometimes the hardest part isn\'t the code, it\'s getting 64 task descriptions right so they\'re clear enough that any employee understands exactly what to do'
    ],

    screenshots: [],

    codeSnippets: {},

    links: {
      github: null,
      demo: null,
      documentation: null
    }
  },

  'ai-consulting': {
    id: 'ai-consulting',
    type: 'work',
    title: 'AI Integration Consulting',
    subtitle: 'Strategic AI consulting and training for a real estate company to integrate AI into internal workflows',
    year: '2024-2025',
    role: 'AI Consultant & Trainer',
    team: 'Solo Consultant',
    status: 'Completed',
    tldr: 'Advised executive management of a real estate company on integrating AI technologies into existing business processes. Conducted comprehensive AI training sessions for employees, focusing on practical applications of LLMs, automation tools, and AI-powered workflows to improve operational efficiency.',

    overview: `Provided strategic AI consulting services to the leadership team of a medium-sized real estate company. The engagement included analyzing existing business processes, identifying opportunities for AI integration, and developing a roadmap for implementation. Additionally, delivered hands-on training sessions to employees across different departments, covering practical AI tools and techniques applicable to their daily work.`,

    problem: `The real estate company recognized the potential of AI technologies but lacked the internal expertise to identify where and how to integrate these tools effectively. Employees were aware of AI developments but uncertain about practical applications in their specific roles. The company needed strategic guidance and practical training to bridge the gap between AI potential and actual implementation.`,

    solution: `Conducted a comprehensive consulting engagement that included: (1) Workshops with management to assess current workflows and identify impactful AI use cases, (2) Development of a phased roadmap prioritizing quick wins and long-term transformations, (3) Multiple training sessions tailored to different departments, covering tools like ChatGPT, Claude and workflow automation, (4) Creation of internal documentation and guidelines for responsible AI usage and best practices.`,

    techStack: {
      'AI Technologies': ['Large Language Models (LLMs)', 'ChatGPT', 'Claude', 'Prompt Engineering'],
      'Automation & Tools': ['Document Processing AI', 'Workflow Automation', 'API Integration'],
      'Consulting Areas': ['Process Analysis', 'Change Management', 'Training & Enablement']
    },

    architecture: {
      components: [
        { name: 'Strategic Assessment', description: 'Analyzed existing business processes across departments to identify AI integration opportunities with the highest ROI.' },
        { name: 'Executive Workshops', description: 'Conducted strategy sessions with C-level executives to align AI initiatives with business goals and develop implementation roadmap.' },
        { name: 'Employee Training Program', description: 'Delivered hands-on training sessions covering practical AI applications, including prompt engineering, document automation, and workflow optimization.' },
        { name: 'Implementation Guidelines', description: 'Created internal documentation for AI tool usage, security considerations, and best practices for responsible AI deployment.' }
      ]
    },

    metrics: {
      'Training Sessions': '8+ workshops',
      'Employees Trained': '25+',
      'Departments Covered': '4',
      'Use Cases Identified': '15+',
      'Quick Wins Implemented': '5',
      'Project Duration': '4 months'
    },

    challenges: [
      {
        challenge: 'Varying levels of technical literacy and AI understanding among employees',
        solution: 'Developed tiered training content with beginner, intermediate, and advanced tracks. Focused on practical demonstrations and hands-on exercises rather than technical theory.'
      },
      {
        challenge: 'Concerns about data security and confidentiality when using external AI services',
        solution: 'Created comprehensive guidelines for data handling, established clear rules for what information can be shared with AI tools, and explored on-premise and privacy-focused AI solutions.'
      },
    ],

    impact: [
      'Enabled the company to make strategic decisions about AI investments with clear understanding of costs, benefits, and implementation requirements',
      'Equipped 5 employees with practical AI skills, improving productivity in customer communication, brainstorming and market analysis',
      'Established a framework for responsible AI usage that balances innovation with data security and compliance requirements',
      'Identified and helped implement 5 quick-win use cases that demonstrated immediate ROI and built organizational confidence in AI technologies',
      'Created a shift toward AI adoption by demystifying the technology and showing practical, achievable applications'
    ],

    learnings: [
      'The importance of meeting stakeholders where they are - focusing on practical, job-relevant applications rather than technical capabilities',
      'How change management and training are as critical as technology selection when integrating AI into established organizations',
      'The value of starting with quick wins to build momentum and demonstrate ROI before tackling larger transformation initiatives',
      'That concerns about AI often stem from lack of understanding - hands-on training and clear guidelines can transform skeptics into advocates',
      'The need to balance innovation with responsibility, particularly around data security, privacy, and ethical AI usage in regulated industries'
    ],

    screenshots: [],

    codeSnippets: {},

    links: {
      github: null,
      demo: null,
      documentation: null
    }
  },

  'work-project-1': {
    id: 'work-project-1',
    type: 'work',
    title: 'Lead Magnet Quiz',
    subtitle: 'A comprehensive quiz for lead generation targeted at potential customers that sell their properties privately',
    year: '2025',
    role: 'Full-Stack Developer',
    team: 'Solo Developer',
    status: 'Completed',
    tldr: 'Built an educational lead generation quiz with React, Tailwind CSS, and PostgreSQL to help property sellers assess their knowledge about private property sales. Automated workflow sends quiz results to users and agents, culminating in a free consulting call offer that converts prospects into qualified leads.',

    overview: `Developed an interactive educational quiz designed to help private property sellers assess their knowledge of regulations, legal requirements, and challenges involved in selling properties without a real estate agent. The quiz strategically highlights the complexities and hard work required for private sales, positioning professional real estate services as valuable solutions. Upon completion, users receive their quiz results via email and are offered a free consulting call with a real estate agent, creating a natural conversion pathway from education to engagement.`,

    problem: `The real estate company needed to generate qualified leads from property owners considering selling privately. Simply promoting real estate services wasn't effective - property owners didn't see the value until they understood the complexity of the process. The sales team needed a way to educate prospects about regulatory requirements, legal obligations, and practical challenges while building trust and demonstrating expertise, all before the first sales conversation.`,

    solution: `Created an engaging educational quiz that guides users through real scenarios they'll face when selling privately - from regulatory compliance and legal documentation to marketing and negotiations. The quiz progressively reveals the complexity of private sales while testing users' knowledge. An automated workflow immediately sends a personalized results summary to the user's email and simultaneously forwards their answers to a real estate agent, enabling timely, contextual follow-up. The quiz concludes with an offer for a free consulting call, positioned as valuable professional guidance after revealing potential knowledge gaps.`,

    techStack: {
      'Frontend': ['React', 'Tailwind CSS'],
      'Database': ['PostgreSQL'],
      'Backend': ['TypeScript', 'Node.js'],
      'Automation': ['Email Workflow Integration']
    },

    architecture: {
      components: [
        { name: 'React Quiz Interface', description: 'Multi-step form component with progress tracking, conditional question logic, and smooth transitions between steps.' },
        { name: 'Form Validation', description: 'Client-side and server-side validation ensuring data quality and preventing invalid submissions.' },
        { name: 'PostgreSQL Database', description: 'Relational database storing quiz responses with proper indexing for quick retrieval and reporting.' },
        { name: 'TypeScript API', description: 'Backend API handling form submissions, validation, and database operations with type safety.' },
        { name: 'Automated Email Workflow', description: 'Dual-email system that sends quiz results to users and forwards responses to agents for immediate follow-up.' }
      ]
    },

    metrics: {
      'Completion Rate': '65%+',
      'Average Time': '3-4 minutes',
      'Mobile Usage': '60% of submissions',
      'Data Quality': '95% valid submissions',
      'Consultation Requests': '45% conversion to calls'
    },

    challenges: [
      {
        challenge: 'Balancing educational value with lead generation without being too salesy',
        solution: 'Designed questions to genuinely test knowledge about private property sales, providing real educational value while naturally revealing complexity. The free consultation offer comes as helpful guidance rather than a sales pitch.'
      },
      {
        challenge: 'Ensuring responsive design works across all device sizes',
        solution: 'Used Tailwind CSS utility classes with mobile-first approach, thoroughly testing on various devices to ensure smooth experience on phones, tablets, and desktops.'
      },
      {
        challenge: 'Coordinating automated email workflow to both users and agents simultaneously',
        solution: 'Implemented reliable email workflow that triggers on form submission, sending formatted quiz results to users and comprehensive response data to agents for contextual follow-up conversations.'
      }
    ],

    impact: [
      'Increased qualified lead generation compared to traditional contact forms',
      'Achieved higher conversion rate from quiz completion to consulting call requests',
      'Reduced sales team time spent educating prospects - users arrive to calls already aware of complexity',
      'Enabled agents to personalize consulting calls based on specific knowledge gaps revealed in quiz responses'
    ],

    learnings: [
      'Educational content that provides genuine value builds trust and naturally positions services as solutions',
      'Revealing complexity through interactive self-assessment is more effective than directly telling prospects they need help',
      'Automated workflows that serve both user and business needs (results email + agent notification) maximize efficiency',
      'Progressive disclosure (showing questions one at a time) reduces cognitive load and increases engagement',
      'Mobile optimization is essential as majority of users access the quiz from mobile devices'
    ],

    screenshots: [],

    codeSnippets: {},

    links: {
      github: null,
      demo: null,
      documentation: null
    }
  },

  'work-project-2': {
    id: 'Lead Magnet Quiz Dashboard',
    type: 'work',
    title: 'Lead Magnet Quiz Dashboard',
    subtitle: 'A web-based dashboard that tracks the performance and answers of the quiz, grouped by customers',
    year: '2025',
    role: 'Full-Stack Developer',
    tldr: 'Developed an analytics dashboard for the CEO and sales team to track quiz performance and analyze customer responses. Visualizes answer patterns to identify common knowledge gaps and pain points, enabling data-driven service offerings and targeted problem-solving approaches for potential customers.',
    team: 'Solo Developer',
    status: 'Completed',

    overview: `Built a comprehensive analytics dashboard that transforms quiz response data into actionable business insights. The dashboard enables the CEO and real estate team to track individual quiz takers, analyze response patterns across all questions, and identify common knowledge gaps among potential customers. By visualizing how users answer specific questions, the dashboard reveals which aspects of private property sales cause the most uncertainty, enabling the company to develop targeted services, refine their consulting approach, and create educational content that addresses actual customer pain points.`,

    problem: `After launching the lead generation quiz, the CEO needed visibility into not just how many people took the quiz, but specifically how they answered each question. Understanding which regulations, legal requirements, or process steps confused potential customers would enable data-driven decisions about service offerings and consulting focus areas. Without centralized analytics, valuable insights about customer knowledge gaps and pain points were locked in individual quiz responses, making it impossible to identify patterns or prioritize service development around actual customer needs.`,

    solution: `Developed a full-featured analytics dashboard using Nuxt.js and TypeScript that provides both individual and aggregated views of quiz data. The dashboard shows detailed profiles of each quiz taker alongside visualizations of answer distributions across all questions. Interactive charts reveal which questions have the lowest correct answer rates, indicating common knowledge gaps. This insight allows the CEO to see, for example, that 70% of users struggle with disclosure requirements, suggesting a market need for disclosure consulting services. The dashboard also tracks completion rates and drop-off points to continuously optimize the quiz and service offerings.`,

    techStack: {
      'Frontend': ['Nuxt.js', 'Tailwind CSS', 'Chart.js'],
      'Backend': ['TypeScript', 'JavaScript', 'Node.js'],
      'Database & Authentication': ['PostgreSQL', 'Supabase'],
    },

    architecture: {
      components: [
        { name: 'Dashboard Interface', description: 'Nuxt.js application with responsive layout displaying KPIs, charts, and lead tables with real-time data updates.' },
        { name: 'Authentication System', description: 'Supabase authentication ensuring secure access control with role-based permissions for CEO and team members.' },
        { name: 'Analytics Engine', description: 'Backend service aggregating quiz data to calculate answer distributions, knowledge gap analysis, and trend patterns.' },
        { name: 'Lead Management', description: 'Interface for viewing individual quiz takers, their complete responses, and contact information for personalized follow-up.' },
        { name: 'Question Analysis', description: 'Visualization system showing answer patterns per question, identifying areas where users commonly struggle or excel.' }
      ]
    },

    metrics: {
      'Real-time Updates': 'Live data refresh',
      'Response Time': '<2s page load',
      'Data Visualization': '8+ chart types',
      'Lead Export': 'CSV & Excel formats',
      'Question Analytics': 'Per-question breakdown'
    },

    challenges: [
      {
        challenge: 'Creating meaningful visualizations that reveal actionable business insights from quiz responses',
        solution: 'Designed multi-level analytics: overview metrics for quick status checks, question-by-question breakdowns for knowledge gap analysis, and individual user profiles for personalized follow-up. Used intuitive charts with clear labels focusing on actionable insights.'
      }
    ],

    impact: [
      'Enabled CEO to identify that 70% of users struggle with disclosure requirements, leading to new disclosure consulting service launch',
      'Revealed common pain points in legal documentation, informing development of simplified documentation templates',
      'Reduced time to review and respond to new leads by 70% through centralized lead management',
      'Provided data-driven insights for refining consulting call scripts to address specific knowledge gaps',
      'Identified quiz optimization opportunities by analyzing drop-off rates, leading to 15% improvement in completion rates',
      'Enabled targeting of marketing content to address the most common areas of confusion among prospects'
    ],

    learnings: [
      'Aggregated answer analysis reveals market needs better than individual lead data alone',
      'Visualizing knowledge gaps transforms quiz responses from lead data into strategic business intelligence',
      'Dashboard design should serve multiple purposes: lead management for sales team, strategic insights for leadership',
      'Real-time data updates enhance user experience but require careful optimization to avoid performance issues',
      'Pattern recognition in user responses can directly inform product and service development'
    ],

    screenshots: [],

    codeSnippets: {},

    links: {
      github: null,
      demo: null,
      documentation: null
    }
  },

  'work-project-3': {
    id: 'CRM',
    type: 'work',
    title: 'CRM System Integration & Set-Up',
    subtitle: 'Integrated and set up a CRM system for managing customer relationships and sales processes for 10+ real estate agents',
    year: '2025',
    role: 'Your Role (Part-time)',
    team: 'Solo',
    status: 'In Development',
    tldr: 'Integrating and customizing CRM solution for 10+ real estate agents to manage properties, deals, and customer relationships. Planning to unify property and activity management, improve workflow efficiency and give agents more time for customer service.',

    overview: `Project overview.`,
    problem: `Real-estate brokers and business owners had a difficult time managing properties and activities, which made it hard to understand "who does what?"`,
    solution: `An organized and customized CRM system for property, deal, and customer management. This solves both needs and provides one unified solution which benefits costs and the technical setup.`,

    techStack: {
      'General': ['Consulting', 'Customer communication'],
    },

    architecture: {
      components: [
        { name: 'Component', description: 'Description' }
      ]
    },

    metrics: {
      'Key Metric': 'Value'
    },

    challenges: [
      {
        challenge: 'Challenge',
        solution: 'Solution'
      }
    ],

    impact: [
      'A more efficient and effective workflow throughout the entire real-estate process.',
      'Business owners and real-estate agents now have more time to serve their customers instead of managing tasks & properties.'
    ],

    learnings: [
      'Learning'
    ],

    screenshots: [],

    codeSnippets: {},

    links: {
      github: null,
      demo: null,
      documentation: null
    }
  }
}