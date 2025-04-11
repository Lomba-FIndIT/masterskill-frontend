<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const tab = ref('login');
const showPassword = ref(false);

// Login form fields
const loginIdentifier = ref('');
const loginPassword = ref('');

// Register form fields
const email = ref('');
const username = ref('');
const registerPassword = ref('');

const router = useRouter();

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const submitForm = () => {
  if (tab.value === 'login') {
    if (!loginIdentifier.value || !loginPassword.value) {
      alert('Semua field harus diisi!');
      return;
    }

    // Handle login logic
    console.log({
      loginIdentifier: loginIdentifier.value,
      password: loginPassword.value
    });

    router.push('/dashboard');

  } else {
    if (!email.value || !username.value || !registerPassword.value) {
      alert('Semua field harus diisi!');
      return;
    }

    if (!validateEmail(email.value)) {
      alert('Format email tidak valid!');
      return;
    }

    // Handle register logic
    console.log({
      email: email.value,
      username: username.value,
      password: registerPassword.value
    });

    router.push('/dashboard');
  }
};
</script>

<template>
    <v-container class="d-flex align-center justify-center" style="height: 100vh;">
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
          <div class="logo-container">
            <img
              src="@/assets/logo-big.png"
              alt="MasterSkill Logo"
              width="400"
              height="400"
            ></img>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-6" flat>
            <h2 class="text-center mb-8">Welcome to MasterSkill</h2>
            
            <div class="mb-6 d-flex justify-center">
              <v-tabs
                v-model="tab"
                centered
                bg-color="#b8b5cb"
                class="rounded-pill custom-tabs"
              >
                <v-tab value="login" class="px-8">Login</v-tab>
                <v-tab value="register" class="px-8">Register</v-tab>
              </v-tabs>
            </div>
  
            <v-form @submit.prevent="submitForm">
              <!-- Login form fields -->
              <template v-if="tab === 'login'">
                <div class="mb-4">
                  <label class="text-body-1 mb-1 d-block">Email/Username</label>
                  <v-text-field
                    v-model="loginIdentifier"
                    placeholder="Masukan Email atau Username Anda"
                    variant="outlined"
                    hide-details
                    class="rounded-lg"
                  ></v-text-field>
                </div>
  
                <div class="mb-8">
                  <label class="text-body-1 mb-1 d-block">Password</label>
                  <v-text-field
                    v-model="loginPassword"
                    placeholder="Masukan Password Anda"
                    variant="outlined"
                    hide-details
                    :type="showPassword ? 'text' : 'password'"
                    class="rounded-lg"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                  ></v-text-field>
                </div>
  
                <v-btn
                  block
                  color="#574b96"
                  size="large"
                  type="submit"
                  class="text-white rounded-lg mb-4"
                >
                  Login
                </v-btn>
              </template>
  
              <!-- Register form fields -->
              <template v-else>
                <div class="mb-4">
                  <label class="text-body-1 mb-1 d-block">Email</label>
                  <v-text-field
                    v-model="email"
                    placeholder="Masukan Email Anda"
                    variant="outlined"
                    hide-details
                    class="rounded-lg"
                  ></v-text-field>
                </div>
  
                <div class="mb-4">
                  <label class="text-body-1 mb-1 d-block">Username</label>
                  <v-text-field
                    v-model="username"
                    placeholder="Masukan Username Anda"
                    variant="outlined"
                    hide-details
                    class="rounded-lg"
                  ></v-text-field>
                </div>
  
                <div class="mb-8">
                  <label class="text-body-1 mb-1 d-block">Password</label>
                  <v-text-field
                    v-model="registerPassword"
                    placeholder="Masukan Password Anda"
                    variant="outlined"
                    hide-details
                    :type="showPassword ? 'text' : 'password'"
                    class="rounded-lg"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                  ></v-text-field>
                </div>
  
                <v-btn
                  block
                  color="#574b96"
                  size="large"
                  type="submit"
                  class="text-white rounded-lg mb-4"
                >
                  Register
                </v-btn>
              </template>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<style scoped>
  .custom-tabs-container {
    width: auto;
    display: inline-block;
  }

  .custom-tabs {
    min-width: 200px;
    max-width: 300px;
  }

  .custom-tab {
    min-width: 80px;
    padding: 0 20px !important;
    font-size: 14px;
    text-transform: none !important;
    justify-content: center !important;
  }

  :deep(.v-tab) {
    height: 40px !important;
    min-height: 40px !important;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :deep(.v-tabs) {
    height: 40px !important;
  }

  :deep(.v-tab__content) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>