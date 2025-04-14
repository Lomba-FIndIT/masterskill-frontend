<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const popularCourses = ref([])
const token = localStorage.getItem('token')
const loading = ref(true)

onMounted(async () => {
    loading.value = true
    try {
        const response = await axios.get('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/courses', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        popularCourses.value = response.data
    } catch (error) {
        console.error('Failed to fetch courses:', error)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <v-app>
        <v-main class="main-background">
            <!-- Hero Section -->
            <div class="hero-section">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
                            <h1 class="text-h3 font-weight-bold text-white mb-4">Tingkatkan Keterampilan Anda Sekarang</h1>
                            <p class="text-subtitle-1 text-white mb-6">
                                Temukan beragam kursus berkualitas tinggi yang dirancang untuk membantu Anda mencapai tujuan karir dan pribadi Anda.
                            </p>
                        </v-col>
                        
                    </v-row>
                </v-container>
            </div>

            <!-- Main Content -->
            <v-container class="my-8">
                <v-row>
                    <v-col cols="12">
                        <div class="d-flex justify-space-between align-center mb-6">
                            <h2 class="text-h5 font-weight-bold">
                                Semua Kursus <span class="text-body-1 text-medium-emphasis">({{ popularCourses.length }})</span>
                            </h2>
                        </div>

                        <v-fade-transition>
                            <div v-if="loading" class="d-flex justify-center align-center py-12">
                                <v-progress-circular indeterminate color="#50478A" size="64" />
                            </div>
                            <div v-else>
                                <v-row v-if="popularCourses.length">
                                    <v-col
                                        v-for="course in popularCourses"
                                        :key="course.id"
                                        cols="12"
                                        sm="6"
                                        md="4"
                                        lg="3"
                                        class="pa-2 d-flex"
                                    >
                                        <v-card elevation="3" rounded="lg" class="flex-grow-1 d-flex flex-column course-card">
                                            <div class="category-badge">{{ course.category }}</div>
                                            <v-img
                                                :src="course.img_url"
                                                height="200"
                                                cover
                                                class="course-image"
                                            >
                                                <template v-slot:placeholder>
                                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                                        <v-progress-circular indeterminate color="grey-lighten-5" />
                                                    </v-row>
                                                </template>
                                            </v-img>

                                            <v-card-title class="pb-1 text-truncate">
                                                {{ course.course_name }}
                                            </v-card-title>

                                            <v-card-subtitle class="d-flex align-center pt-1">
                                                <div class="d-flex align-center">
                                                    <v-icon size="small" icon="mdi-star" color="warning" class="mr-1"></v-icon>
                                                    <span class="mr-3 font-weight-medium">{{ course.ratings }}</span>
                                                </div>
                                                <div class="d-flex align-center">
                                                    <v-icon size="small" icon="mdi-clock-outline" class="mr-1"></v-icon>
                                                    <span>{{ course.total_duration }}</span>
                                                </div>
                                            </v-card-subtitle>

                                            <v-spacer />

                                            <v-card-actions class="d-flex justify-space-between align-center pa-4 mt-auto">
                                                <div class="font-weight-bold price-text">{{ course.price }}</div>
                                                <v-btn
                                                    color="#50478A"
                                                    variant="flat"
                                                    rounded="lg"
                                                    :to="`/akademi/course/daftar/${course.id}`"
                                                    elevation="1"
                                                    class="enroll-button"
                                                >
                                                    Daftar
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row v-else>
                                    <v-col cols="12" class="text-center pa-12">
                                        <v-icon size="64" icon="mdi-book-open-page-variant-outline" color="grey-lighten-1" class="mb-4"></v-icon>
                                        <h3 class="text-h6 text-medium-emphasis">Kursus tidak ditemukan</h3>
                                        <p class="text-body-2 text-medium-emphasis mt-2">Belum ada kursus tersedia saat ini.</p>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-fade-transition>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
.main-background {
    background-color: #f5f7fa;
}

.hero-section {
    background: linear-gradient(135deg, #50478A 0%, #7a6fba 100%);
    padding: 80px 0;
    border-radius: 0 0 30px 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.hero-image {
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: perspective(1000px) rotateY(-10deg);
    transition: transform 0.5s;
}

.hero-image:hover {
    transform: perspective(1000px) rotateY(0deg);
}

.course-card {
    transition: transform 0.3s, box-shadow 0.3s;
    overflow: hidden;
    border: none;
}

.course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.course-image {
    transition: transform 0.5s;
}

.course-card:hover .course-image {
    transform: scale(1.05);
}

.category-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
    backdrop-filter: blur(5px);
}

.price-text {
    color: #55BE24;
    font-size: 18px;
}

.enroll-button {
    transition: transform 0.2s, box-shadow 0.2s;
}

.enroll-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(80, 71, 138, 0.3) !important;
}
</style>
