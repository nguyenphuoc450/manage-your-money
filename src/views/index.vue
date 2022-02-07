<template>
  <div id="index fadeIn">
    <div class="container">
        <BrandImage/>
        <h2 class="title">Manage Your Money</h2>
        <div class="links">
            <router-link 
                :to="{name: 'Login'}" 
                class="links-item bg-primary text-white rounded">
                    Đăng nhập
            </router-link>
            <p class="text-center my-2">Hoặc</p>
            <router-link 
                :to="{name: 'Register'}" 
                class="links-item bg-primary text-white rounded">
                    Đăng ký
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
    width: 100%;
    margin: 0 auto;
    padding: 24px;
    // display: grid;
    // grid-template-columns: 45% 10% 45%;
    align-items: center;

    &-item {
        display: block;
        width: 100%;
        margin: 0 auto;
        padding: 12px 0;

        background-color: transparent;
        color: #000;
        border: 1px solid $color-gray;

        text-align: center;
        transition: all ease 0.3s;
        cursor: pointer;

        &:hover {
            background-color: #0151fe;
            border-color: transparent;
            color: #fff;
        }
    }

    p {
        font-weight: 700;
    }
}
// Responsive
@media screen and (min-width: 768px) {
    .links {
        width: 50%;
    }
}
</style>