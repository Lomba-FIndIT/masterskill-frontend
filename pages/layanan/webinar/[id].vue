<script setup>
import { useRoute } from 'vue-router'
import WebinarDaftar from '~/components/Layanan/Webinar/WebinarDaftar.vue'

const route = useRoute()
const id = route.params.id
</script>

<template>
  <v-layout>
    <v-main class="d-flex flex-column pt-10">
      <WebinarDaftar :id="id" />
    </v-main>
  </v-layout>
</template>