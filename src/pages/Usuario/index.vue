<template>
    <div class="container">
      <div class="d-flex justify-space-between mb-5">
        <p class=" text-h5 text-primary">Usuários</p>
        <v-btn
          v-if="useStore.usuarioLogado.tipo === 1"
          @click="$router.push({ path: '/usuario/novo' })"
          color="primary"
          variant="tonal"
        >
        Cadastrar
        </v-btn>
      </div>
      <Filtro />
      <v-card>
        <v-data-table
          :headers="headers"
          :items="items"
          item-key="name"
          items-per-page="5"
          items-per-page-text="Itens por página"
          page-text="{0}-{1} de {2}"
          no-data-text="Nenhum dado disponível"
          hover
        >
          <template #[`item.tipo`]="{ item }">
            {{ item.tipo == 1 ? "Admin" : "Comum" }}
          </template>
          <template
            #[`item.acoes`]="{ item }"
            v-if="useStore.usuarioLogado.tipo === 1"
          >
            <v-icon
              size="small"
              @click="abrirModalEditar(item)"
              class="me-2"
              title="Editar"
              color="primary"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              size="small"
              class="me-2"
              title="Excluir"
              @click="abrirModalExclusao(item.id)"
              color="primary"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <ModalEditarUsuario
        v-model:open="openEditar"
        :usuario="usuarioEditar"
        :refreshList="getUsuarios"
        :fecharModalEdit="fecharModalEdit"
        :abrirSnackBar="abrirSnackBar"
      />
      <ModalConfirmarExclusao
        :open="openModalExclusao"
        :refreshList="getUsuarios"
        :id="idUsuario"
        :close="fecharModalExclusao"
        :abrirSnackBar="abrirSnackBar"
      />
      <v-snackbar :color="typeSnackbar" v-model="snackbar">
        {{ textSnackbar }}

        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar = false"> X </v-btn>
        </template>
      </v-snackbar>
    </div>
</template>

<script setup>
import Filtro from "@/components/Filtro.vue";
import ModalConfirmarExclusao from "@/components/ModalConfirmarExclusao.vue";
import ModalEditarUsuario from "@/components/ModalEditarUsuario.vue";
import { UsuarioService } from "@/service/usuario.service";
import { useUsuarioStore } from "@/stores/usuarioStore";
import { onMounted, ref, watch } from "vue";

const useStore = useUsuarioStore();
const items = ref([]);
const openEditar = ref(false);
const openModalExclusao = ref(false);
const snackbar = ref(false);
const textSnackbar = ref("");
const typeSnackbar = ref("");
const idUsuario = ref();
const usuarioEditar = ref({});
const headers = ref([
  { title: "Nome", value: "nome", sortable:true },
  { title: "Matricula", value: "matricula", sortable:true },
  { title: "Idade", value: "idade" },
  { title: "Cargo", value: "cargo" },
  { title: "Tipo", value: "tipo" },
  { title: "Ações", value: "acoes" },
]);


async function getUsuarios() {
  const usuarios = await UsuarioService.getUsuarios();
  useStore.salvarListaUsuarios(usuarios);
  openEditar.value = false;
}

function abrirModalEditar(usuario) {
  openEditar.value = true;
  usuarioEditar.value = usuario;
}

function fecharModalEdit() {
  openEditar.value = false;
}

function abrirModalExclusao(id) {
  openModalExclusao.value = true;
  idUsuario.value = id;
}

function fecharModalExclusao(id) {
  openModalExclusao.value = false;
}

function abrirSnackBar(mensagem, type) {
  snackbar.value = true;
  textSnackbar.value = mensagem;
  typeSnackbar.value = type;
}

watch(
  () => useStore.getListaUsuarios,
  (newValue) => {
    items.value = newValue;
  }
);

onMounted(() => {
  getUsuarios();
});
</script>
<style>
.container {
  width: 80%;
  margin: auto;
  margin-top: 20px;
}
</style>
