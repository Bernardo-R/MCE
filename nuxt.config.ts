// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', "@nuxt/ui"],
  // colorMode: {
  //   preference: 'system', // default value of $colorMode.preference
  //   fallback: 'light', // fallback value if not system preference found
  //   hid: 'nuxt-color-mode-script',
  //   globalName: '__NUXT_COLOR_MODE__',
  //   componentName: 'ColorScheme',
  //   classPrefix: '',
  //   classSuffix: '-mode',
  //   storageKey: 'nuxt-color-mode'
  // },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',

    // Public keys that are exposed to the client
    public: {
      apiKey: "AIzaSyCELWs_mD6SATTp-fIpyB-AW25IUI59mtU",
      authDomain:"marycargoexpress-a92f9.firebaseapp.com",
      projectId: "marycargoexpress-a92f9",
      storageBucket: "marycargoexpress-a92f9.appspot.com",
      messagingSenderId: "192337920653",
      appId: "1:192337920653:web:46bcea586399af4986d8c4"
    }
  },
  routeRules: {
    "/": { prerender: true },
    "/admin/**": { ssr: false },
    "/login": { ssr: false },
    "/register": { ssr: false },
  },

  target: 'static',
  ssr: false,
  generate: {
    fallback: true
  },
})

// apiKey: process.env.FIRE_APIKEY,
// authDomain: process.env.FIRE_AUTHDOMAIN,
// projectId: process.env.FIRE_PROJECTID,
// storageBucket: process.env.FIRE_STORAGEBUCKET,
// messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
// appId: process.env.FIRE_APPID