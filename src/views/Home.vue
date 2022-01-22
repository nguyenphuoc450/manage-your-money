<template>
  <div class="home">
	<TopHeader/>
	<NavigationBottom/>
  </div>
</template>

<script>
import TopHeader from '../components/Home/TopHeader.vue'
import NavigationBottom from '../components/NavigationBottom.vue'

export default {
  name: 'Home',
  components: {
	NavigationBottom,
	TopHeader
  },
  setup () {
	
  }
}
</script>
<style lang="scss" scoped>

</style>