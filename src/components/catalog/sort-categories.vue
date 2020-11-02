<template>
  <v-row
  class="ma-0 pa-0"
  justify="end"
  >
    <v-col
    class="d-flex my-0 mr-6 pa-0"
    style="height:56px"
    xl="3" lg="4" md="5" sm="12" xs="12"
    >
      <v-select
      :items="products"
      item-text="text"
      item-value="value"
      v-model="defaultSelectProducts"
      v-on:input="pushCountProductsQuery"
      class="mt-2"
      label="Выводить:"
      dense
      outlined
      ></v-select>
    </v-col>
    <v-col
    class="d-flex my-0 mr-6 pa-0"
    style="height:56px"
    xl="6" lg="8" md="9" sm="12" xs="12"
    >
      <v-select
      :items="sorts"
      item-text="text"
      item-value="value"
      v-model="sortProduct"
      v-on:input="pushSortQuery"
      class="mt-2"
      label="Сортировка по:"
      dense
      outlined
      ></v-select>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data(){
    return{
      sortProduct:'',
      sorts:[
        {
          value:'A-Z',
          text:'Названию, с начала алфавита'
        },
        {
          value:'Z-A',
          text:'Названию, с конца алфавита'
        },
        {
          value:'priceMin',
          text:'Цене, сначала дешевле'
        },
        {
          value:'priceMax',
          text:'Цене, сначала дороже'
        }
      ],
      products:[
        {
          value:'16',
          text:'16 товаров'
        },
        {
          value:'24',
          text:'24 товаров'
        },
        {
          value:'32',
          text:'32 товаров'
        },
        {
          value:'48',
          text:'48 товаров'
        },
      ],
      defaultSelectProducts:
      {
        value:'16',
        text:'16 товаров'
      },
    }
  },
  methods:{
    //Сортировака. Получаем query и добавляем query параметр для сортировки
    pushSortQuery(){
      if(this.sortProduct != this.$route.query.sort){
        let newPageQueries = {}
        for (var attrname in this.$route.query) { newPageQueries[attrname] = this.$route.query[attrname]; }
        newPageQueries.sort = this.sortProduct
        this.$router.push({query: newPageQueries})
      }
    },//Получаем query и добавляем query параметр для количества товаров на странице
    pushCountProductsQuery(){
      if(this.defaultSelectProducts != this.$route.query.products){
        let newPageQueries = {}
        for (var attrname in this.$route.query) { newPageQueries[attrname] = this.$route.query[attrname]; }
        newPageQueries.products = this.defaultSelectProducts
        this.$router.push({query: newPageQueries})
      }
    },
    getQuery(){
      if(this.$route.query.sort){
        this.sortProduct = this.$route.query['sort']
      }
      if(this.$route.query.products){
        this.defaultSelectProducts = this.$route.query.products
      }
    }
  },
  async mounted(){
    this.getQuery()
  },
  async updated(){
    this.getQuery()
  },
}
</script>
