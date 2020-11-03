<template>
  <div>
    <h6 class="row col-12" style="margin-top: 0px; margin-bottom: 0px">
      Deep nested Object with Arrays & CSS
    </h6>
    <div class="row">
      <q-form-base
        id="form-base-nested"
        :value="myValue"
        :schema="mySchema"
        @update:form-base-nested="update"
      />
    </div>
    <div>
      <infoline
        editable="false"
        :value="myValue"
        :schema="mySchema"
        @blur="blur"
      ></infoline>
    </div>
  </div>
</template>

<script>
import QFormBase from "./qFormBase";
import Infoline from "./infoline";
// import update from '../../lib'

export default {
  components: { QFormBase, Infoline },
  data() {
    return {
      myValue: {
        controls: {
          base: true,
          switch: [true, false],
          checkbox: [
            false,
            true,
            [true, false],
            { checkboxArray: [true, false] }
          ]
        }
      },
      mySchema: {
        controls: {
          base: { type: "checkbox", label: "Base" },
          // deep nested object with arrays
          switch: [
            { type: "switch", label: "SW1" },
            { type: "switch", label: "SW2" }
          ],
          checkbox: [
            // nesteds array of objects
            { type: "checkbox", label: "A" },
            { type: "checkbox", label: "B" },
            [
              { type: "checkbox", label: "C-A", color: "teal" },
              { type: "checkbox", label: "C-B", color: "teal" }
            ],
            {
              checkboxArray: [
                { type: "checkbox", label: "D-A", color: "red" },
                { type: "checkbox", label: "D-B", color: "red" }
              ]
            }
          ]
        }
      }
    };
  },

  methods: {
    update() {},

    blur(p) {
      let { value, schema } = p;
      this.myValue = value;
      this.mySchema = schema;
    }
  }
};
</script>

<style>
/* INFO-SCOPED: don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */

/* CSS Props --- style property from myValue object */
#form-base-nested .prop-controls {
  border: dotted 2px #838383;
}
#form-base-nested .prop-switch {
  border: dashed 2px #17419c;
}
#form-base-nested .prop-checkbox {
  border: dashed 2px #cf0d27;
}
#form-base-nested .prop-checkboxArray {
  border: dashed 2px #0f9130;
}

.q-pa-md {
  padding: 3px 3px;
}
.q-card {
  box-shadow: none;
}
</style>
