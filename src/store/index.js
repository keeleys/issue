import Vue from "vue";
import Vuex from "vuex";
import home from "./modules/home";
import detail from "./modules/detail";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    showDialog: false,
    loading: false
  },
  mutations: {
    setShowDialog: function(state, showDialog) {
      state.showDialog = showDialog;
    },
    isLoading: function(state, flag) {
      state.loading = flag;
    }
  },
  modules: {
    home,
    detail
  },
  strict: debug
});
