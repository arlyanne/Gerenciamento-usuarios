import type { Usuario } from "@/model/usuario.model";
import { base_URL } from "@/util/baseUrl";
import axios from "axios";

export class UsuarioService {
  static async getUsuarios(): Promise<Usuario[]> {
    const usuarios = await axios.get(`${base_URL}/usuarios`);
    return usuarios.data;
  }

  static async createUsuario(usuario: Usuario) {
    const resp = await axios.post(`${base_URL}/usuarios`, usuario);
    return resp.data;
  }

  static async updateUsuario(id: string, dados: Partial<Usuario>) {
    const resp = await axios.put(`${base_URL}/usuarios/${id}`, dados);
    return resp.data;
  }
  static async deleteUsuario(id: string) {
    const resp = await axios.delete(`${base_URL}/usuarios/${id}`);
  }

  static async filterUsuarios(usuario: Usuario) {
    const resp = await axios.get(
      `${base_URL}/usuarios?nome=${usuario.getNome()}&matricula=${usuario.getMatricula()}&cargo=${usuario.getCargo()}&idade=${usuario.getIdade()}&tipo=${usuario.getTipo()}`
    );
    return resp.data;
  }
}
