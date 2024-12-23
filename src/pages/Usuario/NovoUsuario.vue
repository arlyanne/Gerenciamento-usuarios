<template>
    <div class="container">
      <p class=" text-h5 mb-5">Cadastro de usuário</p>
      <v-card>
        <v-form ref="form" @submit.prevent="salvar()">
          <v-container>
            <v-row>
              <v-col cols="12" lg="8" md="4">
                <v-text-field
                  v-model="usuario.nome"
                  label="Nome"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col class=" " cols="12" md="4" lg="4" xs="12">
                <v-text-field
                  v-model="usuario.matricula"
                  label="Matricula"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col class=" " cols="12" md="4" lg="4" xs="12">
                <v-text-field
                  v-model="usuario.idade"
                  label="Idade"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :rules="[rules.required, rules.idade]"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col class=" " cols="12" md="4" lg="4" xs="12">
                <v-select
                  :items="itensCargo"
                  :item-value="value"
                  :item-title="title"
                  v-model="usuario.cargo"
                  label="Cargo"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col class=" " cols="12" md="4" lg="4" xs="12">
                <v-select
                  :items="itensTipo"
                  :item-value="title"
                  :item-title="title"
                  label="Tipo"
                  v-model="usuario.tipo"
                  variant="outlined"
                  density="compact"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
            <v-card-actions class=" justify-end">
              <v-btn
                color=""
                class="mb-3"
                variant="tonal"
                @click="$router.push({ path: '/usuario' })"
              >
                Voltar
              </v-btn>
              <v-btn
                type="submit"
                class="float-right mb-3"
                color="primary"
                variant="tonal"
                :loading="loading"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card>
    </div>
    <v-snackbar :color="typeSnackbar" v-model="snackbar">
      {{ textSnackbar }}

      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false"> X </v-btn>
      </template>
    </v-snackbar>
</template>

<script setup>
import { Usuario } from "@/model/usuario.model";
import { UsuarioService } from "@/service/usuario.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

const snackbar = ref(false);
const typeSnackbar = ref("");
const form = ref(null);
const textSnackbar = ref("");
const router = useRouter();
const usuario = ref({
  nome: "",
  matricula: "",
  idade: "",
  cargo: "",
  tipo: null,
});

const itensTipo = ref([
  { title: "Admin", value: 1 },
  { title: "Comum", value: 2 },
]);

const itensCargo = ref([
  { title: "Analista" },
  { title: "Gerente" },
  { title: "Desenvolvedor" },
]);
const loading = ref(false);

const rules = ref({
  required: (value) => !!value || "Campo obrigatório",
  idade: (value) => {
    if (value < 18 || value > 60) return "Idade deve ser entre 18 a 60 anos";
  },
});

async function salvar() {
  loading.value = true;
  const formValid = await form.value.validate();
  textSnackbar.value = "";
  if (formValid.valid) {
    try {
      const listaUsuarios = await UsuarioService.getUsuarios();
      const filtroMatricula = listaUsuarios.find(
        (e) => e.matricula == usuario.value.matricula
      );
      if (!filtroMatricula) {
        const user = new Usuario();

        user.setNome(usuario.value.nome);
        user.setMatricula(usuario.value.matricula);
        user.setIdade(usuario.value.idade);
        user.setCargo(usuario.value.cargo);
        user.setTipo(usuario.value.tipo);

        await UsuarioService.createUsuario(user);
        typeSnackbar.value = "success";
        snackbar.value = true;
        textSnackbar.value = "Usuário criado com sucesso!";
        setTimeout(() => {
          router.push(`/usuario/`);
        }, 2000);
      } else {
        loading.value = false;
        snackbar.value = true;
        typeSnackbar.value = "warning";
        textSnackbar.value = "Matricula já existente!";
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style>
.container {
  width: 80%;
  margin: auto;
  margin-top: 20px;
}
</style>
