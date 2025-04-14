<script setup>
import { useRoute } from 'vue-router'
import CategoryCourse from '~/components/Akademi/CategoryCourse.vue'


const route = useRoute()
const id = route.params.id
</script>

<template>
  <v-layout>
    <v-main class="d-flex flex-column pt-10">
      <CategoryCourse :id="id" />
    </v-main>
  </v-layout>
</template>