<template>
  <v-app-bar app class="indigo" dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Axios</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-show="this.$store.getters.isAuthenticated" rounded text to="/"
      >Home</v-btn
    >
    <v-btn
      v-show="!this.$store.getters.isAuthenticated"
      rounded
      text
      to="/sign-in"
      >Sign-in</v-btn
    >
    <v-btn
      v-show="!this.$store.getters.isAuthenticated"
      rounded
      text
      to="/sign-up"
      >Sign-up</v-btn
    >
    <v-btn
      v-if="this.$store.getters.isAuthenticated"
      rounded
      text
      to="/dashboard"
      >Dashboard</v-btn
    >
    <v-btn
      v-if="this.$store.getters.isAuthenticated"
      rounded
      text
      @click="logout"
      >Logout</v-btn
    >
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
