import { ref } from 'vue'
import firebase from '../firebase/index'

const error = ref('')
const isPending = ref(false)

async function register(name, email, password) {
    error.value = null
    isPending.value = true

    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password)

        if(!response) throw new Error('Đăng ký thất bại')

        await response.user.updateProfile({displayName: name})

    } catch (err) {
        error.value = err.message
    } finally {
        isPending.value = false
    }
}

export function useRegister() {
    return {error, isPending, register}
}