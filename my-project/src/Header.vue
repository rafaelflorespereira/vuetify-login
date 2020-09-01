<template>
  <div>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="class nav-header">
                <img src="./assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
                <router-link to="/" class="navbar-brand">Vue</router-link>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <router-link to="/portfolio" class="nav-link nav-item" activeClass="active" tag="li"><a>Portfolio</a></router-link>
                    <router-link to="/stocks" class="nav-link" activeClass="active" tag="li"><a>Stocks</a></router-link>
                </ul>
            </div>
        </nav>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
