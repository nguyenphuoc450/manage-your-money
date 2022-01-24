<template>
  <section class="nav-top shadow-sm">
      <div class="nav-top__icon-back" @click="goBack">
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

        function goBack() {
            router.go(-1)
        }

        return {
            goBack
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-top {
    padding: 6px 12px;
    background-color: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: sticky;
    top: 0;
    
    color: $primary-color;
    font-size: 24px;

    &__icon-back, &__icon-notify {
        width: 60px;
        cursor: pointer;
    }
}
</style>