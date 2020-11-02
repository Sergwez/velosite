<template>
  <v-row class="ma-0 pa-0">
    <v-col class="pa-0 ma-0">
      <v-breadcrumbs>
        <router-link
        class="text-decoration-none"
        to="/"
        color="white--text"
        tag="a"
        style="cursor:pointer"
        >  Главная</router-link>
        <v-icon>mdi-chevron-right</v-icon>
        <router-link
        class="text-decoration-none"
        to='catalog'
        color="white--text"
        tag="a"
        style="cursor:pointer"
        >  Каталог</router-link>
      </v-breadcrumbs>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data(){
    return{
      items: [
        {
          text: 'Главная',
          disabled: false,
          href: '/',
        },
        {
          text: 'Каталог',
          disabled: false,
          href: this.$route.path,
        },
        {
          text: '',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }
  }
}
</script>

<style>

</style>
