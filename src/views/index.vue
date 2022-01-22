<template>
  <div id="index">
    <div class="container">
        <BrandImage/>
        <h2 class="title">Manage Your Money</h2>
        <div class="links">
            <router-link 
                :to="{name: 'Login'}" 
                class="links-item bg-primary text-white rounded">
                    Login
            </router-link>
            <p class="text-center my-2">OR</p>
            <router-link 
                :to="{name: 'Register'}" 
                class="links-item bg-primary text-white rounded">
                    Register
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import BrandImage from '../components/BrandImage.vue'

export default {
    name: 'Index',
    components: {
        BrandImage
    }
}
</script>

<style lang="scss" scoped>
.links {
    padding: 12px 24px;
    &-item {
        display: block;
        margin: 0 auto;
        padding: 12px 0;

        text-align: center;
    }
}
</style>