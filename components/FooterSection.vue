<template>
  <footer class="bg-gray-950 border-t border-gray-800">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Single Row Footer -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Copyright -->
        <div class="text-sm text-gray-500">
          © {{ currentYear }} Daniel Gerlach
        </div>

        <!-- Built With -->
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span>Built with Nuxt 3 & Tailwind CSS</span>
          <div class="flex items-center gap-2">
            <a
              href="https://nuxt.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              Nuxt 3
            </a>
            <span>+</span>
            <a
              href="https://vuejs.org"
              target="_blank"
              rel="noopener noreferrer"
              class="text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              Vue 3
            </a>
            <span>+</span>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Tailwind
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
