import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      idToken: null,
      userId: null,
      user: null
    },
    users: []
  },
  mutations: {
    'AUTH_USER' (state, authUser) {
      state.auth.idToken = authUser.idToken
      state.auth.userId = authUser.userId
    },
    'ADD_USER' (state, user) {
      state.auth.user = user
    },
    'ADD_USERS' (state, users) {
      state.users = users
    }
  },
  actions: {
    signUp ({ commit, dispatch }, userData) {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0iXf21dGJYr-jgWXlVnyXeISv4ycScK8', {
        email: userData.email,
        password: userData.password,
        returnSecureToken: true
      })
        .then(response => {
          console.log(response)
          commit('AUTH_USER', {
            idToken: response.data.idToken,
            userId: response.data.localId
          })
          dispatch('storeUser', userData)
        })
        .catch(errors => console.log(errors))
    },
    login ({ commit }, userData) {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0iXf21dGJYr-jgWXlVnyXeISv4ycScK8', {
        email: userData.email,
        password: userData.password,
        returnSecureToken: true
      })
        .then(response => {
          console.log(response)
          commit('AUTH_USER', {
            idToken: response.data.idToken,
            userId: response.data.localId
          })
        })
        .catch(errors => console.log(errors))
    },
    storeUser ({ state }, userData) {
      if (!state.auth.idToken) return
      axios.post('https://vuejs-stock-trader-8b558.firebaseio.com/users.json' + '?auth=' + state.auth.idToken, userData)
        .then(response => {
          console.log(response)
        })
        .catch(error => { console.log(error) })
    },
    fetchUser ({ commit, state }) {
      if (!state.auth.idToken) return
      axios.get('https://vuejs-stock-trader-8b558.firebaseio.com/users.json' + '?auth=' + state.auth.idToken)
        .then(response => {
          console.log(response)
          commit('ADD_USER', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    user (state) {
      return !state.auth.user ? null : state.auth.user
    }
  }
})
