// file: /src/boot/register-my-component.js
import Vue from "vue";
import coreTable from "../components/form/table.vue";
// we globally register our component with Vue

Vue.component("CoreTable", coreTable);

// "async" is optional
// eslint-disable-next-line no-unused-vars
export default ({ CoreTable }) => {
  // something to do
};
