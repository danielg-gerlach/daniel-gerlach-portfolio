<template>
    <transition name="fade-up">
      <button
        v-if="showButton"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 p-4 bg-gray-900 border border-gray-800 rounded-full hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300 group"
        aria-label="Back to top"
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
        
        <!-- Icon -->
        <ChevronUp class="relative w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
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
    showButton.value = currentScroll > 500
  }
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  </script>
  
  <style scoped>
  .fade-up-enter-active,
  .fade-up-leave-active {
    transition: all 0.3s ease;
  }
  
  .fade-up-enter-from,
  .fade-up-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  </style>