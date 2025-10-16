<template>
  <section id="projects" class="py-24 px-6 bg-gray-950">
    <div class="max-w-6xl mx-auto">
      <h2 class="font-mono text-blue-400 text-base mb-2">{{ $t('projects.heading') }}</h2>
      <p class="text-3xl md:text-4xl font-bold mb-3">{{ $t('projects.title') }}</p>
      <p class="text-gray-400 mb-8">{{ $t('projects.subtitle') }}</p>
      
      <!-- Filter Tags -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          @click="activeFilter = 'all'"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            activeFilter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          ]"
        >
          All Projects
        </button>
        <button
          v-for="tag in uniqueTags"
          :key="tag"
          @click="activeFilter = tag"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            activeFilter === tag 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          ]"
        >
          {{ tag }}
        </button>
      </div>
      
      <!-- Personal Projects -->
      <div class="mb-12">
        <h3 class="text-xl font-semibold mb-6 text-gray-300">Personal Projects</h3>
        <div class="space-y-6">
          <TransitionGroup name="project-list">
            <NuxtLink
              v-for="(project, projectId) in filteredPersonalProjects"
              :key="projectId"
              :to="`/project/${projectId}`"
              class="block group"
            >
            <div class="relative p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
              <!-- Background gradient on hover -->
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div class="relative">
                <!-- Top Row: Title and Status -->
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <h3 class="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                        {{ project.title }}
                      </h3>
                      <span class="px-2 py-0.5 bg-blue-900/50 text-blue-400 text-xs rounded-full border border-blue-800">
                        Personal
                      </span>
                    </div>
                    <p class="text-gray-400">
                      {{ project.subtitle }} 
                    </p>
                  </div>
                  <span :class="['px-2 py-1 text-xs rounded-full flex-shrink-0', getStatusClass(project.status)]">
                    {{ project.status }}
                  </span>
                </div>
                
                <!-- Metrics Preview -->
                <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                  <span class="flex items-center space-x-1">
                    <Calendar class="w-4 h-4" />
                    <span>{{ project.year }}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <Clock class="w-4 h-4" />
                    <span>{{ project.duration }}</span>
                  </span>
                </div>
                
                <!-- Tech Stack Preview -->
                <div class="flex items-center justify-between">
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in getMainTechnologies(project)" :key="tech" 
                          class="px-3 py-1 bg-gray-800 text-sm rounded font-mono group-hover:bg-gray-700 transition-colors">
                      {{ tech }}
                    </span>
                  </div>
                  
                  <div class="ml-4">
                    <div class="w-10 h-10 rounded-full bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                      <ChevronRight class="w-5 h-5 text-gray-500 group-hover:text-white transform group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
                
                <!-- Project Tags -->
                <div class="mt-4 pt-4 border-t border-gray-800">
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in project.tags" :key="tag" 
                          class="text-xs text-gray-500">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </TransitionGroup>
      </div>
    </div>

    <!-- Work-related Projects -->
    <div v-if="filteredWorkProjects && Object.keys(filteredWorkProjects).length > 0" class="mb-12">
      <h3 class="text-xl font-semibold mb-6 text-gray-300">Work-related Projects</h3>
      <div class="space-y-6">
        <TransitionGroup name="project-list">
          <NuxtLink
            v-for="(project, projectId) in filteredWorkProjects"
            :key="projectId"
            :to="`/project/${projectId}`"
            class="block group"
          >
            <div class="relative p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
              <!-- Background gradient on hover -->
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div class="relative">
                <!-- Top Row: Title and Status -->
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <h3 class="text-xl font-semibold group-hover:text-purple-400 transition-colors">
                        {{ project.title }}
                      </h3>
                      <span class="px-2 py-0.5 bg-purple-900/50 text-purple-400 text-xs rounded-full border border-purple-800">
                        Work
                      </span>
                    </div>
                    <p class="text-gray-400">
                      {{ project.subtitle }} 
                    </p>
                  </div>
                  <span :class="['px-2 py-1 text-xs rounded-full flex-shrink-0', getStatusClass(project.status)]">
                    {{ project.status }}
                  </span>
                </div>
                
                <!-- Metrics Preview -->
                <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                  <span class="flex items-center space-x-1">
                    <Calendar class="w-4 h-4" />
                    <span>{{ project.year }}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <Clock class="w-4 h-4" />
                    <span>{{ project.duration }}</span>
                  </span>
                </div>
                
                <!-- Tech Stack Preview -->
                <div class="flex items-center justify-between">
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in getMainTechnologies(project)" :key="tech" 
                          class="px-3 py-1 bg-gray-800 text-sm rounded font-mono group-hover:bg-gray-700 transition-colors">
                      {{ tech }}
                    </span>
                  </div>
                  
                  <div class="ml-4">
                    <div class="w-10 h-10 rounded-full bg-gray-800 group-hover:bg-purple-600 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                      <ChevronRight class="w-5 h-5 text-gray-500 group-hover:text-white transform group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
                
                <!-- Project Tags -->
                <div class="mt-4 pt-4 border-t border-gray-800">
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in project.tags" :key="tag" 
                          class="text-xs text-gray-500">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </TransitionGroup>
      </div>
    </div>
      
      <!-- Call to Action -->
      <div class="mt-16 text-center">
        <p class="text-gray-400 mb-6 text-lg">
          Interested in my approach to data engineering?
        </p>
        <a
          href="mailto:danielg-gerlach@outlook.de"
          class="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all group shadow-lg shadow-blue-600/20 font-medium text-lg"
        >
          <Mail class="w-5 h-5" />
          <span>Let's discuss your data challenges</span>
          <ArrowRight class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ChevronRight, Calendar, Clock, Code2, Mail, ArrowRight } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { projectsData } from '~/data/projectsData'

// Add tags to projects
const projectsWithTags = computed(() => {
  const enhanced = {}
  Object.entries(projectsData).forEach(([id, project]) => {
    enhanced[id] = {
      ...project,
      tags: getProjectTags(project)
    }
  })
  return enhanced
})

// Get all projects
const projects = computed(() => projectsWithTags.value)

const activeFilter = ref('all')

// Extract unique tags
const uniqueTags = computed(() => {
  const tags = new Set()
  Object.values(projects.value).forEach(project => {
    project.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort() // Sort alphabetically
})

// Filter projects based on active filter
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects.value
  
  const filtered = {}
  Object.entries(projects.value).forEach(([id, project]) => {
    if (project.tags.includes(activeFilter.value)) {
      filtered[id] = project
    }
  })
  return filtered
})

// Separate personal and work projects
const filteredPersonalProjects = computed(() => {
  const filtered = {}
  Object.entries(filteredProjects.value).forEach(([id, project]) => {
    if (project.type === 'personal') {
      filtered[id] = project
    }
  })
  return filtered
})

const filteredWorkProjects = computed(() => {
  const filtered = {}
  Object.entries(filteredProjects.value).forEach(([id, project]) => {
    if (project.type === 'work') {
      filtered[id] = project
    }
  })
  return filtered
})

// Helper function to get project tags based on tech stack and type
const getProjectTags = (project) => {
  const tags = []
  const techStack = Object.values(project.techStack).flat()
  const title = project.title.toLowerCase()
  
  // Priority order for tags (max 2 per project)
  
  // AI/ML projects
  if (techStack.some(tech => ['GPT-4o', 'OpenAI', 'LangChain', 'Qdrant', 'Vector Embeddings', 'Hugging Face', 'XGBoost', 'Scikit-learn'].includes(tech))) {
    tags.push('#AI/ML')
  }
  
  // Data Engineering projects
  if (tags.length < 2 && (
    techStack.some(tech => ['Apache Spark', 'Databricks', 'dbt', 'Airflow', 'ETL', 'BigQuery', 'Delta Lake'].includes(tech)) ||
    title.includes('pipeline') || title.includes('etl')
  )) {
    tags.push('#DataEngineering')
  }
  
  // Analytics projects
  if (tags.length < 2 && (
    techStack.some(tech => ['Pandas', 'NumPy', 'Tableau', 'Power BI', 'Looker Studio'].includes(tech)) ||
    title.includes('analytics') || title.includes('analysis')
  )) {
    tags.push('#Analytics')
  }
  
  // Cloud projects
  if (tags.length < 2 && techStack.some(tech => ['AWS', 'GCP', 'Azure', 'Cloud Functions', 'Lambda', 'S3', 'BigQuery'].includes(tech))) {
    tags.push('#Cloud')
  }
  
  // Database projects
  if (tags.length < 2 && (
    techStack.some(tech => ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQL Server', 'Supabase'].includes(tech)) ||
    title.includes('database')
  )) {
    tags.push('#Database')
  }
  
  // Full Stack projects
  if (tags.length < 2 && techStack.some(tech => ['FastAPI', 'React', 'Vue', 'Nuxt', 'Streamlit', 'Flask'].includes(tech))) {
    tags.push('#FullStack')
  }
  
  // Real-time projects
  if (tags.length < 2 && (techStack.includes('Kafka') || title.includes('real-time'))) {
    tags.push('#RealTime')
  }
  
  return tags.slice(0, 2) // Ensure max 2 tags
}

// Helper function to get main technologies
const getMainTechnologies = (project) => {
  const allTechs = Object.values(project.techStack).flat()
  return allTechs.slice(0, 4)
}

// Get tech count
const getTechCount = (project) => {
  return Object.values(project.techStack).flat().length
}

// Get status styling
const getStatusClass = (status) => {
  switch(status) {
    case 'Completed':
      return 'bg-green-900/50 text-green-400 border border-green-800'
    case 'In Progress':
      return 'bg-yellow-900/50 text-yellow-400 border border-yellow-800'
    case 'In Development':
      return 'bg-blue-900/50 text-blue-400 border border-blue-800'
    default:
      return 'bg-gray-800 text-gray-400'
  }
}
</script>

<style scoped>
/* Smooth transitions for filtering */
.project-list-move,
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.3s ease;
}

.project-list-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.project-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.project-list-leave-active {
  position: absolute;
  width: 100%;
}
</style>