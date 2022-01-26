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
                name: 'Login',
                icon: 'icofont-chart-bar-graph'
            },
            {
                name: 'Register',
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
    background-color: #fff;
    
    position: fixed;
    width: 100%;
    bottom: 0;

    color: $color-dark-gray;
    
    ul {
        height: 60px;
        // padding: 12px 0 calc(12px + env(safe-area-inset-bottom));

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;

        li {
            font-size: 24px;
            text-align: center;

            a {
                padding: 12px;
                display: block;
                position: relative;
                transition: all ease 0.3s;

                &:hover {
                    color: $primary-color;
                }
            }
        }
    }
}
.router-link-active.router-link-exact-active {
  color: $primary-color;
  &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;

      background-color: $primary-color;
      border-radius: 4px;
  }
}
</style>