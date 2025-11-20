// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  pages: true,
  ssr: false,
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  plugins: ['~/plugins/vuetify.js'],
  components: true,
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  runtimeConfig:{
    public:{
          API_URL: process.env.API_URL || 'http://127.0.0.1:8000'
    }
  }
})