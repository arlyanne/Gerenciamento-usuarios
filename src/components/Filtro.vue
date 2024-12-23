<template>
  <div>
    <v-expansion-panels class="pa-0 px-0 mb-5">
      <v-expansion-panel class="pa-0 px-0">
        <v-expansion-panel-title> Filtro </v-expansion-panel-title>
        <v-expansion-panel-text class="pa-0 px-0">
          <v-form @submit.prevent="filtrarUsuarios()">
            <v-row class="mt-4">
              <v-col class=" " cols="12" md="8" lg="8" xs="12">
                <v-text-field
                  v-model="filter.nome"
                  label="Nome"
                  variant="outlined"
                  color="primary"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col class=" " cols="12" md="4" lg="4" xs="12">
                <v-text-field
                  v-model="filter.matricula"
                  label="Matricula"
                  variant="outlined"
                  color="primary"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col class=" " cols="12" md="4" lg="4" xs="12">
                <v-text-field
                  v-model="filter.idade"
                  label="Idade"
                  variant="outlined"
                  color="primary"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col class=" " cols="12" md="4" lg="4" xs="12">
                <v-select
                  :items="itensCargo"
                  :item-value="value"
                  :item-title="title"
                  v-model="filter.cargo"
                  label="Cargo"
                  variant="outlined"
                  color="primary"
                  density="compact"
                ></v-select>
              </v-col>
              <v-col class=" " cols="12" md="4" lg="4" xs="12">
                <v-select
                  :items="itensTipo"
                  :item-value="title"
                  :item-title="title"
                  label="Tipo"
                  v-model="filter.tipo"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </v-col>
            </v-row>
            <div class="float-right">
              <v-btn
                @click="resetFiltro()"
                class="mr-2"
                color="gray"
                type="submit"
                variant="tonal"
              >
                Limpar
              </v-btn>
              <v-btn color="primary" type="submit" variant="tonal">
                Pesquisar
              </v-btn>
            </div>
          </v-form>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import { Usuario } from "@/model/usuario.model";
import { UsuarioService } from "@/service/usuario.service";
import { useUsuarioStore } from "@/stores/usuarioStore";
import { ref } from "vue";

const loading = ref(false);
const filter = ref({
  nome: "",
  matricula: "",
  idade: "",
  cargo: "",
  tipo: "",
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

const useStore = useUsuarioStore();

async function filtrarUsuarios() {
  loading.value = true;
  const user = new Usuario(
    filter.value.nome,
    filter.value.matricula,
    filter.value.idade,
    filter.value.cargo,
    filter.value.tipo
  );
  const listUsuarios = await UsuarioService.filterUsuarios(user);
  useStore.salvarListaUsuarios(listUsuarios);
  loading.value = false;
}
function resetFiltro() {
  filter.value = {
    nome: "",
    matricula: "",
    idade: "",
    cargo: "",
    tipo: "",
  };
}
</script>
