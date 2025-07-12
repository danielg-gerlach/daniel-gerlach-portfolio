<template>
    <section id="projects" class="py-32 px-6 bg-gray-950">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-mono text-blue-400 text-sm mb-2">[2] PROJECTS</h2>
        <p class="text-3xl font-bold mb-12">Featured Work</p>
        
        <div class="space-y-6">
          <NuxtLink
            v-for="project in projects"
            :key="project.id"
            :to="`/project/${project.id}`"
            class="block group"
          >
            <div class="p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all duration-300">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {{ project.title }}
                  </h3>
                  <p class="text-gray-400 mb-4">
                    {{ project.description }} • <span class="font-bold">{{ project.year }}</span>
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in project.tech" :key="tech" 
                          class="px-3 py-1 bg-gray-800 text-sm rounded font-mono">
                      {{ tech }}
                    </span>
                  </div>
                </div>
                <ChevronRight class="w-5 h-5 text-gray-500 group-hover:text-blue-400 ml-4 transform group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ChevronRight } from 'lucide-vue-next'
  
  const projects = [
    {
      id: 'real-time-analytics',
      title: 'Real-Time Analytics Platform',
      description: 'Distributed stream processing system handling 10M+ events/sec',
      tech: ['Apache Kafka', 'Spark Streaming', 'Kubernetes', 'Python'],
      year: '2024'
    },
    {
      id: 'ml-pipeline',
      title: 'Automated ML Pipeline Framework',
      description: 'End-to-end MLOps platform with model versioning and A/B testing',
      tech: ['TensorFlow', 'MLflow', 'Airflow', 'Docker'],
      year: '2024'
    },
    {
      id: 'data-warehouse',
      title: 'Cloud Data Warehouse Migration',
      description: 'Migrated 500TB on-premise warehouse to cloud with 70% cost reduction',
      tech: ['Snowflake', 'dbt', 'Terraform', 'AWS'],
      year: '2023'
    },
    {
      id: 'recommendation-engine',
      title: 'Personalization Engine',
      description: 'Real-time recommendation system serving 50M+ daily predictions',
      tech: ['PyTorch', 'Redis', 'FastAPI', 'Ray'],
      year: '2023'
    }
  ]
  </script>