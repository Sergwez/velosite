<template >
  <v-sheet class="brown lighten-5">
    <mHeader  class="brown lighten-5"/>
    <qa  class="brown lighten-5"/>
    <mFooter  class="brown lighten-5"/>
  </v-sheet>
</template>
<script>
import mHeader from '@/components/header/header.vue'
import qa from '@/components/info-pages/qa.vue'
import mFooter from '@/components/footer/footer.vue'

export default {
  components: {
     mHeader, qa, mFooter
  },
}
</script>
