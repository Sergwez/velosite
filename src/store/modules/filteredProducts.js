//Отфильтрованные товары
export default {
  actions:{
    async FETCH_FILTERED_PRODUCTS(ctx, queris){//queris объект, где каждый элемент объкта - фильтр для продуктов
      console.log("FETCH_FILTERED_PRODUCTS")
      const res =  await fetch('/feed.json')
      const feed = await res.json()
      let fProducts = feed.yml_catalog.shop.offers.offer
      //Фильтр по скидке
      if(queris.discount != ''){
        fProducts = fProducts.filter(i =>  i.oldprice )
      }
      //Фильтр по точному совпадению для категорий и производителей
      for(const param in queris){//цикл на получение параметров из объекта
        if(!queris[param]){continue}//если параметр пуст или его нет, то пропускаем итерацию
        let paramGroupProduct = []//временный массив для хранения отфильтрованых товаров
        for( const index in queris[param]){//массив для получения значений из параметров
          paramGroupProduct = fProducts.filter(i => i.[param] == String(queris[param][index])).concat(paramGroupProduct)//сраниваем каждый товар на наличие query параметров и ссумируем, это фильтр по точному совпадению, т.е. для категории и производи
        }
        if(paramGroupProduct != ''){ //если такие товары есть, то перезаписываем весь массив товаров
          fProducts = paramGroupProduct
        }
      }
      //два фильтра для фильтрации по цене
      if(queris.minprice != ''){
      fProducts = fProducts.filter(i => Math.round(i.price) >= queris.minprice )
      }
      if(queris.maxprice != ''){
        fProducts = fProducts.filter(i => Math.round(i.price) <= queris.maxprice )
      }

      if(queris.search != ''){//поиск по ключевому слову
        fProducts = fProducts.filter( function (product) {
          const arrProductName = (product.name.split(' '))//создаем массив из названия товара
          const arrProductSearch = (String(queris.search).split(' '))//создаем массив из ключевой фразы поиска
          for(const el of arrProductName){
            for (const searchWord of arrProductSearch){
              if(String(searchWord).toLowerCase() == String(el).toLowerCase()){ //сравниваем каждое слово(элемент первого и второго массива) между собой
                return true //выводим true для фильтра, если есть совпадения
              }
            }
          }
        })
      }
      //сортировка по алфовиту A-Z
      if(queris.sort=="A-Z"){
        fProducts = fProducts.sort(function (a,b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
      }else if(queris.sort=="Z-A"){//сортировка по алфовиту Z-A
        fProducts = fProducts.sort(function (b,a) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
      }else if(queris.sort=="priceMin"){//сортировка по цене 0-9
        //alert("priceMin "+queris.sort)
        fProducts = fProducts.sort(function (a,b) {
          if (Number(a.price) > Number(b.price)) {
            return 1;
          }
          if (Number(a.price) < Number(b.price)) {
            return -1;
          }
          return 0;
        })
      }else if(queris.sort=="priceMax"){//сортировка по цене 9-0
        //alert("priceMax "+queris.sort)
        fProducts = fProducts.sort(function (c, d) {
          if (Number(c.price) < Number(d.price)) {
            return 1;
          }
          if (Number(c.price) > Number(d.price)) {
            return -1;
          }
          return 0;
        })
      }
      ctx.commit('UPDATE_FILTERED_PRODUCTS', fProducts)
    }
  },
  mutations:{
    UPDATE_FILTERED_PRODUCTS(state, fProducts){
      state.fProducts = fProducts
    }
  },
  state:{
    fProducts:[]
  },
  getters:{
    FILTERED_PRODUCTS(state){
      return state.fProducts
    }
  },
}
