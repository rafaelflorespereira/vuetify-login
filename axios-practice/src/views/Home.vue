<template>
<div>
  <h1>Home</h1>
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
        'Posicionamento e Dimensionamento dos objetos'
      ]
    }
  }
}
</script>
