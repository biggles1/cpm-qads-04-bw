<template>
  <div :id="tableChildrenId" class="row; col-xs-12" :class="menuAccess">
    <q-tab-panels v-model="drilledOption" animated class="row col-grow" style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
      <q-tab-panel v-if= "render" name="option1" style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
        <q-card>
          <q-card-section style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
            <CoreTable :formId = "uuid" />
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  props: {
    uuid: {
      type: Number,
      default: 0
    },
    menuAccess: {
      type: String,
      default: 'display: hidden'
    },
    tableChildrenId: {
      type: String,
      default: ''
    },
    drilledOption: {
      type: String,
      default: null
    },
    render: {
      type: Boolean,
      default: true
    },
  },

}
</script>

<style scoped>

</style>
