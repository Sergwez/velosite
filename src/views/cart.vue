<template >
  <v-sheet class="brown lighten-5">
    <mHeader  class="brown lighten-5"/>
    <cart  class="brown lighten-5"/>
    <mFooter  class="brown lighten-5"/>
</v-sheet>
</template>
<script>
import mHeader from '@/components/header/header.vue'
import cart from '@/components/cart/cart.vue'
import mFooter from '@/components/footer/footer.vue'

export default {
  components: {
     mHeader, cart, mFooter
  },
}
</script>
