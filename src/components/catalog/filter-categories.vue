<template>
  <v-container class="brown lighten-5 mt-4" >
    <v-row>
      <v-col class="pt-3 " >
        <v-card>
          <v-card-title>Фильтры</v-card-title>
          <v-card-text class="ma-0 pa-0">
            <v-expansion-panels flat >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <p class="ma-0 pa-0">
                    <v-badge
                    :value="showBadge('category')"
                    color="primary"
                    class="mr-4"
                    dot
                    >
                    <v-icon   color="grey">
                      mdi-file-tree-outline
                    </v-icon>
                  </v-badge>Категория</p>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-checkbox
                  v-for="category in ALL_CATEGORIES"
                  :key="category._id"
                  :label="category.__text"
                  color="blue"
                  :value="category._id"
                  class="ma-0 pa-0"
                  v-on:change="changeFilter()"
                  v-model="query.selectedCategories"
                  ></v-checkbox>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <p class="ma-0 pa-0">
                    <v-badge
                    :value="showBadge('minprice')||showBadge('maxprice')"
                    color="primary"
                    class="mr-4"
                    dot>
                    <v-icon color="grey">
                      mdi-currency-rub
                    </v-icon>
                  </v-badge>
                  Стоимость
                </p>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                v-model="query.startPriceFilter"
                v-on:change="changeFilter()"
                suffix="₽"
                prefix="От"
                type = "number"
                ></v-text-field>
                <v-text-field
                v-model="query.endPriceFilter"
                v-on:change="changeFilter()"
                suffix="₽"
                prefix="До"
                type = "number"
                ></v-text-field>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <p class="ma-0 pa-0">
                  <v-badge :value="showBadge('vendor')"
                  color="primary"
                  class="mr-4"
                  dot
                  >
                  <v-icon color="grey">
                    mdi-flag-outline
                  </v-icon>
                </v-badge>
                Производитель
              </p>
            </v-expansion-panel-header>
            <v-expansion-panel-content v-if="ALL_PRODUCTS.length>0">
              <v-checkbox
              v-for="vendor in getUniqueVendor()"
              :key="vendor"
              :label="vendor"
              color="blue"
              :value="vendor"
              class="ma-0 pa-0"
              v-on:change="changeFilter()"
              v-model="query.selectedVendors"
              ></v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <p class="ma-0 pa-0">
                <v-badge
                :value="showBadge('discount')"
                color="primary"
                class="mr-4"
                dot
                ><v-icon color="grey">
                  mdi-label-percent-outline
                </v-icon>
              </v-badge>
              Скидка
            </p>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-checkbox
            label="Товары со скидкой"
            color="blue"
            value="true"
            class="ma-0 pa-0"
            v-on:change="changeFilter()"
            v-model="query.selectOnlyDiscount"
            ></v-checkbox>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</v-col>
</v-row>
</v-container>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data(){
    return{
      query:{
        selectedCategories:this.getQuery("category"),
        selectedVendors: this.getQuery("vendor"),
        startPriceFilter: this.getQuery("minprice"),
        endPriceFilter: this.getQuery("maxprice"),
        selectOnlyDiscount: this.getQuery("discount"),
        sortProduct: this.getQuery("sort"),
        searchProduct: this.getQuery("search"),
        countProducts: this.getQuery("products"),
        getPage: this.getQuery("page"),
      }
    }
  },
  methods:{
    ...mapActions(['FETCH_CATEGORIES', 'FETCH_PRODUCTS']),
    //обходим каждый товар, записываем производителей, удаляем дубли
    getUniqueVendor(){
      let arrProduct = []
      for (let product of this.ALL_PRODUCTS){
        if(!product) continue
        arrProduct.push(product.vendor)
      }
      arrProduct = [...new Set(arrProduct)]
      return arrProduct
    },
    //Меняем категории через чекбокс
    changeFilter(){
      this.$router.push({query:
        this.queryParams
      })
    },
    //показываем бейдж если используется какой либо фильтр
    showBadge(param){
      if(this.$route.query[param] == ''){
        return false
      }
      else if(this.$route.query[param] == undefined){
        return false
      }
      else {
        return true
      }
    },
    //Получаем категории из query, если они есть
    getQuery(param){
      if(!this.$route.query[param]){
        return []
      } else {
        return this.$route.query[param].split(',').map(idCat => String(idCat))
      }
    },
  },
  watch:{
    //следим за адресной строкой и записываем query параметры в переменые
    $route: function () {
      this.query.selectedCategories =this.getQuery("category"),
      this.query.selectedVendors = this.getQuery("vendor"),
      this.query.startPriceFilter = this.getQuery("minprice"),
      this.query.endPriceFilter = this.getQuery("maxprice"),
      this.query.selectOnlyDiscount = this.getQuery("discount"),
      this.query.sortProduct = this.getQuery("sort"),
      this.query.searchProduct = this.getQuery("search"),
      this.query.countProducts = this.getQuery("products"),
      this.query.getPage = this.getQuery("page")
    },
  },
  async mounted(){
    this.FETCH_CATEGORIES(),
    this.FETCH_PRODUCTS()
  },
  computed:{
    ...mapGetters(['ALL_CATEGORIES', 'ALL_PRODUCTS', 'FILTERED_PRODUCTS']),
    queryParams(){
      let  params = {
        category: String(this.query.selectedCategories),
        vendor: String(this.query.selectedVendors),
        minprice: String(this.query.startPriceFilter),
        maxprice: String(this.query.endPriceFilter),
        discount: String(this.query.selectOnlyDiscount),
        sort: String(this.query.sortProduct),
        search: String(this.query.searchProduct),
        products: String(this.query.countProducts),
        page: this.toFirstPage,
      }
      //удляем пустые query параметры
      for (let key of Object.keys(params)){
        if(params[key] == '' || params[key] == undefined){
          delete params[key]
        }
      }
      return params
    },
    //при изменении фильтра, перекидываем на первую страницу
    toFirstPage(){
      if(this.$route.query.page){
        return 1
      } else {
        return ''
      }
    }
  },
}
</script>
