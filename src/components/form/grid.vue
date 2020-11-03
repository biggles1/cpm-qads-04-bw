<template>
  <div>
    <h6 style="margin-top: 0px; margin-bottom: 0px">
      Resize Window to change Layout, Offset and Order of Components
    </h6>
    <q-form-base
      :class="layout"
      :value="myValue"
      :schema="mySchema"
      @update="update"
    />

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
        name: "Grid",
        radio: "A"
      }
    };
  },
  computed: {
    // Dynamic Schema must be Computed
    mySchema() {
      return {
        name: {
          type: "text",
          label: "Name",
          flex1: { xs: 12, sm: 6 },
          order1: { xs: 0, sm: 8 },
          offset1: { xs: 0, sm: 3, md: 0 }
        },
        radio: {
          type: "radio",
          label: "",
          row: !this.row,
          options: ["A", "B", "C", "D"],
          flex1: 8,
          order1: 4
        }
      };
    },

    // Change Layout from Row to Column on resize and change Radio-Orientation
    row() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    // Change Class on resize
    layout() {
      return this.$vuetify.breakpoint.mdAndUp
        ? "grey lighten-3"
        : this.$vuetify.breakpoint.smAndUp
        ? "blue lighten-4"
        : "white";
    }
  },
  methods: {
    updateLog
  }
};
</script>
