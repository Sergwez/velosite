<template>
  <v-sheet class="pt-10" >
    <v-row
    class="pa-0 ma-0"
    v-if="currentProduct"
    >
      <v-col class="pa-0 ma-0">
        <v-breadcrumbs>
          <router-link
          class="text-decoration-none"
          to="/"
          color="white--text"
          tag="a"
          style="cursor:pointer"
          >
            Главная
          </router-link>
          <v-icon>mdi-chevron-right</v-icon>
          <router-link
          class="text-decoration-none"
          to="/catalog"
          color="white--text"
          tag="a"
          style="cursor:pointer"
          >
            Каталог
          </router-link>
          <v-icon>mdi-chevron-right</v-icon>
          <router-link
          class="text-decoration-none"
          :to="'/catalog?vendor='+currentProduct.vendor"
          color="white--text"
          tag="a"
          style="cursor:pointer"
          >
            {{currentProduct.vendor}}
          </router-link>
          <v-icon>mdi-chevron-right</v-icon>
          <v-breadcrumbs-item >
            {{currentProduct.model}}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row
    v-if="currentProduct"
    justify="center"
    >
      <v-col
      :z-index="0"
      class="pa-2"
      cols="12"
      xl="6"
      lg="7"
      md="12"
      sm="12"
      xs="12">
        <v-card
        :absolute="absolute"
        v-on:mouseover="hover  = true"
        v-on:mouseleave="hover = false"
        >
          <v-img  v-if="Array.isArray(currentProduct.picture)" :src="swapeImage=='' ? currentProduct.picture[0] : swapeImage" aspect-ratio="1.5" contain >
          </v-img>
          <v-img v-else :src="currentProduct.picture " aspect-ratio="1.5" contain >
          </v-img>
          <v-row justify="center">
            <v-overlay
            v-if="hover"
            :value="hover"
            :absolute="absolute"
            >
            <v-btn
            class="py-2"
            elevation="4"
            x-large
            v-on:click="dialog = true"
            >
              Увеличить
              <v-icon color="white">mdi-magnify-scan</v-icon>
            </v-btn>
          </v-overlay>
        </v-row>
        <v-dialog
        fullscreen
        v-model="dialog"
        transition="slide-y-transition"
        >
        <v-col
        class="pa-0 white ma-auto"
        cols="12"
        xl="12"
        lg="12"
        md="12"
        sm="12"
        xs="12"
        >
        <v-row
        justify="end"
        class="ma-0"
        >
          <v-btn
          absolute
          v-on:click="dialog=false"
          text class="px-5"
          style="z-index: 500;"
          >
            Закрыть [x]
          </v-btn>
        </v-row>
        <v-row
        justify="space-between"
        align="center"
        class="ma-0"
        :z-index="-1"
        >
          <v-img
          v-if="Array.isArray(currentProduct.picture)"
          :src="swapeImage=='' ? currentProduct.picture[0] : swapeImage"
          contain height="100vh"
          width="100vh"
          ></v-img>
          <v-img
          v-else
          :src="currentProduct.picture"
          contain height="100vh"
          width="100vh">
          </v-img>
          <v-btn
          v-if="Array.isArray(currentProduct.picture)"
          absolute
          color="transparent"
          height="100%"
          large v-on:click="slideImages(-1)"
          >
            <v-icon color="gray">mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
          v-if="Array.isArray(currentProduct.picture)"
          absolute
          transparent
          color="transparent"
          height="100%"
          large
          v-on:click="slideImages(+1)"
          style="right: 0;"
          >
            <v-icon color="gray">mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-dialog>
  </v-card>
<v-row v-if="Array.isArray(currentProduct.picture)">
  <v-col
  v-for="img of currentProduct.picture"
  :key="img"
  v-on:mouseover="swapeImage = img"
  class="pa-2"
  cols="12"
  xl="2"
  lg="2"
  md="2"
  sm="2"
  xs="2">
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 12 : 2">
      <v-img
      :src="img"
      aspect-ratio="1.5"
      contain
      >
      </v-img>
    </v-card>
  </v-hover>
</v-col>
</v-row>
</v-col>
<v-col
class="pa-2"
cols="12"
xl="4"
lg="5"
md="12"
sm="12"
xs="12">
<v-card class="pa-5">
  <h1
  class="pt-6 pl-4 grey--text text--darken-3"
  >
    {{currentProduct.vendor}}
    {{currentProduct.model}}
  </h1>
  <v-card-text>
    Производитель: {{currentProduct.vendor}}
  </v-card-text>
  <v-card-text>
    Есть в наличии: {{currentProduct._available == 'true' ? 'Да' : 'Нет'}}
  </v-card-text>
  <v-card-text>
    Есть доставка: {{currentProduct.store == 'true' ? 'Да' : 'Нет'}}
  </v-card-text>
  <v-card-text v-if="currentProduct.oldprice">
    Старая цена: {{currentProduct.oldprice | correctPrice}}
  </v-card-text>
  <v-row>
    <v-card-title class="ml-3">
      Цена:  {{currentProduct.price | correctPrice}}
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-hover v-slot:default="{ hover }">
        <v-row
        v-if="USER_CART.some(i => i.id == currentProduct._id) == false"
        class="mr-3">
          <v-spacer></v-spacer>
          <v-btn
          :elevation="hover ? 6 : 2" class="white--text px-7 "
          x-large
          outlined
          v-on:click="addToCart(currentProduct._id, 1)"
          color="primary"
          >
            В корзину
          </v-btn>
        </v-row>
        <v-row
        v-else
        class="mr-3"
        >
          <v-spacer></v-spacer>
          <v-btn
          disabled
          class="px-7"
          x-large
          outlined>
            <v-icon>mdi-check</v-icon>
            Добавлено
          </v-btn>
          <!--<v-card-text class="pa-0 ma-0 text-right text-decoration-underline text--secondary" style="cursor:pointer" v-on:click="addToCart(currentProduct._id, -1)">Отменить</v-card-text>-->
        </v-row>
      </v-hover>
    </v-card-actions>
  </v-row>
</v-card>
<v-card class="mt-5 pa-5" >
  <v-card-text>
    <h2 class="font-weight-regular">
      {{currentProduct.description}}
    </h2>
  </v-card-text>
</v-card>
</v-col>
</v-row>
</v-sheet>
</template>
<script>
import Vue from 'vue';
import {mapGetters, mapActions} from 'vuex'
export default {
  data(){
    return{
      idProduct:this.$route.query.id,
      swapeImage:'',
      hover:false,
      absolute:true,
      dialog:false,
    }
  },
  computed:{
    ...mapGetters(['ALL_PRODUCTS', 'USER_CART']),
    currentProduct(){
      return this.ALL_PRODUCTS.filter(i => i._id == this.$route.query.id)[0]
    }
  },
  methods:{
    ...mapActions(['FETCH_PRODUCTS', 'CREATE_CART']),
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
    },
    //проверка на количество картинок
    isArr(arr){
      if(Array.isArray(arr)){
        return arr[0]
      }else{
        return arr
      }
    },
    slideImages(step){//слайдер для картинок, step либо +1 либо -1
      let nextIndex = this.currentProduct.picture.findIndex(pic => pic ==this.swapeImage)//находим индек текущей картинки
      if (nextIndex == -1){//если картинка не найдена, ставим первую
        this.swapeImage = this.currentProduct.picture[0+step]
      }  else if(nextIndex == 0&&step==-1){//если картинка первая и при нажатии на предыдущую картинку, переходим на последнюю
        this.swapeImage = this.currentProduct.picture[nextIndex + this.currentProduct.picture.length-1]
      }else if (nextIndex == this.currentProduct.picture.length-1&&step==+1){//если картинка последняя, то переходим на первую
        this.swapeImage = this.currentProduct.picture[0]
      }else{//иначе просто листаем картинки при нажатии на кнопки
        this.swapeImage = this.currentProduct.picture[nextIndex + step]
      }
    }
  },
  filters:{
    correctPrice: function (num) {
      if(num){
        return Number(num).toLocaleString('ru', {style: 'currency', currency: 'RUB', minimumFractionDigits: '0'})
      }
    },
  },
  async mounted(){
    this.FETCH_PRODUCTS()
  }
}
</script>
<style scoped>
</style>
