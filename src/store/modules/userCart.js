//Массив позициями в корзине
export default {
  actions:{
    async CREATE_CART(ctx, newCartElem){
      let cart = []
      if(newCartElem != undefined){
        for(let i =0; i<newCartElem.length; i++){
          cart.splice(i,0,newCartElem[i])
        }
      }
      ctx.commit('UPDATE_CART', cart)
    }
  },
  mutations:{
    UPDATE_CART(state, cart){
      state.cart = cart
    }
  },
  state:{
    cart:[],
  },
  getters:{
    USER_CART(state){
      return state.cart
    }
  },
}
