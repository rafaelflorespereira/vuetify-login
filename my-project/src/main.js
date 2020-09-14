// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.http.options.root = 'https://vuejs-stock-trader-8b558.firebaseio.com/'

Vue.filter('currency', value => {
  return 'R$' + value.toLocaleString()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
