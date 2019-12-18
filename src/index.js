import Vue from 'vue'
import "github-markdown-css"
import '@/css/main.scss';

import App from "@/components/App";

import store from '@/store'
import { router } from '@/route'

import components from "@/components/components"

Vue.use(components)

console.log('[i] Starting client app')
const app = new Vue({
    store,
    router,
    render: c => c(App)
}).$mount('#app');