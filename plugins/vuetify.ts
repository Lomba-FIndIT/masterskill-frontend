import { defineNuxtPlugin } from "#app";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: "customTheme",
      themes: {
        customTheme: {
          dark: false,
          colors: {
            primary: "#1976D2",
            secondary: "#424242",
          },
          variables: {
            "font-family": "Poppins, sans-serif",
          },
        },
      },
    },
    defaults: {
      global: {
        style: {
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
