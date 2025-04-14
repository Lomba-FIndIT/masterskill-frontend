<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const webinarId = route.params.id

const form = ref({
  name: '',
  email: '',
  phone: '',
})

const submitted = ref(false)
const webinarTitle = ref('') // simpan judul webinar
const token = localStorage.getItem('token')

const fetchWebinar = async () => {
  try {
    const res = await axios.get(`https://gastric-jeanna-zidanens-73211838.koyeb.app/api/webinars/${webinarId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    webinarTitle.value = res.data.title || 'Webinar Tidak Ditemukan'
  } catch (error) {
    console.error('Gagal mengambil data webinar:', error)
    webinarTitle.value = 'Webinar Tidak Ditemukan'
  }
}

const submitForm = () => {
  console.log('Registering for webinar ID:', webinarId)
  console.log('Form Data:', form.value)
  submitted.value = true
}

onMounted(() => {
  fetchWebinar()
})
</script>


<template>
  <v-container class="pt-10">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="2" class="pa-6">
          <h2 class="text-h5 font-weight-bold mb-4">Pendaftaran Webinar {{ webinarTitle }}</h2>

          <v-form @submit.prevent="submitForm" v-if="!submitted">
            <v-text-field
              v-model="form.name"
              label="Nama Lengkap"
              required
              class="mb-4"
            />

            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              required
              class="mb-4"
            />

            <v-text-field
              v-model="form.phone"
              label="Nomor HP / WA"
              type="tel"
              required
              class="mb-4"
            />

            <v-btn type="submit" color="primary" class="registrasi-btn">
              Daftar Sekarang
            </v-btn>
          </v-form>

          <div v-else class="text-center">
            <v-icon color="green" size="48">mdi-check-circle</v-icon>
            <p class="text-subtitle-1 mt-2">Terima kasih! Anda telah terdaftar untuk webinar ini.</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.registrasi-btn {
  background: linear-gradient(135deg, #FFB07B, #6A26D5);
  color: white;
  text-transform: none;
  border-radius: 8px;
}
</style>
