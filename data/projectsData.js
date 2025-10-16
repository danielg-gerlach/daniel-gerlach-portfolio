export const projectsData = {
  'ai-analytics-assistant': {
    id: 'ai-analytics-assistant',
    type: 'personal',
    title: 'AI-Powered Analytics Assistant',
    subtitle: 'Natural language to SQL interface with automated data visualization',
    year: '2025',
    duration: '2 months',
    role: 'Full-Stack AI Engineer',
    team: 'Solo project',
    status: 'Completed',

    overview: `Built an AI-powered analytics assistant that transforms natural language queries into SQL using GPT-4o, executes them safely against a Supabase Postgres database, and automatically generates Vega-Lite visualizations. The system includes real-time weather and air quality data ingestion with dbt transformations.`,

    problem: `Business users struggle with SQL syntax and need data engineering expertise to query analytics databases. This creates bottlenecks in data-driven decision making and limits self-service analytics capabilities.`,

    solution: `Developed a full-stack solution using Nuxt 3 and FastAPI that leverages GPT-4o with Qdrant vector search for schema-aware SQL generation, automated chart type detection, and secure query execution with comprehensive observability.`,

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
      'Enabled natural language data exploration for non-technical users',
      'Automated weather and air quality data analysis',
      'Reduced SQL query writing time by 90%',
      'Real-time observability with Prometheus metrics'
    ],

    learnings: [
      'Importance of comprehensive SQL validation beyond simple keyword blocking',
      'Value of vector search for dynamic schema context',
      'Benefits of separating ETL, transformation, and serving layers',
      'Critical need for observability in AI systems'
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
    duration: '2 months',
    role: 'Data & Software Engineer',
    team: 'Solo project',
    status: 'Completed',

    overview: 'Built a monitoring tool that tracks the health of data pipelines by logging operational metrics to a PostgreSQL database. The system uses an unsupervised Scikit-learn model (Isolation Forest) to detect anomalies like abnormal runtimes or record counts, and presents a historical health analysis in an interactive Streamlit dashboard.',

    problem: 'Data pipelines can fail silently - completing without errors but processing zero records, running unusually long, or producing poor quality data. These issues go unnoticed by traditional monitoring systems, leading to corrupted data and a loss of trust in analytics.',

    solution: 'Developed a decoupled monitoring system. Any data pipeline can be instrumented with a simple logging function to send its metadata to a central PostgreSQL database. A Streamlit application then reads this data, applies a trained anomaly detection model to score each run, and visualizes the pipeline\'s health over time.',

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
        solution: 'Used an unsupervised anomaly detection model (Isolation Forest) that learns a baseline from historical data, adapting to a pipeline\'s specific patterns.'
      },
      {
        challenge: 'Ensuring the monitoring system itself is reliable and decoupled.',
        solution: 'Utilized a robust client-server database (PostgreSQL) as the single point of contact, allowing the monitor and pipelines to operate independently.'
      },
      {
        challenge: 'Translating abstract anomaly scores into an intuitive user rating.',
        solution: 'Developed a mapping function that converts the model\'s output (-1 for anomaly, 1 for inlier) into a user-friendly 1-5 star \'Health Score\' with clear labels.'
      }
    ],

    impact: [
      'Enabled proactive detection of silent data pipeline failures, preventing data corruption.',
      'Increased trust in data quality by providing a clear, historical view of pipeline health.',
      'Reduced time to diagnose issues from hours of manual log checking to seconds on a dashboard.'
    ],

    learnings: [
      'The effectiveness of unsupervised learning for operational anomaly detection in systems with dynamic behavior.',
      'The importance of instrumenting processes to collect rich metadata from the start.',
      'How a decoupled architecture using a central database greatly improves a system\'s resilience and scalability.'
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

  'mcp-aws': {
    id: 'mcp-aws',
    type: 'personal',
    title: 'MCP with AWS & Databricks',
    subtitle: 'Building a Q&A bot from documents using MCP.',
    year: '2025',
    duration: '1 month',
    role: 'Data Engineer for AI',
    team: 'Solo project',
    status: 'In Development',

    overview: 'Developed a full-cycle Retrieval-Augmented Generation (RAG) pipeline to transform a collection of unstructured documents into an interactive question-and-answer bot. The project leverages cloud services for storage and a distributed computing engine for processing, creating a scalable foundation for AI-powered knowledge retrieval.',

    problem: 'Valuable information is often locked away in unstructured documents (like PDFs and text files), making it difficult to search and query with precision. Standard keyword search cannot understand the semantic meaning of the content.',

    solution: 'Built a data engineering pipeline that ingests documents from cloud storage, processes and chunks them, converts the text into numerical vector embeddings, and stores them in a queryable format. An application layer then uses this vectorized data to find the most relevant document snippets to answer a user\'s question.',

    techStack: {
      'Data Engineering': ['Python', 'Apache Spark', 'Databricks', 'Delta Lake'],
      'Cloud Infrastructure': ['AWS S3'],
      'AI/ML': ['Hugging Face Transformers', 'Vector Embeddings', 'Sentence-Transformers'],
      'Core Concepts': ['ETL/ELT', 'Data Lake Architecture', 'Semantic Search']
    },

    architecture: {
      components: [
        { name: 'Data Lake Storage', description: 'AWS S3 for storing raw documents and processed Delta tables.' },
        { name: 'Processing Engine', description: 'Databricks for Spark-based data ingestion and transformation.' },
        { name: 'Feature Engineering', description: 'Generating vector embeddings from text chunks using Hugging Face models.' },
        { name: 'Vector Store', description: 'Delta Lake table acting as a simple, scalable vector database.' },
        { name: 'Application Logic', description: 'Python function for semantic search via cosine similarity.' }
      ]
    },

    metrics: {
      'Data Sources': 'PDF, TXT',
      'Processing Engine': 'Apache Spark 3.5',
      'Vector Dimension': '384',
      'Search Metric': 'Cosine Similarity',
      'Cloud Services': '2 (AWS, Databricks)',
      'Status': 'Processing pipeline complete'
    },

    challenges: [
      {
        challenge: 'Handling unstructured data from PDFs efficiently.',
        solution: 'Utilized the `pypdf` library within a Spark UDF to parallelize document reading and text extraction.'
      },
      {
        challenge: 'Managing Python dependencies in a distributed environment.',
        solution: 'Leveraged Databricks notebook-scoped libraries (`%pip`) for easy and isolated package management.'
      },
      {
        challenge: 'Performing vector similarity search at scale.',
        solution: 'Used Spark to broadcast the query vector and perform a distributed cosine similarity calculation across all chunk embeddings.'
      }
    ],

    impact: [
      'Successfully unlocked knowledge from unstructured document archives.',
      'Created a foundational data engineering pattern for building modern AI applications.',
      'Demonstrated proficiency in combining cloud data storage with distributed computing for AI workloads.',
      'Enabled semantic search capabilities without relying on a dedicated vector database.'
    ],

    learnings: [
      'The process of creating and manipulating vector embeddings for semantic meaning.',
      'How to integrate cloud storage (S3) with Databricks for seamless data access.',
      'The power of Delta Lake for bringing reliability and structure to a data lake.',
      'Practical application of data engineering principles to solve a real-world AI problem.'
    ],

    screenshots: [
      { title: 'Databricks Processing Notebook', url: '/projects/rag-databricks-notebook.png' },
      { title: 'S3 Data Lake Structure', url: '/projects/rag-s3-structure.png' },
      { title: 'Delta Lake Vector Table', url: '/projects/rag-delta-table.png' }
    ],

    codeSnippets: {
      'Vector Embedding Generation': `
  from pyspark.sql.functions import pandas_udf, col
  from sentence_transformers import SentenceTransformer
  
  # Broadcast the model to all worker nodes
  model = SentenceTransformer('all-MiniLM-L6-v2')
  bc_model_weights = spark.sparkContext.broadcast(model)
  
  @pandas_udf('array<float>')
  def embed_text_udf(series: pd.Series) -> pd.Series:
      model = bc_model_weights.value
      embeddings = model.encode(series.tolist(), show_progress_bar=False)
      return pd.Series(list(embeddings))
  
  # Apply the UDF to create an embeddings column
  chunked_df = chunked_df.withColumn(
      "embedding",
      embed_text_udf(col("text_chunk"))
  )
        `,
      'Semantic Search in Spark': `
  from pyspark.sql.functions import udf
  from scipy.spatial.distance import cosine
  
  # User query and its embedding
  query_text = "What is the importance of data governance?"
  query_embedding = model.encode(query_text)
  
  @udf('float')
  def cosine_similarity_udf(vec):
      # Calculate 1 - cosine distance, since higher is better
      return float(1 - cosine(query_embedding, vec))
  
  # Find the most relevant documents
  results = vector_table.withColumn(
      "similarity",
      cosine_similarity_udf(col("embedding"))
  ).orderBy(col("similarity").desc()).limit(5)
  
  results.select("text_chunk", "similarity").show(truncate=False)
        `
    },

    links: {
      github: 'https://github.com/yourusername/databricks-rag-pipeline',
      demo: 'https://drive.google.com/your-demo-video-link-here',
      documentation: 'https://github.com/yourusername/databricks-rag-pipeline/blob/main/README.md'
    }
  },

  'formula1-dbt-analytics': {
    id: 'formula1-dbt-analytics',
    type: 'personal',
    title: 'Formula 1 Analytics with dbt & Azure Synapse',
    subtitle: 'Building a scalable data warehouse for historical F1 racing data',
    year: '2025',
    duration: '1 week',
    role: 'Analytics Engineer',
    team: 'Solo project',
    status: 'In Development',

    overview: `Developed a comprehensive analytics engineering project using dbt Core to transform raw, normalized Formula 1 data into a performance-optimized star schema in Azure Synapse Analytics. The project ingests decades of historical race results, drivers, and constructor data from Azure Blob Storage, applying rigorous testing and documentation to build a reliable single source of truth for analysis.`,

    problem: `Raw transactional data, like the publicly available Ergast F1 dataset, is highly normalized and spread across many tables. This structure is inefficient for analytical queries and makes it difficult for data analysts to answer business questions like "Which constructor has the most wins at Monaco?" without writing complex, multi-level joins.`,

    solution: `Built a dbt project that follows analytics engineering best practices. The pipeline starts with defining sources from data staged in a data lake, moves to staging models for basic cleaning and casting, and culminates in fact and dimension tables (a star schema) that are optimized for BI tools. The project includes custom macros, data quality tests, and is fully documented and version-controlled.`,

    techStack: {
      'Data Transformation': ['dbt Core', 'SQL'],
      'Data Warehouse': ['Azure Synapse Analytics'],
      'Data Lake Storage': ['Azure Blob Storage'],
      'Languages & Tools': ['Python', 'Git', 'YAML'],
      'CI/CD': ['GitHub Actions']
    },

    architecture: {
      components: [
        { name: 'Data Sources', description: 'Raw F1 data staged in Azure Blob Storage and defined in dbt sources.yml.' },
        { name: 'Staging Layer', description: 'One-to-one models for cleaning, renaming, and casting raw source data.' },
        { name: 'Marts Layer', description: 'Dimension tables (dim_drivers, dim_races) and a central fact table (fct_results) forming a star schema.' },
        { name: 'Data Quality', description: 'Over 50 generic and singular tests to ensure referential integrity and data validity.' },
        { name: 'Code Abstraction', description: 'Custom dbt macros to generate surrogate keys and perform common transformations.' },
        { name: 'Documentation', description: 'Generated a full dbt documentation site showing model descriptions and lineage.' }
      ]
    },

    metrics: {
      'Models Created': '15+',
      'Data Tests': '50+',
      'Macros': '2',
      'Sources': '14',
      'Schema Design': 'Star Schema',
      'CI/CD': 'Automated dbt build'
    },

    challenges: [
      {
        challenge: 'Modeling complex relationships between drivers, constructors, and race results over time.',
        solution: 'Used intermediate models to logically group joins and calculations before creating the final fact and dimension tables.'
      },
      {
        challenge: 'Ensuring data quality and referential integrity across decades of historical data.',
        solution: 'Implemented comprehensive dbt tests (e.g., unique, not_null, relationships) on all primary and foreign keys.'
      },
      {
        challenge: 'Avoiding repetitive SQL code when generating primary keys for models.',
        solution: 'Created a dbt macro to generate a surrogate key by hashing a column or combination of columns, ensuring a consistent and DRY approach.'
      }
    ],

    impact: [
      'Transformed a complex, normalized dataset into an analytics-ready star schema in the Azure ecosystem.',
      'Established a robust, tested, and documented single source of truth for F1 analysis.',
      'Demonstrated advanced dbt skills, including testing, documentation, and macro development.',
      'Enabled fast and efficient querying for complex analytical questions that were previously difficult to answer.'
    ],

    learnings: [
      'The power of dbt for enforcing data quality and building trust in data assets.',
      'Best practices for structuring a dbt project with staging and marts layers.',
      'How to leverage dbt macros to write more maintainable and reusable SQL code.',
      'The value of a well-documented data model and the utility of dbt docs for exploring lineage.'
    ],

    screenshots: [
      { title: 'dbt Project Lineage Graph (DAG)', url: '/projects/dbt-dag.png' },
      { title: 'dbt Test Execution in CLI', url: '/projects/dbt-test-cli.png' },
      { title: 'Azure Synapse Star Schema Tables', url: '/projects/dbt-synapse-schema.png' }
    ],

    codeSnippets: {
      'Fact Table Model (fct_results.sql)': `
-- This model joins race results with key dimensions to create a central fact table.
WITH results AS (
    SELECT * FROM {{ ref('stg_f1_results') }}
),
drivers AS (
    SELECT * FROM {{ ref('dim_drivers') }}
),
races AS (
    SELECT * FROM {{ ref('dim_races') }}
)
SELECT
    -- Surrogate key
    {{ dbt_utils.generate_surrogate_key(['r.result_id']) }} as result_key,
    r.result_id,
    d.driver_key,
    ra.race_key,
    r.constructor_id,
    r.position,
    r.points,
    r.laps,
    r.status
FROM results r
JOIN drivers d ON r.driver_id = d.driver_id
JOIN races ra ON r.race_id = ra.race_id
      `,
      'Model & Test Definition (schema.yml)': `
version: 2

models:
  - name: dim_drivers
    description: "Dimension table containing information about each Formula 1 driver."
    columns:
      - name: driver_key
        description: "The surrogate primary key for the drivers dimension."
        tests:
          - unique
          - not_null
      - name: driver_id
        description: "The natural key for drivers from the source data."
        tests:
          - unique
          - not_null
      - name: driver_nationality
        description: "The nationality of the driver."
        tests:
          - not_null

  - name: fct_results
    description: "Fact table containing race results, linking drivers and races."
    columns:
      - name: result_key
        description: "The surrogate primary key for race results."
        tests:
          - unique
          - not_null
      - name: driver_key
        description: "Foreign key to the dim_drivers table."
        tests:
          - relationships:
              to: ref('dim_drivers')
              field: driver_key
      `
    },

    links: {
      github: 'https://github.com/yourusername/dbt-formula1-analytics-azure',
      demo: 'https://drive.google.com/your-demo-video-link-here',
      documentation: null
    }
  },

  'data-pipeline': {
    id: 'data-pipeline',
    type: 'personal',
    title: 'GCP Analytics Pipeline & Dashboard',
    subtitle: 'Serverless ELT pipeline for SaaS analytics with BigQuery and Looker Studio',
    year: '2025',
    duration: '3 Days',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'Completed',

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

  'databricks-migration': {
    id: 'databricks-migration',
    type: 'personal',
    title: 'Databricks Migration & FinOps Dashboard',
    subtitle: 'From Redshift to Databricks with a focus on cost control',
    year: '2025',
    duration: '1.5 months',
    role: 'Cloud & Data Engineer',
    team: 'Solo project',
    status: 'Completed',

    overview: 'Planned and executed the migration of existing data workloads from AWS Redshift to Databricks. Developed a FinOps dashboard in Power BI to monitor cloud costs and optimize resource utilization on the new platform.',

    problem: 'Traditional cloud data warehouses like Redshift can become costly and inflexible for modern, heterogeneous data workloads (SQL, ML, streaming). Without dedicated FinOps monitoring, companies quickly lose track of costs and cannot leverage potential savings.',

    solution: 'Executed a phased migration of ETL jobs and BI queries to a Databricks Lakehouse architecture on AWS S3. In parallel, a data model was developed in dbt to process Databricks usage logs. The aggregated cost data is visualized in Power BI to identify cost drivers and evaluate cluster efficiency.',

    techStack: {
      'Data Platform': ['Databricks', 'Delta Lake', 'Apache Spark'],
      'Data Transformation': ['dbt Core', 'SQL'],
      'Cloud Infrastructure': ['AWS S3', 'AWS Redshift (Legacy)'],
      'BI & Visualization': ['Power BI'],
      'Concepts': ['FinOps', 'Cloud Migration', 'Data Warehousing']
    },

    architecture: {
      components: [
        { name: 'Legacy System', description: 'Existing ETL processes and tables in AWS Redshift.' },
        { name: 'Migration Path', description: 'Analysis of workloads, translation of Redshift SQL to Spark SQL, implementation in Databricks notebooks.' },
        { name: 'Cost Data Pipeline', description: 'Ingestion and transformation of Databricks usage data (Usage Logs) using dbt.' },
        { name: 'FinOps Dashboard', description: 'Power BI dashboard with drill-down capabilities to analyze costs by user, cluster, and job.' }
      ]
    },

    metrics: {
      'Migrated Workloads': '10+ ETL Jobs',
      'Dashboard KPIs': '5+ (Cost/User, Cluster Uptime)',
      'Identified Savings': '>15% (potential)',
      'Data Sources': 'Databricks System Tables'
    },

    challenges: [
      {
        challenge: 'Handling proprietary SQL functions from Redshift that do not exist in Spark SQL.',
        solution: 'Developed User-Defined Functions (UDFs) in PySpark or reformulated the logic using native Spark functions.'
      },
      {
        challenge: 'Ensuring data consistency between the old and new systems during the migration.',
        solution: 'Implemented automated data reconciliation scripts that compared row counts and key metrics between Redshift and Databricks.'
      }
    ],

    impact: [
      'Created a scalable and flexible data platform for future analytics and ML applications.',
      'Increased transparency of cloud costs through an interactive FinOps dashboard.',
      'Demonstrated a clear migration path for critical data workloads.'
    ],

    learnings: [
      'Strategic planning is the most critical factor in a cloud data platform migration.',
      'FinOps is not just a dashboard, but a cultural shift in handling cloud resources.',
      'dbt is an excellent tool for preparing internal metadata (e.g., logs) for monitoring.'
    ],

    screenshots: [
      { title: 'FinOps Dashboard Overview', url: '/projects/finops-dashboard.png' }
    ],

    codeSnippets: {},

    links: {
      github: 'https://github.com/danielg-gerlach/cloud-migration-project',
      demo: null,
      documentation: null
    }
  },

  'data-modeling-ecommerce': {
    id: 'data-modeling-ecommerce',
    type: 'personal',
    title: 'Data Modeling for an E-Commerce Platform',
    subtitle: 'Designing a scalable DWH with Dimensional Modeling & Data Vault',
    year: '2025',
    duration: '1 month',
    role: 'Data Architect',
    team: 'Solo project',
    status: 'Completed',

    overview: 'Designed and implemented a scalable data model for an e-commerce platform. Applied industry-standard techniques like Dimensional Modeling (star schema) and Slowly Changing Dimensions (SCD), and evaluated Data Vault for mapping complex business relationships.',

    problem: 'E-commerce data is complex and relational (customers, orders, products, shipments). A naive, transactional data model is extremely slow and difficult to understand for analytical queries, severely hindering the creation of reports and analyses.',

    solution: 'Developed a hybrid data model: A core of Data Vault for flexible and auditable storage of raw data (Hubs, Links, Satellites). Building on this, performance-optimized data marts in the form of star schemas (fact & dimension tables) were created for BI analysis of sales and marketing data.',

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
        solution: 'Decided on the order item as the granularity to enable the most detailed analyses. Aggregations at the order level are performed in the BI tool.'
      },
      {
        challenge: 'Correctly mapping the complex logic for populating the SCD Type 2 dimension historically.',
        solution: 'Developed a robust SQL MERGE statement that inserts new records and updates existing ones with validity dates (valid_from, valid_to).'
      }
    ],

    impact: [
      'Created a fundamentally sound, understandable, and high-performance data model as a single source of truth.',
      'Enabled complex historical analyses that were previously not possible (e.g., "How has customer value changed over time?").',
      'Drastically reduced query times for business analysts.'
    ],

    learnings: [
      'Data Vault offers unparalleled flexibility in integrating new data sources, while star schemas are unbeatable for performance.',
      'The clean separation of raw, integrated, and prepared data layers (Data Mart) is crucial for maintainability.',
      'Good data modeling craftsmanship is the foundation of any successful data strategy.'
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
    duration: '1 week',
    role: 'Your Role (Part-time)',
    team: 'Team size/type',
    status: 'Completed',

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
    duration: '2 weeks',
    role: 'Your Role (Part-time)',
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
    duration: '2 weeks',
    role: 'Your Role (Part-time)',
    team: 'Solo',
    status: 'Completed',

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