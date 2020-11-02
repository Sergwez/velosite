import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import cart from '@/views/cart'
import product from '@/views/product'
import catalog from '@/views/catalog'
import delivery from '@/views/delivery'
import qa from '@/views/qa'
import pay from '@/views/pay'


Vue.use(Router);

export default new Router({
  mode:'history',
  routes:[
    {
      path:'/',
      component: home,
    },
    {
      path:'/cart',
      component:cart
    },
    {
      path:'/delivery',
      component:delivery
    },
    {
      path:'/qa',
      component:qa
    },
    {
      path:'/pay',
      component:pay
    },
    {
      path:'/catalog',
      component:catalog
    },
    {
      path:'/catalog/product',
      component:product
    }


  ]
})
