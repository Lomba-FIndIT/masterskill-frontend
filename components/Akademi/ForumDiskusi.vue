<script setup>
    import { ref, computed } from 'vue'
    
    const searchQuery = ref('')

    const discussions = ref([
      {
        id: 1,
        title: 'Review Alat & Bahan Jahit (1)',
        author: 'Halima',
        date: 'Senin, 10 Maret 2025',
        comments: 1,
        views: 3,
        category: 'Menjahit',
        color: '#FF6F61'
      },
      {
        id: 2,
        title: 'Makanan Untuk Berbuka Puasa(2)',
        author: 'Halima',
        date: 'Senin, 10 Maret 2025',
        comments: 1,
        views: 3,
        category: 'Memasak',
        color: '#6B5B95'
      },
      {
        id: 3,
        title: 'Berkebun menanam tanaman hias (3)',
        author: 'Halima',
        date: 'Senin, 10 Maret 2025',
        comments: 1,
        views: 3,
        category: 'Berkebun',
        color: '#88B04B'
      },
      {
        id: 4,
        title: 'Makanan Untuk Berbuka Puasa',
        author: 'Halima',
        date: 'Senin, 10 Maret 2025',
        comments: 1,
        views: 3,
        category: 'Memasak',
        color: '#6B5B95'
      },
      {
        id: 5,
        title: 'Makanan Untuk Berbuka Puasa',
        author: 'Halima',
        date: 'Senin, 10 Maret 2025',
        comments: 1,
        views: 3,
        category: 'Memasak',
        color: '#6B5B95'
      },
      {
        id: 6,
        title: 'Makanan Untuk Berbuka Puasa',
        author: 'Halima',
        date: 'Senin, 10 Maret 2025',
        comments: 1,
        views: 3,
        category: 'Memasak',
        color: '#6B5B95'
      }
    ])

    const filteredDiscussions = computed(() => {
      if (!searchQuery.value) return discussions.value

      const query = searchQuery.value.toLowerCase()
      return discussions.value.filter(discussion => 
        discussion.title.toLowerCase().includes(query) ||
        discussion.author.toLowerCase().includes(query) ||
        discussion.date.toLowerCase().includes(query)
      )
    })

    const categories = [
      { name: 'Semua', value: '' },
      { name: 'Memasak', value: 'Memasak' },
      { name: 'Menjahit', value: 'Menjahit' },
      { name: 'Berkebun', value: 'Berkebun' }
    ]
    
    const selectedCategory = ref('')
    
    const displayedDiscussions = computed(() => {
      let results = filteredDiscussions.value
      if (selectedCategory.value) {
        results = results.filter(d => d.category === selectedCategory.value)
      }
      return results
    })
    
    const getInitials = (name) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
</script>

<template>
  <v-app>
    <v-main class="forum-background">
      <v-container fluid>
        <!-- Hero Section -->
        <v-container class="hero-container" fluid>
          <div class="forum-hero">
            <div class="hero-content text-center">
              <h1 class="text-h3 font-weight-bold gradient-text mb-4">Diskusi dan Komunitas</h1>
              <p class="text-subtitle-1 text-medium-emphasis mx-auto forum-description mb-8">
                Bergabung dalam diskusi, ajukan pertanyaan, dan berbagi ilmu dengan komunitas untuk mengembangkan keterampilan bersama!
              </p>
              
              <v-row class="forum-stats justify-center mb-6">
                <v-col cols="12" sm="4" md="3">
                  <div class="stat-card">
                    <v-icon icon="mdi-forum" size="x-large" color="#50478A" class="mb-2"></v-icon>
                    <div class="text-h5 font-weight-bold">24+</div>
                    <div class="text-caption">Forum Aktif</div>
                  </div>
                </v-col>
                
                <v-col cols="12" sm="4" md="3">
                  <div class="stat-card">
                    <v-icon icon="mdi-message-reply-text" size="x-large" color="#50478A" class="mb-2"></v-icon>
                    <div class="text-h5 font-weight-bold">1,250+</div>
                    <div class="text-caption">Diskusi Mingguan</div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-container>
        
        <!-- Discussion Content -->
        <v-container class="discussion-container">
          <v-card class="main-card">
            <v-card-title class="d-flex align-center px-4 card-title">
              <v-icon icon="mdi-comment-text-multiple" size="large" color="#50478A" class="mr-3"></v-icon>
              <span class="text-h5 font-weight-bold">Diskusi Populer</span>
              <v-spacer></v-spacer>
              <v-btn color="#50478A" prepend-icon="mdi-plus" variant="flat" rounded="lg">
                Buat Diskusi Baru
              </v-btn>
            </v-card-title>
            
            <v-card-text class="px-4 pb-0">
              <v-row align="center" class="mb-4">
                <v-col cols="12" md="6">
                  <v-chip-group v-model="selectedCategory">
                    <v-chip
                      v-for="category in categories"
                      :key="category.name"
                      :value="category.value" 
                      filter
                      variant="elevated"
                      class="custom-chip"
                      color="#50478A"
                    >
                      {{ category.name }}
                    </v-chip>
                  </v-chip-group>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="searchQuery"
                    label="Cari diskusi..."
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    density="compact"
                    rounded="lg"
                    clearable
                    hide-details
                    class="search-field"
                  ></v-text-field>
                </v-col>
              </v-row>
              
              <div v-if="displayedDiscussions.length === 0" class="text-center py-8">
                <v-icon icon="mdi-magnify-close" size="x-large" color="grey" class="mb-4"></v-icon>
                <h3 class="text-subtitle-1 font-weight-medium">Tidak ada hasil yang ditemukan</h3>
                <p class="text-body-2 text-medium-emphasis">Coba dengan kata kunci lain atau hapus filter</p>
                <v-btn color="#50478A" variant="text" @click="searchQuery = ''; selectedCategory = ''">
                  Reset Pencarian
                </v-btn>
              </div>
              
              <v-row v-else>
                <v-col 
                  v-for="discussion in displayedDiscussions" 
                  :key="discussion.id" 
                  cols="12" 
                  md="4"
                  class="d-flex"
                >
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card 
                      v-bind="props"
                      class="discussion-card flex-grow-1 d-flex flex-column" 
                      elevation="1"
                      :class="{ 'on-hover': isHovering }"
                    >
                      <div class="card-category-label" :style="`background-color: ${discussion.color}`">
                        {{ discussion.category }}
                      </div>
                      
                      <v-card-item>
                        <div class="d-flex align-center mb-3">
                          <v-avatar class="mr-3" :color="discussion.color">
                            {{ getInitials(discussion.author) }}
                          </v-avatar>
                          <div>
                            <div class="text-subtitle-2 font-weight-medium">{{ discussion.author }}</div>
                            <div class="text-caption text-medium-emphasis">{{ discussion.date }}</div>
                          </div>
                        </div>
                        
                        <v-card-title class="px-0 py-2 text-subtitle-1 font-weight-bold discussion-title">
                          {{ discussion.title }}
                        </v-card-title>
                      </v-card-item>
                      
                      <v-spacer></v-spacer>
                      
                      <v-divider class="mt-2"></v-divider>
                      
                      <v-card-actions class="pa-4">
                        <div class="discussion-stats d-flex align-center">
                          <span class="stat-item">
                            <v-icon icon="mdi-comment-outline" size="small" color="#50478A"></v-icon>
                            <span class="text-caption ml-1">{{ discussion.comments }} balasan</span>
                          </span>
                          
                          <span class="stat-item ml-4">
                            <v-icon icon="mdi-eye-outline" size="small" color="#50478A"></v-icon>
                            <span class="text-caption ml-1">{{ discussion.views }} dilihat</span>
                          </span>
                        </div>
                        
                        <v-spacer></v-spacer>
                        
                        <v-btn 
                          color="#50478A" 
                          variant="flat" 
                          density="comfortable"
                          rounded="lg"
                          :to="`/akademi/forum/${discussion.id}`"
                          class="view-btn"
                        > 
                          <v-icon icon="mdi-arrow-right" class="mr-1" size="small"></v-icon>
                          Lihat 
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-card-text>
            
            <v-card-actions class="justify-center pa-6">
              <v-pagination
                v-if="displayedDiscussions.length > 0"
                v-model="page"
                :length="3"
                rounded="circle"
                color="#50478A"
              ></v-pagination>
            </v-card-actions>
          </v-card>
          
          
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
  .forum-background {
    background: linear-gradient(180deg, 
      rgba(80, 71, 138, 0.08) 0%, 
      rgba(255, 255, 255, 1) 100%);
    min-height: 100vh;
  }
  
  .hero-container {
    padding: 0;
  
  }
  
  .forum-hero {
    padding: 3rem 1rem;
    position: relative;
    overflow: hidden;
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
  }
  
  .gradient-text {
    background: linear-gradient(90deg, #50478A 0%, #9280FF 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
    padding-bottom: 0.5rem;
    position: relative;
  }
  
  .gradient-text::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 3px;
    border-radius: 3px;
    background: linear-gradient(90deg, #50478A 0%, #9280FF 100%);
  }
  
  .forum-description {
    max-width: 700px;
    line-height: 1.6;
  }
  
  .forum-stats {
    max-width: 900px;
    margin: 0 auto;
  }
  
  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    height: 100%;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  }
  
  .discussion-container {
    position: relative;
    margin-bottom: 3rem;
  }
  
  .main-card {
    border-radius: 16px;
    overflow: hidden;
  }
  
  .card-title {
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  
  .custom-chip {
    margin-right: 8px;
    font-weight: 500;
  }
  
  .search-field {
    max-width: 100%;
  }
  
  .discussion-card {
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
    border: 1px solid rgba(0,0,0,0.1);
    height: 100%;
  }
  
  .discussion-card.on-hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    border-color: #50478A;
  }
  
  .card-category-label {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.3rem 1rem;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    border-bottom-left-radius: 8px;
  }
  
  .discussion-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.5rem;
  }
  
  .discussion-stats {
    font-size: 0.875rem;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
  }
  
  .view-btn {
    transition: all 0.3s ease;
  }
  
  .view-btn:hover {
    transform: translateX(3px);
  }
  
  .cta-card {
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #F9F9F9 0%, #EFEFEF 100%);
    position: relative;
  }
  
  .cta-image-container {
    overflow: hidden;
    height: 100%;
    position: relative;
  }
  
  .cta-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
  
  @media (max-width: 960px) {
    .gradient-text {
      font-size: 2rem;
    }
    
    .forum-stats {
      margin-bottom: 1rem;
    }
    
    .stat-card {
      margin-bottom: 1rem;
    }
  }
</style>