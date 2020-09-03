<template>
  <div class="row">
    <my-stock
          v-for="stock in stocks"
          :key="stock.id"
          :stock="stock"
          >
          {{stock.id}}
          </my-stock>
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
      return this.$store.getters.stocks
    }
  }
}
</script>

<style>

</style>
