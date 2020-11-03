<template>
  <div class="row">
    <div>
      <div>
        <h6 class="q-mx-sm q-my-none">
          Quasar - Lazy Loading of 'QFormBase' Component after loading
          Async-Data
        </h6>
      </div>
      <!-- <p> {{ Object.keys(myValue).length }} </p> -->
      <q-form v-if="showFormbase">
        <q-form-base :value="myValue" :schema="mySchema" @input="change" />
      </q-form>
      <infoline :value="myValue" :schema="mySchema"></infoline>
    </div>
  </div>
</template>

<script>
import Infoline from "./infoline";
import change from "../../lib";
import qformbase from "./qFormBase";

export default {
  name: "async",
  components: {
    // LAZY LOADING 'VFormBase' COMPONENT HERE
    // 'VFormBase': () => import('@/components/vFormBase'),
    // 'VFormBase': () => import('./vFormBase'),
    // QFormBase: () => import("./qFormBase"),
    QFormBase: qformbase,
    Infoline
  },
  data() {
    return {
      showFormbase: false,
      myValue: {},
      mySchema: {}
    };
  },

  methods: {
    change,

    delay(obj) {
      // return new Promise((resolve, reject) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(obj);
        }, 1000);
      });
    }
  },

  async mounted() {
    // 1) ASYNC LOADING VALUE & SCHEMA
    this.myValue = await this.delay({
      name: "Base",
      password: "123456",
      file: [], // contains a single or an array of File objects
      checkbox: true,
      name2: "Base",
      password2: "123456",
      file2: [], // contains a single or an array of File objects
      checkbox2: true
    });
    this.mySchema = await this.delay({
      name: { type: "text", label: "Name" },
      password: { type: "password", label: "Password", clearable: true },
      file: {
        type: "file",
        label: "Image-Files",
        accept: "image/*",
        multiple: true
      },
      checkbox: { type: "checkbox", label: "Ok" },
      name2: { type: "text", label: "Name" },
      password2: { type: "password", label: "Password", clearable: true },
      file2: {
        type: "file",
        label: "Image-Files",
        accept: "image/*",
        multiple: true
      },
      checkbox2: { type: "checkbox", label: "Ok" }
    });

    // 2) LAZY LOADING 'VFormbase' after making visible
    this.showFormbase = true;
  }
};
</script>
