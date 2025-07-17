<template>
    <section id="resume" class="py-32 px-6 border-t border-gray-900">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-mono text-blue-400 text-sm mb-4">[5] RESUME</h2>
        <p class="text-3xl font-bold mb-8">Download Resume</p>
        
        <!-- Resume Preview with better styling -->
        <div class="mb-12 mx-auto max-w-md group cursor-pointer" @click="openResume">
          <div class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden aspect-[8.5/11] relative hover:border-blue-500/50 transition-all duration-300">
            <!-- Resume preview image -->
            <img 
              src="/resume-preview.png" 
              alt="Resume Preview - Daniel Gerlach" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <!-- Overlay on hover -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div class="text-white">
                <Eye class="w-8 h-8 mx-auto mb-2" />
                <span class="text-sm">Click to view</span>
              </div>
            </div>
          </div>
        </div>
        
        <p class="text-gray-400 mb-8 text-lg">
          Get a comprehensive overview of my experience, education, and technical expertise.
        </p>
        
        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/resume-daniel-gerlach.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-300 group"
          >
            <FileText class="w-5 h-5" />
            <span class="font-medium">View Resume</span>
            <ExternalLink class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          <a
            href="/resume-daniel-gerlach.pdf"
            download="Daniel_Gerlach_Resume.pdf"
            class="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 border border-gray-700"
          >
            <Download class="w-5 h-5" />
            <span class="font-medium">Download PDF</span>
          </a>
        </div>
        
        <!-- Additional info -->
        <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-4">
            <div class="text-2xl font-bold text-blue-400 mb-1">3+</div>
            <div class="text-sm text-gray-500">Years Experience</div>
          </div>
          <div class="p-4">
            <div class="text-2xl font-bold text-blue-400 mb-1">15+</div>
            <div class="text-sm text-gray-500">Technologies</div>
          </div>
          <div class="p-4">
            <div class="text-2xl font-bold text-blue-400 mb-1">6+</div>
            <div class="text-sm text-gray-500">Projects</div>
          </div>
          <div class="p-4">
            <div class="text-2xl font-bold text-blue-400 mb-1">4</div>
            <div class="text-sm text-gray-500">Certifications</div>
          </div>
        </div>
      </div>
    </section>
  </template>
  

  <script setup>
  import { FileText, ExternalLink, Download, Eye } from 'lucide-vue-next'
  
  const openResume = () => {
    window.open('/resume-daniel-gerlach.pdf', '_blank')
  }
  </script>