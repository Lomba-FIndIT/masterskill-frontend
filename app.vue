<script setup>
import { useRoute } from 'vue-router';
import NavbarLandingPage from './components/NavbarLandingPage.vue';
import Navbar from './components/Navbar.vue';

const route = useRoute();
</script>

<template>
  <v-app>
    <template v-if="route.path === '/' || route.path === '/login'">
      <NavbarLandingPage />
    </template>
    <template v-else>
      <Navbar />
    </template>

    <v-main>
      <transition name="fade">
        <NuxtPage />
      </transition>
    </v-main>

    <Footer />
  </v-app>
</template>
