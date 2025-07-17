<template>
  <section id="projects" class="py-32 px-6 bg-gray-950">
    <div class="max-w-6xl mx-auto">
      <h2 class="font-mono text-blue-400 text-sm mb-2">[2] PROJECTS</h2>
      <p class="text-3xl font-bold mb-4">Featured Work</p>
      <p class="text-gray-400 mb-12">Click on any project to explore in detail</p>
      
      <div class="space-y-6">
        <NuxtLink
          v-for="(project, projectId) in projects"
          :key="projectId"
          :to="`/project/${projectId}`"
          class="block group"
        >
          <div class="relative p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
            <!-- Background gradient on hover -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div class="relative flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                    {{ project.title }}
                  </h3>
                  <span :class="['px-2 py-1 text-xs rounded-full', getStatusClass(project.status)]">
                    {{ project.status }}
                  </span>
                </div>
                
                <p class="text-gray-400 mb-4">
                  {{ project.subtitle }} 
                </p>
                
                <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span class="flex items-center space-x-1">
                    <Calendar class="w-4 h-4" />
                    <span>{{ project.year }}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <Clock class="w-4 h-4" />
                    <span>{{ project.duration }}</span>
                  </span>
                </div>
                
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in getMainTechnologies(project)" :key="tech" 
                        class="px-3 py-1 bg-gray-800 text-sm rounded font-mono group-hover:bg-gray-700 transition-colors">
                    {{ tech }}
                  </span>
                </div>
              </div>
              
              <div class="ml-4 mt-2">
                <div class="w-10 h-10 rounded-full bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <ChevronRight class="w-5 h-5 text-gray-500 group-hover:text-white transform group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
            
            <!-- Project type indicator -->
            <div class="absolute top-0 right-0 px-3 py-1 bg-gray-800 text-xs text-gray-400 rounded-bl-lg">
              {{ project.role }}
            </div>
          </div>
        </NuxtLink>
      </div>
      
      <!-- View all indicator -->
      <div class="mt-12 text-center">
        <p class="text-gray-500 text-sm">
          Showing {{ Object.keys(projects).length }} of {{ totalProjects }} projects
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ChevronRight, Calendar, Clock } from 'lucide-vue-next'
import { projectsData } from '~/data/projectsData'

// Get first 6 projects for the main page
const projects = Object.fromEntries(
  Object.entries(projectsData).slice(0, 6)
)

const totalProjects = Object.keys(projectsData).length

// Helper function to get main technologies (first 4-5 from all categories)
const getMainTechnologies = (project) => {
  const allTechs = Object.values(project.techStack).flat()
  return allTechs.slice(0, 5)
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