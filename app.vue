<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import NavbarLandingPage from './components/NavbarLandingPage.vue';
import Navbar from './components/Navbar.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import Footer from './components/Footer.vue'; // kalau belum diimport

import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const route = useRoute()

onMounted(() => {
  userStore.fetchUser()
})
</script>

<template>
  <v-app>
    <template v-if="route.path === '/' || route.path === '/login'">
      <NavbarLandingPage />
    </template>
    <template v-else>
      <NavbarAdmin v-if="userStore.user && userStore.user.role_id === 1" />
      <Navbar v-else-if="userStore.user && userStore.user.role_id === 4" />
    </template>

    <v-main>
      <transition name="fade">
        <NuxtPage />
      </transition>
    </v-main>

    <Footer />
  </v-app>
</template>
