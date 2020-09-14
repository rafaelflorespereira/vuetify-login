<template>
<div>
  <h5 v-show="stocks.length <= 0" class="mt-4">Go invest your money in the stocks table</h5>
  <div class="row px-4">
    <my-stock
              v-for="stock in stocks"
              :key="stock.id"
              :stock="stock"
              >
              </my-stock>
  </div>
</div>

</template>

<script>
import Stock from './Stock'
export default {
  components: {
    myStock: Stock
  },
  computed: {
    stocks () {
      return this.$store.getters.stockPortfolio
    }
  }
}
</script>

<style>

</style>
