<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()


const router = useRouter();

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

const discussions = ref([
    { id: 1, author: 'Halima', date: 'Senin, 10 Maret 2025', title: 'Makanan Untuk Berbuka Puasa', replies: 1, members: 3 },
    { id: 2,author: 'Halima', date: 'Senin, 10 Maret 2025', title: 'Makanan Untuk Berbuka Puasa', replies: 1, members: 3 },
    { id: 3,author: 'Halima', date: 'Senin, 10 Maret 2025', title: 'Makanan Untuk Berbuka Puasa', replies: 1, members: 3 }
]);

const logout = async () => {
  try {
    await userStore.logoutUserFromAPI()
    console.log('Logout successful')
    localStorage.removeItem('token')
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
    <v-app>
        <v-main class="gradient-background">
            <v-container>
                <!-- Hero Section with Animation -->
                <v-row no-gutters class="hero-section">
                    <v-col cols="12" md="6" class="d-flex flex-column justify-center hero-content">
                        <div data-aos="fade-right" data-aos-duration="1000">
                            <h1 class="text-h2 font-weight-bold mb-4 hero-title">New Day, <span
                                    class="gradient-text">New Skills</span>.<br>Learn, Create, Thrive!</h1>
                            <h2 class="text-subtitle-1 mb-6 text-medium-emphasis hero-subtitle">
                                Belajar keterampilan praktis yang bisa langsung diterapkan dalam kehidupan sehari-hari!
                                Dari menjahit, berkebun, memasak, hingga keterampilan lainnya—jadilah lebih mandiri dan
                                kreatif bersama kami.
                            </h2>
                            <v-btn size="large" color="#50478A" elevation="4" class="px-6 py-3" rounded="pill" @click="logout">
                                <v-icon left>mdi-rocket-launch</v-icon>
                                logout
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="d-flex justify-center align-center">
                        <img src="/assets/heropic.png" height="350" contain class="hero-image animate-float">
                    </v-col>
                </v-row>
                <!-- Stats Bar -->

                <v-row class="stats-bar my-8">
                    <v-col cols="12">
                        <v-card class="stats-card py-4" rounded="xl" elevation="3">
                            <v-row align="center" justify="center" no-gutters>
                                <v-col cols="12" sm="4" class="stat-item">
                                    <div class="text-center">
                                        <div class="text-h4 font-weight-bold">500+</div>
                                        <div class="text-subtitle-2 text-medium-emphasis">Kursus Tersedia</div>
                                    </div>
                                </v-col>
                                <v-col cols="12" sm="4" class="stat-item">
                                    <div class="text-center">
                                        <div class="text-h4 font-weight-bold">10,000+</div>
                                        <div class="text-subtitle-2 text-medium-emphasis">Peserta Aktif</div>
                                    </div>
                                </v-col>
                                <v-col cols="12" sm="4" class="stat-item">
                                    <div class="text-center">
                                        <div class="text-h4 font-weight-bold">98%</div>

                                        <div class="text-subtitle-2 text-medium-emphasis">Tingkat Kepuasan</div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>

                <!-- Top Categories -->
                <v-container class="section-container">
                <v-row no-gutters class="mb-6">
                    <v-col cols="12">
                    <v-row no-gutters class="mb-6 align-center">
                        <v-col cols="6">
                        <div class="section-heading">
                            <h2 class="text-h5 font-weight-bold">
                            <v-icon color="#50478A" class="mr-2">mdi-star-circle</v-icon>
                            Top Category
                            </h2>
                        </div>
                        </v-col>
                        <v-col cols="6" class="text-right">
                        <v-btn variant="outlined" rounded="xl" border="true" color="#50478A" class="view-all-btn" @click="$router.push('/akademi/course/category')">
                            <span>See All</span>
                            <v-icon right>mdi-arrow-right</v-icon>
                        </v-btn>
                        </v-col>
                    </v-row>
                    <v-sheet class="d-flex overflow-x-auto" color="transparent">
                        <v-row no-gutters class="flex-nowrap">
                        <v-col v-for="(category, index) in topCategories" :key="category.name + index" cols="auto" class="pa-2">
                            <v-hover v-slot="{ isHovering, props }">
                            <v-card v-bind="props" variant="outlined" width="160" height="160" class="category-card text-center d-flex flex-column align-center justify-center" :class="{ 'scale-up': isHovering }">
                                <div class="category-icon-wrapper">
                                <v-icon :icon="category.icon" size="x-large" class="category-icon"></v-icon>
                                </div>
                                <div class="text-subtitle-1 font-weight-medium mt-2">{{ category.name }}</div>
                                <div class="text-caption text-medium-emphasis mt-1">{{ category.courses }} Courses</div>
                            </v-card>
                            </v-hover>
                        </v-col>
                        </v-row>
                    </v-sheet>
                    </v-col>
                </v-row>
                </v-container>

                <!-- Popular Courses -->
                <v-container class="section-container">
                <v-row no-gutters>
                    <v-col cols="12">
                    <v-row no-gutters class="mb-6 align-center">
                        <v-col cols="6">
                        <div class="section-heading">
                            <h2 class="text-h5 font-weight-bold">
                            <v-icon color="#50478A" class="mr-2">mdi-fire</v-icon>
                            Popular Courses
                            </h2>
                        </div>
                        </v-col>
                        <v-col cols="6" class="text-right">
                        <v-btn variant="outlined" rounded="xl" border="true" color="#50478A" class="view-all-btn" @click="$router.push('/akademi/course/popular')">
                            <span>See All</span>
                            <v-icon right>mdi-arrow-right</v-icon>
                        </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col v-for="(course, index) in popularCourses.slice(0, 3)" :key="course.id || index" cols="12" md="4" class="pa-3 d-flex">
                        <v-hover v-slot="{ isHovering, props }">
                            <v-card v-bind="props" elevation="3" rounded="lg" class="course-card flex-grow-1 d-flex flex-column" :class="{ 'on-hover': isHovering }">
                            <div class="category-badge">{{ course.category }}</div>
                            <v-img :src="course.image" height="220" cover class="course-image">
                                <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="#50478A"></v-progress-circular>
                                </v-row>
                                </template>
                            </v-img>
                            <v-card-title class="pb-1 pt-4">{{ course.course_name }}</v-card-title>
                            <v-card-subtitle class="d-flex align-center pt-1">
                                <v-chip size="small" color="amber" class="mr-2">
                                <v-icon size="small" start icon="mdi-star"></v-icon>
                                {{ course.rating }}
                                </v-chip>
                                <v-chip size="small" color="grey-lighten-3" class="mr-2">
                                <v-icon size="small" start icon="mdi-clock-outline"></v-icon>
                                {{ course.duration }}
                                </v-chip>
                            </v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-actions class="d-flex justify-space-between align-center pa-4 mt-auto">
                                <div class="price-tag font-weight-bold">{{ course.price }}</div>
                                <v-btn color="#50478A" variant="elevated" rounded="lg" :to="`/akademi/course/daftar/${course.id}`" class="enroll-btn">
                                <v-icon start>mdi-book-open-page-variant</v-icon>
                                Daftar
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-hover>
                        </v-col>
                    </v-row>
                    </v-col>
                </v-row>
                </v-container>


                <!-- CV Improvement Section -->
                <v-container class="section-container">
                    <v-row>
                        <v-col cols="12">
                            <v-card class="pa-6 rounded-xl elevation-6 promo-card gradient-bg-cv">
                                <v-row align="center">
                                    <v-col cols="12" md="4" class="text-center">
                                        <img src="/assets/cv-review.png" height="220" contain class="animate-float">
                                    </v-col>

                                    <v-col cols="12" md="8">
                                        <h2 class="text-h4 font-weight-bold mb-4">Tingkatkan Peluangmu dengan CV yang
                                            Menarik!</h2>
                                        <p class="text-body-1 mb-4">
                                            Apakah CV-mu sudah cukup kuat untuk menarik perhatian recruiter? Biarkan
                                            para ahli membantu!
                                        </p>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <div class="feature-item">
                                                    <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
                                                    <span>Analisis Profesional dari pakar industri</span>
                                                </div>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <div class="feature-item">
                                                    <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
                                                    <span>Optimasi ATS-Friendly</span>
                                                </div>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <div class="feature-item">
                                                    <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
                                                    <span>Meningkatkan Kesempatan</span>
                                                </div>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <div class="feature-item">
                                                    <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
                                                    <span>CV yang standout di mata recruiter</span>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-btn color="#50478A" size="large" class="mt-6" rounded="pill" elevation="3"
                                            prepend-icon="mdi-file-document-edit"
                                            @click="$router.push('/layanan/cv/daftar')">
                                            Daftar Sekarang
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <!-- Community Discussion Section -->
                <v-container class="section-container mt-10">
                    <div class="text-center mb-8">
                        <h2 class="text-h4 font-weight-bold mb-3">Diskusi dan Komunitas</h2>
                        <div class="title-underline mx-auto"></div>
                        <p class="text-medium-emphasis mt-4 community-subtitle">Bergabung dalam diskusi, ajukan
                            pertanyaan, dan berbagi ilmu dengan komunitas!</p>
                    </div>

                    <v-row no-gutters class="mb-6 align-center">
                        <v-col cols="6">
                            <div class="section-heading">
                                <h2 class="text-h5 font-weight-bold">
                                    <v-icon color="#50478A" class="mr-2">mdi-forum</v-icon>
                                    Popular Discussion
                                </h2>
                            </div>
                        </v-col>
                        <v-col cols="6" class="text-right">
                            <v-btn variant="outlined" rounded="xl" border="true" color="#50478A" class="view-all-btn"
                                @click="$router.push('/akademi/forum')">
                                <span>See All</span>
                                <v-icon right>mdi-arrow-right</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col v-for="(discussion, index) in discussions" :key="index" cols="12" md="4" class="d-flex">
                            <v-hover v-slot="{ isHovering, props }">
                                <v-card v-bind="props" class="discussion-card pa-5 flex-grow-1 d-flex flex-column"
                                    elevation="3" rounded="lg" :class="{ 'on-hover': isHovering }">
                                    <div class="discussion-author d-flex align-center mb-3">
                                        <v-avatar size="36" class="mr-3" color="#50478A">
                                            <span class="text-white">{{ discussion.author.charAt(0) }}</span>
                                        </v-avatar>
                                        <div>
                                            <p class="mb-0 font-weight-medium">{{ discussion.author }}</p>
                                            <p class="text-caption text-medium-emphasis mb-0">{{ discussion.date }}</p>
                                        </div>
                                    </div>

                                    <h3 class="text-h6 font-weight-bold flex-grow-1 mb-4">{{ discussion.title }}</h3>

                                    <v-divider class="mb-4"></v-divider>

                                    <v-row class="discussion-stats">
                                        <v-col cols="6">
                                            <div class="d-flex align-center">
                                                <v-icon size="small" class="mr-1"
                                                    color="#50478A">mdi-message-reply</v-icon>
                                                <p class="text-caption mb-0">{{ discussion.replies }} balasan</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" class="text-right">
                                            <div class="d-flex align-center justify-end">
                                                <v-icon size="small" class="mr-1"
                                                    color="#50478A">mdi-account-group</v-icon>
                                                <p class="text-caption mb-0">{{ discussion.members }} orang</p>
                                            </div>
                                        </v-col>
                                    </v-row>

                                    <v-btn color="#50478A" variant="flat" block class="mt-4" rounded="lg"
                                        :to="`/akademi/forum/${discussion.id}`">
                                        <v-icon start>mdi-eye</v-icon>
                                        Lihat Diskusi
                                    </v-btn>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-container>

                <!-- Job Opportunities Section -->
                <v-container class="section-container mt-8 mb-10">
                    <v-row>
                        <v-col cols="12">
                            <v-card class="pa-6 rounded-xl elevation-6 promo-card gradient-bg-job">
                                <v-row align="center">
                                    <v-col cols="12" md="7">
                                        <h2 class="text-h3 font-weight-bold mb-4">Kesempatan Baru, Karier Baru!</h2>
                                        <p class="text-body-1 mb-6">Jelajahi lowongan pekerjaan terbaru dan wujudkan
                                            karier impianmu hari ini!</p>
                                        <div class="d-flex">
                                            <v-btn color="#50478A" size="large" class="mr-4" rounded="pill"
                                                elevation="3" prepend-icon="mdi-magnify" @click="$router.push('/lowongan')">
                                                Lihat Lowongan
                                            </v-btn>
                                
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="5" class="text-center">
                                        <img src="/assets/job-opportunity.png" height="280" contain
                                            class="animate-float-reverse">
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
    background: linear-gradient(180deg, rgba(255, 206, 174, 0.8) 0%, rgba(255, 255, 255, 1) 45%);
    min-height: 100vh;
}

/* Hero Section */

.hero-section {
    padding: 3rem 0;
    position: relative;
    overflow: hidden;
}

.hero-title {
    line-height: 1.2;
    letter-spacing: -0.5px;
}

.hero-subtitle {
    max-width: 90%;
    line-height: 1.6;
}

.gradient-text {
    background: linear-gradient(90deg, #50478A 0%, #FF7043 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.hero-image {
    filter: drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.15));
}

/* Stats Bar */

.stats-bar {
    margin-top: -1rem;
}

.stats-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
    position: relative;
}

.stat-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.1);
}

/* Section Styling */

.section-container {
    margin-top: 2rem;
    margin-bottom: 2rem;
    position: relative;
}

.section-heading {
    position: relative;
    display: inline-block;
}

.view-all-btn {
    font-weight: 500;
    transition: all 0.3s ease;
}

.view-all-btn:hover {
    background-color: rgba(80, 71, 138, 0.1);
    transform: translateX(3px);
}

/* Categories */

.category-card {
    transition: all 0.3s ease;
    border: 2px solid transparent;
    background: white;
    overflow: hidden;
}

.category-card:hover {
    border-color: #50478A;
    box-shadow: 0 10px 15px rgba(80, 71, 138, 0.2);
}

.category-icon-wrapper {
    background: rgba(80, 71, 138, 0.1);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
}

.category-icon {
    color: #50478A;
}

.scale-up {
    transform: scale(1.05);
    transition: transform 0.3s ease;
    border-color: #50478A;
}

/* Courses */

.course-card {
    transition: all 0.3s ease;
    position: relative;
    border-radius: 16px;
    overflow: hidden;
}

.course-card.on-hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.course-image {
    transition: all 0.5s ease;
}

.on-hover .course-image {
    transform: scale(1.05);
}

.category-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    padding: 6px 12px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    backdrop-filter: blur(4px);
}

.price-tag {
    color: #55BE24;
    font-size: 1.2rem;
}

.enroll-btn {
    transition: all 0.3s ease;
}

.enroll-btn:hover {
    transform: translateY(-2px);
}

/* Discussion Cards */

.discussion-card {
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
}

.discussion-card.on-hover {
    border-left: 4px solid #50478A;
    transform: translateY(-5px);
}

.discussion-stats {
    margin-top: -10px;
}

.title-underline {
    height: 4px;
    width: 100px;
    background: linear-gradient(90deg, #50478A, #FF7043);
    margin-top: 10px;
    border-radius: 2px;
}

.community-subtitle {
    max-width: 600px;
    margin: 0 auto;
}

/* Promo Cards */

.promo-card {
    transition: all 0.3s ease;
    overflow: hidden;
}

.promo-card:hover {
    transform: translateY(-5px);
}

.feature-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    background: rgba(255, 255, 255, 0.6);
    padding: 8px 16px;
    border-radius: 8px;
    backdrop-filter: blur(4px);
}

.gradient-bg-cv {
    background: linear-gradient(256deg, rgba(255, 176, 123, 0.6) 0%, rgba(253, 230, 98, 0.3) 100%);
    background-size: 200% 200%;
    animation: gradientAnimation 15s ease infinite;
}

.gradient-bg-job {
    background: linear-gradient(-256deg, rgba(255, 176, 123, 0.6) 0%, rgba(253, 230, 98, 0.3) 100%);
    background-size: 200% 200%;
    animation: gradientAnimation 15s ease infinite;
}

/* Animations */

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-float-reverse {
    animation: float 6s ease-in-out infinite reverse;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0px);
    }
}

/* Scrollbar Styling */

.overflow-x-auto {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(80, 71, 138, 0.3) transparent;
    padding-bottom: 10px;
}

.overflow-x-auto::-webkit-scrollbar {
    height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: rgba(80, 71, 138, 0.3);
    border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background-color: rgba(80, 71, 138, 0.5);
}

/* Responsive Adjustments */

@media (max-width: 960px) {
    .hero-title {
        font-size: 2.5rem !important;
    }
    .stat-item:not(:last-child)::after {
        display: none;
    }
    .stat-item {
        margin-bottom: 1rem;
    }
}
</style>