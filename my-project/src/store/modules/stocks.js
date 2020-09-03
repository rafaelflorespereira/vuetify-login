import stocks from '../../data/stocks'

const state = {
  stocks: []
}

const mutations = {
/* this is a constant which takes advantage of linters */
  'SET_STOCKS' (state, stocks) {
    state.stocks = stocks
  },
  'RND_STOCKS' () {
  }
}

const actions = {
  buyStocks: ({commit}, order) => {
    commit('BUY_STOCKS', order)
  },
  initStocks: ({commit}) => {
    commit('SET_STOCKS', stocks)
  },
  randomizeStocks: ({commit}) => {
    commit('RND_STOCKS')
  }
}

const getters = {
  stocks: state => {
    return state.stocks
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
