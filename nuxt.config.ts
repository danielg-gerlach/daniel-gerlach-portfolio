export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Daniel Gerlach | Data Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Data Engineering Student specializing in scalable data infrastructure, real-time processing, and cloud-native solutions.' },
        { property: 'og:title', content: 'Daniel Gerlach | Data Engineer' },
        { property: 'og:description', content: 'Data Engineering Portfolio - Building scalable data infrastructure that powers intelligent decision-making' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        {
          innerHTML: `
            // Disable automatic scroll restoration
            if ('scrollRestoration' in history) {
              history.scrollRestoration = 'manual';
            }
            // Always start at top
            window.addEventListener('load', function() {
              setTimeout(function() {
                window.scrollTo(0, 0);
              }, 0);
            });
          `,
          type: 'text/javascript'
        }
      ]
    }
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },
  experimental: {
    appManifest: false
  },
  // Router options are now configured in a separate file
})