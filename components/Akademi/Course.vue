<script setup>
    import axios from 'axios';
    import { ref, onMounted } from 'vue';

    const topCategories = ref([]);
    const popularCourses = ref([]);
    const isLoading = ref(true);
    const token = localStorage.getItem('token');

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
        'Development': 'mdi-code-tags',
        'Finance': 'mdi-cash-multiple',
        'Art': 'mdi-palette-swatch',
        'Education': 'mdi-school',
        'default': 'mdi-book-open-page-variant'
    };

    // Daftar warna untuk kategori
    const categoryColors = [
        '#4F46E5', // Indigo
        '#EC4899', // Pink
        '#10B981', // Emerald
        '#F59E0B', // Amber
        '#3B82F6', // Blue
        '#8B5CF6', // Violet
        '#EF4444', // Red
        '#06B6D4', // Cyan
        '#14B8A6', // Teal
        '#F97316', // Orange 
        '#6366F1', // Indigo Alt
        '#D946EF', // Fuchsia
        '#84CC16', // Lime
        '#8B5CF6'  // Violet Alt
    ];

    onMounted(async () => {
        try {
            // Parallel API requests for better performance
            const [coursesResponse, categoriesResponse] = await Promise.all([
                axios.get('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/courses', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }),
                axios.get('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
            ]);

            // Process courses data
            popularCourses.value = coursesResponse.data.map(course => ({
                ...course,
                price: formatPrice(course.price)
            }));
            
            // Process categories data
            topCategories.value = categoriesResponse.data.map((category, index) => ({
                ...category,
                color: categoryColors[index % categoryColors.length],
                icon: categoryIcons[category.category_name] || categoryIcons.default
            }));
            
            isLoading.value = false;
        } catch (error) {
            console.error('Failed to fetch data:', error);
            isLoading.value = false;
        }
    });

    // Helper function to format price
    function formatPrice(price) {
        if (!price) return 'Gratis';
        // Assuming price is a number or string representing currency
        return typeof price === 'number' 
            ? `Rp ${price.toLocaleString('id-ID')}`
            : price;
    }

    // Function to navigate to course details
    function navigateToCourse(courseId) {
        if (courseId) {
            window.location.href = `/akademi/course/daftar/${courseId}`;
        }
    }
</script>

<template>
    <v-app>
        <v-main class="main-background pt-8">
            <!-- Hero Section -->
            <v-container class="mb-10">
                <v-row justify="center">
                    <v-col cols="12">
                        <v-card elevation="0" color="transparent" class="hero-section">
                            <v-card-text>
                                <h1 class="text-h3 font-weight-bold mb-4">Temukan Kursus <span class="gradient-text">Terbaik</span> Untuk Kamu</h1>
                                <p class="text-subtitle-1 mb-8">Pilih dari berbagai kategori kursus dan tingkatkan keahlianmu bersama para ahli</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <!-- Loading Indicator -->
            <v-container v-if="isLoading">
                <v-row justify="center" align="center" style="height: 300px">
                    <v-col cols="12" class="text-center">
                        <v-progress-circular 
                            indeterminate 
                            color="#50478A" 
                            size="70"
                            width="7"
                        ></v-progress-circular>
                        <div class="mt-4 text-body-1">Memuat konten...</div>
                    </v-col>
                </v-row>
            </v-container>

            <v-container v-else>
                <!-- Top Categories -->
                <v-card class="mb-10 rounded-xl pa-4" elevation="1">
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="12" sm="6">
                            <div class="d-flex align-center">
                                <v-icon icon="mdi-view-grid" color="#50478A" size="x-large" class="me-2"></v-icon>
                                <h2 class="text-h5 font-weight-bold">Top Category</h2>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="6" class="text-sm-right mt-2 mt-sm-0">
                            <v-btn 
                                variant="outlined" 
                                rounded="xl" 
                                color="#50478A" 
                                prepend-icon="mdi-arrow-right"
                                @click="$router.push('/akademi/course/category')"
                            >
                                Lihat Semua
                            </v-btn>
                        </v-col>
                    </v-row>
                    
                    <!-- Category Cards -->
                    <v-sheet class="d-flex overflow-x-auto custom-scrollbar pa-2" color="transparent">
                        <v-row no-gutters class="flex-nowrap">
                            <v-col 
                                v-for="(category, index) in topCategories" 
                                :key="index" 
                                cols="auto"
                                class="pa-2"
                            >
                                <v-hover v-slot="{ isHovering, props }">
                                    <v-card 
                                        v-bind="props"
                                        :color="isHovering ? category.color : 'white'"
                                        min-width="150"
                                        height="120"
                                        class="text-center category-card d-flex flex-column align-center justify-center"
                                        :class="{ 'on-hover': isHovering }"
                                        elevation="2"
                                        @click="$router.push(`/akademi/course/category/${category.id}`)"
                                    >
                                        <v-avatar
                                            :color="isHovering ? 'white' : category.color"
                                            size="48"
                                            class="mb-3 transition-swing"
                                        >
                                            <v-icon 
                                                :icon="category.icon" 
                                                size="24" 
                                                :color="isHovering ? category.color : 'white'"
                                            ></v-icon>
                                        </v-avatar>
                                        <div 
                                            class="text-subtitle-2 font-weight-medium px-2"
                                            :class="isHovering ? 'text-white' : ''"
                                        >
                                            {{ category.category_name }}
                                        </div>
                                    </v-card>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-card>
        
                <!-- Popular Courses -->
                <v-card class="mb-8 rounded-xl pa-4" elevation="1">
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="12" sm="6">
                            <div class="d-flex align-center">
                                <v-icon icon="mdi-fire" color="#50478A" size="x-large" class="me-2"></v-icon>
                                <h2 class="text-h5 font-weight-bold">Popular Courses</h2>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="6" class="text-sm-right mt-2 mt-sm-0">
                            <v-btn 
                                variant="outlined" 
                                rounded="xl" 
                                color="#50478A" 
                                prepend-icon="mdi-arrow-right"
                                @click="$router.push('/akademi/course/popular')"
                            >
                                Lihat Semua
                            </v-btn>
                        </v-col>
                    </v-row>
                    
                    <!-- Course Cards -->
                    <v-row>
                        <v-col 
                            v-for="(course, index) in popularCourses.slice(0,3)" 
                            :key="index" 
                            cols="12" sm="6" md="4"
                            class="pa-2"
                        >
                            <v-hover v-slot="{ isHovering, props }">
                                <v-card 
                                    v-bind="props"
                                    elevation="3" 
                                    rounded="lg"
                                    class="course-card h-100 d-flex flex-column"
                                    :class="{ 'course-card-hover': isHovering }"
                                    @click="navigateToCourse(course.id)"
                                >
                                    <div class="category-badge">{{ course.category }}</div>
                                    <v-img 
                                        :src="course.img_url || 'https://via.placeholder.com/600x300?text=Course+Image'" 
                                        height="180" 
                                        cover
                                        class="course-image"
                                    >
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height" align="center" justify="center">
                                                <v-progress-circular indeterminate color="grey-lighten-4"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                    
                                    <v-card-title class="pb-0 pt-4 text-truncate">
                                        {{ course.course_name }}
                                    </v-card-title>
                                    
                                    <v-card-subtitle class="d-flex align-center pt-2">
                                        <div class="d-flex align-center me-3">
                                            <v-icon size="small" icon="mdi-star" color="amber" class="me-1"></v-icon>
                                            <span class="font-weight-medium">{{ course.ratings }}</span>
                                        </div>
                                        <div class="d-flex align-center">
                                            <v-icon size="small" icon="mdi-clock-outline" class="me-1"></v-icon>
                                            <span>{{ course.total_duration }}</span>
                                        </div>
                                    </v-card-subtitle>
                
                                    <v-spacer></v-spacer>
                
                                    <v-card-actions class="d-flex justify-space-between align-center px-4 pb-4">
                                        <div class="font-weight-bold price-text">{{ course.price }}</div>
                                        <v-btn 
                                            color="#50478A" 
                                            variant="elevated" 
                                            rounded="lg"
                                            :to="`/akademi/course/daftar/${course.id}`"
                                            class="px-6"
                                        >
                                            Daftar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>

                    <!-- Empty State if no courses -->
                    <v-row v-if="popularCourses.length === 0">
                        <v-col cols="12" class="text-center py-12">
                            <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-book-off-outline</v-icon>
                            <div class="text-h6 text-grey-darken-1">Belum ada kursus tersedia</div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
    .main-background {
        background-color: #f8f9fa;
        min-height: 100vh;
    }
    
    .hero-section {
        text-align: center;
        padding: 2rem 0;
        background: linear-gradient(135deg, #f9fafb 0%, #e9ecef 100%);
        border-radius: 16px;
        position: relative;
        overflow: hidden;
    }
    
    .hero-section::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, rgba(79, 70, 229, 0) 70%);
        z-index: 0;
    }
    
    .gradient-text {
        background: linear-gradient(45deg, #50478A, #8B5CF6);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
    }

    .category-card {
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        border: 1px solid #e0e0e0;
    }

    .course-card {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .course-card-hover {
        transform: translateY(-8px);
    }

    .price-text {
        color: #55BE24;
        font-size: 1.1rem;
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
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 1;
        backdrop-filter: blur(4px);
    }

    .course-image {
        position: relative;
    }

    .course-image::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%);
    }

    .on-hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
    }

    .transition-swing {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }

    .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(80, 71, 138, 0.3) transparent;
    }

    .custom-scrollbar::-webkit-scrollbar {
        height: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(80, 71, 138, 0.3);
        border-radius: 20px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(80, 71, 138, 0.5);
    }
</style>