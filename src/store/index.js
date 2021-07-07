import Vue from "vue";
import Vuex from "vuex";
import auth0 from "auth0-js";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userIsAuthorized: false,
    auth0: new auth0.WebAuth({
      domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
      clientID: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
      redirectUri: process.env.VUE_APP_DOMAINURL + "/auth0callback",
      responseType: process.env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
      scope: process.env.VUE_APP_AUTH0_CONFIG_SCOPE,
    }),
  },
  mutations: {
    setUserIsAuthorized(state, authorizationState) {
      state.userIsAuthorized = authorizationState;
    },
  },
  actions: {
    auth0Login(context) {
      context.state.auth0.authorize();
    },
    auth0HandleAuthentication(context) {
      context.state.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
          );

          localStorage.setItem("access_token", authResult.accessToken);
          localStorage.setItem("id_token", authResult.idToken);
          localStorage.setItem("expires_at", expiresAt);

          router.replace("/members");
        } else if (err) {
          alert("Login failed. Error #KJN838");
          router.replace("/login");
          console.log(err);
        }
      });
    },
    auth0Logout(context) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");

      window.location.href =
        process.env.VUE_APP_AUTH0_CONFIG_DOMAINURL +
        "/v2/logout?returnTo=" +
        process.env.VUE_APP_DOMAINURL +
        "/login&client_id=" +
        process.env.VUE_APP_AUTH0_CONFIG_CLIENTID;
    },
  },
  modules: {},
});
