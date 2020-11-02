import Vue from 'vue'
import store from './store'
import App from './app.vue'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import router from './router/router'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
