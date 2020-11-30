<template>
  <q-card class="col-xs-12 col-lg-6">
    <q-card-section class="q-pa-xl">
      <!-- {{ editedIndex }} -->
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
              {{ recId }}
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
      // editedIndex: Number,
      dataSchema: Object,
      editAddLabel: String,
      recId: String,
    },
    data () {
      return {
        uuid: 0,
        uuid1: '',
        tableChildrenId: '',
        filter: '',
        accept: true,
        tableAccessOption: 'display: hidden',
        tableSearchOption: 'display: hidden',
        editAccess: 'display: hidden',
        menuAccess: 'display: hidden',
        menuEditToggle: 'display: hidden',
        menuMode: 'menu',
        dropto: null,
        row: {},
        rowBase: {},
        drilledDown: 'display: hidden',
        drilledDownDisplay: 'display: hidden',
        drilledOption: null,
        render: true,
        pagination: {
          rowsPerPage: 0
        },
        colTableClass: 'col-xs-12 col-lg-6',
        breadcrumb: [],
        // editedIndex: -1,
        data: {},
        hideTable: false,
        createForm: true,
        payload: {},
        editData: {},
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
        // console.log('editedItem bb: ', JSON.stringify(this.editedItem))
        // console.log('payload: ', this.editedItemBase);
        this.payload = {
          row: this.row,
        // menuMode: this.menuMode,
        // editAccess: this.editAccess,
        // colTableClass: this.colTableClass,
        // menuAccess: this.menuAccess,
        // recId: this.recId,
        // row: this.selectedRow,
        // editAddLabel: this.editAddLabel,
          // editedIndex: this.editedIndex,
        // createForm: this.createForm,
        }
        // console.log('this.payload', JSON.stringify(this.payload));
      },


      // onEdit(payload) {
      //   // this.extractPayload(payload)
      //   // this.menuAccess = 'display: hidden'
      //   // this.menuMode = 'edit'
      //   // this.editItem(this.editedItem)
      //   // this.colTableClass = 'col-xs-12 col-lg-6'
      //   // this.editAccess = 'display: block'
      // },

      // onCreate(payload) {
      //   // this.extractPayload(payload)
      //   // this.menuMode = 'edit'
      //   // this.recId = ''
      //   // this.editItem(this.defaultItem)
      //   // this.colTableClass = 'col-xs-12 col-lg-6'
      //   // this.editAccess = 'display: block'
      // },

      // extractPayload(payload) {
      //   this.menuMode = payload.menuMode
      //   this.menuAccess = payload.menuAccess
      //   this.colTableClass = payload.colTableClass
      //   this.editAccess = payload.editAccess
      //   this.recId = payload.recId
      //   Object.assign(this.editedItem, payload.row)
      //   Object.assign(this.editedItemBase, payload.row)
      //   this.editAddLabel = payload.editAddLabel
      //   this.createForm = payload.createForm
      //   this.editedIndex = payload.editedIndex
      // },

      // onClick(payload) {
      //   console.log('onClick: ', payload);
      //   // this.assignPayload()
      //   // this.extractPayload(payload)
      // },

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
          // console.log('payload: ', this.payload);
          // this.payload.editedItem = this.editedItem
          // console.log('ggggg', JSON.stringify(this.payload));
          // Object.assign(this.data[this.editedIndex], this.editedItem)
          // console.log('edit');
          this.$emit('onEdit', this.payload)
          }
          else {
            this.$emit('onCreate', this.payload)
            // this.data.push(this.editedItem)
            // this.editItem(this.defaultItem)
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

      closeEditor() {
        this.row = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      },

      toggleMenuEdit() {
        if (this.menuMode == 'menu') {
          this.editAccess = 'display: hidden'
        }
        else {
          this.editAccess= 'display: none'
        }
      },

      iconAddEdit() {
        return this.createForm ? 'add' : 'edit'
      },
      saveLabel() {
        return this.createForm ? 'save' : 'update'
      }
    },

    // mounted() {
    //   // this.editedItemBase = Object.assign({}, this.editedItem)
    //   // this.editedItem = Object.assign({}, this.editedItem)
    //   // console.log('target item 1: ', JSON.stringify(this.editedItem));
    //   // console.log('editedIndex: ', JSON.stringify(this.editedIndex));
    //   // console.log('editedItemBase: ', JSON.stringify(this.editedItemBase));
    // },

    beforeUpdate() {
      this.row = Object.assign({}, this.editedItem)
      // this.editBase = Object.assign({}, this.edit)
      this.rowBase = Object.assign({}, this.editedItem)
      // console.log('beforeUpdate editedIndex: ', JSON.stringify(this.editedIndex));
      // console.log('beforeUpdate editedItem: ', JSON.stringify(this.editedItem));
      // console.log('beforeUpdate edit: ', JSON.stringify(this.row));
      // console.log('beforeUpdate editBase: ', JSON.stringify(this.rowBase));
    },

    // created() {
    //   // this.editedItemBase = Object.assign({}, this.editedItem)
    //   // this.editedItem = Object.assign({}, this.editedItem)
    //   // // console.log('target item 1: ', JSON.stringify(this.editedItem));
    //   // // console.log('editedIndex: ', JSON.stringify(this.editedIndex));
    //   // console.log('editedItemBase: ', JSON.stringify(this.editedItemBase));
    // }
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
