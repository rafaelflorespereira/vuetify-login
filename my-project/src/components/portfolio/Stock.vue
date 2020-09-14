<template>
  <div class="card col-sm-6 col-md-4" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ stock.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">price: {{ stock.price }} | quantity: {{ stock.quantity }}</h6>
      <p class="card-text">Money invested: {{ stock.price * stock.quantity }}</p>
      <div class="row justify-content-center">
        <input
            type="number"
            class="form-control col align-self-start"
            placeholder="Quantity"
            v-model="quantity"
            :class=" isInsufficientQuantity ? 'noFunds': ''"
            >
        <button
            class="btn btn-success align-self-end"
            :disabled="quantity <= 0 || !Number.isInteger(Number(quantity)) || isInsufficientQuantity"
            @click="sellStock()"
            >
            {{ isInsufficientQuantity ? 'No Stocks' :  'Sell' }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .noFunds {
    border: 1px solid red;
  }
</style>

<script>
export default {
  props: ['stock'],
  data () {
    return {
      quantity: 0
    }
  },
  computed: {
    funds () {
      return this.$store.getters.funds
    },
    isInsufficientQuantity () {
      return this.stock.quantity < this.quantity
    }
  },
  methods: {
    sellStock () {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      }
      console.log(order)
      this.$store.dispatch('sellStocks', order)
      this.quantity = 0
    }
  }
}
</script>

<style>

</style>
