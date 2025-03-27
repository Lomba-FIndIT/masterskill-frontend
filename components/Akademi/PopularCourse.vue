<script setup>
    const popularCourses = ref([
    {
      id: 1,
      title: 'Nasi Goreng Kimchi',
      duration: '2h 30m',
      lessons: 15,
      price: 'Free',
      image: new URL('/assets/memasak.jpg', import.meta.url).href,
      category: 'Memasak'
    },
    {
      id: 2,
      title: 'Nasi Goreng Kimchi',
      duration: '2h 30m',
      lessons: 15,
      price: 'Free',
      image: new URL('/assets/memasak.jpg', import.meta.url).href,
      category: 'Memasak'
    },
    {
      id: 3,
      title: 'Nasi Goreng Kimchi',
      duration: '2h 30m',
      lessons: 15,
      price: 'Free',
      image: new URL('/assets/memasak.jpg', import.meta.url).href,
      category: 'Memasak'
    },
    {
      id: 4,
      title: 'Nasi Goreng Kimchi',
      duration: '2h 30m',
      lessons: 15,
      price: 'Free',
      image: new URL('/assets/memasak.jpg', import.meta.url).href,
      category: 'Memasak'
    },
  ])
</script>
<template>
    <v-app>
        <v-main class="gradient-background pt-10">
            <v-container fluid>
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-row no-gutters class="mb-4 align-center">
                                <v-col cols="6">
                                    <h2 class="text-h5 font-weight-bold">Popular Courses</h2>
                                </v-col>
                                
                            </v-row>
                            
                            <v-row no-gutters>
                                <v-col 
                                    v-for="course in popularCourses" 
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
                                        {{ course.title }}
                                    </v-card-title>
                                    
                                    <v-card-subtitle class="d-flex align-center pt-1">
                                        <v-icon size="small" icon="mdi-star" color="warning" class="mr-1"></v-icon>
                                        <span class="mr-2">4.5</span>
                                        <v-icon size="small" icon="mdi-clock" class="mr-1"></v-icon>
                                        <span class="mr-2">{{ course.duration }}</span>
                                        <v-icon size="small" icon="mdi-account" class="mr-1"></v-icon>
                                        <span>156 Terdaftar</span>
                                    </v-card-subtitle>
                
                                    <v-spacer></v-spacer>
                
                                    <v-card-actions class="d-flex justify-space-between align-center pa-4 mt-auto">
                                        <div class="font-weight-bold" style="color: #55BE24;">{{ course.price }}</div>
                                        <v-btn 
                                        color="#50478A" 
                                        variant="flat" 
                                        rounded="lg"
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
</style>