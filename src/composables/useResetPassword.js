import {ref} from 'vue'
import firebase from 'firebase'

const error = ref('')
const isPending = ref(false)
const user = firebase.auth().currentUser

async function resetPassword(newPassword) {
    error.value = null
    isPending.value = true;
    try {
        await user.updatePassword(newPassword)
        await alert('Đổi mật khẩu thành công')
    } catch (err) {
        error.value = err.message
    } finally {
        isPending.value = false;
    }
} 

export function useResetPassword() {
    return {
        error,
        isPending,
        resetPassword,
    }
}