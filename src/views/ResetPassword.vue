<template>
  <div class="reset-password fadeIn">
      <NavigationTop/>
      <h2 class="title">Đổi mật khẩu</h2>
      <div class="container">
        <form 
                class="form"
                @submit.prevent="onSubmit"
        >
            <input 
                type="password" 
                placeholder="Mật khẩu mới"
                class="border-2 border-gray outline-none rounded"
                v-model="newPassword"
            >
            <button v-if="!isPending" class="btn my-6 rounded">Đổi mật khẩu</button>
            <button v-else disabled class="btn cursor-not-allowed my-6 bg-gray-900 rounded">Loading...</button>
            <p class="error-message">{{error}}</p>
        </form>
      </div>
  </div>
</template>

<script>
import NavigationTop from '../components/NavigationTop.vue'
import {ref} from 'vue'
import {useResetPassword} from '../composables/useResetPassword'

export default {
    name: 'ResetPassword',
    components: {
        NavigationTop
    },
    setup () {
        const newPassword = ref('')
        const {error, isPending, resetPassword} = useResetPassword()

        async function onSubmit() {
            await resetPassword(newPassword.value)
            newPassword.value = ''
        }

        return {
            newPassword,
            onSubmit,
            error,
            isPending
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    margin-top: 24px;
}

</style>