<template>
    <div v-if="isLoading" class="fixed top-0 left-0 right-0 z-[100]">
      <div class="h-1 bg-gray-900">
        <div 
          class="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const isLoading = ref(false)
  const progress = ref(0)
  
  let interval = null
  
  const startLoading = () => {
    isLoading.value = true
    progress.value = 0
    
    interval = setInterval(() => {
      if (progress.value < 90) {
        progress.value += Math.random() * 30
      }
    }, 300)
  }
  
  const stopLoading = () => {
    progress.value = 100
    setTimeout(() => {
      isLoading.value = false
      if (interval) {
        clearInterval(interval)
        interval = null
      }
    }, 300)
  }
  
  onMounted(() => {
    // Listen for route changes
    const nuxtApp = useNuxtApp()
    
    nuxtApp.hook('page:start', () => {
      startLoading()
    })
    
    nuxtApp.hook('page:finish', () => {
      stopLoading()
    })
  })
  
  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })
  </script>