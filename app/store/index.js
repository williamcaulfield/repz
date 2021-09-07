import Vue from "vue";
import Vuex from "vuex";

import sideDrawer from "./modules/sideDrawer";
import RadChart from "nativescript-ui-chart/vue";
Vue.use(RadChart);
Vue.use(Vuex);

let debug = process.env.NODE_ENV !== "production";

let store = new Vuex.Store({
    modules: {
        sideDrawer
    },
    strict: debug
});

Vue.prototype.$store = store;

export default store;
