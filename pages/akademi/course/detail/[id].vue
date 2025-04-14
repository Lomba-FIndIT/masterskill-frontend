<script setup>
import { useRoute } from 'vue-router'
import CourseDetail from '~/components/Akademi/CourseDetail.vue'


const route = useRoute()
const id = route.params.id
</script>

<template>
  <v-layout>
    <v-main class="d-flex flex-column pt-10">
      <CourseDetail :id="id" />
    </v-main>
  </v-layout>
</template>