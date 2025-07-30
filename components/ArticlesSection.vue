<template>
    <section id="articles" class="py-32 px-6 bg-gray-950">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-mono text-blue-400 text-sm mb-2">[4] ARTICLES</h2>
        <p class="text-3xl font-bold mb-4">My Posts on Medium</p>
        <p class="text-gray-400 mb-12">Technical articles about data engineering, analytics, and modern data stack</p>
        
        <div class="space-y-6">
          <a
            v-for="(article, index) in articles"
            :key="index"
            :href="article.url"
            target="_blank"
            rel="noopener noreferrer"
            class="block group relative p-8 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
          >
            <!-- Background gradient on hover -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div class="relative flex items-start space-x-6">
              <!-- Medium Logo -->
              <div class="flex-shrink-0 mt-1">
                <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <!-- Medium Logo SVG in white -->
                  <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                  </svg>
                </div>
              </div>
              
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <!-- Title -->
                <h3 class="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors leading-tight">
                  {{ article.title }}
                </h3>
                
                <!-- Article Preview -->
                <p class="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                  {{ article.preview }}
                </p>
                
                <!-- Meta Information -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span class="flex items-center space-x-1.5">
                      <Clock class="w-4 h-4" />
                      <span class="font-medium">{{ article.readTime }}</span>
                    </span>
                    <span class="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span class="flex items-center space-x-1.5">
                      <Calendar class="w-4 h-4" />
                      <span class="font-medium">{{ article.year }}</span>
                    </span>
                    <span class="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span class="flex items-center space-x-1.5 text-blue-400">
                      <ExternalLink class="w-4 h-4" />
                      <span class="font-medium">Medium</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Hover Arrow -->
              <div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <ChevronRight class="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>
            
            <!-- Reading Progress Indicator -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
              <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { Clock, ChevronRight, Calendar, ExternalLink } from 'lucide-vue-next'
  
  const articles = [
    {
      title: "From Data Warehouse to Data Lakehouse",
      preview: "Exploring the evolution of data architecture patterns and how modern lakehouse solutions bridge the gap between traditional data warehouses and data lakes for better analytics performance.",
      readTime: "8 min",
      year: "2024",
      url: "https://medium.com/@danielowitch97/from-data-warehouse-to-data-lakehouse-8b93eee02497"
    },
    {
      title: "Graph Databases & Knowledge Graphs",
      preview: "Deep dive into graph databases and knowledge graphs, their applications in recommendation systems, and how they're transforming advanced analytics in modern data architectures.",
      readTime: "6 min",
      year: "2024",
      url: "https://medium.com/@danielowitch97/graph-databases-knowledge-graphs-powering-recommendation-systems-and-advanced-analytics-2260c69850aa"
    }
  ]
  </script>