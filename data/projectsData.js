export const projectsData = {
  // ============================================
  // PERSONAL PROJECTS
  // ============================================
  
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

  'rag-technical-docs': {
    id: 'rag-technical-docs',
    type: 'personal',
    title: 'RAG Technical Documentation Assistant',
    subtitle: 'Retrieval-Augmented Generation system for querying technical documentation using Gemini and ChromaDB',
    year: '2025',
    role: 'AI Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Building a RAG pipeline that ingests technical documentation (API docs, engineering specs, whitepapers), chunks and embeds them into ChromaDB, and uses Gemini to answer technical questions with source citations. Implements semantic search, context window optimization, and evaluation metrics for retrieval quality.',

    overview: `Developing a production-ready RAG (Retrieval-Augmented Generation) system designed for technical documentation. Engineers can upload API documentation, system specs, or technical whitepapers and ask natural language questions. The system chunks documents intelligently, generates embeddings, stores them in ChromaDB for semantic search, retrieves relevant context, and uses Google Gemini to generate accurate technical answers with source citations.`,

    problem: `Engineers waste hours searching through scattered technical documentation. LLMs have knowledge cutoffs and can't access internal docs or recent API changes. Traditional keyword search misses semantic meaning - searching "authentication" won't find docs about "OAuth tokens". Simply pasting entire docs into LLM context is expensive, hits token limits, and reduces answer quality for specific technical questions.`,

    solution: `Building a RAG pipeline with four stages: (1) Document ingestion with intelligent chunking that preserves code blocks and technical context, (2) Embedding generation and vector storage in ChromaDB, (3) Semantic retrieval of the most relevant chunks for each query, (4) LLM response generation with Gemini using retrieved context and source attribution. Optimized for technical content including code snippets, API references, and configuration examples.`,

    techStack: {
      'LLM & Embeddings': ['Google Gemini API', 'Gemini Embedding Model'],
      'Vector Database': ['ChromaDB'],
      'Document Processing': ['PyPDF2', 'LangChain Text Splitters', 'BeautifulSoup'],
      'Backend': ['FastAPI', 'Python'],
      'Frontend': ['Streamlit'],
      'Evaluation': ['RAGAS', 'Custom metrics']
    },

    architecture: {
      components: [
        { name: 'Document Processor', description: 'Extracts text from PDFs, Markdown, and HTML. Uses custom splitter that preserves code blocks, tables, and technical structure during chunking.' },
        { name: 'Embedding Pipeline', description: 'Generates vector embeddings using Gemini embedding model with task_type optimized for retrieval. Handles batching for large document sets.' },
        { name: 'Vector Store', description: 'ChromaDB instance with persistent storage, metadata filtering by doc type and section, and similarity search with configurable top-k retrieval.' },
        { name: 'Retrieval Engine', description: 'Semantic search with MMR (Maximum Marginal Relevance) for diverse results. Re-ranking for improved relevance on technical queries.' },
        { name: 'Generation Layer', description: 'Gemini LLM with custom prompt template for technical Q&A. Enforces citation of sources, handles code formatting, and manages context window limits.' },
        { name: 'Evaluation Module', description: 'Measures retrieval precision, answer faithfulness, and technical accuracy using RAGAS framework and custom metrics.' }
      ]
    },

    metrics: {
      'Chunk Size': '512 tokens (configurable)',
      'Chunk Overlap': '50 tokens',
      'Top-K Retrieval': '5 chunks default',
      'Embedding Dimensions': '768',
      'Response Time': '<3s end-to-end',
      'Supported Formats': 'PDF, Markdown, HTML, TXT'
    },

    challenges: [
      {
        challenge: 'Preserving code blocks and technical formatting during chunking.',
        solution: 'Implementing custom text splitter that detects code fences (```) and keeps code blocks intact. Falls back to splitting at paragraph boundaries rather than mid-sentence for technical prose.'
      },
      {
        challenge: 'Determining optimal chunk size that balances context preservation with retrieval precision.',
        solution: 'Implementing configurable chunking with recursive text splitter. Testing chunk sizes from 256-1024 tokens and measuring retrieval quality. Using overlap to prevent context loss at chunk boundaries.'
      },
      {
        challenge: 'Handling queries that require information from multiple documentation sections.',
        solution: 'Using MMR-based retrieval to get diverse chunks rather than semantically similar ones. Implementing iterative retrieval for complex queries that synthesize multiple sources.'
      },
      {
        challenge: 'Ensuring LLM answers are grounded in retrieved context and not hallucinated.',
        solution: 'Prompt engineering that explicitly instructs citation of sources. Post-processing to verify claims against retrieved chunks. Implementing faithfulness scoring in evaluation pipeline.'
      },
      {
        challenge: 'Managing ChromaDB collection size and query performance as document count grows.',
        solution: 'Implementing collection partitioning by document type, metadata filtering to narrow search scope, and periodic index optimization.'
      }
    ],

    impact: [
      'Enables engineers to query technical documentation in natural language, reducing time to find answers from 15+ minutes to seconds',
      'Provides traceable answers with source citations, building trust in AI-generated technical guidance',
      'Handles internal documentation that public LLMs cannot access',
      'Creates reusable RAG pipeline pattern applicable to any technical documentation use case'
    ],

    learnings: [
      'Chunking strategy has massive impact on retrieval quality - too small loses context, too large reduces precision',
      'Technical content requires special handling - code blocks, tables, and structured data need custom splitting logic',
      'Embedding model choice matters as much as LLM choice for RAG quality',
      'Evaluation is critical - without metrics like faithfulness and relevance, you cannot improve the system systematically',
      'Hybrid search (semantic + keyword) often outperforms pure semantic search for specific technical terms and function names'
    ],

    screenshots: [
      { title: 'Document Upload & Processing', url: '/projects/rag-upload.png' },
      { title: 'Technical Q&A Interface with Citations', url: '/projects/rag-qa.png' },
      { title: 'Retrieval Evaluation Dashboard', url: '/projects/rag-eval.png' }
    ],

    codeSnippets: {
      'Technical Document Chunking': `
# Intelligent chunking that preserves code blocks and technical structure
from langchain.text_splitter import RecursiveCharacterTextSplitter
from PyPDF2 import PdfReader
import re

class TechnicalDocumentChunker:
    def __init__(self, chunk_size: int = 512, chunk_overlap: int = 50):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        
        # Custom separators prioritizing technical document structure
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            separators=[
                "\\n## ",      # Markdown H2 headers
                "\\n### ",     # Markdown H3 headers
                "\\n\\n",      # Paragraph breaks
                "\\n",         # Line breaks
                ". ",          # Sentences
                " ",           # Words
                ""
            ]
        )
    
    def _extract_code_blocks(self, text: str) -> tuple[str, dict]:
        """Extract code blocks and replace with placeholders."""
        code_blocks = {}
        pattern = r'\`\`\`[\w]*\n[\s\S]*?\`\`\`'
        
        def replacer(match):
            placeholder = f"__CODE_BLOCK_{len(code_blocks)}__"
            code_blocks[placeholder] = match.group(0)
            return placeholder
        
        processed_text = re.sub(pattern, replacer, text)
        return processed_text, code_blocks
    
    def _restore_code_blocks(self, chunks: list[str], code_blocks: dict) -> list[str]:
        """Restore code blocks in chunks."""
        restored = []
        for chunk in chunks:
            for placeholder, code in code_blocks.items():
                chunk = chunk.replace(placeholder, code)
            restored.append(chunk)
        return restored
    
    def chunk_document(self, text: str, metadata: dict) -> list[dict]:
        """
        Chunk technical document while preserving code blocks.
        Returns list of chunks with metadata.
        """
        # Extract code blocks to prevent splitting them
        processed_text, code_blocks = self._extract_code_blocks(text)
        
        # Split text
        raw_chunks = self.splitter.split_text(processed_text)
        
        # Restore code blocks
        chunks = self._restore_code_blocks(raw_chunks, code_blocks)
        
        # Add metadata to each chunk
        return [
            {
                "text": chunk,
                "metadata": {
                    **metadata,
                    "chunk_index": i,
                    "has_code": "\`\`\`" in chunk
                }
            }
            for i, chunk in enumerate(chunks)
        ]
`,

      'ChromaDB Vector Store': `
# Vector storage and retrieval with ChromaDB
import chromadb
from chromadb.config import Settings
import google.generativeai as genai

class TechnicalDocsVectorStore:
    def __init__(self, collection_name: str = "technical_docs"):
        self.client = chromadb.PersistentClient(
            path="./chroma_db",
            settings=Settings(anonymized_telemetry=False)
        )
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}
        )
        
        # Configure Gemini
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    
    def add_documents(self, chunks: list[dict]):
        """Embed and store document chunks."""
        texts = [c["text"] for c in chunks]
        metadatas = [c["metadata"] for c in chunks]
        ids = [f"chunk_{i}_{c['metadata'].get('doc_name', 'unknown')}" 
               for i, c in enumerate(chunks)]
        
        # Generate embeddings with Gemini
        embeddings = self._embed_texts(texts)
        
        self.collection.add(
            documents=texts,
            embeddings=embeddings,
            metadatas=metadatas,
            ids=ids
        )
        
        return len(chunks)
    
    def query(self, question: str, top_k: int = 5, 
              filter_dict: dict = None) -> list[dict]:
        """Retrieve most relevant chunks for a technical question."""
        query_embedding = self._embed_texts([question])[0]
        
        query_params = {
            "query_embeddings": [query_embedding],
            "n_results": top_k,
            "include": ["documents", "metadatas", "distances"]
        }
        
        if filter_dict:
            query_params["where"] = filter_dict
        
        results = self.collection.query(**query_params)
        
        return [
            {
                "text": doc,
                "metadata": meta,
                "relevance_score": 1 - dist  # Convert distance to similarity
            }
            for doc, meta, dist in zip(
                results["documents"][0],
                results["metadatas"][0],
                results["distances"][0]
            )
        ]
    
    def _embed_texts(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings using Gemini."""
        embeddings = []
        for text in texts:
            result = genai.embed_content(
                model="models/embedding-001",
                content=text,
                task_type="retrieval_document"
            )
            embeddings.append(result["embedding"])
        return embeddings
`,

      'RAG Query Pipeline': `
# Complete RAG pipeline for technical documentation Q&A
import google.generativeai as genai

class TechnicalDocsRAG:
    def __init__(self, vector_store: TechnicalDocsVectorStore):
        self.vector_store = vector_store
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        
    def query(self, question: str, doc_filter: dict = None) -> dict:
        """
        Full RAG pipeline: retrieve context and generate technical answer.
        """
        # Step 1: Retrieve relevant chunks
        retrieved = self.vector_store.query(
            question, 
            top_k=5,
            filter_dict=doc_filter
        )
        
        if not retrieved:
            return {
                "answer": "No relevant documentation found for this question.",
                "sources": []
            }
        
        # Step 2: Build context with source tracking
        context_parts = []
        for i, chunk in enumerate(retrieved):
            doc_name = chunk['metadata'].get('doc_name', 'Unknown')
            section = chunk['metadata'].get('section', '')
            source_label = f"[Source {i+1}: {doc_name}"
            if section:
                source_label += f" - {section}"
            source_label += "]"
            context_parts.append(f"{source_label}\\n{chunk['text']}")
        
        context = "\\n\\n---\\n\\n".join(context_parts)
        
        # Step 3: Generate answer with technical prompt
        prompt = f"""You are a technical documentation assistant. Answer the question based ONLY on the provided documentation context.

Rules:
- Always cite your sources using [Source N] notation
- Preserve code formatting using markdown code blocks
- If the documentation doesn't contain enough information, say so clearly
- Be precise and technical in your explanations

Documentation Context:
{context}

Question: {question}

Technical Answer:"""

        response = self.model.generate_content(prompt)
        
        return {
            "answer": response.text,
            "sources": [
                {
                    "doc_name": c["metadata"].get("doc_name", "Unknown"),
                    "section": c["metadata"].get("section", ""),
                    "text_preview": c["text"][:200] + "...",
                    "relevance_score": round(c["relevance_score"], 3),
                    "has_code": c["metadata"].get("has_code", False)
                }
                for c in retrieved
            ],
            "chunks_retrieved": len(retrieved)
        }
`
    },

    links: {
      github: 'https://github.com/danielg-gerlach/rag-technical-docs',
      demo: null,
      documentation: null
    }
  },

  'snowflake-saas-dwh': {
    id: 'snowflake-saas-dwh',
    type: 'personal',
    title: 'Snowflake SaaS Analytics Data Warehouse',
    subtitle: 'Production-grade dimensional data warehouse for SaaS product analytics with SCD Type 2, incremental loads, and dbt',
    year: '2025',
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

  'iot-streaming-pipeline': {
    id: 'iot-streaming-pipeline',
    type: 'personal',
    title: 'IoT Real-Time Streaming Analytics Pipeline',
    subtitle: 'End-to-end streaming pipeline for IoT sensor data with Kafka, Spark Structured Streaming, and Delta Lake',
    year: '2025',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Building a real-time data pipeline that ingests IoT sensor data (temperature, humidity, pressure) via Kafka, processes it with Spark Structured Streaming for anomaly detection and aggregations, and writes to Delta Lake. Implements exactly-once semantics, late data handling, and real-time alerting for sensor threshold breaches.',

    overview: `Developing a production-style streaming data pipeline that processes IoT sensor readings in real-time. Simulated sensors publish telemetry data to Apache Kafka, which is consumed and transformed by Spark Structured Streaming. The pipeline performs real-time anomaly detection, calculates rolling aggregations, and writes results to Delta Lake tables. Supports both real-time dashboards (sub-minute latency) and historical batch analysis on the same data, demonstrating the modern streaming-first approach to IoT analytics.`,

    problem: `IoT deployments generate massive volumes of time-series data that batch pipelines cannot process fast enough. Traditional hourly or daily ETL misses critical events - a temperature spike that damages equipment is useless to detect 6 hours later. Lambda architecture requires maintaining separate batch and streaming codebases. Late-arriving sensor data (due to network issues) and exactly-once processing add complexity that most solutions ignore.`,

    solution: `Implementing a unified streaming architecture using Spark Structured Streaming with Delta Lake as the sink. Sensor data flows through Kafka, gets enriched with device metadata, checked against thresholds for alerting, aggregated into time windows, and written to Delta Lake. This provides exactly-once guarantees, handles late sensor data with watermarks, and enables both streaming queries and batch analytics on the same tables. The entire pipeline is containerized with Docker.`,

    techStack: {
      'Streaming': ['Apache Kafka', 'Spark Structured Streaming'],
      'Storage': ['Delta Lake', 'MinIO (S3-compatible)'],
      'Processing': ['PySpark', 'Python'],
      'Infrastructure': ['Docker', 'docker-compose'],
      'Monitoring': ['Kafka UI', 'Spark UI', 'Custom alerting'],
      'Data Simulation': ['Python Faker', 'NumPy']
    },

    architecture: {
      components: [
        { name: 'IoT Simulator', description: 'Python service generating realistic sensor telemetry (temperature, humidity, pressure, vibration) with configurable anomaly injection and network delay simulation.' },
        { name: 'Kafka Cluster', description: 'Message broker with topics partitioned by device_id for ordered processing per sensor. Configured with appropriate retention for replay capability.' },
        { name: 'Stream Processor', description: 'Spark Structured Streaming job consuming from Kafka, enriching with device metadata, detecting anomalies, and computing windowed aggregations.' },
        { name: 'Anomaly Detection', description: 'Real-time threshold checking and statistical anomaly detection (z-score based) with alert generation for out-of-bounds readings.' },
        { name: 'Delta Lake Tables', description: 'Bronze (raw telemetry), Silver (cleaned/enriched), Gold (aggregated metrics) layers following medallion architecture.' },
        { name: 'Alert Sink', description: 'Streaming output for threshold breaches, writing to separate Kafka topic for downstream alerting systems.' }
      ]
    },

    metrics: {
      'Event Throughput': '50K events/sec',
      'End-to-End Latency': '<10 seconds',
      'Processing Guarantee': 'Exactly-once',
      'Late Data Handling': '30 minute watermark',
      'Simulated Devices': '1000 sensors',
      'Checkpoint Interval': '15 seconds'
    },

    challenges: [
      {
        challenge: 'Achieving exactly-once semantics for sensor data that cannot be duplicated or lost.',
        solution: 'Using Spark Structured Streaming with checkpointing enabled and Delta Lake as sink. Delta provides ACID transactions and idempotent writes. Kafka consumer offsets tracked in checkpoint for recovery.'
      },
      {
        challenge: 'Handling late-arriving sensor data due to network connectivity issues.',
        solution: 'Implementing watermarks with 30-minute threshold suitable for IoT scenarios. Late data within watermark updates aggregations correctly. Data beyond watermark written to late-data table for reconciliation and reprocessing.'
      },
      {
        challenge: 'Real-time anomaly detection without blocking the main processing pipeline.',
        solution: 'Implementing parallel stream outputs - one for main aggregations, one for anomaly alerts. Using stateless threshold checks for critical alerts (immediate) and stateful rolling statistics for statistical anomalies.'
      },
      {
        challenge: 'Managing device metadata enrichment without slowing down streaming throughput.',
        solution: 'Broadcasting device metadata as Spark broadcast variable, refreshed every 5 minutes. Avoids shuffle join on every micro-batch. Handles device additions gracefully with null-safe joins.'
      },
      {
        challenge: 'Managing Spark Structured Streaming state for long-running windowed aggregations.',
        solution: 'Configuring state store with RocksDB backend for large state. Implementing state cleanup based on watermark. Monitoring state size metrics to prevent memory issues.'
      }
    ],

    impact: [
      'Enables real-time IoT monitoring with sub-10-second latency compared to hourly/daily batch jobs',
      'Detects equipment anomalies immediately, enabling preventive action before damage occurs',
      'Demonstrates modern streaming architecture that unifies batch and real-time processing',
      'Shows production patterns: exactly-once, late data handling, checkpointing, alerting',
      'Creates reusable template for any IoT or time-series streaming use case'
    ],

    learnings: [
      'IoT data has unique characteristics - high volume, time-series nature, frequent late arrivals, need for device context',
      'Watermark tuning is critical for IoT - too tight and you lose data, too loose and aggregations delay',
      'Delta Lake is essential for streaming IoT - ACID transactions enable exactly-once and simplified architecture',
      'Anomaly detection needs both threshold-based (simple, fast) and statistical (sophisticated, requires state) approaches',
      'Local development with Docker is essential - you cannot iterate quickly on cloud-deployed streaming jobs'
    ],

    screenshots: [
      { title: 'Architecture Diagram', url: '/projects/iot-streaming-arch.png' },
      { title: 'Real-Time Sensor Dashboard', url: '/projects/iot-streaming-dashboard.png' },
      { title: 'Anomaly Alert Stream', url: '/projects/iot-streaming-alerts.png' }
    ],

    codeSnippets: {
      'IoT Sensor Simulator': `
# Realistic IoT sensor data generator with anomaly injection
from kafka import KafkaProducer
import json
import random
import time
import numpy as np
from datetime import datetime

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    key_serializer=lambda k: k.encode('utf-8')
)

# Simulated device fleet
DEVICES = [
    {"device_id": f"sensor_{i:04d}", 
     "device_type": random.choice(["temperature", "humidity", "pressure", "vibration"]),
     "location": random.choice(["plant_a", "plant_b", "warehouse_1", "warehouse_2"]),
     "baseline_temp": random.uniform(20, 25),
     "baseline_humidity": random.uniform(40, 60)}
    for i in range(1000)
]

def generate_reading(device: dict, inject_anomaly: bool = False) -> dict:
    """Generate a realistic sensor reading with optional anomaly."""
    
    # Base values with normal variation
    if device["device_type"] == "temperature":
        value = np.random.normal(device["baseline_temp"], 1.5)
        unit = "celsius"
        # Inject temperature spike anomaly
        if inject_anomaly:
            value += random.uniform(15, 30)
    
    elif device["device_type"] == "humidity":
        value = np.random.normal(device["baseline_humidity"], 3)
        unit = "percent"
        if inject_anomaly:
            value = random.uniform(90, 100)
    
    elif device["device_type"] == "pressure":
        value = np.random.normal(1013, 5)
        unit = "hpa"
        if inject_anomaly:
            value += random.uniform(-50, 50)
    
    else:  # vibration
        value = abs(np.random.normal(0.5, 0.2))
        unit = "mm/s"
        if inject_anomaly:
            value *= random.uniform(5, 10)
    
    # Simulate occasional network delay (late-arriving data)
    event_time = datetime.utcnow()
    if random.random() < 0.05:  # 5% of readings are delayed
        delay_seconds = random.randint(60, 1800)  # 1-30 minutes late
        event_time = datetime.fromtimestamp(
            event_time.timestamp() - delay_seconds
        )
    
    return {
        "device_id": device["device_id"],
        "device_type": device["device_type"],
        "location": device["location"],
        "value": round(value, 2),
        "unit": unit,
        "event_time": event_time.isoformat(),
        "processing_time": datetime.utcnow().isoformat(),
        "quality_score": random.uniform(0.95, 1.0) if not inject_anomaly else random.uniform(0.7, 0.9)
    }

def stream_sensor_data(events_per_second: int = 500, anomaly_rate: float = 0.01):
    """Continuously produce sensor readings to Kafka."""
    print(f"Starting IoT simulator: {events_per_second} events/sec, {anomaly_rate*100}% anomaly rate")
    
    while True:
        for _ in range(events_per_second):
            device = random.choice(DEVICES)
            inject_anomaly = random.random() < anomaly_rate
            
            reading = generate_reading(device, inject_anomaly)
            
            # Partition by device_id for ordered processing per sensor
            producer.send(
                topic='iot-sensor-readings',
                key=device["device_id"],
                value=reading
            )
        
        producer.flush()
        time.sleep(1)

if __name__ == "__main__":
    stream_sensor_data(events_per_second=500, anomaly_rate=0.01)
`,

      'Spark Streaming with Anomaly Detection': `
# IoT stream processing with real-time anomaly detection
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

spark = SparkSession.builder \\
    .appName("IoTStreamProcessor") \\
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \\
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \\
    .getOrCreate()

# Schema for IoT sensor readings
reading_schema = StructType([
    StructField("device_id", StringType()),
    StructField("device_type", StringType()),
    StructField("location", StringType()),
    StructField("value", DoubleType()),
    StructField("unit", StringType()),
    StructField("event_time", StringType()),
    StructField("processing_time", StringType()),
    StructField("quality_score", DoubleType())
])

# Thresholds for anomaly detection
THRESHOLDS = {
    "temperature": {"min": 10, "max": 40, "critical_max": 50},
    "humidity": {"min": 20, "max": 80, "critical_max": 95},
    "pressure": {"min": 950, "max": 1050, "critical_max": 1100},
    "vibration": {"min": 0, "max": 2, "critical_max": 5}
}

# Read from Kafka
raw_stream = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "iot-sensor-readings") \\
    .option("startingOffsets", "latest") \\
    .load()

# Parse JSON and convert timestamps
parsed_stream = raw_stream \\
    .select(
        from_json(col("value").cast("string"), reading_schema).alias("data"),
        col("timestamp").alias("kafka_timestamp")
    ) \\
    .select("data.*", "kafka_timestamp") \\
    .withColumn("event_timestamp", 
        to_timestamp(col("event_time"))) \\
    .withColumn("processing_timestamp", 
        to_timestamp(col("processing_time"))) \\
    .withColumn("ingestion_timestamp", current_timestamp())

# Apply watermark for late data handling (30 min for IoT)
watermarked = parsed_stream \\
    .withWatermark("event_timestamp", "30 minutes")

# Add anomaly detection flags
with_anomalies = watermarked \\
    .withColumn("threshold_breach",
        when(
            (col("device_type") == "temperature") & 
            ((col("value") < 10) | (col("value") > 40)), True
        ).when(
            (col("device_type") == "humidity") & 
            ((col("value") < 20) | (col("value") > 80)), True
        ).when(
            (col("device_type") == "pressure") & 
            ((col("value") < 950) | (col("value") > 1050)), True
        ).when(
            (col("device_type") == "vibration") & 
            (col("value") > 2), True
        ).otherwise(False)
    ) \\
    .withColumn("critical_breach",
        when(
            (col("device_type") == "temperature") & (col("value") > 50), True
        ).when(
            (col("device_type") == "humidity") & (col("value") > 95), True
        ).when(
            (col("device_type") == "vibration") & (col("value") > 5), True
        ).otherwise(False)
    )

# Write all readings to Bronze layer
bronze_query = with_anomalies.writeStream \\
    .format("delta") \\
    .outputMode("append") \\
    .option("checkpointLocation", "/checkpoints/iot_bronze") \\
    .start("/delta/bronze/iot_readings")

# Filter and write anomalies to separate alert stream
alerts = with_anomalies \\
    .filter(col("threshold_breach") | col("critical_breach")) \\
    .select(
        col("device_id"),
        col("device_type"),
        col("location"),
        col("value"),
        col("unit"),
        col("event_timestamp"),
        col("threshold_breach"),
        col("critical_breach"),
        when(col("critical_breach"), "CRITICAL")
            .when(col("threshold_breach"), "WARNING")
            .alias("severity")
    )

# Write alerts to Kafka for downstream alerting
alert_query = alerts \\
    .selectExpr("device_id AS key", "to_json(struct(*)) AS value") \\
    .writeStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("topic", "iot-alerts") \\
    .option("checkpointLocation", "/checkpoints/iot_alerts") \\
    .start()
`,

      'Windowed Aggregations for Dashboards': `
# Real-time aggregations for IoT monitoring dashboards
from pyspark.sql.functions import window, avg, min, max, count, stddev

# 1-minute tumbling window aggregations per device
device_metrics_1m = watermarked \\
    .groupBy(
        window("event_timestamp", "1 minute"),
        "device_id",
        "device_type",
        "location"
    ) \\
    .agg(
        avg("value").alias("avg_value"),
        min("value").alias("min_value"),
        max("value").alias("max_value"),
        stddev("value").alias("stddev_value"),
        count("*").alias("reading_count"),
        avg("quality_score").alias("avg_quality")
    )

# Write to Gold layer for dashboards
device_metrics_query = device_metrics_1m.writeStream \\
    .format("delta") \\
    .outputMode("append") \\
    .option("checkpointLocation", "/checkpoints/iot_gold_device_1m") \\
    .start("/delta/gold/device_metrics_1m")

# Location-level aggregations (5-minute windows)
location_metrics_5m = watermarked \\
    .groupBy(
        window("event_timestamp", "5 minutes"),
        "location",
        "device_type"
    ) \\
    .agg(
        avg("value").alias("avg_value"),
        min("value").alias("min_value"),
        max("value").alias("max_value"),
        count("*").alias("reading_count"),
        sum(when(col("quality_score") < 0.9, 1).otherwise(0))
            .alias("low_quality_count"),
        countDistinct("device_id").alias("active_devices")
    )

location_metrics_query = location_metrics_5m.writeStream \\
    .format("delta") \\
    .outputMode("append") \\
    .option("checkpointLocation", "/checkpoints/iot_gold_location_5m") \\
    .start("/delta/gold/location_metrics_5m")

# Statistical anomaly detection using rolling z-score
# Requires stateful processing with flatMapGroupsWithState
# Simplified version using window functions
rolling_stats = watermarked \\
    .groupBy(
        window("event_timestamp", "15 minutes", "1 minute"),
        "device_id"
    ) \\
    .agg(
        avg("value").alias("rolling_avg"),
        stddev("value").alias("rolling_stddev"),
        count("*").alias("sample_count")
    )

rolling_stats_query = rolling_stats.writeStream \\
    .format("delta") \\
    .outputMode("append") \\
    .option("checkpointLocation", "/checkpoints/iot_rolling_stats") \\
    .start("/delta/silver/rolling_device_stats")
`
    },

    links: {
      github: 'https://github.com/danielg-gerlach/iot-streaming-pipeline',
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