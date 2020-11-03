<template>
  <div class="row">
    <h6 style="margin-top: 0px; margin-bottom: 0px;">
      Expand/Select Treeview with Result in 'schema.prop.open' and
      'schema.prop.model'
    </h6>
    <q-form-base
      id="array-demo"
      :value="myValue"
      :schema="mySchema"
      class="col-12 margin-top: 10px"
    />
    <!-- @update:array-demo= "update" -->
    <infoline :value="myValue" :schema="mySchema"></infoline>
  </div>
</template>

<script>
import QFormBase from "./qFormBase";
import Infoline from "./infoline";
import updateLog from "../../lib";

export default {
  name: "treeview",
  components: { QFormBase, Infoline },
  data() {
    return {
      myValue: {
        treeview: [
          {
            id: 1,
            label: "Philosopher",
            icon: "restaurant_menu",
            children: [
              { id: 2, label: "Yuval Harari", icon: "restaurant_menu" },
              {
                id: 3,
                label: "Nicholas Taleb",
                children: [
                  { id: 4, label: "Black Swan" },
                  { id: 5, label: "Skin in the Game" }
                ]
              }
            ]
          },
          {
            id: 6,
            label: "Visionaire",
            children: [
              { id: 7, label: "Yuval Harari" },
              { id: 8, label: "Steve Jobs" },
              {
                id: 9,
                label: "Elon Musk",
                children: [{ id: 10, label: "Tesla" }]
              }
            ]
          }
        ]
      },
      mySchema: {
        treeview: {
          type: "treeview",
          flex1: 12,
          open: [],
          model: [],
          activatable: true,
          activeClass: "grey lighten-4 blue--text",
          selectedColor: "blue",
          openOnClick: true,
          selectable: true,
          expandIcon: "add",
          onIcon: "bookmark",
          offIcon: "bookmark_border"
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
.key-listing .active {
  background-color: rgb(194, 194, 194);
}
.key-listing .active * {
  color: rgb(248, 248, 247);
}
</style>
