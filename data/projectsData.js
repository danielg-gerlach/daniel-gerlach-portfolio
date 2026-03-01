export const projectsData = {
  // ============================================
  // PERSONAL PROJECTS
  // ============================================
  
  'saas-metrics-pipeline': {
    id: 'saas-metrics-pipeline',
    type: 'personal',
    title: 'SaaS Metrics Pipeline + Dashboard',
    subtitle: 'End-to-end data pipeline generating synthetic SaaS data, modeling it in a star schema with dbt, and serving a live MRR/churn/retention dashboard',
    year: '2026',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Generate synthetic SaaS product data (users, subscriptions, events, churn) with a Python script using Faker, ingest it into DuckDB, model it into a star schema with dbt (fact_subscriptions, dim_users, dim_plans), and serve a live MRR/churn/retention dashboard in Streamlit.',

    overview: `End-to-end data engineering project that demonstrates data modeling judgment on a business-relevant domain. SaaS metrics are universal — MRR, churn, retention — and this pipeline covers the full stack from synthetic data generation through warehouse modeling to live dashboard delivery. By defining data from scratch using Faker, the project shows understanding of the business semantics behind data, not just the plumbing.`,

    problem: `SaaS companies need reliable, well-modeled data to track subscription metrics like MRR, churn rates, and customer retention. Raw transactional data is messy and doesn't directly answer business questions. Building a pipeline that generates, ingests, models, and visualizes this data end-to-end demonstrates the full breadth of data engineering skills.`,

    solution: `Built a complete pipeline: (1) Python script using Faker generates realistic SaaS product data — users, subscriptions, usage events, and churn events. (2) Data is ingested into DuckDB as the analytical warehouse. (3) dbt models transform raw data into a star schema with fact_subscriptions, dim_users, and dim_plans. (4) A Streamlit dashboard serves live MRR, churn, and retention metrics. (5) GitHub Actions automates the pipeline for continuous data refreshes.`,

    techStack: {
      'Data Generation': ['Python', 'Faker'],
      'Data Warehouse': ['DuckDB'],
      'Transformation': ['dbt'],
      'Orchestration': ['GitHub Actions'],
      'Visualization': ['Streamlit']
    },

    architecture: {
      components: [
        { name: 'Data Generation', description: 'Python script using Faker to generate synthetic SaaS product data: users, subscriptions, usage events, and churn events with realistic distributions.' },
        { name: 'Ingestion', description: 'Raw generated data ingested into DuckDB as the lightweight analytical warehouse.' },
        { name: 'Transformation (dbt)', description: 'Star schema modeled with dbt: fact_subscriptions, dim_users, dim_plans. Business logic for MRR calculation, churn detection, and retention cohorts.' },
        { name: 'Orchestration', description: 'GitHub Actions workflow automates data generation, dbt runs, and dashboard refresh on a schedule.' },
        { name: 'Dashboard', description: 'Streamlit app serving live MRR, churn rate, and retention metrics with interactive filtering.' }
      ]
    },

    metrics: {
      'Data Models': 'Star schema (facts + dimensions)',
      'Key Metrics': 'MRR, Churn Rate, Retention',
      'Pipeline': 'Fully automated via GitHub Actions',
      'Dashboard': 'Live Streamlit app'
    },

    challenges: [
      {
        challenge: 'Generating realistic synthetic SaaS data that reflects real-world subscription patterns.',
        solution: 'Designed Faker-based generators with realistic distributions for subscription durations, plan upgrades/downgrades, churn probabilities, and seasonal usage patterns.'
      },
      {
        challenge: 'Modeling MRR movements accurately including edge cases like mid-cycle plan changes.',
        solution: 'Implemented careful dbt logic to handle new subscriptions, expansions, contractions, and churns with proper effective dating in the fact table.'
      }
    ],

    impact: [
      'Demonstrates full DE stack proficiency: data generation, warehousing, transformation, orchestration, and visualization',
      'Shows data modeling judgment on a universally understood business domain (SaaS metrics)',
      'Proves ability to define data from scratch — understanding business semantics, not just plumbing'
    ],

    learnings: [
      'Defining data from scratch forces deep understanding of business semantics — what constitutes a churn event, how MRR movements are categorized',
      'DuckDB is remarkably powerful as a lightweight analytical warehouse for projects that don\'t need cloud infrastructure',
      'dbt brings software engineering best practices (version control, testing, documentation) to data transformation'
    ],

    screenshots: [],

    codeSnippets: {},

    links: {
      github: 'https://github.com/danielg-gerlach/saas-metrics-pipeline',
      demo: null,
      documentation: null
    }
  },

  'databricks-lakehouse-pipeline': {
    id: 'databricks-lakehouse-pipeline',
    type: 'personal',
    title: 'Databricks Lakehouse Pipeline',
    subtitle: 'Medallion architecture (Bronze → Silver → Gold) on Databricks Community Edition for SaaS analytics using Delta Lake',
    year: '2026',
    role: 'Data Engineer',
    team: 'Solo project',
    status: 'In Development',
    tldr: 'Build a medallion architecture (Bronze → Silver → Gold) on Databricks Community Edition using synthetic SaaS data. Ingest raw CSV/JSON into Bronze, clean and validate in Silver, aggregate business metrics in Gold. Uses Delta Lake format throughout to demonstrate lakehouse patterns used in DACH enterprise data engineering.',

    overview: `Implements the medallion lakehouse architecture on Databricks Community Edition using the same synthetic SaaS dataset from the SaaS Metrics Pipeline project. Raw data lands in Bronze as CSV/JSON, is cleaned and validated in Silver, and aggregated into business-ready metrics in Gold. Delta Lake format is used throughout for ACID transactions, schema enforcement, and time travel. Demonstrates the exact stack used in DACH enterprise DE roles.`,

    problem: `Enterprise data platforms need a structured approach to progressively refine raw data into analytics-ready assets. The medallion architecture (Bronze → Silver → Gold) is the industry standard pattern for lakehouse platforms, and hands-on experience with Databricks and Delta Lake is essential for data engineering roles in the DACH region.`,

    solution: `Built a three-layer lakehouse on Databricks Community Edition: (1) Bronze layer ingests raw CSV/JSON files preserving all original data. (2) Silver layer applies data quality rules, deduplication, type casting, and standardization using PySpark transformations. (3) Gold layer creates business-ready aggregates for SaaS metrics analysis. All layers stored as Delta Lake tables with proper partitioning.`,

    techStack: {
      'Platform': ['Databricks Community Edition'],
      'Processing': ['PySpark', 'Apache Spark 3.5'],
      'Storage': ['Delta Lake'],
      'Languages': ['Python', 'SQL (Databricks notebooks)']
    },

    architecture: {
      components: [
        { name: 'Bronze Layer (Raw)', description: 'Landing zone for raw CSV/JSON SaaS data. Schema inference enabled, append-only Delta tables preserve complete history. Minimal transformation — only ingestion metadata added.' },
        { name: 'Silver Layer (Cleaned)', description: 'PySpark transformations: deduplication, null handling, type casting, timestamp standardization, data quality validation with flags. Bad data preserved with quality indicators.' },
        { name: 'Gold Layer (Aggregates)', description: 'Business-level aggregates: SaaS metrics rollups, cohort analysis tables, churn summaries. Partitioned by date, optimized for analytics queries.' },
        { name: 'Delta Lake Features', description: 'ACID transactions, schema evolution, time travel for debugging and audit, optimized file management with OPTIMIZE and VACUUM.' }
      ]
    },

    metrics: {
      'Architecture': 'Medallion (Bronze/Silver/Gold)',
      'Storage Format': 'Delta Lake',
      'Processing': 'PySpark batch',
      'Platform': 'Databricks Community Edition'
    },

    challenges: [
      {
        challenge: 'Working within Databricks Community Edition compute limitations while demonstrating production patterns.',
        solution: 'Optimized data volumes and processing patterns to work within CE constraints while keeping the architecture identical to what would run on a full Databricks workspace.'
      },
      {
        challenge: 'Implementing proper data quality checks without a dedicated framework.',
        solution: 'Built custom PySpark validation functions with quality flags at the Silver layer, preserving bad records for investigation while filtering them from Gold aggregates.'
      }
    ],

    impact: [
      'Demonstrates hands-on experience with Databricks and Delta Lake — the dominant lakehouse stack in DACH enterprise data engineering',
      'Shows understanding of medallion architecture patterns used in production data platforms',
      'Proves ability to implement data quality practices within a lakehouse framework'
    ],

    learnings: [
      'Delta Lake solves real pain points: schema enforcement prevents bad data, ACID transactions prevent partial writes, time travel enables debugging',
      'Medallion architecture provides clear separation of concerns — bronze never deletes data, silver is source of truth, gold is optimized for consumption',
      'Community Edition is fully sufficient to demonstrate enterprise lakehouse patterns'
    ],

    screenshots: [],

    codeSnippets: {},

    links: {
      github: 'https://github.com/danielg-gerlach/databricks-lakehouse-pipeline',
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