<template>
  <section class="nav-top shadow-md">
      <div class="nav-top__icon-back" @click="goHome">
          <i class="icofont-arrow-left"></i>
      </div>
  </section>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
    name: 'NavigationTop',
    props: {
        username: String
    },
    setup () {
        const router = useRouter()

        function goHome() {
            router.push({name: 'Home'})
        }

        return {
            goHome
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-top {
    padding: 6px 12px;
    background-color: $primary-color;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: sticky;
    top: 0;
    
    color: #fff;
    font-size: 24px;

    &__icon-back, &__icon-notify {
        cursor: pointer;
    }
}
</style>