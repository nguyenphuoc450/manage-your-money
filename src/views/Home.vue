<template>
  <div class="home">
  <TopHeader/>
  <div class="container">
    <CardList/>
  </div>
  <NavigationBottom/>
  </div>
</template>

<script>
import TopHeader from '../components/Home/TopHeader.vue'
import CardList from '../components/Home/CardList.vue'
import NavigationBottom from '../components/NavigationBottom.vue'

export default {
  name: 'Home',
  components: {
    TopHeader,
    CardList,
    NavigationBottom,
  },
  setup () {
  
  }
}
</script>
<style lang="scss" scoped>

</style>