<template>
  
  <v-navigation-drawer v-model="drawer" color="#50478A" disable-resize-watcher>
    <v-list nav>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :active="i === 0"
        link
        :title="item.text"
        :to="item.to"
      />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar class="px-md-4">
    <template #prepend>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click="drawer = !drawer"
      />
    </template>

    <img
      class="me-sm-8 pl-6"
      max-width="40"
      src="/assets/logo.png"
    />
    <v-spacer />
    <template v-if="$vuetify.display.mdAndUp">
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        class="me-2 text-none"
        variant="flat"
        color="#50478A"
        v-bind="item"
      />
    </template>

  
  </v-app-bar>


</template>

<script setup>
  import { shallowRef } from 'vue'

  const drawer = shallowRef(false)

  const items = [
    {
      text: 'Login',
      to: '/login',
    },
  ]
</script>
