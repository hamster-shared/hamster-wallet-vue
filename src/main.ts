import './assets/main.css'

import VueHamsterWallet from "../lib/lib";

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.use(VueHamsterWallet);

app.mount('#app');
