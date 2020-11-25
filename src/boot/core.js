// file: /src/boot/register-my-component.js
import Vue from "vue";
import core02 from "../components/core/core02.vue";

Vue.component("Core", core02);

// "async" is optional
// eslint-disable-next-line no-unused-vars
export default ({ CoreTable }) => {
  // something to do
};
