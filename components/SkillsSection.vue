<template>
    <section id="skills" class="py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-mono text-blue-400 text-base mb-2">[3] SKILLS</h2>
        <p class="text-3xl md:text-4xl font-bold mb-3">Technical Stack</p>
        <p class="text-gray-400 text-lg mb-12">These are the tools & technologies I've worked with until now</p>
        
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
            
            <div class="p-6 h-[500px] overflow-y-auto custom-scrollbar" ref="terminalContainer" @click="focusTerminal">
              <div class="font-mono text-sm text-gray-300">
                <!-- Welcome message -->
                <div v-if="terminalHistory.length === 3" class="mb-4 p-4 bg-blue-900/20 border border-blue-800/50 rounded">
                  <div class="text-blue-400 mb-2">💡 Quick Commands:</div>
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div><span class="text-green-400">show tech stack</span> - View all technologies</div>
                    <div><span class="text-green-400">skills --category cloud</span> - Filter by category</div>
                    <div><span class="text-green-400">clear</span> - Clear terminal</div>
                    <div><span class="text-green-400">help</span> - Show all commands</div>
                  </div>
                </div>
                
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
                           class="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                        <span class="text-xl">{{ tech.icon }}</span>
                        <span>{{ tech.name }}</span>
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
                    @keydown.tab.prevent="handleTabComplete"
                    type="text"
                    class="flex-1 bg-transparent outline-none text-gray-300 caret-blue-400"
                    :placeholder="showPlaceholder ? 'Type a command or click a suggestion...' : ''"
                    spellcheck="false"
                    autocomplete="off"
                  />
                </div>
                
                <!-- Autocomplete suggestions -->
                <div v-if="suggestions.length > 0" class="mt-2 flex flex-wrap gap-2">
                  <button
                    v-for="suggestion in suggestions"
                    :key="suggestion"
                    @click="applySuggestion(suggestion)"
                    class="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400 hover:text-white transition-all"
                  >
                    {{ suggestion }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Quick Action Buttons -->
          <div class="mt-6 flex flex-wrap gap-3 justify-center">
            <button 
              @click="executeCommand('show tech stack')"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 shadow-lg shadow-blue-600/20"
            >
              <Layers class="w-4 h-4" />
              <span>Show All Tech</span>
            </button>
            <button 
              @click="showTraditionalView = !showTraditionalView"
              class="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-all flex items-center space-x-2"
            >
              <Grid class="w-4 h-4" />
              <span>{{ showTraditionalView ? 'Hide' : 'Show' }} Grid View</span>
            </button>
          </div>
        </div>
        
        <!-- Traditional Grid View (Hidden by default) -->
        <transition name="slide-fade">
          <div v-if="showTraditionalView" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            <div v-for="category in techCategories" :key="category.name"
                 class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all group">
              <h3 class="text-sm font-mono text-gray-400 mb-4 group-hover:text-blue-400 transition-colors">
                {{ category.name }}
              </h3>
              <div class="space-y-3">
                <div v-for="tech in category.technologies" :key="tech.name"
                     class="flex items-center space-x-3">
                  <span class="text-2xl transform group-hover:scale-110 transition-transform">{{ tech.icon }}</span>
                  <span class="font-medium">{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
        
        <!-- Certifications Section -->
        <div class="mt-40">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">Certifications</h2>
          <div class="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p class="text-xl text-gray-400 text-center mb-20">
            During my studies, I've also gained some experience through certifications & online courses.
          </p>
          
          <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div v-for="cert in certifications" :key="cert.id" 
                 class="bg-gray-900/50 border border-gray-800 rounded-lg p-8 hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group relative">
              <!-- In Progress Badge -->
              <div v-if="cert.inProgress" 
                   class="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-300"></span>
                </span>
                In Progress
              </div>
              
              <!-- Header with Logo and Title -->
              <div class="flex items-start gap-6 mb-6">
                <div class="flex-shrink-0 w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                  <img 
                    v-show="cert.logoUrl && !logoErrors[cert.id]"
                    :src="cert.logoUrl" 
                    :alt="cert.issuer + ' logo'"
                    class="w-full h-full object-contain"
                    @error="() => logoErrors[cert.id] = true"
                  />
                  <Award v-show="!cert.logoUrl || logoErrors[cert.id]" class="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{{ cert.title }}</h3>
                  <p class="text-gray-400">{{ cert.issuer }}</p>
                </div>
              </div>
              
              <!-- Divider -->
              <div class="border-b border-gray-800 mb-6"></div>
              
              <!-- Skills -->
              <div class="mb-8">
                <h4 class="text-lg font-semibold mb-4">Skills</h4>
                <div class="grid gap-2">
                  <div v-for="skill in cert.skills" :key="skill" 
                       class="flex items-center gap-3">
                    <CheckIcon class="w-5 h-5 text-blue-400" />
                    <span class="text-gray-300">{{ skill }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Verify Link or Expected Date -->
              <div class="border-t border-gray-800 pt-6">
                <a v-if="cert.verifyUrl && !cert.inProgress" 
                   :href="cert.verifyUrl" 
                   target="_blank"
                   rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  <span>Verify Certificate</span>
                  <ExternalLinkIcon class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <div v-else-if="cert.inProgress" class="text-gray-400 font-medium">
                  Expected: {{ cert.expectedDate }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { Database, Cloud, GitBranch, Award, ExternalLink, Check, Layers, Grid } from 'lucide-vue-next'
  import { ref, onMounted, nextTick, computed, watch } from 'vue'
  
  // Icon components
  const ExternalLinkIcon = ExternalLink
  const CheckIcon = Check
  
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
  const showHelp = ref(true)
  const showPlaceholder = ref(true)
  const showTraditionalView = ref(false)
  const logoErrors = ref({})
  
  const techCategories = [
    {
      name: 'LANGUAGES',
      technologies: [
        { name: 'Python', icon: '🐍' },
        { name: 'SQL', icon: '🗃️' },
        { name: 'Java', icon: '☕' }
      ]
    },
    {
      name: 'BIG DATA',
      technologies: [
        { name: 'Spark', icon: '⚡' },
        { name: 'Airflow', icon: '🔄' }
      ]
    },
    {
      name: 'DATABASES',
      technologies: [
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Snowflake', icon: '❄️' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'BigQuery', icon: '📊' }
      ]
    },
    {
      name: 'CLOUD',
      technologies: [
        { name: 'Azure', icon: '☁️' },
        { name: 'GCP', icon: '🌐' },
        { name: 'AWS', icon: '🌐' },
        { name: 'Docker', icon: '🐳' }
      ]
    },
    {
      name: 'DATA TOOLS',
      technologies: [
        { name: 'dbt', icon: '🔧' },
        { name: 'Pandas', icon: '🐼' },
        { name: 'InfluxDB', icon: '📈' }
      ]
    },
    {
      name: 'ANALYTICS',
      technologies: [
        { name: 'MS Fabric', icon: 'Ⓜ️' },
        { name: 'DuckDB', icon: '🦆' }
      ]
    },
    {
      name: 'DEVOPS',
      technologies: [
        { name: 'Git', icon: '🌿' }
      ]
    },
    {
      name: 'MORE',
      technologies: [
        { name: 'Databricks', icon: '🧱' },
        { name: 'FastAPI', icon: '🚀' }
      ]
    }
  ]
  
  const certifications = [
    {
      id: 'ztm-data-engineering-bootcamp',
      title: "Data Engineering Bootcamp",
      issuer: "ZTM",
      issued: "August 2025",
      credentialId: "#12345",
      logoUrl: "/images/logos/ztm-logo.png",
      inProgress: false,
      skills: [
        "Python",
        "SQL", 
        "Apache Spark",
        "AWS",
        "RAG",
        "HuggingFace"
      ],
      verifyUrl: "https://zerotomastery.io/certificate/verify/12345"
    },
    {
      id: 'datacamp-data-scientist',
      title: "Data Scientist",
      issuer: "DataCamp",
      issued: "September 2025",
      credentialId: "#67890",
      logoUrl: "/images/logos/datacamp-logo.png",
      inProgress: true,
      expectedDate: "Q2 2025",
      skills: [
        "Data Science Best Practices",
        "Python & SQL",
        "Statistical Methods for Data Science",
        "Machine Learning",
        "LLM Application Development",
        "Data Visualization"
      ],
      verifyUrl: null
    },
    {
      id: 'datacamp-data-engineer',
      title: "Data Engineer",
      issuer: "DataCamp",
      issued: "January 2024",
      credentialId: "#434995",
      logoUrl: "/images/logos/datacamp-logo.png",
      inProgress: false,
      skills: [
        "Python",
        "SQL",
        "ETL/ELT Data Pipeline Development",
        "Data Warehousing",
        "Database Design",
        "Data Modeling"
      ],
      verifyUrl: "https://www.datacamp.com/certificate/verify/434995"
    },
    {
      id: 'prof_dataeng',
      title: "Professional Data Engineer",
      issuer: "DataCamp",
      issued: "September 2025",
      credentialId: "EFGH5678",
      logoUrl: "/images/logos/datacamp-logo.png",
      inProgress: true,
      expectedDate: "Q2 2025",
      skills: [
        "Data Pipelines in the Terminal",
        "Containerization",
        "dbt",
        "NoSQL",
        "PySpark & SparkSQL",
        "Introduction to Apache Kafka"
      ],
      verifyUrl: null
    }
  ]
  
  // Autocomplete suggestions
  const suggestions = computed(() => {
    if (!currentInput.value) return []
    
    const allCommands = [
      'help', 'show tech stack', 'skills', 'clear', 'whoami', 'contact',
      ...techCategories.map(cat => `skills --category ${cat.name.toLowerCase()}`)
    ]
    
    return allCommands
      .filter(cmd => cmd.startsWith(currentInput.value.toLowerCase()))
      .slice(0, 5)
  })
  
  const scrollToBottom = () => {
    nextTick(() => {
      if (terminalContainer.value) {
        terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight
      }
    })
  }
  
  const applySuggestion = (suggestion) => {
    currentInput.value = suggestion
    terminalInput.value?.focus()
  }
  
  const focusTerminal = () => {
    terminalInput.value?.focus()
  }
  
  const handleTabComplete = () => {
    if (suggestions.value.length === 1) {
      currentInput.value = suggestions.value[0]
    }
  }
  
  const executeCommand = (command) => {
    currentInput.value = command
    handleCommand()
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
        { type: 'output', content: '' },
        { type: 'output', content: 'Tips: Use ↑/↓ for history, Tab for autocomplete' },
        { type: 'output', content: '' }
      ]
    },
    
    'show tech stack': () => {
      const output = [
        { type: 'output', content: 'These are the technologies that I already worked with.' },
        { type: 'output', content: '' },
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
              content: `  ${tech.icon} ${tech.name}`
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
        { type: 'output', content: 'These are technologies I have worked with during my studies and projects.' },
        { type: 'output', content: '' },
        { type: 'output', content: `  Total Technologies: ${techCategories.reduce((acc, cat) => acc + cat.technologies.length, 0)}` },
        { type: 'output', content: `  Categories: ${techCategories.length}` },
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
        { type: 'output', content: 'Role: Business Informatics Student' },
        { type: 'output', content: 'Focus: Data Engineering & AI' },
        { type: 'output', content: 'Mission: Building scalable data infrastructure' },
        { type: 'output', content: '' }
      ]
    },
    
    contact: () => {
      return [
        { type: 'output', content: 'Contact Information:' },
        { type: 'output', content: '  GitHub:   github.com/danielg-gerlach' },
        { type: 'output', content: '  LinkedIn: linkedin.com/in/danielg-gerlach' },
        { type: 'output', content: '  Email:    danielg-gerlach@outlook.de' },
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
    // Removed auto-focus to prevent automatic scrolling to this section
    // Users can click on the terminal to focus it
  })
  </script>
  
  <style scoped>
  /* Custom scrollbar for terminal */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #4a5568 #1a202c;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #1a202c;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #4a5568;
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #718096;
  }
  
  /* Animations */
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  /* Slide fade transition */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  
  .slide-fade-enter-from {
    transform: translateY(-20px);
    opacity: 0;
  }
  
  .slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
  </style>