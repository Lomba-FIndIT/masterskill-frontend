export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: [
    'vuetify/styles','@/assets/main.css',  "@mdi/font/css/materialdesignicons.css"
  ],

  build: {
    transpile: ['vuetify']
  },
  modules: ['@pinia/nuxt'],

  plugins: [
    '~/plugins/vuetify.ts', // Pastikan path benar
  ],

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        },
      ],
    },},
  

 

  compatibilityDate: '2025-03-26'
});