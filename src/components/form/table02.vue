<template>
  <div>
    <div :id="uuid1" class="row">
      <!-- Suggested Props:
        data
        dataschema
        selected item
      -->

      <!-- table scan -->
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

      <!-- table reduced/ hidden -->
      <!-- <template>
        <q-card style="text-align: left" class="col-12" :class="( hideTable == true ) ? 'display: None': 'display: hidden'" >
          <q-btn class="bg-grey-4" :label=recId @click="hideTable = !hideTable"/>
        </q-card>
      </template> -->

      <!-- form edits :class="editAccess" -->
      <template>
        <q-card class="col-xs-12 col-md-6" :class="editAccess">
          <q-card-section>
            <!-- id {{ recId }} <br/> -->
            editedItem {{ editedItem }} <br/>
            <!-- editedIndex {{ editedIndex }} <br/> -->
            dataSchema {{ dataSchema }} <br/>
          </q-card-section>
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
                  <q-btn flat icon="edit" :label=editAddLabel>
                    <q-space />
                    {{ recId }}
                  </q-btn>
                </q-toolbar-title>
                <q-space />
                <q-btn label="Update" type="submit" icon="save" flat style="font-size: 12px"/>
                <q-btn label="Undo" type="reset" icon="undo" flat class="q-ml-sm" style="font-size: 12px"/>
              </q-toolbar>
              <!-- 1: {{ this.editItem }} -->
              2: {{ this.editedItem }}
              <!-- 3: {{ this.editedIndex }} -->
              <!-- 4: {{ this.defaultItem }} -->
              <!-- <h6> test </h6> -->
              <QFormBase
                id="formBaseTable"
                :value= "editedItem"
                :schema= "dataSchema"
                />
            </q-form>
          </q-card-section>
        </q-card>
      </template>
    <!-- access menus -->
      <template>
        <q-card id="access-menu" class="col-xs-12 q-pa-x" :class="menuAccess" style="padding: 5px">
          <q-card-section v-if="uuid > 1">
            <q-breadcrumbs
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
          </q-card-section>
          <q-card-section class="q-pa-xs" style="margin: 0px">
            <q-form
              class="shadow-0"
            >
              <q-toolbar>
                <q-toolbar-title style="text-align: left">
                  <q-btn flat icon="arrow_drop_down" :label=recId @click="drilledOption = 'option1'; render = true; hideTable = true" class="q-ma-xs bg-grey-4">
                    <!-- <div class="q-pa-xs" style="font-size: 12px">
                      {{ recId }}
                    </div> -->
                    <!-- <q-menu>
                      <q-list style="min-width: 150px">
                        <q-item clickable v-close-popup @click="drilledOption = 'option1'; render = true">
                          <q-item-section>
                            Next level
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu> -->
                  </q-btn>
                  <q-btn flat icon="apps" class="q-ma-xs bg-grey-4" label="Options">
                    <!-- <div class="q-pa-xs" style="font-size: 12px">
                      Options
                    </div> -->
                    <q-menu>
                      <q-list style="min-width: 150px">
                        <q-item clickable v-close-popup @click="drilledOption = 'option1'; render = true">
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
      <!-- {{ drilledOption }} {{ hideTable }} -->
      <q-tab-panels :id="tableChildrenId" v-model="drilledOption" animated class="row col-grow col-xs-12" :class="menuAccess" style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px">
        <q-tab-panel v-if= "render" name="option1" style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
              <CoreTable :formId = "uuid" />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </div>

  <!-- <drill-down
    uuid = 'uuid'
    menuAccess = 'menuAccess'
    tableChildrenId = 'tableChildrenId'
    drilledOption = 'drilledOption'
    render = 'render'
  >
  </drill-down> -->
  <!-- </div> -->

</template>

<script>
import QFormBase from './qFormBase.vue'
import { mapMutations } from 'vuex'
import drillLevels from '../../store/drillLevels'
import * as sdata from './seedData.vue'
import TableScan from './table02-tableScan.vue'
// var TableScan = './table02-tableScan.vue'
// import drillDown from './drillDown01.vue'

export default {
  components: { QFormBase, TableScan },
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
      selectedRow: {},
      editRow: {},
      selected: [],
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
      drilledDown: 'display: hidden',
      drilledDownDisplay: 'display: hidden',
      drilledOption: null,
      render: true,
      pagination: {
        rowsPerPage: 0
      },
      colTableClass: 'col-xs-12 col-md-7',
      // colEditAccessClass: 'col-xs-12 col-md-6',
      breadcrumb: [],
      editedIndex: -1,
      data: {},
      hideTable: false,
      editAddLabel: 'editing >>> '
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

    // onRowClick(selected, props) {
    //   if (this.recId == props.row.name) {
    //     this.recId = ''
    //     this.selectedRow = {}
    //   }
    //   else {
    //     this.recId = props.row.name
    //     this.selectedRow = props.row
    //     this.editItem(this.selectedRow)
    //     this.render = false
    //   }

    //   if (this.recId == '') {
    //     this.menuEditToggle = 'display: hidden'
    //     this.menuAccess= 'display: hidden'
    //     this.editAccess = 'display: hidden'
    //     this.colTableClass = 'col-xs-12 col-md-8'
    //   } else {
    //     // this.colTableClass = 'col-xs-12 col-md-4'
    //     // this.menuEditToggle = 'display: block'
    //     this.menuAccess= 'display: block'
    //   }
    //   this.updateBreadCrumb({'idx': this.uuid-1, 'selection': this.recId})
    // },

    onRowClick(payload) {
      console.log('on row clicked ...', JSON.stringify(payload));
      this.extractPayload(payload)
      // if (this.recId == payload.recId) {
      //   this.recId = ''
      //   this.selectedRow = {}
      // }
      // else {
      //   this.recId = payload.recId
      //   this.selectedRow = payload.row
      //   this.editItem(this.selectedRow)
      //   this.render = false
      // }

      if (this.recId == '') {
        this.menuEditToggle = 'display: hidden'
        this.menuAccess= 'display: hidden'
        this.editAccess = 'display: hidden'
        this.colTableClass = 'col-xs-12 col-md-8'
      } else {
        // this.colTableClass = 'col-xs-12 col-md-4'
        // this.menuEditToggle = 'display: block'
        this.menuAccess= 'display: block'
      }
      this.updateBreadCrumb({'idx': this.uuid-1, 'selection': this.recId})
    },

    onEdit(payload) {
      // console.log('onEdit: ', JSON.stringify(payload));
      // this.menuMode = payload.menuMode
      // this.editAccess = payload.menuAccess
      // this.colTableClass = payload.colTableClass
      // this.editAccess = payload.editAccess
      // this.recId = payload.recId
      // this.editedItem = payload.row
      this.extractPayload(payload)
      this.btnEditMode()
    },

    onCreate(payload) {
      // console.log('creating: ', JSON.stringify(payload));
      // this.menuMode = payload.menuMode
      // this.editAccess = payload.menuAccess
      // this.colTableClass = payload.colTableClass
      // this.editAccess = payload.editAccess
      // this.recId = payload.recId
      // this.editedItem = payload.row
      this.extractPayload(payload)
      this.btnCreateMode()
    },

    extractPayload(payload) {
      this.menuMode = payload.menuMode
      this.menuAccess = payload.menuAccess
      this.colTableClass = payload.colTableClass
      this.editAccess = payload.editAccess
      this.recId = payload.recId
      Object.assign(this.editedItem, payload.row)
      // this.editedItem = payload.row
      console.log('extracting payload: ', JSON.stringify(this.editedItem), JSON.stringify(payload.row));
      this.editAddLabel = payload.editAddLabel
      this.editedIndex = payload.editedIndex
    },

    onDelete(payload) {
      // console.log('deleting: ', JSON.stringify(payload));
      // this.menuMode = payload.menuMode
      // this.editAccess = payload.menuAccess
      // this.colTableClass = payload.colTableClass
      // this.editAccess = payload.editAccess
      // this.recId = payload.recId
      // this.editedItem = payload.row
      this.extractPayload(payload)
      this.deleteItem()
    },

    onClick(payload) {
      // console.log('onEdit: ', JSON.stringify(payload));
      // this.menuMode = payload.menuMode
      // this.editAccess = payload.menuAccess
      // this.colTableClass = payload.colTableClass
      // this.editAccess = payload.editAccess
      // this.recId = payload.recId
      // this.editedItem = payload.row
      // this.btn
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

    btnEditMode() {
      this.menuMode = 'edit'
      console.log('editing ....');
      console.log(this.recId);
      if (this.recId == '' || !this.recId) {
        // this.editAccess = 'display: hidden'
        // this.colTableClass = 'col-xs-12 col-md-6'
        // console.log('create');
        // this.editAddLabel = 'Creating new record >>> '
        // this.editAddLabel = 'Editing >> '
      } else {
        // console.log('should be editing now ..... >>>>');
        // this.colTableClass = 'col-xs-12 col-md-6'
        // this.editAccess = 'display: block'
        // this.menuAccess = 'display: hidden'
        // console.log('edit');
        // this.editAddLabel = 'Editing >> '
      }
    },

    btnCreateMode() {
      this.menuAccess = 'display: hidden'
      this.menuMode = 'edit'
      this.recId = ''
      this.editItem(this.defaultItem)
      this.colTableClass = 'col-xs-12 col-md-6'
      this.editAccess = 'display: block'
      this.editAddLabel = 'Creating new record >> '
    },

    drilledDownToggle () {
      if (this.drilledDown == 'display: hidden') {
        this.drilledDown = 'display: block'
      } else {
        this.drilledDown = 'display: hidden'
      }
    },
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'warning',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'accent',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Updated'
        })
        console.log('editedIndex: ', this.editedIndex);
        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], this.editedItem)
          } else {
            this.data.push(this.editedItem)
            this.editItem(this.defaultItem)
          }
        // Object.assign(this.editedItem, this.defaultItem)
        // this.editedIndex = -1
        }
    },
    onReset () {
      this.$q.notify({
        color: 'accent',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Resetting',
      })
      if (this.editedIndex > -1) {
        this.editItem(this.selectedRow)
      } else {
        this.editItem(this.defaultItem)
      }
    },
    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      console.log('this.editedIndex: ', this.editedIndex);
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem () {
      // confirm('Are you sure you want to delete this item?') && this.data.splice(this.editedIndex, 1);
      this.$q.notify({
        color: 'accent',
        textColor: 'white',
        icon: 'delete_forever',
        message: 'Deleting',
        timeout: 500,
        position: 'left'
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
