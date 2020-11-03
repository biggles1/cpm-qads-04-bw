<template>
  <div class="row">
    <!-- <q-toolbar class="bg-listheadertoolbar text-black shadow-15"> boo hoo...</q-toolbar> -->
    <div class="col-12">
      <div fluid class="col-4">
        <h6 style="margin-top: 0px; margin-bottom: 0px;">
          Quasar - Play around with predefined CSS-Classes, Slots and Buttons
        </h6>
        <!-- <p background-color="pink"> gghhsssss </p> -->
        <q-form-base
          id="form-base-css"
          :value="myValue"
          :schema="mySchema"
          @change:form-base-css="change"
          class="shadow-10"
        >
          <!-- KEY -->
          <p
            color="brand"
            style="margin-top: 0px; margin-bottom: 0px;"
            slot="slot-top-key-name"
          >
            Top Slot Key Name
          </p>
          <p
            style="margin-top: 0px; margin-bottom: 0px;"
            slot="slot-item-key-password"
          >
            Slot replaces Key Password
          </p>
          <p
            style="margin-top: 0px; margin-bottom: 0px;"
            slot="slot-bottom-key-email"
          >
            Bottom Slot Key Email
          </p>
          <!-- TYPE -->
          <p
            style="margin-top: 0px; margin-bottom: 0px;"
            slot="slot-top-type-btn-toggle"
          >
            Top Slot Type Btn-Toggle
          </p>
          <p
            style="margin-top: 0px; margin-bottom: 0px;"
            slot="slot-bottom-type-btn"
          >
            Bottom Slot Type Btn
          </p>
          <p
            style="margin-top: 0px; margin-bottom: 0px;"
            slot="slot-top-type-radio"
          >
            Top Slot Type Radio
          </p>
          <p
            style="margin-top: 0px; margin-bottom: 0px;"
            slot="slot-bottom-type-radio"
          >
            Top Bottom Type Radio 1
          </p>
          <p
            style="margin-top: 0px; margin-bottom: 0px;"
            slot="slot-bottom-type-radio"
          >
            Top Bottom Type Radio 2
          </p>
          <p
            style="margin-top: 0px; margin-bottom: 0px;"
            slot="slot-item-type-radio"
          >
            Slot replaces all Radio Types
          </p>
        </q-form-base>

        <q-btn color="primary" icon="mail" label="On Left"></q-btn>

        <div class="q-pa-md">
          <q-btn-toggle
            v-model="model"
            toggle-color="primary"
            :options="[
              { label: 'One', value: 'one' },
              { label: 'Two', value: 'two' },
              { label: 'Three', value: 'three' }
            ]"
          />
        </div>

        <infoline :value="myValue" :schema="mySchema"></infoline>
      </div>
    </div>
  </div>
</template>

<script>
import QFormBase from "./qFormBase";
import Infoline from "./infoline";
import change from "../../lib";

const options = [
  { label: "A", value: 1 },
  { label: "B", value: 2 }
];
const objectOptions = [
  { icon: "format_align_justify", value: 1 },
  { label: "B", icon: "format_align_justify", value: 2 },
  { label: "C", value: 3 }
];

export default {
  components: { QFormBase, Infoline },
  data() {
    return {
      model: null,
      myValue: {
        name: "Base",
        password: "123456",
        email: "base@mail.com",
        controls: {
          checkbox: true,
          switch: true,
          slider: 33,
          btnToggle1: "B",
          btnToggle2: [1, 2],
          btn1: "A", // or use schema.label
          btn2: "B", // or use schema.label
          radio1: "A",
          radio2: 2
        }
      },
      mySchema: {
        name: {
          type: "text",
          label: "Name",
          flex1: 4,
          appendIcon: "more_vert"
        },
        password: {
          type: "password",
          label: "Password",
          hint: "Password with toggle",
          clearable: true
        },
        email: { type: "email", label: "Email", flex1: 4 },
        controls: {
          checkbox: { type: "checkbox", label: "Red", color: "red", flex1: 4 },
          switch: { type: "switch", label: "Blue", color: "blue", flex1: 4 },
          slider: {
            type: "slider",
            label: "Green",
            color: "green",
            min: "0",
            max: "70",
            flex1: 4
          },

          btnToggle1: { type: "btnToggle", options, "x-small": true, flex1: 6 },
          btnToggle2: {
            type: "btnToggle",
            options: objectOptions,
            rounded: true,
            multiple: true,
            dark: true,
            color: "blue",
            flex1: 6
          },

          btn1: { type: "btn", label: "Print A", icon: "printer" },
          btn2: {
            type: "btn",
            label: "Print B",
            icon: "printer",
            iconCenter: "add",
            iconRight: "mdi-format-italic",
            dark: true,
            color: "blue",
            flex1: 3
          },

          radio1: { type: "radio", label: "Radio 1", options, flex1: 3 },
          radio2: {
            type: "radio",
            label: "Radio 2",
            options: objectOptions,
            color: "green",
            row: true,
            flex1: 3
          }
        }
      }
    };
  },
  methods: {
    change
  }
};
</script>

<style>
/* INFO-SCOPED: don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
/* h4 { background-color: $grey-5; padding: 0.2rem} */

/* CSS Component --- Container */
#form-base-css {
  background-color: #475b86;
}

@media only screen and (max-width: 800px) {
  #form-base-css {
    background-color: #456b34;
  }
}
@media only screen and (max-width: 560px) {
  #form-base-css {
    background-color: #776137;
  }
}

/* CSS Item --- set all items  */
#form-base-css .item {
  border: 1px dashed #314152;
  padding: 0.5rem;
}

/* CSS Type --- set all items of type ... */
#form-base-css .type-checkbox {
  border-bottom: 3px solid #e22d23;
  background-color: rgb(151, 88, 88);
}
#form-base-css .type-switch {
  background-color: #2b8cc473;
}
#form-base-css .type-slider {
  background-color: #289e3c77;
}

/* CSS Keys --- set item with key on focus' */
#form-base-css .key-email input:focus {
  background-color: #85a2e0;
}

/* .slot {
    color: q-color-primary;
  }
  .bg-slot {
    background: #a2aa33;
  } */

.text-brand {
  color: #090613;
}
.bg-brand {
  background-color: #d6e41a;
}

/* .q-icon, .material-icons, .material-icons-outlined, .material-icons-round, .material-icons-sharp {
    justify-content: right;
  } */
</style>
