<template>
  <v-app-bar
    app
    class="indigo"
    dark
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Axios</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!!this.$store.getters.userId" rounded text to="/">Home</v-btn>
    <v-btn rounded text to="/login">Login</v-btn>
    <v-btn rounded text to="/sign-up">Sign-up</v-btn>
    <v-btn v-if="!!this.$store.getters.userId"  rounded text to="/dashboard">Dashboard</v-btn>
  </v-app-bar>
</template>

<script>

</script>
