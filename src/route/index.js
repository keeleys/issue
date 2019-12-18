import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/components/home/Index";
import Detail from "@/components/home/Detail";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Index },
  { path: "/detail/:number", component: Detail }
];
export const router = new VueRouter({
  routes
});
