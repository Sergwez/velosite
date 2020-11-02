<template>
  <v-sheet>
    <template>
      <div class="text-center ma-2" v-on:mouseover = "timeout = '-1'" v-on:mouseleave = "timeout = '4000'">
        <v-snackbar  top right color="success white--text" v-model="snackbarForAdd">
          Товар добавлен в
          <router-link :to="{path: '/cart'}" exact class=" white--text">
            корзину!
          </router-link>
        </v-snackbar>
      </div>
    </template>
    <v-app-bar
    class="ma-auto pa-0"
    flat color='secondary darken-1'
    dark
    >
    <v-container>
      <v-row>
        <v-row class="d-flex d-md-none ">
          <v-menu open-on-hover bottom offset-y >
            <template v-slot:activator="{ on, attrs }">
              <v-toolbar-title
              v-bind="attrs"
              v-on="on">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                Меню
              </v-toolbar-title>
            </template>
            <v-list>
              <v-list-item
              v-for="elem in menu"
              :key="elem.path"
              >
                <router-link
                tag="v-list-item-title"
                style="cursor:pointer"
                :to="{path: elem.path}">
                  {{elem.name}}
                </router-link>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-row class="d-none d-md-flex" >
          <router-link
          v-for="elem in menu"
          :key="elem.path"
          :to="{path: elem.path}"
          tag="v-card-title"
          style="cursor:pointer"
          class="mx-4 pa-0"
          >
            {{elem.name}}
          </router-link>
        </v-row>
        <v-spacer></v-spacer>
        <v-row
        v-if="showSearch"
        justify="end"
        >
          <v-col
          cols="12"
          xl="8"
          lg="12"
          md="12"
          sm="12"
          xs="12"
          class="mr-5 pa-0"
          >
            <v-text-field
            class="mb-n6 mt-1 pa-0"
            outlined
            dense
            light
            clearable
            background-color="white"
            color='gray'
            autofocus
            placeholder="Поиск по названию"
            v-model="search"
            v-on:focusout="!search ? showSearch = false : showSearch = true"
            v-on:change = "changeSearch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
        v-else
        icon
        v-on:click="showSearch = true"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <router-link
        :to="{path: '/cart'}"
        exact
        class="text-decoration-none"
        >
          <v-btn icon>
            <v-badge
            :value="countsProductsOfCart"
            :content="countsProductsOfCart"
            color="red" class="pa-0 ma-0"
            ><v-icon color="white">mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </router-link>
      </v-row>
    </v-container>
  </v-app-bar>
</v-sheet>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data(){
    return{
      timeout: 4000,
      snackbarForAdd: false,
      showSearch: this.$route.query.search ? true : false,
      search: this.$route.query.search ? this.$route.query.search : undefined,
      watchChangeCart:['',''],
      menu:[
        {
          path:'/catalog',
          name:'Каталог'
        },
        {
          path:'/delivery',
          name:'Доставка'
        },
        {
          path:'/pay',
          name:'Оплата'
        },
        {
          path:'/qa',
          name:'Вопрос/Ответ'
        },
      ]

    }
  },
  methods:{
    ...mapActions(['FETCH_CATEGORIES', 'CREATE_CART']),
    //при поиске получаем query параметры, записываем В объект, добавляем новый объект для query поиска и переходим на новую страницу
    changeSearch(){
      let newPageQueries = {}
      for (let attrname in this.$route.query) { newPageQueries[attrname] = this.$route.query[attrname]; }
      newPageQueries.search = this.search
      this.$router.push({path:'/catalog', query: newPageQueries})
    },
  },
  watch:{
    //отслеживанием измения в корзине: записываем в массив количество позиций, где [1] количество до добавления в корзину, а [0] после. Вызываем алерт если измения были
    USER_CART: function () {
      this.watchChangeCart.unshift(this.countsProductsOfCart)
      this.watchChangeCart.splice(2,1)
      if(this.watchChangeCart[0]>this.watchChangeCart[1] && this.$route.path != "/cart"){
        this.snackbarForAdd = true
      }
    }
  },
  async mounted(){
    this.FETCH_CATEGORIES()
  },
  computed:{
    ...mapGetters(['USER_CART', 'ALL_PRODUCTS', 'FILTERED_PRODUCTS', 'ALL_CATEGORIES']),
    //количество позиций в корзине
    countsProductsOfCart(){
      return this.USER_CART.length
    },
  },
}
</script>
