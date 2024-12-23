<template>
    <v-dialog persistent v-model="props.open">
      <div class="container">
        <v-card title="Atualizar usuário">
          <v-form ref="form" @submit.prevent="atualizarUsuario()">
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
                    disabled="true"
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
              <v-card-actions>
                <v-btn variant="tonal" @click="props.fecharModalEdit()">
                  Cancelar
                </v-btn>
                <v-btn
                  type="submit"
                  color="primary"
                  variant="tonal"
                  :loading="loading"
                >
                  Atualizar
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-form>
        </v-card>
      </div>
    </v-dialog>
</template>

<script setup>
import { Usuario } from "@/model/usuario.model";
import { ref, watch } from "vue";
import { UsuarioService } from "@/service/usuario.service";

const usuario = ref();
const open = ref(false);
const form = ref(null);

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  usuario: {
    type: Usuario,
    required: true,
  },
  refreshList: {
    type: Function,
    required: true,
  },
  fecharModalEdit: {
    type: Function,
    required: true,
  },
  abrirSnackBar: {
    type: Function,
    required: true,
  },
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

watch(
  () => props.usuario,
  (newValue) => {
    usuario.value = newValue;
  }
);

async function atualizarUsuario() {
  loading.value = true;
  const formValid = await form.value.validate();
  if (formValid.valid) {
    try {
      const user = new Usuario();

      user.setNome(usuario.value.nome);
      user.setMatricula(usuario.value.matricula);
      user.setIdade(usuario.value.idade);
      user.setCargo(usuario.value.cargo);
      user.setTipo(usuario.value.tipo);

      await UsuarioService.updateUsuario(usuario.value.id, user);
      props.abrirSnackBar("Usuário atualizado com sucesso!", "success");
      setTimeout(() => {
        resetState();
        props.refreshList();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  function resetState() {
    open.value = false;
    loading.value = false;
    usuario.value = new Usuario();
    props.fecharModalEdit();
  }
}
</script>

<style></style>
