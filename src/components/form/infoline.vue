<template>
  <div>
    <q-card class="col-12">
      <div class="q-mt-sm">
        <q-btn outline size="xs" class="bg-gray-1" label="Values & Schema" @click="showSchema = !showSchema"/>
      </div>
      <q-card-section :class=" ( showSchema == false ) ? 'display: hidden' : 'display: none' ">
        <div class="row q-pa-xs shadow-1">
            <div class="col-6 ">
              <h6 class="q-mx-sm q-my-sm">Value-Data (JSON)</h6>
              <pre :contenteditable="editable" class= "valueClass q-mx-sm q-my-none bg-grey-3" @blur= "blur($event)" v-text= "JSON.stringify(value, replacer, 3)"></pre>
            </div>
            <div class="col-6">
              <h6 class="q-mx-sm q-my-sm">Schema-Definition (JSON)</h6>
              <pre :contenteditable="editable" class= "schemaClass q-mx-sm q-my-none bg-grey-3" @blur= "blur($event, true)" v-text= "JSON.stringify(schema, undefined, 3)"></pre>
            </div>
            <h6 class="q-mx-sm q-my-sm">See logged 'Update' Events at Console</h6>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ['value', 'schema', 'editable'],
  data () {
    return {
      showSchema: false,
      valueClass: 'passed',
      schemaClass: 'passed'
    }
  },
  methods: {
    replacer (key, value) {
      if (Array.isArray(value) && value[0] instanceof File) {
        return value.map(i => i.name + ' - (File Object)')
      }
      return value
    },
    blur (p, schemaMode) {
      try {
        let text = JSON.parse(p.target.innerText)
        console.log('INFOLINE BLUR:', text);

        let value = schemaMode ? this.value: text
        let schema = schemaMode ? text : this.schema
        this.$emit('blur', { value, schema } )
        schemaMode ? this.schemaClass = 'passed' : this.valueClass = 'passed'
      } catch (error) {
        console.error( 'VALUE: No valid JSON ');
        schemaMode ? this.schemaClass = 'failed' : this.valueClass = 'failed'
      }
    }
  }
}
</script>

<style scoped>
  pre { font-size: 0.8rem}
  .failed { background-color: rgb(253, 228, 228)}
  .passed { background-color: white}
</style>
