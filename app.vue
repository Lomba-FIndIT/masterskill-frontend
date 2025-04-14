<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import NavbarLandingPage from './components/NavbarLandingPage.vue'
import Navbar from './components/Navbar.vue'
import NavbarAdmin from './components/NavbarAdmin.vue'
import Footer from './components/Footer.vue'

import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const token = localStorage.getItem('token')

if (token) {
  userStore.setToken(token)
  try{
      await userStore.fetchUser()
  }catch{
    localStorage.removeItem('token')
    router.push('/')
  }
  
}else{
  router.push('/')
}

const user = computed(() => userStore.user)
</script>


<template>
  <v-app>
    <template v-if="route.path === '/' || route.path === '/login'">
      <NavbarLandingPage />
    </template>
    <template v-else>
      <NavbarAdmin v-if="user && user.role_id === 1" />
      <Navbar v-else-if="user && user.role_id === 4" />
    </template>

    <v-main>
      <transition name="fade">
        <NuxtPage />
      </transition>
    </v-main>

    <Footer />
  </v-app>
</template>
