import { defineNuxtConfig } from 'nuxt';
import { fileURLToPath } from 'url';
import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [svgLoader()],
  },
  alias: {
    icon: fileURLToPath(new URL('./assets/icon', import.meta.url)),
    images: fileURLToPath(new URL('./assets/images', import.meta.url)),
    style: fileURLToPath(new URL('./assets/style', import.meta.url)),
  },
  // meta
  meta: {
    htmlAttrs: {
      lang: 'zh-cn',
    },
    title: 'TDesign Vue Next Nuxt3 Starter',
    meta: [
      { name: 'charset', content: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      {
        hid: 'description',
        name: 'description',
        content: 'TDesign Vue Next Nuxt3 Starter',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // css
  css: ['~/assets/style/index.less'],

  // build
  build: {
    transpile: ['tdesign-vue-next'],
  },

  // build modules
  modules: ['tdesign-vue-next/es/nuxt', '@vueuse/nuxt', '@pinia/nuxt', 'nuxt-lodash'],

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // lodash
  lodash: {
    prefix: 'use',
    prefixSkip: ['is'],
    exclude: ['map'],
    alias: [
      // ['camelCase', 'stringToCamelCase'], // => useStringToCamelCase
      // ['kebabCase', 'stringToKebabCase'], // => useStringToKebabCase
    ],
  },

  // watch 属性允许您监视自定义文件以重新启动服务器
  watch: ['~/config/*.ts', '~/api/**/*.ts', '~/utils/*.ts', '~/constants/*.ts', '~/types/*.ts', '~/router/**/*.ts'],

  typescript: {
    shim: false,
  },
});
