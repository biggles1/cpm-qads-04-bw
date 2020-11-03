import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

// import Core from '../components/form/table.vue'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    mode: "history",
    // scrollBehavior: () => ({ x: 0, y: 0 }),
    // eslint-disable-next-line no-unused-vars
    scrollBehavior: function(to, _from, _savedPosition) {
      if (to.hash) {
        return { selector: to.hash };
      } else {
        return { x: 0, y: 0 };
      }
    },
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // mode: process.env.VUE_ROUTER_MODE,
    // eslint-disable-next-line no-undef
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}
