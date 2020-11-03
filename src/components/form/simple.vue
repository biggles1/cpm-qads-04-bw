<template>
  <div class="row">
    <div class="col-12">
      <div fluid class="">
        <h6 style="margin-top: 0px; margin-bottom: 0px">Quasar Simple Form</h6>
        <q-form-base
          id="form-base-simple"
          :value="myValue"
          :schema="mySchema"
          @blur="change"
          @input="change"
        />
        <!-- <h4 slot="q-slot-top-key-name">Top Slot on Key Name Quasar</h4> -->
        <infoline :value="myValue" :schema="mySchema"></infoline>
      </div>
    </div>
  </div>
</template>

<script>
// import VFormBase from './vFormBase'
import QFormBase from "./qFormBase";
import Infoline from "./infoline";
import change from "../../lib";

export default {
  name: "simple",
  components: { QFormBase, Infoline },
  data() {
    return {
      showSchema: false,
      myValue: {
        creditcard: "12345678",
        password: "123456",
        file: [], // contains a single or an array of File objects
        checkbox: true
        // creditcard2: '12345678',
        // password2: '123456',
        // file2: [], // contains a single or an array of File objects
        // checkbox2: true
      },
      mySchema: {
        // Info Mask https://vuejs-tips.github.io/vue-the-mask/
        creditcard: {
          type: "text",
          hint: "Masked Input for CC",
          label: "####-####-####-####",
          mask: "####-####-####-####"
        },
        password: {
          type: "password",
          hint: "Password with toggle",
          label: "Password",
          clearable: true
        },
        file: {
          type: "file",
          label: "Image-Files",
          accept: "image/*",
          multiple: true
        },
        checkbox: { type: "checkbox", label: "Ok" }
        // creditcard2: { type: 'text', hint: 'Masked Input for CC', label: '####-####-####-####', mask: '####-####-####-####' },
        // password2: { type: 'password',  hint: 'Password with toggle', label: 'Password', clearable: true },
        // file2: { type: 'file', label: 'Image-Files', accept: 'image/*', multiple: true },
        // checkbox2: { type: 'checkbox', label: 'Ok' }
      }
    };
  },
  methods: {
    change
  }
};
</script>

<style></style>
