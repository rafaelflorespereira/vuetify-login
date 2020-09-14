const state = {
  funds: 10000,
  stocks: []
}

const mutations = {
  'BUY_STOCKS' (state, {stockId, stockPrice, quantity}) {
    const record = state.stocks.find(element => element.id === stockId)
    if (record) {
      record.quantity += quantity
    } else {
      state.stocks.push({
        id: stockId,
        quantity: quantity
      })
    }
    state.funds -= stockPrice * quantity
  },
  'SELL_STOCKS' (state, {stockId, stockPrice, quantity}) {
    const record = state.stocks.find(element => element.id === stockId)
    if (record.quantity <= quantity) {
    /* state.stocks.splice(state.stocks.findIndex(record), 1) */
      state.funds += stockPrice * record.quantity
      state.stocks.splice(state.stocks.indexOf(record), 1)
    } else {
      record.quantity -= quantity
      state.funds += stockPrice * quantity
    }
  },
  'SET_FUNDS' (state, funds) {
    state.funds = funds
  },
  'SET_PORTFOLIO' (state, portfolio) {
    state.stocks = portfolio
  }
}

const actions = {
  sellStocks: ({commit}, order) => {
    commit('SELL_STOCKS', order)
  }
}

const getters = {
  funds: state => {
    return state.funds
  },
  stockPortfolio: (state, getters) => {
    return state.stocks.map(stock => {
      const record = getters.stocks.find(element => element.id === stock.id)
      return {
        id: stock.id,
        quantity: parseInt(stock.quantity),
        name: record.name,
        price: record.price
      }
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
