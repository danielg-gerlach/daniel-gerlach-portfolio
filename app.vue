<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Force scroll to top when app mounts
  window.scrollTo(0, 0)
  
  // Prevent browser from restoring scroll position
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
})
</script>

<style>
/* Better focus indicators for keyboard navigation */
*:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth scrolling with reduced motion support */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
</style>