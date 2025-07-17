<template>
    <div class="min-h-screen bg-black text-white">
      <LoadingBar />
      <Navigation />
      <slot />
      <BackToTop />
      <footer class="py-8 px-6 border-t border-gray-900">
        <div class="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <p class="font-mono">2025 Daniel Gerlach</p>
          <div class="flex items-center space-x-1">
            <span class="text-white">D</span>
            <span class="text-blue-500">G</span>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import LoadingBar from '~/components/LoadingBar.vue'
  import BackToTop from '~/components/BackToTop.vue'
  </script>