<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/" class="mr-2" text>HOME</v-btn>
      <v-btn to="/about" class="mr-2" text>ABOUT</v-btn>
      <v-btn to="/contact" class="mr-2" text>CONTACT</v-btn>
      <v-btn to="/members" class="mr-2" text>MEMBERS</v-btn>
      <v-btn
        @click="logout"
        v-if="$store.state.userIsAuthorized"
        class="mr-2"
        text
        >LOGOUT</v-btn
      >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      clientId: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth0Logout");
    },
  },
};
</script>
