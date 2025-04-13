<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const form = ref({
  cv: null
})

const submitted = ref(false)
const fileSelected = ref(false)
const loading = ref(false)

const handleFileUpload = (event) => {
  form.value.cv = event.target.files[0]
  fileSelected.value = true
}

const submitForm = () => {
  loading.value = true
  
  // Simulasi proses pengiriman dengan delay
  setTimeout(() => {
    console.log('Submitting CV for Review')
    console.log('Username:', user.value?.name)
    console.log('CV File:', form.value.cv)
    
    // Reset file input setelah submit
    form.value.cv = null
    fileSelected.value = false
    loading.value = false
    
    // Menampilkan pesan sukses
    submitted.value = true
  }, 1500)
}

const rules = {
  required: value => !!value || 'File CV wajib diupload'
}
</script>

<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card
          class="cv-review-card"
          elevation="5"
          rounded="lg"
        >
          <v-card-item>
            <v-card-title class="text-center text-h4 font-weight-bold mb-2">
              Upload CV Review
            </v-card-title>
            
            <v-divider class="my-4"></v-divider>
            
            <v-card-text>
              <div v-if="!submitted">
                <div class="text-center mb-6">
                  <v-avatar color="deep-purple lighten-1" size="68" class="mb-4">
                    <span class="text-h5 white--text">{{ user?.name?.charAt(0) || 'U' }}</span>
                  </v-avatar>
                  <h3 class="text-h5">Halo, <span class="font-weight-bold">{{ user?.name }}</span>!</h3>
                  <p class="text-body-1 text-medium-emphasis mt-2">
                    Upload CV Anda untuk mendapatkan feedback profesional dari tim kami
                  </p>
                </div>

                <v-form @submit.prevent="submitForm">
                  <v-sheet
                    color="grey-lighten-4"
                    class="pa-4 rounded-lg border-dashed"
                    :class="{ 'border-success': fileSelected }"
                    elevation="0"
                  >
                    <div v-if="!fileSelected" class="text-center py-6">
                      <v-icon
                        color="deep-purple-lighten-1"
                        size="56"
                        class="mb-3"
                      >
                        mdi-cloud-upload-outline
                      </v-icon>
                      
                      <h3 class="text-h6 mb-2">Upload CV Anda</h3>
                      <p class="text-medium-emphasis mb-4">Format PDF, maksimum 5MB</p>
                      
                      <v-file-input
                        v-model="form.cv"
                        accept=".pdf"
                        :rules="[rules.required]"
                        @change="handleFileUpload"
                        label="Pilih file"
                        prepend-icon=""
                        variant="outlined"
                        density="comfortable"
                        hide-details
                        class="max-w-sm mx-auto"
                      ></v-file-input>
                    </div>
                    
                    <div v-else class="text-center py-4">
                      <v-icon color="success" size="36" class="mb-2">mdi-check-circle</v-icon>
                      <h3 class="text-success text-h6 mb-1">File berhasil dipilih!</h3>
                      <p class="text-body-2">{{ form.cv.name }}</p>
                      <v-btn
                        variant="text"
                        color="error"
                        size="small"
                        class="mt-2"
                        @click="fileSelected = false; form.cv = null"
                      >
                        <v-icon start>mdi-refresh</v-icon>
                        Ganti file
                      </v-btn>
                    </div>
                  </v-sheet>

                  <div class="d-flex justify-center mt-8">
                    <v-btn
                      type="submit"
                      :loading="loading"
                      size="large"
                      min-width="220"
                      rounded="lg"
                      class="cv-submit-btn"
                      :disabled="!fileSelected"
                    >
                      <span class="text-white">Kirim CV untuk Review</span>
                      <v-icon end class="ml-2 text-white">mdi-send</v-icon>
                    </v-btn>
                  </div>
                </v-form>
              </div>
              
              <!-- Pesan sukses -->
              <div v-else class="text-center py-8">
                <v-avatar
                  color="success"
                  size="80"
                  class="mb-6"
                >
                  <v-icon size="40" color="white">mdi-check</v-icon>
                </v-avatar>
                
                <h3 class="text-h5 font-weight-bold mb-3">Terima Kasih!</h3>
                
                <v-card
                  color="success-lighten-5"
                  class="pa-4 mb-6 mx-auto"
                  max-width="450"
                  variant="flat"
                >
                  <p class="text-body-1 mb-2">CV Anda telah berhasil dikirim untuk direview oleh tim kami</p>
                  <p class="text-body-2 text-medium-emphasis">Kami akan segera menghubungi Anda dengan hasil review melalui email yang terdaftar</p>
                </v-card>
                
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="submitted = false"
                  prepend-icon="mdi-upload"
                >
                  Upload CV Lain
                </v-btn>
              </div>
            </v-card-text>
          </v-card-item>
          
          <v-card-text v-if="!submitted" class="text-center text-caption text-medium-emphasis">
            Dengan mengirimkan CV Anda, Anda menyetujui <a href="#" class="text-decoration-none">Syarat dan Ketentuan</a> kami
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.cv-review-card {
  background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,255,1) 100%);
  border: 1px solid rgba(228, 226, 255, 0.6);
  overflow: hidden;
  position: relative;
}

.cv-review-card::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 176, 123, 0.2), rgba(106, 38, 213, 0.2));
}

.cv-review-card::after {
  content: '';
  position: absolute;
  bottom: -70px;
  left: -70px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(106, 38, 213, 0.1), rgba(255, 176, 123, 0.1));
}

.border-dashed {
  border: 2px dashed rgba(106, 38, 213, 0.3);
  transition: all 0.3s ease;
}

.border-dashed:hover {
  border-color: rgba(106, 38, 213, 0.6);
}

.border-success {
  border: 2px dashed rgba(76, 175, 80, 0.6);
}

.cv-submit-btn {
  background: linear-gradient(135deg, #FFB07B, #6A26D5);
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(106, 38, 213, 0.3);
}

.cv-submit-btn:hover {
  box-shadow: 0 6px 20px rgba(106, 38, 213, 0.4);
  transform: translateY(-2px);
}
</style>