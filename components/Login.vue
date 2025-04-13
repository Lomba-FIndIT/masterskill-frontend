<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const tab = ref('login');
const showPassword = ref(false);
const loading = ref(false);

const loginEmail = ref('');
const loginPassword = ref('');

const email = ref('');
const username = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const router = useRouter();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const submitForm = async () => {
  loading.value = true;

  if (tab.value === 'login') {
    if (!loginEmail.value || !loginPassword.value) {
      alert('Semua field harus diisi!');
      loading.value = false;
      return;
    }

    try {
      const response = await axios.post('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/login', {
        email: loginEmail.value,
        password: loginPassword.value
      });

      if (response.data.token) {
        userStore.setToken(response.data.token);
        await userStore.fetchUser();
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login Failed:', error);
      alert('Login gagal. Coba lagi!');
    } finally {
      loading.value = false;
    }

  } else {
    if (!email.value || !username.value || !password.value || !passwordConfirmation.value) {
      alert('Semua field harus diisi!');
      loading.value = false;
      return;
    }

    if (!validateEmail(email.value)) {
      alert('Format email tidak valid!');
      loading.value = false;
      return;
    }

    if (password.value.length <= 5 || passwordConfirmation.value.length <= 5) {
      alert('Password harus lebih dari 6 karakter!');
      loading.value = false;
      return;
    }

    try {
      const response = await axios.post('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/register', {
        email: email.value,
        name: username.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
        role_id: 4
      });

      console.log('Register Success:', response.data);
      tab.value = 'login';
    } catch (error) {
      console.error('Register Failed:', error);
      alert('Registrasi gagal. Coba lagi!');
    } finally {
      loading.value = false;
    }
  }
};

onMounted(() => {
  if (localStorage.getItem('token')) {
    userStore.fetchUser();
    router.push('/dashboard');
  }
});
</script>

<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-row>
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <div class="logo-container">
          <img src="@/assets/logo-big.png" alt="MasterSkill Logo" width="400" height="400" />
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-6" flat>
          <h2 class="text-center mb-8">Welcome to MasterSkill</h2>

          <div class="mb-6 d-flex justify-center">
            <v-tabs v-model="tab" centered bg-color="#b8b5cb" class="rounded-pill custom-tabs">
              <v-tab value="login" class="px-8">Login</v-tab>
              <v-tab value="register" class="px-8">Register</v-tab>
            </v-tabs>
          </div>

          <v-form @submit.prevent="submitForm">
            <!-- Login -->
            <template v-if="tab === 'login'">
              <div class="mb-4">
                <label>Email</label>
                <v-text-field v-model="loginEmail" placeholder="Masukan Email Anda" variant="outlined" hide-details class="rounded-lg" />
              </div>

              <div class="mb-8">
                <label>Password</label>
                <v-text-field
                  v-model="loginPassword"
                  placeholder="Masukan Password Anda"
                  variant="outlined"
                  hide-details
                  :type="showPassword ? 'text' : 'password'"
                  class="rounded-lg"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                />
              </div>

              <v-btn block color="#574b96" size="large" type="submit" class="text-white rounded-lg mb-4" :loading="loading" :disabled="loading">
                <template #default>
                  {{ loading ? 'Loading...' : 'Login' }}
                </template>
              </v-btn>
            </template>

            <!-- Register -->
            <template v-else>
              <div class="mb-4">
                <label>Email</label>
                <v-text-field v-model="email" placeholder="Masukan Email Anda" variant="outlined" hide-details class="rounded-lg" />
              </div>

              <div class="mb-4">
                <label>Name</label>
                <v-text-field v-model="username" placeholder="Masukan Nama Anda" variant="outlined" hide-details class="rounded-lg" />
              </div>

              <div class="mb-4">
                <label>Password</label>
                <v-text-field
                  v-model="password"
                  placeholder="Masukan Password Anda"
                  variant="outlined"
                  hide-details
                  :type="showPassword ? 'text' : 'password'"
                  class="rounded-lg"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                />
              </div>

              <div class="mb-8">
                <label>Confirm Password</label>
                <v-text-field
                  v-model="passwordConfirmation"
                  placeholder="Ulangi Password Anda"
                  variant="outlined"
                  hide-details
                  :type="showPassword ? 'text' : 'password'"
                  class="rounded-lg"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                />
              </div>

              <v-btn block color="#574b96" size="large" type="submit" class="text-white rounded-lg mb-4" :loading="loading" :disabled="loading">
                <template #default>
                  {{ loading ? 'Loading...' : 'Register' }}
                </template>
              </v-btn>
            </template>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.custom-tabs {
  min-width: 200px;
  max-width: 300px;
}
.logo-container {
  display: flex;
  justify-content: center;
}
</style>
