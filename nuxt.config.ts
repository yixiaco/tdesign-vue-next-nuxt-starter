import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'url'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [
      svgLoader(),
    ],
  },
  alias: {
    'icon': fileURLToPath(new URL('./assets/icon', import.meta.url)),
    'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
    'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
  },
  app: {
    head: {
      title: 'TdesignVueNext + Nuxt 3',
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'TdesignVueNext + Nuxt3',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  // css
  css: ['~/assets/style/index.less'],

  // build
  build: {
    transpile: ['tdesign-vue-next'],
  },

  // build modules
  modules: ['tdesign-vue-next/es/nuxt', '@vueuse/nuxt', '@unocss/nuxt', '@pinia/nuxt'],

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },
})
