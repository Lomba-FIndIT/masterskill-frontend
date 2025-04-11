<template>
    <v-container>
      <!-- Hero Banner -->
      <v-row>
        <v-col cols="12" class="px-0">
          <v-img
            src="/images/sewing-banner.jpg"
            height="200"
            cover
            class="position-relative"
          >
            <div class="banner-overlay"></div>
            <v-container class="fill-height">
              <h1 class="text-white font-weight-bold">Menjahit untuk Pemula</h1>
            </v-container>
          </v-img>
        </v-col>
      </v-row>
  
      <!-- Course Content -->
      <v-row class="mt-4">
        <!-- Left Column - Ratings and Reviews -->
        <v-col cols="12" md="7">
          <v-card elevation="1" class="pa-4">
            <div class="d-flex align-center mb-3">
              <h2 class="text-h6">4 out of 5</h2>
              <div class="ml-2">
                <v-rating
                  v-model="courseRating"
                  color="amber"
                  readonly
                  size="small"
                  density="compact"
                ></v-rating>
              </div>
            </div>
  
            <h3 class="text-subtitle-1 mb-2">Top Rating</h3>
  
            <!-- Rating Bars -->
            <div v-for="rating in ratings" :key="rating.stars" class="mb-2">
              <div class="d-flex align-center">
                <span class="text-body-2 mr-2">{{ rating.stars }} Stars</span>
                <v-progress-linear
                  v-model="rating.value"
                  height="8"
                  rounded
                  color="indigo"
                ></v-progress-linear>
              </div>
            </div>
  
            <!-- Reviews -->
            <h3 class="text-subtitle-1 mt-6 mb-3">Reviews</h3>
            
            <v-card class="mb-4 pa-3" variant="outlined">
              <div class="d-flex">
                <v-avatar color="black" class="mr-3">
                  <span class="text-white">L</span>
                </v-avatar>
                <div>
                  <div class="d-flex align-center">
                    <span class="font-weight-medium">Lina</span>
                    <div class="ml-2">
                      <v-rating
                        v-model="reviews[0].rating"
                        color="amber"
                        readonly
                        size="x-small"
                        density="compact"
                      ></v-rating>
                    </div>
                    <span class="ml-auto text-caption text-grey">
                      <v-icon size="small">mdi-clock-outline</v-icon>
                      3 Month
                    </span>
                  </div>
                  <p class="text-body-2 mt-1">
                    Kursus ini sangat membantu! Penjelasan mudah dipahami, cocok buat yang belum pernah pegang mesin jahit.
                  </p>
                </div>
              </div>
            </v-card>
  
            <v-card class="mb-4 pa-3" variant="outlined">
              <div class="d-flex">
                <v-avatar color="black" class="mr-3">
                  <span class="text-white">L</span>
                </v-avatar>
                <div>
                  <div class="d-flex align-center">
                    <span class="font-weight-medium">Loni</span>
                    <div class="ml-2">
                      <v-rating
                        v-model="reviews[1].rating"
                        color="amber"
                        readonly
                        size="x-small"
                        density="compact"
                      ></v-rating>
                    </div>
                    <span class="ml-auto text-caption text-grey">
                      <v-icon size="small">mdi-clock-outline</v-icon>
                      3 Month
                    </span>
                  </div>
                  <p class="text-body-2 mt-1">
                    Instrukturnya sangat jelas dalam menjelaskan teknik-teknik menjahit. Saya yang belum pernah menjahit sebelumnya sekarang sudah bisa bikin baju sederhana!
                  </p>
                </div>
              </div>
            </v-card>
          </v-card>
        </v-col>
  
        <!-- Right Column - Price and Features -->
        <v-col cols="12" md="5">
          <v-card elevation="1" class="pa-4">
            <h2 class="text-h6 mb-2">Ringkasan Biaya</h2>
            <p class="text-caption text-grey">Menjahit • Menjahit untuk Pemula</p>
            
            <h3 class="text-h4 font-weight-bold my-3">Rp. 0</h3>
            
            <v-btn
              block
              color="indigo"
              class="text-white mb-6"
              height="48"
            >
              Bayar Sekarang
            </v-btn>
            
            <v-divider class="mb-6"></v-divider>
            
            <h3 class="text-subtitle-1 mb-4">Course ini Termasuk</h3>
            
            <div class="d-flex align-center mb-2">
              <v-icon color="amber" class="mr-2">mdi-laptop</v-icon>
              <span>Akses di semua Perangkat</span>
            </div>
            
            <div class="d-flex align-center mb-2">
              <v-icon color="amber" class="mr-2">mdi-certificate</v-icon>
              <span>Sertifikat</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  const courseRating = 4;
  
  const ratings = [
    { stars: 5, value: 70 },
    { stars: 4, value: 20 },
    { stars: 3, value: 5 },
    { stars: 2, value: 3 },
    { stars: 1, value: 2 },
  ];
  
  const reviews = [
    {
      name: "Lina",
      rating: 4,
      time: "3 Month",
      text: "Kursus ini sangat membantu! Penjelasan mudah dipahami, cocok buat yang belum pernah pegang mesin jahit."
    },
    {
      name: "Loni",
      rating: 4,
      time: "3 Month", 
      text: "Instrukturnya sangat jelas dalam menjelaskan teknik-teknik menjahit. Saya yang belum pernah menjahit sebelumnya sekarang sudah bisa bikin baju sederhana!"
    }
  ];
  </script>
  
  <style scoped>
  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
  }
  </style>