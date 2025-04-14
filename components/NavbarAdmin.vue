<script setup>
import { ref, shallowRef } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()
const drawer = shallowRef(false);
const akademiMenuOpen = ref(false);

const items = [
  { text: "Dashboard", to: "/dashboard" },
  { 
    text: "Akademi", 
    subItems: [
      { text: "Course", to: "/akademi/course" },
      { text: "Forum Diskusi", to: "/akademi/forum" }
    ] 
  },
  { text: "Layanan", to: "/layanan",
    subItems: [
      { text: "CV Clinic", to: "/layanan/cv" },
      { text: "Webinar", to: "/layanan/webinar" }
    ] 
   },
  { text: "Lowongan Kerja", to: "/lowongan" },
  { text: "Add Role", to: "/addRole" },
];

const logout = async () => {
  try {
    await userStore.logoutUserFromAPI()
    // Redirect ke halaman login setelah logout
    // Misalnya pakai router.push('/login')
    console.log('Logout successful')
    localStorage.removeItem('token')
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" color="#ffffff" class="custom-drawer" disable-resize-watcher>
    <v-list nav>
      <template v-for="(item, i) in items" :key="i">
        <v-list-item 
          v-if="!item.subItems" 
          :to="item.to" 
          link 
          active-class="active-link" 
          class="nav-item"
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
        
        <v-list-group v-else :value="false">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" class="nav-item">
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </template>
          
          <v-list-item 
            v-for="(subItem, j) in item.subItems" 
            :key="j" 
            :to="subItem.to" 
            link 
            class="nav-subitem"
          >
            <v-list-item-title>{{ subItem.text }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
    
    <v-divider></v-divider>
    
    <v-list>
      <v-list-item @click="logout" class="logout-btn">
        <v-icon class="logout-icon">mdi-logout</v-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- App Bar -->
  <v-app-bar app color="#FFFDEE" elevation="2" class="custom-app-bar pa-4">
    <template #prepend>
      <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" class="nav-icon" />
    </template>
    <router-link to="/" class="logo-container">
      <img src="/assets/logo.png" alt="Logo" class="logo pl-6" />
    </router-link>

    <v-spacer></v-spacer>

    <!-- Navbar Links (Desktop) -->
    <v-toolbar-items v-if="$vuetify.display.mdAndUp">
      <template v-for="(item, i) in items" :key="i">
        <v-btn 
          v-if="!item.subItems" 
          :to="item.to" 
          class="nav-btn text-none mx-2"
        >
          {{ item.text }}
        </v-btn>
        
        <v-menu v-else open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn 
              v-bind="props" 
              class="nav-btn text-none mx-2"
            >
              {{ item.text }}
              <v-icon class="ml-1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item 
              v-for="(sub, j) in item.subItems" 
              :key="j" 
              :to="sub.to"
              class="px-4 py-2"
            >
              <v-list-item-title>{{ sub.text }}</v-list-item-title>
            </v-list-item>
            
          </v-list>
        </v-menu>
      </template>
        <v-btn @click="logout" class="nav-btn text-none mx-2">
            Logout
        </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<style scoped>
/* Logo Styling */
.logo-container {
  display: flex;
  align-items: center;
}
.logo {
  height: 50px;
  transition: transform 0.3s ease;
}
.logo:hover {
  transform: scale(1.1);
}

/* Navigation Drawer */
.custom-drawer {
  border-right: 2px solid #50478A;
}
.nav-item {
  transition: background 0.3s, color 0.3s;
  font-weight: bold;
}
.nav-item:hover, .active-link {
  background: #50478A;
  color: white;
}

/* App Bar */
.custom-app-bar {
  padding: 0 20px;
  border-bottom: 2px solid #50478A;
}

/* Navbar Buttons */
.nav-btn {
  color: #482611;
  font-weight: bold;
  transition: all 0.3s;
  border-radius: 8px;
  background-color: transparent;
  text-transform: none;
}
.nav-btn:hover {
  background: #50478A;
  color: white;
  transform: scale(1.05);
}
.nav-btn.v-btn--active {
  background: #50478A;
  color: white;
  opacity: 1;
}

/* Dropdown Menu Styling */
.v-menu__content {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.v-list-item {
  transition: background-color 0.3s;
}
.v-list-item:hover {
  background-color: #50478A20;
}

/* Logout Button */
.logout-btn {
  cursor: pointer;
  transition: all 0.3s ease;
  color: #d32f2f;
  font-weight: bold;
}
.logout-btn:hover {
  background: #d32f2f;
  color: white;
}
.logout-icon {
  margin-right: 10px;
}
</style>