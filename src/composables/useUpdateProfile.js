import {ref} from 'vue'
import firebase from 'firebase'

const error = ref('')
const isPending = ref(false)

const user = firebase.auth().currentUser

async function updateAvatar(url) {
    error.value = ''
    isPending.value = true

    try {
       await user.updateProfile({photoURL: url})
    } catch (err) {
        error.value = err.message
    } finally {
        isPending.value = false
    }
}

export function useUpdateProfile() {
    return {
        updateAvatar
    }
}