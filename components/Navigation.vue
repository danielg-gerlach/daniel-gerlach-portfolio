<template>
    <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" @click="scrollToSection('init', 0)" class="flex items-center space-x-3">
            <div class="text-2xl font-bold flex">
              <span class="text-white">D</span>
              <span class="text-blue-500">G</span>
            </div>
          </NuxtLink>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            <button
              v-for="(section, index) in sections"
              :key="section"
              @click="scrollToSection(section.id, index)"
              :class="[
                'px-4 py-2 font-mono text-xs transition-all duration-300 rounded-md',
                activeSection === index 
                  ? 'text-blue-400 bg-blue-400/10' 
                  : 'text-gray-500 hover:text-blue-400 hover:bg-gray-800/50'
              ]"
            >
              [{{ index }}] {{ section.name }}
            </button>
          </div>
  
          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
            aria-expanded="false"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
  
      <!-- Mobile Menu Overlay -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-gray-800"
        >
          <div class="px-6 py-4 space-y-2">
            <button
              v-for="(section, index) in sections"
              :key="section"
              @click="handleMobileNavClick(section.id, index)"
              :class="[
                'block w-full text-left px-4 py-3 font-mono text-sm transition-all duration-300 rounded',
                activeSection === index 
                  ? 'text-blue-400 bg-blue-400/10' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              ]"
            >
              [{{ index }}] {{ section.name }}
            </button>
          </div>
        </div>
      </Transition>
    </nav>
  </template>
  
  <script setup>
  import { Menu, X } from 'lucide-vue-next'
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const sections = [
    { id: 'init', name: 'INIT' },
    { id: 'about', name: 'ABOUT' },
    { id: 'projects', name: 'PROJECTS' },
    { id: 'skills', name: 'SKILLS' },
    { id: 'articles', name: 'ARTICLES' },
    { id: 'resume', name: 'RESUME' }
  ]
  
  const activeSection = ref(0)
  const isMobileMenuOpen = ref(false)
  const router = useRouter()
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }
  
  const scrollToSection = (sectionId, index) => {
    // If we're on a different page, navigate home first
    if (router.currentRoute.value.path !== '/') {
      router.push({ path: '/', hash: `#${sectionId}` })
      return
    }
  
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
  
  const handleMobileNavClick = (sectionId, index) => {
    scrollToSection(sectionId, index)
    isMobileMenuOpen.value = false
  }
  
  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 100 // Offset for header and some margin
    
    // Get all sections and find which one we're currently viewing
    const sectionElements = sections.map(section => ({
      id: section.id,
      element: document.getElementById(section.id)
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
  
  // Handle navigation from project detail page
  onMounted(() => {
    // Force scroll to top first
    window.scrollTo(0, 0)
    
    // Check if there's a hash in the URL
    const hash = window.location.hash
    if (hash && hash !== '#init') {
      const sectionId = hash.substring(1)
      const sectionIndex = sections.findIndex(s => s.id === sectionId)
      if (sectionIndex !== -1) {
        setTimeout(() => {
          scrollToSection(sectionId, sectionIndex)
        }, 100)
      }
    } else {
      // No hash or #init - stay at top
      activeSection.value = 0
    }
    
    // Add scroll listener after a small delay to avoid conflicts
    setTimeout(() => {
      window.addEventListener('scroll', updateActiveSection)
    }, 100)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveSection)
  })
  </script>