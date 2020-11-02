<template>
  <v-sheet align="center">
    <v-card-title class="mt-7">Популярные товары со скидкой:</v-card-title>
      <v-slide-group
      v-model="model"
      show-arrows
      >
        <v-slide-item
        v-for="product of saleProducts()"
        :key="product.name"
        >
          <v-card
          class="ma-4"
          height="350"
          width="250"
          >
          <router-link
          :to="'/catalog/product?id='+product._id"
          style="cursor:pointer"
          class="text-decoration-none"
          tag="span"
          >
          <v-img
          height="150"
          contain :src="Array.isArray(product.picture) ? product.picture[0] : product.picture"
          />
          <v-row
          height="200"
          align="center"
          >
            <v-col
            cols="12"
            xl="12"
            lg="12"
            md="12"
            sm="12"
            xs="12"
            class="ma-0 pa-0"
            >
              <v-row  justify="center">
                <div
                style="height:60px;"
                class="mx-7"
                >
                  <v-card-title
                  class="ma-0 pa-0"
                  >
                    {{product.name}}
                  </v-card-title>
                </div>
              </v-row>
            </v-col>
            <v-col
            cols="12"
            xl="12"
            lg="12"
            md="12"
            sm="12"
            xs="12"
            class="ma-0 pa-0">
              <v-row justify="center">
                <v-card-title
                class="pa-1 overline text-decoration-line-through ma-0"
                width="200">
                  {{Number(product.oldprice) | correctPrice}}
                </v-card-title>
              </v-row>
            </v-col>
            <v-col
            cols="12"
            xl="12"
            lg="12"
            md="12"
            sm="12"
            xs="12"
            class="ma-0 pa-0"
            >
              <v-row justify="center">
                <v-card-title
                class="mt-n4 pa-0"
                width="200"
                >
                  {{Number(product.price) | correctPrice}}
                </v-card-title>
              </v-row>
            </v-col>
            <v-col
            cols="12"
            xl="12"
            lg="12"
            md="12"
            sm="12"
            xs="12"
            class="ma-0 pa-0"
            >
              <v-row justify="center">
                <v-card-title
                class="display-2"
                >
                  -{{Math.floor((Number(product.oldprice)-Number(product.price))/Number(product.oldprice)*100)   }}%
                </v-card-title>
              </v-row>
            </v-col>
          </v-row>
        </router-link>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data(){
    return{
      model:false
    }
  },
  computed:{
    ...mapGetters(['ALL_CATEGORIES', 'ALL_PRODUCTS'])
  },

  methods:{
    ...mapActions(['FETCH_CATEGORIES', 'FETCH_PRODUCTS']),
    //выводим позиции со скидкой
    saleProducts(){
      if(this.ALL_PRODUCTS){
        return this.ALL_PRODUCTS.filter(products => products.oldprice != undefined ).slice(0,16)
      }
    }

  },
  filters:{
    correctPrice: function (num) {
      if(num){
        return num.toLocaleString('ru', {style: 'currency', currency: 'RUB'})
      }
    }
  },
  async mounted(){
    this.FETCH_PRODUCTS(),
    this.FETCH_CATEGORIES()
  }
}
</script>
