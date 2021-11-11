import Vue from "vue";
import routes from "./routes";
import BackendService from "./services/backend-service";
import Vuex from "vuex";
import sideDrawer from "./store/modules/sideDrawer";
import RadChart from "nativescript-ui-chart/vue";
import RadListView from "nativescript-ui-listview/vue";
import RadGauge from "nativescript-ui-gauge/vue";
import CalendarView from 'nativescript-ui-calendar/vue';


// import ApplicationSettings from "@nativescript/core"

// import { Http } from "@nativescript/core";


var firebase = require("@nativescript/firebase").firebase;

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
  function () {
    console.log("firebase.init done");
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
);

Vue.use(RadChart);
Vue.use(Vuex);
Vue.use(RadListView);
Vue.use(RadGauge);
Vue.use(CalendarView);

let store = new Vuex.Store({
  modules: {
    sideDrawer,
  },
  //strict: debug
});

Vue.prototype.$store = store;

Vue.config.silent = false;

const backendService = new BackendService();
Vue.prototype.$backendService = backendService;

Vue.registerElement(
  "RadSideDrawer",
  () => require("nativescript-ui-sidedrawer").RadSideDrawer
);

Vue.registerElement('NumericKeyboard', () => require('nativescript-numeric-keyboard').NumericKeyboardView);

Vue.registerElement(
  "RadCalendar",
  () => require("nativescript-ui-calendar").RadCalendar
);

Vue.registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

Vue.registerElement(
  "Carousel",
  () => require("nativescript-carousel").Carousel
);

Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);

// Vue.registerElement(
//   "ApplicationSettings",
//   () => ApplicationSettings
// );

// Vue.registerElement(
//   "Http",
//   () => Http
// );

//Vue.registerElement('RadListView', () => require('nativescript-ui-listview').RadListView)

new Vue({
  render: (h) =>
    h("frame", [h(backendService.isLoggedIn() ? routes.app : routes.login)]),
}).$start();

export default store;