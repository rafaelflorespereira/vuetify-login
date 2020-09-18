import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      idToken: null,
      userId: null
    }
  },
  mutations: {
    'ADD_USER_ID' (state, userId) {
      state.auth.userId = userId
    },
    'ADD_ID_TOKEN' (state, tokenId) {
      state.auth.idToken = tokenId
    }
  },
  actions: {
    signUp ({ commit }, userData) {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0iXf21dGJYr-jgWXlVnyXeISv4ycScK8', {
        email: userData.email,
        password: userData.password,
        returnSecureToken: true
      })
        .then(response => {
          console.log(response)
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
          commit('ADD_ID_TOKEN', response.data.idToken)
          commit('ADD_USER_ID', response.data.localId)
        })
        .catch(errors => console.log(errors))
    }
  },
  getters: {
    userId (state) {
      return state.auth.userId
    }
  }
})
