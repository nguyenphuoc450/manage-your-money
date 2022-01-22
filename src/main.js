import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/styles/tailwind.css'
import './assets/styles/global.scss'
import './assets/icofont/icofont.min.css'

// Firebase wrap App
import firebase from './firebase/index'

let app;
firebase.auth().onAuthStateChanged(() => {
    if(!app) {
        app = createApp(App).use(router).mount('#app')
    }
})

