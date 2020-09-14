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
                </ul>
                <ul class="navbar-nav">
                  <div class="dropdown nav-item">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                      Save & Load
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a class="dropdown-item" @click="saveData()">Save</a>
                      <a class="dropdown-item" @click="loadData()">Load</a>
                    </div>
                  </div>

                  <li class="nav-item" @click="endDay()"><a class="nav-link">End Day</a></li>
                  <li class="nav-link" :style="color"> My Funds : {{ funds | currency }} </li>
                </ul>
            </div>
        </nav>
    </div>
  </div>
</template>

<style scoped>
 .nav-item:hover {
   cursor: pointer
 }
</style>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      initialFund: 0
    }
  },
  computed: {
    funds () {
      return this.$store.getters.funds
    },
    color () {
      return this.funds > (this.initialFund / 2) ? 'color: green' : this.funds > (this.initialFund / 4) ? 'color : darkkhaki' : 'color : red'
    }
  },
  mounted () {
    this.initialFund = this.funds
  },
  methods: {
    ...mapActions({
      randomizeStocks: 'randomizeStocks',
      fetchData: 'loadData'
    }),
    endDay () {
      this.randomizeStocks()
    },
    loadData () {
      this.fetchData()
    },
    saveData () {
      const data = {
        funds: this.funds,
        portfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks
      }
      this.$http.put('data.json', data)
    }
  }
}
</script>

<style>

</style>
