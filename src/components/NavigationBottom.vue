<template>
  <section class="nav-bottom">
      <ul>
          <li v-for="router in routers" :key="router.name">
              <router-link :to="{name: router.name}">
                  <i :class="router.icon"></i>
              </router-link>
          </li>
      </ul>
  </section>
</template>

<script>
import {ref} from 'vue'

export default {
    name: 'NavigationBottom',
    setup () {
        const routers = ref([
            {
                name: 'Home',
                icon: 'icofont-home'
            },
            {
                name: 'Home',
                icon: 'icofont-chart-bar-graph'
            },
            {
                name: 'Home',
                icon: 'icofont-chart-pie'
            },
            {
                name: 'Profile',
                icon: 'icofont-ui-user'
            },
        ])

        return {
            routers
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-bottom {
    background-color: $primary-color;
    
    position: fixed;
    width: 100%;
    bottom: 0;

    color: #fff;
    
    ul {
        height: 60px;
        padding: 12px 0 calc(12px + env(safe-area-inset-bottom));

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;

        li {
            font-size: 24px;
            text-align: center;
        }
    }
}
</style>