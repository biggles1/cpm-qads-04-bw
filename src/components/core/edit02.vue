<template>
  <q-card class="col-xs-12 col-lg-6">
    <q-card-section class="q-pa-xl">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="shadow-5"
        style="padding: 0px"
        rounded-borders
      >
        <q-toolbar>
          <q-toolbar-title style="text-align: left">
            <q-btn
              flat
              :icon=iconAddEdit()
              :label=editAddLabel
            >
              <q-space />
              <q-tooltip content-class="bg-accent">Add or edit data</q-tooltip>
            </q-btn>
          </q-toolbar-title>
          <q-space />
          <q-btn
            :label=saveLabel()
            type="submit"
            icon="save"
            flat
            style="font-size: 12px"
            >
              <q-tooltip content-class="bg-accent">Save changes</q-tooltip>
          </q-btn>
          <q-btn
            label="Undo"
            type="reset"
            icon="undo"
            flat
            class="q-ml-sm"
            style="font-size: 12px"
            >
              <q-tooltip content-class="bg-accent">Undo changes</q-tooltip>
          </q-btn>
        </q-toolbar>
        <QFormBase
          id="formBaseTable"
          :value= "row"
          :schema= "dataSchema"
          />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
  import QFormBase from '../form/qFormBase.vue'

  export default {
    components: { QFormBase },
    props: {
      editedItem: Object,
      editedIndex: Number,
      dataSchema: Object,
      editAddLabel: String,
      recId: String,
    },
    data () {
      return {
        uuid: 0,
        // uuid1: '',
        // tableChildrenId: '',
        // filter: '',
        // accept: true,
        // tableAccessOption: 'display: hidden',
        // tableSearchOption: 'display: hidden',
        // editAccess: 'display: hidden',
        // menuAccess: 'display: hidden',
        // menuEditToggle: 'display: hidden',
        // menuMode: 'menu',
        // dropto: null,
        row: {},
        rowBase: {},
        drilledDown: 'display: hidden',
        // drilledDownDisplay: 'display: hidden',
        // drilledOption: null,
        // render: true,
        // pagination: {
        //   rowsPerPage: 0
        // },
        // colTableClass: 'col-xs-12 col-lg-6',
        // breadcrumb: [],
        data: {},
        // hideTable: false,
        createForm: true,
        payload: {},
        // editData: {},
        // formLabel: '',
      }
    },

    computed: {

      defaultItem() {
          var h1 = Object.keys(this.dataSchema);
          var h2 = {};
          for (var i=0; i < h1.length; i++ ) {
              h2[h1[i]] = this.dataSchema[h1[i]].defaultValue;
          }
          return h2
      },
    },

    methods: {
      assignPayload() {
        this.payload = {
          row: this.row,
          recId: this.row.name,
        }
      },

      onSubmit () {
        this.$q.notify({
          color: 'accent',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Updated',
          position: 'center'
        })
        this.assignPayload()
        if (this.editedIndex > -1) {
          this.$emit('onEdit', this.payload)
          this.rowBase = Object.assign({}, this.editedItem)
          }
          else {
            this.$emit('onCreate', this.payload)
            this.editItem(this.defaultItem)
          }
        },

      onReset () {
        this.$q.notify({
          color: 'accent',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Resetting',
          position: 'center'
        })
        if (this.editedIndex > -1) {
          this.editItem(this.rowBase)
        } else {
          this.editItem(this.defaultItem)
        }
      },

      editItem (item) {
        this.row = Object.assign({}, item)
        this.dialog = true
      },

      // formTitle() {
      //   return (this.createForm)? '': this.recId
      // },

      iconAddEdit() {
        return this.createForm ? 'add' : 'edit'
      },

      saveLabel() {
        return this.createForm ? 'save' : 'update'
      }
    },

    beforeUpdate() {
      this.row = Object.assign({}, this.editedItem)
      this.rowBase = Object.assign({}, this.editedItem)
      this.createForm = (this.editedIndex < 0)? true: false
    },

  }
</script>

<style lang="sass">
.my-sticky-header-table
  height: 400px
  max-width: 100%

  td:first-child
    background-color: $grey-1 !important

  tr th
    position: sticky
    z-index: 2

  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3

  thead tr:first-child th
    top: 0
    z-index: 1
    background-color: $grey-1

  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

  .tab-panels
    margin: 0px 0px 0px 0px
    padding: 0px 0px 0px 0px

  .tab-panel
    margin: 0px 0px 0px 0px
    padding: 0px 0px 0px 0px

  .q-card
    margin: 0px 0px 0px 0px
    padding: 0px 0px 0px 0px

  .q-card-section
    margin: 0px 0px 0px 0px
    padding: 0px 0px 0px 0px

  .q-table__top
    margin: 0px 0px
    padding: 0px 0px

  .q-btn
    line-height: 1.7em

</style>
