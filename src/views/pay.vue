<template >
  <v-sheet class="brown lighten-5">
    <mHeader  class="brown lighten-5"/>
    <pay  class="brown lighten-5"/>
    <mFooter  class="brown lighten-5"/>
  </v-sheet>
</template>
<script>
import mHeader from '@/components/header/header.vue'
import pay from '@/components/info-pages/pay.vue'
import mFooter from '@/components/footer/footer.vue'

export default {
  components: {
     mHeader, pay, mFooter
  },
}
</script>
