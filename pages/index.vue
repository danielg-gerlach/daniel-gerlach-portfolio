<template>
    <div>
      <HeroSection />
      <!-- No divider here between Hero and About -->
      <AboutSection />
      
      <!-- Section Divider -->
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-800"></div>
        </div>
      </div>
      
      <ProjectsSection />
      
      <!-- Section Divider -->
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-800"></div>
        </div>
      </div>
      
      <SkillsSection />
      
      <!-- Section Divider -->
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-800"></div>
        </div>
      </div>
      
      <ArticlesSection />
      
      <!-- Footer -->
      <FooterSection />
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  
  onMounted(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash
    if (!hash || hash === '#init') {
      // Only scroll to top if no hash or if hash is #init
      window.scrollTo(0, 0)
    }
    // Otherwise, let the Navigation component handle the scrolling
  })
  </script>