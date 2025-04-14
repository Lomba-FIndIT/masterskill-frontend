<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const token = localStorage.getItem('token')

// Refs
const speakers = ref([])
const events = ref([])

const toIsoFormat = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return ''
  return dateStr.replace(' ', 'T')
}

const formatDate = (dateStr) => {
  const iso = toIsoFormat(dateStr)
  if (!iso) return 'Tanggal tidak valid'
  const date = new Date(iso)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  return date.toLocaleDateString('id-ID', options)
}

const formatTimeRange = (start, end) => {
  const format = (dateStr) => {
    const iso = toIsoFormat(dateStr)
    if (!iso) return '--:--'
    return new Date(iso).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  return `${format(start)} - ${format(end)}`
}


// Fetch speakers
const fetchSpeakers = async () => {
  try {
    const response = await axios.get(`https://gastric-jeanna-zidanens-73211838.koyeb.app/api/speakers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    speakers.value = response.data.map(speaker => ({
      name: speaker.speaker_name,
      role: speaker.speaker_title,
      image: speaker.image || ' ', // Asumsikan ini sudah URL lengkap
    }))
  } catch (error) {
    console.error('Error fetching speakers:', error)
  }
}

// Fetch events
const fetchEvents = async () => {
  try {
    const response = await axios.get(`https://gastric-jeanna-zidanens-73211838.koyeb.app/api/webinars`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    events.value = response.data.map(event => {
    console.log('Raw Event:', event)
    return {
      id: event.id,
      title: event.title,
      dateStr: formatDate(event.start_date),
      dateParts: formatDate(event.start_date).split(' '),
      time: formatTimeRange(event.start_date, event.end_date),
      location: 'Zoom Meeting',
    }
  })

  } catch (error) {
    console.error('Error fetching events:', error)
  }
}

// Fetch on mount
onMounted(() => {
  fetchSpeakers()
  fetchEvents()
})
</script>



<template>
  <v-container class="pt-15">
    <h2 class="text-h4 font-weight-bold text-center mb-6">Event Speakers</h2>
    <v-row justify="center" class="mb-8">
      <v-col 
        v-for="(speaker, speakerIndex) in speakers" 
        :key="`speaker-${speakerIndex}`" 
        cols="12" 
        sm="3"
        class="text-center"
      >
        <v-img 
          :src="speaker.image" 
          alt="Speaker Image"
          class="mx-auto mb-4"
          width="200"
          height="200"
          cover
        ></v-img>
        
        <div class="speaker-info">
          <h3 class="text-h6">{{ speaker.name }}</h3>
          <p class="text-subtitle-1">{{ speaker.role }}</p>
        </div>
      </v-col>
    </v-row>

    <h2 class="text-h4 font-weight-bold text-center mb-6">Schedule Of Event</h2>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card 
          v-for="(event, eventIndex) in events" 
          :key="`event-${eventIndex}`"
          class="event-card d-flex align-center pa-4  mb-6"
          elevation="0"
          variant="outlined"
        >
          <div class="event-date d-flex flex-column align-center justify-center mr-4">
            <div class="text-h5 font-weight-bold">{{ event.dateParts[0] }}</div>
            <div class="text-caption">{{ event.dateParts.slice(1).join(' ') }}</div>
          </div>
          
          <v-card-text class="flex-grow-1 pa-0">
            <div class="event-details">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">
                {{ event.title }}
              </h3>
              <div class="d-flex align-center text-caption text-medium-emphasis">
                <v-icon 
                  icon="mdi-video" 
                  size="small" 
                  class="mr-1"
                ></v-icon>
                {{ event.location }}
                
                <v-icon 
                  icon="mdi-clock-outline" 
                  size="small" 
                  class="ml-3 mr-1"
                ></v-icon>
                {{ event.time }}
              </div>
            </div>
          </v-card-text>
          
          <router-link :to="`/layanan/webinar/${event.id}`" class="text-decoration-none">
            <v-btn 
              color="primary" 
              variant="flat" 
              class="registrasi-btn"
            >
              Registrasi
            </v-btn>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.social-links .v-chip {
  margin-right: 4px;
}

.event-card {
  border-radius: 12px;
  background: linear-gradient(to right, #ffffff, #ffffff);
}

.registrasi-btn {
  background: linear-gradient(135deg, #FFB07B, #6A26D5);
  color: white;
  text-transform: none;
  border-radius: 8px;
}

.event-date {
  min-width: 80px;
  text-align: center;
}
</style>
