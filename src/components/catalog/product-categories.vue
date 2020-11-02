<template>
  <v-container class="brown lighten-5 mt-4" >
    <v-alert
    class="mt-2"
    border="left"
    color="deep-orange darken-1 white--text"
    v-if="!gotProduct"
    >
    Товар не найден! Попробуйте изменить условия фильтрации
  </v-alert>
  <v-row>
    <v-col
    class="pa-2"
    cols="12"
    xl="3"
    lg="4"
    md="6"
    sm="6"
    xs="12"
    v-for="product of sliceProducts"
    :key="product._id"
    >
    <v-card>
      <v-row
      justify="end"
      class="pt-1 mb-n9 mx-0 pa-0"
      v-if="product.oldprice"
      >
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
            class="ma-0 pa-0"
            color="transparent"
            label text-color="red"
            style="z-index:1"
            v-bind="attrs"
            v-on="on"
            >
              <v-icon
              class="ma-1 pa-0"
              style="z-index:10"
              >mdi-sale</v-icon>
            </v-chip>
          </template>
          <span>
            Скидка {{Math.floor((Number(product.oldprice)-Number(product.price))/Number(product.oldprice)*100)   }}%
          </span>
        </v-tooltip>
      </v-row>
      <router-link
      :title="product.name"
      style="cursor:pointer;"
      :to="{path: '/catalog/product',query: { id: product._id }}"
      >
        <v-img
        :src="product.picture | isArr"
        aspect-ratio="1.7"
        contain
        >
          <v-card v-slot:placeholder>
            Изображние не загружено
          </v-card>
          <template v-slot:placeholder>
            <v-sheet>
              <v-skeleton-loader
              type="card"
              >
            </v-skeleton-loader>
          </v-sheet>
        </template>
      </v-img>
    </router-link>
    <v-divider class="mt-10" ></v-divider>
    <router-link
    :title="product.name"
    style="cursor:pointer;"
    tag="v-card-title"
    :to="{path: '/catalog/product',query: { id: product._id }}"
    class="col-11 text-truncate"
    >
      {{product.name}}
    </router-link>
    <v-card-text class="ml-n1" >
      Производитель:{{product.vendor}}
    </v-card-text>
    <v-card flat>
      <v-card-actions>
        <v-row>
          <v-card-text
          class="mb-n13 mt-n4 text-decoration-line-through"
          v-if="product.oldprice"
          v-on:click="GET_QUERIES({vendor:'vendor'})"
          >
            {{Number(product.oldprice) | correctPrice}}
          </v-card-text>
          <v-card-title
          class="ma-0"
          v-on:click="GET_QUERIES({vendor:'vendor'})"
          >
            {{Number(product.price) | correctPrice}}
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn
          v-if="USER_CART.some(i => i.id == product._id) == false"
          class="mx-4 px-4"
          color="primary white--text"
          large v-on:click="addToCart(product._id, 1)"
          >
            В корзину
          </v-btn>
          <v-btn
          v-else
          class="mx-4 px-4"
          outlined
          v-on:click="addToCart(product._id, 1)"
          color="primary white--text"
          large
          >
            <v-icon>mdi-check</v-icon>
            Добавлено
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-card>
  <v-skeleton-loader
  v-if="!product.name"
  class="mx-auto"
  max-width="300"
  type="card"
  ></v-skeleton-loader>
</v-col>
</v-row>
<v-row>
  <v-col>
    <template>
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col
            class="pa-0"
            cols="12"
            xl="4"
            lg="4"
            md="6"
            sm="6"
            xs="12">
            <v-container class="max-width">
              <v-pagination
              color="primary"
              v-model="page"
              v-on:input="nextPage()"
              :total-visible="7"
              class="my-4 mx-0 px-0"
              :length="countPages"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
</v-col>
</v-row>
</v-container>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Vue from 'vue';
export default {
  data(){
    return{
      gotProduct:true,
      page: 1,
    }
  },
  computed:{
    ...mapGetters(['FILTERED_PRODUCTS', 'USER_CART']),
    //обрезаем количество продуктов в зависимости от фильтра
    sliceProducts(){
      return this.FILTERED_PRODUCTS.slice((this.page-1)*this.countProductsForPage,this.page*this.countProductsForPage)
    },
    //подсчет количества страниц для отфильтрованных товаров
    countPages(){
      return Math.ceil(this.FILTERED_PRODUCTS.length / this.countProductsForPage)
    },
    //количество товаров на страницу
    countProductsForPage (){
      if(this.$route.query.products){
        return this.$route.query.products
      } else {
        return 16
      }
    },
  },
  watch:{
    //при измении query параметров запрашиваем товары по новому фильтру
    $route: function () {
      this.FETCH_FILTERED_PRODUCTS(this.queris())
    }
  },
  methods:{
    ...mapActions(['FETCH_FILTERED_PRODUCTS', 'GET_QUERIES', 'CREATE_CART']),
    //добавление в корзину новой позиции или изменение количества определенной позиции товара
    addToCart(id, count){
      let sendToCart =[]
      let cart = this.USER_CART
      sendToCart =
      {
        id: id,
        count:count
      }
      let findInd
      findInd = cart.findIndex(i =>i.id == sendToCart.id )
      if(findInd == -1){
        Vue.set(cart, cart.length, sendToCart)
      } else{
        Vue.set(cart[findInd], "count", (cart[findInd].count + sendToCart.count))
        if(cart[findInd].count <=0){
          cart.splice(findInd, 1)
        }
      }
      this.CREATE_CART(cart)
    },
    correctPrice(num){
      return num.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ').slice(0,-3)
    },
    //объединяем два объекта в новый. В первом объекте текущие query параметры, во втором номер страницы, на которую нужно перейти
    nextPage(){
      let newPageQueries = {}
      for (var attrname in this.$route.query) { newPageQueries[attrname] = this.$route.query[attrname]}
      newPageQueries.page = this.page
      this.$router.push({query: newPageQueries})
    },
    //Выделяем кнопку пагинации, если в параметрах ссылки есть "page"
    currenPage(){
      if(this.$route.query.page){
        this.page = Number(this.$route.query.page)
      }
    },
    //собираем объект с query параметрами
    queris(){
      let queris = {
        "categoryId": this.getQuery("category"),
        "vendor": this.getQuery("vendor"),
        "minprice":this.getQuery("minprice"),
        "maxprice":this.getQuery("maxprice"),
        "discount":this.getQuery("discount"),
        "sort":this.getQuery("sort"),
        "search":this.getQuery("search"),
      }
      return queris
    },
    //получаем параметры из url
    getQuery(param){
      if(this.$route.query[param]){
        return this.$route.query[param].split(',').map(i => String(i))
      }else{
        return []
      }
    },
    //вывод сообщения если товар не найден при фильтрации
    alertForEmptyProducts(){
      if(this.FILTERED_PRODUCTS.length >= 1){
        this.gotProduct=true
      }else {
        this.gotProduct=false
      }
    }
  },
  filters:{
    isArr: function (arr){
      if(Array.isArray(arr)){
        return arr[0]
      }else{
        return arr
      }
    },
    correctPrice: function (num) {
      if(num){
        return num.toLocaleString('ru', {style: 'currency', currency: 'RUB', minimumFractionDigits: '0'})
      }
    },
  },
  async mounted(){
    this.FETCH_FILTERED_PRODUCTS(this.queris()),
    this.currenPage()
  },
  async updated(){
    this.alertForEmptyProducts(),
    this.currenPage()
  }
}
</script>
<style scoped>
</style>
