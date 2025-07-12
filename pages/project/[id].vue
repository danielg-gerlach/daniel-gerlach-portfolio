<template>
    <div class="min-h-screen bg-black text-white">
      <!-- Navigation -->
      <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <NuxtLink 
              to="/" 
              class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft class="w-5 h-5" />
              <span>Back to Portfolio</span>
            </NuxtLink>
            
            <div class="flex items-center space-x-4">
              <a v-if="project?.links?.github" :href="project.links.github" target="_blank" rel="noopener noreferrer" 
                 class="p-2 hover:text-blue-400 transition-colors">
                <Github class="w-5 h-5" />
              </a>
              <a v-if="project?.links?.demo" :href="project.links.demo" target="_blank" rel="noopener noreferrer" 
                 class="p-2 hover:text-blue-400 transition-colors">
                <Play class="w-5 h-5" />
              </a>
              <a v-if="project?.links?.documentation" :href="project.links.documentation" target="_blank" rel="noopener noreferrer" 
                 class="p-2 hover:text-blue-400 transition-colors">
                <BookOpen class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>
  
      <div v-if="!project" class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">Project Not Found</h1>
          <NuxtLink to="/" class="text-blue-400 hover:text-blue-300">
            Return to Portfolio
          </NuxtLink>
        </div>
      </div>
  
      <template v-else>
        <!-- Hero Section -->
        <section class="pt-32 pb-16 px-6 border-b border-gray-900">
          <div class="max-w-7xl mx-auto">
            <div class="mb-4 flex items-center space-x-2 text-sm text-gray-400">
              <NuxtLink to="/" class="hover:text-white transition-colors">Portfolio</NuxtLink>
              <ChevronRight class="w-4 h-4" />
              <span class="text-white">{{ project.title }}</span>
            </div>
            
            <h1 class="text-5xl md:text-6xl font-bold mb-4">
              <span class="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {{ project.title }}
              </span>
            </h1>
            
            <p class="text-xl text-gray-400 mb-8 max-w-3xl">{{ project.subtitle }}</p>
            
            <div class="flex flex-wrap gap-6 text-sm">
              <div class="flex items-center space-x-2">
                <Calendar class="w-4 h-4 text-blue-400" />
                <span class="text-gray-400">Duration:</span>
                <span>{{ project.duration }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <Users class="w-4 h-4 text-blue-400" />
                <span class="text-gray-400">Team:</span>
                <span>{{ project.team }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <Award class="w-4 h-4 text-blue-400" />
                <span class="text-gray-400">Role:</span>
                <span>{{ project.role }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <CheckCircle class="w-4 h-4 text-green-400" />
                <span class="text-gray-400">Status:</span>
                <span class="text-green-400">{{ project.status }}</span>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Tabs Navigation -->
        <section class="sticky top-[73px] z-40 bg-black/95 backdrop-blur-md border-b border-gray-800">
          <div class="max-w-7xl mx-auto px-6">
            <div class="flex space-x-8 overflow-x-auto">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'flex items-center space-x-2 py-4 border-b-2 transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-blue-400 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                ]"
              >
                <component :is="tab.icon" class="w-4 h-4" />
                <span>{{ tab.label }}</span>
              </button>
            </div>
          </div>
        </section>
  
        <!-- Tab Content -->
        <section class="py-16 px-6">
          <div class="max-w-7xl mx-auto">
            <!-- Overview Tab -->
            <div v-if="activeTab === 'overview'" class="space-y-16">
              <!-- Problem & Solution -->
              <div class="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 class="text-2xl font-bold mb-6 flex items-center">
                    <AlertCircle class="w-6 h-6 text-red-400 mr-3" />
                    The Problem
                  </h2>
                  <p class="text-gray-300 leading-relaxed">{{ project.problem }}</p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold mb-6 flex items-center">
                    <Target class="w-6 h-6 text-green-400 mr-3" />
                    The Solution
                  </h2>
                  <p class="text-gray-300 leading-relaxed">{{ project.solution }}</p>
                </div>
              </div>
  
              <!-- Key Metrics -->
              <div>
                <h2 class="text-2xl font-bold mb-8 text-center">Key Performance Metrics</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  <div v-for="(value, key) in project.metrics" :key="key" 
                       class="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
                    <div class="text-2xl font-bold text-blue-400 mb-2">{{ value }}</div>
                    <div class="text-sm text-gray-400">{{ key }}</div>
                  </div>
                </div>
              </div>
  
              <!-- Impact -->
              <div>
                <h2 class="text-2xl font-bold mb-6">Business Impact</h2>
                <div class="grid md:grid-cols-2 gap-4">
                  <div v-for="(item, index) in project.impact" :key="index" 
                       class="flex items-start space-x-3">
                    <CheckCircle class="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <p class="text-gray-300">{{ item }}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Technical Details Tab -->
            <div v-if="activeTab === 'technical'" class="space-y-16">
              <!-- Tech Stack -->
              <div>
                <h2 class="text-2xl font-bold mb-8">Technology Stack</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div v-for="(technologies, category) in project.techStack" :key="category" 
                       class="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4 text-blue-400">{{ category }}</h3>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="tech in technologies" :key="tech" 
                            class="px-3 py-1 bg-gray-800 text-sm rounded-full">
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Architecture -->
              <div>
                <h2 class="text-2xl font-bold mb-8">System Architecture</h2>
                <div class="space-y-4">
                  <div v-for="(component, index) in project.architecture.components" :key="index" 
                       class="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-2 text-blue-400">{{ component.name }}</h3>
                    <p class="text-gray-400">{{ component.description }}</p>
                  </div>
                </div>
              </div>
  
              <!-- Challenges & Solutions -->
              <div>
                <h2 class="text-2xl font-bold mb-8">Technical Challenges</h2>
                <div class="space-y-6">
                  <div v-for="(item, index) in project.challenges" :key="index" 
                       class="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-3 text-red-400">
                      Challenge: {{ item.challenge }}
                    </h3>
                    <p class="text-gray-300">
                      <span class="text-green-400 font-semibold">Solution:</span> {{ item.solution }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Results Tab -->
            <div v-if="activeTab === 'results'" class="space-y-16">
              <!-- Screenshots/Demos -->
              <div>
                <h2 class="text-2xl font-bold mb-8">Project Showcase</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div v-for="(screenshot, index) in project.screenshots" :key="index" 
                       class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                    <div class="aspect-video bg-gray-800 flex items-center justify-center">
                      <Database class="w-16 h-16 text-gray-700" />
                    </div>
                    <div class="p-4">
                      <h3 class="font-medium">{{ screenshot.title }}</h3>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Key Learnings -->
              <div>
                <h2 class="text-2xl font-bold mb-8">Key Learnings</h2>
                <div class="grid md:grid-cols-2 gap-6">
                  <div v-for="(learning, index) in project.learnings" :key="index" 
                       class="flex items-start space-x-3">
                    <Zap class="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p class="text-gray-300">{{ learning }}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Code Samples Tab -->
            <div v-if="activeTab === 'code'" class="space-y-8">
              <div class="flex flex-wrap gap-2 mb-8">
                <button
                  v-for="snippetName in Object.keys(project.codeSnippets)"
                  :key="snippetName"
                  @click="selectedCodeSnippet = snippetName"
                  :class="[
                    'px-4 py-2 rounded-lg transition-all',
                    selectedCodeSnippet === snippetName
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-900 border border-gray-800 hover:border-blue-500/50'
                  ]"
                >
                  {{ snippetName }}
                </button>
              </div>
              
              <div class="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div class="bg-gray-800 px-4 py-3 flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 rounded-full bg-red-500" />
                    <div class="w-3 h-3 rounded-full bg-yellow-500" />
                    <div class="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span class="font-mono text-xs text-gray-500">{{ selectedCodeSnippet }}</span>
                </div>
                <pre class="p-6 overflow-x-auto">
                  <code class="text-sm text-gray-300 font-mono">{{ project.codeSnippets[selectedCodeSnippet] }}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Next Project Navigation -->
        <section class="py-16 px-6 border-t border-gray-900">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
              <NuxtLink 
                to="/" 
                class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft class="w-5 h-5" />
                <span>Back to Portfolio</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/" 
                class="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all"
              >
                <span>View All Projects</span>
                <ChevronRight class="w-5 h-5" />
              </NuxtLink>
            </div>
          </div>
        </section>
      </template>
    </div>
  </template>
  
  <script setup>
  import { 
    ArrowLeft, ExternalLink, Github, BookOpen, Play, 
    Calendar, Users, Clock, CheckCircle, AlertCircle,
    Code2, Database, Cloud, Zap, BarChart, Target,
    ChevronRight, Terminal, Layers, Award
  } from 'lucide-vue-next'
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { projectsData } from '~/data/projectsData'
  
  const route = useRoute()
  const activeTab = ref('overview')
  
  const project = computed(() => projectsData[route.params.id])
  const selectedCodeSnippet = ref(Object.keys(project.value?.codeSnippets || {})[0])
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'technical', label: 'Technical Details', icon: Code2 },
    { id: 'results', label: 'Results & Impact', icon: BarChart },
    { id: 'code', label: 'Code Samples', icon: Terminal }
  ]
  </script>