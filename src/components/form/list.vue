<template>
  <div class="col-6">
    <h6 style="margin-top: 0px; margin-bottom: 0px">
      Select Item from Data-Array(List) with Result in 'schema.prop.selected'
    </h6>

    <q-form-base id="form-base-list" :value="myValue" :schema="mySchema" />
    <!-- @update:form-base-list= "update"  -->

    <infoline :value="myValue" :schema="mySchema"></infoline>
  </div>
</template>

<script>
import QFormBase from "./qFormBase";
import Infoline from "./infoline";
import updateLog from "../../lib";

export default {
  components: { QFormBase, Infoline },
  data() {
    return {
      myValue: {
        listObject: [
          { line: 1, name: "Jobs" },
          { line: 2, name: "Taleb" },
          { line: 3, name: "Harari" }
        ],
        listString: ["Jobs", "Taleb", "Harari"]
      },
      mySchema: {
        listObject: {
          type: "list",
          item: "name",
          selected: 2,
          color: "#C5CAE9",
          flex1: 5
        },
        listString: {
          type: "list",
          label: "Label",
          selected: null,
          offset1: 1,
          flex1: 5
        }
      }
    };
  },
  methods: {
    updateLog
  }
};
</script>

<style>
.key-listObject .active {
  background-color: rgb(218, 221, 238);
}
.key-listObject .active * {
  color: #3d3a3a;
}
.key-listString .active {
  background-color: #c5cae9;
}
.key-listString .active * {
  color: #ffffff;
}
</style>
