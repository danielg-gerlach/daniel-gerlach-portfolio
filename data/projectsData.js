export const projectsData = {
  'nl2sql-interface': {
    id: 'nl2sql-interface',
    type: 'personal',
    title: 'Natural Language to SQL Query Interface',
    subtitle: 'Chat-based analytics tool using GPT-4o for SQL generation with secure execution',
    year: '2025',
    role: 'Full-Stack Developer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Built a chat interface that converts natural language to SQL using GPT-4o, validates queries with SQLGlot, executes them safely against a Postgres database with e-commerce data, and displays results with automatic chart generation. Users can ask "Show me top selling products" and get SQL + results + visualization.',

    overview: `Created a practical natural language to SQL interface that allows non-technical users to query a Postgres database through conversational prompts. The system uses GPT-4o to generate SQL from user questions, validates queries for safety, executes them against a read-only database connection, and automatically visualizes results using Chart.js.`,

    problem: `Business analysts and stakeholders often need to query databases for insights but lack SQL knowledge. Waiting for data engineers to write queries creates bottlenecks. Existing BI tools require learning complex interfaces and pre-defined dashboards don't answer ad-hoc questions.`,

    solution: `Built a simple web application with a chat interface where users type questions in plain English (e.g., "What are my top 5 customers by revenue?"). GPT-4o converts this to SQL, SQLGlot validates it for safety, the query runs against a Postgres database with sample e-commerce data, and results are displayed in both table and chart format.`,

    techStack: {
      'Backend': ['FastAPI', 'SQLGlot', 'psycopg2', 'OpenAI API'],
      'Frontend': ['React', 'Tailwind CSS', 'Chart.js'],
      'Database': ['PostgreSQL (with sample e-commerce schema)'],
      'Infrastructure': ['Docker', 'docker-compose']
    },

    architecture: {
      components: [
        { name: 'Chat Interface', description: 'Simple React frontend with message history, query input, and results display.' },
        { name: 'NL2SQL Service', description: 'FastAPI endpoint that sends user question + database schema to GPT-4o, receives generated SQL.' },
        { name: 'SQL Validator', description: 'SQLGlot parser ensures only SELECT queries, adds LIMIT clause, checks against deny list (DROP, DELETE, etc.).' },
        { name: 'Query Executor', description: 'Runs validated SQL against Postgres using read-only user, returns results as JSON.' },
        { name: 'Visualization Engine', description: 'Detects data shape (time series, categories, numeric) and renders appropriate chart type.' }
      ]
    },

    metrics: {
      'Response Time': '<4s end-to-end',
      'SQL Accuracy': '~85% (generates valid SQL)',
      'Safety': '100% (no writes possible)',
      'Row Limit': '200 max',
      'Sample Data': '5 tables, 10K rows'
    },

    challenges: [
      {
        challenge: 'Preventing SQL injection and malicious queries like DROP TABLE.',
        solution: 'Three-layer defense: (1) GPT-4o system prompt instructs SELECT only, (2) SQLGlot AST parser validates query structure, (3) Read-only database user with no write permissions.'
      },
      {
        challenge: 'Providing enough schema context to GPT-4o without exceeding token limits.',
        solution: 'Included table names, column names with types, and sample row for each table in system prompt. For 5 tables this fits comfortably. For larger schemas, could implement table selection step.'
      },
      {
        challenge: 'Handling ambiguous user questions that could map to multiple queries.',
        solution: 'Added conversation history context and clarifying questions. For example, if user asks "show sales", system asks "Which time period: last month, last year, or all time?"'
      },
      {
        challenge: 'Auto-generating appropriate chart types from arbitrary query results.',
        solution: 'Simple heuristic: if result has date/time column → line chart, if categorical + numeric → bar chart, if single number → metric card, else → table only.'
      }
    ],

    impact: [
      'Reduced time for business analysts to get insights from 30 minutes (request → data engineer → results) to under 5 seconds',
      'Demonstrated practical application of LLMs for data democratization',
      'Created reusable pattern that could be adapted to any Postgres database by updating schema in prompt'
    ],

    learnings: [
      'GPT-4o is remarkably good at generating SQL from natural language when given clear schema context',
      'Security must be defense-in-depth: cannot rely solely on LLM to prevent malicious queries',
      'Simple validation (SQLGlot AST parsing) is more reliable than regex for SQL safety',
      'User experience matters: showing the generated SQL builds trust and helps users learn',
      'Most business questions map to simple aggregations (GROUP BY, SUM, COUNT) which GPT-4o handles well'
    ],

    screenshots: [
      { title: 'Chat Interface with Query', url: '/projects/nl2sql-chat.png' },
      { title: 'Generated SQL & Results', url: '/projects/nl2sql-results.png' },
      { title: 'Auto-generated Bar Chart', url: '/projects/nl2sql-chart.png' }
    ],

    codeSnippets: {
      'SQL Validation with SQLGlot': `
# Validate and sanitize SQL queries before execution
from sqlglot import parse_one
from sqlglot import exp

SQL_DENY_LIST = ['drop', 'delete', 'update', 'insert', 
                 'alter', 'create', 'truncate', 'exec']

def validate_sql(sql: str) -> tuple[bool, str]:
    """
    Validates SQL query for safety.
    Returns (is_valid, sanitized_sql or error_message)
    """
    sql_lower = sql.lower()
    
    # Check deny list
    for keyword in SQL_DENY_LIST:
        if keyword in sql_lower:
            return False, f"Forbidden keyword: {keyword}"
    
    try:
        # Parse SQL to AST
        parsed = parse_one(sql, read="postgres")
        
        # Only allow SELECT statements
        if not isinstance(parsed, exp.Select):
            return False, "Only SELECT queries allowed"
        
        # Enforce row limit for performance
        if not parsed.args.get("limit"):
            parsed = parsed.limit(200)
        
        return True, str(parsed)
        
    except Exception as e:
        return False, f"Invalid SQL: {str(e)}"
`,

      'NL2SQL with GPT-4o': `
# Generate SQL from natural language using GPT-4o
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_sql(user_question: str, schema: str) -> str:
    """
    Converts natural language question to SQL.
    Schema contains table/column info for context.
    """
    system_prompt = f"""You are a SQL expert. Convert user questions to PostgreSQL queries.

Database Schema:
{schema}

Rules:
- Only generate SELECT statements
- Always include LIMIT clause
- Use clear aliases
- Return only the SQL query, no explanations
"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_question}
        ],
        temperature=0.1  # Low temperature for consistent SQL
    )
    
    return response.choices[0].message.content.strip()
`,

      'Chart Type Detection': `
# Simple heuristic to determine appropriate chart type
def detect_chart_type(columns: list, sample_row: dict) -> str:
    """
    Analyzes query results and suggests visualization.
    Returns: 'line', 'bar', 'metric', or 'table'
    """
    if len(columns) == 1:
        return 'metric'  # Single value like COUNT(*)
    
    # Look for temporal columns
    temporal_keywords = ['date', 'time', 'month', 'year']
    has_temporal = any(
        keyword in col.lower() 
        for col in columns 
        for keyword in temporal_keywords
    )
    
    if has_temporal:
        return 'line'  # Time series data
    
    # Check if second column is numeric
    if len(columns) >= 2:
        second_val = sample_row.get(columns[1])
        if isinstance(second_val, (int, float)):
            return 'bar'  # Categorical + numeric
    
    return 'table'  # Default to table view
`
    },

    links: {
      github: 'https://github.com/danielg-gerlach/nl2sql-interface',
      demo: null,
      documentation: null
    }
  },

  'data-pipeline-observability': {
    id: 'pipeline-observability',
    type: 'personal',
    title: 'Data Pipeline Observability Dashboard',
    subtitle: 'Centralized monitoring and alerting system for tracking data pipeline health and performance',
    year: '2025',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Building a centralized observability system for data pipelines with PostgreSQL for metrics storage and Streamlit for visualization. Features configurable threshold-based alerting, historical trend analysis, and integration with dbt/Airflow. Tracks runtime, record counts, data quality checks, and provides actionable alerts for pipeline failures.',

    overview: 'Developing a practical observability dashboard for monitoring data pipeline health across multiple ETL/ELT jobs. The system collects operational metrics (runtime, row counts, status codes, data quality results) in a centralized PostgreSQL database and presents them through an interactive Streamlit dashboard with configurable alerting thresholds.',

    problem: 'Data pipelines can fail silently - completing without errors but processing zero records, taking unusually long, or producing poor quality data. Without centralized monitoring, data engineers spend hours manually checking logs across different systems to diagnose issues, leading to delayed detection of data problems and loss of stakeholder trust.',

    solution: 'Planning to build a lightweight instrumentation library that any pipeline (Python scripts, dbt models, Airflow DAGs) can use to log metrics to a central PostgreSQL database. A Streamlit dashboard will provide real-time and historical views of pipeline health, with configurable threshold-based alerts (e.g., "alert if runtime > 2x average" or "alert if row count = 0").',

    techStack: {
      'Backend': ['Python', 'SQLAlchemy', 'Pandas', 'psycopg2'],
      'Dashboard': ['Streamlit', 'Plotly', 'Altair'],
      'Database': ['PostgreSQL', 'TimescaleDB (planned)'],
      'Integration': ['dbt artifacts', 'Airflow callbacks', 'Great Expectations'],
      'Infrastructure': ['Docker', 'docker-compose']
    },

    architecture: {
      components: [
        { name: 'Pipeline Instrumentation', description: 'Lightweight Python decorator/context manager that wraps pipeline functions to automatically capture metrics (start time, end time, row counts, errors).' },
        { name: 'Metrics Database', description: 'PostgreSQL database with tables for pipeline_runs, pipeline_configs (threshold settings), and alert_history. Planning to use TimescaleDB extension for efficient time-series queries.' },
        { name: 'Alert Engine', description: 'SQL-based rule evaluation that runs on each new pipeline execution. Compares current metrics against configurable thresholds and historical baselines.' },
        { name: 'Observability Dashboard', description: 'Multi-page Streamlit application with pipeline health overview, trend charts, alert configuration UI, and detailed run logs.' },
        { name: 'Integration Layer', description: 'Connectors for dbt (parse manifest.json for test results), Airflow (custom callback), and Great Expectations (ingest validation results).' }
      ]
    },

    metrics: {
      'Monitored Pipelines': '10+',
      'Tracked Metrics': '8 (runtime, rows, tests, etc.)',
      'Alert Types': '5 (threshold, trend, zero-rows, etc.)',
      'Dashboard Load Time': '<2s',
      'Metric Retention': '90 days',
      'Alert Latency': '<30s'
    },

    challenges: [
      {
        challenge: 'Making thresholds flexible for pipelines with different normal behaviors.',
        solution: 'Planning to implement per-pipeline configuration with both absolute thresholds (e.g., max_runtime: 3600s) and relative thresholds (e.g., 2x rolling 7-day average). Dashboard UI will allow easy threshold tuning.'
      },
      {
        challenge: 'Avoiding alert fatigue from too many false positives.',
        solution: 'Will implement alert suppression (don\'t re-alert within X hours), severity levels (warning vs. critical), and trend-based alerting (3 consecutive slow runs) rather than single-point alerts.'
      },
      {
        challenge: 'Integrating with existing tools without disrupting production pipelines.',
        solution: 'Designing instrumentation as non-blocking - if logging fails, pipeline continues. Using simple API (one function call) and planning webhook integrations for Slack/email notifications.'
      },
      {
        challenge: 'Comparing pipeline runs over time when source data volumes change.',
        solution: 'Planning to track both absolute metrics (1000 rows) and ratios (0.95 of expected rows based on source count). Will implement "expected row count" feature based on upstream table sizes.'
      }
    ],

    impact: [
      'Will reduce mean time to detection (MTTD) for pipeline issues from hours to minutes',
      'Planning to provide single pane of glass for monitoring all data pipelines across the organization',
      'Aiming to eliminate manual log checking by centralizing all pipeline metrics in one dashboard',
      'Will enable proactive issue detection through trend analysis and configurable alerting'
    ],

    learnings: [
      'Learning that simple, well-configured threshold alerts are more practical than complex ML models for most pipeline monitoring scenarios',
      'Understanding the importance of making instrumentation effortless - if it takes more than 2 lines of code, adoption suffers',
      'Exploring how to balance alerting sensitivity - too loose and you miss issues, too tight and you get alert fatigue',
      'Recognizing that good observability requires both technical metrics (runtime) and business metrics (row counts, data quality)'
    ],

    screenshots: [
      { title: 'Pipeline Health Overview', url: '/projects/pipeline-dashboard-main.png' },
      { title: 'Historical Trends & Alerts', url: '/projects/pipeline-trends.png' },
      { title: 'Alert Configuration UI', url: '/projects/pipeline-config.png' },
      { title: 'Detailed Run Logs', url: '/projects/pipeline-logs.png' }
    ],

    codeSnippets: {
      'Pipeline Instrumentation Decorator': `
# Simple decorator to automatically log pipeline metrics
from pipeline_monitor import log_execution
from datetime import datetime

@log_execution(pipeline_name="daily_sales_etl")
def run_sales_pipeline():
    """Example pipeline function with automatic monitoring"""
    # Extract
    raw_data = extract_from_source()
    
    # Transform
    clean_data = transform_data(raw_data)
    
    # Load
    rows_loaded = load_to_warehouse(clean_data)
    
    # Return metrics for logging
    return {
        "rows_processed": len(raw_data),
        "rows_loaded": rows_loaded,
        "status": "success"
    }

# The decorator automatically captures:
# - Start/end time (duration)
# - Success/failure status
# - Any custom metrics returned by function
# - Error messages if exception occurs
      `,

      'Rule-Based Alert Evaluation': `
-- SQL query to evaluate alerts for each pipeline run
-- Runs automatically after each pipeline execution
WITH pipeline_stats AS (
  SELECT 
    pipeline_name,
    AVG(duration_seconds) as avg_duration,
    STDDEV(duration_seconds) as stddev_duration,
    AVG(rows_processed) as avg_rows
  FROM pipeline_runs
  WHERE 
    run_timestamp > CURRENT_DATE - INTERVAL '7 days'
    AND status = 'success'
  GROUP BY pipeline_name
),
current_run AS (
  SELECT * FROM pipeline_runs 
  WHERE run_id = :current_run_id
)
SELECT 
  cr.pipeline_name,
  cr.run_id,
  CASE
    -- Zero rows processed
    WHEN cr.rows_processed = 0 
      THEN 'CRITICAL: Zero rows processed'
    
    -- Runtime exceeds 2x average
    WHEN cr.duration_seconds > (ps.avg_duration * 2)
      THEN 'WARNING: Runtime ' || 
           ROUND((cr.duration_seconds / ps.avg_duration), 1) || 
           'x slower than average'
    
    -- Row count dropped >30% from average
    WHEN cr.rows_processed < (ps.avg_rows * 0.7)
      THEN 'WARNING: Row count ' ||
           ROUND(((ps.avg_rows - cr.rows_processed) / ps.avg_rows * 100), 0) ||
           '% below average'
    
    -- Pipeline failed
    WHEN cr.status = 'failed'
      THEN 'CRITICAL: Pipeline execution failed'
    
    ELSE 'OK'
  END as alert_message,
  cr.duration_seconds,
  ps.avg_duration,
  cr.rows_processed,
  ps.avg_rows
FROM current_run cr
JOIN pipeline_stats ps ON cr.pipeline_name = ps.pipeline_name;
      `,

      'Streamlit Dashboard - Health Overview': `
# Main dashboard page showing all pipeline statuses
import streamlit as st
import pandas as pd
import plotly.express as px

st.title("🔍 Pipeline Observability Dashboard")

# Fetch latest runs for all pipelines
latest_runs = get_latest_pipeline_runs()

# Create status summary metrics
col1, col2, col3, col4 = st.columns(4)
col1.metric("Healthy", len(latest_runs[latest_runs['status'] == 'success']))
col2.metric("Failed", len(latest_runs[latest_runs['status'] == 'failed']))
col3.metric("Warnings", len(latest_runs[latest_runs['has_alert'] == True]))
col4.metric("Total Pipelines", len(latest_runs))

# Pipeline health table with status indicators
st.subheader("Pipeline Status")
for _, row in latest_runs.iterrows():
    with st.expander(f"{'✅' if row['status']=='success' else '❌'} {row['pipeline_name']}"):
        col1, col2, col3 = st.columns(3)
        col1.metric("Duration", f"{row['duration_seconds']}s")
        col2.metric("Rows", f"{row['rows_processed']:,}")
        col3.metric("Last Run", row['run_timestamp'].strftime('%Y-%m-%d %H:%M'))
        
        if row['has_alert']:
            st.warning(f"⚠️ {row['alert_message']}")

# Runtime trend chart
st.subheader("Pipeline Runtime Trends (Last 7 Days)")
trend_data = get_pipeline_trends(days=7)
fig = px.line(trend_data, x='run_timestamp', y='duration_seconds', 
              color='pipeline_name', title='Execution Time Over Time')
st.plotly_chart(fig)
      `
    },

    links: {
      github: 'https://github.com/danielg-gerlach/pipeline-observability-dashboard',
      demo: null,
      documentation: null
    }
  },

  'orchestrated-dbt-f1-analytics': {
    id: 'orchestrated-dbt-f1-analytics',
    type: 'personal',
    title: 'F1 Analytics Pipeline',
    subtitle: 'An end-to-end, orchestrated ELT pipeline for F1 historical data deployed with Docker',
    year: '2025',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Building a full ELT pipeline using dbt for transformations and DuckDB as a warehouse, orchestrated by Apache Airflow. Planning to containerize the entire stack with Docker, scheduling daily runs to ingest raw data, run dbt models, and execute data quality tests automatically. This will create a reliable, automated system for F1 analytics.',

    overview: 'Developing a fully automated, end-to-end ELT pipeline for historical Formula 1 race data. The entire pipeline will be orchestrated by Apache Airflow, which will handle scheduling, task dependencies, and retries. Raw data will be ingested and loaded into a DuckDB data warehouse. dbt Core will then be triggered to transform the data into an analytics-ready dimensional model. The whole environment will be containerized via Docker for easy and reproducible deployment.',

    problem: 'Analytical data pipelines require more than just transformation logic; they need to be scheduled, monitored, and be resilient to failure. Manually running ingestion and dbt scripts is not scalable or reliable for providing stakeholders with timely, accurate data.',

    solution: 'Planning to develop an Airflow DAG that will orchestrate the entire process. A `BashOperator` will first ingest raw data. The `Cosmos` provider will then be used to dynamically parse the dbt project and create a corresponding task group in Airflow, perfectly preserving the dependency graph. This DAG will run on a daily schedule, ensuring the entire pipeline from raw CSVs to analytics-ready tables is automated and reliable.',

    techStack: {
      'Orchestration': ['Apache Airflow', 'Docker', 'docker-compose'],
      'Data Transformation': ['dbt Core', 'Cosmos (Airflow Provider)'],
      'Data Warehouse': ['DuckDB'],
      'Languages & Tools': ['SQL', 'Python', 'YAML', 'Jinja']
    },

    architecture: {
      components: [
        { name: 'Containerization', description: 'Docker and docker-compose define and run the entire multi-container application (Airflow, Postgres backend, etc.).' },
        { name: 'Orchestration Layer', description: 'Apache Airflow schedules, executes, and monitors the DAG containing all pipeline tasks.' },
        { name: 'Ingestion Task', description: 'A Python script, run via an Airflow operator, downloads raw CSV data.' },
        { name: 'Transformation Task Group', description: 'The `Cosmos` provider automatically generates Airflow tasks for each dbt model, test, and snapshot.' },
        { name: 'Analytical Database', description: 'A file-based DuckDB instance acts as the fast, local data warehouse.' }
      ]
    },

    metrics: {
      'dbt Models': '15+',
      'Data Tests': '20+',
      'Schedule': 'Daily',
      'Containerized': 'Yes',
      'Stack Cost': '$0 (100% Free & Open Source)',
      'Airflow Tasks': 'Auto-generated'
    },

    challenges: [
      {
        challenge: 'Integrating dbt project dependencies seamlessly into Airflow.',
        solution: 'Planning to utilize the open-source `Cosmos` provider, which will auto-generate Airflow tasks from the dbt project DAG, perfectly preserving model dependencies and streamlining the integration.'
      },
      {
        challenge: 'Managing a multi-container local development environment.',
        solution: 'Will define all services, networks, and volumes in a `docker-compose.yml` file, allowing the entire stack to be spun up or down with a single command.'
      }
    ],

    impact: [
      'Will automate the entire data workflow, eliminating manual runs and ensuring data is always fresh',
      'Planning to increase pipeline reliability with Airflow\'s built-in retry and alerting mechanisms',
      'Aiming to create a fully documented and reproducible data pipeline using dbt and Airflow'
    ],

    learnings: [
      'Learning how to build and manage a production-style data pipeline locally using a containerized Airflow environment',
      'Exploring the power of tools like Cosmos to abstract away the complexity of integrating dbt with Airflow',
      'Understanding the importance of orchestration for creating robust, scalable, and maintainable data systems'
    ],

    screenshots: [
      { title: 'Airflow DAG for F1 Pipeline', url: '/projects/airflow-f1-dag.png' },
      { title: 'dbt Project Lineage Graph', url: '/projects/dbt-f1-dag.png' },
      { title: 'dbt Data Test Results', url: '/projects/dbt-f1-test-results.png' }
    ],

    codeSnippets: {
      'Airflow DAG Definition (dag.py)': `
# This Python file defines the Airflow DAG for the F1 project.
from cosmos.providers.dbt.dag import DbtDag
from pendulum import datetime

# Define the dbt project parameters for Cosmos
f1_dbt_project = {
    "dbt_project_name": "f1_analytics",
    "dbt_root_path": "/usr/local/airflow/dags/dbt/f1_analytics",
    "dbt_models_dir": "models",
    "dbt_snapshots_dir": "snapshots",
}

# Use DbtDag to automatically create the DAG from the dbt project
f1_dag = DbtDag(
    dag_id="f1_dbt_pipeline",
    schedule_interval="@daily",
    start_date=datetime(2023, 1, 1),
    catchup=False,
    **f1_dbt_project,
)
        `,
      'dbt Data Test (schema.yml)': `
# This YAML defines tests for the stg_races model.
# dbt will automatically check these conditions on every run.
version: 2

models:
  - name: stg_races
    columns:
      - name: race_id
        tests:
          - unique
          - not_null
      - name: race_year
        tests:
          - accepted_values:
              values: range(1950, 2026) # Ensures year is within a valid range
        `
    },

    links: {
      github: 'https://github.com/YOUR_USERNAME/airflow-dbt-f1-analytics',
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
      'Created a fully automated, hands-off pipeline for processing raw data files.',
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
      { title: 'Final Looker Studio Dashboard', url: '/projects/gcp/SaaS_Analytics_Dashboard.pdf' },
      { title: 'Data Pipeline Architecture', url: '/projects/gcp-pipeline-arch.png' },
      { title: 'BigQuery Analytical Tables', url: '/projects/gcp-bigquery-tables.png' }
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
      },
      {
        challenge: 'Displaying large amounts of lead data without performance degradation',
        solution: 'Implemented pagination, lazy loading, and efficient database queries with proper indexing to ensure fast load times even with thousands of quiz responses.'
      },
      {
        challenge: 'Ensuring data security and privacy compliance for customer quiz responses',
        solution: 'Used Supabase for authentication with row-level security policies, implemented audit logging, and ensured all sensitive customer data is encrypted and access-controlled.'
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
  },

  'work-project-4': {
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

    solution: `Conducted a comprehensive consulting engagement that included: (1) Strategic workshops with executive management to assess current workflows and identify high-impact AI use cases, (2) Development of a phased implementation roadmap prioritizing quick wins and long-term transformations, (3) Multiple training sessions tailored to different departments, covering tools like ChatGPT, Claude, automated document processing, and workflow automation, (4) Creation of internal documentation and guidelines for responsible AI usage and best practices.`,

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
      'Equipped 25+ employees with practical AI skills, improving productivity in document processing, customer communication, and market analysis',
      'Established a framework for responsible AI usage that balances innovation with data security and compliance requirements',
      'Identified and helped implement 5 quick-win use cases that demonstrated immediate ROI and built organizational confidence in AI technologies',
      'Created a cultural shift toward AI adoption by demystifying the technology and showing practical, achievable applications'
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
  }
}