//Все категории
export default {
  actions:{
    async FETCH_CATEGORIES(ctx){
      console.log("FETCH_CATEGORIES")
      const res =  await fetch('/feed.json')
      const feed = await res.json()
      const categories = feed.yml_catalog.shop.categories.category
      ctx.commit('UPDATE_CATEGORIES', categories)
    }
  },
  mutations:{
    UPDATE_CATEGORIES(state, categories){
      state.categories = categories
    }
  },
  state:{
    categories:[]
  },
  getters:{
    ALL_CATEGORIES(state){
      return state.categories
    }
  },
}
