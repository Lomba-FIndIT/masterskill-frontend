<script setup>
import { useRoute } from 'vue-router';
import { computed, watchEffect } from 'vue'
import NavbarLandingPage from './components/NavbarLandingPage.vue';
import Navbar from './components/Navbar.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import Footer from './components/Footer.vue';

import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const userStore = useUserStore()
const token = localStorage.getItem('token')

// Await fetchUser before component renders
await userStore.fetchUser()

const user = computed(() => userStore.user)
</script>

<template>
  <v-app>
    <template v-if="route.path === '/' || route.path === '/login'">
      <NavbarLandingPage />
    </template>
    <template v-else>
      <NavbarAdmin v-if="user && user.role_id === 1" />
      <Navbar v-else-if="token && user.role_id === 4" />
    </template>

    <v-main>
      <transition name="fade">
        <NuxtPage />
      </transition>
    </v-main>

    <Footer />
  </v-app>
</template>
