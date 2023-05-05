import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router';
import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'remixicon/fonts/remixicon.css';
import VueParticles from 'vue-particles'

const config = {
    apiKey: 'AIzaSyAH-o0-TVc4p6TVuJAvhGgnP2vgDaYuSWA',
    authDomain: "gateway-5fc9c.firebaseapp.com",
    projectId: "gateway-5fc9c",
    storageBucket: "gateway-5fc9c.appspot.com",
    messagingSenderId: "855699634672",
    appId: "1:855699634672:web:f11d520506ee6875590535",
    measurementId: "G-TZSJ8Q2E0C"
  };

const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.use(VueParticles)
.mount('#app')


const firebase = initializeApp(config);

export const db = getFirestore(firebase);
export const auth = getAuth();