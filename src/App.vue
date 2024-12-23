<template>
  <v-app>
    <v-main class="bg-g">
      <Header v-if="Object.keys(useStore.usuarioLogado).length > 0" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Header from "./components/Header.vue";
import { useUsuarioStore } from "./stores/usuarioStore";

const useStore = useUsuarioStore();
</script>
