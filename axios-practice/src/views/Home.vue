<template>
  <v-container>
    <h1>Home</h1>
    <v-row justify="center">
      <h3 v-show="!user">Please Sign-In</h3>
      <v-col v-if="user">
        <my-avatar :user="user"></my-avatar>
      </v-col>
    </v-row>
    <v-col>
      <v-card>
        <v-card-title primary-title>
          my Todos
        </v-card-title>
        <v-card-text>
          <ul v-for="todo in todos" :key="todo.index">
            <li>{{ todo }}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
// @ is an alias to /src
import myAvatar from "@/components/MyAvatar";
export default {
  components: {
    myAvatar
  },
  data: () => {
    return {
      todos: [
        "Página de SignIn",
        "Página de SignUp",
        "Validações usando Vuelidate em ambas",
        "Posicionamento e Dimensionamento dos objetos",
        "Adicionar Side-bar"
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.$store.dispatch("fetchUser");
  }
};
</script>
