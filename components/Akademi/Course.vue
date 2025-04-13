<script setup>
    import { ref } from 'vue'
    import axios from 'axios';
  
  const topCategories = ref([
    { name: 'Seni Lukis', courses: 28, icon: 'mdi-palette' },
    { name: 'Menjahit', courses: 38, icon: 'mdi-scissors-cutting' },
    { name: 'Photography', courses: 38, icon: 'mdi-camera' },
    { name: 'Photography', courses: 38, icon: 'mdi-camera' },
    
    { name: 'Memasak', courses: 38, icon: 'mdi-chef-hat' },
    { name: 'Desain Digital', courses: 38, icon: 'mdi-photoshop' },
    { name: 'Desain Digital', courses: 38, icon: 'mdi-photoshop' },
    { name: 'Desain Digital', courses: 38, icon: 'mdi-photoshop' }
  ])
  
//   const popularCourses = ref([
//     {
//       id: 1,
//       title: 'Nasi Goreng Kimchi',
//       duration: '2h 30m',
//       price: 'Free',
//       image: new URL('/assets/memasak.jpg', import.meta.url).href,
//       category: 'Memasak',
//       rating: '4.5'
//     },
//     {
//       id: 2,
//       title: 'Nasi Goreng Kimchi',
//       duration: '2h 30m',
//       price: 'Free',
//       image: new URL('/assets/memasak.jpg', import.meta.url).href,
//       category: 'Memasak',
//       rating: '4.5'
//     },
//     {
//       id: 3,
//       title: 'Nasi Goreng Kimchi',
//       duration: '2h 30m',
//       price: 'Free',
//       image: new URL('/assets/memasak.jpg', import.meta.url).href,
//       category: 'Memasak',
//       rating: '4.5'
//     },
//   ])

const popularCourses = ref([])
const token = localStorage.getItem('token')

onMounted(async () => {
  try {
    const response = await axios.get('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/courses', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    popularCourses.value = response.data
    console.log(popularCourses.value)
  } catch (error) {
    console.error('Failed to fetch courses:', error)
  }
})
</script>

<template>
    <v-app>
        <v-main class="pt-6">
            <v-container fluid>

                <!-- Top Categories -->
                <v-container>
                    <v-row no-gutters class="mb-6">
                        <v-col cols="12">
                            <v-row no-gutters class="mb-4 align-center">
                                <v-col cols="6">
                                    <h2 class="text-h5 font-weight-bold">Top Category</h2>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-btn variant="outlined" rounded="xl" border="true" color="#50478A"  @click="$router.push('/akademi/course/category')">
                                        See All
                                    </v-btn>
                                </v-col>
                            </v-row>
                            
                            <v-sheet class="d-flex overflow-x-auto" color="transparent">
                                <v-row no-gutters class="flex-nowrap">
                                    <v-col 
                                        v-for="category in topCategories" 
                                        :key="category.name" 
                                        cols="auto"
                                        class="pa-1"
                                    >
                                        <v-hover v-slot="{ isHovering, props }">
                                            <v-card 
                                                v-bind="props"
                                                variant="outlined" 
                                                width="150"
                                                class="text-center pa-4 d-flex flex-column align-center justify-center"
                                                :class="{ 'scale-up': isHovering }"
                                            >
                                                <v-icon 
                                                    :icon="category.icon" 
                                                    size="large" 
                                                    class="mb-2"
                                                ></v-icon>
                                                <div class="text-subtitle-2">{{ category.name }}</div>
                                                <div class="text-caption text-medium-emphasis">{{ category.courses }} Courses</div>
                                            </v-card>
                                        </v-hover>
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-container>
        
                <!-- Popular Courses -->
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-row no-gutters class="mb-4 align-center">
                                <v-col cols="6">
                                    <h2 class="text-h5 font-weight-bold">Popular Courses</h2>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-btn variant="outlined" rounded="xl" border="true" color="#50478A" @click="$router.push('/akademi/course/popular')">
                                        See All
                                    </v-btn>
                                </v-col>
                            </v-row>
                            
                            <v-row no-gutters>
                                <v-col 
                                    v-for="course in popularCourses.slice(0,3)" 
                                    :key="course.id" 
                                    cols="12" 
                                    md="4"
                                    class="pa-2 d-flex"
                                >
                                    <v-card 
                                    elevation="2" 
                                    rounded="lg"
                                    class="flex-grow-1 d-flex flex-column"
                                    >
                                    <div class="category-badge">{{ course.category }}</div>
                                    <v-img 
                                        :src="course.image" 
                                        height="200" 
                                        cover
                                    ></v-img>
                                    <v-card-title class="pb-1">
                                        {{ course.course_name }}
                                    </v-card-title>
                                    
                                    <v-card-subtitle class="d-flex align-center pt-1">
                                        <v-icon size="small" icon="mdi-star" color="warning" class="mr-1"></v-icon>
                                        <span class="mr-2">{{ course.rating }}</span>
                                        <v-icon size="small" icon="mdi-clock" class="mr-1"></v-icon>
                                        <span class="mr-2">{{ course.duration }}</span>
                                        
                                    </v-card-subtitle>
                
                                    <v-spacer></v-spacer>
                
                                    <v-card-actions class="d-flex justify-space-between align-center pa-4 mt-auto">
                                        <div class="font-weight-bold" style="color: #55BE24;">{{ course.price }}</div>
                                        <v-btn 
                                        color="#50478A" 
                                        variant="flat" 
                                        rounded="lg"
                                        :to="`/akademi/course/daftar/${course.id}`"
                                        >
                                        Daftar
                                        </v-btn>
                                    </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>

            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>

    .category-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 10; /* Pastikan badge ada di atas */
    }

    .overflow-x-auto {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.2) transparent;
    }

    .overflow-x-auto::-webkit-scrollbar {
        height: 8px;
    }

    .overflow-x-auto::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.2);
        border-radius: 4px;
    }

    .scale-up {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }

    .text-body-2 {
    list-style: none; 
    }
</style>