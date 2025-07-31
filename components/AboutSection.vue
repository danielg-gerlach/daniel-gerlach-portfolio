<template>
    <section id="about" class="py-32 px-6">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-mono text-blue-400 text-sm mb-4">[1] ABOUT</h2>
        
        <!-- Main About Content -->
        <div class="space-y-6 text-gray-300 text-lg leading-relaxed mb-16">
          <p>
            I'm a Business Informatics student specializing in Data Engineering & AI Application Development, passionate about 
            building robust, scalable data infrastructure and AI-driven applications that power intelligent decision-making.
          </p>
          <p>
            My skills span the entire data lifecycle - from ingesting and processing 
            of raw data to building machine learning pipelines that deliver real-time insights. 
            I really like solving complex data challenges and optimizing data & AI applications 
            for performance and reliability.
          </p>
          <p>
            Currently focused on real-time stream processing, AI-powered application development, and 
            agentic AI. I believe in writing clean, maintainable code and building systems 
            that scale gracefully with business needs.
          </p>
          <p>
            I also work as a freelancer in the field of Data & AI, helping businesses leverage data and AI to streamline their processes 
            and benefit efficiency. 
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
              <h4 class="font-semibold text-blue-400 mb-2">Developing AI Agents</h4>
              <p class="text-sm text-gray-400">Building business-ready AI Agents in Python</p>
            </div>
            <div class="p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all">
              <h4 class="font-semibold text-blue-400 mb-2">Apache Spark</h4>
              <p class="text-sm text-gray-400">Data transformation & cleaning using Spark</p>
            </div>
            <div class="p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all">
              <h4 class="font-semibold text-blue-400 mb-2">Vector Databases</h4>
              <p class="text-sm text-gray-400">Scaling similarity search for AI applications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { BookOpen, Heart, Zap, Shield, Users, Lightbulb } from 'lucide-vue-next'
  </script>