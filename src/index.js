import Vue from 'vue'
import { router } from './route'

import './css/main.scss';
import "github-markdown-css"

import store from './store'

import App from "./components/app";

console.log('[i] Starting client app')
const app = new Vue({
    store,
    router,
    render: c => c(App)
}).$mount('#app');