export const projectsData = {
    'real-time-analytics': {
      id: 'real-time-analytics',
      title: 'Real-Time Analytics Platform',
      subtitle: 'Distributed stream processing system handling 10M+ events/sec',
      year: '2024',
      duration: '6 months',
      role: 'Lead Data Engineer',
      team: '5 engineers',
      status: 'Production',
      overview: `Built a cutting-edge real-time analytics platform that processes over 10 million events per second with sub-second latency. 
      The system provides instant insights for business-critical decisions, processing data from multiple sources including IoT devices, 
      web applications, and mobile apps.`,
      
      problem: `The company was struggling with delayed insights from batch processing systems that ran every few hours. 
      Business stakeholders needed real-time visibility into customer behavior, system performance, and operational metrics 
      to make timely decisions and respond to issues immediately.`,
      
      solution: `Designed and implemented a distributed stream processing architecture using Apache Kafka for ingestion, 
      Apache Spark Streaming for processing, and a custom-built visualization layer. The system automatically scales based 
      on load and includes sophisticated error handling and data quality checks.`,
      
      techStack: {
        'Stream Processing': ['Apache Kafka', 'Spark Streaming', 'Flink'],
        'Infrastructure': ['Kubernetes', 'Docker', 'Terraform'],
        'Storage': ['Cassandra', 'Redis', 'S3'],
        'Monitoring': ['Prometheus', 'Grafana', 'ELK Stack'],
        'Languages': ['Python', 'Scala', 'Go']
      },
      
      architecture: {
        components: [
          { name: 'Data Ingestion Layer', description: 'Kafka clusters handling multiple data streams' },
          { name: 'Stream Processing', description: 'Spark Streaming jobs for real-time transformations' },
          { name: 'Storage Layer', description: 'Hot data in Redis, warm in Cassandra, cold in S3' },
          { name: 'API Gateway', description: 'RESTful and WebSocket APIs for data access' },
          { name: 'Visualization', description: 'Real-time dashboards with D3.js and React' }
        ]
      },
      
      metrics: {
        'Throughput': '10M+ events/sec',
        'Latency': '<100ms end-to-end',
        'Uptime': '99.97% availability',
        'Cost Reduction': '65% vs previous solution',
        'Data Sources': '50+ integrated systems',
        'Daily Volume': '1TB+ processed'
      },
      
      challenges: [
        {
          challenge: 'Handling Data Spikes',
          solution: 'Implemented dynamic auto-scaling with predictive algorithms'
        },
        {
          challenge: 'Exactly-Once Processing',
          solution: 'Built custom checkpointing mechanism with idempotent operations'
        },
        {
          challenge: 'Schema Evolution',
          solution: 'Developed schema registry with backward compatibility checks'
        }
      ],
      
      impact: [
        'Reduced decision-making time from hours to seconds',
        'Enabled real-time fraud detection, preventing $2M+ in losses',
        'Improved customer experience with instant personalization',
        'Became the foundation for 10+ new data products'
      ],
      
      learnings: [
        'Importance of comprehensive monitoring from day one',
        'Value of circuit breakers and graceful degradation',
        'Benefits of event-driven architecture for scalability',
        'Critical need for data quality checks at every stage'
      ],
      
      screenshots: [
        { title: 'Real-time Dashboard', url: '/placeholder-dashboard.png' },
        { title: 'System Architecture', url: '/placeholder-architecture.png' },
        { title: 'Performance Metrics', url: '/placeholder-metrics.png' }
      ],
      
      codeSnippets: {
        'Stream Processing Pipeline': `
  # Spark Streaming job for real-time aggregations
  def process_stream(spark):
      # Read from Kafka
      df = spark.readStream \\
          .format("kafka") \\
          .option("kafka.bootstrap.servers", KAFKA_BROKERS) \\
          .option("subscribe", "events") \\
          .load()
      
      # Parse and transform
      events = df.select(
          from_json(col("value").cast("string"), schema).alias("data")
      ).select("data.*")
      
      # Real-time aggregations
      aggregated = events \\
          .withWatermark("timestamp", "1 minute") \\
          .groupBy(
              window("timestamp", "1 minute"),
              "category"
          ) \\
          .agg(
              count("*").alias("event_count"),
              avg("value").alias("avg_value"),
              max("value").alias("max_value")
          )
      
      # Write to multiple sinks
      query = aggregated.writeStream \\
          .outputMode("append") \\
          .trigger(processingTime='10 seconds') \\
          .foreachBatch(write_to_stores) \\
          .start()
      
      return query
        `,
        'Auto-scaling Logic': `
  # Kubernetes HPA with custom metrics
  apiVersion: autoscaling/v2
  kind: HorizontalPodAutoscaler
  metadata:
    name: stream-processor-hpa
  spec:
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: stream-processor
    minReplicas: 3
    maxReplicas: 50
    metrics:
    - type: Pods
      pods:
        metric:
          name: kafka_consumer_lag
        target:
          type: AverageValue
          averageValue: "1000"
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
        `
      },
      
      links: {
        github: 'https://github.com/username/real-time-analytics',
        documentation: 'https://docs.example.com/analytics-platform',
        demo: 'https://demo.example.com/analytics'
      }
    },
    
    // Add other projects with similar structure...
    'ml-pipeline': {
      id: 'ml-pipeline',
      title: 'Automated ML Pipeline Framework',
      subtitle: 'End-to-end MLOps platform with model versioning and A/B testing',
      year: '2024',
      duration: '4 months',
      role: 'ML Engineer',
      team: '3 engineers',
      status: 'Production',
      problem: 'Manual ML model deployment was taking weeks with high error rates.',
      solution: 'Built automated pipeline with CI/CD for ML models.',
      metrics: {
        'Deployment Time': '2 hours',
        'Model Accuracy': '94%',
        'A/B Tests': '50+ concurrent',
        'Models Deployed': '200+'
      },
      techStack: {
        'ML Framework': ['TensorFlow', 'PyTorch', 'Scikit-learn'],
        'MLOps': ['MLflow', 'Kubeflow', 'DVC'],
        'Infrastructure': ['Docker', 'Kubernetes', 'AWS SageMaker']
      },
      architecture: {
        components: [
          { name: 'Model Registry', description: 'Central repository for model versions' },
          { name: 'Training Pipeline', description: 'Automated model training with hyperparameter tuning' },
          { name: 'Deployment Engine', description: 'Blue-green deployment for models' }
        ]
      },
      challenges: [
        { challenge: 'Model Versioning', solution: 'Implemented Git-like versioning for models' }
      ],
      impact: [
        'Reduced model deployment time from weeks to hours',
        'Enabled rapid experimentation with A/B testing'
      ],
      learnings: [
        'Importance of model monitoring in production',
        'Value of automated testing for ML pipelines'
      ],
      screenshots: [
        { title: 'MLOps Dashboard', url: '/placeholder.png' }
      ],
      codeSnippets: {
        'Model Pipeline': `# Sample pipeline code here`
      },
      links: {
        github: 'https://github.com/username/ml-pipeline'
      }
    }
  }