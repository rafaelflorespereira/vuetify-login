<template>
  <div>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="class nav-header">
                <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
                <router-link to="/" class="navbar-brand">Vue</router-link>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <!-- eslint-disable  -->
                    <router-link
                                to="/portfolio"
                                tag="li"
                                class="nav-item"
                                activeClass ="active"
                                >
                                <a class="nav-link">Portfolio</a>
                                
                                </router-link>
                    <router-link 
                                to="/stocks"
                                class="nav-item"
                                activeClass="active"
                                tag="li"
                                >
                                <a class="nav-link">Stocks</a>
                                </router-link>
                    <li class="nav-item"> {{ funds }} </li>
                </ul>
            </div>
        </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    funds () {
      return this.$store.getters.funds
    }
  }
}
</script>

<style>

</style>
