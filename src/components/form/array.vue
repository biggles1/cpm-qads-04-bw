<template>
  <div>
    <h6 class="q-mx-sm q-my-none">Edit Item(s) in Data-Array</h6>
    <q-form-base
      id="form-base-array"
      :value="myValue"
      :schema="mySchema"
      @update:form-base-array="update"
    />
    <q-btn dark color="blue lighten-3" @click="add">ADD</q-btn>

    <infoline :value="myValue" :schema="mySchema"></infoline>
  </div>
</template>

<script>
import QFormBase from "./qFormBase"; // @/components/vFormBase'
import Infoline from "./infoline";
import update from "../../lib"; // lib

export default {
  name: "array",
  components: { QFormBase, Infoline },
  data() {
    return {
      myValue: {
        tasks: [
          { done: false, title: "Task Nr " + Math.floor(Math.random() * 1000) },
          { done: false, title: "Task Nr " + Math.floor(Math.random() * 1000) },
          { done: false, title: "Task Nr " + Math.floor(Math.random() * 1000) }
        ]
      },
      mySchema: {
        tasks: {
          type: "array",
          flex: 12,
          schema: {
            done: { type: "checkbox", label: "Done", color: "red", flex: 3 },
            title: { type: "text" },
            flex: 9
          }
        }
      }
    };
  },
  methods: {
    add() {
      this.myValue.tasks.unshift({
        done: false,
        title: "Task Nr " + Math.floor(Math.random() * 1000)
      });
    },

    update(val) {
      let { index, key, value } = update(val);

      if (key === "done" && value === true) {
        setTimeout(() => this.myValue.tasks.splice(index, 1), 333);
      }
    }
  }
};
</script>
