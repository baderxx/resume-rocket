import { RuntimeModes } from "./types/enums";
import i18nConfig from "./config/i18n";

export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENVIRONMENT === RuntimeModes.DEVELOPMENT },
  modules: [
    [
      '@nuxtjs/sitemap',
      {
        url: process.env.SITE_URL,
        trailingSlash: true
      }
    ],
    [
      '@nuxtjs/i18n',
      {
        ...i18nConfig,
        vueI18n: './i18n.config.ts',
        baseUrl: process.env.SITE_URL,
      }
    ]
  ],
  routeRules: {
    '/': { prerender: true }
  },
  typescript: {
    typeCheck: true,
    strict: true
  },
})
