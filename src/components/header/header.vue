<template>
  <v-sheet >
    <headHeader />
    <menuHeader />
  </v-sheet>
</template>
<script>
import menuHeader from './menu-header.vue'
import headHeader from './head-header.vue'

export default {
  components: {
     menuHeader, headHeader
  }
}
</script>
