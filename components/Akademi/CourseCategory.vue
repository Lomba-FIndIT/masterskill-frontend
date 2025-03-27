<script setup>
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
</script>

<template>
    <v-app>
        <v-main class="pt-10">
            <v-container fluid>
                <v-row no-gutters class="mb-6">
                <v-col cols="12">
                    <v-row no-gutters class="mb-4 align-center">
                    <v-col cols="6">
                        <h2 class="text-h5 font-weight-bold">All Categories</h2>
                    </v-col>
                    </v-row>
                    <v-row no-gutters>
                    <v-col 
                        v-for="category in topCategories" 
                        :key="category.name" 
                        cols="6" 
                        md="2"
                        class="pa-1"
                    >
                        <v-hover v-slot="{ isHovering, props }">
                        <v-card 
                            v-bind="props"
                            variant="outlined" 
                            class="text-center pa-4 d-flex flex-column align-center justify-center h-100"
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
                </v-col>
                </v-row>
            </v-container>
        </v-main>>
    </v-app>
</template>

<style scoped>
    .scale-up {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
</style>