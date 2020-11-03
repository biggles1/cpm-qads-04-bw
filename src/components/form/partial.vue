<template>
  <div>
    <h6 style="margin-top: 0px; margin-bottom: 0px" class="row">
      Complete Formbase from 'myValue'
    </h6>
    <q-form-base :value="myValue" :schema="mySchema" @update="update" />
    <!-- <h4 class="col-12">Partial Formbase from 'myValue.radios' synchronized with 'myValue'</h4>
    <q-form-base
      id= "form-base-partial"
      :value= "myValue.radios"
      :schema= "mySchema.radios"
      @update:form-base-partial= "updatepartial"
      class="q-mr-lg"/> -->
    <infoline :val="myValue" :schema="mySchema"></infoline>
  </div>
</template>

<script>
import QFormBase from "./qFormBase";
import Infoline from "./infoline";
import updateLog from "../../lib";

const options = [
  { label: "Alpha", value: "A", color: "green" },
  { label: "Beta", value: "B", color: "indigo" },
  { label: "Gamma", value: "C", color: "pink" }
];

export default {
  components: { QFormBase, Infoline },
  data() {
    return {
      myValue: {
        checkbox: true,
        switch: true,
        radioA: "A",
        radioB: "B",
        // radios: {
        //   radioA: 'A',
        //   radioB: 'B'
        // }
        slider: 33
      },
      mySchema: {
        checkbox: { type: "checkbox", label: "Red", color: "red" },
        switch: { type: "switch", label: "Blue", color: "blue" },
        radioA: { type: "radio", options },
        radioB: { type: "radio", options },
        slider: {
          type: "slider",
          label: "Slide",
          color: "orange",
          min: 0,
          max: 100
        }
      }

      // mySchema: {
      //   checkbox: { type: 'checkbox', label: 'Red', color: 'red' },
      //   switch: { type: 'switch', label: 'Blue', color: 'blue' },
      //   radios: {
      //     radioA: { type: 'radio', label: 'RadioA', options, color: 'green', row: true },
      //     radioB: { type: 'radio', label: 'RadioB', options, color: 'indigo' }
      //   }
    };
  },
  methods: {
    updateLog() {},

    updatepartial() {
      updateLog();
    },

    update(value1) {
      console.log("initial value: ", this.myValue.radioA);
      console.log(
        "parent update routine fired",
        value1,
        " key value: ",
        this.myValue[value1.key]
      );
    }
  }
};
</script>

<style scoped>
#form-base {
  border: 1px solid #c5cae9;
}
#form-base-partial {
  width: 50%;
  background-color: #c5cae956;
  border: 1px solid #c5cae9;
}
</style>
