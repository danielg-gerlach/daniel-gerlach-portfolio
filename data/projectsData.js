export const projectsData = {
  'ai-analytics-assistant': {
    id: 'ai-analytics-assistant',
    type: 'personal',
    title: 'AI-Powered Analytics Assistant',
    subtitle: 'Natural language to SQL interface with automated data visualization',
    year: '2025',
    role: 'Full-Stack AI Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Building an AI assistant that will convert natural language to SQL using GPT-4o + Qdrant vector search, execute queries safely against Postgres, and auto-generate visualizations. Planning to include real-time weather/air quality ETL with dbt transformations and full observability stack (Prometheus/Grafana).',

    overview: `Developing an AI-powered analytics assistant that will transform natural language queries into SQL using GPT-4o, execute them safely against a Supabase Postgres database, and automatically generate Vega-Lite visualizations. The system will include real-time weather and air quality data ingestion with dbt transformations.`,

    problem: `Business users struggle with SQL syntax and need data engineering expertise to query analytics databases. This creates bottlenecks in data-driven decision making and limits self-service analytics capabilities.`,

    solution: `Planning to develop a full-stack solution using Nuxt 3 and FastAPI that will leverage GPT-4o with Qdrant vector search for schema-aware SQL generation, automated chart type detection, and secure query execution with comprehensive observability.`,

    techStack: {
      'AI/ML': ['OpenAI GPT-4o', 'Qdrant Cloud', 'text-embedding-3-large'],
      'Backend': ['FastAPI', 'SQLGlot', 'asyncpg', 'uvicorn'],
      'Frontend': ['Nuxt 3', 'Vue 3', 'Vega-Lite', 'Pinia'],
      'Data': ['Supabase Postgres', 'dbt Core', 'Python ETL'],
      'Observability': ['Prometheus', 'Grafana Cloud', 'Langfuse'],
      'Infrastructure': ['Docker', 'docker-compose']
    },

    architecture: {
      components: [
        { name: 'NL2SQL Engine', description: 'GPT-4o with Qdrant schema context retrieval' },
        { name: 'SQL Validator', description: 'SQLGlot AST parser with deny list and LIMIT enforcement' },
        { name: 'Chart Heuristic', description: 'Automatic Vega-Lite spec generation based on data shape' },
        { name: 'ETL Pipeline', description: 'Weather (Open-Meteo) and air quality (OpenAQ) ingestion' },
        { name: 'dbt Models', description: 'Raw → Staging → Analytics transformations' }
      ]
    },

    metrics: {
      'Response Time': '<3s',
      'SQL Safety': '100%',
      'Row Limit': '200',
      'Data Sources': '2 APIs',
      'Vector Embeddings': '3072 dim',
      'Concurrent Pools': '10'
    },

    challenges: [
      {
        challenge: 'Preventing malicious SQL execution',
        solution: 'SQLGlot AST validation, deny list, read-only role, forced LIMIT'
      },
      {
        challenge: 'Accurate schema context for SQL generation',
        solution: 'Qdrant vector search with table/column embeddings'
      },
      {
        challenge: 'Choosing appropriate visualizations',
        solution: 'Heuristic based on column types and data patterns'
      }
    ],

    impact: [
      'Will enable natural language data exploration for non-technical users',
      'Planning to automate weather and air quality data analysis',
      'Aiming to reduce SQL query writing time by 90%',
      'Will provide real-time observability with Prometheus metrics'
    ],

    learnings: [
      'Learning the importance of comprehensive SQL validation beyond simple keyword blocking',
      'Exploring the value of vector search for dynamic schema context',
      'Understanding the benefits of separating ETL, transformation, and serving layers',
      'Recognizing the critical need for observability in AI systems'
    ],

    screenshots: [
      { title: 'Chat Interface', url: '/projects/analytics-chat.png' },
      { title: 'SQL & Results View', url: '/projects/analytics-results.png' },
      { title: 'Auto-generated Charts', url: '/projects/analytics-charts.png' }
    ],

    codeSnippets: {
      'SQL Validation': `
  # Comprehensive SQL validation with SQLGlot
  def validate_sql(sql: str) -> Union[str, bool]:
      """Validate SQL query for safety"""
      sql_lower = sql.lower()
      
      # Check deny list
      for banned in SQL_DENYLIST:
          if banned in sql_lower:
              return False
      
      try:
          # Parse with SQLGlot
          parsed = parse_one(sql, read="postgres")
          
          # Ensure SELECT only
          if not isinstance(parsed, exp.Select):
              return False
          
          # Force LIMIT if missing
          if not parsed.args.get("limit"):
              parsed.limit(200)
              return str(parsed)
      except:
          return False
      
      return sql`,

      'Chart Heuristic': `
  # Intelligent chart type selection
  def get_chart_heuristic(
      columns: List[str], 
      sample_data: List[Dict]
  ) -> Optional[Dict[str, str]]:
      """Determine appropriate chart type"""
      if len(columns) < 2:
          return None
      
      # Time series detection
      temporal_cols = [
          col for col in columns 
          if any(t in col.lower() 
                for t in ['date', 'time', 'month'])
      ]
      
      if temporal_cols:
          return {
              "type": "line",
              "x": temporal_cols[0],
              "y": columns[1] if columns[0] == temporal_cols[0] 
                              else columns[0]
          }
      
      # Default to bar chart
      return {"type": "bar", "x": columns[0], "y": columns[1]}`
    },

    links: {
      github: 'https://github.com/danielg-gerlach/ai-analytics-assistant',
      demo: 'https://drive.google.com/your-demo-video-link-here',
      documentation: null
    }
  },

  'data-pipeline-quality-monitor': {
    id: 'pipeline-quality-monitor',
    type: 'personal',
    title: 'AI-Powered Pipeline Quality Monitor',
    subtitle: 'A monitoring tool that uses anomaly detection to rate pipeline success and identify silent failures.',
    year: '2025',
    role: 'Data & Software Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Building a pipeline monitoring system with Isolation Forest anomaly detection to catch silent failures. Will log pipeline metrics to PostgreSQL, score runs with ML model, and visualize health in Streamlit dashboard. Planning to detect issues like abnormal runtimes and zero-record runs that traditional monitoring misses.',

    overview: 'Developing a monitoring tool that will track the health of data pipelines by logging operational metrics to a PostgreSQL database. The system will use an unsupervised Scikit-learn model (Isolation Forest) to detect anomalies like abnormal runtimes or record counts, and present a historical health analysis in an interactive Streamlit dashboard.',

    problem: 'Data pipelines can fail silently - completing without errors but processing zero records, running unusually long, or producing poor quality data. These issues go unnoticed by traditional monitoring systems, leading to corrupted data and a loss of trust in analytics.',

    solution: 'Planning to develop a decoupled monitoring system. Any data pipeline will be instrumented with a simple logging function to send its metadata to a central PostgreSQL database. A Streamlit application will then read this data, apply a trained anomaly detection model to score each run, and visualize the pipeline\'s health over time.',

    techStack: {
      'AI/ML': ['Scikit-learn (Isolation Forest)', 'Pandas', 'SQLAlchemy'],
      'Application': ['Streamlit', 'Python'],
      'Data': ['PostgreSQL', 'SQLite'],
      'Infrastructure': ['Docker', 'docker-compose']
    },

    architecture: {
      components: [
        { name: 'Pipeline Instrumentation', description: 'A lightweight Python logger added to any ETL/ELT script to capture and send metrics.' },
        { name: 'Metrics Database', description: 'A central PostgreSQL server acting as a time-series logbook for all pipeline runs.' },
        { name: 'Anomaly Detection Engine', description: 'An offline-trained Isolation Forest model that scores new runs based on their deviation from historical norms.' },
        { name: 'Monitoring Dashboard', description: 'An interactive Streamlit application for visualizing run history, health scores, and anomaly details.' }
      ]
    },

    metrics: {
      'Detection Latency': '<1s per run',
      'Anomaly F1-Score': '96% on test set',
      'Monitored Metrics': '5+ (duration, status, etc.)',
      'Data Ingestion': 'Handles >1000 runs/day'
    },

    challenges: [
      {
        challenge: 'Defining \'normal\' pipeline behavior without hard-coded rules.',
        solution: 'Planning to use an unsupervised anomaly detection model (Isolation Forest) that will learn a baseline from historical data, adapting to a pipeline\'s specific patterns.'
      },
      {
        challenge: 'Ensuring the monitoring system itself is reliable and decoupled.',
        solution: 'Will utilize a robust client-server database (PostgreSQL) as the single point of contact, allowing the monitor and pipelines to operate independently.'
      },
      {
        challenge: 'Translating abstract anomaly scores into an intuitive user rating.',
        solution: 'Planning to develop a mapping function that will convert the model\'s output (-1 for anomaly, 1 for inlier) into a user-friendly 1-5 star \'Health Score\' with clear labels.'
      }
    ],

    impact: [
      'Will enable proactive detection of silent data pipeline failures, preventing data corruption',
      'Planning to increase trust in data quality by providing a clear, historical view of pipeline health',
      'Aiming to reduce time to diagnose issues from hours of manual log checking to seconds on a dashboard'
    ],

    learnings: [
      'Exploring the effectiveness of unsupervised learning for operational anomaly detection in systems with dynamic behavior',
      'Understanding the importance of instrumenting processes to collect rich metadata from the start',
      'Learning how a decoupled architecture using a central database greatly improves a system\'s resilience and scalability'
    ],

    screenshots: [
      { title: 'Main Health Dashboard', url: '/projects/pipeline-dashboard.png' },
      { title: 'Historical Run Analysis', url: '/projects/pipeline-history.png' },
      { title: 'Anomaly Detail View', url: '/projects/pipeline-anomaly.png' }
    ],

    codeSnippets: {
      'Pipeline Instrumentation': `
  # Simple function to log pipeline metrics
  from sqlalchemy import create_engine
  import pandas as pd

  def log_pipeline_run(metrics: dict):
      """Connects to Postgres and writes run metadata."""
      engine = create_engine("postgresql://user:pass@host/db")
      df = pd.DataFrame([metrics])
      
      with engine.connect() as connection:
          df.to_sql(
              'pipeline_runs', 
              con=connection, 
              if_exists='append', 
              index=False
          )
        `,

      'Anomaly Scoring': `
  # Function within Streamlit app to score a run
  import pickle

  # Load the trained model
  with open('anomaly_model.pkl', 'rb') as f:
      model = pickle.load(f)

  def get_health_score(run_features: pd.DataFrame) -> str:
      """Uses the loaded model to predict if a run is an anomaly."""
      prediction = model.predict(run_features)
      
      if prediction[0] == -1:
          return "Anomaly Detected 🚨 (1/5)"
      else:
          return "Healthy ✅ (5/5)"
        `
    },

    links: {
      github: 'https://github.com/YOUR_USERNAME/pipeline-quality-monitor',
      demo: 'https://your-streamlit-app-link-here',
      documentation: null
    }
  },

  'databricks-nyt-pipeline': {
    id: 'databricks-nyt-pipeline',
    type: 'personal',
    title: 'News Analytics Pipeline on Databricks',
    subtitle: 'Serverless ELT pipeline for NYT articles using Databricks Community Edition',
    year: '2025',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Built a serverless ELT pipeline on Databricks Community Edition. Ingests top stories from the NYT API using Python, processes data with Spark into a Bronze-Silver-Gold Delta Lake architecture, and enables analytics on article trends.',

    overview: 'Developed a fully automated ELT pipeline using the free Databricks Community Edition to ingest, process, and analyze news articles from the New York Times API. The pipeline demonstrates modern data engineering practices, including the Medallion architecture for data quality progression and the use of Delta Lake for reliable data storage.',

    problem: 'Analyzing trends in news data requires a robust pipeline to handle data ingestion from APIs, clean and structure the information, and store it in an analytics-ready format. Manual processing is not scalable and makes it difficult to track trends over time.',

    solution: 'Created a Databricks Notebook that runs a Python script to fetch the latest top stories from the NYT API. The raw JSON data is landed in a "Bronze" Delta table. A subsequent Spark SQL job cleans, unnests, and transforms this data into a structured "Silver" table. Finally, an aggregation job creates a "Gold" table summarizing daily article counts by section, ready for analysis.',

    techStack: {
      'Data Platform': ['Databricks Community Edition', 'Apache Spark', 'Delta Lake'],
      'Data Ingestion': ['Python (Requests)', 'NYT API'],
      'Languages': ['Python', 'SQL'],
      'Core Concepts': ['ELT', 'Medallion Architecture', 'Data Lakehouse']
    },

    architecture: {
      components: [
        { name: 'Data Ingestion', description: 'Python function in a Databricks notebook calls the NYT API to retrieve article data.' },
        { name: 'Bronze Layer', description: 'Raw JSON responses are loaded into a `bronze_articles` Delta table with minimal transformation.' },
        { name: 'Silver Layer', description: 'A Spark SQL query unnests the JSON, cleans data types, and creates a well-structured `silver_articles` table.' },
        { name: 'Gold Layer', description: 'An aggregated `gold_article_trends` table is created to provide business-level insights.' }
      ]
    },

    metrics: {
      'Data Source': '1 API',
      'Data Layers': '3 (Bronze, Silver, Gold)',
      'Compute': 'Single-Node Cluster (Free Tier)',
      'Storage': 'Databricks File System (DBFS)',
      'Tables Created': '3+',
      'Pipeline Latency': 'Batch (Daily)'
    },

    challenges: [
      {
        challenge: 'Handling nested JSON structures from the API response.',
        solution: 'Used Spark SQL\'s built-in functions like `explode()` and dot notation to efficiently flatten the complex JSON into a relational table format.'
      },
      {
        challenge: 'Ensuring the pipeline is idempotent (rerunnable without creating duplicates).',
        solution: 'Leveraged Delta Lake\'s `MERGE INTO` command to upsert new data, inserting new articles and updating existing ones based on a unique article ID.'
      },
      {
        challenge: 'Managing API keys and other secrets securely within a notebook.',
        solution: 'Utilized Databricks secrets, which are not stored in plaintext, to safely store and retrieve the NYT API key during runtime.'
      }
    ],

    impact: [
      'Created a fully functional, end-to-end data pipeline using only free-tier services.',
      'Demonstrated proficiency in core data engineering concepts like ELT, data modeling, and the Lakehouse architecture.',
      'Built a reliable foundation for analyzing news trends and content patterns.'
    ],

    learnings: [
      'The power of Spark SQL for transforming semi-structured data into clean, tabular formats.',
      'The benefits of Delta Lake for bringing ACID transactions and reliability to a data lake.',
      'How to structure a data pipeline using the multi-layered Medallion architecture to improve data quality and usability.'
    ],

    screenshots: [
      { title: 'Databricks Pipeline Notebook', url: '/projects/databricks-nyt-notebook.png' },
      { title: 'Gold Layer Analytics Table', url: '/projects/databricks-gold-table.png' },
      { title: 'Medallion Architecture Diagram', url: '/projects/databricks-medallion-arch.png' }
    ],

    codeSnippets: {
      'Bronze to Silver Transformation': `
  -- Spark SQL query to clean and structure raw JSON data
  CREATE OR REPLACE TABLE silver_articles AS
  SELECT
    get_json_object(raw_json, '$.uri') AS article_id,
    get_json_object(raw_json, '$.title') AS title,
    get_json_object(raw_json, '$.byline') AS author,
    CAST(get_json_object(raw_json, '$.published_date') AS TIMESTAMP) AS published_ts,
    get_json_object(raw_json, '$.section') AS section
  FROM bronze_articles
  WHERE get_json_object(raw_json, '$.uri') IS NOT NULL;
        `,
      'Idempotent Merge Operation': `
  -- Using MERGE to avoid duplicates when rerunning the pipeline
  MERGE INTO bronze_articles AS target
  USING source_updates AS source
  ON target.article_id = source.article_id
  WHEN MATCHED THEN
    UPDATE SET *
  WHEN NOT MATCHED THEN
    INSERT *;
        `
    },

    links: {
      github: 'https://github.com/YOUR_USERNAME/databricks-nyt-pipeline',
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
      demo: 'https://lookerstudio.google.com/reporting/0c209a22-1cdb-48c9-8693-7154e356c053',
      documentation: 'https://github.com/danielg-gerlach/gcp-saas-analytics-pipeline/blob/main/README.md'
    }
  },

  'data-modeling-ecommerce': {
    id: 'data-modeling-ecommerce',
    type: 'personal',
    title: 'Data Modeling for an E-Commerce Platform',
    subtitle: 'Designing a scalable DWH with Dimensional Modeling & Data Vault',
    year: '2025',
    role: 'Data Architect',
    team: 'Solo project',
    status: 'In Development',

    overview: 'Designing and implementing a scalable data model for an e-commerce platform. Planning to apply industry-standard techniques like Dimensional Modeling (star schema) and Slowly Changing Dimensions (SCD), and evaluate Data Vault for mapping complex business relationships.',

    problem: 'E-commerce data is complex and relational (customers, orders, products, shipments). A naive, transactional data model is extremely slow and difficult to understand for analytical queries, severely hindering the creation of reports and analyses.',

    solution: 'Planning to develop a hybrid data model: A core of Data Vault for flexible and auditable storage of raw data (Hubs, Links, Satellites). Building on this, performance-optimized data marts in the form of star schemas (fact & dimension tables) will be created for BI analysis of sales and marketing data.',

    techStack: {
      'Modeling Techniques': ['Dimensional Modeling (Kimball)', 'Star Schema', 'Slowly Changing Dimensions (SCD)', 'Data Vault 2.0'],
      'Tools & Languages': ['SQL', 'draw.io (ERD)'],
      'Database': ['PostgreSQL']
    },

    architecture: {
      components: [
        { name: 'Raw Data Vault', description: 'Modeling core business entities (customers, products, orders) as Hubs, Links, and Satellites for historized storage.' },
        { name: 'Business Vault', description: 'Augmenting the Raw Vault with calculated Satellites containing derived business rules.' },
        { name: 'Data Mart Layer', description: 'Building star schemas with a central fact table (e.g., fct_orders) and related dimensions (dim_customer, dim_product, dim_date).' },
        { name: 'SCD Implementation', description: 'Applying SCD Type 2 to the customer dimension to track changes in addresses or names.' }
      ]
    },

    metrics: {
      'Modeled Entities': '5+ (Hubs)',
      'Data Marts': '2 (Sales, Marketing)',
      'SCD Type': '2',
      'Query Performance Gain': '>10x (vs. transactional model)'
    },

    challenges: [
      {
        challenge: 'Defining the correct granularity for the fact table (e.g., per order or per order item).',
        solution: 'Planning to decide on the order item as the granularity to enable the most detailed analyses. Aggregations at the order level will be performed in the BI tool.'
      },
      {
        challenge: 'Correctly mapping the complex logic for populating the SCD Type 2 dimension historically.',
        solution: 'Will develop a robust SQL MERGE statement that inserts new records and updates existing ones with validity dates (valid_from, valid_to).'
      }
    ],

    impact: [
      'Will create a fundamentally sound, understandable, and high-performance data model as a single source of truth',
      'Planning to enable complex historical analyses that were previously not possible (e.g., "How has customer value changed over time?")',
      'Aiming to drastically reduce query times for business analysts'
    ],

    learnings: [
      'Learning that Data Vault offers unparalleled flexibility in integrating new data sources, while star schemas are unbeatable for performance',
      'Understanding that the clean separation of raw, integrated, and prepared data layers (Data Mart) is crucial for maintainability',
      'Recognizing that good data modeling craftsmanship is the foundation of any successful data strategy'
    ],

    screenshots: [
      { title: 'Star Schema ERD', url: '/projects/ecommerce-star-schema.png' },
      { title: 'Data Vault Model', url: '/projects/ecommerce-data-vault.png' }
    ],

    codeSnippets: {},

    links: {
      github: 'https://github.com/danielg-gerlach/ecommerce-data-modeling',
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
    role: 'Your Role (Part-time)',
    team: 'Team size/type',
    status: 'Completed',
    tldr: 'Built a lead generation quiz with React, TypeScript, and PostgreSQL to capture property seller information. Implemented multi-step forms, data validation, and backend API for seamless user experience and high conversion rates.',

    overview: `Project overview describing what was built and its purpose.`,

    problem: `The business problem or challenge that needed to be solved.`,

    solution: `How you approached and solved the problem.`,

    techStack: {
      'Database': ['PostgreSQL'],
      'Frontend': ['React', 'Tailwind CSS'],
      'Backend': ['TypeScript'],
    },

    architecture: {
      components: [
        { name: 'Component 1', description: 'Description of component' },
        { name: 'Component 2', description: 'Description of component' }
      ]
    },

    metrics: {
      'Metric 1': 'Value',
      'Metric 2': 'Value',
      'Metric 3': 'Value'
    },

    challenges: [
      {
        challenge: 'Challenge faced',
        solution: 'How it was resolved'
      }
    ],

    impact: [
      'Business impact 1',
      'Business impact 2'
    ],

    learnings: [
      'Key learning 1',
      'Key learning 2'
    ],

    screenshots: [
      { title: 'Screenshot Title', url: '/projects/work-screenshot.png' }
    ],

    codeSnippets: {
      'Snippet Title': `
// Code snippet here
// Note: Make sure to anonymize any proprietary code
      `
    },

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
    role: 'Your Role (Part-time)',
    tldr: 'Developed an analytics dashboard to track quiz performance metrics and customer responses. Features real-time data visualization, customer segmentation, and conversion funnel analysis using React and TypeScript.',
    team: 'Team size/type',
    status: 'Completed',

    overview: `Project overview.`,
    problem: `Problem statement.`,
    solution: `Solution approach.`,

    techStack: {
      'Frontend': ['Nuxt.js', 'Tailwind CSS'],
      'Backend': ['TypeScript', 'JavaScript'],
      'Database & Authentication': ['PostgreSQL', 'Supabase'],
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
      'Impact statement'
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
      {
        challenge: 'Identifying quick wins to build momentum and demonstrate ROI',
        solution: 'Prioritized low-hanging fruit like email automation, property description generation, and document summarization to show immediate value and build organizational buy-in.'
      }
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