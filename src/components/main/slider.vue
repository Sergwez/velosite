<template>
  <v-carousel
  hide-delimiter-background
  cycle
  interval="4000"
  show-arrows-on-hover
  light height="auto"
  >
    <v-carousel-item
    v-for="(image,i) in images"
    :key="i"
    >
      <v-sheet
      color="white"
      height="100%"
      >
        <router-link
        :to="image.link"
        style="cursor:pointer"
        >
          <v-img
          :src="image.src"
          contain aspect-ratio="2.5"
          />
        </router-link>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data(){
    return{
      images: [
        {
          src: 'https://www.velosklad.ru/i/models/big/20585.jpg',
          link: '/catalog/product?id=20585',

        },
        {
          src: 'http://www.velosklad.ru/i/models/big/19791.jpg',
          link: '/catalog/product?id=19791',
        },
        {
          src: 'http://www.velosklad.ru/i/models/big/18375.jpg',
          link: '/catalog/product?id=18375',
        },
        {
          src: 'https://www.velosklad.ru/i/fotodop/big/38286.jpg',
          link:'/catalog/product?id=19399',
        },
      ],
    }
  },
  computed:{
    ...mapGetters(['ALL_PRODUCTS'])
  },

  methods:{
    ...mapActions(['FETCH_PRODUCTS'])

  },
  async mounted(){
    this.FETCH_PRODUCTS()
  }
}
</script>
