<template>
  <v-content class="login-page">
    <v-card width="365" class="pa-4">
      <v-card-item>
        <v-card-title class="text-h5 text-center text-primary"> Login </v-card-title>
      </v-card-item>
      <v-form ref="form" @submit.prevent="submitLogin">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formLogin.usuario"
                label="Usuário"
                :rules="[rules.required]"
                variant="underlined"
                density="compact"

              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formLogin.senha"
                :rules="[rules.required]"
                label="Senha"
                type="password"
                variant="underlined"
                density="compact"

              ></v-text-field>
            </v-col>
          </v-row>
          <p class="message-error " v-if="messageErro">{{ messageErro }}</p>
      
        </v-container>
        <v-card-actions>
          <v-btn type="submit" block color="primary" variant="tonal">
            Entrar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-content>
</template>

<script setup>
import { useUsuarioStore } from "@/stores/usuarioStore";
import { base_URL } from "@/util/baseUrl";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const messageErro = ref("");
const form = ref(null)
const router = useRouter();
const formLogin = ref({
  usuario: "",
  senha: "",
});
const usuarioStore = useUsuarioStore();

const rules = ref({
  required: (value) => !!value || "Campo obrigatório",
});

async function submitLogin() {
  const formValid = await form.value.validate();
  if (formValid.valid) {
    messageErro.value = "";
    const resp = await axios.get(
      `${base_URL}/login?usuario=${formLogin.value.usuario}&senha=${formLogin.value.senha}`
    );
    const usuario = resp.data[0];
    if (usuario) {
      usuarioStore.salvarUsuarioLogado(usuario);
      router.push(`/usuario/`)
    } else {
      messageErro.value = "Login ou senha inválido!";
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
}
.message-error {
  color: red;
}
</style>
