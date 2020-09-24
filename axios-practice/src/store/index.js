import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import router from "../router/index";

Vue.use(Vuex);

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
    AUTH_LOGOUT(state) {
      state.auth.idToken = null;
      state.auth.userId = null;
      state.auth.user = null;
    },
    AUTH_USER(state, authUser) {
      state.auth.idToken = authUser.idToken;
      state.auth.userId = authUser.userId;
    },
    ADD_USER(state, user) {
      state.auth.user = user;
    },
    ADD_USERS(state, users) {
      state.users = users;
    }
  },
  actions: {
    autoLogout ({ dispatch }, logoutTime) {
      setTimeout(() => {
        dispatch('logout')
      }, logoutTime * 1000);
    },
    signUp({ commit, dispatch }, userData) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0iXf21dGJYr-jgWXlVnyXeISv4ycScK8",
          {
            email: userData.email,
            password: userData.password,
            returnSecureToken: true
          }
        )
        .then(response => {
          console.log(response);
          commit("AUTH_USER", {
            idToken: response.data.idToken,
            userId: response.data.localId
          });
          dispatch("storeUser", userData);
          dispatch('autoLogout', response.data.expiresIn)
        })
        .catch(errors => console.log(errors));
    },
    signIn({ commit, dispatch }, userData) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0iXf21dGJYr-jgWXlVnyXeISv4ycScK8",
          {
            email: userData.email,
            password: userData.password,
            returnSecureToken: true
          }
        )
        .then(response => {
          console.log(response);
          commit("AUTH_USER", {
            idToken: response.data.idToken,
            userId: response.data.localId
          });
          router.replace("/");
          dispatch('autoLogout', response.data.expiresIn)
        })
        .catch(errors => console.log(errors));
    },
    storeUser({ state }, userData) {
      if (!state.auth.idToken) return;
      axios
        .post(
          "https://vuejs-stock-trader-8b558.firebaseio.com/users.json" +
            "?auth=" +
            state.auth.idToken,
          userData
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchUser({ commit, state }) {
      if (!state.auth.idToken) return;
      axios
        .get(
          "https://vuejs-stock-trader-8b558.firebaseio.com/users.json" +
            "?auth=" +
            state.auth.idToken
        )
        .then(response => {
          console.log(response.data);
          const users = [];
          for (const key in response.data) {
            users.push(response.data[key]);
            // Adding only the first user
            commit("ADD_USER", users[0]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchUsers({ commit, state }) {
      if (!state.auth.idToken) return;
      axios
        .get(
          "https://vuejs-stock-trader-8b558.firebaseio.com/users.json" +
            "?auth=" +
            state.auth.idToken
        )
        .then(response => {
          console.log(response.data);
          const users = [];
          for (const key in response.data) {
            users.push(response.data[key]);
            commit("ADD_USERS", users);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    logout({ commit }) {
      commit("AUTH_LOGOUT");
      router.replace("/sign-in");
    }
  },
  getters: {
    user(state) {
      return !state.auth.user ? null : state.auth.user;
    },
    userAuth(state) {
      return state.auth;
    },
    isAuthenticated(state) {
      return state.auth.idToken !== null;
    },
    users(state){
      return state.users
    }
  }
});
