<template>
  <div class="register">
    <div class="container">
        <!-- <BrandImage/> -->
        <h2 class="title fadeIn">Đăng ký</h2>
        <form 
              class="form fadeIn"
              @submit.prevent="onSubmit"
        >
            <input 
              type="text" 
              placeholder="Tên"
              class="border-2 border-gray outline-none rounded"
              v-model="name"
            >
            <input 
              type="email" 
              placeholder="Email"
              class="my-6 border-2 border-gray outline-none rounded"
              v-model="email"
            >
            <input 
              type="password" 
              placeholder="Mật khẩu"
              class="border-2 border-gray outline-none rounded"
              v-model="password"
            >
            <button v-if="!isPending" class="btn my-6 rounded">Đăng ký</button>
            <button v-else disabled class="btn cursor-not-allowed my-6 bg-gray-900 rounded">Loading...</button>
            <p class="error-message">{{error}}</p>
            <p class="text-center">
                Bạn đã có tài khoản?
                <router-link :to="{name: 'Login'}" class="text-primary underline">Đăng nhập tại đây</router-link>
            </p>
        </form>
    </div>
  </div>
</template>

<script>
// import BrandImage from '../components/BrandImage.vue'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useRegister} from '../composables/useRegister'

export default {
    name: 'Login',
    components: {
        // BrandImage
    },
    setup () {
        const name = ref('')
        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const {error, isPending, register} = useRegister()

        async function onSubmit() {
            await register(name.value, email.value, password.value)
            
            if(!error.value) router.push({name: 'Home'})
        }
        return {
            name,
            email,
            password,
            onSubmit,
            error,
            isPending,
        }
    }
}
</script>

<style lang="scss" scoped>
.register {
  margin-top: 32px;
}

// Responsive
@media screen and (min-width: 768px) {
    .form {
        width: 60% !important;
        margin: 0 auto;
    }
}
</style>