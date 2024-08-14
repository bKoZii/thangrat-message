// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "@nuxt/image"],
  compatibilityDate: "2024-08-02",
  tailwindcss:{
    configPath: 'tailwind.config.ts'
  },
  app:{
    head:{
      htmlAttrs:{
        lang: 'th'
      },
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/png', href: '/mainLogo.png' }]
    }
  },

  ssr: true,
  googleFonts: {
    families:{
      "Space Grotesk": {wght:[400,500,600,700]},
      "Noto Sans Thai Looped": {wght:[400,500,600,700]},
    }
  }
})