<template>
  <div>
    <h6 style="margin-top: 0px; margin-bottom: 0px">
      Display conditional Controls on Form
    </h6>
    <q-form-base
      id="form-base-conditional"
      :value="myValue"
      :schema="mySchema"
      @update:form-base-conditional="update"
    />

    <div class="row">
      <q-btn dark color="blue lighten-3" @click="toggle"
        >Click or Type 'Show'</q-btn
      >
      <q-btn dark color="blue lighten-3" @click="add">Add Item</q-btn>
    </div>

    <infoline :value="myValue" :schema="mySchema"></infoline>
  </div>
</template>

<script>
import QFormBase from "./qFormBase";
import Infoline from "./infoline";
// import update from '../../lib'

export default {
  name: "conditional",
  components: { QFormBase, Infoline },

  data() {
    return {
      cole: "green",
      hidden: true,

      myValue: {
        conditional: "",
        tasks: [
          { done: false, title: "Task Nr " + Math.floor(Math.random() * 1000) },
          { done: false, title: "Task Nr " + Math.floor(Math.random() * 1000) },
          { done: false, title: "Task Nr " + Math.floor(Math.random() * 1000) }
        ]
      }
    };
  },

  computed: {
    mySchema() {
      return {
        conditional: {
          type: "text",
          placeholder: `Type 'show'`,
          hint: `Try typing 'show'`,
          flex1: 12
        },
        tasks: {
          type: "array",
          hidden: this.hidden,
          flex1: 12,
          title: "Conditional Array",
          schema: {
            done: { type: "checkbox", label: "Done", color: "red", flex1: 3 },
            title: { type: "text", placeholder: "...", flex1: 9 }
          }
        }
      };
    }
  },

  methods: {
    add() {
      this.myValue.tasks.unshift({
        done: false,
        title: "Task Nr " + Math.floor(Math.random() * 1000)
      });
    },
    toggle() {
      this.hidden = !this.hidden;
      console.log("toggle");
    },

    update(val) {
      // update(val)
      console.log("val ... ==> ", val);

      let { index, key, value } = val;
      console.log(
        "update val: 1",
        index,
        "2 ",
        key,
        "3 ",
        value,
        "original val: ",
        val
      );

      if (key === "conditional") this.hidden = value !== "show";

      if (key === "done" && value === true) {
        // console.log('ggggggg')
        // setTimeout(() => this.myValue.tasks.splice(index, 1), 3333)
        return this.myValue.tasks.splice(index, 1);
      }
    }
  }
};
</script>
