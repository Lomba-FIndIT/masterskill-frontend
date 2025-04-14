<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const topCategories = ref([]);
const token = localStorage.getItem('token');
const isLoading = ref(true);

// Daftar ikon untuk kategori (bisa disesuaikan dengan kategori sebenarnya)
const categoryIcons = {
  'Technology': 'mdi-laptop',
  'Design': 'mdi-palette',
  'Business': 'mdi-briefcase',
  'Marketing': 'mdi-bullhorn',
  'Photography': 'mdi-camera',
  'Music': 'mdi-music',
  'Health': 'mdi-heart-pulse',
  'Cooking': 'mdi-food',
  'Language': 'mdi-translate',
  'Science': 'mdi-flask',
  'default': 'mdi-book-open-page-variant' // ikon default
};

// Daftar warna untuk kategori
const categoryColors = [
  'primary', 'secondary', 'info', 'success', 'warning', 
  'error', 'purple', 'pink', 'indigo', 'deep-purple'
];

onMounted(async () => {
  try {
    const response = await axios.get('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    // Tambahkan warna dan ikon ke setiap kategori
    topCategories.value = response.data.map((category, index) => ({
      ...category,
      color: categoryColors[index % categoryColors.length],
      icon: categoryIcons[category.category_name] || categoryIcons.default
    }));
    
    isLoading.value = false;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    isLoading.value = false;
  }
});
</script>

<template>
  <v-app>
    <v-main class="pt-10 bg-grey-lighten-4">
      <v-container fluid>
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="10">
            <v-card elevation="0" rounded="lg" class="pa-4 mb-6">
              <div class="d-flex align-center mb-6">
                <v-icon size="x-large" color="primary" class="me-3">mdi-view-grid</v-icon>
                <h2 class="text-h4 font-weight-bold gradient-text">Jelajahi Kategori</h2>
              </div>
              
              <p class="text-subtitle-1 text-grey-darken-1 mb-6">
                Temukan berbagai kursus menarik sesuai dengan kategori yang Anda minati
              </p>
              
              <v-divider class="mb-6"></v-divider>
              
              <v-row v-if="isLoading">
                <v-col cols="12" class="d-flex justify-center">
                  <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
                </v-col>
              </v-row>
              
              <v-row v-else>
                <v-col 
                  v-for="category in topCategories" 
                  :key="category.category_name" 
                  cols="6" sm="4" md="3" lg="2"
                  class="pa-2"
                >
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card 
                      v-bind="props"
                      :color="isHovering ? category.color : 'white'"
                      :class="{ 'on-hover': isHovering }"
                      elevation="2"
                      height="160"
                      class="d-flex flex-column align-center justify-center rounded-lg transition-swing cursor-pointer"
                    >
                      <v-avatar
                        :color="isHovering ? 'white' : category.color"
                        size="64"
                        class="mb-3 transition-swing"
                      >
                        <v-icon
                          size="32"
                          :color="isHovering ? category.color : 'white'"
                        >
                          {{ category.icon }}
                        </v-icon>
                      </v-avatar>
                      
                      <div 
                        class="text-subtitle-1 font-weight-medium text-center px-2"
                        :class="isHovering ? 'text-white' : ''"
                      >
                        {{ category.category_name }}
                      </div>
                      
                      <v-slide-y-transition>
                        <div v-if="isHovering" class="text-caption text-white text-center mt-1">
                          Lihat Kursus
                        </div>
                      </v-slide-y-transition>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
              
              <v-row v-if="!isLoading && topCategories.length === 0">
                <v-col cols="12" class="text-center py-12">
                  <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-alert-circle-outline</v-icon>
                  <div class="text-h6 text-grey-darken-1">Belum ada kategori tersedia</div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.on-hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15) !important;
}

.cursor-pointer {
  cursor: pointer;
}

.gradient-text {
  background: linear-gradient(45deg, #3f51b5, #2196f3);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
</style>