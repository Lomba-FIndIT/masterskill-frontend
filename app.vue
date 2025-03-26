<script setup>
import NavbarLandingPage from './components/NavbarLandingPage.vue';
</script>

<template>
  <v-app>
    <NavbarLandingPage  />
    <v-main>
      <transition name="fade">
        <NuxtPage />
      </transition>
    </v-main>
    <Footer/>
  </v-app>
</template>