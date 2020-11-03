<template>
  <div>
    <h6 style="margin-top: 0px; margin-bottom: 0px;">Pickers</h6>
    <q-form-base id="form-base-pickers" :value="myValue" :schema="mySchema" />
    <infoline :value="myValue" :schema="mySchema"></infoline>
  </div>
</template>

<script>
import QFormBase from "./qFormBase";
import Infoline from "./infoline";
import updateLog from "../../lib";

export default {
  name: "pickers",
  components: { QFormBase, Infoline },
  data() {
    return {
      myValue: {
        scheduledPicker: "2017/01/02",
        // dateLkup: '2017/12/09',
        // colorPicker: '#88000080',
        // timePicker: '10:15',
        timePicker: "11:39"
        // datePicker: '2019/03/16'
      },
      mySchema: {
        scheduledPicker: {
          type: "dateTextLookup",
          color: "orange",
          flex1: { xs: 12, sm: 6, md: 4 }
        },
        // dateLkup: { type: 'dateLookup1', color: 'blue', flex: { xs: 12, sm: 6, md: 4 } },
        // colorPicker: { type: 'color', flex: { xs: 12, sm: 6, md: 4 } },
        // timePicker: { type: 'time', format: '24hr', flex: { xs: 12, sm: 6, md: 4 } },
        timePicker: {
          type: "timeTextLookup",
          format: "24hr",
          flex1: { xs: 12, sm: 6, md: 4 }
        }
        // datePicker: { type: 'date', color: 'green', flex: { xs: 12, sm: 6, md: 4 } }
      }
    };
  },
  methods: {
    updateLog
  }
};
</script>
