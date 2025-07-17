<template>
    <section id="articles" class="py-32 px-6 bg-gray-950">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-mono text-blue-400 text-sm mb-2">[4] ARTICLES</h2>
        <p class="text-3xl font-bold mb-12">My Posts on Medium</p>
        
        <div class="space-y-4">
          <a
            v-for="(article, index) in articles"
            :key="index"
            :href="article.url"
            target="_blank"
            rel="noopener noreferrer"
            class="block group p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all duration-300"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                  {{ article.title }}
                </h3>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span class="flex items-center space-x-1">
                    <Clock class="w-4 h-4" />
                    <span>{{ article.readTime }}</span>
                  </span>
                  <span>•</span>
                  <span>{{ article.year }}</span>
                </div>
              </div>
              <ChevronRight class="w-5 h-5 text-gray-500 group-hover:text-blue-400 ml-4 transform group-hover:translate-x-1 transition-all" />
            </div>
          </a>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { Clock, ChevronRight } from 'lucide-vue-next'
  
  const articles = [
    {
      title: "From Data Warehouse to Data Lakehouse",
      readTime: "8 min",
      year: "2024",
      url: "https://medium.com/@danielowitch97/from-data-warehouse-to-data-lakehouse-8b93eee02497"
    },
    {
      title: "Graph Databases & Knowledge Graphs",
      readTime: "6 min",
      year: "2024",
      url: "https://medium.com/@danielowitch97/graph-databases-knowledge-graphs-powering-recommendation-systems-and-advanced-analytics-2260c69850aa"
    }
  ]
  </script>