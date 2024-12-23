<template>
    <v-dialog v-model="props.open" width="auto">
      <v-card
        max-width="400"
        text="Deseja realmente excluir este usuário?"
        title="Confirmar Exclusão"
      >
        <v-card-actions>
          <v-btn
            class=""
            text="Não"
            color="gray"
            variant="tonal"
            @click="props.close()"
          ></v-btn>
          <v-btn
            color="primary"
            variant="tonal"
            text="Sim"
            @click="excluirUsuario()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { UsuarioService } from "../service/usuario.service";

export default {
  name: "ModalConfirmarExclusao",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
    refreshList: {
      type: Function,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    abrirSnackBar: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    async function excluirUsuario() {
      await UsuarioService.deleteUsuario(props.id);
      props.close();
      props.refreshList();
      props.abrirSnackBar("Usuário excluido com sucesso!", "success");
    }

    return {
      props,
      excluirUsuario,
      close,
    };
  },
};
</script>
