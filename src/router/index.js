import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import Members from "../views/Members.vue";
import Login from "../views/Login.vue";
import Store from "../store";
import Auth0Callback from "../views/Auth0Callback.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth0callback",
    name: "auth0callback",
    component: Auth0Callback,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/members",
    name: "members",
    component: Members,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.path == "/auth0callback")) {
    Store.dispatch("auth0HandleAuthentication");
    next(false);
  }

  let userIsAuthorized = false;

  if (
    localStorage.getItem("access_token") &&
    localStorage.getItem("id_token") &&
    localStorage.getItem("expires_at")
  ) {
    userIsAuthorized =
      new Date().getTime() < JSON.parse(localStorage.getItem("expires_at"));
  }

  Store.commit("setUserIsAuthorized", userIsAuthorized);
  if (to.meta.requiresAuth) {
    if (userIsAuthorized) {
      next();
    } else router.replace("/login");
  }
  next();
});

export default router;
