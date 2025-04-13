<script setup>
import { ref } from 'vue'

// Data testimonial
const testimonials = ref([
  {
    name: "Andi Wijaya",
    position: "Frontend Developer",
    company: "Tech Startup",
    text: "CV Review membantu saya mendapatkan panggilan interview dari 3 perusahaan impian saya!",
    avatar: "/api/placeholder/40/40"
  },
  {
    name: "Dina Pratiwi",
    position: "Product Manager",
    company: "E-commerce",
    text: "Rekomendasi yang diberikan sangat detail dan sesuai dengan industri yang saya tuju.",
    avatar: "/api/placeholder/40/40"
  },
  {
    name: "Rizki Ananda",
    position: "Data Analyst",
    company: "Fintech",
    text: "Saya mendapatkan pekerjaan dalam 2 minggu setelah memperbaiki CV dengan saran dari reviewer.",
    avatar: "/api/placeholder/40/40"
  }
])

// Counter animasi
const counters = ref([
  { value: 0, target: 95, suffix: '%', text: 'Tingkat Kepuasan' },
  { value: 0, target: 3500, suffix: '+', text: 'CV Direview' },
  { value: 0, target: 80, suffix: '%', text: 'Berhasil Dipanggil Interview' }
])

// Simple animation for counters when component is mounted
function startCounters() {
  counters.value.forEach((counter, index) => {
    const interval = setInterval(() => {
      if (counter.value < counter.target) {
        counter.value += Math.ceil(counter.target / 50)
        if (counter.value > counter.target) {
          counter.value = counter.target
          clearInterval(interval)
        }
      } else {
        clearInterval(interval)
      }
    }, 30)
  })
}

function scrollToForm() {
  // Scroll to form or navigate to form page
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

onMounted(() => {
  startCounters()
})
</script>

<template>
  <v-app>
    <v-main class="main-gradient-background">
      <!-- Hero Section -->
      <v-container fluid class="py-12">
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
              <v-card class="pa-6 rounded-xl hero-card" elevation="10">
                <v-row align="center">
                  <v-col cols="12" md="5" class="d-flex justify-center">
                    <img
                      src="/assets/cv-review.png"
                      alt="CV Review Service"
                      class="hero-image"
                      max-height="320"
                      contain
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="deep-purple-lighten-2"></v-progress-circular>
                        </v-row>
                      </template>
                    </img>
                  </v-col>

                  <v-col cols="12" md="7">
                    <h1 class="text-h3 font-weight-bold text-gradient">
                      Tingkatkan Peluangmu dengan CV yang Menarik!
                    </h1>
                    
                    <p class="text-subtitle-1 mt-4 text-medium-emphasis">
                      Apakah CV-mu sudah cukup kuat untuk menarik perhatian recruiter? 
                      Biarkan para ahli kami membantu karir impianmu!
                    </p>
                    
                    <v-card class="mt-6 pa-4 feature-card" variant="flat" rounded="lg">
                      <v-row>
                        <v-col cols="12" md="4" class="d-flex align-center">
                          <v-icon color="deep-purple" class="mr-2" size="24">mdi-check-circle</v-icon>
                          <span class="text-body-1">Analisis Profesional</span>
                        </v-col>
                        
                        <v-col cols="12" md="4" class="d-flex align-center">
                          <v-icon color="deep-purple" class="mr-2" size="24">mdi-check-circle</v-icon>
                          <span class="text-body-1">Optimasi ATS-Friendly</span>
                        </v-col>
                        
                        <v-col cols="12" md="4" class="d-flex align-center">
                          <v-icon color="deep-purple" class="mr-2" size="24">mdi-check-circle</v-icon>
                          <span class="text-body-1">Meningkatkan Peluang</span>
                        </v-col>
                      </v-row>
                    </v-card>
                    
                    <div class="d-flex gap-4 mt-6">
                      <v-btn 
                        size="large" 
                        class="primary-gradient-btn" 
                        rounded="lg"
                        min-width="180"
                        @click="$router.push('/layanan/cv/daftar')"
                      >
                        <span class="text-white">Daftar Sekarang</span>
                        <v-icon end color="white" class="ml-2">mdi-arrow-right</v-icon>
                      </v-btn>
                      
                      <v-btn 
                        size="large" 
                        color="deep-purple" 
                        variant="outlined" 
                        rounded="lg"
                        @click="scrollToForm"
                      >
                        Pelajari Lebih Lanjut
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      
      <!-- Stats Counter Section -->
      <v-container fluid class="py-6">
        <v-container>
          <v-row class="text-center" justify="center">
            <v-col cols="12" md="10">
              <v-card class="pa-6 rounded-xl stats-card" elevation="3">
                <v-row>
                  <v-col v-for="(counter, i) in counters" :key="i" cols="12" md="4" class="text-center">
                    <h2 class="text-h3 font-weight-bold text-deep-purple">
                      {{ counter.value }}{{ counter.suffix }}
                    </h2>
                    <p class="text-subtitle-1">{{ counter.text }}</p>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      
      <!-- How It Works Section -->
      <v-container fluid class="py-8">
        <v-container>
          <h2 class="text-h4 font-weight-bold text-center mb-8">Bagaimana Proses Review CV</h2>
          
          <v-row justify="center">
            <v-col cols="12" md="4" class="text-center">
              <v-card height="100%" class="pa-6 rounded-xl process-card" elevation="2">
                <v-avatar color="deep-purple-lighten-4" size="64" class="mb-4">
                  <v-icon size="32" color="deep-purple">mdi-cloud-upload</v-icon>
                </v-avatar>
                <h3 class="text-h5 font-weight-bold mb-2">1. Upload CV</h3>
                <p class="text-body-1">Upload CV Anda dalam format PDF dan berikan informasi posisi yang dilamar</p>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="4" class="text-center">
              <v-card height="100%" class="pa-6 rounded-xl process-card" elevation="2">
                <v-avatar color="deep-purple-lighten-4" size="64" class="mb-4">
                  <v-icon size="32" color="deep-purple">mdi-account-search</v-icon>
                </v-avatar>
                <h3 class="text-h5 font-weight-bold mb-2">2. Review Profesional</h3>
                <p class="text-body-1">Tim ahli kami akan menganalisis CV Anda secara menyeluruh</p>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="4" class="text-center">
              <v-card height="100%" class="pa-6 rounded-xl process-card" elevation="2">
                <v-avatar color="deep-purple-lighten-4" size="64" class="mb-4">
                  <v-icon size="32" color="deep-purple">mdi-file-document-edit</v-icon>
                </v-avatar>
                <h3 class="text-h5 font-weight-bold mb-2">3. Terima Feedback</h3>
                <p class="text-body-1">Dapatkan saran perbaikan spesifik untuk meningkatkan kualitas CV Anda</p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      
      <!-- Testimonials -->
      <v-container fluid class="py-8 testimonial-section">
        <v-container>
          <h2 class="text-h4 font-weight-bold text-center mb-8">Apa Kata Mereka</h2>
          
          <v-row justify="center">
            <v-col cols="12">
              <v-slide-group show-arrows>
                <v-slide-group-item v-for="(item, i) in testimonials" :key="i">
                  <v-card width="350" class="ma-4 pa-6 rounded-xl testimonial-card" elevation="3">
                    <div class="d-flex align-center mb-4">
                      <v-avatar size="48" class="mr-3">
                        <v-img :src="item.avatar"></v-img>
                      </v-avatar>
                      <div>
                        <h3 class="text-subtitle-1 font-weight-bold mb-0">{{ item.name }}</h3>
                        <p class="text-caption text-medium-emphasis mb-0">
                          {{ item.position }} di {{ item.company }}
                        </p>
                      </div>
                    </div>
                    
                    <v-card-text class="pa-0">
                      <v-icon color="amber" size="20" class="mr-1">mdi-star</v-icon>
                      <v-icon color="amber" size="20" class="mr-1">mdi-star</v-icon>
                      <v-icon color="amber" size="20" class="mr-1">mdi-star</v-icon>
                      <v-icon color="amber" size="20" class="mr-1">mdi-star</v-icon>
                      <v-icon color="amber" size="20" class="mr-1">mdi-star</v-icon>
                      
                      <p class="text-body-1 mt-3">
                        "{{ item.text }}"
                      </p>
                    </v-card-text>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      
      <!-- CTA Section -->
      <v-container fluid class="py-12">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10">
              <v-card class="pa-8 rounded-xl cta-card text-center" elevation="8">
                <h2 class="text-h4 font-weight-bold text-white mb-4">Siap Tingkatkan CV Anda?</h2>
                <p class="text-subtitle-1 text-white mb-6">
                  Jangan biarkan CV yang kurang menarik menghalangi karir impian Anda. Daftar sekarang dan dapatkan review profesional!
                </p>
                <v-btn 
                  size="x-large" 
                  class="white-btn" 
                  rounded="lg"
                  min-width="220"
                  @click="$router.push('/layanan/cv/daftar')"
                >
                  <span class="text-gradient-btn">Daftar Sekarang</span>
                  <v-icon end class="ml-2 text-gradient-icon">mdi-rocket-launch</v-icon>
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
/* Background Gradients */
.main-gradient-background {
  background: linear-gradient(135deg, #f5f5ff 0%, #ffffff 50%, #f5f5ff 100%);
  min-height: 100vh;
}

.hero-card {
  background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,255,1) 100%);
  border: 1px solid rgba(228, 226, 255, 0.6);
  overflow: hidden;
  position: relative;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 176, 123, 0.2), rgba(106, 38, 213, 0.2));
  z-index: 0;
}

.hero-card::after {
  content: '';
  position: absolute;
  bottom: -70px;
  left: -70px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(106, 38, 213, 0.1), rgba(255, 176, 123, 0.1));
  z-index: 0;
}

.feature-card {
  background-color: #f8f7ff;
  border: 1px solid rgba(106, 38, 213, 0.1);
}

.process-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(228, 226, 255, 0.6);
}

.process-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(106, 38, 213, 0.1) !important;
}

.testimonial-card {
  background: white;
  border: 1px solid rgba(228, 226, 255, 0.6);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(106, 38, 213, 0.1) !important;
}

.testimonial-section {
  background-color: #f8f7ff;
}

.stats-card {
  background: white;
  border: 1px solid rgba(228, 226, 255, 0.6);
}

.cta-card {
  background: linear-gradient(135deg, #6A26D5, #FFB07B);
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 0;
}

.cta-card::after {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -100px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 0;
}

/* Buttons */
.primary-gradient-btn {
  background: linear-gradient(135deg, #FFB07B, #6A26D5);
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(106, 38, 213, 0.3);
}

.primary-gradient-btn:hover {
  box-shadow: 0 6px 20px rgba(106, 38, 213, 0.4);
  transform: translateY(-2px);
}

.white-btn {
  background: white;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.white-btn:hover {
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.text-gradient {
  background: linear-gradient(135deg, #6A26D5, #FFB07B);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-gradient-btn {
  background: linear-gradient(135deg, #6A26D5, #FFB07B);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.text-gradient-icon {
  color: #6A26D5;
}

.text-deep-purple {
  color: #6A26D5;
}

.hero-image {
  position: relative;
  z-index: 1;
}
</style>