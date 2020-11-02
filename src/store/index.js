import Vue from 'vue'
import Vuex from 'vuex'
import allProducts from './modules/allProducts'
import filteredProducts from './modules/filteredProducts'
import categories from './modules/categories'
import userCart from './modules/userCart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    allProducts,
    filteredProducts,
    categories,
    userCart,
  }
})
