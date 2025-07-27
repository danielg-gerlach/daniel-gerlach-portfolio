<template>
    <div class="min-h-screen bg-black text-white">
      <!-- Navigation -->
      <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <button 
              @click="navigateToProjects"
              class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </button>
            
            <!-- Project Navigation (Desktop) -->
            <div class="hidden md:flex items-center space-x-4">
              <button
                v-if="previousProject"
                @click="navigateToProject(previousProject.id)"
                class="text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Previous
              </button>
              <span class="text-gray-600">•</span>
              <button
                v-if="nextProject"
                @click="navigateToProject(nextProject.id)"
                class="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      <div v-if="!project" class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">Project Not Found</h1>
          <button @click="navigateToProjects" class="text-blue-400 hover:text-blue-300">
            Return to Projects
          </button>
        </div>
      </div>
  
      <template v-else>
        <!-- Hero Section with improved spacing -->
        <section class="pt-24 pb-16 px-6 border-b border-gray-900">
          <div class="max-w-7xl mx-auto">
            <div class="mb-4 flex items-center space-x-2 text-sm text-gray-400">
              <NuxtLink to="/" class="hover:text-white transition-colors">Portfolio</NuxtLink>
              <ChevronRight class="w-4 h-4" />
              <button @click="navigateToProjects" class="hover:text-white transition-colors">Projects</button>
              <ChevronRight class="w-4 h-4" />
              <span class="text-white">{{ project.title }}</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-bold mb-4">
              <span class="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {{ project.title }}
              </span>
            </h1>
            
            <p class="text-xl text-gray-400 mb-8 max-w-3xl">{{ project.subtitle }}</p>
            
            <div class="flex flex-wrap gap-6 text-sm mb-8">
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
                <CheckCircle :class="['w-4 h-4', statusColor]" />
                <span class="text-gray-400">Status:</span>
                <span :class="statusColor">{{ project.status }}</span>
              </div>
            </div>
            
            <!-- Action Buttons moved to hero -->
            <div class="flex flex-wrap gap-3">
              <a 
                v-if="project?.links?.github" 
                :href="project.links.github" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 text-sm group"
              >
                <Github class="w-4 h-4" />
                <span>View Project</span>
                <ExternalLink class="w-3 h-3" />
              </a>
              
              <a 
                :href="project?.links?.demo || '#'" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-300 text-sm group"
              >
                <Play class="w-4 h-4" />
                <span>Live Demo</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>
  
        <!-- Tabs Navigation - Simplified for mobile -->
        <section class="sticky top-[57px] z-40 bg-black/95 backdrop-blur-md border-b border-gray-800">
          <div class="max-w-7xl mx-auto px-6">
            <div class="flex space-x-2 md:space-x-8 overflow-x-auto scrollbar-hide">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="handleTabClick(tab.id)"
                :disabled="isTabDisabled(tab.id)"
                :class="[
                  'flex items-center space-x-2 py-4 px-2 md:px-0 border-b-2 transition-all whitespace-nowrap text-sm md:text-base',
                  activeTab === tab.id
                    ? 'border-blue-400 text-white'
                    : isTabDisabled(tab.id)
                      ? 'border-transparent text-gray-600 cursor-not-allowed'
                      : 'border-transparent text-gray-400 hover:text-white cursor-pointer'
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
            <div v-if="activeTab === 'overview'" class="space-y-16 animate-fadeIn">
              <!-- Problem & Solution -->
              <div class="grid md:grid-cols-2 gap-8 md:gap-12">
                <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                  <h2 class="text-2xl font-bold mb-6 flex items-center">
                    <AlertCircle class="w-6 h-6 text-red-400 mr-3" />
                    The Problem
                  </h2>
                  <p class="text-gray-300 leading-relaxed">{{ project.problem }}</p>
                </div>
                <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
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
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div v-for="(value, key) in project.metrics" :key="key" 
                       class="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center hover:border-blue-500/50 transition-all group">
                    <div class="text-2xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">{{ value }}</div>
                    <div class="text-sm text-gray-400">{{ key }}</div>
                  </div>
                </div>
              </div>
  
              <!-- Impact -->
              <div>
                <h2 class="text-2xl font-bold mb-6">Business Impact</h2>
                <div class="grid md:grid-cols-2 gap-4">
                  <div v-for="(item, index) in project.impact" :key="index" 
                       class="flex items-start space-x-3 p-4 bg-gray-900/30 rounded-lg">
                    <CheckCircle class="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <p class="text-gray-300">{{ item }}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Technical Details Tab -->
            <div v-if="activeTab === 'technical'" class="space-y-16 animate-fadeIn">
              <!-- Tech Stack -->
              <div>
                <h2 class="text-2xl font-bold mb-8">Technology Stack</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div v-for="(technologies, category) in project.techStack" :key="category" 
                       class="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all">
                    <h3 class="text-lg font-semibold mb-4 text-blue-400">{{ category }}</h3>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="tech in technologies" :key="tech" 
                            class="px-3 py-1 bg-gray-800 text-sm rounded-full hover:bg-gray-700 transition-colors">
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
                       class="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all group">
                    <h3 class="text-lg font-semibold mb-2 text-blue-400 group-hover:translate-x-1 transition-transform">
                      {{ component.name }}
                    </h3>
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
            <div v-if="activeTab === 'results'" class="space-y-16 animate-fadeIn">
              <!-- Screenshots/Demos -->
              <div v-if="project.screenshots && project.screenshots.length > 0">
                <h2 class="text-2xl font-bold mb-8">Project Showcase</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div v-for="(screenshot, index) in project.screenshots" :key="index" 
                       class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden group">
                    <div class="aspect-video bg-gray-800 overflow-hidden cursor-pointer relative" 
                         @click="openImageInNewTab(screenshot.url)"
                         title="Click to view full size">
                      <img 
                        :src="screenshot.url" 
                        :alt="screenshot.title" 
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <!-- Overlay icon to indicate clickability -->
                      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <ExternalLink class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
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
                       class="flex items-start space-x-3 p-4 bg-gray-900/30 rounded-lg">
                    <Zap class="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p class="text-gray-300">{{ learning }}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Code Samples Tab -->
            <div v-if="activeTab === 'code'" class="space-y-8 animate-fadeIn">
              <div class="flex flex-wrap gap-2 mb-8">
                <button
                  v-for="snippetName in Object.keys(project.codeSnippets)"
                  :key="snippetName"
                  @click="selectedCodeSnippet = snippetName"
                  :class="[
                    'px-4 py-2 rounded-lg transition-all text-sm',
                    selectedCodeSnippet === snippetName
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-900 border border-gray-800 hover:border-blue-500/50'
                  ]"
                >
                  {{ snippetName }}
                </button>
              </div>
              
              <div class="relative bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div class="bg-gray-800 px-4 py-3 flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 rounded-full bg-red-500" />
                    <div class="w-3 h-3 rounded-full bg-yellow-500" />
                    <div class="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="font-mono text-xs text-gray-500">{{ selectedCodeSnippet }}</span>
                    <button
                      @click="copyCode"
                      class="text-gray-400 hover:text-white transition-colors p-1"
                      title="Copy code"
                    >
                      <Copy v-if="!codeCopied" class="w-4 h-4" />
                      <CheckCircle v-else class="w-4 h-4 text-green-400" />
                    </button>
                  </div>
                </div>
                <pre class="p-6 overflow-x-auto"><code class="text-sm text-gray-300 font-mono">{{ project.codeSnippets[selectedCodeSnippet] }}</code></pre>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Project Navigation Footer -->
        <section class="py-16 px-6 border-t border-gray-900">
          <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-3 gap-6 items-center">
              <!-- Previous Project -->
              <div v-if="previousProject" class="text-left">
                <p class="text-sm text-gray-500 mb-2">Previous Project</p>
                <button
                  @click="navigateToProject(previousProject.id)"
                  class="group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ChevronLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>{{ previousProject.title }}</span>
                </button>
              </div>
              <div v-else></div>
              
              <!-- Back to Projects -->
              <div class="text-center">
                <button 
                  @click="navigateToProjects"
                  class="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                >
                  <Layers class="w-5 h-5" />
                  <span>View All Projects</span>
                </button>
              </div>
              
              <!-- Next Project -->
              <div v-if="nextProject" class="text-right">
                <p class="text-sm text-gray-500 mb-2">Next Project</p>
                <button
                  @click="navigateToProject(nextProject.id)"
                  class="group inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <span>{{ nextProject.title }}</span>
                  <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div v-else></div>
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
    ChevronRight, ChevronLeft, Terminal, Layers, Award,
    Copy
  } from 'lucide-vue-next'
  import { ref, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { projectsData } from '~/data/projectsData'
  
  const route = useRoute()
  const router = useRouter()
  const activeTab = ref('overview')
  const codeCopied = ref(false)
  
  const project = computed(() => projectsData[route.params.id])
  const selectedCodeSnippet = ref(Object.keys(project.value?.codeSnippets || {})[0])
  
  // Get project navigation
  const projectIds = Object.keys(projectsData)
  const currentIndex = projectIds.indexOf(route.params.id)
  const previousProject = computed(() => 
    currentIndex > 0 ? {
      id: projectIds[currentIndex - 1],
      title: projectsData[projectIds[currentIndex - 1]].title
    } : null
  )
  const nextProject = computed(() => 
    currentIndex < projectIds.length - 1 ? {
      id: projectIds[currentIndex + 1],
      title: projectsData[projectIds[currentIndex + 1]].title
    } : null
  )
  
  // Status color based on project status
  const statusColor = computed(() => {
    switch(project.value?.status) {
      case 'Completed': return 'text-green-400'
      case 'In Progress': return 'text-yellow-400'
      case 'In Development': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  })
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'technical', label: 'Technical', icon: Code2 },
    { id: 'results', label: 'Results', icon: BarChart },
    { id: 'code', label: 'Code', icon: Terminal }
  ]
  
  const navigateToProject = (projectId) => {
    router.push(`/project/${projectId}`)
    window.scrollTo(0, 0)
  }
  
  const navigateToProjects = () => {
    // Use hash navigation which the Navigation component will handle
    router.push('/#projects')
  }
  
  const copyCode = async () => {
    const code = project.value.codeSnippets[selectedCodeSnippet.value]
    await navigator.clipboard.writeText(code)
    codeCopied.value = true
    setTimeout(() => {
      codeCopied.value = false
    }, 2000)
  }
  
  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, '_blank', 'noopener,noreferrer')
  }
  
  // Check if tab should be disabled for "In Development" projects
  const isTabDisabled = (tabId) => {
  return false // All tabs are always enabled
}
  
  // Handle tab click with disabled check
  const handleTabClick = (tabId) => {
    if (!isTabDisabled(tabId)) {
      activeTab.value = tabId
    }
  }
  </script>
  
  <style scoped>
  /* Hide scrollbar for tabs on mobile */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Fade in animation */
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
    animation: fadeIn 0.5s ease-out;
  }
  </style>