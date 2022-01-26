import {ref} from 'vue'
import firebase from 'firebase'

const error = ref(null)
const isPending = ref(false)

async function addValueCollection(nameCollection, value) {
    isPending.value = true
    error.value = (null)

    try {
        const response = await firebase.firestore().collection(nameCollection).add(value)
        return response
    } catch (err) {
        error.value = err.message
    } finally {
        isPending.value = false
    }
}

export function useCollection() {
    return {
        error,
        isPending,
        addValueCollection
    }
}