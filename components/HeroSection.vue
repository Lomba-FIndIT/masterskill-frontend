

<template>
    <v-app>
      <v-container fluid>
        <!-- Header Section -->
        <v-row class="mb-6 align-center">
          <v-col cols="12" md="6">
            <h1 class="text-h4 font-weight-bold mb-4">New Day, New Skills. Learn, Create, Thrive!</h1>
            <v-btn color="primary" size="large" class="mt-2">Get Started!</v-btn>
          </v-col>
          <v-col cols="12" md="6" class="text-center">
            <img 
              src="/assets/heropic.png" 
              contain 
              max-height="300" 
              class="mx-auto"
            ></img>
          </v-col>
        </v-row>
  
        <!-- Top Categories -->
        <v-row class="mb-6">
          <v-col cols="12">
            <h2 class="text-h5 mb-4">Top Categories</h2>
            <v-row>
              <v-col 
                v-for="category in topCategories" 
                :key="category.name" 
                cols="6" 
                md="2"
              >
                <v-card 
                  variant="outlined" 
                  class="text-center pa-4 hover-effect"
                >
                  <v-icon 
                    :icon="category.icon" 
                    size="large" 
                    class="mb-2"
                  ></v-icon>
                  <div>{{ category.name }}</div>
                  <div class="text-caption">{{ category.courses }} Courses</div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
  
        <!-- Popular Courses -->
        <v-row>
          <v-col cols="12">
            <v-row class="mb-4 align-center">
              <v-col cols="6">
                <h2 class="text-h5">Popular Courses</h2>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn variant="text" color="primary">See All</v-btn>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col 
                v-for="course in popularCourses" 
                :key="course.id" 
                cols="12" 
                md="4"
              >
                <v-card>
                  <v-img 
                    :src="course.image" 
                    height="200" 
                    cover
                  ></v-img>
                  <v-card-title>{{ course.title }}</v-card-title>
                  <v-card-subtitle>
                    <v-icon size="small" icon="mdi-clock"></v-icon>
                    {{ course.duration }} · {{ course.lessons }} Lessons
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-btn 
                      variant="flat" 
                      color="primary" 
                      block
                    >
                      {{ course.price === 'Free' ? 'Free' : 'Daftar' }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
</template>
  
<script setup>
  import { ref } from 'vue'
  
  const topCategories = ref([
    { name: 'Seni Lukis', courses: 28, icon: 'mdi-palette' },
    { name: 'Menjahit', courses: 38, icon: 'mdi-scissors-cutting' },
    { name: 'Photography', courses: 38, icon: 'mdi-camera' },
    { name: 'Memasak', courses: 38, icon: 'mdi-chef-hat' },
    { name: 'Desain Digital', courses: 38, icon: 'mdi-photoshop' }
  ])
  
  const popularCourses = ref([
    {
      id: 1,
      title: 'Nasi Goreng Kimchi',
      duration: '2h 30m',
      lessons: 15,
      price: 'Free',
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      title: 'Nasi Goreng Kimchi',
      duration: '2h 30m',
      lessons: 15,
      price: 'Free',
      image: '/api/placeholder/400/300'
    },
    {
      id: 3,
      title: 'Nasi Goreng Kimchi',
      duration: '2h 30m',
      lessons: 15,
      price: 'Free',
      image: '/api/placeholder/400/300'
    }
  ])
</script>
  
  <style scoped>
  .hover-effect:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
  </style>