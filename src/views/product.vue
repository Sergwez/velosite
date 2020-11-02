<template >
  <v-sheet>
    <mHeader  class="brown lighten-5"/>
    <product  class="brown lighten-5"/>
    <mFooter  class="brown lighten-5"/>
  </v-sheet>
</template>
<script>
import mHeader from '@/components/header/header.vue'
import product from '@/components/product/product.vue'
import mFooter from '@/components/footer/footer.vue'

export default {
  components: {
     mHeader, product, mFooter
  }
}
</script>
