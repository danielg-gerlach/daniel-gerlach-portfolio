<template>
    <section id="skills" class="py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-mono text-blue-400 text-sm mb-2">[3] SKILLS</h2>
        <p class="text-3xl font-bold mb-12">Technical Stack</p>
        
        <!-- Interactive Terminal -->
        <div class="max-w-4xl mx-auto">
          <div class="bg-gray-900/90 rounded-lg border border-gray-800 overflow-hidden shadow-2xl">
            <div class="bg-gray-800 px-4 py-3 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500" />
                <div class="w-3 h-3 rounded-full bg-yellow-500" />
                <div class="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span class="font-mono text-xs text-gray-500">tech_stack.sh</span>
            </div>
            
            <div class="p-6 h-[500px] overflow-y-auto" ref="terminalContainer">
              <div class="font-mono text-sm text-gray-300">
                <!-- Terminal History -->
                <div v-for="(line, index) in terminalHistory" :key="index" class="mb-1">
                  <!-- Input lines -->
                  <div v-if="line.type === 'input'">
                    <span class="text-green-400">$ </span>
                    <span>{{ line.content }}</span>
                  </div>
                  
                  <!-- Output lines -->
                  <div v-else-if="line.type === 'output' || line.type === 'error'">
                    <span :class="line.type === 'error' ? 'text-red-400' : ''">{{ line.content }}</span>
                  </div>
                  
                  <!-- Tech category display -->
                  <div v-else-if="line.type === 'tech-category'" class="mb-4">
                    <div class="text-green-400 mb-2">━━━ {{ line.category.name }} ━━━</div>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div v-for="tech in line.category.technologies" :key="tech.name"
                           class="flex items-center space-x-2 text-gray-300">
                        <span class="text-xl">{{ tech.icon }}</span>
                        <span>{{ tech.name }}</span>
                        <span v-if="tech.level" class="text-xs text-gray-500">[{{ tech.level }}%]</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Current Input Line -->
                <div class="flex items-center mt-4">
                  <span class="text-green-400 mr-2">$ </span>
                  <input
                    ref="terminalInput"
                    v-model="currentInput"
                    @keydown.enter="handleCommand"
                    @keydown.up="navigateHistory(-1)"
                    @keydown.down="navigateHistory(1)"
                    type="text"
                    class="flex-1 bg-transparent outline-none text-gray-300"
                    :placeholder="showPlaceholder ? 'Type a command...' : ''"
                    spellcheck="false"
                  />
                  <span v-if="showCursor" class="inline-block w-2 h-4 bg-blue-400 ml-1 animate-blink" />
                </div>
                
                <!-- Help Text -->
                <div v-if="showHelp" class="mt-4 text-gray-500 text-xs">
                  Try: <span class="text-blue-400">help</span>, 
                  <span class="text-blue-400">show tech stack</span>, 
                  <span class="text-blue-400">skills --category [name]</span>,
                  <span class="text-blue-400">whoami</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Traditional View Toggle -->
        <div class="text-center mt-6">
          <button 
            @click="showTraditionalView = !showTraditionalView"
            class="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            {{ showTraditionalView ? 'Hide' : 'Show' }} traditional view →
          </button>
        </div>
        
        <!-- Traditional Grid View (Hidden by default) -->
        <div v-if="showTraditionalView" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          <div v-for="category in techCategories" :key="category.name"
               class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
            <h3 class="text-sm font-mono text-gray-400 mb-4">{{ category.name }}</h3>
            <div class="space-y-3">
              <div v-for="tech in category.technologies" :key="tech.name"
                   class="flex items-center space-x-3">
                <span class="text-2xl">{{ tech.icon }}</span>
                <span class="font-medium">{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Certifications remain the same -->
        <div class="mt-16">
          <h3 class="text-lg font-semibold mb-6 text-blue-400">Certifications</h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div v-for="cert in certifications" :key="cert.title" 
                 class="p-4 bg-gray-900 border border-gray-800 rounded-lg">
              <Award class="w-8 h-8 text-blue-400 mb-3" />
              <h4 class="font-medium mb-1">{{ cert.title }}</h4>
              <p class="text-sm text-gray-500 mt-2">{{ cert.content }}</p>
              <p class="text-sm text-gray-400">{{ cert.issuer }}</p>
              <p class="text-sm text-gray-500 mt-2">{{ cert.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { Database, Cloud, GitBranch, Award } from 'lucide-vue-next'
  import { ref, onMounted, nextTick } from 'vue'
  
  const terminalInput = ref(null)
  const terminalContainer = ref(null)
  const currentInput = ref('')
  const terminalHistory = ref([
    { type: 'output', content: 'Tech Stack Terminal v2.0.0' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' }
  ])
  const commandHistory = ref([])
  const historyIndex = ref(-1)
  const showCursor = ref(true)
  const showHelp = ref(true)
  const showPlaceholder = ref(true)
  const showTraditionalView = ref(false)
  
  const techCategories = [
    {
      name: 'LANGUAGES',
      technologies: [
        { name: 'Python', icon: '🐍', level: 95 },
        { name: 'SQL', icon: '🗃️', level: 92 },
        { name: 'Java', icon: '☕', level: 85 }
      ]
    },
    {
      name: 'BIG DATA',
      technologies: [
        { name: 'Spark', icon: '⚡', level: 88 },
        { name: 'Kafka', icon: '📊', level: 85 },
        { name: 'Airflow', icon: '🔄', level: 87 }
      ]
    },
    {
      name: 'DATABASES',
      technologies: [
        { name: 'PostgreSQL', icon: '🐘', level: 90 },
        { name: 'Snowflake', icon: '❄️', level: 85 },
        { name: 'MongoDB', icon: '🍃', level: 82 },
        { name: 'BigQuery', icon: '📊', level: 86 }
      ]
    },
    {
      name: 'CLOUD',
      technologies: [
        { name: 'AWS', icon: '☁️', level: 88 },
        { name: 'GCP', icon: '🌐', level: 85 },
        { name: 'Docker', icon: '🐳', level: 90 }
      ]
    },
    {
      name: 'DATA TOOLS',
      technologies: [
        { name: 'dbt', icon: '🔧', level: 86 },
        { name: 'Pandas', icon: '🐼', level: 94 },
        { name: 'InfluxDB', icon: '📈', level: 80 }
      ]
    },
    {
      name: 'ANALYTICS',
      technologies: [
        { name: 'Data Modeling', icon: '📊' },
        { name: 'MS Fabric', icon: 'Ⓜ️' },
        { name: 'DuckDB', icon: '🦆' }
      ]
    },
    {
      name: 'DEVOPS',
      technologies: [
        { name: 'Git', icon: '🌿', level: 92 },
        { name: 'Kubernetes', icon: '☸️', level: 82 },
        { name: 'Terraform', icon: '🏗️', level: 84 }
      ]
    },
    {
      name: 'MORE',
      technologies: [
        { name: 'Databricks', icon: '🧱' },
        { name: 'Redis', icon: '🔴' },
        { name: 'FastAPI', icon: '🚀' }
      ]
    }
  ]
  
  const certifications = [
    {
      title: "Data Scientist",
      content: "Python, SQL, Machine Learning, LLM Application Development",
      issuer: "DataCamp",
      year: "2025"
    },
    {
      title: "Data Engineer",
      content: "Python, SQL, Database Design, ETL/ELT",
      issuer: "DataCamp",
      year: "2024"
    },
    {
      title: "DevOps & Software Engineering",
      content: "Python, Microservices, TDD, Agile Software Development",
      issuer: "IBM - Coursera",
      year: "2023"
    }
  ]
  
  const scrollToBottom = () => {
    nextTick(() => {
      if (terminalContainer.value) {
        terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight
      }
    })
  }
  
  const commands = {
    help: () => {
      return [
        { type: 'output', content: 'Available commands:' },
        { type: 'output', content: '  show tech stack    - Display all technologies' },
        { type: 'output', content: '  skills             - Show skill summary' },
        { type: 'output', content: '  skills --category  - Filter by category (e.g., skills --category cloud)' },
        { type: 'output', content: '  clear              - Clear terminal' },
        { type: 'output', content: '  whoami             - About me' },
        { type: 'output', content: '  contact            - Get contact info' },
        { type: 'output', content: '' }
      ]
    },
    
    'show tech stack': () => {
      const output = [
        { type: 'output', content: 'Initializing tech stack visualization...' },
        { type: 'output', content: 'Loading categories...' },
        { type: 'output', content: '' }
      ]
      
      // Add all categories to the output
      techCategories.forEach((category, index) => {
        setTimeout(() => {
          terminalHistory.value.push({ type: 'tech-category', category })
          scrollToBottom()
        }, index * 200 + 500)
      })
      
      // Add completion message
      setTimeout(() => {
        terminalHistory.value.push({ type: 'output', content: '' })
        terminalHistory.value.push({ type: 'output', content: '✓ Tech stack loaded successfully!' })
        terminalHistory.value.push({ type: 'output', content: '' })
        scrollToBottom()
      }, techCategories.length * 200 + 700)
      
      return output
    },
    
    skills: (args = []) => {
      if (args.includes('--category')) {
        const categoryIndex = args.indexOf('--category') + 1
        const categoryName = args[categoryIndex]?.toUpperCase()
        
        const category = techCategories.find(c => 
          c.name.includes(categoryName) || c.name === categoryName
        )
        
        if (category) {
          return [
            { type: 'output', content: `━━━ ${category.name} ━━━` },
            ...category.technologies.map(tech => ({
              type: 'output',
              content: `  ${tech.icon} ${tech.name}${tech.level ? ` [${tech.level}%]` : ''}`
            })),
            { type: 'output', content: '' }
          ]
        } else {
          return [
            { type: 'error', content: `Category "${categoryName}" not found` },
            { type: 'output', content: 'Available categories: LANGUAGES, BIG DATA, DATABASES, CLOUD, DATA TOOLS, ANALYTICS, DEVOPS, MORE' },
            { type: 'output', content: '' }
          ]
        }
      }
      
      return [
        { type: 'output', content: 'Tech Stack Summary:' },
        { type: 'output', content: `  Total Technologies: ${techCategories.reduce((acc, cat) => acc + cat.technologies.length, 0)}` },
        { type: 'output', content: `  Categories: ${techCategories.length}` },
        { type: 'output', content: `  Expertise Level: Senior` },
        { type: 'output', content: '' },
        { type: 'output', content: 'Use "show tech stack" for detailed view' },
        { type: 'output', content: '' }
      ]
    },
    
    clear: () => {
  terminalHistory.value = [
    { type: 'output', content: 'Tech Stack Terminal v2.0.0' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' }
    ]
    showHelp.value = true
    return []
    },
    
    whoami: () => {
      return [
        { type: 'output', content: 'Daniel Gerlach' },
        { type: 'output', content: 'Role: Data Engineering Student' },
        { type: 'output', content: 'Focus: Building scalable data infrastructure' },
        { type: 'output', content: 'Mission: Transform data into insights' },
        { type: 'output', content: '' }
      ]
    },
    
    contact: () => {
      return [
        { type: 'output', content: 'Contact Information:' },
        { type: 'output', content: '  GitHub:   github.com/danielg-gerlach' },
        { type: 'output', content: '  LinkedIn: linkedin.com/in/danielgerlach' },
        { type: 'output', content: '  Email:    daniel.gerlach@example.com' },
        { type: 'output', content: '' }
      ]
    }
  }
  
  const handleCommand = () => {
    if (!currentInput.value.trim()) return
    
    const input = currentInput.value.trim()
    commandHistory.value.push(input)
    historyIndex.value = commandHistory.value.length
    
    terminalHistory.value.push({ type: 'input', content: input })
    
    const [cmd, ...args] = input.toLowerCase().split(' ')
    const fullCommand = input.toLowerCase()
    
    if (commands[fullCommand]) {
      terminalHistory.value.push(...commands[fullCommand]())
    } else if (commands[cmd]) {
      terminalHistory.value.push(...commands[cmd](args))
    } else {
      terminalHistory.value.push({ 
        type: 'error', 
        content: `Command not found: ${cmd}. Type "help" for available commands.` 
      })
      terminalHistory.value.push({ type: 'output', content: '' })
    }
    
    currentInput.value = ''
    showHelp.value = false
    scrollToBottom()
  }
  
  const navigateHistory = (direction) => {
    if (commandHistory.value.length === 0) return
    
    historyIndex.value += direction
    historyIndex.value = Math.max(0, Math.min(historyIndex.value, commandHistory.value.length))
    
    if (historyIndex.value < commandHistory.value.length) {
      currentInput.value = commandHistory.value[historyIndex.value]
    } else {
      currentInput.value = ''
    }
  }
  
  onMounted(() => {
    // Focus terminal input
    terminalInput.value?.focus()
    
    // Cursor blink
    setInterval(() => {
      showCursor.value = !showCursor.value
    }, 500)
  })
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
  }
  
  .animate-blink {
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  </style>