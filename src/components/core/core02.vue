<template>
  <div id="MainCore">
    <div :id="uuid1" class="row">
      <!-- table scan -->
      <!-- {{ this.editedIndex }} -->
      <TableScan
        :formId="formId"
        :data="data"
        :dataSchema="dataSchema"
        @onEdit="onEdit"
        @onCreate="onCreate"
        @onDelete="onDelete"
        @onRowClick="onRowClick"
      >
      </TableScan>
      <!-- form edits :class="editAccess" -->
      <template>
        <q-card class="col-xs-12 col-lg-6" :class="editAccess">
          <!-- {{ this.editedIndex }} -->
          <EditAdd
            :editedItem=this.editedItem
            :recId=this.recId
            :dataSchema=this.dataSchema
            :editAddLabel=this.editAddLabel
            @onEdit="onEditSave"
            @onCreate="onCreateSave"
          >
          </EditAdd>
        </q-card>
      </template>
      <!-- <template>
        <q-card class="col-xs-12 col-lg-6" :class="editAccess">
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
                :value= "editedItem"
                :schema= "dataSchema"
                />
            </q-form>
          </q-card-section>
        </q-card>
      </template> -->
    <!-- access menus -->
      <template>
        <q-card id="access-menu" class="col-xs-12" :class="menuAccess">
          <q-card-section class="q-px-xl">
            <q-form
              class="shadow-0"
            >
              <q-toolbar>
                <q-toolbar-title style="text-align: left">
                  <q-breadcrumbs
                    class="q-py-sm"
                    active-color="black"
                    style="font-size: 12px">
                      <q-breadcrumbs-el
                        v-for="(c, index) in this.$store.state.drillLevels.breadCrumb.slice(0,this.uuid-1)"
                        :key="index"
                        :label="c"
                        icon="navigation"
                        :to="'#table-'+(index+1).toString().padStart(2,'0')"
                      />
                  </q-breadcrumbs>
                  <q-btn
                    flat
                    icon="arrow_drop_down"
                    :label=recId
                    @click="drilledOption = 'nextLevel'"
                    render = true;
                    hideTable = true
                    class="q-ma-xs bg-grey-4"
                  >
                  </q-btn>
                  <q-btn flat icon="apps" class="q-ma-xs bg-grey-4" label="Options">
                    <q-menu>
                      <q-list style="min-width: 150px">
                        <q-item clickable v-close-popup @click="drilledOption = 'nextLevel'; render = true">
                          <q-item-section>
                            Next level
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-toolbar-title>
              </q-toolbar>
            </q-form>
          </q-card-section>
        </q-card>
      </template>
    </div>
    <!-- next drill down -->
    <template>
      <q-tab-panels
        :id="tableChildrenId"
        v-model="drilledOption"
        animated
        class="row col-grow col-xs-12"
        :class="menuAccess"
        style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px"
        >
        <q-tab-panel
          v-if= "render"
          name="nextLevel"
          style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
            <Core :formId = "uuid" />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </div>
</template>

<script>
  // import QFormBase from '../form/qFormBase.vue'
  import { mapMutations } from 'vuex'
  import drillLevels from '../../store/drillLevels'
  import * as sdata from '../form/seedData.vue'
  import TableScan from './table02'
  import EditAdd from './edit02'

  export default {
    components: { TableScan, EditAdd },
    props: {
      formId: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        recId: '',
        uuid: 0,
        uuid1: '',
        tableChildrenId: '',
        // selectedRow: {},
        // editRow: {},
        // selected: [],
        filter: '',
        accept: true,
        tableAccessOption: 'display: hidden',
        tableSearchOption: 'display: hidden',
        editAccess: 'display: hidden',
        menuAccess: 'display: hidden',
        menuEditToggle: 'display: hidden',
        menuMode: 'menu',
        dropto: null,
        editedItem: {},
        editedItemBase: {},
        drilledDown: 'display: hidden',
        drilledDownDisplay: 'display: hidden',
        drilledOption: null,
        render: true,
        pagination: {
          rowsPerPage: 0
        },
        colTableClass: 'col-xs-12 col-lg-6',
        breadcrumb: [],
        editedIndex: -1,
        data: {},
        hideTable: false,
        editAddLabel: 'Edit >> ',
        createForm: true,
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

      columns() {
        var h1 = Object.keys(this.dataSchema);
        var h2 = [];
        for (var i=0; i < h1.length; i++ ) {
          h2.push(this.dataSchema[h1[i]])
          }
        return h2
      },

      dataSchema() { return sdata.default.dataSchema },

      visibleColumns() {
        var h1 = Object.keys(this.dataSchema);
        var h2 = [];
        for (var i=0; i < h1.length; i++ ) {
          if (this.dataSchema[h1[i]].defaultVisible) {
            h2.push(h1[i])
          }
        }
        return h2
      }
    },

    methods: {
      ...mapMutations(drillLevels, ['updateBreadCrumb']),

      updateBreadCrumb(id) {
        this.$store.commit('drillLevels/updateBreadCrumb', id)
      },

      onRowClick(payload) {
        this.extractPayload(payload)
        if (this.recId == '') {
          this.menuEditToggle = 'display: hidden'
          this.menuAccess= 'display: hidden'
          this.editAccess = 'display: hidden'
          this.colTableClass = 'col-xs-12 col-md-8'
        } else {
          this.menuAccess= 'display: block'
        }
        this.updateBreadCrumb({'idx': this.uuid-1, 'selection': this.recId})
      },

      onEdit(payload) {
        // console.log('core onEdit: ', JSON.stringify(payload));
        this.extractPayload(payload)
        // console.log('onEdit payload: ', JSON.stringify(payload));
        // console.log('onEdit payload -- this.editedItem: ', JSON.stringify(this.editedItem));
        // console.log('onEdit payload index: ', JSON.stringify(this.editedIndex));
        this.menuAccess = 'display: hidden'
        this.menuMode = 'edit'
        this.editItem(this.editedItem)
        this.colTableClass = 'col-xs-12 col-lg-6'
        this.editAccess = 'display: block'
        // this.save()
      },

      onEditSave(payload) {
        // console.log('core onEdit: ', JSON.stringify(payload));
        this.extractPayload(payload)
        // // console.log('onEdit payload: ', JSON.stringify(payload));
        // // console.log('onEdit payload -- this.editedItem: ', JSON.stringify(this.editedItem));
        // // console.log('onEdit payload index: ', JSON.stringify(this.editedIndex));
        // this.menuAccess = 'display: hidden'
        // this.menuMode = 'edit'
        // this.editItem(this.editedItem)
        // this.colTableClass = 'col-xs-12 col-lg-6'
        // this.editAccess = 'display: block'
        this.save()
      },

      // onEdit1(payload) {
      //   console.log('onEdit1: ', payload);
      // },

      onCreate(payload) {
        this.extractPayload(payload)
        // console.log('core onCreate: ', JSON.stringify(payload))
        // console.log('core onCreate: ', JSON.stringify(this.editedItem))
        // console.log('core onCreate index: ', JSON.stringify(payload.editedIndex));
        // console.log('core onCreate index: ', JSON.stringify(this.editedIndex));
        this.menuMode = 'edit'
        this.recId = ''
        this.editItem(this.defaultItem)
        this.colTableClass = 'col-xs-12 col-lg-6'
        this.editAccess = 'display: block'
        // this.save()
      },

      onCreateSave(payload) {
        // this.extractPayload(payload)
        // // console.log('core onCreate: ', JSON.stringify(payload))
        // // console.log('core onCreate: ', JSON.stringify(this.editedItem))
        // // console.log('core onCreate index: ', JSON.stringify(payload.editedIndex));
        // // console.log('core onCreate index: ', JSON.stringify(this.editedIndex));
        // this.menuMode = 'edit'
        // this.recId = ''
        // // this.editItem(this.defaultItem)
        // this.colTableClass = 'col-xs-12 col-lg-6'
        // this.editAccess = 'display: block'
        this.extractPayload(payload)
        this.save()
      },


      // onCreate1(payload) {
      //   console.log('onCreate1: ', payload);
      // },

      extractPayload(payload) {
        // console.log('extracting payload: ', JSON.stringify(payload))
        if (payload.menuMode) this.menuMode = payload.menuMode
        if (payload.menuAccess) this.menuAccess = payload.menuAccess
        if (payload.colTableClass) this.colTableClass = payload.colTableClass
        if (payload.editAccess) this.editAccess = payload.editAccess
        if (payload.recId) this.recId = payload.recId
        // if (payload.editedItem) this.editedItem = Object.assign({}, payload.row)
        // if (payload.editedItem) Object.assign(this.editedItem, payload.row)
        if (payload.row) this.editedItem = payload.row
        if (payload.editedIndex) this.editedIndex = payload.editedIndex
        // this.editedItem = payload.row
        // console.log('edited row: ', JSON.stringify(payload.row))
        // console.log('edited item: ', JSON.stringify(this.editedItem))
        // if (payload.row) Object.assign(this.editedItemBase, payload.row)
        if (payload.editAddLabel) this.editAddLabel = payload.editAddLabel
        if (payload.createForm) this.createForm = payload.createForm
      },

      onDelete(payload) {
        this.extractPayload(payload)
        this.deleteItem()
      },

      onClick(payload) {
        this.extractPayload(payload)
      },

      searchOptionToggle () {
        if (this.tableSearchOption == 'display: hidden') {
          this.tableSearchOption = 'display: block'
        } else {
          this.tableSearchOption = 'display: hidden'
        }
      },

      btnMenuMode() {
        this.editAccess = 'display: hidden'
        this.editAccessL = false
        this.menuMode = 'menu'

        if (this.recId == '') {
          this.menuEditToggle = 'display: hidden'
          this.menuAccess = 'display: hidden'
        } else {
          this.menuEditToggle = 'display: block'
          this.menuAccess = 'display: block'
        }
      },

      drilledDownToggle () {
        if (this.drilledDown == 'display: hidden') {
          this.drilledDown = 'display: block'
        } else {
          this.drilledDown = 'display: hidden'
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
        // if (this.editedIndex > -1) {
        //   Object.assign(this.data[this.editedIndex], this.editedItem)
        //   }
        //   else {
        //     this.data.push(this.editedItem)
        //     this.editItem(this.defaultItem)
        //   }
        this.save()
        },

      save () {
        console.log('create index ', JSON.stringify(this.editedIndex))
        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], this.editedItem)
          }
        else {
          // console.log('create');
          // console.log('create payload: ', JSON.stringify(this.editedItem))
          console.log('created');
          this.data.push(this.editedItem)
          // this.editItem(this.defaultItem)
        }
      },

      // onReset () {
      //   this.$q.notify({
      //     color: 'accent',
      //     textColor: 'white',
      //     icon: 'cloud_done',
      //     message: 'Resetting',
      //     position: 'center'
      //   })
      //   if (this.editedIndex > -1) {
      //     this.editItem(this.editedItemBase)
      //   } else {
      //     this.editItem(this.defaultItem)
      //   }
      // },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // this.dialog = true
      },

      deleteItem () {
        this.$q.notify({
          color: 'accent',
          textColor: 'white',
          icon: 'delete_forever',
          message: 'Deleting',
          timeout: 500,
          position: 'center'
        })
        this.data.splice(this.editedIndex, 1);
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.recId = ''
        this.menuAccess= 'display: hidden'
        this.editAccess= 'display: hidden'
      },

      closeEditor() {
        this.editedItem = Object.assign({}, this.defaultItem)
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

    mounted() {
      this.uuid = parseInt(this.formId, 10);
      this.uuid += 1
      this.uuid1 = "table-"+this.uuid.toString().padStart(2,'0')
      this.tableChildrenId = "tableChildren-"+this.uuid.toString().padStart(2,'0')
    },

    created() {
      this.data = JSON.parse(JSON.stringify(sdata.default.recordData))
    }
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
