<template>
  <q-card :class="colTableClass" style="margin: 0px; border-width: thick; border-color: red">
      <!-- ; background-color: red -->
    <q-card-section class="q-pa-xs m-pa-xs" style="margin: 0px 0px 0px 0px" :class= "( hideTable == false ) ? 'display: None': 'display: hidden'">
      <!-- Virtual scroll style -->
      <!-- <p> {{ data }}</p> <p> {{ columns }} </p>> -->
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
        :hide-bottom=true
        style="box-shadow: none"
      >
        <template v-slot:top>
          <q-btn icon="view_list" align="left" flat class="col-4">
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
                  <q-item-section>Create1</q-item-section>
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
                        <q-icon size='xs' name="send" color="grey-4"/>
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
                  <q-icon name="search" color="grey-4"/>
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

<script>
// import QFormBase from './qFormBase.vue'
import { mapMutations } from 'vuex'
import drillLevels from '../../store/drillLevels'
// import * as sdata from './seedData.vue'

export default {
props: {
  formId: {
    type: Number,
    default: 0
  },
  data: Array,
  dataSchema: Object,
  },

  data() {
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
      // data: {},
      hideTable: false,
      visibleColumns: [],
      payload: {},
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
    setVisibleColumns() {
      var h1 = Object.keys(this.dataSchema);
      var h2 = [];
      for (var i=0; i < h1.length; i++ ) {
        if (this.dataSchema[h1[i]].defaultVisible) {
          h2.push(h1[i])
          }
        }
      return h2
      },
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
        console.log(JSON.stringify(this.selectedRow));
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

      this.payload = {
        menuMode: this.menuMode,
        editAccess: this.editAccess,
        colTableClass: this.colTableClass,
        menuAccess: this.menuAccess,
        recId: this.recId,
        row: this.selectedRow,
        }
      // console.log('on edit', JSON.stringify(this.payload));
      this.$emit('onEdit', this.payload)
    },

    btnCreateMode() {
      // console.log('creating 1111111 ');
      this.menuAccess = 'display: hidden'
      this.menuMode = 'edit'
      this.recId = ''
      this.editItem(this.defaultItem)
      this.colTableClass = 'col-xs-12 col-md-6'
      this.editAccess = 'display: block'

      this.payload = {
        menuMode: this.menuMode,
        editAccess: this.editAccess,
        colTableClass: this.colTableClass,
        menuAccess: this.menuAccess,
        recId: this.recId,
        row: this.selectedRow,
        }

      // console.log('creating >>>>');
      this.$emit('onCreate', this.payload)
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


    drilledDownToggle () {
      if (this.drilledDown == 'display: hidden') {
        this.drilledDown = 'display: block'
      } else {
        this.drilledDown = 'display: hidden'
      }
    },
    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
  },

  created() {
    this.visibleColumns = this.setVisibleColumns;
    }
}

</script>

<style scoped>

</style>
