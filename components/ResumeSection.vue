<template>
    <section id="resume" class="py-32 px-6 border-t border-gray-900">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-mono text-blue-400 text-sm mb-4">[5] RESUME</h2>
        <p class="text-3xl font-bold mb-8">Download Resume</p>
        
        <!-- Resume Preview Placeholder -->
        <div class="mb-12 mx-auto max-w-md">
            <div class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden aspect-[8.5/11]">
                <img 
                src="/resume-preview.png" 
                alt="Resume Preview" 
                class="w-full h-full object-cover"
                />
            </div>
        </div>
        
        <p class="text-gray-400 mb-8 text-lg">
          Get a comprehensive overview of my experience, education, and technical expertise.
        </p>
        
        <a
          href="https://drive.google.com/your-resume-link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-300"
        >
          <FileText class="w-5 h-5" />
          <span class="font-medium">View Resume on Google Drive</span>
          <ExternalLink class="w-4 h-4" />
        </a>
      </div>
    </section>
  </template>
  
  <script setup>
  import { FileText, ExternalLink } from 'lucide-vue-next'
  </script>