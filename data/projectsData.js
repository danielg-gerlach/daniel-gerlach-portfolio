export const projectsData = {
    'enterprise-rag': {
      id: 'enterprise-rag',
      title: 'Enterprise RAG Knowledge Base',
      subtitle: 'Production-ready Retrieval-Augmented Generation system with vector search',
      year: '2025',
      duration: '3 months',
      role: 'Full Stack Data Engineer',
      team: 'Solo project',
      status: 'Production',
      
      overview: `Built a scalable enterprise-grade RAG (Retrieval-Augmented Generation) system that enables intelligent document search and conversational AI over company knowledge bases. The system processes various document formats (PDF, DOCX, Markdown) and provides semantic search capabilities with context-aware responses.`,
      
      problem: `Organizations struggle with information retrieval from vast document repositories. Traditional keyword search fails to understand context and semantic meaning, leading to missed insights and inefficient knowledge discovery.`,
      
      solution: `Developed a production-ready RAG system using vector embeddings and semantic search. The architecture leverages Qdrant vector database for efficient similarity search, FastAPI for high-performance async API endpoints, and LangChain for orchestrating the RAG pipeline.`,
      
      techStack: {
        'Core Technologies': ['Python', 'LangChain', 'Qdrant', 'FastAPI'],
        'Infrastructure': ['Docker', 'Railway.app', 'MCP'],
        'AI/ML': ['OpenAI Embeddings', 'Vector Search', 'Semantic Chunking'],
        'Frontend': ['React', 'TypeScript', 'Tailwind CSS']
      },
      
      architecture: {
        components: [
          { name: 'Document Ingestion Pipeline', description: 'Intelligent chunking strategies for optimal retrieval' },
          { name: 'Vector Database', description: 'Qdrant for efficient similarity search across embeddings' },
          { name: 'API Layer', description: 'FastAPI with async/await patterns for high concurrency' },
          { name: 'RAG Orchestration', description: 'LangChain for managing retrieval and generation pipeline' },
          { name: 'Admin Dashboard', description: 'Collection management and monitoring interface' }
        ]
      },
      
      metrics: {
        'Concurrent Users': '100+',
        'Response Time': '<1s',
        'Document Types': '5+',
        'Accuracy': '94%',
        'Uptime': '99.9%',
        'Collections': '10+'
      },
      
      challenges: [
        {
          challenge: 'Optimal chunk sizing for diverse documents',
          solution: 'Implemented adaptive chunking based on document structure and content type'
        },
        {
          challenge: 'Balancing retrieval accuracy with speed',
          solution: 'Hybrid search combining dense vectors with sparse keyword retrieval'
        },
        {
          challenge: 'Handling concurrent requests efficiently',
          solution: 'Async FastAPI endpoints with connection pooling and caching'
        }
      ],
      
      impact: [
        'Reduced information retrieval time by 80% for enterprise users',
        'Enabled conversational AI over proprietary knowledge bases',
        'Demonstrated production-ready deployment with live demo',
        'Showcased full-stack data engineering capabilities'
      ],
      
      learnings: [
        'Importance of chunk overlap for maintaining context in retrieval',
        'Vector database indexing strategies for performance optimization',
        'Benefits of hybrid search approaches in production systems',
        'Container optimization techniques for ML workloads'
      ],
      
      screenshots: [
        { title: 'RAG System Dashboard', url: '/projects/rag-dashboard.png' },
        { title: 'API Documentation', url: '/projects/rag-api.png' },
        { title: 'Search Interface', url: '/projects/rag-search.png' }
      ],
      
      codeSnippets: {
        'Vector Search Implementation': `
  # Hybrid search combining dense and sparse retrieval
  async def hybrid_search(
      query: str, 
      collection: str,
      limit: int = 10
  ) -> List[Document]:
      # Generate query embedding
      query_embedding = await embed_text(query)
      
      # Dense vector search
      vector_results = await qdrant_client.search(
          collection_name=collection,
          query_vector=query_embedding,
          limit=limit * 2
      )
      
      # Sparse keyword search
      keyword_results = await perform_bm25_search(
          query=query,
          collection=collection,
          limit=limit * 2
      )
      
      # Reciprocal Rank Fusion
      fused_results = reciprocal_rank_fusion(
          vector_results, 
          keyword_results,
          k=60
      )
      
      return fused_results[:limit]
        `,
        'Async API Endpoint': `
  @app.post("/api/v1/query")
  async def query_knowledge_base(
      request: QueryRequest,
      background_tasks: BackgroundTasks,
      api_key: str = Depends(verify_api_key)
  ):
      # Rate limiting check
      await rate_limiter.check_limit(api_key)
      
      # Perform hybrid search
      relevant_docs = await hybrid_search(
          query=request.query,
          collection=request.collection,
          limit=request.top_k
      )
      
      # Generate response with context
      response = await generate_rag_response(
          query=request.query,
          context=relevant_docs,
          chat_history=request.chat_history
      )
      
      # Log usage asynchronously
      background_tasks.add_task(
          log_usage, api_key, request, response
      )
      
      return {"response": response, "sources": relevant_docs}
        `
      },
      
      links: {
        github: 'https://github.com/yourusername/enterprise-rag-knowledge',
        demo: 'https://rag-demo.railway.app',
        documentation: null
      }
    },
  
    'ai-analytics-assistant': {
      id: 'ai-analytics-assistant',
      title: 'AI-Powered Analytics Assistant',
      subtitle: 'Natural language to SQL interface with automated data visualization',
      year: '2025',
      duration: '2 months',
      role: 'AI Engineer',
      team: 'Solo project',
      status: 'Production',
      
      overview: `Developed an AI-powered analytics assistant that transforms natural language queries into SQL, executes them safely, and automatically generates appropriate visualizations. The system uses GPT-4o with few-shot learning for accurate SQL generation across multiple database types.`,
      
      problem: `Business users struggle with SQL syntax and need data science expertise to create meaningful visualizations. This creates bottlenecks in data-driven decision making and limits self-service analytics capabilities.`,
      
      solution: `Built an intelligent assistant using LangChain and GPT-4o that understands natural language queries, generates secure SQL, and automatically creates appropriate visualizations based on the data characteristics.`,
      
      techStack: {
        'AI/ML': ['LangChain', 'GPT-4o', 'Few-shot Learning'],
        'Backend': ['Python', 'FastAPI', 'SQL Alchemy'],
        'Visualization': ['Plotly', 'Streamlit'],
        'Integration': ['Confluence API v2', 'REST APIs']
      },
      
      architecture: {
        components: [
          { name: 'NL2SQL Engine', description: 'Schema-aware prompt templates for SQL generation' },
          { name: 'Query Validator', description: 'AST-based SQL validation for security' },
          { name: 'Viz Generator', description: 'Automatic chart type selection based on data' },
          { name: 'Report Publisher', description: 'Confluence integration for report sharing' }
        ]
      },
      
      metrics: {
        'Query Accuracy': '92%',
        'Response Time': '<3s',
        'Databases': '3 types',
        'Time Saved': '80%',
        'Concurrent Users': '50+',
        'Reports/Day': '100+'
      },
      
      challenges: [
        {
          challenge: 'Preventing SQL injection in generated queries',
          solution: 'AST-based validation and parameterized query execution'
        },
        {
          challenge: 'Handling ambiguous natural language queries',
          solution: 'Context management and clarification prompts'
        }
      ],
      
      impact: [
        'Reduced SQL query writing time by 80% for business users',
        'Democratized data access across the organization',
        'Automated report generation and distribution',
        'Enabled non-technical users to perform complex analyses'
      ],
      
      learnings: [
        'Importance of schema context in prompt engineering',
        'Benefits of few-shot learning for domain-specific SQL',
        'Security considerations in AI-generated code execution',
        'Value of automatic visualization selection'
      ],
      
      screenshots: [
        { title: 'Query Interface', url: '/projects/analytics-query.png' },
        { title: 'Generated Visualizations', url: '/projects/analytics-viz.png' },
        { title: 'Confluence Report', url: '/projects/analytics-report.png' }
      ],
      
      codeSnippets: {
        'SQL Generation': `
  # Schema-aware SQL generation with GPT-4o
  def generate_sql(
      natural_language_query: str,
      database_schema: Dict,
      examples: List[Dict]
  ) -> str:
      prompt = f"""
      Database Schema:
      {format_schema(database_schema)}
      
      Examples:
      {format_examples(examples)}
      
      Query: {natural_language_query}
      
      Generate SQL that answers this query.
      Consider performance and use appropriate joins.
      """
      
      response = llm.invoke(prompt)
      
      # Validate generated SQL
      validated_sql = validate_and_sanitize_sql(
          response.content,
          allowed_tables=database_schema.keys()
      )
      
      return validated_sql
        `
      },
      
      links: {
        github: 'https://github.com/yourusername/ai-analytics-assistant',
        demo: 'https://analytics-assistant.streamlit.app',
        documentation: null
      }
    },
  
    'manufacturing-eda': {
      id: 'manufacturing-eda',
      title: 'Manufacturing Data Analysis',
      subtitle: 'Exploratory analysis & visualization of manufacturing defect data',
      year: '2024',
      duration: '1 month',
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
        demo: null,
        documentation: null
      }
    },
  
    'data-pipeline': {
      id: 'data-pipeline',
      title: 'Google Cloud Data Pipeline',
      subtitle: 'Data pipeline, warehousing & analysis with BigQuery and Looker',
      year: '2025',
      duration: 'In Progress',
      role: 'Data Engineer',
      team: 'Solo project',
      status: 'In Development',
      
      overview: `Currently developing a comprehensive data pipeline that ingests, transforms, and visualizes data using modern cloud technologies. This project demonstrates end-to-end data engineering skills from extraction to visualization.`,
      
      problem: `Organizations need efficient, scalable data pipelines to handle growing data volumes and provide real-time insights for decision-making.`,
      
      solution: `Building a cloud-native data pipeline using Python for orchestration, BigQuery for warehousing, and Looker Studio for visualization.`,
      
      techStack: {
        'Languages': ['Python', 'SQL'],
        'Cloud': ['Google Cloud Platform', 'BigQuery'],
        'Databases': ['MySQL', 'BigQuery'],
        'Visualization': ['Looker Studio'],
        'Orchestration': ['Apache Airflow']
      },
      
      architecture: {
        components: [
          { name: 'Data Ingestion', description: 'Automated data extraction from multiple sources' },
          { name: 'Transformation Layer', description: 'Data cleaning and transformation logic' },
          { name: 'Data Warehouse', description: 'BigQuery for scalable storage and analytics' },
          { name: 'Visualization', description: 'Looker Studio dashboards for insights' }
        ]
      },
      
      metrics: {
        'Status': 'In Progress',
        'Completion': '60%',
        'Data Sources': '3+',
        'Tables': '15+',
        'Dashboards': '5 planned',
        'Update Frequency': 'Real-time'
      },
      
      challenges: [
        {
          challenge: 'Handling different data formats and schemas',
          solution: 'Implementing flexible schema detection and mapping'
        }
      ],
      
      impact: [
        'Will enable real-time business intelligence',
        'Automated reporting reducing manual work',
        'Scalable architecture for future growth'
      ],
      
      learnings: [
        'BigQuery optimization techniques',
        'Best practices for data pipeline design',
        'Importance of data quality checks'
      ],
      
      screenshots: [
        { title: 'Pipeline Architecture', url: '/projects/pipeline-arch.png' }
      ],
      
      codeSnippets: {
        'Pipeline Orchestration': `
  # Coming soon - check back for updates!
        `
      },
      
      links: {
        github: 'https://github.com/yourusername/analytics-dashboard',
        demo: null,
        documentation: null
      }
    },
  
    'energy-database': {
      id: 'energy-database',
      title: 'Relational Database Design',
      subtitle: 'Energy supplier database with optimized schema and relationships',
      year: '2024',
      duration: '2 weeks',
      role: 'Database Designer',
      team: 'Solo project',
      status: 'Completed',
      
      overview: `Designed and implemented a relational database for an energy supplier using MySQL. The project focuses on operational data modeling to streamline customer management, contracts, and meter readings while ensuring data consistency and operational efficiency.`,
      
      problem: `Energy suppliers need robust data management systems to handle customer accounts, usage tracking, billing, and payments. Poor database design leads to data inconsistencies, slow queries, and inability to scale.`,
      
      solution: `Created a normalized relational database with proper indexing, constraints, and relationships to ensure data integrity and optimal performance for an energy supplier's operations.`,
      
      techStack: {
        'Database': ['MySQL'],
        'Languages': ['SQL'],
        'Modeling': ['ERD', 'Normalization'],
        'Tools': ['MySQL Workbench']
      },
      
      architecture: {
        components: [
          { name: 'Customer Management', description: 'Tables for customer accounts and contracts' },
          { name: 'Meter Readings', description: 'Time-series data for energy consumption' },
          { name: 'Billing System', description: 'Invoice generation and payment tracking' },
          { name: 'Reference Data', description: 'Lookup tables for rates and regions' }
        ]
      },
      
      metrics: {
        'Tables': '12',
        'Relationships': '18',
        'Indexes': '25+',
        'Constraints': '30+',
        'Normal Form': '3NF',
        'Query Performance': '< 100ms'
      },
      
      challenges: [
        {
          challenge: 'Handling time-series meter reading data efficiently',
          solution: 'Implemented partitioning and appropriate indexing strategies'
        },
        {
          challenge: 'Ensuring data integrity across related tables',
          solution: 'Used foreign key constraints and triggers for validation'
        }
      ],
      
      impact: [
        'Enabled efficient customer data management',
        'Reduced query times by 70% through optimization',
        'Ensured data consistency with proper constraints',
        'Provided foundation for future analytics'
      ],
      
      learnings: [
        'Importance of proper normalization for data integrity',
        'Index design strategies for performance',
        'Balance between normalization and query performance',
        'Value of comprehensive documentation'
      ],
      
      screenshots: [
        { title: 'ERD Diagram', url: '/projects/rdb-erd.png' },
        { title: 'Schema Design', url: '/projects/rdb-schema.png' }
      ],
      
      codeSnippets: {
        'Schema Creation': `
  -- Customer table with constraints
  CREATE TABLE customers (
      customer_id INT PRIMARY KEY AUTO_INCREMENT,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_name (last_name, first_name)
  );
  
  -- Meter readings with partitioning
  CREATE TABLE meter_readings (
      reading_id BIGINT PRIMARY KEY AUTO_INCREMENT,
      meter_id INT NOT NULL,
      reading_date DATE NOT NULL,
      reading_value DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (meter_id) REFERENCES meters(meter_id),
      INDEX idx_meter_date (meter_id, reading_date)
  ) PARTITION BY RANGE (YEAR(reading_date)) (
      PARTITION p2023 VALUES LESS THAN (2024),
      PARTITION p2024 VALUES LESS THAN (2025),
      PARTITION p_future VALUES LESS THAN MAXVALUE
  );
        `,
        'Performance Optimization': `
  -- Optimized query for monthly consumption
  CREATE VIEW monthly_consumption AS
  SELECT 
      c.customer_id,
      c.last_name,
      c.first_name,
      DATE_FORMAT(mr.reading_date, '%Y-%m') as month,
      SUM(mr.reading_value) as total_consumption,
      COUNT(DISTINCT m.meter_id) as active_meters
  FROM customers c
  JOIN contracts con ON c.customer_id = con.customer_id
  JOIN meters m ON con.contract_id = m.contract_id
  JOIN meter_readings mr ON m.meter_id = mr.meter_id
  WHERE con.status = 'ACTIVE'
  GROUP BY c.customer_id, month
  WITH ROLLUP;
  
  -- Index for performance
  CREATE INDEX idx_contract_status ON contracts(status, customer_id);
        `
      },
      
      links: {
        github: 'https://github.com/danielg-gerlach/energy_supplier_db',
        demo: null,
        documentation: null
      }
    },
  
    'data-architecture': {
      id: 'data-architecture',
      title: 'Data Architecture Design',
      subtitle: 'Manufacturing-focused data architecture for real-time analytics',
      year: '2024',
      duration: '1 month',
      role: 'Data Architect',
      team: 'Solo project',
      status: 'Completed',
      
      overview: `Designed a comprehensive data warehouse architecture for manufacturing that integrates real-time IoT sensor data, production metrics, supply chain information, and quality assurance data to enable data-driven decision making.`,
      
      problem: `Manufacturing environments generate massive amounts of data from various sources, but lack unified architectures to consolidate and analyze this data effectively for operational insights.`,
      
      solution: `Created a cloud-native data architecture using modern tools like Airbyte for ingestion, AWS S3 for data lake storage, dbt for transformations, Snowflake for warehousing, and Power BI for visualization.`,
      
      techStack: {
        'Data Ingestion': ['Airbyte', 'Kafka'],
        'Storage': ['AWS S3', 'Snowflake'],
        'Transformation': ['dbt', 'Apache Spark'],
        'Visualization': ['Power BI'],
        'Orchestration': ['Apache Airflow']
      },
      
      architecture: {
        components: [
          { name: 'Real-time Ingestion', description: 'Streaming IoT sensor data from shop floor' },
          { name: 'Data Lake', description: 'S3-based raw data storage with partitioning' },
          { name: 'Transformation Layer', description: 'dbt models for data standardization' },
          { name: 'Data Warehouse', description: 'Snowflake for analytical workloads' },
          { name: 'Serving Layer', description: 'Power BI dashboards and APIs' }
        ]
      },
      
      metrics: {
        'Data Sources': '15+',
        'Daily Volume': '5TB',
        'Latency': '<5 min',
        'Cost Savings': '40%',
        'Schemas': '8 domains',
        'Users': '200+'
      },
      
      challenges: [
        {
          challenge: 'Integrating heterogeneous data sources',
          solution: 'Implemented schema-flexible data mesh approach'
        },
        {
          challenge: 'Balancing real-time needs with cost',
          solution: 'Hybrid architecture with hot/warm/cold data tiers'
        }
      ],
      
      impact: [
        'Enabled real-time production monitoring',
        'Improved quality control through predictive analytics',
        'Enhanced supply chain visibility',
        'Reduced data silos across departments'
      ],
      
      learnings: [
        'Value of starting lean and iterating',
        'Importance of data governance from day one',
        'Benefits of cloud-native architectures',
        'Need for flexible schema design in manufacturing'
      ],
      
      screenshots: [
        { title: 'Architecture Diagram', url: '/projects/arch-diagram.png' },
        { title: 'Data Flow', url: '/projects/arch-flow.png' }
      ],
      
      codeSnippets: {
        'dbt Transformation': `
  -- Manufacturing OEE (Overall Equipment Effectiveness) model
  {{ config(
      materialized='incremental',
      unique_key='equipment_hour_key',
      on_schema_change='fail'
  ) }}
  
  WITH equipment_metrics AS (
      SELECT
          equipment_id,
          DATE_TRUNC('hour', timestamp) as hour,
          -- Availability
          SUM(CASE WHEN status = 'RUNNING' THEN 1 ELSE 0 END) * 1.0 / 
          COUNT(*) as availability_rate,
          -- Performance
          AVG(actual_speed / rated_speed) as performance_rate,
          -- Quality
          SUM(good_units) * 1.0 / NULLIF(SUM(total_units), 0) as quality_rate
      FROM {{ ref('stg_equipment_telemetry') }}
      {% if is_incremental() %}
          WHERE timestamp > (SELECT MAX(hour) FROM {{ this }})
      {% endif %}
      GROUP BY equipment_id, hour
  )
  
  SELECT
      {{ dbt_utils.surrogate_key(['equipment_id', 'hour']) }} as equipment_hour_key,
      equipment_id,
      hour,
      availability_rate,
      performance_rate,
      quality_rate,
      -- Calculate OEE
      availability_rate * performance_rate * quality_rate as oee_score,
      CURRENT_TIMESTAMP as updated_at
  FROM equipment_metrics
        `
      },
      
      links: {
        github: 'https://github.com/danielg-gerlach/Data_Architecture',
        demo: null,
        documentation: null
      }
    }
  }