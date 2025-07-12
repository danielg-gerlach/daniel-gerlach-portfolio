<template>
    <section id="skills" class="py-32 px-6 border-t border-gray-900">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-mono text-blue-400 text-sm mb-2">[3] SKILLS</h2>
        <p class="text-3xl font-bold mb-12">Technical Stack</p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <!-- Programming Languages -->
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
            <h3 class="text-sm font-mono text-gray-400 mb-4">LANGUAGES</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🐍</span>
                <span class="font-medium">Python</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🗃️</span>
                <span class="font-medium">SQL</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">☕</span>
                <span class="font-medium">Java</span>
              </div>
            </div>
          </div>
  
          <!-- Big Data -->
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
            <h3 class="text-sm font-mono text-gray-400 mb-4">BIG DATA</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">⚡</span>
                <span class="font-medium">Spark</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">📊</span>
                <span class="font-medium">Kafka</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🔄</span>
                <span class="font-medium">Airflow</span>
              </div>
            </div>
          </div>
  
          <!-- Databases -->
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
            <h3 class="text-sm font-mono text-gray-400 mb-4">DATABASES</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🐘</span>
                <span class="font-medium">PostgreSQL</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">❄️</span>
                <span class="font-medium">Snowflake</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🍃</span>
                <span class="font-medium">MongoDB</span>
              </div>
              <div class="flex items-center space-x-3">
                <Database class="w-5 h-5 text-blue-400" />
                <span class="font-medium">BigQuery</span>
              </div>
            </div>
          </div>
  
          <!-- Cloud -->
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
            <h3 class="text-sm font-mono text-gray-400 mb-4">CLOUD</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <Cloud class="w-5 h-5 text-orange-400" />
                <span class="font-medium">AWS</span>
              </div>
              <div class="flex items-center space-x-3">
                <Cloud class="w-5 h-5 text-blue-400" />
                <span class="font-medium">GCP</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🐳</span>
                <span class="font-medium">Docker</span>
              </div>
            </div>
          </div>
  
          <!-- Data Tools -->
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
            <h3 class="text-sm font-mono text-gray-400 mb-4">DATA TOOLS</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🔧</span>
                <span class="font-medium">dbt</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🐼</span>
                <span class="font-medium">Pandas</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">📈</span>
                <span class="font-medium">InfluxDB</span>
              </div>
            </div>
          </div>
  
          <!-- Analytics -->
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
            <h3 class="text-sm font-mono text-gray-400 mb-4">ANALYTICS</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">📊</span>
                <span class="font-medium">Data Modeling</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">Ⓜ️</span>
                <span class="font-medium">MS Fabric</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🦆</span>
                <span class="font-medium">DuckDB</span>
              </div>
            </div>
          </div>
  
          <!-- DevOps -->
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
            <h3 class="text-sm font-mono text-gray-400 mb-4">DEVOPS</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <GitBranch class="w-5 h-5 text-gray-400" />
                <span class="font-medium">Git</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">☸️</span>
                <span class="font-medium">Kubernetes</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🏗️</span>
                <span class="font-medium">Terraform</span>
              </div>
            </div>
          </div>
  
          <!-- Infrastructure -->
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
            <h3 class="text-sm font-mono text-gray-400 mb-4">MORE</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🧱</span>
                <span class="font-medium">Databricks</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🔴</span>
                <span class="font-medium">Redis</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🚀</span>
                <span class="font-medium">FastAPI</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-16">
          <h3 class="text-lg font-semibold mb-6 text-blue-400">Certifications</h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div v-for="cert in certifications" :key="cert.title" 
                 class="p-4 bg-gray-900 border border-gray-800 rounded-lg">
              <Award class="w-8 h-8 text-blue-400 mb-3" />
              <h4 class="font-medium mb-1">{{ cert.title }}</h4>
              <p class="text-sm text-gray-400">{{ cert.issuer }}</p>
              <p class="text-sm text-gray-500 mt-2">{{ cert.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { Database, Cloud, GitBranch, Award } from 'lucide-vue-next'
  
  const certifications = [
    {
      title: "AWS Certified Data Analytics - Specialty",
      issuer: "Amazon Web Services",
      year: "2024"
    },
    {
      title: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      year: "2023"
    },
    {
      title: "Databricks Certified Data Engineer",
      issuer: "Databricks",
      year: "2023"
    }
  ]
  </script>