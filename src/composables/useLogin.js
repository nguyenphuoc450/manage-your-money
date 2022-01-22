import {ref} from 'vue'
import firebase from '../firebase/index'

const error = ref('')
const isPending = ref(false)

async function login(email, password) {
    error.value = null
    isPending.value = true

    try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)

        if(!response) throw new Error('Đăng nhập thất bại')
        
    } catch (err) {
        error.value = err.message
    } finally {
        isPending.value = false
    }
}

export function useLogin() {
    return {error, isPending, login}
}