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
      
      <!-- Section Divider -->
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-800"></div>
        </div>
      </div>
      
      <ResumeSection />
    </div>
  </template>