<script setup>
import { computed, ref, shallowRef, watch, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import axios from 'axios'

const display = useDisplay()
const desktopTarget = ref()
const filterMobileTarget = ref()
const drawer = shallowRef(false)
const filterDrawer = shallowRef(false)
const tab = ref()
const jobListings = ref([])
const token = localStorage.getItem('token')
const selectedCategories = ref([])
const selectedSalaries = ref([])
const selectedExperiences = ref([])
const searchQuery = ref("");

// Refs untuk filter dinamis
const categories = ref([])
const salaries = ref([])
const experiences = ref([])

watch(display.mobile, val => {
  if (!val) drawer.value = false
})

onMounted(async () => {
  try {
    const [jobsRes, categoriesRes, salariesRes, experiencesRes] = await Promise.all([
      axios.get('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/works', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/categories', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/salaries', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/experiences', {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])

    jobListings.value = jobsRes.data
    categories.value = categoriesRes.data
    salaries.value = salariesRes.data
    experiences.value = experiencesRes.data
    console.log(salaries)
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})

const filteredJobs = computed(() => {
  return jobListings.value.filter((job) => {
    const matchesSearch =
      !searchQuery.value ||
      job.company_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.job_description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(job.category)

    const matchesExperience =
      selectedExperiences.value.length === 0 ||
      selectedExperiences.value.includes(job.experience)

    const matchesSalary =
      selectedSalaries.value.length === 0 ||
      selectedSalaries.value.some((range) => {
        return job.min_salary >= range.min && job.max_salary <= range.max
      })

    return matchesSearch && matchesCategory && matchesExperience && matchesSalary
  })
})

</script>


<template>
    <v-layout>
      <v-navigation-drawer v-model="filterDrawer" location="end" temporary>
        <template #prepend>
          <v-toolbar flat>
            <v-toolbar-title>Filters</v-toolbar-title>
  
            <v-spacer />
  
            <v-btn icon @click="filterDrawer = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        </template>
  
        <div ref="filterMobileTarget" class="pa-4" />
      </v-navigation-drawer>
  
      <v-main>
        <v-card v-if="['Men', 'Women'].includes(tab)" class="position-absolute w-100" rounded="b-lg" style="z-index: 10;">
          <div ref="desktopTarget" class="px-6" />
        </v-card>
  
        <v-container class="pt-12 pt-md-6 pb-md-3 px-md-6 px-lg-12" fluid>
          <v-row class="my-md-6" no-gutters>
            <v-col class="d-flex align-center" cols="10">
              <h2 class="text-h5 text-md-h4 font-weight-bold">Lowongan Pekerjaan</h2>
            </v-col>
  
            <v-col class="d-flex align-center ga-3 text-right mt-6"  cols="2">
                <v-text-field
                    v-model="searchQuery"
                    label="Cari"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    rounded="xl"
                    clearable
                    class=" custom-text-field"
        
                ></v-text-field>
  
            </v-col>
          </v-row>
  
          <v-divider />
        </v-container>
  
        <v-container class="py-md-6 px-md-6 px-lg-12" fluid>
          <v-row class="mb-12" no-gutters>
            <v-col class="pe-6" cols="12" md="3">
              <div v-if="display.mdAndUp.value">
  
                <v-divider class="my-2" />
  
                <v-expansion-panels
                  flat
                  multiple
                  variant="accordion"
                >
                  <v-expansion-panel :ripple="false">
                    <v-expansion-panel-title class="px-2">
                      <div class="text-body-2 text-high-emphasis">Salary</div>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <div class="ms-n4">
                        <v-checkbox-btn
                          v-for="(salary, i) in salaries"
                          :key="i"
                          v-model="selectedSalaries"
                          :value="salary"
                          color="primary"
                          density="comfortable"
                          :label="`Rp ${salary.min.toLocaleString()} - Rp ${salary.max.toLocaleString()}`"
                        />
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
  
                  <v-divider class="my-2" />
  
                  <v-expansion-panel :ripple="false">
                    <!-- replace style with min-height after v3.7 -->
                    <v-expansion-panel-title class="px-2">
                      <div class="text-body-2 text-high-emphasis">Kategori Pekerjaan</div>
                    </v-expansion-panel-title>
  
                    <v-expansion-panel-text>
                      <div class="ms-n4">
                        <v-checkbox-btn
                          v-for="(category, i) in categories"
                          :key="i"
                          v-model="selectedCategories"
                          :value="category.category_name"
                          color="primary"
                          density="comfortable"
                          :label="category.category_name"
                        />
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
  
                  <v-divider class="my-2" />
  
                  <v-expansion-panel :ripple="false">
                    <v-expansion-panel-title class="px-2">
                      <div class="text-body-2 text-high-emphasis">Pengalaman</div>
                    </v-expansion-panel-title>
  
                    <v-expansion-panel-text>
                      <div class="ms-n4">
                        <v-checkbox-btn
                          v-for="(exp, i) in experiences"
                          :key="i"
                          v-model="selectedExperiences"
                          :value="exp.experience"
                          color="primary"
                          density="comfortable"
                          :label="exp.experience"
                        />
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-col>
  
            <v-col cols="12" md="9">
                <v-container>
                    <v-row>
                    <v-col 
                        v-for="(job, index) in filteredJobs" 
                        :key="index" 
                        cols="12" 
                        md="6"
                    >
                        <v-card 
                        flat 
                        variant="outlined"
                        class="job-card mb-4"
                        >
                        <v-card-title class="d-flex align-center pa-4">
                            <v-img 
                            :src="job.logo" 
                            width="50" 
                            height="50" 
                            class="mr-3"
                            ></v-img>
                            <div>
                            <h3 class="text-subtitle-1 font-weight-bold">
                                {{ job.job_description }}
                            </h3>
                            <p class="text-caption text-medium-emphasis">
                                {{ job.company_name }}
                            </p>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn 
                            icon 
                            variant="plain"
                            >
                            <v-icon>mdi-bookmark-outline</v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-card-text class="pa-4">
                            <div class="d-flex align-center mb-2">
                            <v-icon 
                                icon="mdi-map-marker" 
                                size="small" 
                                class="mr-2"
                            ></v-icon>
                            <span class="text-body-2">
                                {{ job.company_address }}
                            </span>
                            </div>

                            <div class="d-flex">
                            <div class="d-flex align-center mr-4">
                                <v-icon 
                                icon="mdi-briefcase" 
                                size="small" 
                                class="mr-2"
                                ></v-icon>
                                <span class="text-body-2">
                                {{ job.experience }}
                                </span>
                            </div>

                            <div class="d-flex align-center">
                                <v-icon 
                                icon="mdi-cash" 
                                size="small" 
                                class="mr-2"
                                ></v-icon>
                                <span class="text-body-2">
                                {{ job.min_salary }} - {{ job.max_salary }}
                                </span>
                            </div>
                            </div>
                        </v-card-text>

                        <v-card-actions class="pa-4 pt-0">
                            <v-btn 
                            block 
                            color="#50478A" 
                            variant="flat" 
                            class="text-none"
                            :href="`mailto:${job.hrd_email}?subject=${encodeURIComponent()}`"
                            >
                            Lamar
                            </v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-col>
                    </v-row>
                </v-container>
            </v-col>
          </v-row>
  
          <v-divider />
        </v-container>

      </v-main>
  
    </v-layout>
</template>  

<style scoped>
    .job-card {
    border-radius: 12px;
    }
</style>