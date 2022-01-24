<template>
  <div class="container">
      <BrandImage/>
      <h2 class="title">Login</h2>
      <form 
            class="form"
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
          <button v-if="!isPending" class="btn my-6 rounded">Login</button>
          <button v-else disabled class="btn cursor-not-allowed my-6 bg-gray-900 rounded">Loading...</button>
          <p class="error-message">{{error}}</p>
          <p class="text-center">
              You don't have account? 
              <router-link :to="{name: 'Register'}" class="text-primary underline">Register here</router-link>
          </p>
      </form>
  </div>
</template>

<script>
import BrandImage from '../components/BrandImage.vue'
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import {useLogin} from '../composables/useLogin'

export default {
    name: 'Login',
    components: {
        BrandImage
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

</style>