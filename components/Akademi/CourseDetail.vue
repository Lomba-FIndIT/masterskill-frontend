<template>
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <!-- Course Sidebar -->
        <v-col cols="12" md="3" class="bg-deep-purple lighten-1 min-height-100">
          <div class="pa-4">
            <v-timeline align="start" density="compact" side="end">
              <v-timeline-item
                v-for="(video, index) in videos"
                :key="index"
                :dot-color="currentVideoIndex === index ? 'amber' : 'white'"
                size="small"
              >
                <NuxtLink
                  :to="`/akademi/course/detail/${courseId}?video=${video.id}`"
                  class="text-decoration-none"
                >
                  <v-card
                    class="mx-auto mb-6 rounded-lg"
                    max-width="300"
                    :color="currentVideoIndex === index ? 'amber lighten-4' : 'white'"
                    :class="currentVideoIndex === index ? 'elevation-3' : 'elevation-1'"
                  >
                    <div class="d-flex align-center pa-2">
                      <v-img
                        :src="video.thumbnail || `https://img.youtube.com/vi/${getYoutubeId(video.videoUrl)}/mqdefault.jpg`"
                        class="rounded-lg mr-2"
                        width="80"
                        height="60"
                        cover
                      ></v-img>
                      <div class="text-caption font-weight-bold">
                        <div>Video {{ index + 1 }}: {{ video.title }}</div>
                      </div>
                    </div>
                  </v-card>
                </NuxtLink>
              </v-timeline-item>
            </v-timeline>
          </div>
        </v-col>
  
        <!-- Video Content -->
        <v-col cols="12" md="9" class="pa-0">
          <v-card flat class="h-100">
            <v-card-item class="pb-0">
              <v-card-title class="text-h5 mb-2">
                Video {{ currentVideoIndex + 1 }}: {{ currentVideo.title }}
              </v-card-title>
            </v-card-item>
  
            <!-- Video Player -->
            <v-card-text class="pa-0">
              <v-responsive>
                <div class="video-container">
                  <iframe 
                    :src="`https://www.youtube.com/embed/${getYoutubeId(currentVideo.videoUrl)}?rel=0`"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </v-responsive>
  
              <!-- Content Description -->
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="8">
                    <h3 class="text-h6 mb-2">Deskripsi</h3>
                    <p>{{ currentVideo.description }}</p>
                    
                    <div class="mt-4">
                      <h3 class="text-h6 mb-2">Materi</h3>
                      <v-list>
                        <v-list-item v-for="(item, i) in currentVideo.materials" :key="i">
                          <template v-slot:prepend>
                            <v-icon color="deep-purple">mdi-checkbox-marked-circle</v-icon>
                          </template>
                          <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>
                  </v-col>
                  
                  <v-col cols="12" md="4">
                    <v-card class="pa-4" variant="outlined">
                      <h3 class="text-h6 mb-2">Navigasi</h3>
                      <div class="d-flex justify-space-between mb-4">
                        <NuxtLink
                          v-if="currentVideoIndex > 0"
                          :to="`/akademi/course/detail/${courseId}?video=${videos[currentVideoIndex - 1].id}`"
                          class="text-decoration-none"
                        >
                          <v-btn
                            prepend-icon="mdi-arrow-left"
                            variant="tonal"
                            color="deep-purple"
                          >
                            Sebelumnya
                          </v-btn>
                        </NuxtLink>
                        <div v-else>
                          <v-btn
                            prepend-icon="mdi-arrow-left"
                            variant="tonal"
                            color="deep-purple"
                            disabled
                          >
                            Sebelumnya
                          </v-btn>
                        </div>
                        
                        <NuxtLink
                          v-if="currentVideoIndex < videos.length - 1"
                          :to="`/akademi/course/detail/${courseId}?video=${videos[currentVideoIndex + 1].id}`"
                          class="text-decoration-none"
                        >
                          <v-btn
                            append-icon="mdi-arrow-right"
                            variant="tonal"
                            color="deep-purple"
                          >
                            Selanjutnya
                          </v-btn>
                        </NuxtLink>
                        <div v-else>
                          <v-btn
                            append-icon="mdi-arrow-right"
                            variant="tonal"
                            color="deep-purple"
                            disabled
                          >
                            Selanjutnya
                          </v-btn>
                        </div>
                      </div>
                      
                      <v-progress-linear
                        color="deep-purple"
                        :model-value="(currentVideoIndex + 1) / videos.length * 100"
                        height="10"
                        rounded
                        class="mb-2"
                      ></v-progress-linear>
                      <div class="text-caption text-center">
                        {{ currentVideoIndex + 1 }} dari {{ videos.length }} video
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const courseId = computed(() => route.params.id);
  
  // Reactive video index
  const currentVideoIndex = ref(0);
  
  // Sample video data
  const videos = ref([
    {
      id: 1,
      title: 'Mengenal Alat & Bahan Menjahit',
      videoUrl: 'https://youtu.be/65wgut-myug?si=mbjVMKTAVgGCPeji',
      description: 'Pada video ini, kita akan belajar tentang berbagai alat dan bahan dasar yang diperlukan untuk menjahit. Kita akan membahas jenis-jenis jarum, benang, kain, dan alat pengukur yang digunakan dalam menjahit.',
      materials: [
        'Pengenalan jarum jahit',
        'Jenis-jenis benang',
        'Pemilihan kain',
        'Alat pengukur dan pemotong'
      ]
    },
    {
      id: 2,
      title: 'Teknik Dasar Menjahit dengan Mesin',
      videoUrl: 'https://youtu.be/65wgut-myug?si=mbjVMKTAVgGCPeji',
      description: 'Video ini akan mengajarkan teknik dasar mengoperasikan mesin jahit dan cara membuat jahitan lurus, zigzag dan variasi lainnya.',
      materials: [
        'Pengenalan mesin jahit',
        'Teknik jahitan lurus',
        'Teknik jahitan zigzag',
        'Pemeliharaan mesin jahit'
      ]
    },
    {
      id: 3,
      title: 'Mengenal Pola Sederhana',
      videoUrl: 'https://youtu.be/65wgut-myug?si=mbjVMKTAVgGCPeji',
      description: 'Dalam video ini, kita akan belajar cara membuat dan memahami pola dasar untuk menjahit pakaian sederhana.',
      materials: [
        'Membaca pola',
        'Membuat pola dasar',
        'Modifikasi pola sederhana',
        'Praktik membuat pola'
      ]
    }
  ]);
  
  // Extract current video ID and update index on load
  onMounted(() => {
    updateCurrentVideoIndex();
  });
  
  // ✅ Watch route query and update video index
  watch(() => route.query.video, () => {
    updateCurrentVideoIndex();
  });
  
  function updateCurrentVideoIndex() {
    const id = route.query.video ? parseInt(route.query.video) : 1;
    const index = videos.value.findIndex(video => video.id === id);
    if (index !== -1) {
      currentVideoIndex.value = index;
    }
  }
  
  const currentVideo = computed(() => videos.value[currentVideoIndex.value]);
  
  // Helper to get YouTube ID from URL
  function getYoutubeId(url) {
    if (!url) return '';
    if (url.includes('youtu.be')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return id || '';
    }
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
  }
  </script>
  
  <style scoped>
  .min-height-100 {
    min-height: 100vh;
  }
  
  .video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
  }
  
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  </style>
  