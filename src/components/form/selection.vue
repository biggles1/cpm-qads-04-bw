<template>
  <div class="col-6">
    <h6 style="margin-top: 0px; margin-bottom: 0px;">
      Select Item(s) from Schema-Array
    </h6>

    <q-form-base id="form-base-selection" :value="myValue" :schema="mySchema">
      <h6 style="margin-top: 0px; margin-bottom: 0px;" slot="slot-top-key-name">
        Top Slot on Key Name
      </h6>
      <h6
        style="margin-top: 0px; margin-bottom: 0px;"
        slot="slot-top-type-radio"
      >
        Top Slot on Types Radio
      </h6>

      <h6
        style="margin-top: 0px; margin-bottom: 0px;"
        slot="slot-item-key-password"
      >
        Slot replaces Key Password
      </h6>

      <h6
        style="margin-top: 0px; margin-bottom: 0px;"
        slot="slot-bottom-key-name"
      >
        Bottom Slot Key Name
      </h6>
      <h6
        style="margin-top: 0px; margin-bottom: 0px;"
        slot="slot-bottom-type-radio"
      >
        Bottom Slot on Types Radio
      </h6>
    </q-form-base>

    <infoline :value="myValue" :schema="mySchema"></infoline>
  </div>
</template>

<script>
import QFormBase from "./qFormBase";
import Infoline from "./infoline";
import updateLog from "../../lib";

const items = ["Musk", "Jobs", "Taleb", "Harari"];

export default {
  name: "selection",
  components: { QFormBase, Infoline },
  data() {
    return {
      myValue: {
        selectSingle: "Musk",
        selectMultiple: ["Musk", "Taleb"],
        comboboxSingle: "Harari",
        comboboxMultiple: ["Harari", "Musk"],
        autocompleteSingle: "Taleb",
        autocompleteMultiple: ["Taleb", "Jobs"]
      },
      mySchema: {
        selectSingle: {
          type: "select",
          label: "Select",
          selected: 0,
          items,
          flex1: { xs: 12, sm: 6, md: 4 }
        },
        selectMultiple: {
          type: "select",
          label: "Multi-Select",
          items,
          multiple: true,
          flex1: { xs: 12, sm: 6, md: 4 }
        },
        comboboxSingle: {
          type: "combobox",
          label: "Combobox",
          items,
          flex1: { xs: 12, sm: 6, md: 4 }
        },
        comboboxMultiple: {
          type: "combobox",
          label: "Multi-Combobox",
          items,
          multiple: true,
          flex1: { xs: 12, sm: 6, md: 4 }
        },
        autocompleteSingle: {
          type: "autocomplete",
          label: "AutoComplete",
          items,
          flex1: { xs: 12, sm: 6, md: 4 }
        },
        autocompleteMultiple: {
          type: "autocomplete",
          label: "Multi-AutoComplete",
          multiple: true,
          items,
          flex1: { xs: 12, sm: 6, md: 4 }
        }
      }
    };
  },
  methods: {
    updateLog
  }
};
</script>
