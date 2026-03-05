export const projectsData = {
  // ============================================
  // PERSONAL PROJECTS
  // ============================================

  'developer-analytics-platform': {
    id: 'developer-analytics-platform',
    type: 'personal',
    title: 'Developer Ecosystem Analytics Platform',
    subtitle: 'Automated batch data platform tracking developer tool adoption trends across GitHub and Stack Overflow via a medallion architecture',
    year: '2026',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'End-to-end batch data platform ingesting GitHub API and Stack Overflow data daily via Prefect, transforming it through a medallion architecture with dbt on MotherDuck (DuckDB Cloud), and serving a live Evidence.dev dashboard tracking tool adoption trends, community health, and technology growth indices.',

    overview: `A fully automated batch data platform that answers: "Which data tools are gaining adoption? Where is upskilling worth it?" Daily ingestion from the GitHub REST API and Stack Overflow datasets flows through a Bronze → Silver → Gold medallion architecture on MotherDuck, transformed by dbt with incremental models, tested with automated data quality checks, and deployed as a live Evidence.dev dashboard. CI/CD via GitHub Actions runs dbt on every push and auto-deploys updated docs.`,

    problem: `Engineering managers and developers making technology investment decisions — which tools to adopt, which skills to build — rely on gut feeling and opinion articles rather than data. Public signals exist (GitHub activity, Stack Overflow trends, job market data) but are fragmented and unstructured. A reproducible, automated pipeline that consolidates these signals into actionable analytics has direct business value.`,

    solution: `Built an end-to-end pipeline: (1) Prefect orchestrates daily incremental extraction from GitHub REST API (stars, forks, issues for top DE/AI tools) and Stack Overflow public datasets. (2) Raw JSON/Parquet lands in MotherDuck Bronze layer, unchanged for auditability. (3) dbt Silver layer cleans, deduplicates, and types the data. (4) dbt Gold layer computes tool adoption trends, community health scores, and monthly growth indices. (5) Evidence.dev dashboard deployed on Vercel serves live analytics. GitHub Actions CI/CD runs dbt tests on every push.`,

    techStack: {
      'Orchestration': ['Prefect Cloud'],
      'Storage / Warehouse': ['MotherDuck', 'DuckDB'],
      'Transformation': ['dbt Core', 'dbt-duckdb adapter'],
      'Data Quality': ['dbt Tests (built-in + custom)'],
      'CI/CD': ['GitHub Actions'],
      'Visualization': ['Evidence.dev'],
      'Language': ['Python 3.11+'],
      'Containerization': ['Docker Compose']
    },

    architecture: {
      components: [
        { name: 'Ingestion (Prefect)', description: 'Daily Prefect flow extracts GitHub repository stats (stars, forks, issues) for top 20 DE/AI tools and Stack Overflow tag activity. Incremental load logic — only new/changed records per run. Rate-limit handling with exponential backoff for GitHub API.' },
        { name: 'Bronze Layer (MotherDuck)', description: 'Raw JSON/Parquet files archived unchanged in MotherDuck. Append-only, no transformations — full audit trail of source data.' },
        { name: 'Silver Layer (dbt)', description: 'dbt Staging → Intermediate models: deduplication, type casting, timestamp normalization, schema tests (not_null, unique, accepted_values). Custom macros for surrogate key generation and safe division.' },
        { name: 'Gold Layer (dbt)', description: 'Analytical aggregates: tool adoption trends over time, monthly growth index per technology category, community health indicators, tool co-occurrence patterns. Incremental models for daily-growing tables.' },
        { name: 'Evidence.dev Dashboard', description: 'SQL-native dashboard deployed to Vercel showing tool adoption trends, Stack Overflow activity, and monthly technology growth indices with interactive filtering.' },
        { name: 'CI/CD (GitHub Actions)', description: 'On every push: dbt run → dbt test → dbt docs generate → deploy docs to GitHub Pages. Failing tests block deployment.' }
      ]
    },

    metrics: {
      'Architecture': 'Medallion (Bronze/Silver/Gold)',
      'Warehouse': 'MotherDuck (DuckDB Cloud)',
      'Orchestration': 'Prefect Cloud (daily schedule)',
      'Data Quality': 'Automated dbt tests on every run',
      'Dashboard': 'Live on Vercel (Evidence.dev)',
      'CI/CD': 'GitHub Actions'
    },

    challenges: [
      {
        challenge: 'Implementing truly incremental loads for GitHub API data without a native watermark.',
        solution: 'Used dbt incremental models with a custom `max_loaded_at` watermark tracked per source table, ensuring only new records are appended per daily run — avoiding full reloads and controlling API usage.'
      },
      {
        challenge: 'Building dbt models that go beyond basic SELECT transformations.',
        solution: 'Implemented staging → intermediate → mart layer separation, custom macros (generate_surrogate_key, safe_divide), incremental strategies per table growth rate, and custom generic tests beyond built-in schema checks.'
      },
      {
        challenge: 'Making the dashboard deploy automatically without manual intervention.',
        solution: 'GitHub Actions pipeline runs dbt, generates updated docs, and triggers an Evidence.dev rebuild on Vercel on every successful push — fully hands-off after initial setup.'
      }
    ],

    impact: [
      'Demonstrates production-grade DE fundamentals: incremental ingestion, medallion architecture, dbt best practices, automated data quality, and CI/CD — all in one project',
      'Generates real, quantifiable insights from live public data — not just synthetic toy datasets',
      'Evidence.dev + MotherDuck stack signals awareness of the modern, lightweight data platform tooling increasingly used in startups and scale-ups'
    ],

    learnings: [
      'Incremental load design forces you to think about data freshness, deduplication, and late-arriving records from the start — not as an afterthought',
      'dbt incremental models require understanding of how your warehouse handles merges and inserts at the storage level',
      'Evidence.dev is a serious alternative to Streamlit for data products — SQL-native, version-controlled, and deployable as a static site'
    ],

    screenshots: [],

    codeSnippets: {},

    links: {
      github: 'https://github.com/danielg-gerlach/developer-analytics-platform',
      demo: null,
      documentation: null
    }
  },

  'german-job-market-pipeline': {
    id: 'german-job-market-pipeline',
    type: 'personal',
    title: 'German Job Market Intelligence Pipeline',
    subtitle: 'LLM-powered pipeline extracting structured insights from German Data & AI job postings via the Bundesagentur für Arbeit API',
    year: '2026',
    role: 'Data / AI Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Automated pipeline ingesting Data & AI job postings daily from the Bundesagentur für Arbeit REST API, extracting structured data (tools, salary, seniority, remote policy) via GPT-4o-mini with Pydantic Structured Outputs, storing in PostgreSQL, transforming with dbt, and serving a Streamlit dashboard showing real German job market intelligence — including tool demand heatmaps, salary bands, and remote trends.',

    overview: `A production-grade LLM extraction pipeline that turns unstructured German job postings into queryable, analytically useful data. The Bundesagentur für Arbeit API provides free access to hundreds of Data & AI job listings daily — but in raw free-text form. GPT-4o-mini with Pydantic Structured Outputs extracts a typed schema (required tools, salary range, seniority level, remote policy, industry) from each posting. Prefect orchestrates daily runs with cost monitoring, caching, and three-tier error handling. dbt transforms the structured data into analytical Gold tables. A Streamlit dashboard surfaces real market intelligence: which tools dominate, what salaries look like by seniority, how remote-friendly the market actually is.`,

    problem: `The German Data & AI job market produces hundreds of new postings daily — all in unstructured free text. Quantitative market analysis (which tools are demanded in 60% of roles? what does a Junior DE actually earn in Stuttgart?) requires either massive manual effort or a structured extraction layer. The Bundesagentur für Arbeit API provides the raw data for free, but it's analytically worthless without an LLM extraction layer to convert prose into schema.`,

    solution: `Built a full pipeline: (1) Prefect daily flow ingests job postings from Bundesagentur REST API, stores raw text as Parquet (audit archive). (2) GPT-4o-mini with OpenAI Structured Outputs + Pydantic v2 extracts a typed JobExtraction schema per posting — tools required, salary, seniority, remote policy, confidence score. (3) Hash-based caching prevents duplicate LLM calls. (4) Three-tier error handling: API failures → exponential backoff, low-confidence extractions → flagged table, Pydantic validation errors → single retry then manual review queue. (5) LLM cost monitoring tracked in PostgreSQL (llm_call_log). (6) dbt Gold layer: tool demand mart, salary bands, remote trends. (7) Streamlit dashboard serves live market intelligence.`,

    techStack: {
      'Orchestration': ['Prefect Cloud'],
      'LLM': ['OpenAI GPT-4o-mini', 'Structured Outputs'],
      'Validation': ['Pydantic v2'],
      'Database': ['PostgreSQL', 'Supabase'],
      'Transformation': ['dbt Core', 'dbt-postgres adapter'],
      'Dashboard': ['Streamlit'],
      'Language': ['Python 3.11+'],
      'Containerization': ['Docker Compose']
    },

    architecture: {
      components: [
        { name: 'Ingestion (Bundesagentur API)', description: 'Daily Prefect flow hits the free Bundesagentur für Arbeit REST API, filtering for Data & IT roles. Raw job posting text archived as Parquet files for full auditability.' },
        { name: 'LLM Extraction Layer', description: 'GPT-4o-mini with OpenAI Structured Outputs parses each posting into a typed Pydantic schema: required_tools, nice_to_have_tools, salary_min/max_eur, seniority_level, remote_policy, job_domain, years_experience_min, company_size, industry, extraction_confidence.' },
        { name: 'Cost Monitoring & Caching', description: 'Hash-based cache prevents re-processing already extracted jobs. llm_call_log table tracks every API call: tokens_input, tokens_output, cost_eur, success, model — full cost transparency per run.' },
        { name: 'Error Handling (3-tier)', description: 'API failures: exponential backoff (3 retries). Low confidence (<0.6): written to jobs_flagged table, never silently dropped. Pydantic validation error: one automatic retry with error context in prompt, then manual review flag.' },
        { name: 'dbt Analytics Layer', description: 'dim_tools (normalized tool names), fct_job_tool_bridge (many-to-many), mart_tool_demand (tool frequency trends), mart_salary_bands (percentiles by seniority + domain), mart_remote_trend (remote policy over time).' },
        { name: 'Streamlit Dashboard', description: 'Tool demand heatmap, salary bands by seniority level, remote trend over time, top tool co-occurrences, live LLM cost log — all from real extracted data.' }
      ]
    },

    metrics: {
      'Data Source': 'Bundesagentur für Arbeit REST API (free)',
      'LLM': 'GPT-4o-mini with Structured Outputs',
      'Validation': 'Pydantic v2 typed schema',
      'Cost Monitoring': 'Per-call tracking in PostgreSQL',
      'Error Handling': '3-tier (retry / flag / review)',
      'Orchestration': 'Prefect (daily schedule)'
    },

    challenges: [
      {
        challenge: 'Ensuring LLM extraction quality without manual labeling of training data.',
        solution: 'Used GPT-4o-mini Structured Outputs (not prompt engineering + JSON parsing) for schema-enforced extraction, plus a confidence score field. Low-confidence results are routed to a review queue rather than silently polluting the analytical tables.'
      },
      {
        challenge: 'Controlling LLM costs at scale across daily runs over weeks.',
        solution: 'Implemented hash-based job ID caching (no duplicate calls), per-call cost logging in a dedicated PostgreSQL table, and budgeted the extraction at ~$0.15/1M tokens for GPT-4o-mini — the cost dashboard is part of the Streamlit app itself.'
      },
      {
        challenge: 'Normalizing tool names extracted by the LLM (e.g. "PySpark" vs "Apache Spark" vs "Spark").',
        solution: 'Built a dim_tools dbt model with a canonical name mapping table, applied during the Gold layer transformation to ensure consistent tool aggregation in the demand mart.'
      }
    ],

    impact: [
      'Generates real, publishable market insights from live German job data — not synthetic datasets',
      'Demonstrates production LLM engineering patterns: structured outputs, cost monitoring, error classification, caching — the exact concerns that separate junior from production-grade AI engineering',
      'Directly relevant domain for DACH job market positioning: the dashboard answers real questions every DE/AI candidate in Germany has'
    ],

    learnings: [
      'Pydantic Structured Outputs with OpenAI is strictly more reliable than prompt engineering + JSON parsing — schema enforcement happens at the API level, not in your code',
      'LLM cost monitoring is not optional in production — tracking token usage per job and per run is the difference between a controlled pipeline and an unexpected API bill',
      'Confidence scores as first-class fields in extraction schemas force you to design for uncertainty rather than assuming the LLM is always right'
    ],

    screenshots: [],

    codeSnippets: {},

    links: {
      github: 'https://github.com/danielg-gerlach/german-job-market-pipeline',
      demo: null,
      documentation: null
    }
  },

  'mini-rag-api': {
    id: 'mini-rag-api',
    type: 'personal',
    title: 'Mini RAG API',
    subtitle: 'Focused RAG system over a public corpus, deployed as a live FastAPI endpoint with retrieval evaluation via RAGAS',
    year: '2026',
    role: 'ML / Data Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Focused RAG system over a narrow public corpus, deployed as a live FastAPI endpoint with a /eval endpoint returning retrieval metrics via RAGAS. Demonstrates end-to-end Applied AI system design, deployment, and evaluation discipline.',

    overview: `A focused Retrieval-Augmented Generation (RAG) system built over a narrow public corpus and deployed as a production-ready API. The project goes beyond a basic RAG demo by including a dedicated /eval endpoint that returns retrieval quality metrics via RAGAS, demonstrating evaluation discipline that separates serious AI engineering from toy projects.`,

    problem: `Many RAG implementations are demo-quality — they retrieve documents and generate answers but lack any evaluation of retrieval quality, making it impossible to know if the system is actually working well. Production AI systems need measurable quality metrics and systematic evaluation.`,

    solution: `Built a RAG pipeline using LlamaIndex for document indexing and retrieval, ChromaDB as the vector store, and FastAPI as the serving layer. Deployed via Docker to Railway/Render for live accessibility. Added a /eval endpoint powered by RAGAS that returns retrieval metrics (faithfulness, answer relevancy, context precision) — providing quantitative proof that the system works.`,

    techStack: {
      'AI Framework': ['LlamaIndex'],
      'Vector Store': ['ChromaDB'],
      'API': ['FastAPI'],
      'Deployment': ['Docker', 'Railway/Render'],
      'Evaluation': ['RAGAS'],
      'Language': ['Python']
    },

    architecture: {
      components: [
        { name: 'Document Ingestion', description: 'LlamaIndex pipeline to chunk, embed, and index a public corpus into ChromaDB vector store.' },
        { name: 'Retrieval & Generation', description: 'Query endpoint that retrieves relevant document chunks via semantic search and generates answers using an LLM.' },
        { name: 'FastAPI Service', description: 'Production-ready API with /query and /eval endpoints, proper error handling, and request validation.' },
        { name: 'Evaluation Pipeline', description: 'RAGAS-powered /eval endpoint returning retrieval metrics: faithfulness, answer relevancy, context precision, and context recall.' },
        { name: 'Deployment', description: 'Dockerized application deployed to Railway/Render for live demo accessibility.' }
      ]
    },

    metrics: {
      'Endpoints': '/query, /eval',
      'Evaluation': 'RAGAS metrics (faithfulness, relevancy, precision, recall)',
      'Deployment': 'Live on Railway/Render',
      'Containerization': 'Docker'
    },

    challenges: [
      {
        challenge: 'Tuning chunk size and overlap for optimal retrieval quality on the chosen corpus.',
        solution: 'Used RAGAS evaluation metrics to systematically test different chunking strategies and select the configuration with the best retrieval precision and recall.'
      },
      {
        challenge: 'Keeping the deployed API responsive with reasonable latency for RAG queries.',
        solution: 'Optimized the retrieval pipeline, pre-loaded the vector index on startup, and configured appropriate timeouts and caching for the FastAPI service.'
      }
    ],

    impact: [
      'Demonstrates end-to-end Applied AI system design — from indexing to serving to evaluation',
      'Shows deployment discipline: Dockerized, live API, not just a notebook demo',
      'Proves evaluation-first mindset with RAGAS metrics — critical for production AI engineering'
    ],

    learnings: [
      'Evaluation is what separates serious AI engineering from demos — RAGAS provides a systematic framework for measuring RAG quality',
      'ChromaDB is an excellent lightweight vector store for projects that need fast iteration without cloud infrastructure',
      'Deploying AI systems as APIs forces you to think about latency, error handling, and user experience beyond model accuracy'
    ],

    screenshots: [],

    codeSnippets: {},

    links: {
      github: 'https://github.com/danielg-gerlach/mini-rag-api',
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
      1, 2
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
    links: { github: null, demo: null, documentation: null }
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
      }
    ],

    impact: [
      'Enabled the company to make strategic decisions about AI investments with clear understanding of costs, benefits, and implementation requirements',
      'Equipped 25+ employees with practical AI skills, improving productivity in customer communication, brainstorming and market analysis',
      'Established a framework for responsible AI usage that balances innovation with data security and compliance requirements',
      'Identified and helped implement 5 quick-win use cases that demonstrated immediate ROI and built organizational confidence in AI technologies'
    ],

    learnings: [
      'The importance of meeting stakeholders where they are - focusing on practical, job-relevant applications rather than technical capabilities',
      'How change management and training are as critical as technology selection when integrating AI into established organizations',
      'The value of starting with quick wins to build momentum and demonstrate ROI before tackling larger transformation initiatives',
      'That concerns about AI often stem from lack of understanding - hands-on training and clear guidelines can transform skeptics into advocates'
    ],

    screenshots: [],
    codeSnippets: {},
    links: { github: null, demo: null, documentation: null }
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
      'Automated workflows that serve both user and business needs (results email + agent notification) maximize efficiency',
      'Progressive disclosure (showing questions one at a time) reduces cognitive load and increases engagement',
      'Mobile optimization is essential as majority of users access the quiz from mobile devices'
    ],

    screenshots: [],
    codeSnippets: {},
    links: { github: null, demo: null, documentation: null }
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

    problem: `After launching the lead generation quiz, the CEO needed visibility into not just how many people took the quiz, but specifically how they answered each question. Understanding which regulations, legal requirements, or process steps confused potential customers would enable data-driven decisions about service offerings and consulting focus areas.`,

    solution: `Developed a full-featured analytics dashboard using Nuxt.js and TypeScript that provides both individual and aggregated views of quiz data. Interactive charts reveal which questions have the lowest correct answer rates, indicating common knowledge gaps. The dashboard also tracks completion rates and drop-off points to continuously optimize the quiz and service offerings.`,

    techStack: {
      'Frontend': ['Nuxt.js', 'Tailwind CSS', 'Chart.js'],
      'Backend': ['TypeScript', 'JavaScript', 'Node.js'],
      'Database & Authentication': ['PostgreSQL', 'Supabase']
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
        solution: 'Designed multi-level analytics: overview metrics for quick status checks, question-by-question breakdowns for knowledge gap analysis, and individual user profiles for personalized follow-up.'
      }
    ],

    impact: [
      'Enabled CEO to identify that 70% of users struggle with disclosure requirements, leading to new disclosure consulting service launch',
      'Reduced time to review and respond to new leads by 70% through centralized lead management',
      'Identified quiz optimization opportunities by analyzing drop-off rates, leading to 15% improvement in completion rates'
    ],

    learnings: [
      'Aggregated answer analysis reveals market needs better than individual lead data alone',
      'Visualizing knowledge gaps transforms quiz responses from lead data into strategic business intelligence',
      'Pattern recognition in user responses can directly inform product and service development'
    ],

    screenshots: [],
    codeSnippets: {},
    links: { github: null, demo: null, documentation: null }
  },

  'work-project-3': {
    id: 'CRM',
    type: 'work',
    title: 'CRM System Integration & Set-Up',
    subtitle: 'Integrated and set up a CRM system for managing customer relationships and sales processes for 10+ real estate agents',
    year: '2025',
    role: 'Consultant',
    team: 'Solo',
    status: 'In Development',
    tldr: 'Integrating and customizing CRM solution for 10+ real estate agents to manage properties, deals, and customer relationships. Planning to unify property and activity management, improve workflow efficiency and give agents more time for customer service.',

    overview: `Project overview.`,
    problem: `Real-estate brokers and business owners had a difficult time managing properties and activities, which made it hard to understand "who does what?"`,
    solution: `An organized and customized CRM system for property, deal, and customer management. This solves both needs and provides one unified solution which benefits costs and the technical setup.`,

    techStack: {
      'General': ['Consulting', 'Customer communication']
    },

    architecture: {
      components: [
        { name: 'Component', description: 'Description' }
      ]
    },

    metrics: { 'Key Metric': 'Value' },

    challenges: [
      { challenge: 'Challenge', solution: 'Solution' }
    ],

    impact: [
      'A more efficient and effective workflow throughout the entire real-estate process.',
      'Business owners and real-estate agents now have more time to serve their customers instead of managing tasks & properties.'
    ],

    learnings: ['Learning'],

    screenshots: [],
    codeSnippets: {},
    links: { github: null, demo: null, documentation: null }
  }
}