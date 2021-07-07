<template>
  <v-card class="mx-auto mt-16" max-width="400" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">Logo goes here</div>
        <v-divider class="mx-1 mb-4"></v-divider>
        <div>
          <v-list-item-title class="text-h5 mb-1">Welcome</v-list-item-title>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga adipisci
          dolorem, eius cupiditate non delectus reiciendis voluptas dicta. Sed
          sint harum, sit saepe nihil perferendis deleniti dolore consequuntur
          quam similique?
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn outlined rounded text @click="auth0Login()">
        LOGIN
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    auth0Login() {
      this.$store.dispatch("auth0Login");
    },
  },
};
</script>
