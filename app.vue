<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Force scroll to top when app mounts
  window.scrollTo(0, 0)
})
</script>