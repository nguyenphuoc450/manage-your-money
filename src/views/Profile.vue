<template>
  <div>
      <NavigationTop/>
      Profile - {{userCurrent.displayName}}
      <br/>
      <button @click="logout">Logout</button>
      <NavigationBottom/>
  </div>
</template>

<script>
import NavigationTop from '../components/NavigationTop.vue'
import NavigationBottom from '../components/NavigationBottom.vue'
import {getUser} from '../composables/getUser'
import firebase from 'firebase'
import {useRouter} from 'vue-router'

export default {
    name: 'Profile',
    components: {
        NavigationTop,
        NavigationBottom
    },
    setup () {
        const {userCurrent} = getUser()
        const router = useRouter()

        async function logout() {
            await firebase.auth().signOut()
            await router.push({name: 'Index'})
        }

        return {
            userCurrent,
            logout
        }
    }
}
</script>

<style lang="scss" scoped>

</style>