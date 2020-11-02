//Все позиции
export default {
  actions:{
    async FETCH_PRODUCTS(ctx){
      console.log("FETCH_PRODUCTS")
      const res =  await fetch('/feed.json')
      const feed = await res.json()
      let products = feed.yml_catalog.shop.offers.offer
      ctx.commit('UPDATE_PRODUCTS', products)
    }
},
  mutations:{
    UPDATE_PRODUCTS(state, products){
      state.products = products
    }
  },
  state:{
    products:[]
  },
  getters:{
    ALL_PRODUCTS(state){
      return state.products
    }
  },
}
