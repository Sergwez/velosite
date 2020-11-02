<template >
  <v-sheet class="brown lighten-5">
    <mHeader  class="brown lighten-5"></mHeader>
    <v-container class="brown lighten-5">
      <about  class="brown lighten-5"></about>
      <slider  class="brown lighten-5"></slider>
      <slideCategories  class="brown lighten-5"></slideCategories>
    </v-container>
    <mFooter class="brown lighten-5"></mFooter>
  </v-sheet>
</template>
<script>
import mHeader from '@/components/header/header.vue'
import about from '@/components/main/about.vue'
import slider from '@/components/main/slider.vue'
import slideCategories from '@/components/main/slide-categories.vue'
import mFooter from '@/components/footer/footer.vue'

export default {
  name: 'App',
  components: {
     mHeader, about, slider, mFooter, slideCategories
  },
}
</script>
