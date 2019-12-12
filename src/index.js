import Vue from 'vue'
import Index from './components/home/Index.vue'

import './css/main.scss';
import store from './store'

var div = document.createElement("div");
document.body.appendChild(div);

var app = new Vue({
    store,
    render: (createEl) => createEl(Index)
}).$mount(div);