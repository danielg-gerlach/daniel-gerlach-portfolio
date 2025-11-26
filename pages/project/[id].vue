<template>
    <div class="min-h-screen bg-black text-white">
      <!-- Project Navigation Header -->
      <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <!-- Previous Project -->
            <div class="flex-1">
              <button
                v-if="previousProject"
                @click="navigateToProject(previousProject.id)"
                class="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div class="text-left hidden sm:block">
                  <p class="text-xs text-gray-500">Previous</p>
                  <span class="text-sm">{{ previousProject.title }}</span>
                </div>
                <span class="sm:hidden text-sm">Previous</span>
              </button>
            </div>
            
            <!-- All Projects -->
            <div class="flex-shrink-0">
              <button 
                @click="navigateToProjects"
                class="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-sm"
              >
                <Layers class="w-4 h-4" />
                <span class="hidden sm:inline">All Projects</span>
              </button>
            </div>
            
            <!-- Next Project -->
            <div class="flex-1 flex justify-end">
              <button
                v-if="nextProject"
                @click="navigateToProject(nextProject.id)"
                class="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <span class="sm:hidden text-sm">Next</span>
                <div class="text-right hidden sm:block">
                  <p class="text-xs text-gray-500">Next</p>
                  <span class="text-sm">{{ nextProject.title }}</span>
                </div>
                <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
        <section class="pt-24 pb-16 px-6">
          <div class="max-w-7xl mx-auto">
            <div class="mb-4 flex items-center space-x-2 text-sm text-gray-400">
              <NuxtLink to="/" class="hover:text-white transition-colors">Portfolio</NuxtLink>
              <ChevronRight class="w-4 h-4" />
              <button @click="navigateToProjects" class="hover:text-white transition-colors">Projects</button>
              <ChevronRight class="w-4 h-4" />
              <span class="text-white">{{ project.title }}</span>
            </div>
            
            <div class="flex items-center gap-4 mb-8">
              <h1 class="text-4xl md:text-6xl font-bold">
                <span class="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {{ project.title }}
                </span>
              </h1>
              <span v-if="project.type === 'work'" class="px-3 py-1 bg-purple-900/50 text-purple-400 text-sm rounded-full border border-purple-800">
                Work Project
              </span>
              <span v-if="project.type === 'personal'" class="px-3 py-1 bg-blue-900/50 text-blue-400 text-sm rounded-full border border-blue-800">
                Personal Project
              </span>
            </div>
            
            <!-- TL;DR Box - 30-Second Scan for Recruiters -->
            <div class="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50 rounded-lg p-6 mb-8">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-blue-400 mb-2">TL;DR - Quick Summary</h3>
                  <p class="text-gray-200 leading-relaxed">
                    {{ project.tldr || project.subtitle }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Key Skills Tags - Prominent for ATS & Recruiter Scanning -->
            <div class="flex flex-wrap gap-2 mb-8">
              <template v-for="(technologies, category) in project.techStack" :key="category">
                <span 
                  v-for="tech in technologies.slice(0, 2)" 
                  :key="tech"
                  class="px-3 py-1.5 bg-blue-600/20 text-blue-300 text-sm font-medium rounded-full border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
                >
                  {{ tech }}
                </span>
              </template>
            </div>
            
            <div class="flex flex-wrap gap-6 text-sm mb-8">
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
              <div 
                v-if="project?.links?.github"
                class="relative group/tooltip"
              >
                <a 
                  :href="project.status === 'In Development' ? undefined : project.links.github" 
                  :target="project.status === 'In Development' ? undefined : '_blank'" 
                  :rel="project.status === 'In Development' ? undefined : 'noopener noreferrer'"
                  :class="[
                    'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm',
                    project.status === 'In Development' 
                      ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-800 hover:bg-gray-700 text-white group cursor-pointer'
                  ]"
                  @click.prevent="project.status === 'In Development' ? null : window.open(project.links.github, '_blank')"
                >
                  <Github class="w-4 h-4" />
                  <span>View Project</span>
                  <ExternalLink v-if="project.status !== 'In Development'" class="w-3 h-3" />
                  <Lock v-else class="w-3 h-3" />
                </a>
                <!-- Tooltip for disabled state -->
                <div 
                  v-if="project.status === 'In Development'"
                  class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700"
                >
                  Come back in some time to see the results! 🚀
                  <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              
              <div 
                v-if="project?.links?.demo && project?.type !== 'work'"
                class="relative group/tooltip"
              >
                <a 
                  :href="project.status === 'In Development' ? undefined : project.links.demo" 
                  :target="project.status === 'In Development' ? undefined : '_blank'" 
                  :rel="project.status === 'In Development' ? undefined : 'noopener noreferrer'"
                  :class="[
                    'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm',
                    project.status === 'In Development' 
                      ? 'bg-blue-600/30 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white group cursor-pointer'
                  ]"
                  @click.prevent="project.status === 'In Development' ? null : window.open(project.links.demo, '_blank')"
                >
                  <Play class="w-4 h-4" />
                  <span>Live Demo</span>
                  <ExternalLink v-if="project.status !== 'In Development'" class="w-3 h-3" />
                  <Lock v-else class="w-3 h-3" />
                </a>
                <!-- Tooltip for disabled state -->
                <div 
                  v-if="project.status === 'In Development'"
                  class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700"
                >
                  Come back in some time to see the results! 🚀
                  <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              
              <div 
                v-if="project?.type === 'work'"
                class="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg text-sm cursor-not-allowed"
                title="Demo not available due to business & data privacy"
              >
                <Lock class="w-4 h-4" />
                <span>Demo Restricted</span>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Tabs Navigation - Simplified for mobile -->
        <section class="sticky top-[69px] z-40 bg-black/95 backdrop-blur-md border-b border-gray-800">
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
                         :title="screenshot.isPdf ? 'Click to open PDF in new tab' : 'Click to view full size'">
                      <img 
                        :src="screenshot.thumbnail || screenshot.url" 
                        :alt="screenshot.title" 
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <!-- Overlay icon to indicate clickability -->
                      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <ExternalLink class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <!-- PDF indicator badge -->
                      <div v-if="screenshot.isPdf" class="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        PDF
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
  
      </template>
    </div>
  </template>
  
  <script setup>
  import { 
    ExternalLink, Github, BookOpen, Play, 
    Calendar, Users, Clock, CheckCircle, AlertCircle,
    Code2, Database, Cloud, Zap, BarChart, Target,
    ChevronRight, ChevronLeft, Terminal, Layers, Award,
    Copy, Lock
  } from 'lucide-vue-next'
  import { ref, computed, nextTick } from 'vue'
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
  
  const navigateToProjects = async () => {
    // Navigate to home page and scroll to projects section
    await router.push('/')
    
    // Use multiple nextTick calls and setTimeout to ensure DOM is fully rendered
    await nextTick()
    
    // Add a small delay to ensure the page is fully loaded
    setTimeout(() => {
      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        // Get the offset from the top of the page
        const offsetTop = projectsSection.offsetTop
        
        // Scroll with smooth behavior
        window.scrollTo({ 
          top: offsetTop - 100, // Subtract 100px for better visual positioning
          behavior: 'smooth'
        })
      }
    }, 100) // 100ms delay to ensure page is rendered
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
    // Disable Technical, Results, and Code tabs for "In Development" projects
    if (project.value?.status === 'In Development') {
      return ['technical', 'results', 'code'].includes(tabId)
    }
    return false
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