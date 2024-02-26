import { RuntimeModes } from "./types/enums";
import i18nConfig from "./config/i18n";

export default defineNuxtConfig({
  devtools: {
    enabled: process.env.NODE_ENVIRONMENT === RuntimeModes.DEVELOPMENT,
  },
  build: {},
  css: ["@/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: { config: "./tailwind.config.ts" },
      autoprefixer: {},
      ...(process.env.NODE_ENVIRONMENT === RuntimeModes.DEVELOPMENT
        ? { cssnano: {} }
        : {}),
    },
  },
  modules: [
    "@nuxt/image",
    [
      "@nuxtjs/sitemap",
      {
        url: process.env.SITE_URL,
        trailingSlash: true,
      },
    ],
    [
      "@nuxtjs/i18n",
      {
        ...i18nConfig,
        vueI18n: "./i18n.config.ts",
        baseUrl: process.env.SITE_URL,
      },
    ],
  ],
  routeRules: {
    // #TODO: add proper type here
    ...(["/", "/builder"].map((routeItem) => ({
      [routeItem]: { prerender: true },
    })) as any),
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
});
