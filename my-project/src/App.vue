<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <hello-world></hello-world>
  </div>
</template>

<script>
import Header from './Header'
import HelloWorld from './components/HelloWorld'
export default {
  components: {
    HelloWorld,
    appHeader: Header
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
