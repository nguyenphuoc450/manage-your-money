<template>
    <div class="login">
        <div class="container">
            <!-- <BrandImage/> -->
            <h2 class="title fadeIn">Đăng nhập</h2>
            <form 
                    class="form fadeIn"
                    @submit.prevent="onSubmit"
            >
                <input 
                    type="email" 
                    placeholder="Email"
                    class="border-2 border-gray outline-none rounded"
                    v-model="email"
                >
                <input 
                    type="password" 
                    placeholder="Mật khẩu"
                    class="mt-6 border-2 border-gray outline-none rounded"
                    v-model="password"
                >
                <button v-if="!isPending" class="btn my-6 rounded">Đăng nhập</button>
                <button v-else disabled class="btn cursor-not-allowed my-6 bg-gray-900 rounded">Loading...</button>
                <p class="error-message">{{error}}</p>
                <p class="text-center">
                    Bạn chưa có tài khoản?
                    <router-link :to="{name: 'Register'}" class="text-primary underline">Đăng ký tại đây</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
// import BrandImage from '../components/BrandImage.vue'
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import {useLogin} from '../composables/useLogin'

export default {
    name: 'Login',
    components: {
        // BrandImage
    },
    setup () {
        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const {error, isPending, login} = useLogin()

        async function onSubmit() {
            await login(email.value, password.value)

            if(!error.value) router.push({name: 'Home'})
        }

        return {
            email,
            password,
            error,
            isPending,
            onSubmit
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
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