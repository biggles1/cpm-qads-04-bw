<template>
  <div>
    <h6 style="margin-top: 0px; margin-bottom: 0px">
      Complete Form with validation
    </h6>
    <q-form-base
      id="form-base-complete"
      :value="myValue"
      :schema="mySchema"
      @update:form-base-complete="update"
    />

    <div class="row">
      <q-btn dark color="blue lighten-3" @click="validate">Validate</q-btn>
      <q-btn dark color="blue lighten-3" @click="resetValidation"
        >Reset Validate</q-btn
      >
    </div>

    <div class="row">
      <infoline :value="myValue" :schema="mySchema"></infoline>
    </div>
  </div>
</template>

<script>
import QFormBase from "./qFormBase";
import Infoline from "./infoline";
import updateLog from "../../lib";

const items = ["Tesla", "Jobs", "Taleb", "Harari"];

/* Helper & Partial Functions */
const minLen = l => v => (v && v.length >= l) || `min. ${l} Characters`;
const maxLen = l => v => (v && v.length <= l) || `max. ${l} Characters`;
const required = msg => v => !!v || msg;
// const toUpper = ({ value }) => value && value.toUpperCase()
const rules = {
  requiredEmail: required("E-mail is required"),
  max12: maxLen(12),
  min6: minLen(6),
  validEmail: v => /.+@.+\..+/.test(v) || "E-mail must be valid"
};
//
export default {
  components: { QFormBase, Infoline },
  data() {
    return {
      formValid: true,

      myValue: {
        email: "base@mail.com",
        password: "123456",
        subgroups: {
          select: "Tesla",
          multiple: ["Jobs"],
          combobox: [],
          autocomplete: null,
          tasks: [
            { done: false, title: "shopping" },
            { done: true, title: "coding" },
            { done: false, title: "walking" },
            { done: false, title: "sleeping" }
          ],
          datePicker: "2019/08/01",
          content: `Design principles of Quasar ...`
        }
      },

      mySchema: {
        email: { type: "email", label: "Email", flex1: 4 },
        password: {
          type: "password",
          label: "Password",
          hint: "6 to 12 Chars",
          appendIcon: "visibility",
          rules: [rules.min6, rules.max12],
          clearable: true,
          flex1: { xs: 6, sm: 3 }
        },
        subgroups: {
          select: {
            type: "select",
            label: "Select",
            items,
            flex1: { xs: 6, sm: 4 }
          },
          multiple: {
            type: "select",
            label: "Multi-Select",
            items,
            multiple: true,
            flex1: { xs: 4, sm: 3 }
          },
          combobox: {
            type: "combobox",
            label: "Combobox",
            items,
            flex1: { xs: 12, sm: 6, md: 3 }
          },
          autocomplete: {
            type: "autocomplete",
            label: "AutoComplete",
            items,
            flex1: { xs: 12, sm: 6, md: 3 }
          },
          tasks: {
            type: "array",
            title: "Array of Items",
            schema: {
              done: { type: "checkbox", label: "Ok", flex: { xs: 12, sm: 3 } },
              title: {
                type: "text",
                placeholder: "to do...",
                flex: { xs: 12, sm: 9 }
              }
            },
            flex1: { xs: 12, sm: 6 }
          },
          datePicker: {
            type: "dateTextLookup",
            label: "Date Picker",
            color: "green",
            flex1: { xs: 12, sm: 5 }
          },
          content: {
            type: "textArea",
            label: "Content",
            hint: "Auto-Growing...",
            autoGrow: true,
            prependInnerIcon: "print",
            rules: [required("Content required")],
            flex1: { xs: 12, sm: 12 }
          }
        }
      }
    };
  },
  methods: {
    validate() {
      this.$refs.form1.validate();
    },

    resetValidation() {
      this.$refs.form1.resetValidation();
    },
    toggle() {
      this.mySchema.checkbox[2].checkbox1[0].hidden = !this.mySchema.checkbox[2]
        .checkbox1[0].hidden;
      // console.log('this.mySchema.checkbox[2].checkbox1[0].hidden', this.mySchema.checkbox[2].checkbox1[0].hidden)
    },
    update(val) {
      updateLog(val);
      console.log("val: ", val);

      let { on, key, obj, params } = val;
      // print content
      if (
        on === "click" &&
        key === "subgroups.content" &&
        (params && params.text) === "print"
      ) {
        window.print();
      }
      // toggle visibility of password
      if (
        on === "click" &&
        key === "password" &&
        (params && params.pos) === "append"
      ) {
        // check 'click' is from from appendIcon
        obj.schema.type === "password"
          ? (obj.schema.appendIcon = "lock")
          : (obj.schema.appendIcon = "visibility");
        obj.schema.type = obj.schema.type === "password" ? "text" : "password";
      }
    }
  }
};
</script>

<style>
/* scoped doesn't work in nested components */

#form-base-complete .key-subgroups-content {
  border: 1px solid #919191;
  background-color: #e9e9e9;
  padding: 1rem;
}
#form-base-complete .key-subgroups-tasks {
  border: 1px solid #4b8ad6;
  background-color: #e2eaf5;
  padding: 1rem;
}

@media print {
  html * {
    position: fixed;
    visibility: hidden;
  }
  .key-subgroups-content textarea {
    visibility: visible;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .key-subgroups-content textarea * {
    visibility: visible;
  }
}
</style>
