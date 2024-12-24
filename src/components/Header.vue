<template>
  <div>
    <v-toolbar density="compact" color="blue" prominent>


      <v-toolbar-title>Gerencimaneto de usuários</v-toolbar-title>

      <v-spacer></v-spacer>
        {{ useStore.usuarioLogado.usuario }}
      <v-btn icon>
        <v-icon @click="deslogar()" title="Sair">mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { useUsuarioStore } from '../stores/usuarioStore';

export default {
    name: 'Header',
    setup() {
        const useStore = useUsuarioStore();
        const router = useRouter();

        function deslogar() {
            useStore.removerUsuarioLogado();
            router.push(`/login/`);
            }
        
        return{
            useStore,
            deslogar
        }
    }
}

</script>
