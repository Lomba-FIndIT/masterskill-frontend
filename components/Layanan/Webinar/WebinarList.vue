<script setup>
import { ref } from 'vue'

// Speaker data
const speakers = ref([
  { 
    name: 'Hilman', 
    role: 'Product Manager',
    image: new URL('/assets/pembicara.jpg', import.meta.url).href,
  },
  { 
    name: 'Hilman', 
    role: 'Product Manager',
    image: new URL('/assets/pembicara.jpg', import.meta.url).href,
  }
])

// Event schedule data
const events = ref([
  {
    id: 1,
    date: '15 February 2024',
    title: 'Menjahit dari Nol: Peluang, Tren, dan Cara Memulai',
    time: '9:15am - 2:15pm',
    location: 'Zoom Meeting',
  },
  {
    id: 2,
    date: '16 February 2024',
    title: 'Menjahit dari satu: Peluang, Tren, dan Cara Memulai',
    time: '9:15am - 2:15pm',
    location: 'Zoom Meeting',
  },
])
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
            <div class="text-h5 font-weight-bold">{{ event.date.split(' ')[0] }}</div>
            <div class="text-caption">{{ event.date.split(' ').slice(1).join(' ') }}</div>
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
