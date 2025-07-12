<template>
    <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="text-2xl font-bold flex">
              <span class="text-white">D</span>
              <span class="text-blue-500">G</span>
            </div>
            <Terminal class="w-5 h-5 text-blue-500" />
          </NuxtLink>
          
          <div class="hidden md:flex items-center space-x-1">
            <button
              v-for="(section, index) in sections"
              :key="section"
              @click="scrollToSection(section.toLowerCase(), index)"
              :class="[
                'px-4 py-2 font-mono text-xs transition-all duration-300',
                activeSection === index 
                  ? 'text-blue-400 bg-blue-400/10' 
                  : 'text-gray-500 hover:text-blue-400'
              ]"
            >
              [{{ index }}] {{ section }}
            </button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { Terminal } from 'lucide-vue-next'
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const sections = ['INIT', 'ABOUT', 'PROJECTS', 'SKILLS', 'ARTICLES', 'RESUME']
  const activeSection = ref(0)
  
  const scrollToSection = (sectionId, index) => {
    activeSection.value = index
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }
  
  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 100 // Offset for header and some margin
    
    // Get all sections and find which one we're currently viewing
    const sectionElements = sections.map(section => ({
      id: section.toLowerCase(),
      element: document.getElementById(section.toLowerCase())
    }))
    
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const section = sectionElements[i]
      if (section.element) {
        const offsetTop = section.element.offsetTop
        if (scrollPosition >= offsetTop) {
          activeSection.value = i
          break
        }
      }
    }
    
    // If we're at the very top, set to INIT
    if (window.scrollY < 100) {
      activeSection.value = 0
    }
  }
  
  onMounted(() => {
    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection)
    // Set initial active section
    updateActiveSection()
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveSection)
  })
  </script>