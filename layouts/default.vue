<template>
    <div class="min-h-screen bg-black text-white">
      <LoadingBar />
      <Navigation />
      <slot />
      <BackToTop />
    </div>
  </template>
  
  <script setup>
  import LoadingBar from '~/components/LoadingBar.vue'
  import BackToTop from '~/components/BackToTop.vue'
  </script>