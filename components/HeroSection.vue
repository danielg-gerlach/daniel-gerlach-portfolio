<template>
    <section id="init" class="min-h-screen flex items-center justify-center px-6 pt-20">
      <div class="max-w-5xl w-full">
        <!-- Terminal Window -->
        <div class="bg-gray-900/90 rounded-lg border border-gray-800 overflow-hidden shadow-2xl backdrop-blur-sm">
          <div class="bg-gray-800 px-4 py-3 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full bg-red-500" />
              <div class="w-3 h-3 rounded-full bg-yellow-500" />
              <div class="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span class="font-mono text-xs text-gray-500">python3 portfolio.py</span>
          </div>
          
          <div class="p-6 min-h-[400px]">
            <pre class="font-mono text-sm text-gray-300 overflow-x-auto"><code>{{ displayedCode }}<span v-if="currentLineIndex < pythonCode.length && showCursor" class="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse" /></code></pre>
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
          
          <h1 class="text-5xl md:text-7xl font-bold mb-4 animate-fadeIn">
            <span class="text-white">Daniel </span>
            <span class="text-blue-400">Gerlach</span>
          </h1>
          <p class="text-xl text-gray-400 mb-8 animate-fadeIn animation-delay-200">
            Business Informatics Student • Data Engineering & AI
          </p>
          
          <!-- Social Links with better hover states -->
          <div class="flex items-center justify-center space-x-4 animate-fadeIn animation-delay-400">
            <a href="https://github.com/danielg-gerlach" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="p-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 hover:bg-gray-800 transition-all group"
               title="GitHub Profile">
              <Github class="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            </a>
            <a href="https://linkedin.com/in/danielg-gerlach/" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="p-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 hover:bg-gray-800 transition-all group"
               title="LinkedIn Profile">
              <Linkedin class="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            </a>
            <a href="mailto:danielg-gerlach@outlook.de" 
               class="p-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 hover:bg-gray-800 transition-all group"
               title="Send Email">
              <Mail class="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            </a>
          </div>
          
          <!-- Scroll indicator -->
          <div class="mt-16 animate-bounce">
            <ChevronDown class="w-6 h-6 text-gray-600 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { User, Github, Linkedin, Mail, ChevronDown } from 'lucide-vue-next'
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
    // Faster, smoother typing animation
    let charIndex = 0
    let lineIndex = 0
    
    const typeCode = () => {
      if (lineIndex < pythonCode.length) {
        const currentLine = pythonCode[lineIndex]
        
        if (charIndex < currentLine.length) {
          displayedCode.value += currentLine[charIndex]
          charIndex++
          setTimeout(typeCode, 20) // Faster typing
        } else {
          displayedCode.value += '\n'
          charIndex = 0
          lineIndex++
          currentLineIndex.value = lineIndex
          setTimeout(typeCode, 100) // Pause between lines
        }
      }
    }
    
    // Start typing after a short delay
    setTimeout(typeCode, 500)
    
    // Cursor blink
    setInterval(() => {
      showCursor.value = !showCursor.value
    }, 500)
  })
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  
  .animation-delay-400 {
    animation-delay: 400ms;
  }
  </style>