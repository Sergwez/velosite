<template >
  <v-sheet class="brown lighten-5">
    <mHeader  class="brown lighten-5"/>
    <delivery  class="brown lighten-5"/>
    <mFooter  class="brown lighten-5"/>
</v-sheet>
</template>
<script>
import mHeader from '@/components/header/header.vue'
import delivery from '@/components/info-pages/delivery.vue'
import mFooter from '@/components/footer/footer.vue'

export default {
  components: {
     mHeader, delivery, mFooter
  },
}
</script>
