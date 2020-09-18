<template>
<div>
  <h1>Home</h1>
  {{ user }}
  <ul v-for="todo in todos" :key="todo.index">
    <li> {{ todo }} </li>
  </ul>
</div>
</template>

<script>
// @ is an alias to /src
export default {
  data: () => {
    return {
      todos: [
        'Página de Login',
        'Página de SignUp',
        'Validações usando Vuelidate em ambas',
        'Posicionamento e Dimensionamento dos objetos',
        'Adicionar Side-bar'
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  created () {
    this.$store.dispatch('fetchUser')
  }
}
</script>
