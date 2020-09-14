import Vue from 'vue'

export const loadData = ({commit}) => {
  Vue.http.get('data.json')
    .then(response => response.json())
    .then(data => {
      if (data) {
        commit('SET_FUNDS', data.funds)
        commit('SET_PORTFOLIO', data.portfolio)
        commit('SET_STOCKS', data.stocks)
      }
    })
}
