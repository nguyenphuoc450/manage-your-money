import {ref} from 'vue'
import firebase from '../firebase/index'

const userCurrent = ref(firebase.auth().currentUser)

firebase.auth().onAuthStateChanged((user) => {
    if(user) userCurrent.value = user
}) 

export function getUser() {
    return {userCurrent}
}