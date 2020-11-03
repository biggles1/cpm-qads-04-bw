import layout from '../layouts/MyLayout.vue'
import form from '../pages/form.vue'
import error from '../pages/Error404.vue'

const routes = [
  {
    path: "/",
    // component: () => import('../layouts/MyLayout.vue'),
      // component: require('../layouts/MyLayout.vue'),
      component: layout,
    children: [
      // { path: '', component: () => import('../pages/form.vue') }
      // { path: "", component: "../pages/form.vue" }
      { path: "", component: form }
    ]
  }
];

// Always leave this as last one
// eslint-disable-next-line no-undef
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    // component: () => import("pages/Error404.vue")
    // component: "pages/Error404.vue"
    component: error
  });
}

export default routes;
