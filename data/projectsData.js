export const projectsData = {
  'ai-analytics-assistant': {
    id: 'ai-analytics-assistant',
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

  'rag-pipeline-aws': {
    id: 'rag-pipeline-aws',
    title: 'RAG with AWS & Databricks',
    subtitle: 'Building a Q&A bot from documents using vector embeddings',
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

  'manufacturing-eda': {
    id: 'manufacturing-eda',
    title: 'Manufacturing Data Analysis',
    subtitle: 'Exploratory analysis & visualization of manufacturing defect data',
    year: '2024',
    duration: '2 weeks',
    role: 'Data Analyst',
    team: 'Solo project',
    status: 'Completed',

    overview: `Analyzed a manufacturing dataset tracking defects over a 10-day period to uncover insights for process improvement and quality assurance. This project represents my starting point in data analytics, demonstrating fundamental EDA skills and visualization techniques.`,

    problem: `Manufacturing companies need to understand defect patterns to optimize processes and maintain quality control. Without proper analysis, it's difficult to identify root causes and implement targeted improvements.`,

    solution: `Conducted thorough exploratory data analysis using Python, Pandas, and visualization libraries to identify defect patterns, trends, and anomalies that could inform process improvements.`,

    techStack: {
      'Languages': ['Python'],
      'Data Analysis': ['Pandas', 'NumPy'],
      'Visualization': ['Matplotlib', 'Seaborn'],
      'Tools': ['Jupyter Notebooks']
    },

    architecture: {
      components: [
        { name: 'Data Loading', description: 'Efficient data ingestion and initial exploration' },
        { name: 'Data Cleaning', description: 'Handling missing values and outliers' },
        { name: 'Statistical Analysis', description: 'Descriptive statistics and correlations' },
        { name: 'Visualization Suite', description: 'Multiple chart types for different insights' }
      ]
    },

    metrics: {
      'Dataset Size': '10 days',
      'Defect Types': '5 categories',
      'Visualizations': '15+',
      'Insights': '8 key findings',
      'Code Quality': 'Well-documented',
      'Processing Time': '<1s'
    },

    challenges: [
      {
        challenge: 'Limited dataset size for trend analysis',
        solution: 'Applied appropriate statistical methods for small samples'
      },
      {
        challenge: 'Choosing right visualizations for insights',
        solution: 'Tested multiple chart types to find most effective representations'
      }
    ],

    impact: [
      'Identified key periods of high defect rates',
      'Revealed patterns in defect distribution',
      'Provided foundation for process improvement initiatives',
      'Demonstrated data analysis capabilities to stakeholders'
    ],

    learnings: [
      'Importance of thorough exploratory analysis before modeling',
      'Value of clear, interpretable visualizations',
      'Benefits of documenting analysis process',
      'Foundation for more advanced analytics projects'
    ],

    screenshots: [
      { title: 'Defect Trends', url: '/projects/eda-trends.png' },
      { title: 'Distribution Analysis', url: '/projects/eda-distribution.png' },
      { title: 'Correlation Matrix', url: '/projects/eda-correlation.png' }
    ],

    codeSnippets: {
      'Data Analysis': `
  # Analyzing defect patterns over time
  import pandas as pd
  import matplotlib.pyplot as plt
  import seaborn as sns
  
  # Load and explore data
  df = pd.read_csv('manufacturing_defects.csv')
  print(f"Dataset shape: {df.shape}")
  print(f"\\nDefect statistics:\\n{df.describe()}")
  
  # Time series analysis
  df['date'] = pd.to_datetime(df['date'])
  daily_defects = df.groupby('date')['defects'].agg(['sum', 'mean', 'std'])
  
  # Visualize trends
  fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8))
  
  # Daily defect counts
  ax1.plot(daily_defects.index, daily_defects['sum'], marker='o')
  ax1.set_title('Daily Defect Counts')
  ax1.set_ylabel('Total Defects')
  
  # Rolling average
  rolling_avg = daily_defects['sum'].rolling(window=3).mean()
  ax2.plot(daily_defects.index, daily_defects['sum'], alpha=0.5, label='Daily')
  ax2.plot(daily_defects.index, rolling_avg, color='red', label='3-day MA')
  ax2.set_title('Defect Trends with Moving Average')
  ax2.legend()
  
  plt.tight_layout()
  plt.show()
        `
    },

    links: {
      github: 'https://github.com/danielg-gerlach/EDA_Manufacturing',
      demo: 'https://drive.google.com/your-demo-video-link-here',
      documentation: null
    }
  },

  'energy-database': {
    id: 'energy-database',
    title: 'Relational Database Design',
    subtitle: 'Energy supplier database for billing & account management',
    year: '2024',
    duration: '2 weeks',
    role: 'Database Designer',
    team: 'Solo project',
    status: 'Completed',

    overview: `Designed and implemented a relational database for an energy supplier using MySQL. The project focuses on operational data modeling to streamline customer account management, contracts, and a detailed billing and payment system, ensuring data consistency and operational efficiency.`,

    problem: `Energy suppliers require robust data management systems to handle customer accounts, contracts, billing, and payments. A poorly designed database can lead to data inconsistencies, inaccurate billing, and an inability to scale operations.`,

    solution: `Created a normalized relational database (3NF) with well-defined foreign key constraints and status enumerations to ensure data integrity and optimal performance for an energy supplier's core business operations.`,

    techStack: {
      'Database': ['MySQL'],
      'Languages': ['SQL'],
      'Modeling': ['ERD', 'Normalization (3NF)'],
      'Tools': ['MySQL Workbench']
    },

    architecture: {
      components: [
        { name: 'Customer & Account Management', description: 'Tables for customer profiles, addresses, and accounts.' },
        { name: 'Products & Contracts', description: 'Manages energy products (e.g., electricity, gas) and customer contracts.' },
        { name: 'Billing & Invoicing', description: 'Detailed schema for generating bills and itemizing charges.' },
        { name: 'Payment Processing', description: 'Tracks payments against specific bills and payment methods.' }
      ]
    },

    metrics: {
      'Tables': '8',
      'Relationships': '7',
      'Normal Form': '3NF',
      'Referential Integrity': 'ON DELETE RESTRICT',
      'Data Domains': 'Customer, Billing, Contracts',
      'Query Performance': '< 100ms'
    },

    challenges: [
      {
        challenge: 'Designing a flexible billing schema',
        solution: 'Created separate `bill` and `bill_item` tables to allow for multiple line items per bill, accommodating various charges like usage, fees, and taxes.'
      },
      {
        challenge: 'Ensuring data integrity during operations',
        solution: 'Used strict `FOREIGN KEY` constraints (`ON DELETE RESTRICT`) to prevent orphaned records, such as deleting a customer who still has active accounts.'
      }
    ],

    impact: [
      'Enabled efficient and accurate customer account management.',
      'Provided a clear and extensible schema for billing and payments.',
      'Guaranteed data consistency with strong referential integrity.',
      'Created a solid OLTP foundation for future analytics.'
    ],

    learnings: [
      'The importance of 3rd Normal Form (3NF) for reducing data redundancy.',
      'How to use ENUM types for state management (e.g., account status, bill status).',
      'The practical implications of choosing cascading rules like `ON DELETE RESTRICT`.',
      'Balancing normalization with the practical needs of a business application.'
    ],

    screenshots: [
      { title: 'ERD Diagram', url: '/projects/rdb-erd.png' },
      { title: 'Schema Design', url: '/projects/rdb-schema.png' }
    ],

    codeSnippets: {
      'Schema Creation': `
-- Customer Table with Foreign Key
CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    address_id INT NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address(address_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Bill Table linked to an Account
CREATE TABLE bill (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    bill_status ENUM('issued', 'paid', 'overdue') DEFAULT 'issued',
    FOREIGN KEY (account_id) REFERENCES account(account_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
        `,
      'Sample Data Insertion': `
-- Create a complete billing cycle for a customer
INSERT INTO address (street_name, postal_code, state, country)
VALUES ('123 Main St', '12345', 'Stateville', 'Countryland');

INSERT INTO customer (first_name, last_name, email, address_id)
VALUES ('John', 'Doe', 'john.doe@example.com', 1);

INSERT INTO account (customer_id, account_number)
VALUES (1, 'ACC1001');

INSERT INTO bill (account_id, billing_period_start, billing_period_end, bill_issue_date, bill_due_date, total_amount)
VALUES (1, '2024-01-01', '2024-01-31', '2024-02-01', '2024-02-15', 100.00);

INSERT INTO bill_item (bill_id, description, quantity, unit_price)
VALUES (1, 'Electricity Usage January', 1000.00, 0.10);

INSERT INTO payment (bill_id, payment_method, amount)
VALUES (1, 'credit_card', 100.00);
        `
    },

    links: {
      github: 'https://github.com/danielg-gerlach/energy_supplier_db',
      demo: 'https://drive.google.com/your-demo-video-link-here',
      documentation: null
    }
  },
}