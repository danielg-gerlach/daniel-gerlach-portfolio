<template>
    <section id="resume" class="py-24 px-6 border-t border-gray-900">
      <div class="max-w-4xl mx-auto text-center">
        
        <h2 class="font-mono text-blue-400 text-base mb-2">[5] RESUME</h2>
        
        <p class="text-3xl md:text-4xl font-bold mb-6">
          Ready to learn more?
        </p>
        
        <p class="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
          Click the button below for a detailed look at my skills, experience, and professional background.
        </p>
        
        <div>
          <a
            href="YOUR_GOOGLE_DRIVE_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center space-x-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-300 group shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 font-medium text-lg"
          >
            <FileText class="w-6 h-6" />
            <span class="font-semibold">View My Resume</span>
            <ExternalLink class="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  // Import only the icons you need for the new button
  import { FileText, ExternalLink } from 'lucide-vue-next'
  
  // The openResume function is no longer needed
  </script>