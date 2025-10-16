<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all border border-gray-700 hover:border-gray-600"
      aria-label="Change language"
    >
      <Globe class="w-4 h-4" />
      <span class="text-sm font-medium">{{ currentLocale.toUpperCase() }}</span>
      <ChevronDown class="w-4 h-4" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50"
      >
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="switchLanguage(locale.code)"
          class="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center justify-between"
          :class="{ 'bg-gray-700/50': currentLocale === locale.code }"
        >
          <span class="text-sm">{{ locale.name }}</span>
          <Check v-if="currentLocale === locale.code" class="w-4 h-4 text-blue-400" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { Globe, ChevronDown, Check } from 'lucide-vue-next'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { locale, locales, setLocale } = useI18n()
const dropdownRef = ref(null)
const isOpen = ref(false)

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchLanguage = (code) => {
  setLocale(code)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s;
}
</style>
