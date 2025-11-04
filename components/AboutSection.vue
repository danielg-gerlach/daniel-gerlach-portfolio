<template>
    <section id="about" class="py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-mono text-blue-400 text-base mb-2">[1] ABOUT</h2>
        <h3 class="text-3xl md:text-4xl font-bold mb-8">About Me</h3>
        
        <!-- Main About Content -->
        <div class="space-y-6 text-gray-300 text-lg leading-relaxed mb-16">
          <p>
            I'm a Business Informatics student specializing in Data Engineering & AI Application Development, passionate about building robust, scalable data infrastructure and AI-driven applications that power intelligent decision-making.
          </p>
          <p>
            My interests span the entire data lifecycle - from ingesting and processing of raw data to building machine learning & AI pipelines that deliver real-time insights. I really like solving data challenges and optimizing data & AI applications for performance and reliability.
          </p>
          <p>
            I'm currently focused on improving my data understanding as well as technical skillset like Python, SQL (dbt) & Databricks.
          </p>
        </div>
        
        <!-- Currently Learning -->
        <div class="mb-16">
          <h3 class="text-2xl font-bold mb-6 flex items-center">
            <BookOpen class="w-6 h-6 text-blue-400 mr-3" />
            Currently Learning
          </h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all">
              <h4 class="font-semibold text-blue-400 mb-2">dbt (Data Build Tool)</h4>
              <p class="text-sm text-gray-400">Building modular SQL transformations for data warehousing</p>
            </div>
            <div class="p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all">
              <h4 class="font-semibold text-blue-400 mb-2">PySpark</h4>
              <p class="text-sm text-gray-400">Data transformation & cleaning using Spark</p>
            </div>
            <div class="p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all">
              <h4 class="font-semibold text-blue-400 mb-2">Dimensional Data Modeling</h4>
              <p class="text-sm text-gray-400">Designing data models optimized for analytics and BI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { BookOpen, Heart, Zap, Shield, Users, Lightbulb } from 'lucide-vue-next'
  </script>