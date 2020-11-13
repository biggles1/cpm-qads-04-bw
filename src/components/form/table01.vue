<template>
  <div>
    <div :id="uuid1" class="row">
      <!-- Suggested Props:
        data
        dataschema
        selected item
      -->
      <!-- table scan -->
      <template>
        <q-card :class="colTableClass" style="margin: 0px; background-color: red">
          <q-card-section class="q-pa-xs m-pa-xs" style="margin: 0px 0px 0px 0px">
            <!-- Virtual scroll style -->
            <q-table
              virtual-scroll
                :pagination.sync="pagination"
                :rows-per-page-options="[0]"
              title="Treats"
              :data="data"
              :columns="columns"
              row-key="name"
              selection="single"
              :selected.sync="selected"
              :filter="filter"
              binary-state-sort
              :visible-columns="visibleColumns"
              :dense="$q.screen.lt.xs"
              @row-click="onRowClick"
              class="my-sticky-header-table q-pa-xs"
            >
              <template v-slot:top>
                <q-btn color="primary" icon="view_list" align="left" flat class="col-4">
                  <div class="q-pl-sm">Treats</div>
                  <q-menu>
                    <q-list style="min-width: 200px">
                      <q-separator />
                      <div :class="menuAccess">
                        <q-item-label header>Selections</q-item-label>
                        <q-item clickable v-close-popup @click="btnEditMode">
                          <q-item-section avatar>
                            <q-icon size='xs' name="edit" />
                          </q-item-section>
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="deleteItem">
                          <q-item-section avatar>
                            <q-icon size='xs' name="delete" />
                          </q-item-section>
                          <q-item-section>Delete</q-item-section>
                        </q-item>
                        <q-separator />
                      </div>
                      <q-item-label header>Options</q-item-label>
                      <q-item clickable v-close-popup @click="btnCreateMode">
                        <q-item-section avatar>
                          <q-icon size='xs' name="add" />
                        </q-item-section>
                        <q-item-section>Create</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="searchOptionToggle">
                        <q-item-section avatar>
                          <q-icon size='xs' name="search" />
                        </q-item-section>
                        <q-item-section>Search</q-item-section>
                      </q-item>
                      <q-item-label header>Format</q-item-label>
                      <q-item clickable>
                        <q-item-section>
                          <q-select
                            v-model="visibleColumns"
                            multiple
                            dense
                            options-dense
                            :display-value="$q.lang.table.columns"
                            emit-value
                            map-options
                            :options="columns"
                            option-value="name"
                            options-cover
                            :visible-columns="visibleColumns"
                          >
                            <template v-slot:prepend>
                              <q-icon size='xs' name="send" color="blue-6"/>
                            </template>
                          </q-select>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
                <!-- visible options -->
                <q-space />
                <div :class="tableSearchOption">
                  <q-input
                    dense
                    debounce="300"
                    v-model="filter"
                    placeholder="Search"
                    >
                      <template v-slot:prepend>
                        <q-icon name="search" color="blue-6"/>
                      </template>
                  </q-input>
                </div>
              </template>
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:body="props">
                <q-tr class="cursor-pointer" :props="props" @click="props.selected = !props.selected; onRowClick(props.selected, props)">
                  <q-td v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.value }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </template>
      <!-- form edits :class="editAccess" -->
      <template>
        <q-card class="col-xs-12 col-md-6" :class="editAccess" style="margin: 0px; background-color: red">
          <q-card-section class="q-pa-xs" style="margin: 0px 5px 0px 5px; background-color: #fff">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-pa-xs shadow-1"
              style="padding: 0px"
              rounded-borders
            >
              <q-toolbar style="padding: 0px">
                <q-toolbar-title style="text-align: left">
                  <q-btn flat icon="edit" style="height: 50px; font-size: 12px; min-width: 150px; text-align: left">
                    {{ recId }}
                  </q-btn>
                </q-toolbar-title>
                <q-space />
                <q-btn label="Update" type="submit" icon="save" color="orange-8" flat style="height: 50px; font-size: 12px"/>
                <q-btn label="Undo" type="reset" icon="undo" color="green-8" flat class="q-ml-sm" style="height: 50px; font-size: 12px"/>
              </q-toolbar>

              <q-form-base
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
                  <q-btn flat icon="arrow_drop_down" :label=recId @click="drilledOption = 'option1'; render = true" class="q-ma-xs bg-blue-2">
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
                  <q-btn flat icon="apps" class="q-ma-xs bg-blue-2" label="Options">
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
// import drillDown from './drillDown01.vue'

export default {
  components: { QFormBase },
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
    onRowClick(selected, props) {
      if (this.recId == props.row.name) {
        this.recId = ''
        this.selectedRow = {}
      }
      else {
        this.recId = props.row.name
        this.selectedRow = props.row
        this.editItem(this.selectedRow)
        this.render = false
      }

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
      if (this.recId == '' || !this.recId) {
        this.editAccess = 'display: hidden'
        this.colTableClass = 'col-xs-12 col-md-6'
      } else {
        this.colTableClass = 'col-xs-12 col-md-6'
        this.editAccess = 'display: block'
        this.menuAccess = 'display: hidden'
      }
    },
    btnCreateMode() {
      this.menuAccess = 'display: hidden'
      this.menuMode = 'edit'
      this.recId = ''
      this.editItem(this.defaultItem)
      this.colTableClass = 'col-xs-12 col-md-6'
      this.editAccess = 'display: block'
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
          color: 'primary',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Updated'
        })
        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], this.editedItem)
          } else {
            this.data.push(this.editedItem)
          }
        }
    },
    onReset () {
      this.$q.notify({
        color: 'green-4',
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
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem () {
      // confirm('Are you sure you want to delete this item?') && this.data.splice(this.editedIndex, 1);
      this.$q.notify({
        color: 'red-7',
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
    background-color: $blue-1 !important

  tr th
    position: sticky
    z-index: 2
    background: #fff

  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3

  thead tr:first-child th
    top: 0
    z-index: 1
    background-color: $blue-1

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
