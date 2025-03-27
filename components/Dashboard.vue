<script setup>
  import { ref } from 'vue'
  
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
  ])

  const discussions = ref([
  { author: 'Halima', date: 'Senin, 10 Maret 2025', title: 'Makanan Untuk Berbuka Puasa', replies: 1, members: 3 },
  { author: 'Halima', date: 'Senin, 10 Maret 2025', title: 'Makanan Untuk Berbuka Puasa', replies: 1, members: 3 },
  { author: 'Halima', date: 'Senin, 10 Maret 2025', title: 'Makanan Untuk Berbuka Puasa', replies: 1, members: 3 }
]);
</script>

<template>
    <v-app>
        <v-main class="gradient-background">
            <v-container fluid>
                <!-- Header Section -->
                <v-row no-gutters class="mb-6 pl-8 pt-6">
                    <v-col cols="12" md="6" class="d-flex flex-column justify-center ">
                    <h1 class="text-h3 font-weight-bold mb-4">New Day, New Skills. Learn, Create, Thrive!</h1>
                    <h2 class="text-subtitle-1 mb-4 text-medium-emphasis">
                        Belajar keterampilan praktis yang bisa 
                        langsung diterapkan dalam kehidupan sehari-hari! Dari menjahit, berkebun, memasak, 
                        hingga keterampilan lainnya—jadilah lebih mandiri dan kreatif bersama kami.
                    </h2>
                   
                    </v-col>
                    <v-col cols="12" md="6" class="d-flex justify-center align-center">
                    <img 
                        src="/assets/heropic.png" 
                        height="300" 
                        contain
                        class="mx-auto"
                    ></img>
                    </v-col>
                </v-row>
    
                <!-- Top Categories -->
                <v-container>
                    <v-row no-gutters class="mb-6">
                        <v-col cols="12">
                            <v-row no-gutters class="mb-4 align-center">
                                <v-col cols="6">
                                    <h2 class="text-h5 font-weight-bold">Top Category</h2>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-btn variant="outlined" rounded="xl" border="true" color="#50478A">See All</v-btn>
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
                                    <v-btn variant="outlined" rounded="xl" border="true" color="#50478A">See All</v-btn>
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
    
                <!-- CV Improvement Section -->
                <v-container>
                    <v-row>
                    <v-col cols="12">
                        <v-card class="pa-6 rounded-lg gradient-bg-cv" >
                        <v-row align="center">

                            <v-col cols="12" md="4">
                            <img src="/assets/cv-review.png" height="200" contain></img>
                            </v-col>

                            <v-col cols="12" md="6">
                            <h2 class="text-h4 font-weight-bold">Tingkatkan Peluangmu dengan CV yang Menarik!</h2>
                            <p class="text-body-2 mt-2">
                                Apakah CV-mu sudah cukup kuat untuk menarik perhatian recruiter? Biarkan para ahli membantu!
                            </p>
                            <ul class="text-body-2 mt-1">
                                <li>✅ Analisis Profesional – Dapatkan masukan dari pakar industri</li>
                                <li>✅ Optimasi ATS-Friendly – Pastikan CV-mu lolos seleksi awal</li>
                                <li>✅ Meningkatkan Kesempatan – Buat CV yang standout di mata recruiter</li>
                            </ul>
                            <v-btn color="#50478A" class="mt-3">Daftar Sekarang</v-btn>
                            </v-col>
                            
                        </v-row>
                        </v-card>
                    </v-col>
                    </v-row>
                </v-container>
    
                <!-- Community Discussion Section -->
                <v-container class="mt-6">
                    <h2 class="text-h4 font-weight-bold text-center">Diskusi dan Komunitas</h2>
                    <p class="text-center text-medium-emphasis mb-4">Bergabung dalam diskusi, ajukan pertanyaan, dan berbagi ilmu dengan komunitas!</p>
                    <v-row no-gutters class="mb-4 mt-7 align-center">
                                <v-col cols="6">
                                    <h2 class="text-h5 font-weight-bold">Popular Courses</h2>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-btn variant="outlined" rounded="xl" border="true" color="#50478A">See All</v-btn>
                                </v-col>
                            </v-row>
                    <v-row>
                    <v-col 
                        v-for="(discussion, index) in discussions" 
                        :key="index" 
                        cols="12" 
                        md="4"
                        class="d-flex"
                    >
                        <v-card 
                            class="pa-4 flex-grow-1 d-flex flex-column " 
                            elevation="2"
                            rounded="lg"
                            variant="outlined"
                            style="border-color: #50478A;"
                            >
                            <p class="text-caption text-medium-emphasis">by {{ discussion.author }}, {{ discussion.date }}</p>
                            <h3 class="text-subtitle-1 font-weight-bold flex-grow-1">{{ discussion.title }}</h3>
                            <v-row class="mt-2">
                                <v-col cols="6">
                                <p class="text-caption">💬 {{ discussion.replies }} balasan</p>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                <p class="text-caption">👥 {{ discussion.members }} orang</p>
                                </v-col>
                            </v-row>
                            <v-btn 
                                color="#50478A" 
                                background-color="#50478A"
                                variant="flat" 
                                block
                                class="mt-3"
                            > 
                                Lihat 
                            </v-btn>
                        </v-card>
                    </v-col>
                    </v-row>
                </v-container>
    
                <!-- Job Opportunities Section -->
                <v-container>
                    <v-row>
                    <v-col cols="12">
                        <v-card class="pa-6 rounded-lg gradient-bg-job" >
                        <v-row align="center">
                            <v-col cols="12" md="6">
                            <h2 class="text-h3 font-weight-bold">Kesempatan Baru, Karier Baru!</h2>
                            <p class="text-body-2">Jelajahi lowongan pekerjaan terbaru dan wujudkan karier impianmu hari ini!</p>
                            <v-btn color="#50478A" class="mt-3">Lamar Sekarang</v-btn>
                            </v-col>
                            <v-col cols="12" md="6" class=" text-right">
                            <img src="/assets/job-opportunity.png" height="250" contain></img>
                            </v-col>
                        </v-row>
                        </v-card>
                    </v-col>
                    </v-row>
                </v-container>
            </v-container>
        </v-main>
    </v-app>
</template>
    
<style scoped>
    .gradient-background {
        background: linear-gradient(180deg, 
        rgba(255, 206, 174, 1) 0%, 
        rgba(255, 255, 255, 1) 50%);
    }

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

    .gradient-bg-cv {
        background: linear-gradient(256deg, 
        rgba(255, 176, 123, 1) 0%, 
        rgba(253, 230, 98, 0.5) 80%);
    }

    .gradient-bg-job {
        background: linear-gradient(-256deg, 
        rgba(255, 176, 123, 1) 0%, 
        rgba(253, 230, 98, 0.5) 80%);
    }

    .text-body-2 {
    list-style: none; 
    }
</style>