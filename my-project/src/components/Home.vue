<template>
  <div class="mt-4">
      <h1>Home Page</h1>
      <h4>Buy Stocks, Create a new day, Hope for success</h4>
      <h4>If you were lucky sell your stocks in your <strong>Portfolio</strong> for profit</h4>
      <h2 :style="color"> {{ funds | currency }} </h2>
  </div>
</template>

<script>
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
      return this.funds > (this.initialFund / 2) ? 'color: green' : this.funds > (this.initialFund / 4) ? 'color : yellow' : 'color : red'
    }
  },
  mounted () {
    this.initialFund = this.funds
  }
}
</script>

<style>

</style>
