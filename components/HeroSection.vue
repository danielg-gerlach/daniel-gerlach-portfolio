<template>
    <section id="init" class="min-h-screen flex items-center justify-center px-6 pt-20">
      <div class="max-w-5xl w-full">
        <div class="bg-gray-900/90 rounded-lg border border-gray-800 overflow-hidden shadow-2xl">
          <div class="bg-gray-800 px-4 py-3 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full bg-red-500" />
              <div class="w-3 h-3 rounded-full bg-yellow-500" />
              <div class="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span class="font-mono text-xs text-gray-500">python3 portfolio.py</span>
          </div>
          
          <div class="p-6">
            <pre class="font-mono text-sm text-gray-300 overflow-x-auto"><code>{{ displayedCode }}<span v-if="currentLineIndex < pythonCode.length && showCursor" class="inline-block w-2 h-4 bg-blue-400 ml-1" /></code></pre>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <!-- Profile Picture -->
            <div class="w-48 h-48 mx-auto mb-8 rounded-full bg-gray-800 border-2 border-blue-500 overflow-hidden">
            <img 
                src="/profile.jpg" 
                alt="Daniel Gerlach" 
                class="w-full h-full object-cover"
            />
            </div>
          
          <h1 class="text-5xl md:text-7xl font-bold mb-4">
            <span class="text-white">Daniel </span>
            <span class="text-blue-400">Gerlach</span>
          </h1>
          <p class="text-xl text-gray-400 mb-8">
            Business Informatics Student • Data Engineering & AI
          </p>
          
          <div class="flex items-center justify-center space-x-4">
            <a href="https://github.com/danielg-gerlach" target="_blank" rel="noopener noreferrer" 
               class="p-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all">
              <Github class="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/danielg-gerlach/" target="_blank" rel="noopener noreferrer" 
               class="p-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all">
              <Linkedin class="w-5 h-5" />
            </a>
            <a href="mailto:danielg-gerlach@outlook.de" 
               class="p-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all">
              <Mail class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { User, Github, Linkedin, Mail } from 'lucide-vue-next'
  import { ref, onMounted } from 'vue'
  
  const displayedCode = ref('')
  const currentLineIndex = ref(0)
  const showCursor = ref(true)
  
  const pythonCode = [
    ">>> import pandas as pd",
    ">>> import numpy as np",
    ">>> from sklearn.pipeline import Pipeline",
    ">>> from pyspark.sql import SparkSession",
    ">>> ",
    ">>> # Initialize data engineering pipeline",
    ">>> spark = SparkSession.builder \\",
    "...     .appName('daniel_gerlach_portfolio') \\",
    "...     .config('spark.sql.adaptive.enabled', True) \\",
    "...     .getOrCreate()",
    ">>> ",
    ">>> # Load and transform data at scale",
    ">>> df = spark.read.parquet('s3://data-lake/raw/*')",
    ">>> transformed = df.filter(df.quality_score > 0.95) \\",
    "...     .groupBy('category') \\",
    "...     .agg({'value': 'sum', 'timestamp': 'max'})",
    ">>> ",
    ">>> print(f'Processing {transformed.count():,} records')",
    "Processing 10,847,293 records",
    ">>> ",
    ">>> # Ready for ML pipeline",
    ">>> status = 'INITIALIZED'",
    ">>> print(f'Portfolio status: {status}')",
    "Portfolio status: INITIALIZED"
  ]
  
  onMounted(() => {
    // Type out Python code line by line
    const typeCode = () => {
      if (currentLineIndex.value < pythonCode.length) {
        displayedCode.value += pythonCode[currentLineIndex.value] + '\n'
        currentLineIndex.value++
        setTimeout(typeCode, 150)
      }
    }
    typeCode()
    
    // Cursor blink
    setInterval(() => {
      showCursor.value = !showCursor.value
    }, 500)
  })
  </script>