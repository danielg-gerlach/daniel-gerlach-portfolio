<template>
    <transition name="fade-up">
      <button
        v-if="showButton"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 p-4 bg-gray-900 border border-gray-800 rounded-full hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300 group shadow-lg"
        :aria-label="`Back to top - ${Math.round(scrollProgress)}% scrolled`"
      >
        <!-- Progress Ring -->
        <svg class="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            :r="radius"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            class="text-gray-800"
          />
          <circle
            cx="50%"
            cy="50%"
            :r="radius"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="strokeDashoffset"
            class="text-blue-500 transition-all duration-300"
          />
        </svg>
        
        <!-- Icon with tooltip -->
        <div class="relative group">
          <ChevronUp class="relative w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
          
          <!-- Tooltip -->
          <div class="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div class="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
              {{ Math.round(scrollProgress) }}% scrolled
            </div>
          </div>
        </div>
      </button>
    </transition>
  </template>
  
  <script setup>
  import { ChevronUp } from 'lucide-vue-next'
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  const showButton = ref(false)
  const scrollProgress = ref(0)
  
  const radius = 28
  const circumference = 2 * Math.PI * radius
  
  const strokeDashoffset = computed(() => {
    return circumference - (scrollProgress.value / 100) * circumference
  })
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const currentScroll = window.scrollY
    
    scrollProgress.value = (currentScroll / scrollHeight) * 100
    // Show button earlier - after 200px instead of 500px
    showButton.value = currentScroll > 200
  }
  
  const scrollToTop = () => {
    // Smooth scroll with easing
    const scrollDuration = 600
    const scrollStep = -window.scrollY / (scrollDuration / 15)
    
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep)
      } else {
        clearInterval(scrollInterval)
      }
    }, 15)
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  </script>
  
  <style scoped>
  .fade-up-enter-active,
  .fade-up-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .fade-up-enter-from,
  .fade-up-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    button {
      bottom: 1.5rem;
      right: 1.5rem;
      padding: 0.875rem;
    }
  }
  </style>