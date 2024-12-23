import type { Login } from "@/model/login.model";
import type { Usuario } from "@/model/usuario.model";
import { defineStore } from "pinia";

export const useUsuarioStore = defineStore('usuario', {
    state: () => ({
        usuarioLogado: {} as Login,
        listaUsuarios: [] as Usuario[]
    }),

    actions:  {
        salvarUsuarioLogado(usuarioLogado: Login){
            this.usuarioLogado = usuarioLogado;
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado))
        },
        removerUsuarioLogado(){
            this.usuarioLogado = {} as Login;
        },
        salvarListaUsuarios(listaUsuarios: Usuario[]){
            this.listaUsuarios = listaUsuarios;
        }
    },

    getters: {
        getUsuarioLogado: (state) => {
            return state.usuarioLogado;
        },
        getListaUsuarios: (state) => {
            return state.listaUsuarios;
        }
    }
})