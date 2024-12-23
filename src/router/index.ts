/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import Login from "../pages/Login/index.vue";
import Usuario from "../pages/Usuario/index.vue";
import NovoUsuario from "../pages/Usuario/NovoUsuario.vue";
import { useUsuarioStore } from "@/stores/usuarioStore";


const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      publicPage: true,
    },
    component: Login,
  },
  {
    path: "/usuario",
    name: "usuario",
    meta: {
      requiresAuth: true,
    },
    component: Usuario,
  },
  {
    path: "/usuario/novo",
    name: "usuarionovo",
    meta: {
      requiresAuth: true,
    },
    component: NovoUsuario,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

router.beforeEach((to, from, next) => {
  const store = useUsuarioStore();
  const usuarioLogado = store.getUsuarioLogado;

  const isAuth = usuarioLogado.id != undefined;
  const isAuthAdmin = isAuth && usuarioLogado.tipo === 1;

  // Verifica se a rota requer autenticação
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuth) {
      next({ name: "login" }); // Redireciona para a tela de login se não autenticado
    } else if (isAuth && !isAuthAdmin) {
      // Se for autenticado mas não admin, redireciona para /usuario
      // Mas não redireciona para /usuario se já estiver na rota /usuario
      if (to.name !== "usuario") {
        next({ name: "usuario" });
      } else {
        next(); // Permite acessar /usuario se já estiver lá
      }
    } else {
      next(); // Usuário autenticado e admin, permite acesso à rota
    }
  } else {
    next(); // Rota pública, permite acesso
  }
});

export default router;
