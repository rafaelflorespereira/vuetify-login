<template>
  <v-app>
    <app-bar app></app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid fill-height>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer>
      <my-footer></my-footer>
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import MyFooter from "./components/MyFooter";
export default {
  name: "App",

  components: {
    AppBar,
    MyFooter
  },
  created(){
    this.$store.dispatch('autoLogin')
  }
};
</script>
