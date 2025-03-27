<script setup>
    const searchQuery = ref('')


    const discussions = ref([
  {
    id: 1,
    title: 'Review Alat & Bahan Jahit',
    author: 'Halima',
    date: 'Senin, 10 Maret 2025',
    comments: 1,
    views: 3
  },
  {
    id: 2,
    title: 'Makanan Untuk Berbuka Puasa',
    author: 'Halima',
    date: 'Senin, 10 Maret 2025',
    comments: 1,
    views: 3
  },
  {
    id: 3,
    title: 'Berkebun menanam tanaman hias',
    author: 'Halima',
    date: 'Senin, 10 Maret 2025',
    comments: 1,
    views: 3
  },
  {
    id: 4,
    title: 'Makanan Untuk Berbuka Puasa',
    author: 'Halima',
    date: 'Senin, 10 Maret 2025',
    comments: 1,
    views: 3
  },
  {
    id: 5,
    title: 'Makanan Untuk Berbuka Puasa',
    author: 'Halima',
    date: 'Senin, 10 Maret 2025',
    comments: 1,
    views: 3
  },
  {
    id: 6,
    title: 'Makanan Untuk Berbuka Puasa',
    author: 'Halima',
    date: 'Senin, 10 Maret 2025',
    comments: 1,
    views: 3
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
</script>

<template>
    <v-app>
        <v-main class="pt-6">
            <v-container fluid>
                <v-container class="mt-6">
                    <h2 class="text-h4 font-weight-bold text-center">Diskusi dan Komunitas</h2>
                    <p class="text-center text-medium-emphasis mb-4">Bergabung dalam diskusi, ajukan pertanyaan, dan berbagi ilmu dengan komunitas!</p>
                    <v-row no-gutters class="mb-4 mt-7 align-center">
                                <v-col cols="6">
                                    <h2 class="text-h5 font-weight-bold">Popular Courses</h2>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-text-field
                                        v-model="searchQuery"
                                        label="Cari"
                                        prepend-inner-icon="mdi-magnify"
                                        variant="outlined"
                                        rounded="xl"
                                        clearable
                                        class="mb-2 custom-text-field"
                            
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                    <v-row>
                    <v-col 
                        v-for="discussion in filteredDiscussions" 
                        :key="discussion.id" 
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
                                <p class="text-caption">💬 {{ discussion.comments }} balasan</p>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                <p class="text-caption">👥 {{ discussion.views }} orang</p>
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
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
    .custom-text-field {
  max-height: 36px !important; /* Atur tinggi maksimum */
  font-size: 12px !important; /* Kurangi ukuran font */
}
</style>