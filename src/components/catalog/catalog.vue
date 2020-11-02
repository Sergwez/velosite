<template>
  <v-container class="brown lighten-5 mt-10" >
        <v-card
        flat
        color="transparent"
        class="mx-3">
          <v-row>
            <v-col class="ma-0 pa-0">
              <breadcrumbs />
            </v-col>
            <v-col class="ma-0 pa-0">
              <sortCategories />
            </v-col>
        </v-row>
        </v-card>
    <v-row>
      <v-col
      class="pa-2"
      cols="12"
      xl="2"
      lg="3"
      md="4"
      sm="0"
      xs="12">
        <filterCategories />
      </v-col>
      <v-col>
        <productCategories />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import productCategories from './product-categories.vue'
import filterCategories from './filter-categories.vue'
import sortCategories from './sort-categories.vue'
import breadcrumbs from './breadcrumbs.vue'

export default {
  components: {
     productCategories, filterCategories, sortCategories, breadcrumbs
  },
}
</script>
